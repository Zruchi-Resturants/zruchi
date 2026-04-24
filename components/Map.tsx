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




  /* MARKERS */
  useEffect(() => {

    if(!mapRef.current) return;

    markersRef.current.forEach(
      (m)=>m.remove()
    );

    markersRef.current=[];

    restaurants.forEach((r)=>{

      const active =
        hovered?.id===r.id ||
        selected?.id===r.id;

      const el =
        document.createElement("div");

      el.style.width =
        active ? "20px":"14px";

      el.style.height =
        active ? "20px":"14px";

      el.style.borderRadius="50%";

      el.style.background =
        active
          ? "#f97316"
          : "#22d3ee";

      el.style.border =
        "2px solid white";

      el.style.cursor="pointer";

      el.style.transition =
        "all .2s ease";


      /* click marker select/unselect */
      el.onclick = () => {

        if(selected?.id===r.id){
          onSelect?.(null);
        }else{
          onSelect?.(r);
        }

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

  },[
    restaurants,
    hovered,
    selected,
    onSelect
  ]);



  /* hover fly */
  useEffect(()=>{

    if(!hovered || !mapRef.current) return;

    const lng =
      hovered.lng ??
      hovered.location?.lng;

    const lat =
      hovered.lat ??
      hovered.location?.lat;

    if(
      typeof lng==="number" &&
      typeof lat==="number"
    ){
      mapRef.current.flyTo({
        center:[lng,lat],
        duration:700
      });
    }

  },[hovered]);



  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
}