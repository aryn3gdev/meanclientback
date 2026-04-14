const express = require("express");
const app = express();

app.use(express.json());

// 🧪 test route (checks if server is alive)
app.get("/", (req, res) => {
  res.send("Mean Client API is running 😈");
});


// 🧱 MODS LIST (online catalog)
app.get("/mods", (req, res) => {
  res.json([
    {
      name: "Sodium",
      loader: "fabric",
      version: "1.20.4",
      file: "https://example.com/sodium.jar"
    },
    {
      name: "Iris",
      loader: "fabric",
      version: "1.20.4",
      file: "https://example.com/iris.jar"
    }
  ]);
});


// 🌐 SERVERS LIST
app.get("/servers", (req, res) => {
  res.json([
    {
      name: "Hardcore SMP",
      ip: "localhost:25565",
      version: "1.20.4"
    },
    {
      name: "Testing Lab",
      ip: "127.0.0.1:25566",
      version: "1.20.1"
    }
  ]);
});


// 💬 SIMPLE CHAT (temporary in-memory system)
let messages = [];

app.get("/chat", (req, res) => {
  res.json(messages);
});

app.post("/chat", (req, res) => {
  const msg = req.body;
  messages.push(msg);
  res.json({ success: true });
});


// 🚀 START SERVER (Render uses PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Mean Client API running on port " + PORT);
});