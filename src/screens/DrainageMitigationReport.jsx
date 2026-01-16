import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/drainageMitigationReport.css";

const chronology = [
  {
    year: "2021-2022",
    title: "Issue Escalation Initiated",
    items: [
      "Letters to State Authorities",
      "KMDA tender issued (Rs 6.6 lakh)",
      "On-ground intervention: Joint inspection (KMDA + Texmaco)",
      "On-ground intervention: Desilting/dredging executed",
      "On-ground intervention: Rs 20 lakh spent (Rs 4.75 lakh CSR)",
    ],
    outcome: "Drainage issue formally acknowledged; immediate flood relief measures implemented.",
  },
  {
    year: "2023-2024",
    title: "Sanction and Funding Follow-ups / Self Contained Measures",
    items: [
      "Engagement: Multiple approvals and funding requests",
      "The catchment pockets beside the rail track was dredged and de-silted to enhance the holding capacity of storm water.",
    ],
    outcome: "Tangible reduction in rainwater logging observed during peak monsoon.",
  },
  {
    year: "2025-2026",
    title: "Government-level Review",
    items: [
      "Meeting with KMDA/UDMA/IR Senior Officials",
      "DPR prepared by KMDA/UDMA for comprehensive di-silting operation under company CSR fund (Rs 33 lakhs approx)",
    ],
    outcome: "Further improvement achieved in storm water discharge during monsoon.",
  },
];

