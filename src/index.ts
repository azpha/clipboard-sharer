import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.status(204);
});

io.on("connection", (socket) => {
  console.log("new client connected: " + socket.id);

  socket.on("copy", (arg) => {
    console.log(arg);
    socket.broadcast.emit("copy", arg);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("server running");
});
