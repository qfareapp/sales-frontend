import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import api from '../api';
import 'react-datepicker/dist/react-datepicker.css';

const DailyProductionForm = () => {
  const [date, setDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [partInventory, setPartInventory] = useState({});
  const [partsProduced, setPartsProduced] = useState({});
  const [stagesCompleted, setStagesCompleted] = useState({});
  const [wagonBOM, setWagonBOM] = useState({});
  const [wagonType, setWagonType] = useState('');

  const productionStages = [
    'Boxing',
    'BMP',
    'Wheeling',
    'Shot Blasting',
    'Painting & Lettering'
  ];

  const wagonParts = [
    'Underframe',
    'Body Side',
    'Body End',
    'Roof',
    'Wheel',
    'Bogie',
    'Coupler',
    'Barrel',
    'Brake System',
    'Door'
  ];

  useEffect(() => {
    api.get('/enquiries/orders')
      .then(res => {
        const data = Array.isArray(res.data.orders) ? res.data.orders : [];
        const confirmedOnly = data.filter(item =>
          (item.stage || '').toLowerCase().includes('confirm')
        );
        setProjects(confirmedOnly);
      })
      .catch(err => {
        console.error('❌ Error fetching confirmed orders:', err);
      });
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const project = projects.find(p => p.projectId === selectedProject);
    const type = project?.wagonType;
    setWagonType(type);

    // ✅ Fetch inventory for selected project
    axios.get(`http://localhost:5000/api/production/parts/${selectedProject}`)
      .then(res => {
        setPartInventory(res.data);
      });

    // ✅ Fetch BOM for selected wagon type
    axios.get(`http://localhost:5000/api/bom/${type}`)
      .then(res => {
        setWagonBOM(res.data); // { Underframe: 1, Roof: 1, Body Side: 2, ... }
      });

    setStagesCompleted({});
    setPartsProduced({});
  }, [selectedProject]);

  const handlePartsProducedInput = (part, value) => {
    const qty = parseInt(value) || 0;
    setPartsProduced(prev => ({ ...prev, [part]: qty }));
  };

  const handleStageInput = (stage, count) => {
    const newCount = parseInt(count) || 0;
    setStagesCompleted(prev => ({ ...prev, [stage]: newCount }));

    // Deduct BOM-based parts from inventory
    if (wagonBOM) {
      const partsUsed = { ...partInventory };
      for (const part in wagonBOM) {
        if (!partsUsed[part]) partsUsed[part] = 0;

        // Simplified assumption: every stage consumes full BOM set
        partsUsed[part] -= wagonBOM[part] * newCount;
      }
      setPartInventory(partsUsed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: date.toISOString().split('T')[0],
      projectId: selectedProject,
      wagonType,
      partsProduced,
      stagesCompleted
    };

    try {
      await api.post('/production/daily-wagon-update', payload);
      alert('✅ Daily production log saved!');
      setPartsProduced({});
      setStagesCompleted({});
    } catch (err) {
      console.error('❌ Error submitting update:', err);
      alert('Error saving update');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: 'auto' }}>
      <h2>📦 Daily Production Entry</h2>
      <form onSubmit={handleSubmit}>
        <label><b>Date:</b></label>
        <DatePicker selected={date} onChange={setDate} dateFormat="yyyy-MM-dd" />
        <br /><br />

        <label><b>Select Project:</b></label>
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

        {/* Section: Parts Produced */}
        <h3>🧩 Parts Manufactured Today</h3>
        {wagonParts.map(part => (
          <div key={part} style={{ marginBottom: 10 }}>
            <label>{part} produced:</label>
            <input
              type="number"
              min={0}
              value={partsProduced[part] || ''}
              onChange={e => handlePartsProducedInput(part, e.target.value)}
              style={{ marginLeft: 10, width: 80 }}
            />
          </div>
        ))}

        <hr style={{ margin: '20px 0' }} />

        {/* Section: Stage Completion */}
        <h3>🏗️ Stages Completed (Consumes Parts)</h3>
        {productionStages.map(stage => (
          <div key={stage} style={{ marginBottom: 10 }}>
            <label>{stage} completed:</label>
            <input
              type="number"
              min={0}
              value={stagesCompleted[stage] || ''}
              onChange={e => handleStageInput(stage, e.target.value)}
              style={{ marginLeft: 10, width: 80 }}
            />
          </div>
        ))}

        {/* Section: Inventory Preview */}
        <h3>📦 Updated Part Inventory Preview</h3>
        <table border="1" cellPadding={8} style={{ width: '100%', marginBottom: 20 }}>
          <thead>
            <tr>
              <th>Part</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(partInventory).map(([part, count]) => (
              <tr key={part}>
                <td>{part}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: 20, padding: 10, backgroundColor: '#2ecc71', color: 'white', border: 'none' }}>
          ✅ Save Daily Update
        </button>
      </form>
    </div>
  );
};

export default DailyProductionForm;
