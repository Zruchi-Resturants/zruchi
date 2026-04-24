"use client";

import RestaurantCard from "./RestaurantCard";

type Props = {
  restaurants: any[];
  onSelect?: (r:any)=>void;
  onHover?: (r:any)=>void;
  onLeave?: ()=>void;
};

export default function RestaurantList({
  restaurants,
  onSelect,
  onHover,
  onLeave
}: Props) {

  return (
    <div className="p-4 space-y-4">

      {restaurants.map((restaurant)=>(
        <div
          key={restaurant.id}
          onMouseEnter={() => onHover?.(restaurant)}
          onMouseLeave={() => onLeave?.()}
          onClick={() => onSelect?.(restaurant)}
          className="cursor-pointer transition hover:scale-[1.01]"
        >
          <RestaurantCard restaurant={restaurant} />
        </div>
      ))}

    </div>
  );
}