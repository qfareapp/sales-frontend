import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const human0 = (n) => (Number.isFinite(+n) ? +n : 0);

// ----- 5-day bucket helpers (use 1-5..26-30 like your sheet) -----
const BUCKET_RANGES = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"];

function bucketLabelForDate(d) {
  const day = d.getDate();
  if (day <= 5) return "1-5";
  if (day <= 10) return "6-10";
  if (day <= 15) return "11-15";
  if (day <= 20) return "16-20";
  if (day <= 25) return "21-25";
  return "26-30";
}

// Build matrices from daily logs for CURRENT month:
// partsMatrix:  { [partName]:  { "1-5": n, "6-10": n, ... } }
// stagesMatrix: { [stageName]: { "1-5": n, "6-10": n, ... } }
function buildFiveDayMatrices(daily = []) {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();

  const partsMatrix = {};
  const stagesMatrix = {};

  for (const row of daily) {
    const d = new Date(row.date || row.createdAt || row.ts);
    if (d.getMonth() !== m || d.getFullYear() !== y) continue;
    const bucket = bucketLabelForDate(d);

    const pp = row.partsProduced || {};
    Object.entries(pp).forEach(([part, qty]) => {
      const q = human0(qty);
      if (!partsMatrix[part]) partsMatrix[part] = Object.fromEntries(BUCKET_RANGES.map(r => [r, 0]));
      partsMatrix[part][bucket] += q;
    });

    const sc = row.stagesCompleted || {};
    Object.entries(sc).forEach(([stage, qty]) => {
      const q = human0(qty);
      if (!stagesMatrix[stage]) stagesMatrix[stage] = Object.fromEntries(BUCKET_RANGES.map(r => [r, 0]));
      stagesMatrix[stage][bucket] += q;
    });
  }

  return { partsMatrix, stagesMatrix };
}

const ProgressBar = ({ value }) => {
  const v = Math.max(0, Math.min(100, Math.round(value || 0)));
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar" style={{ width: `${v}%` }} title={`${v}%`} />
    </div>
  );
};

