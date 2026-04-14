const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ===================== LOAD SERVERS FILE =====================
function getServers() {
  const filePath = path.join(__dirname, "servers.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// ===================== SERVERS API =====================
app.get("/servers", (req, res) => {
  try {
    const servers = getServers();
    res.json(servers);
  } catch (err) {
    res.status(500).json({ error: "Failed to load servers" });
  }
});

// ===================== STATUS =====================
app.get("/", (req, res) => {
  res.send("MeanClient Backend Running 😈");
});

// ===================== START =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});
