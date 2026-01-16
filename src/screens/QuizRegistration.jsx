import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/quizRegistration.css";

const QuizRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    department: "",
    year: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await api.post("/quiz/register", formData);
      const candidateId = response.data?.candidateId;
      if (!candidateId) {
        throw new Error("Registration failed.");
      }
      localStorage.setItem("quizCandidateId", candidateId);
      localStorage.setItem(
        "quizCandidate",
        JSON.stringify({ ...formData, id: candidateId })
      );
      navigate("/quiz");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This email or phone number has already been used.");
      } else {
        setError("Unable to register. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-register-page">
      <div className="quiz-register-card">
        <div className="quiz-register-header">
          <p className="quiz-register-kicker">Candidate Registration</p>
          <h1>Before you board the quiz</h1>
          <p className="quiz-register-subtitle">
            Share a few details to unlock the quiz challenge.
          </p>
        </div>

        <form className="quiz-register-form" onSubmit={handleSubmit}>
          <div className="quiz-register-grid">
            <label className="quiz-register-field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="quiz-register-field">
              <span>Phone No</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label className="quiz-register-field">
              <span>Email ID</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="quiz-register-field">
              <span>Course</span>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </label>
            <label className="quiz-register-field">
              <span>Department</span>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </label>
            <label className="quiz-register-field">
              <span>Year</span>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
              </select>
            </label>
          </div>

          {error && <p className="quiz-register-error">{error}</p>}
          <button
            type="submit"
            className="quiz-register-submit"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizRegistration;
