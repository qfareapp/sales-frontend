import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PartInventoryForm = ({ onProjectChange, inventoryProjectId, liveInventory }) => {
  const [date, setDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [wagonType, setWagonType] = useState('');
  const [parts, setParts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [wagonSetsAvailable, setWagonSetsAvailable] = useState(0); // ✅ NEW

  // ✅ Fetch confirmed projects
  useEffect(() => {
    axios.get('http://localhost:5000/api/enquiries/orders')
      .then(res => {
        const confirmed = res.data.orders.filter(item =>
          (item.stage || '').toLowerCase().includes('confirm')
        );
        setProjects(confirmed);
      });
  }, []);

  // ✅ Fetch BOM parts when a project is selected
  useEffect(() => {
    const project = projects.find(p => p.projectId === selectedProject);
    if (project) {
      setWagonType(project.wagonType);
      axios.get('http://localhost:5000/api/wagons')
        .then(res => {
          const config = res.data.find(w => w.wagonType === project.wagonType);
          setParts(config ? config.parts : []);
          setQuantities({});
        });

      // Notify parent to fetch inventory
      onProjectChange?.(project.projectId);
    }
  }, [selectedProject]);

  // ✅ Calculate wagon sets based on BOM and live inventory
  useEffect(() => {
    if (!parts || parts.length === 0 || !liveInventory) {
      setWagonSetsAvailable(0);
      return;
    }

    let sets = Infinity;
    parts.forEach(part => {
      const availableQty = liveInventory[part.name] || 0;
      const requiredQty = part.total || 1;
      const possibleSets = Math.floor(availableQty / requiredQty);
      sets = Math.min(sets, possibleSets);
    });

    setWagonSetsAvailable(isFinite(sets) ? sets : 0);
  }, [parts, liveInventory]);

  const handleChange = (partName, value) => {
    setQuantities(prev => ({ ...prev, [partName]: parseInt(value) || 0 }));
  };

  const handleSubmit = async () => {
    const payload = {
      date: date.toISOString().split('T')[0],
      projectId: selectedProject,
      wagonType,
      partEntries: parts.map(p => ({
        name: p.name,
        quantity: quantities[p.name] || 0
      }))
    };

    try {
      await axios.post('http://localhost:5000/api/inventory/add', payload);
      alert('✅ Inventory saved');
      setQuantities({});
      onProjectChange?.(selectedProject); // Refresh inventory after save
    } catch (err) {
      console.error('❌ Error saving inventory:', err);
      alert('❌ Error saving inventory');
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>📦 Daily Part Receipt – Store Entry</h2>

      <label><b>Date:</b></label><br />
      <DatePicker selected={date} onChange={setDate} dateFormat="yyyy-MM-dd" />
      <br /><br />

      <label><b>Project ID:</b></label><br />
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 20 }}
      >
        <option value="">-- Select Project --</option>
        {projects.map(p => (
          <option key={p.projectId} value={p.projectId}>
            {p.projectId} - {p.clientName} ({p.wagonType})
          </option>
        ))}
      </select>

      {parts.length > 0 && (
        <>
          <h4>🚚 Enter Received Quantity</h4>
          {parts.map(p => (
            <div key={p.name} style={{ marginBottom: 10 }}>
              <label>{p.name}:</label>
              <input
                type="number"
                min="0"
                value={quantities[p.name] || ''}
                onChange={e => handleChange(p.name, e.target.value)}
                style={{ marginLeft: 10, width: 100 }}
              />
            </div>
          ))}
          <button onClick={handleSubmit} style={{ marginTop: 20, padding: '10px 20px' }}>
            💾 Save Inventory
          </button>

          {/* ✅ Live Inventory Table + Wagon Sets */}
          {inventoryProjectId && (
            <div className="mt-4">
              <h5 className="fw-bold mb-3">📦 Current Inventory for Project: {inventoryProjectId}</h5>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Part</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(liveInventory).map(([part, qty]) => (
                    <tr key={part}>
                      <td>{part}</td>
                      <td>{qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="alert alert-info mt-3">
                🚆 <strong>Wagon Sets Possible:</strong> {wagonSetsAvailable}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PartInventoryForm;
