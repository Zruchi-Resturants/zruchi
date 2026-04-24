"use client";

import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({
 restaurants,
 selected,
 onSelect,
 onHover,
 onLeave
}:any){

return(
<div className="p-4 space-y-4">

{restaurants.map((restaurant:any)=>{

const isSelected=
 selected?.id===restaurant.id;

return(
<div
key={restaurant.id}
onClick={()=>onSelect?.(restaurant)}
onMouseEnter={()=>onHover?.(restaurant)}
onMouseLeave={()=>onLeave?.()}
className={`
rounded-2xl
cursor-pointer
transition-all
duration-200

hover:-translate-y-1
hover:ring-2
hover:ring-orange-500

${isSelected
? "ring-2 ring-orange-500 bg-zinc-900 scale-[1.01]"
: ""
}
`}
>
<RestaurantCard
 restaurant={restaurant}
/>
</div>
)

})}

</div>
)

}