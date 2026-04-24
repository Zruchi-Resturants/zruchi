"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

type Props = {
  restaurants?: any[];
  hovered?: any;
  selected?: any;
  onSelect?: (r:any)=>void;
};

export default function FoodMap({
  restaurants = [],
  hovered,
  selected,
  onSelect,
}: Props) {

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<mapboxgl.Map | null>(null);

  const markersRef =
    useRef<mapboxgl.Marker[]>([]);


  /* MAP INIT */
  useEffect(() => {

    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [80.6480,16.5062],
      zoom: 12,
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl(),
      "bottom-right"
    );

    setTimeout(() => {
      mapRef.current?.resize();
    },300);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };

  },[]);



  /* CREATE MARKERS ONCE ONLY */
  useEffect(() => {

    if(!mapRef.current) return;

    markersRef.current.forEach(
      (m)=>m.remove()
    );

    markersRef.current=[];

    restaurants.forEach((r)=>{

      const el =
        document.createElement("div");

      /* static markers */
      el.style.width="14px";
      el.style.height="14px";
      el.style.borderRadius="50%";
      el.style.background="#22d3ee";
      el.style.border="2px solid white";
      el.style.cursor="pointer";

      /* click marker -> DesktopExplorer handles toggle */
      el.onclick = () => {
        onSelect?.(r);
      };


      const lng =
        r.lng ?? r.location?.lng;

      const lat =
        r.lat ?? r.location?.lat;

      if(
        typeof lng!=="number" ||
        typeof lat!=="number"
      ) return;


      const marker =
        new mapboxgl.Marker(el)
          .setLngLat([lng,lat])
          .addTo(mapRef.current!);

      markersRef.current.push(marker);

    });

  },[restaurants]);


  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
}