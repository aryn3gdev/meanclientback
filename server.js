const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Set();

app.get("/", (req, res) => {
  res.send("MeanClient Chat Server Online 😈");
});

wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("message", (msg) => {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Chat server running on port", PORT);
});