const DrainageMitigationReport = () => {
  const pageRef = useRef(null);

  const handleExport = async () => {
    if (!pageRef.current) return;

    const pdf = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
      compress: true,
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 28;
    const imgWidth = pdfWidth - margin * 2;
    const maxPageHeight = pdfHeight - margin * 2;
    const elements = [
      pageRef.current.querySelector(".dm-hero"),
      ...pageRef.current.querySelectorAll(":scope > .dm-section"),
    ].filter(Boolean);

    let cursorY = margin;
    const addCanvasToPdf = (canvas) => {
      const pageHeightPx = Math.floor((maxPageHeight * canvas.width) / imgWidth);
      let renderedHeight = 0;

      while (renderedHeight < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedHeight);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");

        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            renderedHeight,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );
        }

        const imgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width;
        if (cursorY + imgHeight > pdfHeight - margin) {
          pdf.addPage();
          cursorY = margin;
        }
        const imgData = pageCanvas.toDataURL("image/jpeg", 0.82);
        pdf.addImage(imgData, "JPEG", margin, cursorY, imgWidth, imgHeight);
        cursorY += imgHeight + 12;
        renderedHeight += sliceHeight;
      }
    };

    for (const element of elements) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      addCanvasToPdf(canvas);
    }

    pdf.save("Drainage_Mitigation_Report.pdf");
  };

  return (
    <div className="dm-page" ref={pageRef}>
      <div className="dm-page-actions" data-html2canvas-ignore="true">
        <button type="button" className="dm-export-btn" onClick={handleExport}>
          Export PDF
        </button>
      </div>
      <header className="dm-hero">
        <div>
          <p className="dm-kicker">KMDA / UDMA – Texmaco</p>
          <h1>Revamping of External and Internal Stormwater Drainage System of AW & its Periphery</h1>
          <p className="dm-subtitle">
            Technical measures and chronological actions to address persistent
            waterlogging and ensure long-term improvement of stormwater discharge solutions.
          </p>
        </div>
        <div className="dm-hero-card">
          <h2>Background</h2>
          <ul>
            <li>Persistent waterlogging at Texmaco Agarpara Works, Labour Family Quarter, and adjoining Agarpara and Panihati Municipality wards during monsoons.</li>
            <li>Factory operations face layoffs and stoppage of nearly 30 days annually due to waterlogging and non-functioning Nikashi drains.</li>
            <li>Community health hazards in the locality of Kamarhati and Panihati Municipality.</li>
          </ul>
          
        </div>
      </header>

      <section className="dm-section">
        <h2>Problem Statement</h2>
        <div className="dm-story-grid">
          <article className="dm-story-card story-problem">
            <span className="dm-story-step">Problem</span>
            <h3>Water logging at Agarpara workshop during intense Rainfall</h3>
            <ul>
              <li>Recurring flooding threatens the rail tracks, workshops, machinery and other utility structures.</li>
              
              <li>Backflow of water from adjoining locality (1000 acres approx.)</li>
              <li>The existing stormwater drainage system is inadequate in discharging the stormwater load during intense rain</li>
              <li>Faulty invert level, huge siltation, garbage spillage from Dumping Yard</li>
              <li>Limited access for periodical de-sludging of the storm water drain.</li>
            </ul>
            
          </article>

          <article className="dm-story-card story-impact">
            <span className="dm-story-step">Impact</span>
            <h3>Impact Assessment</h3>
            <div className="dm-impact-grid">
              <div>
                <strong>Operations</strong>
                <span>Planned production gets affected during heavy rainfall.</span>
              </div>
              
              <div>
                <strong>Safety/Health</strong>
                <span>Potential health and safety hazard</span>
              </div>
              <div>
                <strong>Cost Implication</strong>
                <span>Restoration cost to meet structural integrity & Plant & Machinery.</span>
              </div>
              
            </div>
            <div className="dm-takeaway">Small water depth equals large business impact.</div>
          </article>

          <article className="dm-story-card story-root">
            <span className="dm-story-step">Root Causes</span>
            
            <div className="dm-cause-grid">
              <div>
                <h4>Physical / Site Factors</h4>
                <ul>
                  <li>AW factory is situated in low-lying area.</li>
                  <li>Backflow of water generated from adjoining area/locality.</li>
                </ul>
              </div>
              <div>
                <h4>Infrastructure Gaps</h4>
                <ul>
                  
                  <li>Inadequate water catchment pockets</li>
                  <li>Poor internal drainage connectivity</li>
                  <li>Lack of Mechanised disposal of storm water</li>
                </ul>
              </div>
              
            </div>
           
          </article>

          <article className="dm-story-card story-constraints">
            <span className="dm-story-step">Action Taken</span>
            <h3>Internal Activity</h3>
            <ul>
              <li>IIT (KGP) experts have been engaged to provide a Comprehensive & Sustainable solution to mitigate the persistent problem of waterlogging during periods of heavy rainfall</li>
              <li>Balanced shop floor raising is proposed in line with previous level (24,000 sq. mtr)</li>
              <li>Explore the feasibility of Rainwater Harvesting System, based on the findings/recomendations post study.</li>
              <li>Periodic desilting of peripheral drains of the factory.</li>
            </ul>
            
          </article>

          <article className="dm-story-card story-management">
            <span className="dm-story-step">What Management Can Do</span>
            <h3>Action Options</h3>
            <div className="dm-options">
              <div>
                <h4>Immediate / Operational</h4>
                <ul>
                  <li>Desilting of Drain and Rail culvert</li>
                  <li>Mechanised pumping of stormwater</li>
                  <li>Correction of drain invert</li>
                  <li>Re-sectioning of the existing (PD) of approx. 1.5KM to meet storm water load</li>
                </ul>
              </div>
              
            </div>
            
          </article>

          
        </div>
      </section>
<section className="dm-section">
        <h2>Overview</h2>
        <div className="dm-grid two">
          <div className="dm-card">
            <h3>Agencies Involved & Our Approach</h3>
            <ul>
              <li>Level 3: MiC / UDMA / IR</li>
              <li>Level 2: KMDA</li>
              <li>Level 1: Local Municipality(Kamarhati & Panihati)</li>
            </ul>
          </div>
          <div className="dm-card alt">
            <h3>Scope</h3>
            <ul>
              <li>Internal & External drainage upgradation</li>
              <li>Stormwater Management</li>
              <li>Periodically desilting of Stormwater drains of peripheral areas of Texmaco, Agarpara</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dm-section">
        <h2>Drainage Infrastructure & Improvement Plan</h2>
        <div className="dm-grid two">
          <div className="dm-card">
            <h3>Action Taken (Internal System)</h3>
            <ul>
              <li>Construction of R.C.C. Box drain from tapping point to pre takeoff point.</li>
              
              <li>Internal drainage system upgradation.</li>
              <li>RCC Box Drain: Bay 1-8 served by 166 m RCC box drain.</li>
              <li>Raising of floor (43000 sq. mtr. by 300 mm) corresponding HFL (Highest Flood Level)</li>
              <li>Rainwater harvesting system- A test well was installed inside plant to study intake behaviour of the well.</li>
              <li>IIT (KGP) experts have been engaged to provide a Comprehensive & Sustainable solution to mitigate the persistent problem of waterlogging during periods of heavy rainfall</li>

              <li>Explore the feasibility of Rainwater Harvesting System, based on the findings/recomendations post study.</li>
            </ul>
          </div>
          
        </div>
        <section className="dm-section">
        <h2>Action Taken (External) & Outcomes (2021–2025)</h2>
        <div className="dm-timeline-layout">
          <div className="dm-timeline-horizontal">
            {chronology.map((entry) => (
              <div key={entry.year} className="dm-timeline-card">
                <div className="dm-timeline-year">{entry.year}</div>
                {entry.title && <h3>{entry.title}</h3>}
                {entry.status && (
                  <span className="dm-timeline-status">{entry.status}</span>
                )}
                {entry.items.length > 0 && (
                  <ul>
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {entry.outcome && (
                  <div className="dm-timeline-outcome">Outcome: {entry.outcome}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <aside className="dm-timeline-takeaway">
          <h3>Board takeaway</h3>
          <p>
            Actions have progressed from escalation to execution to experimentation
            to policy-level engagement.
          </p>
        </aside>
      </section>
      </section>

      <section className="dm-section">
        <h2>Control & Monitoring</h2>
        <div className="dm-grid two">
          <div className="dm-card alt">
            <h3>Control Measures</h3>
            <ul>
              <li>Internal lock gate installed outside staff gate.</li>
              <li>Dedicated pumping arrangement provided.</li>
              <li>Dedicated stormwater drain integrated.</li>
            </ul>
          </div>
          <div className="dm-card">
            <h3>Monitoring</h3>
            <ul>
              <li>Recharge well installed in 2024.</li>
              <li>Studying intake behavior and groundwater response.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dm-section">
        <h2>Key Takeaways</h2>
        <div className="dm-card dm-callout">
          <ul>
            <li>Sustained engagement with KMDA / UDMA since 2021.</li>
            <li>Significant internal investment and CSR-led mitigation for improvement of storm water discharge.</li>
            <li>External execution remains critical for long-term resolution.</li>
            <li>Continuous improvement plan/initiatives</li>
          </ul>
        </div>
      </section>

      <section className="dm-section">
        <h2>Way Forward 2026</h2>
        <div className="dm-grid two">
          <div className="dm-card">
            <ul>
              <h3>Internal Measures</h3>
              <li>Finalize and execute KMDA / Railways desilting scope.</li>
              <li>Integrate internal and external drainage systems.</li>
              <li>Examining the feasibility for the self Contained solution by consultant,IIT KGP .</li>
            </ul>
          </div>
          <div className="dm-card alt">
            <ul>
              <h3>External Measures</h3>
              <li>Monitor effectiveness post-monsoon.</li>
              <li>Closure through joint certification by KMDA / Municipality.</li>
              <li>Enhancing the capacity of the existing storm water drain
                from Railway Box Culvert to BT Road School(Aryan School) Junction through resectioning/restructuring (Approx 1500mtr)by KMDA.</li>
                <li>DPR (KMDA/2025-2026/A-00119) of value approx. Rs 4Cr awating approval from Govt Of WB (Finance Dept.).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DrainageMitigationReport;
