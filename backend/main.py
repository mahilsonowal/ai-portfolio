import os
import json
from typing import Generator
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from models import CandidateProfile, ChatRequest, JDMatchRequest, JDMatchResponse
from system_prompt import build_system_prompt
from llm_client import get_llm_response
from jd_evaluator import evaluate_job_description

app = FastAPI(
    title="AI Portfolio Assistant API",
    description="Backend API for Mahil Sonowal's AI Portfolio Assistant",
    version="1.0.0",
)

# Custom HTTP Middleware guaranteeing unconditional CORS preflights and headers
@app.middleware("http")
async def universal_cors_middleware(request: Request, call_next):
    if request.method == "OPTIONS":
        response = Response(status_code=200)
    else:
        response = await call_next(request)
    
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Expose-Headers"] = "*"
    return response

# Also keep standard Starlette CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=r".*",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Maximum conversation history length (excluding system prompt and current query)
MAX_HISTORY_MESSAGES = 20

# Load candidate profile on startup
PROFILE_PATH = os.path.join(os.path.dirname(__file__), "candidate_profile.json")

try:
    with open(PROFILE_PATH, "r", encoding="utf-8") as f:
        candidate_data = json.load(f)
    # Validate with Pydantic model
    validated_profile = CandidateProfile(**candidate_data)
except Exception as e:
    raise RuntimeError(f"Failed to load or validate candidate profile: {e}")


@app.get("/health", summary="Health Check")
def health_check():
    """
    Simple health check endpoint to verify backend status.
    """
    return {
        "status": "healthy",
        "service": "ai-portfolio-backend",
        "candidate": candidate_data.get("name"),
    }


@app.get("/candidate", summary="Get Candidate Profile")
def get_candidate_profile():
    """
    Returns the full structured candidate profile data for frontend UI components.
    """
    return candidate_data


@app.post("/chat", summary="Chat with AI Representative")
async def chat_endpoint(request: ChatRequest):
    """
    Streaming chat endpoint with multi-turn conversation memory and sliding window context.
    """
    user_message = request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # 1. Build grounded system prompt (always maintained at index 0)
    system_prompt = build_system_prompt(candidate_data)

    # 2. Filter and trim conversation history to last MAX_HISTORY_MESSAGES
    filtered_history = [
        {"role": msg.role, "content": msg.content.strip()}
        for msg in request.history
        if msg.role in ("user", "assistant") and msg.content and msg.content.strip()
    ]
    recent_history = filtered_history[-MAX_HISTORY_MESSAGES:]

    # 3. Construct chronological message context
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(recent_history)
    messages.append({"role": "user", "content": user_message})

    # 4. Stream LLM response
    def stream_generator() -> Generator[str, None, None]:
        try:
            for token in get_llm_response(messages):
                yield token
        except ValueError as ve:
            yield f"\n[Configuration Error: {str(ve)}]"
        except Exception as e:
            yield f"\n[Error connecting to AI service: {str(e)}]"

    return StreamingResponse(
        stream_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        },
    )


@app.get("/pitch", summary="Generate Why Hire Mahil 60-Second Pitch")
async def get_pitch_endpoint():
    """
    Streams an authentic, persuasive 60-second hiring pitch for Mahil Sonowal based on verified portfolio data.
    """
    system_prompt = build_system_prompt(candidate_data)
    pitch_query = (
        "Deliver a compelling, high-impact 60-second elevator pitch explaining why Mahil Sonowal brings immediate value to an engineering team, product build, or technical collaboration. "
        "Focus directly on tangible output, shipped code, and problem-solving capabilities: "
        "1. Real Production Web Apps: Has delivered 3 live, client-facing applications using React 19, Tailwind CSS, Vite, and Supabase (Mukuba Economic Research, CADS, Genesis). "
        "2. Applied AI & RAG Engineering: Actively building an Assamese Folk Literature RAG pipeline using Python, NLP, vector search, OCR, and multilingual embeddings. "
        "3. Modern Frontend & Tooling: Fluent in modular component design, responsive UI, Git/GitHub, Vite, and full-stack integrations. "
        "4. Practical Background: Master of Computer Applications (MCA) student at The Assam Royal Global University, open to frontend developer roles, React builds, internships, and high-impact engineering collaborations. "
        "IMPORTANT: Do NOT lead with or overemphasize university marks/SGPA—let his real-world shipped code, architectural clarity, and AI capabilities be the primary highlights. "
        "Use a crisp heading like 'Elevator Pitch: Why Mahil Sonowal Brings Real Value to Your Engineering Team', followed by structured bullet points, bold key takeaways, and a confident closing."
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": pitch_query},
    ]

    def stream_generator() -> Generator[str, None, None]:
        try:
            for token in get_llm_response(messages):
                yield token
        except Exception as e:
            yield f"\n[Error generating pitch: {str(e)}]"

    return StreamingResponse(
        stream_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "Access-Control-Allow-Origin": "*",
        },
    )


@app.post("/match-jd", response_model=JDMatchResponse, summary="Match Job Description")
async def match_jd_endpoint(request: JDMatchRequest):
    """
    Analyzes a job description against the candidate's profile and returns a structured fit evaluation.
    """
    jd_text = request.job_description.strip()
    if not jd_text or len(jd_text) < 20:
        raise HTTPException(
            status_code=400,
            detail="Job description must be at least 20 characters long.",
        )

    try:
        evaluation = evaluate_job_description(candidate_data, jd_text)
        return JDMatchResponse(**evaluation)
    except ValueError as ve:
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze job description: {str(e)}",
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
