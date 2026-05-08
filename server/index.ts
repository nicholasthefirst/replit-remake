import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("code-change", (data) => {
    socket.broadcast.emit("code-update", data);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket server running on 3001");
});
