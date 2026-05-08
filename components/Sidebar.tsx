"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Sidebar() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("list-files");

    socket.on("file-list", (data) => {
      setFiles(data);
    });
  }, []);

  const createFile = () => {
    const name = prompt("File name?");
    if (name) socket.emit("create-file", name);
  };

  return (
    <div className="w-48 bg-gray-900 text-white p-2">
      <button
        onClick={createFile}
        className="bg-blue-600 px-2 py-1 mb-2"
      >
        + File
      </button>

      {files.map((f, i) => (
        <div key={i} className="border-b border-gray-700 p-1">
          {f}
        </div>
      ))}
    </div>
  );
}
