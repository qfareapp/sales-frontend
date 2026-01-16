import React, { useEffect, useRef, useState } from "react";
import "../styles/managementPresentation.css";

const headlineStats = [
  { label: "IR revenue share", value: "~65%" },
  { label: "Installed capacity", value: "14,000-15,000 wagons/year" },
  { label: "FY25-26 output", value: "9,264 VUs" },
  { label: "Q4 value", value: "INR 1,134.98 Cr" },
];

const keyMessages = [
  "Indian Railways remains the backbone of freight (~65% revenue contribution), but demand is cyclical and policy-driven.",
  "Global rail freight demand is structurally rising due to mineral and agri flows, fleet replacement, and cost and ESG-driven modal shift (rail ~40% lower emissions).",
  "Strategic imperative: de-risk IR dependence, improve margin mix via exports and private customers, and maximise utilisation of installed capacity.",
];

const marketIndia = [
  "Stable IR wagon demand with strong policy backing (NRP target: rail share to ~45% by 2030).",
  "Private sidings, PPPs, and logistics parks expanding.",
  "Shift toward higher-value wagons and lifecycle services.",
];

const marketGlobal = [
  "Africa: mining, agri-bulk, fuel logistics.",
  "Middle East: tank and bulk wagons.",
  "South Asia and ASEAN: infrastructure-led mixed freight.",
];

const capacityFramework = [
  { title: "Manufacturing footprint", detail: "3 manufacturing units with execution flexibility." },
  { title: "Installed capacity", detail: "~14,000-15,000 wagons/year." },
  { title: "Funding model", detail: "IR profitability supports baseline opex; exports and private orders drive incremental growth." },
  { title: "Objective", detail: "High asset utilisation and margin expansion via better product mix." },
];

const performanceStats = [
  { label: "Industry YTD share", value: "~26.9%" },
  { label: "FY25-26 value", value: "INR 3,467 Cr" },
  { label: "FY25-26 volumes", value: "9,264 VUs" },
  { label: "Q4 volumes", value: "2,997 VUs" },
];

const opportunities = [
  "Multi-year IR freight growth visibility.",
  "Higher axle-load wagons (22.9T to 32.5T) driving value-added demand.",
  "Export acceptance of Indian wagons rising.",
  "Private freight expanding beyond coal into containers, auto, and fertilisers.",
  "Margin upside from better mix and utilisation.",
];

const pipelineTypes = ["Tank", "Open", "Hopper", "Special wagons"];

const actionSales = [
  "Country-wise focus teams (Africa, Middle East, ASEAN).",
  "Structured enquiry-to-closure follow-ups.",
  "Partner-led market access (EPCs, lessors, logistics firms).",
];

const actionTechnical = [
  "Early design and spec engagement.",
  "Standard export wagon platforms.",
  "Faster techno-commercial closures.",
];

const restructureMarketing = [
  "Separate verticals: Indian Railways, Exports, Private customers.",
  "Clear account ownership.",
];

const restructureTechnical = [
  "Dedicated proposal and design cell.",
  "Faster drawing, costing, compliance.",
  "International standards support.",
];

const marketingInitiatives = [
  "Export-focused Texmaco website.",
  "LinkedIn thought leadership.",
  "CRM-driven sales lifecycle.",
  "Country and customer dashboards.",
  "Global exhibitions and B2B forums.",
];

const salesProcess = [
  "Centralised enquiry capture.",
  "Stage-wise tracking (Lead to Order).",
  "Win-loss analysis.",
  "Board-level forecasting dashboards.",
];

const strategicOutcome = [
  "Higher enquiry-to-order conversion.",
  "Faster execution and better utilisation.",
  "Stronger export and private mix.",
  "Sustainable margins with lower cyclicality.",
];

