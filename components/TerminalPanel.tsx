"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function TerminalPanel() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    socket.on("terminal-output", (data) => {
      setOutput(data);
    });
  }, []);

  const shell = () => {
    const cmd = prompt("Shell command?");
    if (cmd) socket.emit("shell", cmd);
  };

  return (
    <div className="h-48 bg-black text-green-400 p-2 border-t">
      <button
        onClick={shell}
        className="bg-gray-700 px-2 py-1 mb-2"
      >
        $ Shell
      </button>

      <pre>{output || "Ready..."}</pre>
    </div>
  );
}
