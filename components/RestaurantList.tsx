"use client";

export default function RestaurantList({
  restaurants,
  onSelect,
}: {
  restaurants: any[];
  onSelect: (r: any) => void;
}) {
  return (
    <div className="h-full overflow-y-auto bg-black p-4 space-y-4">
      {restaurants.map((r) => (
        <div
          key={r.id}
          onClick={() => onSelect(r)}
          className="bg-white text-black rounded-xl overflow-hidden shadow-md cursor-pointer active:scale-95 transition"
        >
          {/* IMAGE */}
          <img
            src={r.images?.[0]}
            className="w-full h-44 object-cover"
          />

          {/* TEXT */}
          <div className="p-3">
            <h2 className="font-semibold text-lg">{r.name}</h2>

            <p className="text-sm text-gray-500 mt-1">
              ⭐ {r.rating}
            </p>

            <p className="text-sm mt-1 font-medium">
              ₹{r.price} for two
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {r.address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}