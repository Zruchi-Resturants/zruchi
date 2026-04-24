"use client";

import { useState } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import SelectedCard from "@/components/SelectedCard";
import { restaurants } from "@/data/restaurants";

export default function DesktopExplorer(){

const [selected,setSelected] = useState<any>(null);
const [hovered,setHovered] = useState<any>(null);

return(
<div className="flex h-[calc(100vh-56px)] bg-black">

  {/* MAP 70% */}
  <div className="w-[70%] relative">
    <Map
      restaurants={restaurants}
      hovered={hovered}
      selected={selected}
      onSelect={setSelected}
    />

    {selected && (
      <SelectedCard selected={selected}/>
    )}
  </div>


  {/* LIST 30% */}
  <div className="w-[30%] overflow-y-auto border-l border-zinc-800 bg-[#111]">
    <RestaurantList
      restaurants={restaurants}
      onSelect={setSelected}
      onHover={setHovered}
      onLeave={()=>setHovered(null)}
    />
  </div>

</div>
)

}