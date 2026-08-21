import os
import json
from typing import Generator
from fastapi import FastAPI, HTTPException
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

# Configure CORS (supports wildcard or configurable origins from env for production)
raw_origins = os.getenv("ALLOWED_ORIGINS", "*").strip()
if raw_origins == "*" or not raw_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
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
        },
    )


@app.get("/pitch", summary="Generate Why Hire Mahil 60-Second Pitch")
async def get_pitch_endpoint():
    """
    Streams an authentic, persuasive 60-second hiring pitch for Mahil Sonowal based on verified portfolio data.
    """
    system_prompt = build_system_prompt(candidate_data)
    pitch_query = (
        "Deliver a compelling, articulate 60-second elevator pitch to a tech recruiter or hiring manager "
        "explaining why Mahil Sonowal is an exceptional hire for a Web Development Intern or Frontend Developer role. "
        "Highlight his verified real-world React 19/Tailwind deployments, strong MCA academics (8.45 SGPA), "
        "and forward-looking Assamese RAG AI research. Format with clean bullet points and bold key takeaways."
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