const ManagementPresentation = () => {
  const pageRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      const tag = event.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") {
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        window.scrollBy({ top: 80, behavior: "smooth" });
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        window.scrollBy({ top: -80, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleFullscreen = async () => {
    if (!pageRef.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await pageRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen request failed", error);
    }
  };

  return (
    <>
      <div className="mp-fullscreen-fab">
        <button type="button" className="mp-fullscreen-btn" onClick={handleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button>
      </div>
      <div className="mp-page" ref={pageRef}>
        <header className="mp-hero">
          <div className="mp-hero-text">
            <span className="mp-label">Management Presentation</span>
            <h1>Texmaco Growth Strategy Overview</h1>
            <p>
              A colourful, slide-style summary with key insights, analysis, and
              graphical snapshots for board and leadership review.
            </p>
          </div>
          <div className="mp-hero-grid">
            {headlineStats.map((stat) => (
              <div key={stat.label} className="mp-hero-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </header>

      <section className="mp-section mp-sunrise">
        <div className="mp-section-head">
          <span>01</span>
          <div>
            <h2>Context and Strategic Rationale</h2>
            <p>Stability exists; growth must come from diversification.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>Key messages</h3>
            <ul>
              {keyMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mp-card mp-card-strong">
            <h3>Revenue exposure</h3>
            <div className="mp-donut" style={{ "--value": 65 }}>
              <div>
                <strong>~65%</strong>
                <span>IR freight revenue share</span>
              </div>
            </div>
            <div className="mp-chip-row">
              <span>De-risk IR dependence</span>
              <span>Improve margin mix</span>
              <span>Maximise utilisation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-ocean">
        <div className="mp-section-head">
          <span>02</span>
          <div>
            <h2>Global and India Market Overview</h2>
            <p>Texmaco is positioned across multiple growth pools.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>India</h3>
            <ul>
              {marketIndia.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mp-meter">
              <div>
                <span>NRP target share</span>
                <strong>~45% by 2030</strong>
              </div>
              <div className="mp-bar">
                <div className="mp-bar-fill" style={{ width: "45%" }} />
              </div>
            </div>
          </div>
          <div className="mp-card">
            <h3>Global</h3>
            <ul>
              {marketGlobal.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mp-geo">
              <div>Africa</div>
              <div>Middle East</div>
              <div>South Asia</div>
              <div>ASEAN</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-leaf">
        <div className="mp-section-head">
          <span>03</span>
          <div>
            <h2>Capacity and Financial Framework</h2>
            <p>Growth is internally funded and operationally scalable.</p>
          </div>
        </div>
        <div className="mp-grid three">
          {capacityFramework.map((item) => (
            <div key={item.title} className="mp-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="mp-card mp-card-strong">
          <h3>Installed capacity utilisation</h3>
          <div className="mp-capacity">
            <div className="mp-capacity-bar">
              <div className="mp-capacity-fill" style={{ width: "72%" }} />
            </div>
            <div className="mp-capacity-legend">
              <span>Baseline IR load</span>
              <span>Export + Private upside</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-berry">
        <div className="mp-section-head">
          <span>04</span>
          <div>
            <h2>Current Performance Snapshot</h2>
            <p>Execution strength proven; growth lever lies outside IR.</p>
          </div>
        </div>
        <div className="mp-grid four">
          {performanceStats.map((stat) => (
            <div key={stat.label} className="mp-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
        <div className="mp-card">
          <h3>Momentum analysis</h3>
          <div className="mp-mini-bars">
            <div>
              <span>FY25-26 volumes</span>
              <div className="mp-bar">
                <div className="mp-bar-fill" style={{ width: "86%" }} />
              </div>
            </div>
            <div>
              <span>Q4 surge</span>
              <div className="mp-bar">
                <div className="mp-bar-fill" style={{ width: "62%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-citrus">
        <div className="mp-section-head">
          <span>05</span>
          <div>
            <h2>Opportunities Ahead</h2>
            <p>Shift from volume-led to value-led growth.</p>
          </div>
        </div>
        <div className="mp-card">
          <ul className="mp-bullet-grid">
            {opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mp-section mp-indigo">
        <div className="mp-section-head">
          <span>06</span>
          <div>
            <h2>Probable Pipeline - Overview</h2>
            <p>Pipeline exists; conversion discipline is missing.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>Total enquiry pipeline</h3>
            <div className="mp-emphasis">~3,388 wagons</div>
            <div className="mp-pie">
              <span>Private sector</span>
              <strong>100%</strong>
            </div>
          </div>
          <div className="mp-card">
            <h3>Diversified mix</h3>
            <div className="mp-chip-row">
              {pipelineTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
            <div className="mp-note">
              Early-stage pipeline with multi-type opportunities.
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-sky">
        <div className="mp-section-head">
          <span>07</span>
          <div>
            <h2>Action Plan - How We Achieve the Strategy</h2>
            <p>Win speed matters as much as cost.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>Sales and Marketing</h3>
            <ul>
              {actionSales.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mp-card">
            <h3>Technical</h3>
            <ul>
              {actionTechnical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mp-section mp-coral">
        <div className="mp-section-head">
          <span>08</span>
          <div>
            <h2>Marketing and Technical Team Restructuring</h2>
            <p>Accountability plus speed equals higher conversions.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>Marketing</h3>
            <ul>
              {restructureMarketing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mp-card">
            <h3>Technical</h3>
            <ul>
              {restructureTechnical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mp-section mp-violet">
        <div className="mp-section-head">
          <span>09</span>
          <div>
            <h2>Key Marketing Initiatives</h2>
            <p>Shift from reactive selling to market creation.</p>
          </div>
        </div>
        <div className="mp-grid three">
          {marketingInitiatives.map((item) => (
            <div key={item} className="mp-card mp-mini-card">
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="mp-section mp-mint">
        <div className="mp-section-head">
          <span>10</span>
          <div>
            <h2>Sales Process Transformation (CRM-Driven)</h2>
            <p>Predictable pipeline, not episodic wins.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <ul className="mp-stepper">
              {salesProcess.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mp-card mp-card-strong">
            <h3>Outcome</h3>
            <p>Predictable pipeline, not episodic wins.</p>
            <div className="mp-score">
              Forecasting readiness • Board-level visibility
            </div>
          </div>
        </div>
      </section>

      <section className="mp-section mp-noir">
        <div className="mp-section-head">
          <span>11</span>
          <div>
            <h2>Strategic Outcome</h2>
            <p>Execution plus market creation, not capacity addition.</p>
          </div>
        </div>
        <div className="mp-card mp-card-strong">
          <ul className="mp-bullet-grid">
            {strategicOutcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mp-quote">
            “Texmaco’s next growth phase is execution + market creation, not capacity addition.”
          </div>
        </div>
      </section>

      <section className="mp-section mp-sunrise">
        <div className="mp-section-head">
          <span>12</span>
          <div>
            <h2>Strategic Rationale to Achieve Pipeline Conversion</h2>
            <p>Build a predictable, scalable order pipeline anchored in core strengths.</p>
          </div>
        </div>
        <div className="mp-grid two">
          <div className="mp-card">
            <h3>Texmaco's Inherent Strengths</h3>
            <ul>
              <li>
                End-to-end wagon manufacturing capability with integrated control
                over design, fabrication, assembly, and delivery.
              </li>
              <li>
                Cost-competitive Indian manufacturing base enabling attractive
                value propositions for IR, private, and export markets.
              </li>
              <li>
                Proven execution credibility with Indian Railways, backed by
                consistent delivery of large and complex orders.
              </li>
            </ul>
          </div>
          <div className="mp-card">
            <h3>Key Gaps Identified</h3>
            <ul>
              <li>Absence of a centralized opportunity tracking and review mechanism.</li>
              <li>Fragmented follow-ups across markets and business segments.</li>
              <li>Limited visibility on conversion probability and pipeline quality.</li>
              <li>Result: Episodic order wins instead of a predictable pipeline.</li>
            </ul>
          </div>
        </div>
        <div className="mp-card mp-card-strong">
          <h3>Sales Process Transformation (CRM-Driven)</h3>
          <p>Objective: Build a predictable, scalable order pipeline.</p>
          <ul>
            <li>Centralised enquiry capture across IR, private, and export markets.</li>
            <li>Stage-wise opportunity tracking (Lead to Techno-commercial to Order).</li>
            <li>Win-loss analysis to improve conversion effectiveness.</li>
            <li>Board-level forecasting dashboards for visibility and decision-making.</li>
          </ul>
        </div>
      </section>
      </div>
    </>
  );
};

export default ManagementPresentation;
