import React, { useEffect, useRef, useState } from "react";
import api from "../../api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogContent,
  Link,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function BogieInspectionReport() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔗 PDF capture root
  const pdfRef = useRef(null);

  useEffect(() => {
    fetchData(); // initial load
  }, []);

  /* -----------------------------------------------------------
     ✅ Fetch Data (with optional filter)
  ----------------------------------------------------------- */
  const fetchData = async (filter = false) => {
    try {
      let url = "/bogie-inspections";
      if (filter && fromDate && toDate) {
        url += `?from=${fromDate}&to=${toDate}`;
      }
      const res = await api.get(url);
      const sorted = (res.data.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // latest first
      );
      setData(sorted);
    } catch (err) {
      console.error("❌ Error loading report:", err);
    }
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    fetchData(false);
  };

  /* -----------------------------------------------------------
     ✅ Helpers
  ----------------------------------------------------------- */
  const formatDateTime = (ts) => {
    if (!ts) return "-";
    const d = new Date(ts);
    return `${d.toLocaleDateString("en-GB")} | ${d.toLocaleTimeString("en-GB")}`;
  };

  const getImageUrl = (filename) =>
    filename
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/bogie-inspections/${filename}`
      : null;

  const renderCheck = (obj) => {
    if (!obj) return "Pending";
    const val = obj.check;
    if (val === 1) return "OK";
    if (val === -1) return "NOT OK";
    return "Pending";
  };

  // 🖼️ Photo cell (thumbnail + click to enlarge)
  const PhotoThumb = ({ file }) => {
    const src = getImageUrl(file);
    if (!src) return <em>-</em>;
    return (
      <img
        src={src}
        alt="photo"
        crossOrigin="anonymous"
        style={{
          width: 64,
          height: 44,
          objectFit: "cover",
          borderRadius: 4,
          border: "1px solid #ddd",
          cursor: "pointer",
          display: "block",
        }}
        onClick={() => setSelectedImage(src)}
      />
    );
  };

  // ✅ Excel export (unchanged)
  const handleExportExcel = () => {
    if (!data.length) {
      alert("No data to export!");
      return;
    }
    const excelData = data.map((row, i) => ({
      SL: i + 1,
      "Date & Time": formatDateTime(row.createdAt),
      "Type of Wagon": row.wagonType,
      "Bogie No": row.bogieNo,
      "Bogie Make": row.bogieMake,
      "Bogie Type": row.bogieType,
      "Wheel Base": renderCheck(row.wheelBase),
      "Bogie Diagonal": renderCheck(row.bogieDiagonal),
      "Journal Centre": renderCheck(row.bogieJournalCentre),
      "Side Frame Jaw": renderCheck(row.sideFrameJaw),
      "Brake Beam Pocket": row.brakeBeamPocket?.value || "-",
      "Side Bearer Centre": row.sideBearerCentre?.value || "-",
      "Push Rod": renderCheck(row.pushRodCheck),
      "End Pull Rod": renderCheck(row.endPullRodCheck),
      "Brake Shoe Type": row.brakeShoeType,
      "Brake Shoe": renderCheck(row.brakeShoeCheck),
      "Spring Visual": renderCheck(row.springVisualCheck),
      "Adopter Type": row.adopterType,
      Remarks: row.remarks || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bogie Inspections");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const filename = `Bogie_Inspection_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;
    saveAs(new Blob([buf], { type: "application/octet-stream" }), filename);
  };

  /* -----------------------------------------------------------
     ✅ PDF export (A4 Landscape, exact styles + images)
  ----------------------------------------------------------- */
  const handleExportPDF = async () => {
  const root = pdfRef.current;
  if (!root) return;

  root.classList.add("pdf-capture");

  // ✅ Force full width for capture
  const originalWidth = root.style.width;
  root.style.width = "2100px"; // ensures full-width canvas for landscape PDF

  const canvas = await html2canvas(root, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    scrollY: -window.scrollY,
    windowWidth: root.scrollWidth,
    windowHeight: root.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();   // 297 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 210 mm

  // Fit image perfectly within page without cropping
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  const scale = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;
  const finalWidth = imgWidth * scale;
  const finalHeight = imgHeight * scale;

  // ✅ Remove empty side margins
  const xOffset = 0;
  const yOffset = (pdfHeight - finalHeight) / 2;

  pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);

  root.classList.remove("pdf-capture");
  root.style.width = originalWidth;

  pdf.save(
    `Bogie_Inspection_Report_Agarpara_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`
  );
};

  /* -----------------------------------------------------------
     ✅ Render
  ----------------------------------------------------------- */
  return (
    <Box p={3} sx={{ background: "#eef2ff", minHeight: "100vh" }}>
      {/* Controls */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="From Date"
              type="date"
              fullWidth
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="To Date"
              type="date"
              fullWidth
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" gap={1}>
            <Button variant="contained" onClick={() => fetchData(true)} sx={{ flex: 1 }}>
              Filter
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear} sx={{ flex: 1 }}>
              Clear Filter
            </Button>
            <Button variant="contained" color="success" onClick={handleExportExcel} sx={{ flex: 1 }}>
              Export to Excel
            </Button>
            <Button variant="contained" color="warning" onClick={handleExportPDF} sx={{ flex: 1 }}>
              Export to PDF (A4 - Landscape)
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ====== PDF CAPTURE AREA (exact styling) ====== */}
      <Box ref={pdfRef} id="pdf-root">
        {/* Top banner with logo + title (keep colors) */}
        <Paper sx={{ p: 2, borderRadius: 0, boxShadow: "none", mb: 0 }}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              {/* (Optional) Logo slot on the left — keep height consistent */}
              <Box sx={{ height: 28, display: "flex", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={800}>
                  SGS
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="body2" fontWeight={600}>
                Date: {new Date().toLocaleDateString("en-GB")}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 1.5,
              background: "#e7ff80", // light green band like your template
              border: "1px solid #c7e45e",
              px: 2,
              py: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 0.3 }}>
              BOGIE INSPECTION REPORT
            </Typography>
            <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
              Format No.: SGS/BOGIE/01 | Rev. 01 | Effective Date: 02-10-2025
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#e7ff80",
              border: "1px solid #c7e45e",
              borderTop: "none",
              textAlign: "center",
              py: 0.6,
              mb: 1.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              AGARPARA WORKS
            </Typography>
          </Box>
        </Paper>

        {/* Data Table */}
        <Paper sx={{ p: 0, overflow: "auto", borderRadius: 0 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow sx={{ "& th": { background: "#f5f7ff", fontWeight: 700 } }}>
                <TableCell>SL. NO.</TableCell>
                <TableCell>DATE &amp; TIME</TableCell>
                <TableCell>TYPE OF WAGON</TableCell>
                <TableCell>BOGIE NO.</TableCell>
                <TableCell>BOGIE MAKE</TableCell>
                <TableCell>BOGIE TYPE</TableCell>

                {/* Wheel base */}
                <TableCell align="center">WHEEL BASE<br /><small>CHECK</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                {/* Diagonal */}
                <TableCell align="center">BOGIE DIAGONAL<br /><small>CHECK</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                {/* Journal centre */}
                <TableCell align="center">BOGIE JOURNAL CENTRE<br /><small>CHECK</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                {/* Side frame jaw */}
                <TableCell align="center">SIDE FRAME JAW<br /><small>CHECK</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                {/* Brake beam pocket */}
                <TableCell align="center">BRAKE BEAM POCKET<br /><small>LATERAL DISTANCE</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                {/* Side bearer centre */}
                <TableCell align="center">SIDE BEARER CENTRE DISTANCE<br /><small>(1474 ± 5 MM)</small></TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                <TableCell align="center">PUSH ROD CHECK</TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>
                <TableCell align="center">END PULL ROD CHECK</TableCell>
                <TableCell align="center"><small>PHOTO</small></TableCell>

                <TableCell align="center">BRAKE SHOE<br /><small>TYPE</small></TableCell>
                <TableCell align="center">BRAKE SHOE CHECK</TableCell>
                <TableCell align="center">SPRING VISUAL CHECK</TableCell>
                <TableCell align="center">TYPE OF ADOPTER</TableCell>
                <TableCell align="center">REMARKS</TableCell>
                <TableCell align="center">INSPECTOR&apos;S SIGNATURE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={row._id}>
                  <TableCell>{String(idx + 1).padStart(2, "0")}.</TableCell>
                  <TableCell>{formatDateTime(row.createdAt)}</TableCell>
                  <TableCell>{row.wagonType}</TableCell>
                  <TableCell>{row.bogieNo}</TableCell>
                  <TableCell>{row.bogieMake}</TableCell>
                  <TableCell>{row.bogieType}</TableCell>

                  {/* Wheel base */}
                  <TableCell align="center">{renderCheck(row.wheelBase)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.wheelBase?.photo} /></TableCell>

                  {/* Diagonal */}
                  <TableCell align="center">{renderCheck(row.bogieDiagonal)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.bogieDiagonal?.photo} /></TableCell>

                  {/* Journal centre */}
                  <TableCell align="center">{renderCheck(row.bogieJournalCentre)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.bogieJournalCentre?.photo} /></TableCell>

                  {/* Side frame jaw */}
                  <TableCell align="center">{renderCheck(row.sideFrameJaw)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.sideFrameJaw?.photo} /></TableCell>

                  {/* Brake beam pocket */}
                  <TableCell align="center">{row.brakeBeamPocket?.value || "-"}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.brakeBeamPocket?.photo} /></TableCell>

                  {/* Side bearer centre */}
                  <TableCell align="center">{row.sideBearerCentre?.value || "-"}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.sideBearerCentre?.photo} /></TableCell>

                  {/* Push rod / End pull rod */}
                  <TableCell align="center">{renderCheck(row.pushRodCheck)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.pushRodCheck?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.endPullRodCheck)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.endPullRodCheck?.photo} /></TableCell>

                  <TableCell align="center">{row.brakeShoeType || "-"}</TableCell>
                  <TableCell align="center">{renderCheck(row.brakeShoeCheck)}</TableCell>
                  <TableCell align="center">{renderCheck(row.springVisualCheck)}</TableCell>
                  <TableCell align="center">{row.adopterType || "-"}</TableCell>
                  <TableCell align="center">{row.remarks || "-"}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* 🖼️ Image Viewer */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent sx={{ textAlign: "center", background: "#000" }}>
          {selectedImage && (
            <Box>
              <img
                src={selectedImage}
                alt="Inspection"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  borderRadius: 6,
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Print/PDF-only CSS */}
      <style>{`
        /* Hide the top control bar when capturing/printing */
        .pdf-capture ~ .MuiPaper-root { display: none; }

        /* Ensure table header sticks visually in capture */
        #pdf-root th {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>
      <style>{`
  /* 🧭 Only during PDF capture */
  .pdf-capture table {
    border-collapse: collapse;
    width: 100% !important;
    table-layout: fixed !important;
  }

  .pdf-capture th,
  .pdf-capture td {
    text-align: center !important;
    vertical-align: middle !important;
    font-size: 10px !important;
    padding: 6px 2px !important;
    border: 0.3px solid #999;
    word-wrap: break-word;
  }

  /* Merge image with text below */
  .pdf-capture td img {
    display: block !important;
    margin: 3px auto 0 !important;
    width: 55px !important;
    height: 40px !important;
    object-fit: cover !important;
    border-radius: 3px;
  }

  /* Larger row height for visibility */
  .pdf-capture tr {
    height: 100px !important;
    page-break-inside: avoid !important;
  }

  /* Landscape full width */
  @media print {
    @page {
      size: A4 landscape;
      margin: 6mm;
    }
  }

  /* Ensure white background */
  .pdf-capture {
    background: #ffffff !important;
  }
`}</style>

    </Box>
  );
}
