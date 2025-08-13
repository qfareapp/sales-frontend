import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import EnquiryForm from './components/EnquiryForm';
import EnquiryListScreen from './screens/EnquiryListScreen';
import EnquiryUpdateForm from './components/EnquiryUpdateForm';
import DailyUpdateForm from './screens/DailyUpdateForm';
import ProjectDetails from './screens/ProjectDetails';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import ProductionHomeScreen from './screens/ProductionHomeScreen';
import MonthlyPlanningForm from './screens/MonthlyPlanningForm';
import ManageWagonTypesScreen from './screens/ManageWagonTypesScreen';
import DailyProductionForm from './screens/DailyProductionForm';
import SalesKPIScreen from './screens/SalesKPIScreen';
import DashboardHome from './screens/DashboardHome'; // adjust path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const standalonePaths = ['/daily-update', '/daily-production'];
  const isStandalone = standalonePaths.includes(location.pathname);

  const [salesOpen, setSalesOpen] = useState(false);
  const [productionOpen, setProductionOpen] = useState(false);

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <nav className="navbar custom-navbar fixed-top">
  <div className="container-fluid">
    <span className="navbar-brand d-flex align-items-center">
      <img src="/Texmaco logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
      <span className="brand-title">TexView</span>
    </span>
  </div>
</nav>


      {/* 🔹 Sidebar */}
      <div className="sidebar bg-dark text-white">
        <ul className="nav flex-column mt-3">
          <li className="nav-item"><Link to="/" className="nav-link text-white">➕ Home</Link></li>
          {/* 🔸 Sales Toggle */}
          <li className="nav-item">
            <span
              onClick={() => setSalesOpen(!salesOpen)}
              className="nav-link text-white fw-bold"
              style={{ cursor: 'pointer' }}
            >
              📊 Sales {salesOpen ? '▲' : '▼'}
            </span>
            {salesOpen && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link to="/enquiryForm" className="nav-link text-white">➕ New Enquiry</Link>
                </li>
                <li className="nav-item">
                  <Link to="/enquiries" className="nav-link text-white">📋 View Enquiries</Link>
                </li>
                <li className="nav-item">
                  <Link to="/daily-update" className="nav-link text-white">🛠️ Daily Update</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sales-kpi" className="nav-link text-white">📈 Sales KPI</Link>
                </li>
              </ul>
            )}
          </li>

          {/* 🔸 Production Toggle */}
          <li className="nav-item mt-3">
            <span
              onClick={() => setProductionOpen(!productionOpen)}
              className="nav-link text-white fw-bold"
              style={{ cursor: 'pointer' }}
            >
              🏗️ Production {productionOpen ? '▲' : '▼'}
            </span>
            {productionOpen && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link to="/production" className="nav-link text-white">📊 Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/monthly-planning" className="nav-link text-white">📅 Monthly Planning</Link>
                </li>
                <li className="nav-item">
                  <Link to="/daily-production" className="nav-link text-white">🛠️ Daily Production Update</Link>
                </li>
                <li className="nav-item">
                  <Link to="/manage-wagon-types" className="nav-link text-white">⚙️ Manage Wagon Types</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* 🔹 Main Content */}
      <div className="main-content">
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/enquiryForm" element={<EnquiryForm />} />
          <Route path="/enquiries" element={<EnquiryListScreen />} />
          <Route path="/enquiry/:id" element={<EnquiryUpdateForm />} />
          <Route path="/daily-update" element={<DailyUpdateForm />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/delivery-details/:projectId" element={<ProjectDetailsScreen />} />
          <Route path="/production" element={<ProductionHomeScreen />} />
          <Route path="/monthly-planning" element={<MonthlyPlanningForm />} />
          <Route path="/manage-wagon-types" element={<ManageWagonTypesScreen />} />
          <Route path="/daily-production" element={<DailyProductionForm />} />
          <Route path="/sales-kpi" element={<SalesKPIScreen />} />
           <Route path="/" element={<DashboardHome />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
