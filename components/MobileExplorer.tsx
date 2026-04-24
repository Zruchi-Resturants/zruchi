"use client";

import { useState } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import BottomTabs from "@/components/BottomTabs";
import SelectedCard from "@/components/SelectedCard";
import { restaurants } from "@/data/restaurants";

export default function MobileExplorer() {
  const [view,setView] =
    useState<"map"|"list">("map");

  const [selected,setSelected] =
    useState<any>(null);

  return (
    <main className="relative h-screen bg-black">

      {view==="map" && (
        <Map
          restaurants={restaurants}
          onSelect={setSelected}
        />
      )}

      {view==="list" && (
        <RestaurantList
          restaurants={restaurants}
          onSelect={(r:any)=>{
            setSelected(r);
            setView("map");
          }}
        />
      )}

      {selected && view==="map" && (
        <SelectedCard selected={selected}/>
      )}

      <BottomTabs
        view={view}
        setView={setView}
      />

    </main>
  );
}