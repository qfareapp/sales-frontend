import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  LabelList,
} from "recharts";
import "../styles/managementDpr.css";

const ManagementDpr = () => {
  const trelQuarterOutput = [
    { label: "Q1", value: 1568 },
    { label: "Q2", value: 2000 },
    { label: "Q3", value: 1784 },
    { label: "Q4", value: 2363 },
  ];

  const twrlQuarterExecution = [
    { label: "Q1", value: 247 },
    { label: "Q2", value: 581 },
    { label: "Q3", value: 915 },
    { label: "Q4", value: 1549 },
  ];

  const maxTrel = Math.max(...trelQuarterOutput.map((item) => item.value));
  const maxTwrl = Math.max(...twrlQuarterExecution.map((item) => item.value));

  const demandForecast = [
    { region: "Global", min: 55000, range: 10000 },
    { region: "India", min: 25000, range: 5000 },
  ];

  const topSegments = [
    { name: "BOSM", value: 3577 },
    { name: "BFNS 22.9t", value: 1440 },
    { name: "BFNSM1", value: 1220 },
    { name: "BRN 22.9T", value: 990 },
    { name: "ACT-1", value: 986 },
    { name: "BTAP", value: 636 },
  ];

  const trelSegmentMix = [
    { name: "IR", value: 3176 + 1525 + 1769 + 270 },
    { name: "Non-IR + Export", value: 432 + 147 + 106 + 122 + 110 },
  ];

  const consolidatedVUs = [
    { year: "FY24-25", value: 10612 },
    { year: "FY25-26", value: 9264 },
  ];

  const consolidatedValue = [
    { year: "FY24-25", value: 4084.11 },
    { year: "FY25-26", value: 3467.29 },
  ];

  const revenueByQuarter = [
    { quarter: "Q1", value: 83669 },
    { quarter: "Q2", value: 117100 },
    { quarter: "Q3", value: 117855 },
    { quarter: "Q4", value: 115687 },
  ];

  const revenueShare = [
    { name: "TREL", value: 3387.48 },
    { name: "TWRL", value: 955.63 },
  ];

  const budgetVsActual = [
    { name: "Budget", value: 6537 },
    { name: "Actual", value: 5262 },
  ];

  const proposedBudgetByUnit = [
    { name: "FCD", value: 4343 },
    { name: "HITECH", value: 134 },
    { name: "FOUNDRY", value: 1009 },
    { name: "BRIGHT POWER", value: 700 },
    { name: "TRISS", value: 650 },
    { name: "SAIRA", value: 36.2 },
  ];

  const twrlSegmentSplit = [
    { name: "IR", value: 4000 },
    { name: "Private", value: 2585 },
    { name: "Export", value: 1415 },
  ];

  const twrlWagonMixExportSplit = [
    { name: "Export", value: 305 },
    { name: "Private", value: 1922 - 305 },
  ];

  const businessMixComposition = [
    { name: "TWRL", Railways: 0, Private: 1617, Export: 305 },
    { name: "TREL", Railways: 4000, Private: 2585, Export: 1415 },
  ];

  const irRequirement = [
    { name: "IR BVCM", value: 400 },
    { name: "IR FMP", value: 1500 },
    { name: "IR BOBRN", value: 2000 },
    { name: "IR BTPN", value: 530 },
    { name: "IR BOBYN", value: 1500 },
    { name: "IR BOBSN", value: 450 },
    { name: "IR BOSM", value: 8000 },
    { name: "IR BOXNS", value: 7500 },
    { name: "IR Misc.", value: 4500 },
  ];

  const texmacoWagonMix = [
    { name: "BCNA", value: 2062 },
    { name: "BOXNS", value: 1142 },
    { name: "BOBRN", value: 921 },
    { name: "BRNAHS-EUR", value: 357 },
    { name: "FMP", value: 45 },
  ];

  const pieColors = ["#f26a4b", "#2e7d6b", "#f7a46a", "#7ac0a7"];

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="dpr-page">
      <header className="dpr-hero">
        <h1>Wagon Market Outlook to 2030</h1>
        <p>
          A consolidated view of demand outlook, Texmaco advantage, order
          pipeline, FY25-26 performance, and FY26-27 plan execution across India
          and global markets.
        </p>
        <div className="dpr-badges">
          <span className="dpr-badge">India + Global</span>
          <span className="dpr-badge">FY25-26 Actuals</span>
          <span className="dpr-badge">FY26-27 Plan</span>
          <span className="dpr-badge">Demand Outlook to 2030</span>
        </div>
        <div className="dpr-actions" data-html2canvas-ignore="true">
          <button type="button" className="dpr-export-btn" onClick={handleExport}>
            Export PDF
          </button>
        </div>
      </header>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Wagon Demand Outlook to 2030</h2>
        <div className="dpr-grid three">
          <div className="dpr-card">
            <h3>Historical Base</h3>
            <ul>
              <li>Global: 45,000-55,000 wagons per year over the last decade.</li>
              <li>
                India: 18,000-22,000 wagons per year, now a growth market.
              </li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Socio-Economic Growth</h3>
            <ul>
              <li>Manufacturing, mining, agriculture, construction, and containers.</li>
              <li>Global: +6,000-8,000 wagons per year incremental demand.</li>
              <li>India: +3,000-4,000 wagons per year above historical average.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>Policy & Modal Shift</h3>
            <ul>
              <li>Emission norms, green freight corridors, energy security.</li>
              <li>Global: +4,000-5,000 wagons per year policy-driven uplift.</li>
              <li>India: +4,000-5,000 wagons per year from DFC + policy push.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card dpr-highlight">
            <h3>2025-2030 Demand Forecast</h3>
            <div className="dpr-metric">
              <span>Global annual demand</span>
              <strong>55,000-65,000 wagons</strong>
            </div>
            <div className="dpr-metric">
              <span>Global total (5 years)</span>
              <strong>280,000-320,000 wagons</strong>
            </div>
            <div className="dpr-metric">
              <span>India annual demand</span>
              <strong>25,000-30,000 wagons</strong>
            </div>
            <div className="dpr-metric">
              <span>India total (5 years)</span>
              <strong>125,000-150,000 wagons</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Demand Range Visual</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={demandForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="min" stackId="a" fill="#f26a4b" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="min" position="insideTop" fill="#1d1b1f" />
                  </Bar>
                  <Bar dataKey="range" stackId="a" fill="#f7a46a" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="range" position="top" fill="#1d1b1f" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <h3>2030 Takeaway</h3>
            <ul>
              <li>Demand shifts from replacement-led to growth + replacement.</li>
              <li>India becomes one of the fastest-growing wagon markets.</li>
              <li>2030 view: Global ~60,000 wagons; India 25,000-30,000 wagons.</li>
              <li>Multi-year visibility for manufacturers with India as anchor.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Advantage Texmaco</h2>
        <div className="dpr-grid two">
          <div className="dpr-card">
            <h3>Market Momentum</h3>
            <ul>
              <li>Global freight movement rising with trade and industrial growth.</li>
              <li>Rail gaining preference for cost, emissions, and efficiency.</li>
              <li>Global demand: 55,000-65,000 wagons/year (next 5 years).</li>
              <li>India demand: 25,000-30,000 wagons/year (faster than global).</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Texmaco Advantages</h3>
            <ul>
              <li>Stable India order pipeline with approved designs.</li>
              <li>Export opportunities to balance utilization and volatility.</li>
              <li>Higher share of specialized wagons improves margins.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          Takeaway: Wagon demand to 2030 is structured, long-term, and
          sustainable. India drives the global growth story, positioning Texmaco
          for volume growth and margin uplift.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Railway board approval for pvt parties</h2>
        <div className="dpr-grid two">
          <div className="dpr-card dpr-highlight">
            <h3>Overall Snapshot</h3>
            <div className="dpr-metric">
              <span>Total rakes</span>
              <strong>220</strong>
            </div>
            <div className="dpr-metric">
              <span>Total wagons</span>
              <strong>10,084 units</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Top Wagon Segments</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topSegments} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0} angle={-25} textAnchor="end" height={50} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f2c14e" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ul>
              <li>BOSM: 3,577 wagons | 73 rakes</li>
              <li>BFNS 22.9t: 1,440 wagons | 32 rakes</li>
              <li>BFNSM1: 1,220 wagons | 20 rakes</li>
              <li>BRN 22.9T: 990 wagons | 22 rakes</li>
              <li>ACT-1: 986 wagons | 29 rakes</li>
              <li>BTAP: 636 wagons | 12 rakes</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Key Customers</h3>
            <ul>
              <li>TMIL and BRISKWORLD anchor BOSM, BFNS, BRN demand.</li>
              <li>Cement majors: Ambuja, Nuvoco, Dalmia (BTAP, BCFCM1).</li>
              <li>Ports & EXIM: JSW Port Logistics, Navkar Logistics.</li>
              <li>Automotive & 3PL: Toyota Logistics, Glovis, Supreme Auto.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          Demand is well distributed across PSUs, private logistics, ports,
          automotive, cement, and metals with repeat anchor buyers driving
          stability.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Assessed Requirement - Indian Railways</h2>
        <div className="dpr-grid three">
          <div className="dpr-card dpr-highlight">
            <h3>Overall Snapshot</h3>
            <div className="dpr-metric">
              <span>Total wagons assessed</span>
              <strong>26,380</strong>
            </div>
            
            <div className="dpr-metric">
              <span>Largest demand pockets</span>
              <strong>BOSM, BOXNS</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Requirement by Stock Type</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={irRequirement} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0} angle={-25} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f2c14e" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
         
        </div>
        <div className="dpr-callout dpr-section">
          IR assessed requirement prioritizes bulk freight families with a focused
          pipeline of specialized wagons for near-term induction.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">IR Demand Drivers & Freight Mix</h2>
        <div className="dpr-grid three">
          <div className="dpr-card">
            <h3>Network Saturation</h3>
            <ul>
              <li>Golden Quadrilateral + diagonals: ~16% of route length.</li>
              <li>Carry >52% passenger traffic and 58% freight traffic.</li>
              <li>Line capacity utilization ~115% to 150%.</li>
              <li>Passenger prioritization drives freight waiting delays.</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Fleet & Utilization</h3>
            <ul>
              <li>Wagon fleet expansion: ~3,27,991 to ~5,45,000 by FY2031.</li>
              <li>Turnaround reduced from ~15 days (1980s) to ~5 days (FY24).</li>
              <li>DFC usage: 352 freight trains/day (FY25) vs 247 (FY24).</li>
              <li>DFC capacity ~480 trains/day (utilization still low).</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>Freight Earnings Mix</h3>
            <ul>
              <li>Freight contributes >65% of IR earnings.</li>
              <li>Coal drives >50% loading and >51% freight revenue (FY24).</li>
              <li>Coal + iron ore + cement + steel = ~65% to 70% earnings.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card">
            <h3>Freight Revenue (Rs bn)</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>FY25 RE</th>
                  <th>FY26 BE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coal</td>
                  <td>931</td>
                  <td>985</td>
                </tr>
                <tr>
                  <td>Cement</td>
                  <td>116</td>
                  <td>128</td>
                </tr>
                <tr>
                  <td>Containers</td>
                  <td>98</td>
                  <td>102</td>
                </tr>
                <tr>
                  <td>Foodgrains</td>
                  <td>83</td>
                  <td>79</td>
                </tr>
                <tr>
                  <td>Iron ore</td>
                  <td>139</td>
                  <td>141</td>
                </tr>
                <tr>
                  <td>Pig iron & finished steel</td>
                  <td>112</td>
                  <td>108</td>
                </tr>
                <tr>
                  <td>Fertilizers</td>
                  <td>76</td>
                  <td>77</td>
                </tr>
                <tr>
                  <td>POL</td>
                  <td>72</td>
                  <td>74</td>
                </tr>
              </tbody>
            </table>
            <p className="dpr-footnote">Other goods are also part of the mix.</p>
          </div>
          <div className="dpr-card alt">
            <h3>Commodity Load & Wagon Link</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>Indicative wagons</th>
                  <th>Industry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coal</td>
                  <td>Open hoppers (BOXN, BOBRN)</td>
                  <td>Power / Mining</td>
                </tr>
                <tr>
                  <td>Iron ore</td>
                  <td>Special open wagons</td>
                  <td>Steel & Mining</td>
                </tr>
                <tr>
                  <td>Cement</td>
                  <td>Open / covered</td>
                  <td>Construction</td>
                </tr>
                <tr>
                  <td>Containers</td>
                  <td>Flat / well wagons</td>
                  <td>Logistics</td>
                </tr>
                <tr>
                  <td>POL</td>
                  <td>Tank wagons</td>
                  <td>Energy</td>
                </tr>
                <tr>
                  <td>Foodgrains</td>
                  <td>Open / covered</td>
                  <td>Agriculture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      <section className="dpr-section">
        <h2 className="dpr-section-title">
          Underperformance vs Budget – Context & Industry Reality (FY25–26)
        </h2>
        <div className="dpr-grid two">
          <div className="dpr-card">
            <h3>Performance Context</h3>
            <ul>
              <li>IR wagon procurement hit ~60% of plan in early FY25–26.</li>
              <li>Shortfall driven by supply constraints and policy reprioritisation.</li>
              <li>No demand erosion or execution gaps at manufacturer level.</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Strategic Interpretation</h3>
            <ul>
              <li>IR moderation reflects a structural policy pause, not collapse.</li>
              <li>Industry-wide constraints uniformly impacted deliveries.</li>
              <li>Reinforces pivot toward private and export segments.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-grid three dpr-section">
          <div className="dpr-card">
            <h3>Supply & Capex Constraints</h3>
            <ul>
              <li>Wheelset bottleneck: ~40% shortfall from RWF delays.</li>
              <li>High operating ratio (98–99%) limited fresh capex.</li>
              <li>Budget shifted to pensions, maintenance, and safety.</li>
              <li>DFC focus absorbed freight capex bandwidth.</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Market & Policy Shifts</h3>
            <ul>
              <li>2022 mega orders saturated capacity into mid‑FY25.</li>
              <li>Wagon Investment Scheme reduced IR procurement by 20–30%.</li>
              <li>Coal freight planning moderated amid renewable shift.</li>
              <li>Safety, electrification, and Kavach prioritized tenders.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>External Factors</h3>
            <ul>
              <li>Global supply disruptions and Red Sea logistics impact.</li>
              <li>Steel price volatility affected delivery timelines.</li>
              <li>Wait‑and‑watch stance after record freight years.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card dpr-highlight">
            <h3>Forward View (FY26-27)</h3>
            <ul>
              <li>DFC operationalisation unlocks deferred procurement.</li>
              <li>Wheelset supply normalisation improves dispatch cadence.</li>
              <li>Deferred IR tenders expected to return.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>Management Takeaway</h3>
            <p className="dpr-callout">
              FY25–26 IR underperformance stems from systemic supply and policy
              factors; the shift to private and export markets protected value
              despite IR volume moderation.
            </p>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Wagon Production Statement FY 2025-26</h2>
        <div className="dpr-grid two">
          <div className="dpr-card dpr-highlight">
            <h3>Industry-level Analysis & Insights</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Wagons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Outstanding as on 01-04-2025</td>
                  <td>39,560</td>
                </tr>
                <tr>
                  <td>Fresh Orders during FY25-26</td>
                  <td>1,940</td>
                </tr>
                <tr>
                  <td>Transferred Quantity</td>
                  <td>1,962</td>
                </tr>
                <tr>
                  <td>Total Orders handled FY25-26</td>
                  <td>39,538</td>
                </tr>
                <tr>
                  <td>Cumulative Production (Apr-Dec 25)</td>
                  <td>16,834</td>
                </tr>
                <tr>
                  <td>Outstanding as on 01-01-2026</td>
                  <td>22,704</td>
                </tr>
              </tbody>
            </table>
            <div className="dpr-callout">
              Industry operated on a huge opening backlog with very limited fresh ordering. FY25-26 was execution-constrained, not demand-led.
            </div>
          </div>
          <div className="dpr-card">
            <h3>Sector-wise Performance</h3>
            <h4>Private Sector (Dominant Driver)</h4>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Wagons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Opening Outstanding</td>
                  <td>34,715</td>
                </tr>
                <tr>
                  <td>Fresh Orders</td>
                  <td>3,122</td>
                </tr>
                <tr>
                  <td>Cumulative Production</td>
                  <td>15,378</td>
                </tr>
                <tr>
                  <td>Outstanding (01-01-26)</td>
                  <td>20,095</td>
                </tr>
              </tbody>
            </table>
            <p className="dpr-footnote">Share of industry production: ~91%</p>
            <div className="dpr-callout">
              Private sector absorbed most execution stress and carried the industry, delivering consistent monthly output (1,500-2,000 wagons).
            </div>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card alt">
            <h4>Public Sector Units</h4>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Wagons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Opening Outstanding</td>
                  <td>4,845</td>
                </tr>
                <tr>
                  <td>Net Orders</td>
                  <td>780</td>
                </tr>
                <tr>
                  <td>Cumulative Production</td>
                  <td>1,456</td>
                </tr>
                <tr>
                  <td>Outstanding (01-01-26)</td>
                  <td>2,609</td>
                </tr>
              </tbody>
            </table>
            <ul>
              <li>Wheelset availability constraints.</li>
              <li>Budgetary prioritisation delays.</li>
              <li>Limited flexibility in production sequencing.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h4>Railway Workshops</h4>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Wagons</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Orders</td>
                  <td>4,390</td>
                </tr>
                <tr>
                  <td>Cumulative Production</td>
                  <td>1,921</td>
                </tr>
                <tr>
                  <td>Outstanding</td>
                  <td>2,469</td>
                </tr>
              </tbody>
            </table>
            <div className="dpr-callout">
              Workshops showed lower throughput efficiency vs private manufacturers, with significant backlog spillover into FY26-27.
            </div>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card">
            <h3>Firm-wise Performance (Top Contributors)</h3>
            <h4>Top 5 Private Manufacturers (Cumulative Production)</h4>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Firm</th>
                  <th>Production</th>
                  <th>Outstanding (01-01-26)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Titagarh / TRSL</td>
                  <td>4,396</td>
                  <td>5,762</td>
                </tr>
                <tr>
                  <td>Texmaco Rail</td>
                  <td>4,170</td>
                  <td>3,485</td>
                </tr>
                <tr>
                  <td>HEI</td>
                  <td>2,946</td>
                  <td>3,022</td>
                </tr>
                <tr>
                  <td>Jupiter</td>
                  <td>1,914</td>
                  <td>2,495</td>
                </tr>
                <tr>
                  <td>Oriental</td>
                  <td>619</td>
                  <td>3,425</td>
                </tr>
              </tbody>
            </table>
            <div className="dpr-callout">
              Titagarh + Texmaco alone delivered about half of private output. High outstanding across all majors confirms supply-side constraints.
            </div>
          </div>
          <div className="dpr-card alt">
            <h3>Wagon-Type Concentration</h3>
            <p>Dominant wagon types across industry:</p>
            <ul>
              <li>BCNA</li>
              <li>BOXNS / BOXNHL</li>
              <li>BOSM</li>
              <li>BOBRN / BRN 22.9</li>
              <li>BOBYN</li>
            </ul>
            <div className="dpr-callout">
              Production skewed toward bulk and standard freight wagons. Specialty wagons (FMP, BTPN, BVCM) ramped selectively in H2.
            </div>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card">
            <h3>Monthly Production Trend (Apr-Dec 2025)</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Industry Production</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apr</td>
                  <td>743</td>
                </tr>
                <tr>
                  <td>May</td>
                  <td>1,737</td>
                </tr>
                <tr>
                  <td>Jun</td>
                  <td>2,150</td>
                </tr>
                <tr>
                  <td>Jul</td>
                  <td>2,073</td>
                </tr>
                <tr>
                  <td>Aug</td>
                  <td>2,269</td>
                </tr>
                <tr>
                  <td>Sep</td>
                  <td>2,009</td>
                </tr>
                <tr>
                  <td>Oct</td>
                  <td>1,830</td>
                </tr>
                <tr>
                  <td>Nov</td>
                  <td>1,803</td>
                </tr>
                <tr>
                  <td>Dec</td>
                  <td>2,220</td>
                </tr>
              </tbody>
            </table>
            <div className="dpr-callout">
              Stable 2,000+ wagon/month run-rate achieved mid-year. Volatility driven by wheelset supply and material flow, not capacity.
            </div>
          </div>
          <div className="dpr-card alt">
            <h3>Key Structural Observations</h3>
            <h4>Why production lagged potential</h4>
            <ul>
              <li>Large opening backlog consumed capacity.</li>
              <li>Wheelset shortages capped dispatches.</li>
              <li>Minimal fresh IR orders during FY25-26.</li>
              <li>Capacity diverted toward DFC readiness and safety priorities.</li>
            </ul>
            <h4>What this data confirms</h4>
            <ul>
              <li>FY25-26 was a clearing year, not a growth year.</li>
              <li>Backlog plus constrained inputs drove controlled output.</li>
              <li>Sets the stage for FY26-27 rebound once supply normalises.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          The industry did not face a demand problem in FY25-26; it faced a supply-and-policy-induced execution ceiling. With about 22,700 wagons outstanding entering 2026 and fresh ordering expected post-DFC, the operating leverage for FY26-27 is structurally strong.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Texmaco-only benchmark vs Industry (Apr-Dec '25, FY25-26 YTD)</h2>
        <div className="dpr-grid two">
          <div className="dpr-card dpr-highlight">
            <h3>Output & Share (YTD Apr-Dec '25)</h3>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Texmaco Rail</th>
                  <th>Industry Total</th>
                  <th>Texmaco Share</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cum Production (Apr-Dec)</td>
                  <td>4,527</td>
                  <td>16,834</td>
                  <td>26.9%</td>
                </tr>
                <tr>
                  <td>Outstanding as on 01-01-26</td>
                  <td>3,485</td>
                  <td>22,704</td>
                  <td>15.3%</td>
                </tr>
              </tbody>
            </table>
            <div className="dpr-callout">
              Texmaco contributes over one-fourth of the industry's YTD output and is among the top two contributors by volume.
            </div>
          </div>
          <div className="dpr-card">
            <h3>Texmaco Wagon Mix (YTD)</h3>
            <p>Texmaco cumulative production (Apr-Dec): 4,527 split:</p>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={texmacoWagonMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    label
                  >
                    {texmacoWagonMix.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dpr-callout">
              Mix takeaway: output is concentrated in high-run standard IR families (BCNA + BOXNS + BOBRN), showing strong base-load capability.
            </div>
          </div>
        </div>
        <div className="dpr-card alt dpr-section">
          <h3>B. Execution Efficiency vs Peer Manufacturers (YTD)</h3>
          <p>Execution Rate = Cum Production / Total Orders for FY25-26</p>
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Total Orders FY25-26</th>
                <th>Cum Pdn Apr-Dec</th>
                <th>Execution Rate</th>
                <th>O/s on 01-01-26</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Texmaco Rail</td>
                <td>7,655</td>
                <td>4,527</td>
                <td>59.1%</td>
                <td>3,485</td>
              </tr>
              <tr>
                <td>Titagarh / TRSL</td>
                <td>10,158</td>
                <td>4,396</td>
                <td>43.3%</td>
                <td>5,762</td>
              </tr>
              <tr>
                <td>HEI</td>
                <td>5,968</td>
                <td>2,946</td>
                <td>49.4%</td>
                <td>3,022</td>
              </tr>
              <tr>
                <td>Jupiter</td>
                <td>4,409</td>
                <td>1,914</td>
                <td>43.4%</td>
                <td>2,495</td>
              </tr>
              <tr>
                <td>BESCO (FD)</td>
                <td>1,985</td>
                <td>541</td>
                <td>27.3%</td>
                <td>1,444</td>
              </tr>
              <tr>
                <td>Oriental</td>
                <td>4,044</td>
                <td>619</td>
                <td>15.3%</td>
                <td>3,425</td>
              </tr>
            </tbody>
          </table>
          <div className="dpr-callout">
            Benchmark takeaway: among large players, Texmaco shows the strongest execution efficiency by Dec '25.
          </div>
        </div>
      </section>



      <section className="dpr-section">
        <h2 className="dpr-section-title">TREL Performance FY25-26</h2>
        <div className="dpr-split">
          <div className="dpr-card">
            <h3>Quarter-wise Output (Wagons)</h3>
            <div className="bar-chart">
              {trelQuarterOutput.map((item) => (
                <div key={item.label} className="bar-item">
                  <span>{item.label}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${(item.value / maxTrel) * 100}%` }}
                    />
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="dpr-footnote">Total FY25-26: 7,715 wagons.</div>
          </div>
          <div className="dpr-card alt">
            <h3>Q4 Targets</h3>
            <ul>
              <li>Q4 strongest quarter driven by IR ramp-up and exports.</li>
              <li>Q4 IR production:BCNAHSN1, BOBRNHSM2,BOXNS: cumulative output of ~1,740 wagons.</li>              
              <li>4 Rakes of FMP wagons planned to be rolled out in Q4.</li>
              <li>Export target of 110 CAMALCO wagons is scheduled for execution in Q4.</li>
              <li>Four rakes of BLSS (TTRL–CONCOR) wagons are planned to be completed within Q4. </li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          FY25-26 delivered stable IR-led performance with improving export and
          private traction, culminating in a strong Q4 finish.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">TWRL Performance FY25-26</h2>
        <div className="dpr-split">
          <div className="dpr-card">
            <h3>Quarter-wise Execution (Cumulative)</h3>
            <div className="bar-chart">
              {twrlQuarterExecution.map((item) => (
                <div key={item.label} className="bar-item">
                  <span>{item.label}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill teal"
                      style={{ width: `${(item.value / maxTwrl) * 100}%` }}
                    />
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="dpr-footnote">FY projection: 1,549 wagons.</div>
          </div>
          <div className="dpr-card alt">
            <h3>Q4 Targets</h3>
            <ul>
              <li>BCFCM1 (Ultratech):186 wagons projected in Q4.</li>
              <li>ACT-1 (IVCLL/APLL): 2+1(new order) rakes to be rolled out in Q4.</li>
              <li>Q4 drivers: Target to roll out 5 Rakes of BFNV (305wagons).</li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          Performance is steady in H1-H2 with a strong Q4-led ramp-up driven by
          Ultratech, ACT-1, and BFNV orders.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Consolidated Performance Overview</h2>
        <div className="dpr-grid two">
          <div className="dpr-card">
            <h3>Volume (VUs)</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={consolidatedVUs} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f26a4b" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="dpr-metric">
              <span>FY25-26 total</span>
              <strong>9,264 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>FY24-25 total</span>
              <strong>10,612 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>YoY movement</span>
              <strong>-1,348 VUs (-13%)</strong>
            </div>
          </div>
          <div className="dpr-card alt">
            <h3>Value (INR Crore)</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={consolidatedValue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2e7d6b" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="dpr-metric">
              <span>FY25-26 total</span>
              <strong>3,467.29</strong>
            </div>
            <div className="dpr-metric">
              <span>FY24-25 total</span>
              <strong>4,084.11</strong>
            </div>
            <div className="dpr-metric">
              <span>YoY movement</span>
              <strong>-616.82 (-15%)</strong>
            </div>
          </div>
        </div>
        <div className="dpr-grid two dpr-section">
          <div className="dpr-card dpr-highlight">
            <h3>Q4 Momentum</h3>
            <div className="dpr-metric">
              <span>Q4 volume</span>
              <strong>2,997 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q4 value</span>
              <strong>1,134.98 INR Cr</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Forward View (FY26-27)</h3>
            <div className="dpr-metric">
              <span>Volume outlook</span>
              <strong>~9,922 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>Value outlook</span>
              <strong>~4,343 INR Cr</strong>
            </div>
          </div>
        </div>
        <div className="dpr-section way-forward-banner">
          <span>Way Forward FY26-27</span>
        </div>
        <div className="dpr-card dpr-section">
          <h3>Business Mix Composition</h3>
          <div className="dpr-chart">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={businessMixComposition} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Railways" stackId="a" fill="#f26a4b" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="Railways" position="center" fill="#1d1b1f" />
                </Bar>
                <Bar dataKey="Private" stackId="a" fill="#2e7d6b" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="Private" position="center" fill="#ffffff" />
                </Bar>
                <Bar dataKey="Export" stackId="a" fill="#f7a46a" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="Export" position="center" fill="#1d1b1f" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          FY25-26 was a consolidation year with moderated volumes and value,
          while Q4 momentum indicate recovery and upside.
        </div>
      </section>

      <section className="dpr-section">
        <div className="dpr-callout">
          During FY26-27, the focus will be on driving stronger order inflows while closing
          pending orders and accelerating project mobilization. Emphasis will be placed on
          tighter coordination between sales, engineering, and execution teams to ensure timely
          deliveries and unlock higher revenues. The strategy will prioritize higher-value and
          customized projects to improve realizations, alongside expanding the customer base in
          the infrastructure and industrial sectors, supported by faster project mobilization
          and execution.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Focus Shift & Plan Analysis (FY26-27)</h2>
        <div className="dpr-grid three">
          <div className="dpr-card">
            <h3>Volume Mix Shift</h3>
            <ul>
              <li>Private: 3,406 -> 4,202 VUs (+107%).</li>
              <li>Indian Railways: 6,856 -> 4,000 VUs (-44%).</li>
              <li>Exports: 350 -> 1,720 VUs (+1,129%).</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Regional Shift</h3>
            <ul>
              <li>East: export scale-up with 1,415 VUs.</li>
              <li>West: IR reduced to zero, private + export focus.</li>
              <li>Both zones pivot toward higher margin segments.</li>
            </ul>
          </div>
          <div className="dpr-card">
            <h3>Margin-led Strategy</h3>
            <ul>
              <li>Reduce low-margin IR tenders.</li>
              <li>Increase private + export mix.</li>
              <li>Higher realization and EBITDA margin expansion.</li>
            </ul>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          FY26-27 reflects a strategic pivot toward higher quality revenue with
          diversified customer exposure.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">TREL Execution Plan FY26-27 (8,000 VUs)</h2>
        <div className="dpr-grid two">
          <div className="dpr-card">
            <h3>Plan Snapshot</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={twrlSegmentSplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    label
                  >
                    {twrlSegmentSplit.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dpr-metric">
              <span>Total planned sales</span>
              <strong>8,000 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>Orders in hand</span>
              <strong>1,876 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>New orders pipeline</span>
              <strong>6,124 VUs</strong>
            </div>
            <div className="dpr-metric">
              <span>Segment split</span>
              <strong>IR 4,000 | Private 2,585 | Export 1,415</strong>
            </div>
          </div>
          <div className="dpr-card alt">
            <h3>Quarter Phasing</h3>
            <div className="dpr-metric">
              <span>Q1</span>
              <strong>1,718 VUs | 63,750 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q2</span>
              <strong>2,037 VUs | 97,090 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q3</span>
              <strong>2,174 VUs (peak) | 90,440 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q4</span>
              <strong>2,071 VUs | 87,469 Lacs</strong>
            </div>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          Plan is execution-ready with phased order conversion and balanced
          IR, private, and export mix.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">TWRL Wagon Mix FY27 (1,922 VUs)</h2>
        <div className="dpr-grid two">
          <div className="dpr-card">
            <h3>Key Wagon Types</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={twrlWagonMixExportSplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    label
                  >
                    {twrlWagonMixExportSplit.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul>
              <li>BCFCM1 (Ultratech/Nuvoco): 310 wagons.</li>
              <li>BFNS/BRN 22.9: 315 wagons.</li>
              <li>ACT-1: 238 wagons.</li>
              <li>BFNV: 305 wagons.</li>
              <li>BOSM: 196 wagons.</li>
              <li>CMP: 138 wagons.</li>
              <li>Exports: 305 wagons (gondola, rail2rail, flat).</li>
            </ul>
          </div>
          <div className="dpr-card alt">
            <h3>Quarter Phasing</h3>
            <div className="dpr-metric">
              <span>Q1</span>
              <strong>431 VUs | 19,918 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q2</span>
              <strong>415 VUs | 20,010 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q3</span>
              <strong>552 VUs | 27,415 Lacs</strong>
            </div>
            <div className="dpr-metric">
              <span>Q4</span>
              <strong>524 VUs | 28,218 Lacs</strong>
            </div>
            <div className="dpr-footnote">
              H2 contributes ~56% with export-heavy closure.
            </div>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Consolidated Revenue Break-up FY26-27</h2>
        <div className="dpr-grid two">
          <div className="dpr-card dpr-highlight">
            <h3>Overall Snapshot</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={revenueShare}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    label
                  >
                    {revenueShare.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dpr-metric">
              <span>Total revenue</span>
              <strong>INR 4,343 Cr</strong>
            </div>
            <div className="dpr-metric">
              <span>TREL share</span>
              <strong>INR 3,387.48 Cr (78%)</strong>
            </div>
            <div className="dpr-metric">
              <span>TWRL share</span>
              <strong>INR 955.63 Cr (22%)</strong>
            </div>
          </div>
          <div className="dpr-card">
            <h3>Quarter Revenue (INR Lacs)</h3>
            <div className="dpr-chart">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueByQuarter} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#f26a4b" strokeWidth={3} label />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <table className="dpr-table">
              <thead>
                <tr>
                  <th />
                  <th colSpan="3">Q1</th>
                  <th colSpan="3">Q2</th>
                  <th colSpan="3">Q3</th>
                  <th colSpan="3">Q4</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <th />
                  <th>Apr-26</th>
                  <th>May-26</th>
                  <th>Jun-26</th>
                  <th>Jul-26</th>
                  <th>Aug-26</th>
                  <th>Sep-26</th>
                  <th>Oct-26</th>
                  <th>Nov-26</th>
                  <th>Dec-26</th>
                  <th>Jan-27</th>
                  <th>Feb-27</th>
                  <th>Mar-27</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TREL Value (in Lacs)</td>
                  <td>22,426</td>
                  <td>22,575</td>
                  <td>18,749</td>
                  <td>29,198</td>
                  <td>34,894</td>
                  <td>32,998</td>
                  <td>34,659</td>
                  <td>22,355</td>
                  <td>33,426</td>
                  <td>27,752</td>
                  <td>33,356</td>
                  <td>26,361</td>
                  <td>3,38,748</td>
                </tr>
                <tr>
                  <td>TWRL Value (in Lacs)</td>
                  <td>4,798</td>
                  <td>7,695</td>
                  <td>7,425</td>
                  <td>7,126</td>
                  <td>6,888</td>
                  <td>5,996</td>
                  <td>8,407</td>
                  <td>9,108</td>
                  <td>9,900</td>
                  <td>8,892</td>
                  <td>9,585</td>
                  <td>9,741</td>
                  <td>95,563</td>
                </tr>
                <tr>
                  <td>Total Value (in Lacs)</td>
                  <td>27,224</td>
                  <td>30,271</td>
                  <td>26,174</td>
                  <td>36,323</td>
                  <td>41,782</td>
                  <td>38,995</td>
                  <td>43,066</td>
                  <td>31,463</td>
                  <td>43,326</td>
                  <td>36,644</td>
                  <td>42,941</td>
                  <td>36,102</td>
                  <td>4,34,311</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Quarter totals</td>
                  <td colSpan="3">83,669</td>
                  <td colSpan="3">1,17,100</td>
                  <td colSpan="3">1,17,855</td>
                  <td colSpan="3">1,15,687</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="dpr-callout dpr-section">
          Revenue profile is H2-weighted with steady monthly realization and
          improved mix quality from private and export orders.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Budget vs Actual FY25-26</h2>
        <div className="dpr-card">
          <div className="dpr-chart">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={budgetVsActual} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2e7d6b" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="dpr-metric">
            <span>Budgeted revenue</span>
            <strong>INR 6,537 Cr</strong>
          </div>
          <div className="dpr-metric">
            <span>Actual revenue</span>
            <strong>INR 5,262 Cr</strong>
          </div>
          <div className="dpr-metric">
            <span>Variance</span>
            <strong>-1,275 Cr (-20%)</strong>
          </div>
          <table className="dpr-table" style={{ marginTop: "14px" }}>
            <thead>
              <tr>
                <th>Division</th>
                <th>Budget (Cr)</th>
                <th>Actual (Cr)</th>
                <th>Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FCD</td>
                <td>4,400</td>
                <td>3,467.29</td>
                <td>-932.71</td>
              </tr>
              <tr>
                <td>HITECH</td>
                <td>102</td>
                <td>75.12</td>
                <td>-26.88</td>
              </tr>
              <tr>
                <td>FOUNDRY</td>
                <td>1,009</td>
                <td>680</td>
                <td>-329</td>
              </tr>
              <tr>
                <td>BRIGHT POWER</td>
                <td>441</td>
                <td>601</td>
                <td>+160</td>
              </tr>
              <tr>
                <td>TRISS</td>
                <td>554</td>
                <td>433</td>
                <td>-121</td>
              </tr>
              <tr>
                <td>SAIRA</td>
                <td>31</td>
                <td>5.3</td>
                <td>-25.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">Proposed Budget FY26-27</h2>
        <div className="dpr-card dpr-highlight">
          <div className="dpr-metric">
            <span>Total proposed budget</span>
            <strong>INR 6,872 Cr</strong>
          </div>
          <div className="dpr-chart">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={proposedBudgetByUnit} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2e7d6b" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="value" position="top" fill="#1d1b1f" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="dpr-table" style={{ marginTop: "14px" }}>
            <thead>
              <tr>
                <th>Division</th>
                <th>Budget (Cr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FCD</td>
                <td>4,343</td>
              </tr>
              <tr>
                <td>HITECH</td>
                <td>134</td>
              </tr>
              <tr>
                <td>FOUNDRY</td>
                <td>1,009</td>
              </tr>
              <tr>
                <td>BRIGHT POWER</td>
                <td>700</td>
              </tr>
              <tr>
                <td>TRISS</td>
                <td>650</td>
              </tr>
              <tr>
                <td>SAIRA</td>
                <td>36.2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dpr-callout dpr-section">
          FY26-27 budget reflects recovery-led growth anchored in firm volume
          visibility, improved mix quality, and strategic diversification.
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">TRISS</h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Revenue (INR Crores, excl. GST)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumulative revenue till 31.12.2025</td>
                <td>292</td>
              </tr>
              <tr>
                <td>Revenue in Q4 (Expected)</td>
                <td>141</td>
              </tr>
              <tr>
                <td>Cumulative revenue till 31.03.2026</td>
                <td>433</td>
              </tr>
              <tr>
                <td>Budgeted Revenue - FY 2026-27</td>
                <td>650</td>
              </tr>
            </tbody>
          </table>
          <div className="dpr-section">
            <h3>Key Points</h3>
            <ul>
              <li>FY25-26 cumulative revenue reaches 433 Cr with Q4 target of 141 Cr.</li>
              <li>Run-rate lift expected into FY26-27 with a 650 Cr budget target.</li>
              <li>Q4 delivery is the swing quarter for FY25-26 closure.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">BRIGHT POWER</h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Revenue (INR Crores, excl. GST)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumulative revenue till 31.12.2025</td>
                <td>426</td>
              </tr>
              <tr>
                <td>Revenue in Q4 (Expected)</td>
                <td>175</td>
              </tr>
              <tr>
                <td>Cumulative revenue till 31.03.2026</td>
                <td>601</td>
              </tr>
              <tr>
                <td>Budgeted Revenue - FY 2026-27</td>
                <td>700</td>
              </tr>
            </tbody>
          </table>
          <div className="dpr-section">
            <h3>Key Points</h3>
            <ul>
              <li>FY25-26 cumulative revenue reaches 601 Cr with Q4 upside of 175 Cr.</li>
              <li>FY26-27 budget target set at 700 Cr, indicating a moderated growth step.</li>
              <li>Q4 delivery remains the main lever for FY25-26 closure.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">HITECH</h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Revenue (INR Crores, excl. GST)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumulative revenue till 31.12.2025</td>
                <td />
              </tr>
              <tr>
                <td>Revenue in Q4 (Expected)</td>
                <td />
              </tr>
              <tr>
                <td>Cumulative revenue till 31.03.2026</td>
                <td />
              </tr>
              <tr>
                <td>Budgeted Revenue - FY 2026-27</td>
                <td />
              </tr>
            </tbody>
          </table>
          <div className="dpr-section">
            <h3>Key Points</h3>
            <ul>
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">FOUNDRY</h2>
        <div className="dpr-card">
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Revenue (INR Crores, excl. GST)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumulative revenue till 31.12.2025</td>
                <td>493.62</td>
              </tr>
              <tr>
                <td>Revenue in Q4 (Expected)</td>
                <td>186.38</td>
              </tr>
              <tr>
                <td>Cumulative revenue till 31.03.2026</td>
                <td>680</td>
              </tr>
              <tr>
                <td>Budgeted Revenue - FY 2026-27</td>
                <td>1009</td>
              </tr>
            </tbody>
          </table>
          <div className="dpr-section">
            <h3>Key Points</h3>
            <ul>
              <li>FY25-26 cumulative revenue stands at 680 Cr with Q4 expected at 186.38 Cr.</li>
              <li>FY26-27 budget target of 1009 Cr indicates a scale-up plan.</li>
              <li>Q4 execution is the key driver for full-year closure.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">SAIRA – Revenue Summary </h2>
        <div className="dpr-card">
          <div className="dpr-footnote">(INR Crores, excl. GST)</div>
          <table className="dpr-table">
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Revenue (INR Cr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cumulative revenue till 30.11.2025</td>
                <td>2.48</td>
              </tr>
              <tr>
                <td>Revenue in Q4 (Expected)</td>
                <td>2.88</td>
              </tr>
              <tr>
                <td>Cumulative revenue till 31.03.2026</td>
                <td>5.36</td>
              </tr>
              <tr>
                <td>Budgeted Revenue - FY 2026-27</td>
                <td>36.2</td>
              </tr>
            </tbody>
          </table>
          <div className="dpr-section">
            <h3>Key Points</h3>
            <ul>
              <li>FY25-26 run rate reaches 5.36 Cr with Q4 contributing 2.88 Cr.</li>
              <li>FY26-27 budget target set at 36.2 Cr for scale-up.</li>
              <li>Nov-25 achieved base stands at 2.48 Cr.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dpr-section">
        <h2 className="dpr-section-title">
          Marketing Department – Proposed Hierarchy Structure
        </h2>
        <div className="dpr-card org-chart-card">
          <div className="org-stack">
            <div className="org-top">
              <div className="org-node">CMO (Amit Kr Singh)</div>
            </div>
            <div className="org-mid-row">
              <div className="org-node">AM – Co ordinator (Aditya)</div>
              <div className="org-node">VP – Co ordinator (Deepak Saxena)</div>
              <div className="org-node">Sr. VP – International Sales (Manoj Kr)</div>
            </div>
          </div>

          <div className="org-branches">
            <div className="org-branch">
              
              <div className="org-role">GM – Marketing (TREL) (SB)</div>
              <div className="org-role">
                Mgr – Coordinator <span className="org-tag">Vacant</span>
              </div>
            </div>

            <div className="org-branch">
              
              <div className="org-role">GM – Marketing (TWRL) (Alok)</div>
              <div className="org-role">
                Mgr – Coordinator <span className="org-tag">Vacant</span>
              </div>
            </div>

            <div className="org-branch">
              
              <div className="org-role">GM – Mktg (Nymwag JV) (Mavtzh)</div>
            </div>

            <div className="org-branch">
              
              <div className="org-role">
                GM – Marketing (SF & Hightech) <span className="org-tag">Vacant</span>
              </div>
              <div className="org-role">AM – SF (Alok)</div>
            </div>

            <div className="org-branch">
              
              <div className="org-role">Manager – Sales (Chirag & Anushua)</div>
            </div>

            <div className="org-branch">
              
              <div className="org-role">GM - Service (Dharmesh)</div>
            </div>
          </div>

          <div className="org-notes">
            <h3>Key Points</h3>
            <ul>
              <li>
                Note: Strong technical folks – design and engineering background
                needs to be added.
              </li>
              <li>
                Structure needs to be created based on business flow.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementDpr;
