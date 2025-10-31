import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import EnquiryForm from './components/EnquiryForm';
import EnquiryListScreen from './screens/EnquiryListScreen';
import EnquiryUpdateForm from './components/EnquiryUpdateForm';
import DailyUpdateForm from './screens/DailyUpdateForm';
import ProjectDetails from './screens/ProjectDetails';
import ProjectDetailsScreen from './screens/ProjectDetailsScreen';
import ProductionHomeScreen from './screens/ProductionHomeScreen';
import ProductionDetailsScreen from './screens/ProductionDetailsScreen';
import MonthlyPlanningForm from './screens/MonthlyPlanningForm';
import ManageWagonTypesScreen from './screens/ManageWagonTypesScreen';
import DailyProductionForm from './screens/DailyProductionForm';
//import PlanningDashboard from './screens/PlanningDashboard';
//import PlanningForm from './components/PlanningForm';
//import ProjectGantt from './components/ProjectGantt';
import BogieInspectionForm from './screens/quality/BogieInspectionForm';
import QualityDashboard from './screens/quality/QualityDashboard';
import BogieInspectionReport from './screens/quality/BogieInspectionReport';
import SalesKPIScreen from './screens/SalesKPIScreen';
import DashboardHome from './screens/DashboardHome'; // adjust path as needed
import SalesProdEntryForm from "./screens/sales/SalesProdEntryForm";
import SalesProdDashboard from "./screens/sales/SalesProdDashboard";
import BogiePostWheelInspectionForm from './screens/quality/BogiePostWheelInspectionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const standalonePaths = ['/daily-update', '/daily-production'];
  const isStandalone = standalonePaths.includes(location.pathname);

  const [salesOpen, setSalesOpen] = useState(false);
  const [productionOpen, setProductionOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ for hamburger menu
  const [qualityOpen, setQualityOpen] = useState(false);

  if (isStandalone) {
    return <>{children}</>;
  }

  // ✅ Close sidebar after clicking a link (mobile only)
  const handleLinkClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar custom-navbar fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          

          <span className="navbar-brand d-flex align-items-center w-100 m-0  justify-content-between">
            <img src="/Texmaco logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <span className="brand-title">TexView</span>
            {/* Hamburger Button */}
          <button
            className="hamburger-btn d-lg-none border rounded p-1 bg-white text-dark"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          </span>

          
        </div>
      </nav>


      {/* Sidebar */}
<div className={`sidebar bg-dark text-white ${sidebarOpen ? 'open' : ''}`}>
  <ul className="nav flex-column mt-3">
    <li>
      <Link to="/" className="nav-link text-white" onClick={handleLinkClick}>
        📋 Home
      </Link>
    </li>

    {/*<li>
      <Link to="/planning" className="nav-link text-white" onClick={handleLinkClick}>
        📝 Project Planning
      </Link>
    </li>*/}

    {/* Sales Menu */}
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
          <li>
            <Link to="/enquiry-form" className="nav-link text-white" onClick={handleLinkClick}>
              ➕ New Enquiry
            </Link>
          </li>
          <li>
            <Link to="/daily-update" className="nav-link text-white" onClick={handleLinkClick}>
              🛠️ Daily Update
            </Link>
          </li>
           {/* 🔹 New Fortnightly Module Links */}
      <li>
        <Link
          to="/sales/production-entry"
          className="nav-link text-white"
          onClick={handleLinkClick}
        >
          🗂️ Production Data Entry
        </Link>
      </li>
      <li>
        <Link
          to="/sales/production-dashboard"
          className="nav-link text-white"
          onClick={handleLinkClick}
        >
          📈 Production Dashboard
        </Link>
      </li>
        </ul>
      )}
    </li>

    {/* Production Menu */}
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
          <li>
            <Link to="/production" className="nav-link text-white" onClick={handleLinkClick}>
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/monthly-planning" className="nav-link text-white" onClick={handleLinkClick}>
              📅 Monthly Planning
            </Link>
          </li>
          <li>
            <Link to="/daily-production" className="nav-link text-white" onClick={handleLinkClick}>
              🛠️ Daily Production Update
            </Link>
          </li>
          <li>
            <Link to="/manage-wagon-types" className="nav-link text-white" onClick={handleLinkClick}>
              ⚙️ Manage Wagon Types
            </Link>
          </li>
          {/*<li>
            <Link to="/planning" className="nav-link text-white" onClick={handleLinkClick}>
              📝 Setup Planning
            </Link>
          </li>
          <li>
            <Link to="/gantt" className="nav-link text-white" onClick={handleLinkClick}>
              📊 Gantt View
            </Link>
          </li>*/}
        </ul>
      )}
    </li>

    {/* ✅ Quality Menu (Independent) */}
    <li className="nav-item mt-3">
      <span
        onClick={() => setQualityOpen(!qualityOpen)}
        className="nav-link text-white fw-bold"
        style={{ cursor: 'pointer' }}
      >
        🧾 Quality {qualityOpen ? '▲' : '▼'}
      </span>
      {qualityOpen && (
        <ul className="nav flex-column ms-3">
          <li>
  <Link
    to="/bogie-inspection-report"
    className="nav-link text-white"
    onClick={handleLinkClick}
  >
    🧾 Bogie Inspection Report
  </Link>
</li>
<li>
  <Link
    to="/bogie-inspection-form"
    className="nav-link text-white"
    onClick={handleLinkClick}
  >
    🧰 Bogie Inspection Form
  </Link>
</li>
<li>
  <Link
    to="/bogie-after-wheel-inspection"
    className="nav-link text-white"
    onClick={handleLinkClick}
  >
    ⚙️ After-Wheeling Inspection
  </Link>
</li>

<li>
  <Link
    to="/quality-dashboard"
    className="nav-link text-white"
    onClick={handleLinkClick}
  >
    📊 Quality Dashboard
  </Link>
</li>

        </ul>
      )}
    </li>
  </ul>
</div>
    

      {/* Main content */}
      <div className="main-content">{children}</div>
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/enquiry-form" element={<EnquiryForm />} />
          <Route path="/" element={<EnquiryListScreen />} />
          <Route path="/enquiry/:id" element={<EnquiryUpdateForm />} />
          <Route path="/daily-update" element={<DailyUpdateForm />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/delivery-details/:projectId" element={<ProjectDetailsScreen />} />
          <Route path="/production" element={<ProductionHomeScreen />} />
          <Route path="/production/:projectId" element={<ProductionDetailsScreen />} />
          <Route path="/monthly-planning" element={<MonthlyPlanningForm />} />
          <Route path="/manage-wagon-types" element={<ManageWagonTypesScreen />} />
          <Route path="/daily-production" element={<DailyProductionForm />} />
          {/*<Route path="/planning/:projectId" element={<PlanningForm />} />*/}
          <Route path="/quality-dashboard" element={<QualityDashboard />} />
<Route path="/bogie-inspection-form" element={<BogieInspectionForm />} />
<Route path="/bogie-inspection-report" element={<BogieInspectionReport />} />
<Route path="/bogie-after-wheel-inspection" element={<BogiePostWheelInspectionForm />} />
<Route path="/sales/production-entry" element={<SalesProdEntryForm />} />
<Route path="/sales/production-dashboard" element={<SalesProdDashboard />} />

{/*<Route path="/gantt/:projectId" element={<ProjectGantt />} />
<Route path="/planning" element={<PlanningDashboard />} />
<Route path="/gantt" element={<PlanningDashboard defaultTab="gantt" />} />


          {/*<Route path="/sales-kpi" element={<SalesKPIScreen />} />
           <Route path="/" element={<DashboardHome />} />*/}
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
