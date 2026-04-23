"use client";

import { useState, useEffect } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import BottomTabs from "../components/BottomTabs";
import { restaurants } from "@/data/restaurants";

export default function Home() {
  const [view, setView] = useState<"map" | "list">("map");
  const [selected, setSelected] = useState<any>(null);

  // ✅ carousel state
  const [imgIndex, setImgIndex] = useState(0);

  
  useEffect(() => {
    setImgIndex(0);
  }, [selected]);

  return (
    <main className="relative h-screen w-full bg-black text-white">
      
      {/* MAP VIEW */}
      {view === "map" && (
        <Map
          restaurants={restaurants}
          onSelect={(r: any) => setSelected(r)}
        />
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <RestaurantList
          restaurants={restaurants}
          onSelect={(r: any) => {
            setSelected(r);
            setView("map");
          }}
        />
      )}

   
      {selected && view === "map" && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white text-black rounded-2xl shadow-xl overflow-hidden">
          
          {/* 🔥 CAROUSEL */}
          {selected?.images?.length > 0 && (
            <div className="relative">

              {/* IMAGE */}
              <img
                src={selected.images[imgIndex]}
                className="w-full h-52 object-cover"
              />

              {/* LEFT BUTTON */}
              <button
                onClick={() =>
                  setImgIndex((prev) =>
                    prev === 0
                      ? selected.images.length - 1
                      : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
              >
                ‹
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={() =>
                  setImgIndex((prev) =>
                    prev === selected.images.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
              >
                ›
              </button>

              {/* DOTS */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {selected.images.map((_: any, i: number) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === imgIndex
                        ? "bg-white"
                        : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TEXT */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">
              {selected.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              ⭐ {selected.rating}
            </p>

            <p className="text-sm font-medium mt-1">
              ₹{selected.price} for two
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {selected.address}
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM TABS */}
      <BottomTabs view={view} setView={setView} />
    </main>
  );
}