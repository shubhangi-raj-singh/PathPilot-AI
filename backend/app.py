from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from database import conn, cursor
import os

from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    name: str
    skills: str
    interests: str
    goal: str

class ToolInput(BaseModel):
    skills: str
    interests: str
    about: str


@app.get("/")
def home():
    return {"message": "PathPilot AI Backend Running"}


@app.post("/generate-roadmap")
def generate_roadmap(data: UserInput):
    
    prompt = f"""
Student Name: {data.name}
Skills: {data.skills}
Interests: {data.interests}
Career Goal: {data.goal}

Act as an expert AI Career Mentor.
Generate highly personalized output.

Use student's actual name throughout the report.

Avoid generic advice.

Provide practical recommendations.

Make response professional, structured and career-focused. 

Generate a highly personalized, deep-dive Career Intelligence Report. 

Rules:
- Provide comprehensive explanations for every recommendation.
- Use the student's actual skills, interests, and goals to build a unique path.
- Mention specific tools, frameworks, and industry-standard certifications.
- Explain the logic behind each step (The "WHY").
- Maintain a professional, mentorship-focused tone.
- Use Markdown headers, bold text, and structured lists.
- Avoid generic filler text.
- Be thorough and detailed; do not worry about brevity. Provide actionable, high-quality content.

Format:

## 🎯 Career Analysis
- Provide a detailed evaluation of how their current background aligns with the goal. 
- Analyze strengths and specific industry opportunities.

## 📚 Skill Gap Analysis
- Break down Current vs. Missing skills in detail.
- Provide a prioritized learning order with reasoning for each skill.

## 🗺 Learning Roadmap
### Month 1-2: Foundation & Core Tech
- Deep dive into topics, specific libraries/tools, and resources to use.

### Month 3-4: Intermediate Application
- Practical implementations and advanced concepts.

### Month 5-6: Specialization & Mastery
- Advanced projects, industry trends, and portfolio solidification.

## 🚀 Recommended Projects
- Provide 3 high-impact portfolio projects. 
- Include: Project Name, Skills Learned, Technical Stack, and a brief "How to build it" summary.

## 🎤 Interview Strategy
- Provide detailed advice on technical topics to master.
- Tips for project explanations and resume highlights for recruiters.

## 📈 Progress Milestones
- Define clear, achievable goals for 30, 60, 90, and 180 days with specific outcome metrics.
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}], 
        model="llama-3.3-70b-versatile",
    )
      
    return {
        "roadmap": completion.choices[0].message.content
    }


@app.post("/career-analysis")
def career_analysis(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY Career Analysis report based on the student's profile.

Rules:
- Personalized and highly actionable
- Use markdown formatting with bullet points
- Under 250 words
- Avoid long paragraphs and generic advice
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}


@app.post("/skill-gap")
def skill_gap(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY Skill Gap Analysis based on the career goal.

Include:
- Current Skills
- Missing Skills
- Priority Skills to Learn First

Rules:
- Use markdown formatting with bullet points
- Avoid essays and keep it completely personalized
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}


@app.post("/roadmap-builder")
def roadmap_builder(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY a structured Learning Roadmap.

Format exactly like this with markdown:
### Month 1-2
- Topics and specific technologies

### Month 3-4
- Topics and specific technologies

### Month 5-6
- Topics and specific technologies

Rules:
- Use bullet points only
- Personalize based on current skills and goal
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}


@app.post("/project-recommender")
def project_recommender(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY 3 portfolio project recommendations.

For each project, include exactly:
- **Project Name:** Name of the project
- **Skills Learned:** Technologies and concepts used
- **Difficulty:** Easy / Medium / Hard with a short explanation

Rules:
- Use markdown formatting
- Projects must align directly with the student's interests and career goal
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}


@app.post("/interview-planner")
def interview_planner(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY a strategic Interview Preparation Plan.

Include:
- Technical Topics to prepare
- Resume Tips matching the career goal
- Project Discussion Strategy

Rules:
- Use markdown formatting with clear bullet points
- No generic interview tips, keep it highly role-specific
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}


@app.post("/progress-tracker")
def progress_tracker(data: ToolInput):

    prompt = f"""
Skills: {data.skills}
Interests: {data.interests}
About Student (Background/Context): {data.about}

Generate personalized and actionable insights.

Avoid generic advice.

Provide practical recommendations.

Keep response professional and easy to understand.

Use clear headings and bullet points where appropriate.

Generate ONLY high-impact Progress Milestones.

Format exactly like this with markdown:
- **30 Days:** Actionable milestone
- **60 Days:** Actionable milestone
- **90 Days:** Actionable milestone
- **180 Days:** Actionable milestone

Rules:
- Keep statements concrete, measurable, and personalized
"""

    completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
    )

    return {"result": completion.choices[0].message.content}