export default function ProductionDetailsScreen() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Data
  const [project, setProject] = useState(null);     // order/enquiry basics
  const [planning, setPlanning] = useState(null);   // monthly target, PDI, etc.
  const [inventory, setInventory] = useState(null); // current live inventory
  const [stages, setStages] = useState([]);         // per-stage completion (overall)
  const [daily, setDaily] = useState([]);           // raw daily logs for the month

  // Derived summary
  const monthTarget = human0(planning?.monthlyTarget);
  const pulloutDone = human0(planning?.pulloutDone);
  const readyForPullout = human0(planning?.readyForPullout);
  const totalCompleted = pulloutDone + readyForPullout;
  const left = monthTarget > 0 ? Math.max(0, monthTarget - totalCompleted) : 0;
  const pct = monthTarget > 0 ? (100 * totalCompleted) / monthTarget : 0;

  // Your canonical row orders (match the sheet)
  const PART_ROWS = [
    "Underframe", "Body Side", "Body End", "Door", "Bogie", "Coupler", "Wheel"
  ];
  const STAGE_ROWS = [
    "Boxing", "BMP", "Wheeling & Visual Clearence",
    "Shot Blasting & Primer", "Final Painting & Lettering",
    "Air Brake Testing", "APD", "PDI"
  ];

  // Build matrices from fetched daily logs
  const { partsMatrix, stagesMatrix } = useMemo(
    () => buildFiveDayMatrices(daily),
    [daily]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');

        const [ordersRes, planRes, invRes, stagesRes, dailyRes] = await Promise.all([
          api.get('/enquiries/orders'),
          api.get('/production/monthly-planning'),
          api.get(`/inventory/available/${encodeURIComponent(projectId)}`),
          api.get(`/production/stages/${encodeURIComponent(projectId)}`).catch(() => ({ data: [] })),
          api.get(`/production/daily?projectId=${encodeURIComponent(projectId)}`).catch(() => ({ data: [] })),
        ]);

        const ordersArray = Array.isArray(ordersRes.data?.orders) ? ordersRes.data.orders : [];
        const proj =
          ordersArray.find(o => (o.projectId || '').toLowerCase().trim() === (projectId || '').toLowerCase().trim()) ||
          null;

        const planningArray = Array.isArray(planRes.data)
          ? planRes.data
          : Array.isArray(planRes.data?.data)
          ? planRes.data.data
          : [];
        const plan =
          planningArray.find(p => (p.projectId || '').toLowerCase().trim() === (projectId || '').toLowerCase().trim()) ||
          null;

        if (mounted) {
          setProject(proj);
          setPlanning(plan);
          setInventory(invRes.data || {});
          setStages(Array.isArray(stagesRes.data) ? stagesRes.data : []);
          setDaily(Array.isArray(dailyRes.data) ? dailyRes.data : []);
        }
      } catch (e) {
        if (mounted) setError(e?.response?.data?.message || e.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [projectId]);

  return (
    <div className="container mt-5 pt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold m-0">Production Details — {projectId}</h3>
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Back</button>
      </div>

      {loading && <div className="alert alert-info">Loading…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          {/* ===== Summary ===== */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Client</div>
                  <div className="fw-semibold">
                    {(project?.clientName || '—')} <span className="text-muted">({project?.clientType || '—'})</span>
                  </div>
                  <div className="text-muted small mt-2">Wagon Type</div>
                  <div className="fw-semibold">{project?.wagonType || '—'}</div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Monthly Target</div>
                  <div className="display-6">{monthTarget || '—'}</div>
                  <div className="mt-2"><ProgressBar value={pct} /></div>
                  <div className="small text-muted mt-1">
                    {monthTarget ? `${totalCompleted}/${monthTarget} (${Math.round(pct)}%)` : `${totalCompleted} (no target)`}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Completed</div>
                  <div className="display-6">{totalCompleted}</div>
                  <div className="text-muted small mt-2">Pullout Done</div>
                  <div className="fw-semibold">{pulloutDone}</div>
                  <div className="text-muted small mt-1">Ready for Pullout</div>
                  <div className="fw-semibold">{readyForPullout}</div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Left (vs Target)</div>
                  <div className="display-6">{left}</div>
                  <div className="text-muted small mt-2">Project ID</div>
                  <div className="fw-semibold">{projectId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Inventory ===== */}
          <h5 className="fw-semibold border-bottom pb-2 mb-3">📦 Live Inventory</h5>
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>Part / Component</th>
                  <th>Available</th>
                  <th>Reserved</th>
                  <th>Min Level</th>
                  <th>Max Level</th>
                </tr>
              </thead>
              <tbody>
  {!inventory || Object.keys(inventory).length === 0 ? (
    <tr><td colSpan="5">No inventory data</td></tr>
  ) : (
    Object.entries(inventory).map(([part, info], i) => (
      <tr key={i}>
        <td className="text-start">{part}</td>
        <td>{human0(info?.available)}</td>
        <td>{human0(info?.reserved)}</td>
        <td>{human0(info?.minLevel)}</td>
        <td>{human0(info?.maxLevel)}</td>
      </tr>
    ))
  )}
</tbody>
            </table>
          </div>

          {/* ===== Stage-wise overall progress ===== */}
          <h5 className="fw-semibold border-bottom pb-2 mb-3">🛠️ Stage-wise Progress</h5>
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Stage</th>
                  <th className="text-end">Completed</th>
                  <th className="text-end">Total</th>
                  <th className="text-end">Left</th>
                  <th style={{ width: 220 }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {(!stages || stages.length === 0) ? (
                  <tr><td colSpan="5" className="text-center">No stage data</td></tr>
                ) : (
                  stages.map((s, i) => {
                    const done = human0(s.completed);
                    const tot = human0(s.total);
                    const left = Math.max(0, tot - done);
                    const pct = tot > 0 ? (100 * done) / tot : 0;
                    return (
                      <tr key={i}>
                        <td className="text-start">{s.stage || s.name || `Stage ${i+1}`}</td>
                        <td className="text-end">{done}</td>
                        <td className="text-end">{tot}</td>
                        <td className="text-end">{left}</td>
                        <td><ProgressBar value={pct} /></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ===== 5-day trend pulled from daily logs ===== */}
          <h5 className="fw-semibold border-bottom pb-2 mb-3">🗓️ 5-Day Trend (This Month)</h5>
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  {BUCKET_RANGES.map(range => (
                    <th key={range}>{range}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Parts */}
                <tr className="table-secondary">
                  <td colSpan={1 + BUCKET_RANGES.length} className="fw-bold text-start">Part</td>
                </tr>
                {PART_ROWS.map(name => {
                  const row = partsMatrix[name] || Object.fromEntries(BUCKET_RANGES.map(r => [r, 0]));
                  return (
                    <tr key={name}>
                      <td className="text-start">{name}</td>
                      {BUCKET_RANGES.map(range => (
                        <td key={range}>{row[range]}</td>
                      ))}
                    </tr>
                  );
                })}

                {/* Stages */}
                <tr className="table-secondary">
                  <td colSpan={1 + BUCKET_RANGES.length} className="fw-bold text-start">Stages</td>
                </tr>
                {STAGE_ROWS.map(name => {
                  const row = stagesMatrix[name] || Object.fromEntries(BUCKET_RANGES.map(r => [r, 0]));
                  return (
                    <tr key={name}>
                      <td className="text-start">{name}</td>
                      {BUCKET_RANGES.map(range => (
                        <td key={range}>{row[range]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
