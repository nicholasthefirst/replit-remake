import Sidebar from "@/components/Sidebar";
import EditorPanel from "@/components/EditorPanel";
import TerminalPanel from "@/components/TerminalPanel";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <EditorPanel />
        <TerminalPanel />
      </div>
    </div>
  );
}
