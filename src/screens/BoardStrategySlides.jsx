import React from "react";
import "../styles/boardStrategySlides.css";

const heroStats = [
  { label: "IR freight revenue share", value: "~65%" },
  { label: "Installed capacity", value: "14,000-15,000 wagons per year" },
  { label: "FY25-26 output", value: "9,264 VUs" },
];

const keyMessages = [
  "Indian Railways remains the backbone of freight (~65% revenue contribution), but demand is cyclical and policy-driven.",
  "Global rail freight demand is structurally rising due to mineral and agri flows, fleet replacement, and cost and ESG-driven modal shift (rail ~40% lower emissions).",
  "Strategic imperative: de-risk IR dependence, improve margin mix via exports and private customers, and maximise utilisation of installed capacity.",
];

const strategicImperative = [
  "De-risk IR dependence",
  "Improve margin mix via exports and private customers",
  "Maximise utilisation of installed capacity",
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
  {
    title: "Manufacturing footprint",
    detail: "3 manufacturing units with execution flexibility.",
  },
  {
    title: "Installed capacity",
    detail: "~14,000-15,000 wagons per year.",
  },
  {
    title: "Funding model",
    detail: "IR profitability supports baseline opex; export and private orders drive incremental growth.",
  },
];

const performanceStats = [
  { label: "Industry share", value: "~26.9% YTD output" },
  { label: "FY25-26 value", value: "INR 3,467 Cr" },
  { label: "Q4 output", value: "2,997 VUs" },
  { label: "Q4 value", value: "INR 1,134.98 Cr" },
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
  "Faster drawing, costing, and compliance.",
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

const BoardStrategySlides = () => {
  return (
    <div className="bs-page">
      <header className="bs-hero">
        <div className="bs-hero-text">
          <span className="bs-label">Board Pack</span>
          <h1>Growth Strategy Slides</h1>
          <p className="bs-subtitle">
            A colourful, board-ready summary of the global and domestic growth plan.
          </p>
        </div>
        <div className="bs-hero-panel">
          {heroStats.map((stat) => (
            <div key={stat.label} className="bs-hero-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </header>

      <section className="bs-slide theme-sunrise" style={{ "--delay": "0.05s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">01</span>
          <div>
            <h2>Context and Strategic Rationale</h2>
            <p>Key messages</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <ul>
              {keyMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bs-card bs-card-strong">
            <h3>Strategic imperative</h3>
            <ul>
              {strategicImperative.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="bs-takeaway">Board takeaway: Stability exists; growth must come from diversification.</div>
          </div>
        </div>
      </section>

      <section className="bs-slide theme-ocean" style={{ "--delay": "0.1s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">02</span>
          <div>
            <h2>Global and India Market Overview</h2>
            <p>Where demand is building</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <h3>India</h3>
            <ul>
              {marketIndia.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bs-card">
            <h3>Global</h3>
            <ul>
              {marketGlobal.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bs-takeaway">
          Implication: Texmaco is positioned to participate across multiple growth pools.
        </div>
      </section>

      <section className="bs-slide theme-leaf" style={{ "--delay": "0.15s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">03</span>
          <div>
            <h2>Capacity and Financial Framework</h2>
            <p>How the engine scales</p>
          </div>
        </div>
        <div className="bs-grid three">
          {capacityFramework.map((item) => (
            <div key={item.title} className="bs-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="bs-card bs-card-strong">
          <h3>Objective</h3>
          <p>High asset utilisation and margin expansion via better product mix.</p>
          <div className="bs-takeaway">Board comfort: Growth is internally funded and operationally scalable.</div>
        </div>
      </section>

      <section className="bs-slide theme-berry" style={{ "--delay": "0.2s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">04</span>
          <div>
            <h2>Current Performance Snapshot</h2>
            <p>Execution strength is clear</p>
          </div>
        </div>
        <div className="bs-grid four">
          {performanceStats.map((item) => (
            <div key={item.label} className="bs-stat">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="bs-card">
          <p>
            Export and private share is improving but remains sub-scale.
            Board message: execution strength proven; growth lever lies outside IR.
          </p>
        </div>
      </section>

      <section className="bs-slide theme-citrus" style={{ "--delay": "0.25s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">05</span>
          <div>
            <h2>Opportunities Ahead</h2>
            <p>Shift from volume-led to value-led growth</p>
          </div>
        </div>
        <div className="bs-card">
          <ul>
            {opportunities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="bs-takeaway">Strategic opportunity: shift from volume-led to value-led growth.</div>
        </div>
      </section>

      <section className="bs-slide theme-indigo" style={{ "--delay": "0.3s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">06</span>
          <div>
            <h2>Probable Pipeline - Overview</h2>
            <p>As of 05-01-2026</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <h3>Total enquiry pipeline</h3>
            <p className="bs-emphasis">~3,388 wagons</p>
            <p>Entirely private-sector led at present.</p>
          </div>
          <div className="bs-card">
            <h3>Diversified mix</h3>
            <div className="bs-chip-row">
              {pipelineTypes.map((type) => (
                <span key={type} className="bs-chip">
                  {type}
                </span>
              ))}
            </div>
            <div className="bs-takeaway">Reality check: pipeline exists; conversion discipline is missing.</div>
          </div>
        </div>
      </section>

      <section className="bs-slide theme-sky" style={{ "--delay": "0.35s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">07</span>
          <div>
            <h2>Action Plan - How We Achieve the Strategy</h2>
            <p>Win speed matters as much as cost</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <h3>Sales and Marketing</h3>
            <ul>
              {actionSales.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bs-card">
            <h3>Technical</h3>
            <ul>
              {actionTechnical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bs-takeaway">Logic: win speed matters as much as cost.</div>
      </section>

      <section className="bs-slide theme-coral" style={{ "--delay": "0.4s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">08</span>
          <div>
            <h2>Marketing and Technical Team Restructuring</h2>
            <p>Ownership and speed</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <h3>Marketing</h3>
            <ul>
              {restructureMarketing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bs-card">
            <h3>Technical</h3>
            <ul>
              {restructureTechnical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bs-takeaway">Outcome: accountability plus speed equals higher conversions.</div>
      </section>

      <section className="bs-slide theme-violet" style={{ "--delay": "0.45s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">09</span>
          <div>
            <h2>Key Marketing Initiatives</h2>
            <p>Shift from reactive selling to market creation</p>
          </div>
        </div>
        <div className="bs-card">
          <ul>
            {marketingInitiatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bs-takeaway">Intent: shift from reactive selling to market creation.</div>
      </section>

      <section className="bs-slide theme-mint" style={{ "--delay": "0.5s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">10</span>
          <div>
            <h2>Sales Process Transformation (CRM-Driven)</h2>
            <p>Predictable pipeline, not episodic wins</p>
          </div>
        </div>
        <div className="bs-grid two">
          <div className="bs-card">
            <ul>
              {salesProcess.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bs-card bs-card-strong">
            <h3>Outcome</h3>
            <p>Predictable pipeline, not episodic wins.</p>
          </div>
        </div>
      </section>

      <section className="bs-slide theme-noir" style={{ "--delay": "0.55s" }}>
        <div className="bs-slide-head">
          <span className="bs-slide-num">11</span>
          <div>
            <h2>Strategic Outcome</h2>
            <p>Execution plus market creation</p>
          </div>
        </div>
        <div className="bs-card">
          <ul>
            {strategicOutcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="bs-takeaway">
            Board summary: Texmaco's next growth phase is execution plus market creation, not capacity addition.
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardStrategySlides;
