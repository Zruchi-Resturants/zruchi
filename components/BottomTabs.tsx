"use client";

type Props = {
  view: "map" | "list";
  setView: (view: "map" | "list") => void;
};

export default function BottomTabs({
  view,
  setView,
}: Props) {
  return (
    <div
      className="
        fixed
        left-1/2
        -translate-x-1/2
        bottom-8
        md:bottom-6
        z-50
      "
    >
      <div className="bg-white rounded-full shadow-2xl overflow-hidden flex border">

        <button
          onClick={() => setView("map")}
          className={`
            px-8 py-3 text-sm font-medium transition
            ${view === "map"
              ? "bg-black text-white"
              : "bg-white text-black"}
          `}
        >
          🗺 Map
        </button>

        <button
          onClick={() => setView("list")}
          className={`
            px-8 py-3 text-sm font-medium transition
            ${view === "list"
              ? "bg-black text-white"
              : "bg-white text-black"}
          `}
        >
          📋 List
        </button>

      </div>
    </div>
  );
}