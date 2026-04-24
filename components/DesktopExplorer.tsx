"use client";

import { useState } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import { restaurants } from "@/data/restaurants";

export default function DesktopExplorer() {

const [selected,setSelected]=useState<any>(null);


/* FIXED TOGGLE */
const toggleSelect=(r:any)=>{
 setSelected((prev:any)=>{
   if(prev?.id===r?.id){
     return null;
   }
   return r;
 });
};


return(
<div className="flex h-[calc(100vh-56px)] bg-black overflow-hidden">

{/* MAP */}
<div className="relative w-[70%]">
<Map
 restaurants={restaurants}
 selected={selected}
 onSelect={toggleSelect}
/>

</div>


{/* LIST */}
<div className="w-[30%] overflow-y-auto bg-[#111] border-l border-zinc-800">

<RestaurantList
 restaurants={restaurants}
 selected={selected}
 onSelect={toggleSelect}
/>

</div>

</div>
)

}