const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

const messages = [];

app.get("/get-messages", (req, res) => {
  res.json(messages);
});

app.post("/add-message", (req, res) => {
  const message = req.body.message;
  const user = req.body.user;
  messages.push({
    message,
    user,
  });
  io.emit("message", { user });
  res.json({ message: "Message added" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
