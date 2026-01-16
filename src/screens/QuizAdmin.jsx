import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/quizAdmin.css";

const QuizAdmin = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const response = await api.get("/quiz");
        setCandidates(response.data?.data || []);
      } catch (err) {
        setError("Unable to load quiz records.");
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const renderStatus = (candidate) => {
    if (!candidate.quiz || candidate.quiz.score === undefined) {
      return <span className="quiz-admin-pill neutral">In Progress</span>;
    }
    return candidate.quiz.passed ? (
      <span className="quiz-admin-pill pass">Pass</span>
    ) : (
      <span className="quiz-admin-pill fail">Fail</span>
    );
  };

  const getDownloadName = (candidate) => {
    const base = (candidate.name || "candidate")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const original = candidate.resume?.originalName;
    if (original) {
      const ext = original.split(".").pop() || "pdf";
      return `${base}-resume.${ext}`;
    }
    const url = candidate.resume?.url || "";
    const urlExt = url.split(".").pop()?.split("?")[0] || "pdf";
    return `${base}-resume.${urlExt}`;
  };

  if (loading) {
    return (
      <div className="quiz-admin-page">
        <div className="quiz-admin-card">Loading quiz records...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-admin-page">
        <div className="quiz-admin-card">{error}</div>
      </div>
    );
  }

  return (
    <div className="quiz-admin-page">
      <div className="quiz-admin-header">
        <div>
          <p className="quiz-admin-kicker">Quiz Admin</p>
          <h1>Participant Overview</h1>
          <p className="quiz-admin-subtitle">
            Review registrations, scores, and resume uploads in one place.
          </p>
        </div>
        <div className="quiz-admin-count">
          <span>Total Candidates</span>
          <strong>{candidates.length}</strong>
        </div>
      </div>

      <div className="quiz-admin-table">
        <div className="quiz-admin-row quiz-admin-head">
          <span>Name</span>
          <span>Contact</span>
          <span>Course</span>
          <span>Year</span>
          <span>Status</span>
          <span>Score</span>
          <span>Resume</span>
        </div>

        {candidates.map((candidate) => (
          <div className="quiz-admin-row" key={candidate._id}>
            <span>
              <strong>{candidate.name}</strong>
              <small>{candidate.department}</small>
            </span>
            <span>
              <div>{candidate.phone}</div>
              <div className="muted">{candidate.email}</div>
            </span>
            <span>{candidate.course}</span>
            <span>{candidate.year}</span>
            <span>{renderStatus(candidate)}</span>
            <span>{candidate.quiz?.score ?? "-"}</span>
            <span>
              {candidate.resume?.url ? (
                <a
                  className="quiz-admin-link"
                  href={`${import.meta.env.MODE === "production" ? "https://sales-backend-covv.onrender.com/api" : "http://localhost:5000/api"}/quiz/${candidate._id}/resume`}
                  target="_blank"
                  rel="noreferrer"
                  download={getDownloadName(candidate)}
                >
                  Download Resume
                </a>
              ) : (
                <span className="muted">Not uploaded</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizAdmin;
