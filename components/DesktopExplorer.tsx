"use client";

import { useState } from "react";
import Map from "@/components/Map";
import RestaurantList from "@/components/RestaurantList";
import { restaurants } from "@/data/restaurants";

export default function DesktopExplorer() {

const [selected,setSelected]=useState<any>(null);
const [hovered,setHovered]=useState<any>(null);


/* FIXED */
const toggleSelect=(r:any)=>{

if(!r){
 setSelected(null);
 return;
}

if(selected?.id===r.id){
 setSelected(null);
}
else{
 setSelected(r);
}

};


return(
<div className="flex h-[calc(100vh-56px)] bg-black">

{/* MAP 70 */}
<div className="w-[70%]">
<Map
 restaurants={restaurants}
 hovered={hovered}
 selected={selected}
 onSelect={toggleSelect}
/>
</div>


{/* LIST 30 */}
<div className="w-[30%] overflow-y-auto bg-[#111] border-l border-zinc-800">

<RestaurantList
 restaurants={restaurants}
 selected={selected}
 onSelect={toggleSelect}
 onHover={setHovered}
 onLeave={()=>setHovered(null)}
/>

</div>

</div>
)

}