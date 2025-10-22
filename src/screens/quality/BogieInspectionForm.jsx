import React, { useMemo, useState } from "react";
import api from "../../api";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Slider,
} from "@mui/material";


/* ----------------------------------------------------------------
   Helper Components
---------------------------------------------------------------- */
const todayISO = () => new Date().toISOString().slice(0, 10);

/* ✅ Tri-State Slider Component */
const TriStateSlider = ({ value, onChange }) => {
  const marks = [
    { value: -1, label: "❌" },
    { value: 0, label: "—" },
    { value: 1, label: "✅" },
  ];

  const getColor = (val) => {
    if (val === 1) return "success.main";
    if (val === -1) return "error.main";
    return "grey.500";
  };

  return (
    <Box sx={{ width: 180, mx: "auto", textAlign: "center" }}>
      <Slider
        value={value}
        onChange={(e, newVal) => onChange(newVal)}
        step={1}
        min={-1}
        max={1}
        marks={marks}
        sx={{
          color: getColor(value),
          "& .MuiSlider-thumb": {
            bgcolor: getColor(value),
          },
          "& .MuiSlider-markLabel": {
            fontWeight: 600,
            color: "#555",
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{ mt: 0.5, fontWeight: 600, color: getColor(value) }}
      >
        {value === 1 ? "OK" : value === -1 ? "NOT OK" : "Pending"}
      </Typography>
    </Box>
  );
};

/* ✅ Check + Photo Row Component */
const CheckPhotoRow = ({ label, value, onChange, photo, onPhotoChange }) => {
  const bgColor =
    value === 1 ? "#e9f7ef" : value === -1 ? "#fdecea" : "#f9fafb";

  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, background: bgColor, borderRadius: 2 }}>
        <Typography fontWeight={600} mb={1}>
          {label}
        </Typography>

        {/* ✅ Tri-State Slider */}
        <TriStateSlider value={value} onChange={onChange} />

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          {photo ? "Replace Photo" : "Upload Photo"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onPhotoChange(e.target.files[0])}
          />
        </Button>

        {photo && (
          <Box sx={{ mt: 1 }}>
            <img
              src={URL.createObjectURL(photo)}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: 180,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

/* ✅ Numeric + Photo Row Component */
const NumberPhotoRow = ({
  label,
  value,
  setValue,
  note,
  photo,
  onPhotoChange,
  unit = "mm",
}) => (
  <Grid item xs={12} md={6}>
    <Paper sx={{ p: 2, background: "#f9fafb", borderRadius: 2 }}>
      <Typography fontWeight={600}>{label}</Typography>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${unit}`}
        sx={{ mt: 1 }}
      />
      {note && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {note}
        </Typography>
      )}
      <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
        {photo ? "Replace Photo" : "Upload Photo"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onPhotoChange(e.target.files[0])}
        />
      </Button>
      {photo && (
        <Box sx={{ mt: 1 }}>
          <img
            src={URL.createObjectURL(photo)}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 180,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        </Box>
      )}
    </Paper>
  </Grid>
);

/* ----------------------------------------------------------------
   Main Component
---------------------------------------------------------------- */
export default function BogieInspectionForm() {
  const [date, setDate] = useState(todayISO());
  const [wagonType, setWagonType] = useState("");
  const [bogieNo, setBogieNo] = useState("");
  const [bogieMake, setBogieMake] = useState("");
  const [bogieType, setBogieType] = useState("");

  // ✅ Tri-state fields: -1 = Not OK, 0 = Pending, 1 = OK
  const [wheelBase, setWheelBase] = useState(0);
  const [wheelBasePhoto, setWheelBasePhoto] = useState(null);
  const [bogieDiagonal, setBogieDiagonal] = useState(0);
  const [diagPhoto, setDiagPhoto] = useState(null);
  const [journalCentre, setJournalCentre] = useState(0);
  const [journalPhoto, setJournalPhoto] = useState(null);
  const [sideFrameJaw, setSideFrameJaw] = useState(0);
  const [sideFrameJawPhoto, setSideFrameJawPhoto] = useState(null);
  // ✅ New photo states for the missing sections
const [pushRodPhoto, setPushRodPhoto] = useState(null);
const [endPullRodPhoto, setEndPullRodPhoto] = useState(null);
const [brakeShoePhoto, setBrakeShoePhoto] = useState(null);
const [springPhoto, setSpringPhoto] = useState(null);


  const [brakeBeamPocket, setBrakeBeamPocket] = useState("");
  const [brakeBeamPhoto, setBrakeBeamPhoto] = useState(null);
  const [sideBearer, setSideBearer] = useState("");
  const [sideBearerPhoto, setSideBearerPhoto] = useState(null);

  const [pushRod, setPushRod] = useState(0);
  const [endPullRod, setEndPullRod] = useState(0);
  const [brakeShoeType, setBrakeShoeType] = useState("");
  const [brakeShoe, setBrakeShoe] = useState(0);
  const [spring, setSpring] = useState(0);
  const [adopterType, setAdopterType] = useState("");
  const [remarks, setRemarks] = useState("");

  const sideBearerFlag = useMemo(() => {
    const v = parseFloat(sideBearer);
    if (isNaN(v)) return null;
    return v >= 1469 && v <= 1479 ? "within" : "out";
  }, [sideBearer]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("date", date);
  formData.append("wagonType", wagonType);
  formData.append("bogieNo", bogieNo);
  formData.append("bogieMake", bogieMake);
  formData.append("bogieType", bogieType);

  // ✅ append file + check values safely
  formData.append("wheelBaseCheck", wheelBase);
  if (wheelBasePhoto) formData.append("wheelBasePhoto", wheelBasePhoto);

  formData.append("bogieDiagonalCheck", bogieDiagonal);
  if (diagPhoto) formData.append("bogieDiagonalPhoto", diagPhoto);

  formData.append("journalCentreCheck", journalCentre);
if (journalPhoto) formData.append("bogieJournalCentrePhoto", journalPhoto);

  formData.append("sideFrameJawCheck", sideFrameJaw);
  if (sideFrameJawPhoto) formData.append("sideFrameJawPhoto", sideFrameJawPhoto);

  formData.append("brakeBeamPocket", brakeBeamPocket);
  if (brakeBeamPhoto) formData.append("brakeBeamPhoto", brakeBeamPhoto);

  formData.append("sideBearer", sideBearer);
  if (sideBearerPhoto) formData.append("sideBearerPhoto", sideBearerPhoto);
  
  if (pushRodPhoto) formData.append("pushRodPhoto", pushRodPhoto);
if (endPullRodPhoto) formData.append("endPullRodPhoto", endPullRodPhoto);
if (brakeShoePhoto) formData.append("brakeShoePhoto", brakeShoePhoto);
if (springPhoto) formData.append("springPhoto", springPhoto);
  formData.append("pushRodCheck", pushRod);
  formData.append("endPullRodCheck", endPullRod);
  formData.append("brakeShoeType", brakeShoeType);
  formData.append("brakeShoeCheck", brakeShoe);
  formData.append("springVisualCheck", spring);
  formData.append("adopterType", adopterType);
  formData.append("remarks", remarks);

  try {
    await api.post("/bogie-inspections", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("✅ Inspection saved successfully!");
  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Upload failed — check console");
  }
};

  return (
    <Box p={3} sx={{ background: "#eef2ff", minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight={700} mb={1}>
        BOGIE INSPECTION REPORT – AGARPARA WORKS
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Format No.: SGS/BOGIE/01 | Rev. 01 | Effective: 02-10-2025
      </Typography>

      {/* HEADER SECTION */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Type of Wagon"
              value={wagonType}
              onChange={(e) => setWagonType(e.target.value)}
              fullWidth
            >
              <MenuItem value="BOXN">BOXN</MenuItem>
              <MenuItem value="BCNHL">BCNHL</MenuItem>
              <MenuItem value="BOBRN">BOBRN</MenuItem>
              <MenuItem value="BLC">BLC</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Bogie No."
              value={bogieNo}
              onChange={(e) => setBogieNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Bogie Make"
              value={bogieMake}
              onChange={(e) => setBogieMake(e.target.value)}
              fullWidth
            >
              <MenuItem value="CASNUB">CASNUB</MenuItem>
              <MenuItem value="ICF">ICF</MenuItem>
              <MenuItem value="LHB">LHB</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Bogie Type"
              value={bogieType}
              onChange={(e) => setBogieType(e.target.value)}
              fullWidth
            >
              <MenuItem value="22.9T">22.9T</MenuItem>
              <MenuItem value="25T">25T</MenuItem>
              <MenuItem value="30T">30T</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* MAIN FORM */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <CheckPhotoRow
            label="Wheel Base Check"
            value={wheelBase}
            onChange={setWheelBase}
            photo={wheelBasePhoto}
            onPhotoChange={setWheelBasePhoto}
          />
          <CheckPhotoRow
            label="Bogie Diagonal Check"
            value={bogieDiagonal}
            onChange={setBogieDiagonal}
            photo={diagPhoto}
            onPhotoChange={setDiagPhoto}
          />
          <CheckPhotoRow
            label="Bogie Journal Centre Check"
            value={journalCentre}
            onChange={setJournalCentre}
            photo={journalPhoto}
            onPhotoChange={setJournalPhoto}
          />
          <CheckPhotoRow
            label="Side Frame Jaw Check"
            value={sideFrameJaw}
            onChange={setSideFrameJaw}
            photo={sideFrameJawPhoto}
            onPhotoChange={setSideFrameJawPhoto}
          />
          <NumberPhotoRow
            label="Brake Beam Pocket – Lateral Distance"
            value={brakeBeamPocket}
            setValue={setBrakeBeamPocket}
            photo={brakeBeamPhoto}
            onPhotoChange={setBrakeBeamPhoto}
          />
          <NumberPhotoRow
            label="Side Bearer Centre Distance (1474 ± 5 mm)"
            value={sideBearer}
            setValue={setSideBearer}
            photo={sideBearerPhoto}
            onPhotoChange={setSideBearerPhoto}
            note={
              sideBearerFlag
                ? sideBearerFlag === "within"
                  ? "✅ Within tolerance"
                  : "❌ Out of tolerance"
                : "Enter value to check tolerance"
            }
          />
        </Grid>

        <Grid container spacing={2} mt={1}>
          <CheckPhotoRow
  label="Push Rod Check"
  value={pushRod}
  onChange={setPushRod}
  photo={pushRodPhoto}
  onPhotoChange={setPushRodPhoto}
/>
<CheckPhotoRow
  label="End Pull Rod Check"
  value={endPullRod}
  onChange={setEndPullRod}
  photo={endPullRodPhoto}
  onPhotoChange={setEndPullRodPhoto}
/>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Brake Shoe Type"
              fullWidth
              value={brakeShoeType}
              onChange={(e) => setBrakeShoeType(e.target.value)}
            >
              <MenuItem value="Cast Iron">Cast Iron</MenuItem>
              <MenuItem value="Composite">Composite</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <CheckPhotoRow
  label="Brake Shoe Check"
  value={brakeShoe}
  onChange={setBrakeShoe}
  photo={brakeShoePhoto}
  onPhotoChange={setBrakeShoePhoto}
/>
         <CheckPhotoRow
  label="Spring Visual Check"
  value={spring}
  onChange={setSpring}
  photo={springPhoto}
  onPhotoChange={setSpringPhoto}
/>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Type of Adopter"
              fullWidth
              value={adopterType}
              onChange={(e) => setAdopterType(e.target.value)}
            >
              <MenuItem value="25T">25T</MenuItem>
              <MenuItem value="30T">30T</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              multiline
              rows={3}
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mt: 3 }}
        >
          Save Inspection
        </Button>
      </form>
    </Box>
  );
}
