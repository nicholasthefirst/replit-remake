export default function Sidebar() {
  return (
    <div className="w-64 bg-[#161b22] border-r border-gray-800 p-4">
      <h1 className="font-bold text-lg">Replit Clone</h1>

      <div className="mt-4 text-sm space-y-2">
        <div className="p-2 bg-[#21262d] rounded">main.ts</div>
        <div className="p-2 hover:bg-[#21262d] rounded cursor-pointer">
          index.js
        </div>
      </div>
    </div>
  );
}
