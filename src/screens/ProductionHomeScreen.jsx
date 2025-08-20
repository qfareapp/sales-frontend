import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import PartInventoryForm from '../components/PartInventoryForm';

const ProductionHomeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [inventoryProjectId, setInventoryProjectId] = useState('');
  const [liveInventory, setLiveInventory] = useState({});
  const [pulloutInputs, setPulloutInputs] = useState({});
  const navigate = useNavigate();

  // Fetch confirmed orders + planning
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, planRes] = await Promise.all([
          api.get('/enquiries/orders'),
          api.get('/production/monthly-planning'),
        ]);

        const ordersArray = Array.isArray(orderRes.data?.orders)
          ? orderRes.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];

        const planningArray = Array.isArray(planRes.data)
          ? planRes.data
          : Array.isArray(planRes.data?.data)
          ? planRes.data.data
          : [];

        setOrders(ordersArray);
        setPlanning(planningArray);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Merge confirmed orders with planning
  useEffect(() => {
    if (!orders.length) return;

    const normalize = (s) => (s || '').trim().toLowerCase();

    const merged = orders.map((order) => {
      const matchedPlan = planning.find(
        (plan) => normalize(plan.projectId) === normalize(order.projectId)
      );

      const monthTargetNum = Number(matchedPlan?.monthlyTarget) || 0;

      const totalPDI = Number(matchedPlan?.pdi) || 0;
      const pulloutDone = Number(matchedPlan?.pulloutDone) || 0;
      const readyForPullout = Number(matchedPlan?.readyForPullout) || 0;

      const pct =
        monthTargetNum > 0
          ? Math.min(100, Math.round(((pulloutDone + readyForPullout) / monthTargetNum) * 100))
          : 0;

      return {
        _id: matchedPlan?._id || order._id,
        projectId: order.projectId || 'N/A',
        clientType: order.clientType || 'N/A',
        clientName: order.clientName || 'N/A',
        wagonType: order.wagonType || 'N/A',
        monthTarget: monthTargetNum || '—',
        dm: '',
        totalPDI,
        readyForPullout,   // ✅ use backend value
        pulloutDone,
        progressPct: pct,
        progressText: monthTargetNum
          ? `${pulloutDone + readyForPullout}/${monthTargetNum} (${pct}%)`
          : `${pulloutDone + readyForPullout} (no target)`,
      };
    });

    setMergedData(merged);
  }, [orders, planning]);

  // 🔄 Fetch live inventory for selected project
  const fetchLiveInventory = async (projectId) => {
    try {
      const res = await api.get(`/inventory/available/${projectId}`);
      setLiveInventory(res.data);
      setInventoryProjectId(projectId);
    } catch (err) {
      console.error('❌ Error fetching live inventory:', err);
    }
  };

  // ⭐ Handle pullout update
  const handlePulloutUpdate = async (row) => {
    const count = parseInt(pulloutInputs[row.projectId] || 0, 10);
    if (!count || count <= 0) return alert("Enter a valid number");
    if (count > row.readyForPullout) return alert("Not enough wagons ready for pullout");

    try {
      await api.post(`/production/pullout-update/${row.projectId}`, { count });
      const planRes = await api.get('/production/monthly-planning');
      setPlanning(Array.isArray(planRes.data) ? planRes.data : []);
      setPulloutInputs((prev) => ({ ...prev, [row.projectId]: "" }));
    } catch (err) {
      alert("❌ Error updating pullout: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5 pt-4">
      {/* Top Right Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/manage-wagon-types')}
        >
          ⚙️ Manage Wagon Types
        </button>
      </div>

      {/* Header */}
      <h2 className="fw-bold mb-4">🏭 Production Dashboard</h2>

      {/* Action Buttons */}
      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate('/monthly-planning')}
        >
          📅 Monthly Planning
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => navigate('/daily-production')}
        >
          🛠️ Daily Production Update
        </button>

        <button
          className={`btn ${showInventoryForm ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setShowInventoryForm(!showInventoryForm)}
        >
          {showInventoryForm ? '➖ Hide Inventory Entry' : '📦 Add Inventory'}
        </button>
      </div>

      {/* Inventory Entry Section */}
      {showInventoryForm && (
        <div className="border p-4 rounded bg-light">
          <h4 className="mb-3">📦 Daily Part Inventory Entry (Store)</h4>
          <PartInventoryForm
            onProjectChange={fetchLiveInventory}
            inventoryProjectId={inventoryProjectId}
            liveInventory={liveInventory}
          />
        </div>
      )}

      {/* Overview Table */}
      <h4 className="fw-semibold mb-3 border-bottom pb-2">
        📊 Monthly Production Overview
      </h4>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Project ID</th>
              <th>Client Type</th>
              <th>Client Name</th>
              <th>Wagon Type</th>
              <th>Month Target</th>
              <th>DM</th>
              <th>PDI / Ready for Pullout</th>
              <th>Pullout Done</th>
              <th>Progress</th>
              <th>Update Pullout</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.length === 0 ? (
              <tr>
                <td colSpan="10">No Confirmed Orders Found</td>
              </tr>
            ) : (
              mergedData.map((item, idx) => (
                <tr key={`${item.projectId}-${item._id || idx}`}>
                  <td>{item.projectId}</td>
                  <td>{item.clientType}</td>
                  <td>{item.clientName}</td>
                  <td>{item.wagonType}</td>
                  <td>{item.monthTarget}</td>
                  <td>{item.dm}</td>
                  <td>{item.readyForPullout}</td> {/* ✅ fixed */}
                  <td>{item.pulloutDone}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      <div
                        className="progress"
                        role="progressbar"
                        aria-valuenow={item.progressPct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: `${item.progressPct}%` }}
                          title={`${item.progressPct}%`}
                        />
                      </div>
                      <small className="text-muted">{item.progressText}</small>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <input
  type="number"
  min="1"
  style={{ width: "70px" }}
  value={pulloutInputs[item.projectId] || ""}
  onChange={(e) =>
    setPulloutInputs((prev) => ({
      ...prev,
      [item.projectId]: e.target.value,
    }))
  }
  // ✅ Disable if no wagons ready
  disabled={item.readyForPullout === 0}
/>

<button
  className="btn btn-sm btn-primary"
  onClick={() => handlePulloutUpdate(item)}
  // ✅ Disable if no wagons ready
  disabled={item.readyForPullout === 0}
>
  Update
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionHomeScreen;
