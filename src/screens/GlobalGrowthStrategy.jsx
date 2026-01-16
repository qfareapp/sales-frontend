import React from "react";
import "../styles/globalGrowthStrategy.css";

const heroStats = [
  { label: "IR freight revenue share", value: "~65%" },
  { label: "Target freight modal share", value: "~45% by 2030" },
  { label: "Installed capacity", value: "14,000-15,000 wagons/year" },
];

const contextPoints = [
  "Indian Railways (IR) remains the backbone of freight logistics, supported by strong policy focus and record capex; freight contributes ~65% of IR revenues. Demand is cyclical and policy-driven, necessitating diversification beyond a single customer base.",
  "Global rail freight demand is structurally rising, driven by mineral and agri-commodity movement (Africa and Middle East), fleet replacement in developing economies, and a shift from road to rail due to cost efficiency and ESG imperatives (rail ~40% lower emissions).",
  "Strategic imperative: de-risk IR dependence, improve margin mix through exports and private customers, and maximize plant capacity utilization by leveraging India's cost advantage and proven execution capabilities.",
];

const marketOverview = [
  {
    title: "India market",
    items: [
      "IR wagon demand remains stable, supported by sustained capex, freight-led revenue model (~65% from freight), and National Rail Plan targets to raise rail freight share from ~27% to ~45% by 2030.",
      "Private siding, PPP, and logistics park participation increasing, driven by PM Gati Shakti, National Logistics Policy, Dedicated Freight Corridors, and growing private freight operators.",
      "Shift toward higher-capacity and higher-value wagons, faster turnaround, and lifecycle-oriented solutions as IR modernizes rolling stock and maintenance practices.",
    ],
  },
  {
    title: "Global market",
    items: [
      "Africa: strong demand from mining, agri-bulk, and fuel logistics, with rail as the preferred mode for long-haul bulk movement in resource-rich economies.",
      "Middle East: demand led by tank wagons and bulk freight wagons, supported by energy logistics and industrial expansion.",
      "South Asia and ASEAN: mixed freight demand driven by infrastructure build-out, industrial growth, and fleet replacement in developing rail networks.",
    ],
  },
];

const capacityCards = [
  {
    title: "Manufacturing footprint",
    detail:
      "Operations across 3 manufacturing units, providing scale, flexibility, and execution depth across wagon, bogie, and fabrication segments.",
  },
  {
    title: "Installed capacity",
    detail:
      "Combined capacity of ~14,000-15,000 wagons per annum, adequate to service IR base demand while supporting incremental growth from exports and private customers.",
  },
  {
    title: "Funding model",
    detail:
      "Baseline opex funded through IR wagon profitability, ensuring stable cash support for core operations. Incremental capacity utilization and growth driven by export orders and private sector wagons, with selective product additions.",
  },
  {
    title: "Strategic objective",
    detail:
      "Achieve high asset utilization and margin expansion through improved product mix, higher value orders, and diversification beyond IR-led volumes.",
  },
];

const performanceHighlights = [
  {
    title: "IR-led revenue base",
    detail:
      "IR orders continue to form the major share of revenues and volumes, with Texmaco contributing ~26.9% of industry YTD production (Apr-Dec FY25-26). Output remains concentrated in high-run IR wagon families (BCNA, BOXNS, BOBRN).",
  },
  {
    title: "Export and private share under-leveraged",
    detail:
      "FY25-26 saw emerging traction in export and private orders, but contribution remains sub-scale relative to IR volumes, indicating clear headroom for diversification and value-mix improvement.",
  },
  {
    title: "Strong execution with Q4 acceleration",
    detail:
      "Delivered 9,264 VUs in FY25-26, supported by consistent execution through the year and a sharp Q4 ramp-up (2,997 VUs).",
  },
  {
    title: "Consolidation year with visible momentum",
    detail:
      "FY25-26 represented a consolidation phase, with moderated YoY volumes and value (INR 3,467 Cr). Q4 momentum (INR 1,134.98 Cr) reflects recovery and sets the platform for improved performance.",
  },
  {
    title: "Opportunity ahead",
    detail:
      "Performance remains execution-led and IR-anchored. There is a clear opportunity to convert enquiries and late-year momentum into a structured export and private sector pipeline, improving revenue visibility, diversification, and margins.",
  },
];

const opportunityList = [
  "Multi-year wagon demand visibility driven by IR target to increase freight modal share from ~27% to ~45% by 2030, supported by sustained capex and DFC rollout.",
  "Rising replacement and modernization cycle with higher axle-load, high-capacity wagons (22.9T -> 25T -> 32.5T) creating demand for advanced designs and value-added bogies and components.",
  "Export growth potential as Indian wagons, bogies, and underframes gain acceptance across Africa, Middle East, Europe, and select developed markets, leveraging India's cost competitiveness and proven execution.",
  "Private freight and logistics participation expanding with containerization, automobile logistics, fertilizers, foodgrains, and non-coal commodities, opening diversified order pipelines beyond IR.",
  "Capacity utilization and margin upside through improved mix of exports and private orders, better plant loading, and higher realization products across wagons, bogies, and accessories.",
];

