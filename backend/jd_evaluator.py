import json
import re
from typing import Dict, Any
from llm_client import get_groq_client, DEFAULT_MODEL, FALLBACK_MODELS


def evaluate_job_description(candidate_data: Dict[str, Any], job_description: str) -> Dict[str, Any]:
    """
    Compares the candidate profile against a job description and returns a structured evaluation.

    Args:
        candidate_data: Dictionary containing candidate profile data.
        job_description: Plain text job description string.

    Returns:
        Dict[str, Any]: Structured evaluation with score, strengths, gaps, and recommendation.
    """
    candidate_json_str = json.dumps(candidate_data, indent=2, ensure_ascii=False)
    candidate_name = candidate_data.get("name", "the candidate")

    system_prompt = f"""You are an objective, expert technical hiring evaluator and talent assessor.
Your job is to compare {candidate_name}'s verified profile against a job description and produce a realistic, honest, and actionable fit evaluation.

Candidate Profile:
```json
{candidate_json_str}
```

Instructions:
1. Compare the candidate's skills, education, and projects against the requirements and nice-to-haves in the job description.
2. Calculate an honest suitability score (0-100) reflecting how well the candidate matches the role level and stack.
3. Identify matching skills/strengths directly proven in the profile.
4. Identify missing skills or gaps where the JD requires technologies or years of experience not listed.
5. Provide a realistic interview recommendation (e.g., "Highly Recommended for Technical Interview", "Recommended for Frontend/Intern Role", "Partial Fit — Upskilling Required in [X]").
6. You MUST respond with ONLY a valid JSON object matching this exact schema:
{{
  "suitability_score": <integer 0-100>,
  "summary": "<2-3 sentence overview of overall fit and role alignment>",
  "matching_skills": ["<skill 1>", "<skill 2>", ...],
  "missing_skills": ["<missing skill/gap 1>", ...],
  "recommendation": "<direct recommendation on whether to interview>",
  "key_strengths": ["<standout strength 1>", "<standout strength 2>", ...]
}}
Do not include any text outside the JSON object."""

    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": f"Please evaluate {candidate_name}'s fit for the following Job Description:\n\n{job_description.strip()}",
        },
    ]

    client = get_groq_client()
    models_to_try = [DEFAULT_MODEL] + [m for m in FALLBACK_MODELS if m != DEFAULT_MODEL]
    last_exception = None

    for model in models_to_try:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.2,  # Low temperature for deterministic scoring
                max_tokens=1024,
            )

            raw_content = response.choices[0].message.content.strip()

            # Clean markdown code fences if wrapped in ```json ... ```
            clean_json = raw_content
            if "```" in clean_json:
                json_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", clean_json)
                if json_match:
                    clean_json = json_match.group(1)

            parsed = json.loads(clean_json)

            # Ensure all required keys exist with sensible fallbacks
            return {
                "suitability_score": int(max(0, min(100, parsed.get("suitability_score", 70)))),
                "summary": str(parsed.get("summary", "Fit evaluation completed.")),
                "matching_skills": list(parsed.get("matching_skills", [])),
                "missing_skills": list(parsed.get("missing_skills", [])),
                "recommendation": str(parsed.get("recommendation", "Consider for interview based on project portfolio.")),
                "key_strengths": list(parsed.get("key_strengths", [])),
            }

        except Exception as e:
            error_str = str(e).lower()
            if "model_not_found" in error_str or "does not exist" in error_str or "404" in error_str:
                last_exception = e
                continue
            else:
                last_exception = e
                continue

    if last_exception:
        raise last_exception
