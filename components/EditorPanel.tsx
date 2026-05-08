"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function EditorPanel() {
  const [code, setCode] = useState(
`console.log("Replit Remake running");`
  );

  return (
    <div className="flex-1">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="typescript"
        value={code}
        onChange={(v) => setCode(v || "")}
      />
    </div>
  );
}