const pipelineOverview = [
  { label: "Total enquiries covered", value: "~3,388 wagons" },
  { label: "Pipeline composition", value: "Private sector led enquiries" },
];

const pipelineSplit = [
  {
    title: "Indian Railways (base load)",
    detail:
      "Not reflected in this enquiry sheet; IR volumes continue as execution-led base orders outside the enquiry pipeline.",
  },
  {
    title: "Private freight operators",
    detail:
      "~3,388 wagons (100%). Includes leasing companies, logistics players, and private operators.",
  },
  {
    title: "Export markets",
    detail:
      "Not explicitly tagged in the sheet; some enquiries may translate into export-linked execution at later stages.",
  },
];

const pipelineStages = [
  "Enquiries",
  "Budgetary / quotation stage",
  "Expected progression to technical discussions and commercial negotiations",
  "Probability notes indicate partial rake conversion in several enquiries (e.g., 6-7 rakes out of 20).",
];

const pipelineMix = [
  "Tank and special wagons: BTAPM1, BTCS, BCFCM1, BLSS",
  "Open wagons: BOXNHL, BOSM, BFNS (22.9T), BRN (22.9T)",
  "Flat wagons: 100T Flat Wagon",
  "Specialized variants: BVCM (small quantity)",
];

const actionPlan = [
  {
    title: "Sales and Marketing (Market Access and Conversion)",
    items: [
      "Country-wise focus teams for Africa, Middle East, South Asia and ASEAN where rail is preferred for long-haul bulk movement and fleet replacement is accelerating.",
      "Structured follow-ups on enquiries to improve win rates through sustained technical and commercial engagement.",
      "Partner-led market access through local EPCs, logistics operators, and leasing companies to reduce entry barriers and execution risk.",
    ],
  },
  {
    title: "Technical and Product (Speed, Standardisation and Value)",
    items: [
      "Early-stage design and specification support for higher axle-load and specialized designs to improve tender success and approval timelines.",
      "Standard export wagon platforms (open, hopper, tank, flat) to enable faster execution and scale economies.",
      "Faster techno-commercial closure through proven designs, pre-approved specifications, and integrated responses.",
    ],
  },
  {
    title: "Strategic outcome (Why this works)",
    items: [
      "Higher enquiry-to-order conversion",
      "Faster execution and improved capacity utilization",
      "Stronger export and private customer mix",
      "Sustainable margin expansion with reduced IR cyclicality",
    ],
  },
];

const restructureBlocks = [
  {
    title: "Marketing",
    items: [
      "Separate customer-focused verticals: Indian Railways, Exports, Private customers.",
      "Clear account ownership across key customers and geographies to improve responsiveness and conversion effectiveness.",
      "Focused market development and pipeline building tailored to each segment's buying dynamics.",
    ],
  },
  {
    title: "Technical",
    items: [
      "Dedicated proposal and design support cell aligned with sales teams.",
      "Faster turnaround on drawings, costing, and techno-commercial compliance.",
      "Support for international standards and specifications to enable export and private sector order conversions.",
    ],
  },
];

const marketingInitiatives = [
  "Revamped Texmaco website (export and capability focused) to highlight credentials, plant capabilities, product families, certifications, and execution track record.",
  "Active LinkedIn thought leadership with regular content on projects executed, manufacturing capabilities, quality systems, and success stories.",
  "CRM-driven sales process for centralized enquiry capture, stage-wise tracking, win-loss analysis, and data-backed forecasting.",
  "Country and customer dashboards tracking enquiries, conversion status, order inflow, and execution by country, customer, and segment.",
  "Participation in global rail exhibitions and B2B forums to strengthen export presence and build partnerships.",
];

const salesProcessSteps = [
  {
    title: "Centralised enquiry capture",
    detail:
      "All enquiries across IR, exports, and private customers captured on a single CRM platform for visibility, ownership, and elimination of fragmented tracking.",
  },
  {
    title: "Stage-wise opportunity tracking (Lead -> Order)",
    detail:
      "Each opportunity tracked through defined stages: Lead, Quotation, Technical Discussion, Commercial Negotiation, Order.",
  },
  {
    title: "Win-loss analysis for continuous improvement",
    detail:
      "Capture win-loss reasons (pricing, technical fit, delivery, competition) to identify gaps, refine offerings, and improve conversion ratios.",
  },
  {
    title: "Data-backed forecasting for board review",
    detail:
      "CRM-driven dashboards provide real-time pipeline value, conversion probability, and expected order inflow.",
  },
];

