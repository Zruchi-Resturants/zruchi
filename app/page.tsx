"use client";

import { useState } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import BottomTabs from "@/components/BottomTabs";
import SelectedCard from "@/components/SelectedCard";
import { restaurants } from "@/data/restaurants";

export default function Home() {
  const [view, setView] = useState<"map" | "list">("map");
  const [selected, setSelected] = useState<any>(null);

  return (
    <main className="relative h-screen w-full bg-black text-white">

      {/* MAP */}
      {view === "map" && (
        <Map restaurants={restaurants} onSelect={setSelected} />
      )}

      {/* LIST */}
      {view === "list" && (
        <RestaurantList
          restaurants={restaurants}
          onSelect={(r: any) => {
            setSelected(r);
            setView("map");
          }}
        />
      )}

      {/* SELECTED CARD */}
      {selected && view === "map" && (
        <SelectedCard selected={selected} />
      )}

      {/* TABS */}
      <BottomTabs view={view} setView={setView} />
    </main>
  );
}