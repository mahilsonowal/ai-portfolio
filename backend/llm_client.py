import os
from typing import Generator, List, Dict, Any
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file (both local backend/.env and current working dir)
env_file = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_file):
    load_dotenv(dotenv_path=env_file)
else:
    load_dotenv()

# Configured model or fallback list of high-performance models on Groq
DEFAULT_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
FALLBACK_MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.6-27b",
    "llama-3.3-70b-versatile",
    "llama3-70b-8192",
]


def get_groq_client() -> Groq:
    """
    Initializes and returns the Groq client instance.
    Validates that the GROQ_API_KEY environment variable is configured.
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or api_key == "your_key_here":
        raise ValueError(
            "GROQ_API_KEY is not set or contains the placeholder. "
            "Please set a valid Groq API key in your backend/.env file."
        )
    return Groq(api_key=api_key)


def get_llm_response(
    messages: List[Dict[str, Any]],
    model: str = DEFAULT_MODEL,
    temperature: float = 0.6,
    max_tokens: int = 1024,
) -> Generator[str, None, None]:
    """
    Sends a list of chat messages to the Groq API and yields streaming response tokens.
    Automatically handles model fallback if a specific model is deprecated or unavailable.

    Args:
        messages: List of message dictionaries with 'role' and 'content' keys.
        model: Groq model identifier.
        temperature: Sampling temperature for response generation.
        max_tokens: Maximum tokens to generate.

    Yields:
        str: Streaming content chunks as they arrive from the model.
    """
    client = get_groq_client()

    models_to_try = [model] + [m for m in FALLBACK_MODELS if m != model]
    last_exception = None

    for candidate_model in models_to_try:
        try:
            response = client.chat.completions.create(
                model=candidate_model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True,
            )

            for chunk in response:
                if chunk.choices and len(chunk.choices) > 0:
                    delta_content = chunk.choices[0].delta.content
                    if delta_content:
                        yield delta_content
            # If successfully completed stream, return
            return

        except Exception as e:
            error_str = str(e).lower()
            if "model_not_found" in error_str or "does not exist" in error_str or "404" in error_str:
                last_exception = e
                continue  # Try next fallback model
            else:
                raise e

    if last_exception:
        raise last_exception