const GlobalGrowthStrategy = () => {
  return (
    <div className="gs-page">
      <header className="gs-hero">
        <div className="gs-hero-text">
          <span className="gs-chip">Board Review</span>
          <h1>Texmaco Rail and Engineering Ltd</h1>
          <p className="gs-title">
            Global and Domestic Growth Strategy - Strategic Outlay and Execution Plan
          </p>
          <p className="gs-subtitle">
            Diversifying beyond IR while scaling exports and private freight to improve
            margins, stability, and capacity utilization.
          </p>
        </div>
        <div className="gs-hero-metrics">
          {heroStats.map((stat) => (
            <div key={stat.label} className="gs-metric">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </header>

      <section className="gs-section">
        <div className="gs-section-title">
          <h2>Context and Strategic Rationale</h2>
        </div>
        <div className="gs-grid three">
          {contextPoints.map((point, index) => (
            <div
              key={point}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.05}s` }}
            >
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gs-section gs-band">
        <div className="gs-section-title">
          <h2>Global and India Market Overview</h2>
        </div>
        <div className="gs-grid two">
          {marketOverview.map((block, index) => (
            <div
              key={block.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.08}s` }}
            >
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gs-callout">
          Implication: structural global opportunities and stable domestic demand
          support diversification beyond IR and expansion into export and private freight markets.
        </div>
      </section>

      <section className="gs-section">
        <div className="gs-section-title">
          <h2>Capacity and Financial Framework</h2>
        </div>
        <div className="gs-grid two">
          {capacityCards.map((card, index) => (
            <div
              key={card.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.06}s` }}
            >
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </div>
          ))}
        </div>
        <div className="gs-callout gs-callout-alt">
          Financial discipline with IR-backed stability, combined with export and private
          sector-led upside.
        </div>
      </section>

      <section className="gs-section gs-band">
        <div className="gs-section-title">
          <h2>Current Performance Snapshot</h2>
        </div>
        <div className="gs-grid three">
          {performanceHighlights.map((item, index) => (
            <div
              key={item.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.04}s` }}
            >
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="gs-callout">
          Stable IR base and proven execution delivered consolidation; scaling exports
          and private business is the key lever for the next growth cycle.
        </div>
      </section>

      <section className="gs-section">
        <div className="gs-section-title">
          <h2>Opportunities Ahead</h2>
        </div>
        <div className="gs-card gs-animate">
          <ul className="gs-list">
            {opportunityList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gs-section gs-band">
        <div className="gs-section-title">
          <h2>Probable Pipeline - Overview (as on 05-01-2026)</h2>
        </div>
        <div className="gs-grid two">
          <div className="gs-card gs-animate">
            <h3>Total pipeline</h3>
            <div className="gs-metric-list">
              {pipelineOverview.map((item) => (
                <div key={item.label} className="gs-metric">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="gs-card gs-animate" style={{ "--delay": "0.08s" }}>
            <h3>Pipeline split</h3>
            <ul>
              {pipelineSplit.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gs-grid two">
          <div className="gs-card gs-animate" style={{ "--delay": "0.12s" }}>
            <h3>Nature of pipeline</h3>
            <ul>
              {pipelineStages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="gs-card gs-animate" style={{ "--delay": "0.16s" }}>
            <h3>Wagon mix in pipeline</h3>
            <ul>
              {pipelineMix.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gs-callout">
          Pipeline is private-sector led, enquiry-heavy, and diversified across wagon types,
          presenting a strong opportunity to convert quotations into a structured, executable order book.
        </div>
      </section>

      <section className="gs-section">
        <div className="gs-section-title">
          <h2>Action Plan - How We Achieve the Strategy (Data-Backed)</h2>
        </div>
        <div className="gs-grid three">
          {actionPlan.map((block, index) => (
            <div
              key={block.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.06}s` }}
            >
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="gs-section gs-band">
        <div className="gs-section-title">
          <h2>Marketing and Technical Team Restructuring</h2>
        </div>
        <div className="gs-grid two">
          {restructureBlocks.map((block, index) => (
            <div
              key={block.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.08}s` }}
            >
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="gs-section">
        <div className="gs-section-title">
          <h2>Key Marketing Initiatives</h2>
        </div>
        <div className="gs-card gs-animate">
          <ul className="gs-list">
            {marketingInitiatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="gs-callout gs-callout-alt">
          Outcome: stronger global brand visibility, higher enquiry quality, improved conversion
          rates, and a predictable data-driven sales pipeline supporting export and private market growth.
        </div>
      </section>

      <section className="gs-section gs-band">
        <div className="gs-section-title">
          <h2>Sales Process Transformation (CRM-Driven)</h2>
        </div>
        <div className="gs-grid two">
          {salesProcessSteps.map((item, index) => (
            <div
              key={item.title}
              className="gs-card gs-animate"
              style={{ "--delay": `${index * 0.06}s` }}
            >
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="gs-callout">
          Outcome: improved sales discipline, higher enquiry-to-order conversion, faster
          decision-making, and a predictable, transparent pipeline aligned to growth objectives.
        </div>
      </section>

      <section className="gs-section">
        <div className="gs-banner">
          <div>
            <h2>Strategic Outcome</h2>
            <p>
              De-risk IR cyclicality while scaling exports and private freight, delivering
              higher asset utilization, stronger margins, and sustainable growth.
            </p>
          </div>
          <div className="gs-banner-stats">
            <span>Execution-driven</span>
            <strong>Stable base + growth upside</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalGrowthStrategy;
