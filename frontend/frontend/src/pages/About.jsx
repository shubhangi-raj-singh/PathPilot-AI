import "../tool.css";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="tool-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <div className="tool-card">

        <h1>About PathPilot AI</h1>

        <div className="tool-note">
          ✦ Your AI-Powered Career Navigation Companion
        </div>

        <div className="roadmap-output">

          <p>
            PathPilot AI is an intelligent career guidance platform designed
            to help students discover the right career path through
            personalized AI-driven insights and recommendations.
          </p>

          <h2>🎯 What PathPilot AI Does</h2>

          <ul>
            <li>Analyzes career interests and strengths</li>
            <li>Identifies skill gaps for target roles</li>
            <li>Generates personalized learning roadmaps</li>
            <li>Recommends impactful projects</li>
            <li>Provides interview preparation strategies</li>
            <li>Tracks learning progress and milestones</li>
          </ul>

          <h2>🧠 Core Features</h2>

          <ul>
            <li>Career Analyzer</li>
            <li>Skill Gap Detector</li>
            <li>Roadmap Builder</li>
            <li>Project Recommender</li>
            <li>Interview Planner</li>
            <li>Progress Tracker</li>
            <li>AI Career Roadmap Report Generator</li>
          </ul>

          <h2>⚙️ Technology Stack</h2>

          <ul>
            <li>React.js Frontend</li>
            <li>FastAPI Backend</li>
            <li>Google Gemini AI</li>
            <li>REST API Architecture</li>
          </ul>

          <h2>🚀 Vision</h2>

          <p>
            Our mission is to make career guidance accessible,
            personalized and actionable for every student,
            helping them move from confusion to clarity through AI.
          </p>

        </div>

      </div>

    </div>
  );
}

export default About;