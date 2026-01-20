const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store
let instances = [];
let savings = [];

// Save instances (UNCHANGED)
app.post("/api/instances", (req, res) => {
  console.log("🔥 RECEIVED INSTANCE:", req.body);

  const existing = instances.find(
    i => i.instance_id === req.body.instance_id
  );

  if (!existing) {
    instances.push(req.body);
  }

  res.json({ status: "instance saved" });
});

// Get instances (UNCHANGED)
app.get("/api/instances", (req, res) => {
  console.log("📤 SENDING INSTANCES:", instances);
  res.json(instances);
});

// ✅ UPDATED: Save savings (EXPLICIT EXTRACTION)
app.post("/api/savings", (req, res) => {
  const {
    resource_id,
    cloud,
    money_saved,
    region,
    state,
    instance_type,
    pricing_model,
    estimated_hours_saved,
    date
  } = req.body;

  const savingsRecord = {
    resource_id,
    cloud,
    money_saved,
    region,
    state,
    instance_type,
    pricing_model,
    estimated_hours_saved,
    date
  };

  console.log("💰 RECEIVED SAVINGS:", savingsRecord);

  savings.push(savingsRecord);

  res.json({ status: "savings saved" });
});

// Get savings (UNCHANGED BEHAVIOR)
app.get("/api/savings", (req, res) => {
  res.json(savings);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
