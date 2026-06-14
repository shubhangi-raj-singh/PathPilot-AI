import { BrowserRouter, Routes, Route } from "react-router-dom";
import CareerAnalyzer from "./pages/CareerAnalyzer";
import SkillGap from "./pages/SkillGap";
import RoadmapBuilder from "./pages/RoadmapBuilder";
import ProjectRecommender from "./pages/ProjectRecommender";
import InterviewPlanner from "./pages/InterviewPlanner";
import ProgressTracker from "./pages/ProgressTracker";
import MasterRoadmap from "./pages/MasterRoadmap";
import Resources from "./pages/Resources";
import About from "./pages/About";
import React, { useState, useEffect } from 'react';
import './index.css';
import axios from "axios";
import logo from './assets/logo.png';
import heroCompass from './assets/hero-compass.png';
import careerAnalyzer from './assets/career-analyzer.png';
import skillGap from './assets/skill-gap.png';
import roadmapBuilder from './assets/roadmap-builder.png';
import projectRecommender from './assets/project-recommender.png';
import interviewPlanner from './assets/interview-planner.png';
import progressTracker from './assets/progress-tracker.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "🔍 Building detailed Career & Persona Analysis...",
    "🧠 Scanning industry requirements & mapping Skill Gaps...",
    "🗺️ Structuring your personalized 12-Week Learning Roadmap...",
    "💻 Generating tailored Technical & Capstone Recommended Projects...",
    "🎯 Formulating custom Interview Strategies & behavioral tips...",
    "✨ Finalizing your Progress Milestones track layout..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 5 ? prev + 1 : prev));
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (
      !name.trim() ||
      !skills.trim() ||
      !interests.trim() ||
      !goal.trim()
    ) {
      alert("Please complete all required fields to generate your personalized roadmap.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/generate-roadmap", {
        name,
        skills,
        interests,
        goal
      });

      console.log("API RESPONSE:", res.data);
      setLoading(false);
      navigate("/master-roadmap", {
        state: { roadmap: res.data.roadmap }
      });

    } catch (error) {
      console.log("ERROR:", error);
      setLoading(false);
      navigate("/master-roadmap", {
        state: { roadmap: "⚠️ We couldn't generate your roadmap right now. Please try again in a few moments." }
      });
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="nav-branding-group">
          <img src={logo} alt="PathPilot AI Logo" className="logo-img" />
          <span className="branding-title">PathPilot AI</span>
        </div>

        <div className="nav-right-side">
          <nav className="nav-links">
           <Link to="/" className="active">Home</Link>
           <Link to="/roadmap-builder">Roadmap</Link>
           <Link to="/resources">Resources</Link>
           <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-left">
          <div className="compass-container">
            <img src={heroCompass} alt="Hero Compass" className="hero-compass" />
          </div>
          
          <div className="hero-text-block">
            <h1 className="main-hero-title">PathPilot AI</h1>
            <p className="branding-subtitle">
              YOUR AI CAREER NAVIGATION AGENT ✦
            </p>
            <div className="small-silver-line"></div>
            <p className="description">
              Get personalized career guidance, skill recommendations, and a step-by-step roadmap to achieve your dreams.
            </p>
            
            <div className="quote-box">
              <span className="quote-icon">“</span>
              <p>The best journey is the one that is planned smartly. Let AI be <span className="highlight-text">your guide</span>.</p>
              <span className="sparkle-icon">✦</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="discovery-card">
            <div className="card-header">
              <span className="sparkle-blue">✦</span>
              <div>
                <h2>Start Your Discovery</h2>
                <p>Tell us about yourself and let AI do the magic</p>
              </div>
            </div>

            <form className="discovery-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input
                 type="text"
                 placeholder="Your Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Skills (e.g., Python, Java, Machine Learning)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                 type="text"
                 placeholder="Interests"
                 value={interests}
                 onChange={(e) => setInterests(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Career Goal (e.g., Data Scientist)"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="generate-btn"
                onClick={handleGenerate}>
                Generate My Roadmap
              </button>
            </form>

            <div className="card-footer">
              <span>🧠 100% AI-Powered</span>
              <span className="dot">•</span>
              <span>Personalized</span>
              <span className="dot">•</span>
              <span>Actionable</span>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <h3 className="section-title">
          <span className="title-line-left"></span>
          How PathPilot AI Helps You
          <span className="title-line-right"></span>
        </h3>

        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate("/career-analyzer")}>
            <div className="feature-icon-wrapper">
              <img src={careerAnalyzer} alt="Career Analyzer" />
            </div>
            <h4>Career Analyzer</h4>
            <p>Understand your strengths, interests, and ideal career matches.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/skill-gap")}>
            <div className="feature-icon-wrapper">
              <img src={skillGap} alt="Skill Gap Detector" />
            </div>
            <h4>Skill Gap Detector</h4>
            <p>Identify the skills you need to learn to reach your goal faster.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/roadmap-builder")}>
            <div className="feature-icon-wrapper">
              <img src={roadmapBuilder} alt="Roadmap Builder" />
            </div>
            <h4>Roadmap Builder</h4>
            <p>Get a personalized step-by-step roadmap to achieve your goals.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/project-recommender")}>
            <div className="feature-icon-wrapper">
              <img src={projectRecommender} alt="Project Recommender" />
            </div>
            <h4>Project Recommender</h4>
            <p>Build impressive projects that boost your resume and skills.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/interview-planner")}>
            <div className="feature-icon-wrapper">
              <img src={interviewPlanner} alt="Interview Planner" />
            </div>
            <h4>Interview Planner</h4>
            <p>Prepare smartly with questions, tips, and mock practice.</p>
          </div>

          <div className="feature-card" onClick={() => navigate("/progress-tracker")}>
            <div className="feature-icon-wrapper">
              <img src={progressTracker} alt="Progress Tracker" />
            </div>
            <h4>Progress Tracker</h4>
            <p>Track your progress and stay consistent on your journey.</p>
          </div>
        </div>
      </section>

      <footer className="bottom-banner">
        <div className="banner-content">
          <span className="banner-brain-icon">🧠</span>
          <p>Every great career needs a map. Let PathPilot AI build <span className="highlight-text">your perfect roadmap.</span></p>
          <span className="banner-sparkle">✦</span>
        </div>
      </footer>

      {loading && (
        <div className="reasoning-loader-overlay">
          <div className="loader-card">
            <div className="tech-spinner"></div>
            <h3 className="thinking-title">PathPilot AI is Thinking</h3>
            <div className="steps-container">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`step-item ${index === loadingStep ? 'active' : index < loadingStep ? 'completed' : 'pending'}`}
                >
                  <div className="step-indicator">
                    {index < loadingStep ? "✓" : index === loadingStep ? "●" : "○"}
                  </div>
                  <p className="step-text">{step}</p>
                </div>
              ))}
            </div>
            <p className="time-warning">Processing deep reasoning graphs, please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career-analyzer" element={<CareerAnalyzer />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/roadmap-builder" element={<RoadmapBuilder />} />
        <Route path="/project-recommender" element={<ProjectRecommender />} />
        <Route path="/interview-planner" element={<InterviewPlanner />} />
        <Route path="/progress-tracker" element={<ProgressTracker />} />
        <Route path="/master-roadmap" element={<MasterRoadmap />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;