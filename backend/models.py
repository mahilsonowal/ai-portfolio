from typing import List, Optional
from pydantic import BaseModel, Field


class Contact(BaseModel):
    email: str
    phone: str
    linkedin: str
    github: str


class Education(BaseModel):
    degree: str
    institution: str
    duration: Optional[str] = None
    score: str


class Skills(BaseModel):
    languages: List[str] = Field(default_factory=list)
    frontend: List[str] = Field(default_factory=list)
    ui_layout: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    other: List[str] = Field(default_factory=list)


class Project(BaseModel):
    name: str
    url: Optional[str] = None
    tech: List[str] = Field(default_factory=list)
    description: str


class ResearchProject(BaseModel):
    name: str
    status: str
    tech: List[str] = Field(default_factory=list)
    description: str


class CandidateProfile(BaseModel):
    name: str
    title: str
    location: str
    contact: Contact
    education: List[Education]
    skills: Skills
    projects: List[Project]
    research_project: Optional[ResearchProject] = None
    achievements: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    career_goal: str


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = Field(default_factory=list)


class JDMatchRequest(BaseModel):
    job_description: str


class JDMatchResponse(BaseModel):
    suitability_score: int = Field(ge=0, le=100, description="Suitability score from 0 to 100")
    summary: str = Field(description="Overall technical suitability summary")
    matching_skills: List[str] = Field(default_factory=list, description="Directly matching skills and strengths")
    missing_skills: List[str] = Field(default_factory=list, description="Missing skills, technologies, or experience gaps")
    recommendation: str = Field(description="Actionable recruiter recommendation on whether to interview")
    key_strengths: List[str] = Field(default_factory=list, description="Standout candidate advantages for this role")
