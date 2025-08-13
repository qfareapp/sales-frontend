import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EnquiryListScreen = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stageFilter, setStageFilter] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('');
  const [totalVU, setTotalVU] = useState(0); // 🚆 Pending wagons
  const [deliveredVU, setDeliveredVU] = useState(0); // 🚚 Delivered wagons
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredSales, setFilteredSales] = useState(0);
  const [filteredVUs, setFilteredVUs] = useState(0);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch enquiries, daily updates, and confirmed orders
      const [enquiryRes, updatesRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/enquiries'),
        axios.get('http://localhost:5000/api/daily-updates'),
        axios.get('http://localhost:5000/api/enquiries/orders')
      ]);

      const enquiriesData = enquiryRes.data;
      const updatesData = updatesRes.data;
      const ordersData = ordersRes.data.orders || [];

      // Step 1: Create maps for delivered wagons and date-wise delivery
      const deliveredMap = {};
      const dateWiseMap = {};

      updatesData.forEach(({ projectId, date, wagonSold }) => {
        // Total delivered per project
        if (!deliveredMap[projectId]) deliveredMap[projectId] = 0;
        deliveredMap[projectId] += wagonSold || 0;

        // Date-wise delivery per project
        if (!dateWiseMap[projectId]) dateWiseMap[projectId] = [];
        dateWiseMap[projectId].push({ date, wagonSold });
      });

      // Step 2: Enrich all enquiries with delivery progress
      const enrichedEnquiries = enquiriesData.map(enquiry => ({
        ...enquiry,
        wagonsSoldTillDate: deliveredMap[enquiry.projectId] || 0,
        dateWiseDelivery: dateWiseMap[enquiry.projectId] || []
      }));

      // Step 2B: Enrich confirmed orders with KPI fields
      const enrichedOrders = ordersData.map(order => {
        const totalWagons = (order.noOfRakes || 0) * (order.wagonsPerRake || 0);
        const sold = deliveredMap[order.projectId] || 0;
        const price = parseFloat(order.pricePerWagon) || 0;
        const currentOrderInHand = (totalWagons - sold) * price;

        return {
          ...order,
          wagonsSoldTillDate: sold,
          totalWagons,
          currentOrderInHand: currentOrderInHand.toFixed(2)
        };
      });

      // Step 3: Update state
      setEnquiries(enrichedEnquiries);
      setOrders(enrichedOrders);
      setTotalVU(ordersRes.data.remainingVU || 0);
      setDeliveredVU(ordersRes.data.totalDeliveredVU || 0);

      // Debug Logs
      console.log("✅ Enquiries with Delivery Progress:", enrichedEnquiries);
      console.log("✅ Confirmed Orders (Enriched):", enrichedOrders);
      console.log("🚆 Remaining VU:", ordersRes.data.remainingVU);
      console.log("🚚 Delivered VU:", ordersRes.data.totalDeliveredVU);
    } catch (err) {
      console.error('❌ Error fetching KPI data:', err);
    }
  };

  fetchData();
}, []);

// ✅ Total Order in Hand based on enriched enquiries
const totalOrderInHand = enquiries
  .filter(e => e.stage === 'Confirmed')
  .reduce((sum, e) => sum + (parseFloat(e.currentOrderInHand) || 0), 0);

// ✅ Handle stage change and update local state
const handleStageChange = async (id, newStage) => {
  try {
    await axios.patch(`http://localhost:5000/api/enquiries/${id}`, { stage: newStage });
    setEnquiries(prev =>
      prev.map(enquiry =>
        enquiry._id === id ? { ...enquiry, stage: newStage } : enquiry
      )
    );
  } catch (err) {
    console.error('Failed to update stage:', err);
    alert('❌ Could not update stage.');
  }
};

  // ✅ KPI CALCULATIONS
  const total = enquiries.length;
  const pvt = enquiries.filter(e => e.clientType === 'Private').length;
  const rail = enquiries.filter(e => e.clientType === 'Indian Railways').length;
  const exportCnt = enquiries.filter(e => e.clientType === 'Export').length;
  const totalEnquiryValue = enquiries
  .filter(e => e.stage === 'Enquiry')
  .reduce((sum, e) => sum + (e.estimatedAmount || 0), 0);
  const totalConfirmedValue = enquiries
    .filter(e => e.stage === 'Confirmed')
    .reduce((sum, e) => sum + (e.quotedPrice || 0), 0);
  const totalLostValue = enquiries
    .filter(e => e.stage === 'Lost')
    .reduce((sum, e) => sum + (e.quotedPrice || 0), 0);
  const confirmed = enquiries.filter(e => e.stage === 'Confirmed').length;
  const enquiryStage = enquiries.filter(e => e.stage === 'Enquiry').length;
  const enquiryVsConfirmedPercent = total ? ((confirmed / total) * 100).toFixed(1) : 0;

  // ✅ Filtered data
  const filtered = enquiries.filter(enquiry => {
    return (
      (stageFilter === '' || enquiry.stage === stageFilter) &&
      (clientTypeFilter === '' || enquiry.clientType === clientTypeFilter)
    );
  });
