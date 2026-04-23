"use client";

export default function BottomTabs({ view, setView }: any) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-black rounded-full shadow-lg flex overflow-hidden">
      <button
        onClick={() => setView("map")}
        className={`px-6 py-3 text-sm font-medium ${
          view === "map" ? "bg-black text-white" : ""
        }`}
      >
        🗺 Map
      </button>

      <button
        onClick={() => setView("list")}
        className={`px-6 py-3 text-sm font-medium ${
          view === "list" ? "bg-black text-white" : ""
        }`}
      >
        📋 List
      </button>
    </div>
  );
}