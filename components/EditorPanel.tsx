"use client";

import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

type Props = {
  code: string;
  setCode: (v: string) => void;
};

export default function EditorPanel({ code, setCode }: Props) {
  const run = () => {
    socket.emit("run-code", code);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-gray-900 p-2">
        <button
          onClick={run}
          className="bg-green-600 px-3 py-1 rounded"
        >
          ▶ Run
        </button>
      </div>

      <Editor
        height="100%"
        theme="vs-dark"
        language="typescript"
        value={code}
        onChange={(v) => setCode(v || "")}
      />
    </div>
  );
}
