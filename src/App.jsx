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
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ for hamburger menu

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
          <li className="nav-item">
            <Link to="/" className="nav-link text-white" onClick={handleLinkClick}>➕ Home</Link>
          </li>

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
                <li><Link to="/enquiry-form" className="nav-link text-white" onClick={handleLinkClick}>➕ New Enquiry</Link></li>
                <li><Link to="/enquiries" className="nav-link text-white" onClick={handleLinkClick}>📋 View Enquiries</Link></li>
                <li><Link to="/daily-update" className="nav-link text-white" onClick={handleLinkClick}>🛠️ Daily Update</Link></li>
                <li><Link to="/sales-kpi" className="nav-link text-white" onClick={handleLinkClick}>📈 Sales KPI</Link></li>
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
                <li><Link to="/production" className="nav-link text-white" onClick={handleLinkClick}>📊 Dashboard</Link></li>
                <li><Link to="/monthly-planning" className="nav-link text-white" onClick={handleLinkClick}>📅 Monthly Planning</Link></li>
                <li><Link to="/daily-production" className="nav-link text-white" onClick={handleLinkClick}>🛠️ Daily Production Update</Link></li>
                <li><Link to="/manage-wagon-types" className="nav-link text-white" onClick={handleLinkClick}>⚙️ Manage Wagon Types</Link></li>
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
          <Route path="/enquiries" element={<EnquiryListScreen />} />
          <Route path="/enquiry/:id" element={<EnquiryUpdateForm />} />
          <Route path="/daily-update" element={<DailyUpdateForm />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/delivery-details/:projectId" element={<ProjectDetailsScreen />} />
          <Route path="/production" element={<ProductionHomeScreen />} />
          <Route path="/production/:projectId" element={<ProductionDetailsScreen />} />
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
