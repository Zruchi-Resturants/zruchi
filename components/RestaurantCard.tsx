"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  restaurant: any;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
      
      {/* ✅ REAL CAROUSEL */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {restaurant.images.map((img: string, index: number) => (
              <CarouselItem key={index}>
                <img
                  src={img}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
        <p className="text-sm text-gray-500">
          ₹{restaurant.costForTwo} for two
        </p>
        <p className="text-sm">⭐ {restaurant.rating}</p>
      </div>
    </div>
  );
}