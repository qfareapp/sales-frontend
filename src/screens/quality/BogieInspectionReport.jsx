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
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Button,
  Chip,
  Divider,
} from "@mui/material";

/* -----------------------------------------------------------
   ✅ Bogie Inspection Report Dashboard
----------------------------------------------------------- */
export default function BogieInspectionReport() {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const pdfRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  /* -----------------------------------------------------------
     ✅ Fetch Data
  ----------------------------------------------------------- */
  const fetchData = async (filter = false) => {
    try {
      let url = "/bogie-inspections";
      if (filter && fromDate && toDate) url += `?from=${fromDate}&to=${toDate}`;
      const res = await api.get(url);
      const sorted = (res.data.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
    return `${d.toLocaleDateString("en-GB")} | ${d
      .toLocaleTimeString("en-GB")
      .replace(/:\d+ /, " ")}`;
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

  const renderCheckChip = (obj) => {
    if (!obj) return <Chip label="Pending" color="warning" size="small" />;
    const val = obj.check;
    if (val === 1) return <Chip label="OK" color="success" size="small" />;
    if (val === -1) return <Chip label="NOT OK" color="error" size="small" />;
    return <Chip label="Pending" color="warning" size="small" />;
  };

  const renderVisualList = (visual = {}) => {
    if (!visual) return "-";
    const selected = Object.keys(visual).filter((k) => visual[k]);
    if (!selected.length) return "-";
    return selected.map((v) => (
      <Chip
        key={v}
        label={v.toUpperCase()}
        size="small"
        sx={{ mr: 0.5, mb: 0.5, background: "#ffe6e6" }}
      />
    ));
  };

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

  /* -----------------------------------------------------------
     ✅ Excel Export
  ----------------------------------------------------------- */
  const handleExportExcel = () => {
    if (!data.length) return alert("No data to export!");
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
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      `Bogie_Report_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  /* -----------------------------------------------------------
     ✅ PDF Export
  ----------------------------------------------------------- */
  /* -----------------------------------------------------------
   ✅ PDF Export (Fit all columns & rows on single A4 landscape)
----------------------------------------------------------- */
const handleExportPDF = async () => {
  const root = pdfRef.current;
  if (!root) return;

  // Temporarily style for capture
  root.classList.add("pdf-capture");

  // Save original width
  const originalWidth = root.style.width;

  // Expand width for full table rendering
  root.style.width = "2100px"; // make canvas wide enough for all columns

  // Capture with high resolution
  const canvas = await html2canvas(root, {
    scale: 2,              // ensures crisp text
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    scrollY: -window.scrollY,
    windowWidth: root.scrollWidth,
    windowHeight: root.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  // Create landscape PDF
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Fit the full image into one page width
  const pdfWidth = pdf.internal.pageSize.getWidth();   // 297 mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 210 mm

  // Calculate image aspect ratio to scale properly
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  // Scale to fit height if taller
  const scale = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;
  const finalWidth = imgWidth * scale;
  const finalHeight = imgHeight * scale;

  // Center vertically
  const xOffset = 0;
  const yOffset = (pdfHeight - finalHeight) / 2;

  // Add image to PDF
  pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);

  // Reset styles
  root.style.width = originalWidth;
  root.classList.remove("pdf-capture");

  // Save file
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
              Clear
            </Button>
            <Button variant="contained" color="success" onClick={handleExportExcel} sx={{ flex: 1 }}>
              Excel
            </Button>
            <Button variant="contained" color="warning" onClick={handleExportPDF} sx={{ flex: 1 }}>
              PDF
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ====== Dashboard Table (with Images) ====== */}
      <Box ref={pdfRef}>
        <Paper sx={{ p: 0, overflow: "auto", borderRadius: 0 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow sx={{ "& th": { background: "#f5f7ff", fontWeight: 700 } }}>
                <TableCell>SL</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Bogie No.</TableCell>
                <TableCell>Make</TableCell>
                <TableCell>Bogie Type</TableCell>
                <TableCell align="center">Wheel Base</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Bogie Diagonal</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Journal Centre</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Side Frame Jaw</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Brake Beam Pocket</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Side Bearer Centre</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Push Rod</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">End Pull Rod</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Brake Shoe</TableCell>
                <TableCell align="center">Photo</TableCell>
                <TableCell align="center">Spring Visual</TableCell>
                <TableCell align="center">Adopter</TableCell>
                <TableCell align="center">Remarks</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={row._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{formatDateTime(row.createdAt)}</TableCell>
                  <TableCell>{row.wagonType}</TableCell>

                  {/* 🔗 Clickable Bogie No */}
                  <TableCell>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#1a73e8",
                      }}
                      onClick={() => setDetailItem(row)}
                    >
                      {row.bogieNo}
                    </Button>
                  </TableCell>

                  <TableCell>{row.bogieMake}</TableCell>
                  <TableCell>{row.bogieType}</TableCell>

                  {/* With images */}
                  <TableCell align="center">{renderCheck(row.wheelBase)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.wheelBase?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.bogieDiagonal)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.bogieDiagonal?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.bogieJournalCentre)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.bogieJournalCentre?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.sideFrameJaw)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.sideFrameJaw?.photo} /></TableCell>
                  <TableCell align="center">{row.brakeBeamPocket?.value}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.brakeBeamPocket?.photo} /></TableCell>
                  <TableCell align="center">{row.sideBearerCentre?.value}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.sideBearerCentre?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.pushRodCheck)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.pushRodCheck?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.endPullRodCheck)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.endPullRodCheck?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.brakeShoeCheck)}</TableCell>
                  <TableCell align="center"><PhotoThumb file={row.brakeShoeCheck?.photo} /></TableCell>
                  <TableCell align="center">{renderCheck(row.springVisualCheck)}</TableCell>
                  <TableCell align="center">{row.adopterType}</TableCell>
                  <TableCell align="center">{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* 🟢 Detail Modal */}
      <Dialog open={!!detailItem} onClose={() => setDetailItem(null)} fullWidth maxWidth="md">
        {detailItem && (
          <>
            <DialogTitle>
              <Typography fontWeight={700}>
                Bogie Inspection — {detailItem.bogieNo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {formatDateTime(detailItem.createdAt)}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Typography fontWeight={700} sx={{ mb: 1 }}>
                Inspection Parameters
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: "#f3f4f6" }}>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Visual Conditions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    ["Wheel Base", detailItem.wheelBase],
                    ["Bogie Diagonal", detailItem.bogieDiagonal],
                    ["Journal Centre", detailItem.bogieJournalCentre],
                    ["Side Frame Jaw", detailItem.sideFrameJaw],
                    ["Brake Beam Pocket", detailItem.brakeBeamPocket],
                    ["Side Bearer Centre", detailItem.sideBearerCentre],
                    ["Push Rod", detailItem.pushRodCheck],
                    ["End Pull Rod", detailItem.endPullRodCheck],
                    ["Brake Shoe", detailItem.brakeShoeCheck],
                    ["Spring Visual", detailItem.springVisualCheck],
                  ].map(([label, obj]) => (
                    <TableRow key={label}>
                      <TableCell>{label}</TableCell>
                      <TableCell align="center">{renderCheckChip(obj)}</TableCell>
                      <TableCell align="center"><PhotoThumb file={obj?.photo} /></TableCell>
                      <TableCell align="center">{renderVisualList(obj?.visual)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography fontWeight={700}>Adopter Type</Typography>
                  <Typography>{detailItem.adopterType || "-"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight={700}>Inspector Signature</Typography>
                  <PhotoThumb file={detailItem.inspectorSignature} />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700}>Remarks</Typography>
                  <Typography>{detailItem.remarks || "-"}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailItem(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* 🖼️ Image Viewer */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent sx={{ background: "#000", textAlign: "center" }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="zoom"
              style={{ width: "100%", height: "auto", borderRadius: 6 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
<style>{`
  /* 🧾 PDF Capture - Fit Table to One Page */
  .pdf-capture table {
    border-collapse: collapse;
    width: 100% !important;
    table-layout: fixed !important;
  }

  .pdf-capture th,
  .pdf-capture td {
    text-align: center !important;
    vertical-align: middle !important;
    font-size: 9.5px !important;
    padding: 4px 2px !important;
    border: 0.3px solid #999;
    word-wrap: break-word;
  }

  .pdf-capture td img {
    width: 50px !important;
    height: 35px !important;
    object-fit: cover !important;
    border-radius: 3px;
    margin-top: 3px !important;
  }

  .pdf-capture tr {
    height: auto !important;
    page-break-inside: avoid !important;
  }

  @media print {
    @page {
      size: A4 landscape;
      margin: 6mm;
    }
  }

  .pdf-capture {
    background: #fff !important;
  }
`}</style>
