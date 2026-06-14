import "../tool.css";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from 'react'; // useEffect add kiya

function MasterRoadmap() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const roadmap = location.state?.roadmap;

  
  useEffect(() => {
    if (!navigator.onLine) {
      setError("⚠️ Connection Lost: Please check your internet connection and try again.");
    }
  }, []);

  const downloadPDF = async () => {
    
    if (!navigator.onLine) {
      setError("⚠️ Connection Lost: Please check your internet connection.");
      return;
    }
    
    try {
      const input = document.querySelector(".tool-card");
      const pdfBtn = document.querySelector(".pdf-btn");

      if (pdfBtn) pdfBtn.style.display = "none";
      input.classList.add("pdf-render-mode");

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth
      });

      if (pdfBtn) pdfBtn.style.display = "block";
      input.classList.remove("pdf-render-mode");

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("PathPilot_AI_Roadmap.pdf");
    } catch (err) {
      setError("❌ Service Temporarily Unavailable: We are experiencing technical difficulties.");
    }
  };

  return (
    <div className="tool-page">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>

      <div className="tool-card">
        <h1>AI Career Roadmap Report</h1>
        
        {error && (
          <div className="error-message" style={{ padding: "20px", color: "#d9534f", textAlign: "center", border: "1px solid #d9534f", borderRadius: "8px", margin: "10px 0" }}>
            {error}
          </div>
        )}

        <div className="roadmap-output">
          {roadmap ? (
            <>
              <ReactMarkdown>{roadmap}</ReactMarkdown>
              {!error && ( // Agar error nahi hai tabhi PDF button dikhega
                <button className="pdf-btn" onClick={downloadPDF}>📄 Download PDF</button>
              )}
            </>
          ) : !error && (
            <div className="error-message" style={{ padding: "20px", color: "#d9534f", textAlign: "center" }}>
              <h3>⚠️ Unable to load the report</h3>
              <p>Please return to the dashboard and generate the roadmap again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MasterRoadmap;