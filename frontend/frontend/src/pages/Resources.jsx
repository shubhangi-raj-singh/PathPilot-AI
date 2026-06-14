import "../tool.css";
import { useNavigate } from "react-router-dom";

function Resources() {
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

        <h1>Learning Resources</h1>

        <div className="tool-note">
          ✦ Curated resources to accelerate your career journey
        </div>

        <div className="roadmap-output">

          <h2>📚 Learning Platforms</h2>

<p>
These platforms provide structured learning paths, industry-recognized certifications,
and hands-on projects that help students build strong foundations and stay competitive in today's job market.
</p>

<ul>
  <li>
    <strong>Coursera</strong> – Offers professional certificates from Google, IBM, Meta, Microsoft and other leading companies. Great for career-focused learning and resume-building credentials.
  </li>

  <li>
    <strong>edX</strong> – Access university-level courses from institutions such as Harvard, MIT, Stanford and Berkeley. Ideal for gaining deep theoretical knowledge.
  </li>

  <li>
    <strong>Udemy</strong> – Practical project-based courses covering programming, AI, cloud computing, design, and business skills. Suitable for quick skill acquisition.
  </li>

  <li>
    <strong>freeCodeCamp</strong> – Completely free platform offering certifications, coding exercises, real-world projects, and interview preparation resources.
  </li>

  <li>
    <strong>CS50 by Harvard</strong> – One of the world's most popular computer science courses, covering programming fundamentals and problem-solving skills.
  </li>

  <li>
    <strong>MIT OpenCourseWare</strong> – Free access to high-quality university lectures, assignments, and learning materials across multiple technical domains.
  </li>
</ul>

          <h2>💻 Coding Practice</h2>

<p>
Technical interviews require strong problem-solving skills. These platforms help improve logical thinking, coding speed, and confidence through continuous practice.
</p>

<ul>
  <li><strong>LeetCode</strong> – Industry-standard platform for DSA and coding interview preparation.</li>

  <li><strong>HackerRank</strong> – Coding challenges, certifications, and company hiring assessments.</li>

  <li><strong>Codeforces</strong> – Competitive programming contests that strengthen algorithmic thinking.</li>

  <li><strong>GeeksforGeeks</strong> – Comprehensive tutorials, interview experiences, and placement resources.</li>

  <li><strong>CodeChef</strong> – Programming competitions and learning resources for beginners and advanced learners.</li>

  <li><strong>InterviewBit</strong> – Structured interview preparation roadmap with company-specific questions.</li>
</ul>

          <h2>🤖 AI & Machine Learning</h2>

<p>
Explore modern AI technologies including Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, and Large Language Models.
</p>

<ul>
  <li><strong>Kaggle</strong> – Datasets, competitions, notebooks, and real-world machine learning challenges.</li>

  <li><strong>DeepLearning.AI</strong> – Industry-leading AI specializations created by Andrew Ng.</li>

  <li><strong>Hugging Face</strong> – Resources for Transformers, LLMs, NLP applications, and open-source AI models.</li>

  <li><strong>Google AI Learning Path</strong> – Official AI learning materials and practical guides.</li>

  <li><strong>Fast.ai</strong> – Practical deep learning courses focused on real-world implementation.</li>

  <li><strong>OpenAI Documentation</strong> – Learn prompt engineering, AI APIs, and modern generative AI concepts.</li>
</ul>

          <h2>🚀 Project Building</h2>

<p>
Projects demonstrate practical skills better than certificates alone. Building projects helps students develop portfolios that stand out during internships and placements.
</p>

<ul>
  <li><strong>GitHub</strong> – Host projects, collaborate with developers, and showcase technical skills.</li>

  <li><strong>Frontend Mentor</strong> – Real-world frontend challenges for portfolio development.</li>

  <li><strong>Open Source Contributions</strong> – Gain experience by contributing to active community projects.</li>

  <li><strong>Hackathons & Innovation Challenges</strong> – Build solutions under real-world constraints and deadlines.</li>

  <li><strong>Devpost</strong> – Discover hackathons and innovation competitions worldwide.</li>

  <li><strong>Kaggle Projects</strong> – Practical machine learning and data science portfolio projects.</li>
</ul>

          <h2>🎯 Career Development</h2>

<p>
A successful career requires technical expertise, professional branding, communication skills, networking, and continuous learning.
</p>

<ul>
  <li><strong>LinkedIn Learning</strong> – Professional courses focused on career advancement.</li>

  <li><strong>Resume Building Resources</strong> – Create ATS-friendly resumes and portfolios.</li>

  <li><strong>Interview Preparation Guides</strong> – Technical and behavioral interview preparation.</li>

  <li><strong>Professional Networking Communities</strong> – Connect with mentors, recruiters, and industry professionals.</li>

  <li><strong>GitHub Portfolio Development</strong> – Build an impressive public profile showcasing projects.</li>

  <li><strong>Personal Branding</strong> – Develop a strong online presence through LinkedIn, blogs, and project showcases.</li>
</ul>

        </div>

      </div>

    </div>
  );
}

export default Resources;