const getProgress = (enquiry) => {
  
  const totalWagonsOrdered = (enquiry.noOfRakes || 0) * (enquiry.wagonsPerRake || 0);
  const wagonsDelivered = enquiry.wagonsSoldTillDate || 0;

  const percent = totalWagonsOrdered > 0
    ? (wagonsDelivered / totalWagonsOrdered) * 100
    : 0;

  return percent.toFixed(1);
};

// 💰 Total Sales Filter logic (effect hook to compute on date change)
useEffect(() => {
  const fetchFilteredSales = async () => {
    if (!fromDate || !toDate) return;

    try {
      const res = await axios.get('http://localhost:5000/api/daily-updates');

      const filtered = res.data.filter(update => {
        const updateDate = new Date(update.date);
        const start = new Date(fromDate); start.setHours(0, 0, 0, 0);
        const end = new Date(toDate); end.setHours(23, 59, 59, 999);
        updateDate.setHours(0, 0, 0, 0);

        return updateDate >= start && updateDate <= end;
      });

      const totalSales = filtered.reduce((sum, item) => {
        const enquiry = enquiries.find(e => String(e.projectId) === String(item.projectId));

        if (!enquiry || enquiry.stage !== 'Confirmed') return sum;

        // ✅ Get price from enquiry object, NOT item
        const pricePerWagon = enquiry.pricePerWagon || 0;

        return sum + (item.wagonSold * pricePerWagon);
      }, 0);

      const totalVUs = filtered.reduce((sum, item) => {
        const enquiry = enquiries.find(e => String(e.projectId) === String(item.projectId));
        return enquiry?.stage === 'Confirmed' ? sum + item.wagonSold : sum;
      }, 0);

      setFilteredSales(totalSales);
      setFilteredVUs(totalVUs);

      console.log("✅ Filtered sales data (confirmed only):", { totalSales, totalVUs });
    } catch (err) {
      console.error('Error fetching filtered sales:', err);
    }
  };

  fetchFilteredSales();
}, [fromDate, toDate, enquiries]);


