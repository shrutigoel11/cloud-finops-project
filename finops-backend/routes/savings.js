const router = require("express").Router();
const Savings = require("../models/Savings");

router.get("/", async (req, res) => {
  const data = await Savings.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const record = new Savings(req.body);
  await record.save();
  res.send("Saved");
});

module.exports = router;
