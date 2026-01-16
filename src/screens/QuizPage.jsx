import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/quizPage.css";

const QuizPage = () => {
  const questions = useMemo(
    () => [
      {
        prompt: "Which year was Indian Railways established?",
        options: ["1853", "1872", "1901", "1920"],
        answerIndex: 0,
        background:
          "Indian Railways began its journey on 16 April 1853, when the first passenger train ran from Mumbai to Thane. This marked the birth of rail transport in India and laid the foundation for one of the world's largest rail networks.",
      },
      {
        prompt: "What was the first train route in India?",
        options: ["Kolkata - Delhi", "Mumbai - Thane", "Chennai - Bengaluru", "Delhi - Agra"],
        answerIndex: 1,
        background:
          "The historic Mumbai - Thane route covered 34 km and was hauled by three steam locomotives. It symbolized the start of modern transportation and industrial growth in India.",
      },
      {
        prompt: "What is the most commonly used track gauge in India?",
        options: ["Narrow Gauge", "Standard Gauge", "Broad Gauge", "Meter Gauge"],
        answerIndex: 2,
        background:
          "India predominantly uses Broad Gauge (1,676 mm), which supports higher speeds, heavier loads, and better stability, ideal for long-distance passenger and freight movement.",
      },
      {
        prompt: "Which type of wagons are mainly used to transport coal in India?",
        options: ["Box wagons", "Hopper wagons", "Flat wagons", "Tank wagons"],
        answerIndex: 1,
        background:
          "Coal is the backbone of India's freight traffic. Hopper wagons are specially designed for bulk commodities like coal, allowing faster loading and unloading and higher payload efficiency.",
      },
      {
        prompt: "What is the maximum operating speed of India's Vande Bharat trains (currently)?",
        options: ["130 km/h", "150 km/h", "160 km/h", "200 km/h"],
        answerIndex: 2,
        background:
          "Vande Bharat trains are designed for 160 km/h, representing India's push toward modern, semi-high-speed rail with indigenous technology.",
      },
      {
        prompt: "Indian Railways primarily earns maximum revenue from which segment?",
        options: ["Passenger tickets", "Tourism", "Freight transport", "Catering services"],
        answerIndex: 2,
        background:
          "Although passengers are higher in number, freight operations generate the majority of Indian Railways' revenue, mainly from coal, steel, cement, food grains, and containers.",
      },
      {
        prompt:
          "Texmaco Rail & Engineering Ltd is best known for manufacturing which of the following?",
        options: [
          "Passenger coaches and luxury trains",
          "Railway wagons and freight solutions",
          "Metro signaling systems",
          "Railway station retail outlets",
        ],
        answerIndex: 1,
        background:
          "Texmaco is a leading rail engineering company specializing in freight wagons, rail infrastructure, and engineering solutions, supporting India's logistics and mobility backbone.",
      },
      {
        prompt:
          "Approximately what percentage of India's total freight is transported by Railways today?",
        options: ["Around 10%", "Around 25%", "Around 40%", "Around 60%"],
        answerIndex: 1,
        background:
          "Currently, railways carry about one-fourth of India's freight, while roads dominate. Increasing rail share is a national priority to reduce logistics costs and emissions.",
      },
      {
        prompt:
          "Which company is among the oldest freight wagon manufacturers in India, with a rail engineering legacy dating back to before Independence?",
        options: [
          "Rail India Technical and Economic Service (RITES)",
          "Texmaco Rail & Engineering Ltd",
          "Bharat Earth Movers Limited (BEML)",
          "Rail Vikas Nigam Limited (RVNL)",
        ],
        answerIndex: 1,
        background:
          "Founded in 1939, Texmaco is among India's oldest rail engineering companies, playing a role in the country's railway growth before and after Independence.",
      },
      {
        prompt: "Which of these best describes Texmaco's role in Indian Railways?",
        options: [
          "A retail ticketing franchise",
          "A technology and engineering partner in rail infrastructure",
          "A private passenger train operator",
          "A tourism and hospitality provider",
        ],
        answerIndex: 1,
        background:
          "Texmaco works as a long-term engineering partner to Indian Railways, designing, manufacturing, and delivering critical freight and infrastructure solutions, not just components.",
      },
    ],
    []
  );

  const cutoff = 6;
  const candidate = useMemo(() => {
    const saved = localStorage.getItem("quizCandidate");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (error) {
      return null;
    }
  }, []);
  const candidateId = useMemo(() => localStorage.getItem("quizCandidateId"), []);
  const completionKey = useMemo(
    () => (candidateId ? `quizCompleted:${candidateId}` : null),
    [candidateId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeStatus, setResumeStatus] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [resumeSubmitted, setResumeSubmitted] = useState(false);

  useEffect(() => {
    if (!completionKey) return;
    const completed = localStorage.getItem(completionKey) === "true";
    if (!completed) return;

    const storedScore = Number(localStorage.getItem(`${completionKey}:score`) || 0);
    const storedAnswers = localStorage.getItem(`${completionKey}:answers`);
    if (storedAnswers) {
      try {
        const parsed = JSON.parse(storedAnswers);
        if (Array.isArray(parsed)) {
          setAnswers(parsed);
        }
      } catch (error) {
        // keep defaults if parsing fails
      }
    }
    setScore(storedScore);
    setShowResult(true);
    setQuizSubmitted(true);
  }, [completionKey]);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const hasAnswered = selectedAnswer !== null;

  const handleAnswer = (optionIndex) => {
    if (hasAnswered || showResult) return;

    const isCorrect = optionIndex === currentQuestion.answerIndex;
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionIndex;
    setAnswers(nextAnswers);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const submitQuiz = async (file) => {
    if (!candidateId) return;
    if (quizSubmitted && !file) return;
    const formData = new FormData();
    formData.append("answers", JSON.stringify(answers));
    formData.append("score", String(score));
    formData.append("passed", String(score >= cutoff));
    if (file) {
      formData.append("resume", file);
    }
    try {
      const response = await api.post(`/quiz/submit/${candidateId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (completionKey && !localStorage.getItem(completionKey)) {
        localStorage.setItem(completionKey, "true");
        localStorage.setItem(`${completionKey}:score`, String(score));
        localStorage.setItem(`${completionKey}:answers`, JSON.stringify(answers));
      }
      if (file) {
        setResumeStatus("Your resume has been submitted.");
        setResumeSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
      if (response.data?.resumeUrl && file) {
        setResumeStatus("Your resume has been submitted.");
      }
      setQuizSubmitted(true);
    } catch (err) {
      if (file) {
        setResumeStatus("Upload failed. Please try again.");
      }
    }
  };

  const handleNext = () => {
    if (!hasAnswered) return;
    if (currentIndex === questions.length - 1) {
      setShowResult(true);
      submitQuiz();
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleResumeSelect = (event) => {
    const file = event.target.files?.[0] || null;
    setResumeFile(file);
    setResumeStatus("");
  };

  const handleResumeSubmit = () => {
    if (!resumeFile) {
      setResumeStatus("Please add your resume to submit.");
      return;
    }
    submitQuiz(resumeFile);
  };

  if (!candidate || !candidateId) {
    return (
      <div className="quiz-page">
        <div className="quiz-panel quiz-registration-lock">
          <p className="quiz-result-kicker">Registration Required</p>
          <h2>Please register before starting the quiz.</h2>
          <Link className="quiz-next quiz-register-link" to="/quiz-register">
            Go to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-hero">
        <div className="quiz-hero-content">
          <p className="quiz-kicker">Texmaco Quiz Arena</p>
          <h1>How Sharp Is Your Rail IQ?</h1>
          <p className="quiz-subtitle">
            Answer all 10 questions. The cutoff is {cutoff}. Each choice
            reveals instant feedback.
          </p>
        </div>
        <div className="quiz-hero-card">
          <div className="quiz-metric">
            <span className="quiz-metric-label">Progress</span>
            <span className="quiz-metric-value">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="quiz-metric">
            <span className="quiz-metric-label">Score</span>
            <span className="quiz-metric-value">{score}</span>
          </div>
          <div className="quiz-metric">
            <span className="quiz-metric-label">Cutoff</span>
            <span className="quiz-metric-value">{cutoff}</span>
          </div>
        </div>
      </div>

      <div className="quiz-body">
        <div className="quiz-panel">
          {!showResult ? (
            <>
              <div className="quiz-question">
                <span className="quiz-question-index">
                  Question {currentIndex + 1}
                </span>
                <h2>{currentQuestion.prompt}</h2>
              </div>
              <div className="quiz-options">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === currentQuestion.answerIndex;
                  const isSelected = optionIndex === selectedAnswer;
                  const optionClass = [
                    "quiz-option",
                    hasAnswered && isCorrect ? "correct" : "",
                    hasAnswered && isSelected && !isCorrect ? "incorrect" : "",
                    isSelected ? "selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={option}
                      type="button"
                      className={optionClass}
                      onClick={() => handleAnswer(optionIndex)}
                      disabled={hasAnswered}
                    >
                      <span className="quiz-option-text">{option}</span>
                    </button>
                  );
                })}
              </div>
              <div className="quiz-feedback">
                {hasAnswered && selectedAnswer === currentQuestion.answerIndex && (
                  <span className="quiz-feedback-text correct">
                    Correct. Keep the momentum.
                  </span>
                )}
                {hasAnswered && selectedAnswer !== currentQuestion.answerIndex && (
                  <span className="quiz-feedback-text incorrect">
                    Not quite. Review the highlight and move on.
                  </span>
                )}
                {hasAnswered && (
                  <p className="quiz-feedback-background">
                    {currentQuestion.background}
                  </p>
                )}
              </div>
              <div className="quiz-actions">
                <button
                  type="button"
                  className="quiz-next"
                  onClick={handleNext}
                  disabled={!hasAnswered}
                >
                  {currentIndex === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="quiz-result">
              <p className="quiz-result-kicker">Final Result</p>
              <h2>{score >= cutoff ? "Rail IQ: Cleared!" : "Signal Red - Journey Ends Here"}</h2>
                            <p className="quiz-result-summary">
                {score >= cutoff
                  ? " \u{1F389} You nailed it! You\u2019ve won an Amazon Gift Voucher worth \u20B9100 \u{1F6CD}\uFE0F It\u2019ll zoom into your email inbox within 24 hours \u{1F680}"
                  : " \u{1F6A6} End of the line! The quiz journey stops here \u2014 but thanks for hopping on board! \u{1F604}"}
              </p>
              <div className="quiz-resume">
                <p className="quiz-resume-line">
                  Ready for the next stop? Drop your resume and let it ride the rails.
                </p>
                <div className="quiz-resume-controls">
                  <input
                    type="file"
                    className="quiz-resume-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeSelect}
                  />
                  <button
                    type="button"
                    className="quiz-resume-button"
                    onClick={handleResumeSubmit}
                  >
                    Submit Resume
                  </button>
                </div>
                {resumeStatus && (
                  <p className="quiz-resume-status">{resumeStatus}</p>
                )}
                {resumeSubmitted && (
                  <img
                    src="/Texmaco logo.png"
                    alt="Texmaco"
                    className="quiz-resume-logo"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;





