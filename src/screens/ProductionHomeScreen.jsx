import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PartInventoryForm from '../components/PartInventoryForm';

const ProductionHomeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [inventoryProjectId, setInventoryProjectId] = useState('');
  const [liveInventory, setLiveInventory] = useState({});
  const navigate = useNavigate();

  // Fetch confirmed orders + planning
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, planRes] = await Promise.all([
          api.get('/enquiries/orders'),
          api.get('/production/monthly-planning')
        ]);

        const ordersArray = Array.isArray(orderRes.data.orders)
          ? orderRes.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];

        const planningArray = Array.isArray(planRes.data)
          ? planRes.data
          : Array.isArray(planRes.data.data)
            ? planRes.data.data
            : [];

        console.log('✅ Orders:', ordersArray);
        console.log('✅ Planning:', planningArray);

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
    if (orders.length === 0) return;

    const normalize = (str) => (str || '').trim().toLowerCase();

    const merged = orders.map(order => {
      const matchedPlan = planning.find(
        plan => normalize(plan.projectId) === normalize(order.projectId)
      );

      return {
        projectId: order.projectId || 'N/A',
        clientType: order.clientType || 'N/A',
        clientName: order.clientName || 'N/A',
        wagonType: order.wagonType || 'N/A',
        monthTarget: matchedPlan?.monthlyTarget || '-',
        dm: '',
        pullOut: '',
        progress: ''
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
      <h4 className="fw-semibold mb-3 border-bottom pb-2">📊 Monthly Production Overview</h4>

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
              <th>Pull Out</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.length === 0 ? (
              <tr>
                <td colSpan="8">No Confirmed Orders Found</td>
              </tr>
            ) : (
              mergedData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.projectId}</td>
                  <td>{item.clientType}</td>
                  <td>{item.clientName}</td>
                  <td>{item.wagonType}</td>
                  <td>{item.monthTarget}</td>
                  <td>{item.dm}</td>
                  <td>{item.pullOut}</td>
                  <td>{item.progress}</td>
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
