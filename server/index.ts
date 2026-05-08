import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import { exec } from "child_process";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const PROJECT_DIR = "./projects";

if (!fs.existsSync(PROJECT_DIR)) {
  fs.mkdirSync(PROJECT_DIR);
}

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // RUN CODE
  socket.on("run-code", (code: string) => {
    const file = `${PROJECT_DIR}/main.ts`;
    fs.writeFileSync(file, code);

    exec(`npx ts-node ${file}`, (err, stdout, stderr) => {
      socket.emit("terminal-output", stdout || stderr);
    });
  });

  // SHELL COMMANDS
  socket.on("shell", (cmd: string) => {
    exec(cmd, { cwd: PROJECT_DIR }, (err, stdout, stderr) => {
      socket.emit("terminal-output", stdout || stderr);
    });
  });

  // FILE SYSTEM
  socket.on("create-file", (name: string) => {
    fs.writeFileSync(`${PROJECT_DIR}/${name}`, "");
    socket.emit("file-update");
  });

  socket.on("list-files", () => {
    const files = fs.readdirSync(PROJECT_DIR);
    socket.emit("file-list", files);
  });
});

httpServer.listen(3001, "0.0.0.0", () => {
  console.log("Server running on 3001");
});
