"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalPanel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const term = new Terminal({
      theme: { background: "#000" }
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    term.open(ref.current);
    fit.fit();

    term.writeln("Terminal ready");
    term.writeln("$ npm run dev");

    return () => term.dispose();
  }, []);

  return (
    <div className="h-48 border-t border-gray-800">
      <div ref={ref} className="h-full" />
    </div>
  );
}
