import "../tool.css";
import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import projectRecommender from "../assets/project-recommender.png";

function ProjectRecommender() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [about, setAbout] = useState("");

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!skills.trim() || !interests.trim() || !about.trim()) {
      alert("Please fill all three fields before generating!");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post(
        "https://pathpilot-ai-xe60.onrender.com/project-recommender",
        {
          skills: skills.trim(),
          interests: interests.trim(),
          about: about.trim()
        }
      );

      if (res.data && res.data.result) {
        setOutput(res.data.result);

        setTimeout(() => {
          const outputElement = document.querySelector(".roadmap-output");
          if (outputElement) {
            outputElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else {
        setOutput("❌ Error: Response structure from backend is empty.");
      }
    } catch (err) {
  console.error("Error Details:", err);
  
  if (!err.response || err.message === "Failed to fetch") {
      setOutput("⚠️ Connection Lost: Unable to reach the server. Please check your internet connection and try again.");
  } else {
      
      setOutput("❌ Service Temporarily Unavailable: We are experiencing technical difficulties. Please refresh the page or try again in a few moments.");
  }
  console.error("PDF Generation Error:", error);
      alert("❌ Service Temporarily Unavailable: We are experiencing technical difficulties. Please try again in a few moments.");
}
    setLoading(false);
  };

  const downloadPDF = async () => {
    const input = document.querySelector(".tool-card");
    const pdfBtn = document.querySelector(".pdf-btn");
    const backBtn = document.querySelector(".back-btn");

    if (pdfBtn) pdfBtn.style.display = "none";
    if (backBtn) backBtn.style.display = "none";
    input.classList.add("pdf-render-mode");

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    input.classList.remove("pdf-render-mode");
    if (pdfBtn) pdfBtn.style.display = "block";
    if (backBtn) backBtn.style.display = "block";

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("Project_Recommendations.pdf");
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <div className="tool-card">
        <div className="tool-header-title">
          <img src={projectRecommender} alt="Project Recommender" />
          <h1>Project Recommender</h1>
        </div>

        <p>Discover projects that match your skills, interests and strengths.</p>

        <div className="tool-form">
          <input
            placeholder="Your Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            placeholder="Your Interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          <textarea
            placeholder="Tell us about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating Report..." : "Recommend Projects"}
          </button>

          {output && (
            <>
              <div
                className="roadmap-output"
                style={{ marginTop: "30px", width: "100%", textAlign: "left" }}
              >
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
              <button
                className="pdf-btn"
                onClick={downloadPDF}
                style={{ marginTop: "20px" }}
              >
                📄 Download PDF
              </button>
            </>
          )}

          <div className="tool-note">
            ✦ AI suggests portfolio-worthy projects tailored to your skills.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectRecommender;