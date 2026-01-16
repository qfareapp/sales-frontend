import React from "react";
import "../styles/texmacoCyientDpr.css";

const partnershipAreas = [
  {
    title: "Partnership Area 1 - Rolling Stock Engineering",
    leftTitle: "Texmaco Builds",
    leftItems: [
      "Wagons, shells, bogie frames, fabricated assemblies",
    ],
    rightTitle: "Cyient Adds Value",
    rightItems: [
      "Detailed design and FEA analysis",
      "Sub-system engineering (electrical, propulsion interfaces)",
      "Design validation and testing support",
      "Embedded electronics integration (where required)",
    ],
    outcome: [
      "Faster design cycles",
      "Improved reliability and compliance",
      "Reduced re-engineering during execution",
    ],
  },
  {
    title: "Partnership Area 2 - Signaling and Control Systems",
    leftTitle: "Texmaco Role",
    leftItems: [
      "EPC execution of signaling and telecom projects",
      "Field implementation and integration",
    ],
    rightTitle: "Cyient Role",
    rightItems: [
      "Signaling system engineering (ETCS / CBTC / IXL)",
      "Design verification and validation",
      "Testing, commissioning, and system documentation",
      "Communication network design support",
    ],
    outcome: [
      "Stronger bidding capability",
      "Reduced execution risk",
      "Improved acceptance and commissioning timelines",
    ],
  },
  {
    title: "Partnership Area 3 - Digital and Smart Rail",
    leftTitle: "Texmaco Today",
    leftItems: [
      "Strong physical asset delivery",
      "Limited in-house digital platforms",
    ],
    rightTitle: "Cyient Contribution",
    rightItems: [
      "Digital twin for wagons and assets",
      "IoT-based condition monitoring",
      "Predictive maintenance platforms",
      "Cloud-based PLM and analytics",
      "AR/VR for training and maintenance",
    ],
    outcome: [
      "Smart wagon / smart EPC positioning",
      "Higher lifecycle value for customers",
      "Differentiation vs traditional manufacturers",
    ],
  },
  {
    title: "Partnership Area 4 - Infrastructure Inspection",
    leftTitle: "Texmaco Requirement",
    leftItems: [
      "Surveys and inspections for EPC planning",
      "Monitoring of track, bridges, rail corridors",
    ],
    rightTitle: "Cyient Capability",
    rightItems: [
      "LiDAR and mobile laser scanning",
      "Aerial mapping and imaging",
      "Asset condition assessment",
    ],
    outcome: [
      "Better project planning accuracy",
      "Reduced execution surprises",
      "Data-driven EPC delivery",
    ],
  },
  {
    title: "Partnership Area 5 - Aftermarket and Documentation",
    leftTitle: "Texmaco Need",
    leftItems: [
      "Technical manuals",
      "Maintenance documentation",
      "Warranty and lifecycle records",
    ],
    rightTitle: "Cyient Support",
    rightItems: [
      "Technical publications and IETMs",
      "Digital documentation platforms",
      "Lifecycle data management",
    ],
    outcome: [
      "Faster approvals and handovers",
      "Improved customer satisfaction",
      "Lower support overhead",
    ],
  },
  {
    title: "Partnership Area 6 - Safety Enhancements",
    leftTitle: "Texmaco Rolling Stock",
    leftItems: [
      "Wagons, coaches, shells supplied to operators",
    ],
    rightTitle: "Cyient Offering",
    rightItems: [
      "Cab safety and alert systems (e.g., Cycero)",
      "Integration with onboard systems",
    ],
    outcome: [
      "Enhanced safety without in-house product development",
      "Stronger value proposition to operators",
    ],
  },
];

const TexmacoCyientDpr = () => {
  return (
    <div className="tc-page">
      <header className="tc-hero">
        <div>
          <p className="tc-kicker">Texmaco x Cyient</p>
          <h1>Potential Partnership Areas in Rail and Transportation</h1>
          <p className="tc-subtitle">
            Aligning Texmaco manufacturing and EPC strengths with Cyient engineering and digital capabilities.
          </p>
        </div>
        <div className="tc-hero-card">
          <h2>Context and Objective</h2>
          <ul>
            <li>Identify Texmaco core build capabilities.</li>
            <li>Map Cyient complementary strengths.</li>
            <li>Highlight clear partnership opportunities.</li>
            <li>Avoid overlap; focus on value-add collaboration.</li>
          </ul>
          <div className="tc-callout">
            Rail projects are increasingly technology-heavy, and customers expect digital,
            safety, and lifecycle solutions. Partnerships reduce time-to-market and execution risk.
          </div>
        </div>
      </header>

      <section className="tc-section">
        <h2>Texmaco Core Strengths</h2>
        <div className="tc-grid two">
          <div className="tc-card">
            <h3>Rolling Stock and Manufacturing</h3>
            <ul>
              <li>Freight wagons (bulk, specialized, custom).</li>
              <li>Loco shells and fabricated assemblies.</li>
              <li>Coach and EMU structural components.</li>
              <li>Bogie frames, fabricated sub-assemblies.</li>
            </ul>
          </div>
          <div className="tc-card alt">
            <h3>Heavy Engineering and Castings</h3>
            <ul>
              <li>Large steel castings (bogies, couplers, CMS crossings).</li>
              <li>Heavy structural fabrication.</li>
              <li>Foundry-led integrated manufacturing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <h2>Texmaco EPC and Services Capability</h2>
        <div className="tc-grid two">
          <div className="tc-card">
            <h3>Rail EPC and Infrastructure</h3>
            <ul>
              <li>Track laying and civil works.</li>
              <li>Electrification (OHE).</li>
              <li>Signaling and telecom execution.</li>
              <li>Turnkey railway infrastructure projects.</li>
            </ul>
          </div>
          <div className="tc-card alt">
            <h3>Lifecycle and Commercial Services</h3>
            <ul>
              <li>Wagon leasing (JV model).</li>
              <li>Maintenance linked to EPC / rolling stock supply.</li>
              <li>Project execution at scale for IR and PSU clients.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <h2>Cyient Complementary Capabilities</h2>
        <div className="tc-card">
          <ul>
            <li>Engineering-led, technology-focused partner.</li>
            <li>No heavy manufacturing overlap.</li>
            <li>Strong in design, digital, signaling, and lifecycle services.</li>
          </ul>
        </div>
      </section>

      <section className="tc-section">
        <h2>Partnership Areas</h2>
        <div className="tc-partnerships">
          {partnershipAreas.map((area) => (
            <div key={area.title} className="tc-card partnership-card">
              <h3>{area.title}</h3>
              <div className="tc-grid two">
                <div>
                  <h4>{area.leftTitle}</h4>
                  <ul>
                    {area.leftItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{area.rightTitle}</h4>
                  <ul>
                    {area.rightItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="tc-outcome">
                <span>Outcome</span>
                <ul>
                  {area.outcome.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <h2>Competitive Positioning</h2>
        <div className="tc-grid three">
          <div className="tc-card">
            <h3>Texmaco</h3>
            <ul>
              <li>Manufacturing-led.</li>
              <li>EPC execution strength.</li>
              <li>Asset-heavy, scale-driven.</li>
            </ul>
          </div>
          <div className="tc-card alt">
            <h3>Cyient</h3>
            <ul>
              <li>Engineering-led.</li>
              <li>Digital and system intelligence.</li>
              <li>Asset-light, technology-driven.</li>
            </ul>
          </div>
          <div className="tc-card">
            <h3>Together</h3>
            <ul>
              <li>End-to-end rail solutions.</li>
              <li>Physical and digital integration.</li>
              <li>Stronger bids for large and complex projects.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tc-section">
        <h2>Strategic Benefits for Texmaco</h2>
        <div className="tc-card">
          <ul>
            <li>Access to advanced rail engineering talent.</li>
            <li>Digital capabilities without large capex.</li>
            <li>Faster entry into smart rail and signaling-heavy projects.</li>
            <li>Stronger positioning for export and JV opportunities.</li>
            <li>Reduced execution and technology risk.</li>
          </ul>
        </div>
      </section>

      <section className="tc-section">
        <h2>Conclusion</h2>
        <div className="tc-grid two">
          <div className="tc-card">
            <h3>Proposed Partnership Model</h3>
            <ul>
              <li>Texmaco: builds and executes.</li>
              <li>Cyient: designs, digitizes, and de-risks.</li>
            </ul>
          </div>
          <div className="tc-card alt">
            <h3>Next Steps</h3>
            <ul>
              <li>Identify pilot project (wagon, signaling EPC, or digital asset).</li>
              <li>Define clear scope split (build vs engineer).</li>
              <li>Explore MoU or project-based collaboration.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TexmacoCyientDpr;
