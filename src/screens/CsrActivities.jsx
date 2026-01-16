import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "../styles/managementDpr.css";

const CsrActivities = () => {
  const pageRef = useRef(null);
  const financialOverview = {
    netObligation: 282.7,
    disbursed: 86.78,
    approvedPending: 70.27,
    totalCommitted: 152.05,
    balance: 130.65,
  };

  const commitmentCoverage =
    (financialOverview.totalCommitted / financialOverview.netObligation) * 100;
  const disbursedShare =
    (financialOverview.disbursed / financialOverview.netObligation) * 100;
  const pendingShare =
    (financialOverview.approvedPending / financialOverview.netObligation) * 100;
  const balanceShare =
    (financialOverview.balance / financialOverview.netObligation) * 100;
  const disbursedOfCommitted =
    (financialOverview.disbursed / financialOverview.totalCommitted) * 100;

  const commitmentBreakdown = [
    {
      label: "Disbursed",
      amount: financialOverview.disbursed,
      percent: disbursedShare,
      tone: "",
    },
    {
      label: "Approved (pending)",
      amount: financialOverview.approvedPending,
      percent: pendingShare,
      tone: "teal",
    },
    {
      label: "Balance remaining",
      amount: financialOverview.balance,
      percent: balanceShare,
      tone: "",
    },
  ];

  const annexureADisbursed = [
    {
      agency: "Arogyam Centre",
      nature: "CSR disbursement (Jun-25, Sep-25, Dec-25)",
      amount: 1.36,
    },
    {
      agency: "School",
      nature: "CSR disbursement (Jun-25, Sep-25, Dec-25)",
      amount: 2.19,
    },
    {
      agency: "Umang Jaiswal",
      nature: "Sponsorship for participation in Italian Powerlifting Championship",
      amount: 1.5,
    },
    {
      agency: "Mr. Rajib Das (Oral Cancer)",
      nature: "Assistance towards medical treatment (1st tranche)",
      amount: 0.23,
    },
    {
      agency: "Mr. Rajib Das (Oral Cancer)",
      nature: "Assistance towards medical treatment (2nd tranche)",
      amount: 0.25,
    },
    {
      agency: "IICP",
      nature: "CSR contribution for children and adults with neurological impairment",
      amount: 3.1,
    },
    {
      agency: "Mr. Shankar Das",
      nature: "CSR payment for sports participation",
      amount: 1.75,
    },
    {
      agency: "School-based mental health programme (Govt schools)",
      nature: "For Class 9 students",
      amount: 15.0,
    },
    {
      agency: "Sur-O-Sadhana",
      nature: "Payment to raise fund for treatment of cancer patients",
      amount: 0.4,
    },
    {
      agency: "Tollygunge Golf Club",
      nature: "Purchase of ambulance from Fairway Sports Private Limited",
      amount: 8.63,
    },
    {
      agency: "Belgharia P.S.",
      nature: "Installation charges of CCTV surveillance system",
      amount: 8.46,
    },
    {
      agency: "Mr. Rajib Das (Oral Cancer)",
      nature: "Assistance towards medical treatment (3rd tranche)",
      amount: 0.22,
    },
    {
      agency: "Mahavir International",
      nature: "Support for running eye health camps",
      amount: 10.0,
    },
    {
      agency: "Royal Calcutta Golf",
      nature: "Purchase of ambulance from Fairway Sports Private Limited",
      amount: 8.69,
    },
    {
      agency: "Akshaya Patra Foundation",
      nature: "Payment for mid day meal programme (TWRL)",
      amount: 15.0,
    },
    {
      agency: "Rashtriya Sanik Sanstha",
      nature: "Payment for moral and Sainik training (TWRL)",
      amount: 10.0,
    },
  ];
  const annexureADisbursedSorted = [...annexureADisbursed].sort(
    (a, b) => b.amount - a.amount
  );

  const annexureBApproved = [
    {
      agency: "St. Jude Child Care Centre",
      nature: "Bone marrow transplants",
      amount: 40.0,
    },
    {
      agency: "Arogyam",
      nature: "Bearer salary",
      amount: 0.82,
    },
    {
      agency: "Estate School",
      nature: "Teacher salary and electricity charges",
      amount: 1.26,
    },
    {
      agency: "Direct implementation at Texmaco Estate School",
      nature: "Civil work",
      amount: 15.19,
    },
    {
      agency: "RSS Jankalyan School",
      nature: "Civil work",
      amount: 15.0,
    },
    {
      agency: "Belgharia Deshapriya Vidyaniketan Girls High School (HS)",
      nature: "Computers, laptops, software, and furniture",
      amount: 6.0,
    },
    {
      agency: "Play School by IICP",
      nature: "Project Jugnu",
      amount: 2.0,
    },
  ];
  const annexureBApprovedSorted = [...annexureBApproved].sort(
    (a, b) => b.amount - a.amount
  );

  const helpAgeProjects = [
    {
      project: "Mobile Healthcare Unit",
      area: "Industrial belt of North 24 Parganas, West Bengal",
      duration: "3 years (FY26-27 to 28-29)",
      cost: "Rs. 1.47 Cr",
      beneficiaries: "18,000-20,000 treatments (3,500-4,000 patients/year)",
    },
    {
      project: "One Stop Elderly Centre",
      area: "Kharagpur / Asansol / Bishnupur / Chadpur (one area at a time)",
      duration: "3 years",
      cost: "Rs. 1.05 Cr",
      beneficiaries: "12,000-15,000 treatments (2,500-3,000 patients/year)",
    },
    {
      project: "Tele-health Project",
      area: "West Bengal",
      duration: "3 years",
      cost: "Rs. 1.45 Cr",
      beneficiaries: "200 villages (~2,00,000 beneficiaries)",
    },
    {
      project: "Mobile Health Unit on Boat",
      area: "Sundarban, West Bengal",
      duration: "3 years",
      cost: "Rs. 96.84 lakh",
      beneficiaries: "10,000 beneficiaries annually",
    },
    {
      project: "Elder Self Help Groups",
      area: "West Bengal",
      duration: "3 years",
      cost: "Rs. 1.5-2 Cr",
      beneficiaries: "2,500 beneficiaries",
    },
  ];

  const helpAgeMinCr = 1.47 + 1.05 + 1.45 + 0.9684 + 1.5;
  const helpAgeMaxCr = 1.47 + 1.05 + 1.45 + 0.9684 + 2.0;
  const remainingCr = financialOverview.balance / 100;

  const smileMonthlyMin = 3;
  const smileMonthlyMax = 5;
  const smileCommitmentMonths = 15;
  const smileMinTotal = smileMonthlyMin * smileCommitmentMonths;
  const smileMaxTotal = smileMonthlyMax * smileCommitmentMonths;

  const newProposalTotal = 10 + 30 + 50 + 50;

  const handleExport = async () => {
    if (!pageRef.current) return;

    const pdf = new jsPDF({
      orientation: "l",
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
      pageRef.current.querySelector(".dpr-hero"),
      ...pageRef.current.querySelectorAll(":scope > .dpr-section"),
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

    pdf.save("CSR_Programme_Update_FY2025-26.pdf");
    return;
  };

  const renderTextPdf = () => {
    const doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const marginX = 40;
    const marginY = 46;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - marginX * 2;
    const lineHeight = 16;
    let y = marginY;

    const ensureSpace = (heightNeeded = lineHeight) => {
      if (y + heightNeeded > pageHeight - marginY) {
        doc.addPage();
        y = marginY;
      }
    };

    const addHeading = (text, size = 15) => {
      ensureSpace(size + 8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.text(text, marginX, y);
      y += size + 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
    };

    const addSectionTitle = (text) => {
      const barHeight = 20;
      ensureSpace(barHeight + 12);
      doc.setFillColor(242, 106, 75);
      doc.rect(marginX, y, contentWidth, barHeight, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(text, marginX + 8, y + 14);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y += barHeight + 12;
    };

    const addHero = () => {
      const heroHeight = 120;
      doc.setFillColor(30, 28, 32);
      doc.rect(0, 0, pageWidth, heroHeight, "F");
      doc.setTextColor(254, 247, 243);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("CSR Programme Update", marginX, 44);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(
        "Status Update on CSR Initiatives following Meeting of December 24, 2025.",
        marginX,
        64
      );

      const badges = [
        "FY 2025-26",
        "CSR Obligation Tracking",
        "Pipeline Review",
        "Board Decisions",
      ];
      let badgeX = marginX;
      let badgeY = 78;
      const badgeHeight = 18;
      const badgeGap = 8;
      doc.setFontSize(9);
      badges.forEach((badge) => {
        const textWidth = doc.getTextWidth(badge);
        const badgeWidth = textWidth + 16;
        if (badgeX + badgeWidth > pageWidth - marginX) {
          badgeX = marginX;
          badgeY += badgeHeight + 6;
        }
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(220, 220, 220);
        doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 8, 8, "FD");
        doc.setTextColor(30, 28, 32);
        doc.text(badge, badgeX + 8, badgeY + 12);
        badgeX += badgeWidth + badgeGap;
      });
      doc.setTextColor(0, 0, 0);
      y = heroHeight + 24;
      doc.setFontSize(11);
    };

    const addMetricCards = (items) => {
      const gap = 10;
      const cardWidth = (contentWidth - gap * 2) / 3;
      const cardHeight = 56;
      ensureSpace(cardHeight + 10);
      let x = marginX;
      items.forEach((item, index) => {
        doc.setFillColor(index === 0 ? 247 : 255, index === 0 ? 236 : 255, index === 0 ? 229 : 255);
        doc.setDrawColor(230, 216, 205);
        doc.roundedRect(x, y, cardWidth, cardHeight, 8, 8, "FD");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(item.label, x + 10, y + 20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(item.value, x + 10, y + 40);
        x += cardWidth + gap;
      });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y += cardHeight + 12;
    };

    const addParagraph = (text, gap = 10) => {
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line) => {
        ensureSpace();
        doc.text(line, marginX, y);
        y += lineHeight;
      });
      y += gap;
    };

    const addBullets = (items) => {
      items.forEach((item) => {
        const lines = doc.splitTextToSize(`- ${item}`, contentWidth);
        lines.forEach((line) => {
          ensureSpace();
          doc.text(line, marginX, y);
          y += lineHeight;
        });
      });
      y += 6;
    };

    const addTable = (headers, rows, colPercents) => {
      const colWidths = colPercents.map((percent) => contentWidth * percent);
      const rowPadding = 6;
      const drawRow = (cells, isHeader = false) => {
        const cellLines = cells.map((cell, idx) =>
          doc.splitTextToSize(String(cell), colWidths[idx] - 8)
        );
        const rowHeight =
          Math.max(...cellLines.map((lines) => lines.length)) * lineHeight +
          rowPadding * 2;
        ensureSpace(rowHeight);
        let x = marginX;
        cells.forEach((cell, idx) => {
          const textLines = cellLines[idx];
          const textY = y + rowPadding + lineHeight - 4;
          doc.rect(x, y, colWidths[idx], rowHeight);
          if (isHeader) {
            doc.setFont("helvetica", "bold");
          }
          doc.text(textLines, x + 4, textY);
          if (isHeader) {
            doc.setFont("helvetica", "normal");
          }
          x += colWidths[idx];
        });
        y += rowHeight;
      };

      drawRow(headers, true);
      rows.forEach((row) => drawRow(row, false));
      y += 10;
    };

    addHero();

    addSectionTitle("I. Overview for FY 2025-26");
    addMetricCards([
      {
        label: "Net CSR obligation",
        value: "Rs. 282.70 lakh",
      },
      {
        label: "Total committed",
        value: "Rs. 157.05 lakh",
      },
      {
        label: "Balance obligation remaining",
        value: "Rs. 130.65 lakh",
      },
    ]);
    addTable(
      ["Particulars", "Amount (Rs. in lakh)"],
      [
        ["Net CSR Obligation for FY 2025-26", "282.70"],
        ["Amount disbursed to date (Annexure A)", "86.78"],
        ["Approved proposals (disbursement pending) (Annexure B)", "80.27"],
        ["Total committed", "152.05"],
        ["Balance obligation remaining", "130.65"],
      ],
      [0.68, 0.32]
    );

    addSectionTitle("II. Proposals Under Review");
    addParagraph("Status of proposals kept on hold for further review.");

    addHeading("1. Sundarban Texmaco Sports Academy", 12);
    addBullets([
      
      
      "Nature of project: Quick impact sports project for 3 months.",
      "Operating area: Sankijaan, Kultali (Sundarban).",
      "Total cost: Rs. 30 lakh (Rs. 10 lakh in three tranches).",
      "Direct beneficiaries: 250 school students (run by Smt. Anu Chowdhury Memorial Education Foundation) and 50 selected teenagers.",
      "Indirect beneficiaries: Parents, local schools, and local community stakeholders.",
      "Next steps: Site visit by Texmaco team on 20th Jan 2026.",
    ]);

    addHeading("2. Aditya Birla Education Trust (Mpower)", 12);
    addParagraph("Status: ABET shared two proposals on mental health programmes.");
    addTable(
      ["Programme", "Operating Area", "Duration", "Total Cost (Rs. in lakh)", "Expected Beneficiaries"],
      [
        [
          "Regional Mental Health Clinics",
          "Mumbai, Virar, Kota",
          "FY 25-26 (3,000 sessions)",
          "50",
          "38,830 counselling sessions with 1,568 beneficiaries; 1,00,000+ community reach",
        ],
        [
          "Nationwide Community Programme",
          "13 states incl. West Bengal",
          "FY 25-26",
          "50",
          "1,66,000 individuals across 13 states",
        ],
      ],
      [0.24, 0.2, 0.18, 0.16, 0.22]
    );
    addParagraph(
      "Action taken: Asked agency to share monthly milestones and month-wise budget for evaluation."
    );

    addHeading("3. Skill Training Camps - Vocational Training", 12);
    addBullets([
      "Agency and background: Direct implementation through vocational trainers at ITI.",
      "Project description: Vocational skill training camps for youth to enhance employability (welder, foundry technician, fitter).",
      "Location: Belgharia.",
      "Beneficiaries: 250 students.",
      "CSR category: Education - Skill Development.",
      "Project timeline: Ongoing (annual programme) up to March 26.",
      "Amount requested: Rs. 7 lakh.",
      "Total program cost: Rs. 1.39 cr till 31.12.2026.",
      "Previous association: No.",
      "Observation/recommendation: Long-term skill initiative; review also by Foundry/Freight car team.",
    ]);

    addHeading("4. St. Xavier's College (Calcutta) Alumni Association", 12);
    addBullets([
      "Initial request: Rs. 3.5 lakh for Paikhala Prathmik Vidyalaya.",
      "Infrastructure upgrade and skill building initiative for womenfolk.",
      "Status: Visit by Texmaco CSR team planned on 20.01.2026.",
    ]);

    addHeading("5. HelpAge India", 12);
    addBullets([
      "Meeting held: December 29, 2025.",
      "Comprehensive elderly care initiative covering healthcare and livelihoods.",
      "Includes mobile healthcare units, tele-health, water-based unit, and SHG support.",
      "No expertise in stem cell/platelet banking.",
      "Offered water-based mobile healthcare unit as alternative to water ambulance.",
    ]);
    addParagraph("Customized proposals received as per TREL requirements:");
    addTable(
      ["Nature of Project", "Operating Area", "Duration", "Total Cost", "Expected Beneficiaries"],
      helpAgeProjects.map((row) => [
        row.project,
        row.area,
        row.duration,
        row.cost,
        row.beneficiaries,
      ]),
      [0.26, 0.22, 0.14, 0.14, 0.24]
    );
    addParagraph(
      "One Stop Elderly Centre includes facility for 40-50 elderly people (1,200-1,500 sq. ft). "
        + "Status: proposal to be discussed with higher management."
    );

    addHeading("6. VIP CA Association", 12);
    addBullets([
      "Meeting held: December 29, 2025.",
      "Training programme covering Artificial Intelligence, Tally, and GST.",
      "GST training by chartered accountants; AI training via IT partners.",
      "Cybersecurity programme delivered for 40 Kolkata police stations.",
      "Startup and MSME programme conducted in the first week of Dec-25.",
      "Customized curriculum planned after Texmaco requirement inputs.",
      "Amount requested: Rs. 20 lakh.",
    ]);

    addHeading("7. Smile Foundation", 12);
    addBullets([
      "Meeting held: December 29, 2025.",
      "Water-based mobile healthcare unit on the Hooghly River.",
      "Monthly operational cost: Rs. 3-5 lakh.",
      "Minimum commitment period: 15 months.",
      `Estimated total outlay: Rs. ${smileMinTotal}-${smileMaxTotal} lakh.`,
      "Status: proposal to be discussed with higher management.",
    ]);

    addSectionTitle("V. New Options");
    addHeading("1. Binayak Multispeciality Hospital", 12);
    addBullets([
      "Proposal amount: Rs. 1.04 to 1.30 cr.",
      "Sender: Binayak Multispeciality Hospital, Kolkata (Unit of Binayak Imaging & Diagnostic Pvt. Ltd.).",
      "Date: 13 January 2026.",
      "Addressed to: CMO, Texmaco Rail & Engineering Ltd., Belgharia.",
      "Overview: Established in 2007; 100-bed facility with 15 critical care beds, ICU/HDU, and 2 OTs with laminar airflow.",
      "Diagnostics: MRI, CT, digital X-ray, USG, gastroenterology (ERCP), neurology (EEG/EMG/NCV), cardiology (ECG/ECHO/Holter), pathology with frozen section biopsy.",
      "Managed by Specifixon Healthcare LLP.",
      "Requested support: Digital DR X-Ray system (Rs. 15-20 lakh) with chest X-ray at Rs. 100 for Texmaco-referred/catchment population.",
      "Requested support: Digital USG machine (Rs. 29-40 lakh) with whole abdomen USG at Rs. 500.",
      "Requested support: Digital Mammography unit (Rs. 35-45 lakh) with mammography at Rs. 650 (unilateral) / Rs. 1,200 (bilateral).",
      "Requested support: Reserved beds for Texmaco-referred patients (example: 1 ICU bed at Rs. 8,000/day + 1 general bed at Rs. 1,500/day); annual expectation Rs. 25 lakh per year.",
      "Objective: Affordable, priority healthcare for Texmaco employees, dependents, and nearby communities.",
    ]);
    addHeading("Other Options", 12);
    addBullets([
      "PM Internship Scheme for youth aged 18-24 (12-month internships).",
      "Eligibility: ITI (Matriculation + ITI), Diploma (Intermediate + AICTE diploma), Degree (UGC/AICTE).",
      "Budget outlay: Rs. 500 per person per month from CSR funds (Govt. bears Rs. 4,500).",
      "One-time bonus of Rs. 6,000 and insurance coverage by Central Government.",
      "Infrastructure development at Belgharia, Agarpara, Sodepur stations and prominent metro stations.",
      "Public utilities at locations like Dunlop Crossing, Esplanade, Howrah, Sealdah, Saltlake.",
      "Blanket distribution in winter; book distribution for underprivileged students.",
      "Medical equipment such as ECG at Arogyam for Belgharia residents.",
    ]);

    addSectionTitle("VI. Proposals Not Recommended for Approval");
    addBullets([
      "K.C. Mahindra Trust - Skill Bridge Programme for female students (Grades 9-12).",
      "Bal Raksha Bharat - SEHAT Programme involving mobile healthcare units and education.",
      "Training proposal submitted by Mr. D.K. Basu.",
    ]);

    addSectionTitle("Annexure A | Amount Disbursed to Date");
    addTable(
      ["Name of Agency", "Nature of Work", "Amount (Rs. in lakh)"],
      annexureADisbursedSorted.map((row) => [
        row.agency,
        row.nature,
        row.amount.toFixed(2),
      ]),
      [0.36, 0.44, 0.2]
    );
    addParagraph(`Total: ${financialOverview.disbursed.toFixed(2)} lakh.`);

    addSectionTitle("Annexure B | Approved Proposals (Disbursement Pending)");
    addTable(
      ["Name of Agency", "Nature of Work", "Amount (Rs. in lakh)"],
      annexureBApprovedSorted.map((row) => [
        row.agency,
        row.nature,
        row.amount.toFixed(2),
      ]),
      [0.36, 0.44, 0.2]
    );
    addParagraph(`Total: ${financialOverview.approvedPending.toFixed(2)} lakh.`);

    doc.save("CSR_Programme_Update_FY2025-26.pdf");
  };

  return (
    <div className="dpr-page" ref={pageRef}>
      <header className="dpr-hero">
        <h1>CSR Programme Update</h1>
        <p>
          Status update on CSR initiatives following the meeting of December 24,
          2025, covering FY 2025-26 obligation, commitments, review pipeline,
          and new proposals.
        </p>
        <div className="dpr-badges">
          <span className="dpr-badge">FY 2025-26</span>
          <span className="dpr-badge">CSR Obligation Tracking</span>
          <span className="dpr-badge">Pipeline Review</span>
          <span className="dpr-badge">Board Decisions</span>
        </div>
        <div className="dpr-actions" data-html2canvas-ignore="true">
          <button type="button" className="dpr-export-btn" onClick={handleExport}>
            Export PDF
          </button>
        </div>
      </header>

      <section className="dpr-section">
        <h2 className="dpr-section-title">I. Financial Overview for FY 2025-26</h2>
        <div className="dpr-grid three">
          <div className="dpr-card dpr-highlight">
            <h3>Obligation Snapshot</h3>
            <div className="dpr-metric">
              <span>Net CSR obligation</span>
              <strong>Rs. {financialOverview.netObligation.toFixed(2)} lakh</strong>
            </div>
            <div className="dpr-metric">
              <span>Total committed</span>
              <strong>Rs. {financialOverview.totalCommitted.toFixed(2)} lakh</strong>
            </div>
            <div className="dpr-metric">
              <span>Balance obligation remaining</span>
              <strong>Rs. {financialOverview.balance.toFixed(2)} lakh</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Commitment Mix</h3>
            <div className="bar-chart">
              {commitmentBreakdown.map((item) => (
                <div className="bar-item" key={item.label}>
                  <span>{item.label}</span>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${item.tone}`}
                      style={{ width: `${item.percent.toFixed(1)}%` }}
                    />
                  </div>
                  <strong>{item.amount.toFixed(2)} lakh</strong>
                </div>
              ))}
            </div>
            <div className="dpr-footnote">
              Committed portion covers {commitmentCoverage.toFixed(1)}% of the
              FY obligation.
            </div>
          </div>
        </div>
        
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">II. Proposals Under Review</h2>
        <div className="dpr-stack">
          <div className="dpr-card">
            <div className="dpr-metric">
              <span>Sundarban Texmaco Sports Academy</span>
              <strong>Rs. 30 lakh</strong>
            </div>
            <ul>
              <li>
                Proposed budget: <strong>Rs. 30 lakh</strong> (3 months project).
              </li>
              
              <li>Nature of project: Quick impact sports project for 3 months.</li>
              <li>Operating area: Sankijaan, Kultali (Sundarban).</li>
              <li>Total cost: Rs. 30 lakh (Rs. 10 lakh in three tranches).</li>
              <li>
                Direct beneficiaries: 250 school students (run by Smt. Anu
                Chowdhury Memorial Education Foundation) and 50 selected
                teenagers.
              </li>
              <li>
                Indirect beneficiaries: Parents, local schools, and local
                community stakeholders.
              </li>
              <li>Next steps: Site visit by Texmaco team on 20th Jan 2026.</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Aditya Birla Education Trust (Mpower)</h3>
            <div className="dpr-metric">
              <span>Proposal amount</span>
              <strong>Rs. 50 lakh</strong>
            </div>
            <div className="dpr-footnote">
              Status: ABET shared two mental health proposals.
            </div>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Area</th>
                  <th>Duration</th>
                  <th>Cost (Rs. in lakh)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nationwide Community Programme</td>
                  <td>WB, Gujarat, Chattisgarh</td>
                  <td>FY 25-26</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>38,830 counselling sessions with 1,568 beneficiaries completed.</li>
              <li>1,00,000+ community beneficiaries reached via outreach.</li>
              <li>Monthly milestones and budgets requested for evaluation.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>Bunts Sangha Mumbai</h3>
            <div className="dpr-metric">
              <span>Proposal amount</span>
              <strong>Rs. 6.10 cr</strong>
            </div>
            <div className="dpr-footnote">
              Support request for education, healthcare, and community
              development initiatives.
            </div>
            <ul>
              <li>
                Trust profile: Public charitable trust (est. 1927) serving nearly
                5 lakh Bunts in Mumbai and suburbs.
              </li>
              <li>
                Focus areas: Education support, scholarships, hostels, medical
                camps, and livelihood programs.
              </li>
              <li>
                Key initiatives: Free/subsidized education, vocational training,
                health check-ups, blood donation, cataract surgeries.
              </li>
              <li>
                CSR budget proposal: Education for 1,000+ students, higher
                education scholarships, accommodation, medical assistance, and
                learning materials.
              </li>
              
              <li>
                Overall impression: Established institution with structured CSR
                deployment and measurable impact.
              </li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Binayak Multispeciality Hospital</h3>
            <div className="dpr-metric">
              <span>Proposal amount</span>
              <strong>Rs. 1.04 to 1.30 cr</strong>
            </div>
            <div className="dpr-footnote">
              Status: Proposal shared for affordable, priority healthcare support.
            </div>
            <ul>
              <li>
                Overview: Established in 2007; 100-bed facility with 15 critical
                care beds, ICU/HDU, and 2 OTs with laminar airflow.
              </li>
              <li>
                Diagnostics: MRI, CT, digital X-ray, USG, gastroenterology (ERCP),
                neurology (EEG/EMG/NCV), cardiology (ECG/ECHO/Holter), pathology
                with frozen section biopsy.
              </li>
              <li>
                Requested support: Digital DR X-Ray, USG, and Mammography units
                with subsidized rates for referred patients.
              </li>
              <li>
                Machines to be acquired: Digital DR System (Rs. 20 lakh), Digital
                USG Machine (Rs. 40 lakh), Digital Mammography (Rs. 45 lakh).
                Total: Rs. 105 lakh.
              </li>
              <li>
                Requested support: Reserved beds for Texmaco-referred patients
                (ICU + general bed model).
              </li>
              <li>
                Objective: Priority healthcare for Texmaco employees, dependents,
                and nearby communities.
              </li>
            </ul>
          </div>
        </div>
        <div className="dpr-stack dpr-section">
          <div className="dpr-card">
            <h3>Skill Training Camps - Vocational Training</h3>
            <div className="dpr-metric">
              <span>Proposal amount</span>
              <strong>Rs. 7 lakh</strong>
            </div>
            <ul>
              <li>
                Agency and background: Direct implementation through vocational
                trainers at ITI.
              </li>
              <li>
                Project description: Vocational skill training camps for youth
                to enhance employability (welder, foundry technician, fitter).
              </li>
              <li>Location: Partial at ITI campus and Partial at Texmaco Factory</li>
              <li>Targeted beneficiaries: 250 students per year.</li>
              <li>CSR category: Education - Skill Development.</li>
              <li>Project timeline: Ongoing (annual programme) up to December 26.</li>
              <li>Amount requested: Rs. 7 lakh till 31st March 26.</li>
              <li>Total program cost: Rs. 1.39 cr till 31.12.2026.</li>
              <li>
                Observation: (a) Details of machinery and their cost should be
                reviewed by concerned functional team. 
                (b) Utility of program should also be evaluated by concerned functional Texmaco (i.e.
                Foundry and Frieght car)
              </li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>St. Xavier's College (Calcutta) Alumni Association</h3>
            <div className="dpr-metric">
              <span>Proposal amount</span>
              <strong>Rs. 3.5 lakh</strong>
            </div>
            <ul>
              <li>Proposal: Rs. 3.5 lakh for Paikhala Prathmik Vidyalaya.</li>
              <li>Focus: infrastructure upgrade + skill building for womenfolk.</li>
              <li>Status: Visit planned on 21.01.2026 by Texmaco CSR team.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-card dpr-section">
          <h3>HelpAge India</h3>
          <div className="dpr-metric">
            <span>Proposal amount</span>
            <strong>Rs. {helpAgeMinCr.toFixed(2)}-{helpAgeMaxCr.toFixed(2)} cr</strong>
          </div>
          <ul>
            <li>Meeting held: December 29, 2025.</li>
            <li>Comprehensive elderly care initiative spanning healthcare and livelihoods.</li>
            <li>Includes mobile units, tele-health, water-based unit, and SHG support.</li>
            <li>No expertise in stem cell/platelet banking.</li>
            <li>Offered water-based mobile healthcare unit vs proposed water ambulance.</li>
          </ul>
        </div>
        <div className="dpr-section">
          <div className="dpr-card dpr-highlight">
            <h3>HelpAge India | Customized Proposals</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Nature of Project</th>
                  <th>Operating Area</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Expected Beneficiaries</th>
                </tr>
              </thead>
              <tbody>
                {helpAgeProjects.map((row) => (
                  <tr key={row.project}>
                    <td>{row.project}</td>
                    <td>{row.area}</td>
                    <td>{row.duration}</td>
                    <td>{row.cost}</td>
                    <td>{row.beneficiaries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="dpr-footnote">
              One Stop Elderly Centre includes facility for 40-50 elderly people
              (1,200-1,500 sq. ft).
              <br />
              Status: Proposal to be discussed with higher management.
            </div>
          </div>
        </div>
        <div className="dpr-card dpr-section">
          <h3>VIP CA Association</h3>
          <div className="dpr-metric">
            <span>Proposal amount</span>
            <strong>Rs. 20 lakh</strong>
          </div>
          <ul>
            <li>Meeting held: December 29, 2025.</li>
            <li>Proposal for training programme covering AI, Tally, and GST.</li>
            <li>GST training delivered by member (Chartered Accountants); AI via IT partners.</li>
            <li>Cybersecurity programme delivered for 40 Kolkata police stations.</li>
            <li>Startup/MSME programme conducted in the first week of Dec-25.</li>
            <li>
              Library for students: 9 students studying in their library
              qualified CA examination in last term.
            </li>
          </ul>
        </div>
        <div className="dpr-card dpr-section">
          <h3>Smile Foundation</h3>
          <div className="dpr-metric">
            <span>Proposal amount</span>
            <strong>Rs. {smileMinTotal}-{smileMaxTotal} lakh</strong>
          </div>
          <ul>
            <li>Meeting held: December 29, 2025.</li>
            <li>Water-based mobile healthcare unit on the Hooghly River.</li>
            <li>Monthly operational cost: Rs. 3-5 lakh.</li>
            <li>Minimum commitment: {smileCommitmentMonths} months.</li>
            <li>
              Estimated total outlay: Rs. {smileMinTotal}-{smileMaxTotal} lakh.
            </li>
            <li>Status: Proposal to be discussed with higher management.</li>
          </ul>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">III. New Options</h2>
        <div className="dpr-card">
          
          <ul>
            <li>
              PM Internship Scheme for 12-month internships (age 18-24).
              <div className="option-sub">
                Budget: Rs. 500 per person per month from CSR funds (Govt. bears
                Rs. 4,500 + insurance + bonus). Eligibility: ITI (Matriculation +
                ITI), Diploma (Intermediate + AICTE diploma), Degree (UGC/AICTE
                university), age 18-24.
              </div>
            </li>
            <li>Treatment of Storm Water at Belgharia / Agarpara</li>
            <li>Infrastructure development (drinking water, toilet etc.) at Belgharia, Agarpara, Sodepur stations.</li>
            <li>Public utilities at locations like Dunlop Crossing or Esplanade and Howrah Station</li>
            <li>Blanket distribution during winter.</li>
            <li>Book distribution for underprivileged school students.</li>
            <li>Medical equipment (ECG) for Arogyam health check-up point.</li>
          </ul>
          
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">
          IV. Proposals declined in the last meeting
        </h2>
        <div className="dpr-card alt">
          <ul>
            <li>K.C. Mahindra Trust - Skill Bridge Programme for female students.</li>
            <li>Bal Raksha Bharat - SEHAT Programme (mobile healthcare + education).</li>
           
          </ul>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Annexure A | Amount Disbursed to Date</h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Agency</th>
                <th>Nature of Work</th>
                <th>Amount (Rs. in lakh)</th>
              </tr>
            </thead>
            <tbody>
              {annexureADisbursedSorted.map((row) => (
                <tr key={row.agency}>
                  <td>{row.agency}</td>
                  <td>{row.nature}</td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{financialOverview.disbursed.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">
          Annexure B | Approved Proposals (Disbursement Pending)
        </h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Agency</th>
                <th>Nature of Work</th>
                <th>Amount (Rs. in lakh)</th>
              </tr>
            </thead>
            <tbody>
              {annexureBApprovedSorted.map((row) => (
                <tr key={row.agency}>
                  <td>{row.agency}</td>
                  <td>{row.nature}</td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{financialOverview.approvedPending.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CsrActivities;