// ✅ Excel export stays clean, no hooks inside
const exportToExcel = () => {
  if (enquiries.length === 0) {
    alert("No enquiries to export.");
    return;
  }
  const worksheetData = enquiries.map(e => ({
    "Order ID": e.orderId,
    "Project ID": e.projectId,
    "Client Name": e.clientName,
    "Client Type": e.clientType,
    "Stage": e.stage,
    "Quoted Price": e.quotedPrice || 0,
    "Estimated Amount": e.estimatedAmount || 0,
    "Product": e.product,
    "Wagon Type": e.wagonType,
    "Owner": e.owner,
    "No of Rakes": e.noOfRakes,
    "Wagons per Rake": e.wagonsPerRake,
    "Enquiry Date": e.enquiryDate ? new Date(e.enquiryDate).toLocaleDateString() : '',
    "Wagons Delivered": e.wagonsSoldTillDate || 0,
    "Current Order Value": (() => {
      const totalWagons = (e.noOfRakes || 0) * (e.wagonsPerRake || 0);
      const delivered = e.wagonsSoldTillDate || 0;
      const pricePerWagon = totalWagons > 0 ? (e.quotedPrice || 0) / totalWagons : 0;
      const pendingValue = (totalWagons - delivered) * pricePerWagon;
      return Math.round(pendingValue);
    })(),
    "Progress %": getProgress(e)
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(fileData, "Enquiry_List.xlsx");
};
const exportFilteredSalesToExcel = () => {
  if (!fromDate || !toDate || filteredVUs === 0) {
    alert("Please select a date range with confirmed sales.");
    return;
  }

  const start = new Date(fromDate); start.setHours(0, 0, 0, 0);
  const end = new Date(toDate); end.setHours(23, 59, 59, 999);

  // Filter the confirmed deliveries within date range
  const filtered = enquiries.flatMap(enquiry => {
    if (enquiry.stage !== 'Confirmed') return [];

    return enquiry.dateWiseDelivery
      ?.filter(entry => {
        const d = new Date(entry.date);
        d.setHours(0, 0, 0, 0);
        return d >= start && d <= end;
      })
      .map(entry => {
      const confirmedEnquiry = enquiries.find(e => e.projectId === enquiry.projectId && e.stage === 'Confirmed');
      const price = confirmedEnquiry?.pricePerWagon || 0;
      const sold = entry.wagonSold || 0;

      return {
        "Date": new Date(entry.date).toLocaleDateString(),
        "Project ID": enquiry.projectId,
        "Wagon Type": enquiry.wagonType || 'N/A',
        "Wagons Sold": sold,
        "Price per Wagon": price,
        "Total Sales Value": sold * price
      };
    }) || [];
  });

  if (filteredVUs === 0 || !filtered || filtered.length === 0) {
  alert("No confirmed delivery records found for this date range.");
  return;
}

  const worksheet = XLSX.utils.json_to_sheet(filtered);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Sales Details");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(
    fileData,
    `Filtered_Sales_Details_${fromDate.toISOString().split('T')[0]}_to_${toDate.toISOString().split('T')[0]}.xlsx`
  );
};
// ✅ Updated Aggregation logic based on enriched confirmed orders
const totalOrder = orders.reduce((sum, o) => sum + (parseFloat(o.currentOrderInHand) || 0), 0);
const totalVUs = orders.reduce((sum, o) => sum + (o.pending || 0), 0);

const twrlOrders = orders.filter(o => (o.owner || '').toUpperCase() === 'TWRL');
const twrlOrder = twrlOrders.reduce((sum, o) => sum + (parseFloat(o.currentOrderInHand) || 0), 0);
const twrlVUs = twrlOrders.reduce((sum, o) => sum + (o.pending || 0), 0);

const trelOrders = orders.filter(o => (o.owner || '').toUpperCase() === 'TREL');
const trelOrder = trelOrders.reduce((sum, o) => sum + (parseFloat(o.currentOrderInHand) || 0), 0);
const trelVUs = trelOrders.reduce((sum, o) => sum + (o.pending || 0), 0);


  return (
    <div style={{ padding: 20 }}>
      {/* 🏭 Production Button */}
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <button
    onClick={() => navigate('/production')}
    style={{
      backgroundColor: '#6f42c1',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }}
  >
    🏭 Go to Production Dashboard
  </button>
</div>
<Link to="/sales-kpi">
  <button style={{ margin: '10px', padding: '10px' }}>View Sales KPIs</button>
</Link>
      <h2>All Enquiries</h2>

      <div style={{
  marginBottom: 30,
  padding: '25px',
  background: '#fdfdfd',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'
}}>
  <h3 style={{ marginBottom: '20px', color: '#333', fontWeight: '600' }}>📊 KPI Dashboard</h3>

  <p style={{ fontSize: '1rem', marginBottom: '15px', color: '#444' }}>
    <strong style={{ color: '#007bff' }}>Private:</strong> {((pvt / total) * 100).toFixed(1)}% &nbsp;|&nbsp;
    <strong style={{ color: '#28a745' }}>Indian Railways:</strong> {((rail / total) * 100).toFixed(1)}% &nbsp;|&nbsp;
    <strong style={{ color: '#ff8800' }}>Export:</strong> {((exportCnt / total) * 100).toFixed(1)}%
  </p>

  <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
    <div>📩 <strong>Total Enquiry Value:</strong> ₹{totalEnquiryValue.toLocaleString()}</div>
    <div>✅ <strong>Total Confirmed Value:</strong> ₹{totalConfirmedValue.toLocaleString()}</div>
    <div>❌ <strong>Total Lost Value:</strong> ₹{totalLostValue.toLocaleString()}</div>
    <div>📈 <strong>Enquiry vs Confirmed:</strong> {enquiryVsConfirmedPercent}%</div>
  </div>

  <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

  <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px', marginTop: '15px' }}>
   {/* ✅ Total Confirmed Order & VUs */}
      <div style={{ fontSize: '16px', paddingLeft: '16px', marginBottom: '10px' }}>
        📦 <strong>Total Order in Hand:</strong> ₹{totalOrder.toLocaleString()} &nbsp;&nbsp;
        🚆 <strong>VUs:</strong> {totalVUs}
      </div>

  <div style={{ fontSize: '15px', paddingLeft: '32px', marginTop: '8px' }}>
  {/* 🔽 TWRL Breakdown */}
      <div style={{ fontSize: '15px', paddingLeft: '24px', marginBottom: '6px' }}>
        🏷️ <strong>TWRL Order:</strong> ₹{twrlOrder.toLocaleString()} 🚆 <strong>VUs:</strong> {twrlVUs}
      </div>
  {/* 🔽 TREL Breakdown */}
      <div style={{ fontSize: '15px', paddingLeft: '24px' }}>
        🏷️ <strong>TREL Order:</strong> ₹{trelOrder.toLocaleString()} 🚆 <strong>VUs:</strong> {trelVUs}
      </div>
</div>
</div>
  
{/* 🗓️ Total Sales Filter Section */}
      <div style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h4 style={{ color: '#444', marginBottom: '10px' }}>🗓️ Total Sales Filter</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <label><strong>From:</strong></label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Start Date"
          />
          <label><strong>To:</strong></label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="End Date"
          />
        </div>
        <div style={{ marginTop: '12px', fontSize: '1rem', color: '#333' }}>
          <p>💰 <strong>Total Sales Value:</strong> ₹{filteredSales.toLocaleString()}</p>
          <p>📦 <strong>Total VUs Sold:</strong> {filteredVUs}</p>
          <button
  onClick={exportFilteredSalesToExcel}
  style={{
    marginTop: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  📥 Export to Excel
</button>
        </div>
    </div>
</div>
{/* ✅ Export Button */}
<div style={{ marginBottom: '20px', textAlign: 'right' }}>
  <button
    onClick={exportToExcel}
    style={{
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '10px 16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
  >
    📥 Export Enquiries to Excel
  </button>
</div>
      {/* ✅ Filter UI */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div>
          <label>Filter by Stage: </label>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Enquiry">Enquiry</option>
            <option value="Quoted">Quoted</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        
        <div>
          <label>Filter by Client Type: </label>
          <select value={clientTypeFilter} onChange={(e) => setClientTypeFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Indian Railways">Indian Railways</option>
            <option value="Private">Private</option>
            <option value="Export">Export</option>
          </select>
        </div>
      </div>

      {/* ✅ Table */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Project ID</th>
      <th>Client Name</th>
      <th>Client Type</th>
      <th>Stage</th>
      <th>Quoted Price</th>
      <th>Estimated Amount</th>
      <th>Product</th>
      <th>Wagon Type</th>
      <th>Owner</th>
      <th>No of Rakes</th>
      <th>Wagons per Rake</th>
      <th>Date</th>
      <th><strong>📦 Current Order in Hand</strong></th>
      <th>GST Amount</th>
      <th>Delivered</th>
      <th>Progress</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filtered.map((enquiry) => (
      <tr key={enquiry._id}>
        <td>
  <Link to={`/project/${enquiry._id}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
    {enquiry.orderId}
  </Link>
</td>
{/* 👇 New Project ID column */}
      <td>
        <Link to={`/delivery-details/${enquiry.projectId}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          {enquiry.projectId || 'N/A'}
        </Link>
      </td>
    
        <td>{enquiry.clientName}</td>
        <td>{enquiry.clientType || 'N/A'}</td>
        <td>{enquiry.stage}</td>
        <td>
          {typeof enquiry.quotedPrice === 'number' && enquiry.quotedPrice > 0
            ? `₹${enquiry.quotedPrice.toLocaleString()}`
            : 'N/A'}
        </td>
        <td>
          {typeof enquiry.estimatedAmount === 'number' && enquiry.estimatedAmount > 0
            ? `₹${enquiry.estimatedAmount.toLocaleString()}`
            : 'N/A'}
        </td>
        <td>{enquiry.product}</td>
        <td>{enquiry.wagonType || 'N/A'}</td>
        <td>{enquiry.owner}</td>
        <td>{enquiry.noOfRakes}</td>
        <td>{enquiry.wagonsPerRake}</td>
        <td>
          {enquiry.enquiryDate
            ? new Date(enquiry.enquiryDate).toLocaleDateString()
            : 'N/A'}
        </td>
        <td>
  {(() => {
    const totalWagons = (enquiry.noOfRakes || 0) * (enquiry.wagonsPerRake || 0);
    const delivered = enquiry.wagonsSoldTillDate || 0;
    const pricePerWagon = totalWagons > 0 ? (enquiry.quotedPrice || 0) / totalWagons : 0;
    const pendingValue = (totalWagons - delivered) * pricePerWagon;

    return enquiry.stage === 'Confirmed'
      ? `₹${Math.round(pendingValue).toLocaleString()}`
      : 'N/A';
  })()}
</td>
<td>{enquiry.stage === 'Confirmed' ? `₹${(enquiry.gstAmount || 0).toLocaleString()}` : '-'}</td>
        <td>{enquiry.wagonsSoldTillDate || 0}</td>
        <td>
  <div style={{ width: '100%', background: '#eee', borderRadius: 4 }}>
    <div
      style={{
        width: `${getProgress(enquiry)}%`,
        background: '#4caf50',
        padding: '4px 0',
        borderRadius: 4,
        textAlign: 'center',
        color: 'white',
        fontSize: '0.75rem'
      }}
    >
      {getProgress(enquiry)}%
    </div>
  </div>
</td>
        <td>
          <button
            onClick={() => navigate(`/enquiry/${enquiry._id}`)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default EnquiryListScreen;
