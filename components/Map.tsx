"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map({
  restaurants,
  onSelect,
}: {
  restaurants: any[];
  onSelect: (r: any | null) => void;
}) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ store latest onSelect (fix stale closure)
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current!,
      style: "mapbox://styles/zruchi/cmo8gpl84000i01sf7cg2akgg",
      center: [80.651449, 16.4989],
      zoom: 13, // ✅ zoom in more (you asked earlier)
    });

    mapRef.current = map;

    // ✅ CLICK EMPTY MAP → DESELECT (Zillow behavior)
    map.on("click", () => {
      onSelectRef.current(null);
    });

    // ADD MARKERS
    restaurants.forEach((r) => {
      const el = document.createElement("div");

      el.className =
        "w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-lg cursor-pointer";

      el.addEventListener("click", (e) => {
        e.stopPropagation(); // 🔥 prevent map click
        onSelectRef.current(r); // ✅ always latest
      });

      new mapboxgl.Marker(el)
        .setLngLat([r.lng, r.lat])
        .addTo(map);
    });
  }, [restaurants]);

  return <div ref={containerRef} className="w-full h-full" />;
}