"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

type Props = {
  restaurants?: any[];
  selected?: any;
  onSelect?: (r:any)=>void;
};

export default function FoodMap({
  restaurants = [],
  selected,
  onSelect,
}: Props) {

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<mapboxgl.Map | null>(null);

  const markersRef =
    useRef<mapboxgl.Marker[]>([]);

  const markerElsRef =
    useRef<Record<string, HTMLDivElement>>({});

  const popupRef =
    useRef<mapboxgl.Popup | null>(null);

  const selectedRef =
    useRef<any>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setIsDesktop(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);


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

    mapRef.current.on("click", () => {
      onSelect?.(null);
      setHoveredId(null);
      popupRef.current?.remove();
      setActiveMarker(null);
    });

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
    markerElsRef.current={};

    restaurants.forEach((r)=>{

      const lng =
        r.lng ?? r.location?.lng;

      const lat =
        r.lat ?? r.location?.lat;

      if(
        typeof lng!=="number" ||
        typeof lat!=="number"
      ) return;

      const el =
        document.createElement("div");

      const dot =
        document.createElement("div");

      /* static marker wrapper */
      el.style.width="22px";
      el.style.height="22px";
      el.style.display="flex";
      el.style.alignItems="center";
      el.style.justifyContent="center";
      el.style.cursor="pointer";
      el.style.transform="translateZ(0)";

      dot.style.width="14px";
      dot.style.height="14px";
      dot.style.borderRadius="50%";
      dot.style.background="#22d3ee";
      dot.style.border="2px solid white";
      dot.style.transition="transform 140ms ease, background 140ms ease, width 140ms ease, height 140ms ease";
      dot.style.transformOrigin="center center";

      el.appendChild(dot);

      markerElsRef.current[String(r.id)] = el;

      const popupNode = createPopupNode(r);

      /* click marker -> select/toggle only this marker */
      el.addEventListener("click", (event) => {
        event.stopPropagation();

        const isSelected = selectedRef.current?.id === r.id;

        if (isSelected) {
          onSelect?.(null);
          setHoveredId(null);
          closePopup();
          setActiveMarker(null);
          return;
        }

        onSelect?.(r);
        setHoveredId(String(r.id));
        if (isDesktop) {
          openPopup(r, lng, lat, popupNode);
        }
        setActiveMarker(String(r.id));
      });

      el.addEventListener("mouseenter", () => {
        setHoveredId(String(r.id));
        if (isDesktop) {
          openPopup(r, lng, lat, popupNode);
        }
        setActiveMarker(String(r.id));
      });

      el.addEventListener("mouseleave", () => {
        if (selectedRef.current?.id !== r.id) {
          setHoveredId((current) => (current === String(r.id) ? null : current));
          closePopup();
          setActiveMarker(selectedRef.current?.id ?? null);
        }
      });


      const marker =
        new mapboxgl.Marker(el)
          .setLngLat([lng,lat])
          .addTo(mapRef.current!);

      markersRef.current.push(marker);

    });

  },[restaurants]);


  useEffect(() => {
    const active = selected ?? restaurants.find((item) => String(item.id) === hoveredId);

    Object.entries(markerElsRef.current).forEach(([id, el]) => {
      const isActive = String(active?.id) === id;
      const dot = el.firstElementChild as HTMLDivElement | null;

      if (!dot) return;

      dot.style.width = isActive ? "18px" : "14px";
      dot.style.height = isActive ? "18px" : "14px";
      dot.style.background = isActive ? "#f97316" : "#22d3ee";
      dot.style.zIndex = isActive ? "2" : "1";
      dot.style.transform = isActive ? "scale(1.18)" : "scale(1)";
    });

    if (!active) {
      closePopup();
      return;
    }

    const restaurant = restaurants.find((item) => item.id === active.id);
    if (!restaurant) return;

    const lng = restaurant.lng ?? restaurant.location?.lng;
    const lat = restaurant.lat ?? restaurant.location?.lat;
    if (typeof lng !== "number" || typeof lat !== "number") return;

    if (isDesktop) {
      openPopup(active, lng, lat, createPopupNode(restaurant));
    }
    setActiveMarker(String(active.id));
  }, [hoveredId, isDesktop, restaurants, selected]);


  function setActiveMarker(activeId: string | number | null) {
    const normalizedActiveId = activeId === null ? null : String(activeId);

    Object.entries(markerElsRef.current).forEach(([id, el]) => {
      const isActive = id === normalizedActiveId;
      const dot = el.firstElementChild as HTMLDivElement | null;

      if (!dot) return;

      dot.style.width = isActive ? "18px" : "14px";
      dot.style.height = isActive ? "18px" : "14px";
      dot.style.background = isActive ? "#f97316" : "#22d3ee";
      dot.style.zIndex = isActive ? "2" : "1";
      dot.style.transform = isActive ? "scale(1.18)" : "scale(1)";
    });
  }


  function closePopup() {
    popupRef.current?.remove();
    popupRef.current = null;
  }


  function openPopup(
    r:any,
    lng:number,
    lat:number,
    content:HTMLElement
  ) {
    if (!mapRef.current) return;

    popupRef.current?.remove();

    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 18,
      className: "zruchi-map-popup",
    })
      .setLngLat([lng, lat])
      .setDOMContent(content)
      .addTo(mapRef.current);
  }


  function createPopupNode(r:any) {
    const images = r.images?.length ? r.images : ["/restaurants/p1.webp"];
    let currentIndex = 0;

    const wrapper = document.createElement("div");
    wrapper.style.width = "320px";
    wrapper.style.borderRadius = "22px";
    wrapper.style.overflow = "hidden";
    wrapper.style.background = "#0f0f0f";
    wrapper.style.color = "#ffffff";
    wrapper.style.boxShadow = "0 24px 60px rgba(0,0,0,0.48)";
    wrapper.style.border = "1px solid rgba(255,255,255,0.08)";
    wrapper.style.position = "relative";

    const imageWrap = document.createElement("div");
    imageWrap.style.position = "relative";
    imageWrap.style.height = "176px";
    wrapper.appendChild(imageWrap);

    const img = document.createElement("img");
    img.src = images[0];
    img.style.width = "100%";
    img.style.height = "176px";
    img.style.objectFit = "cover";
    img.style.display = "block";
    imageWrap.appendChild(img);

    const navBase = "position:absolute;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:9999px;background:rgba(0,0,0,0.55);color:#fff;border:1px solid rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;cursor:pointer;";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "‹";
    prev.setAttribute("aria-label", "Previous image");
    prev.style.cssText = `${navBase}left:10px;`;
    imageWrap.appendChild(prev);

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "›";
    next.setAttribute("aria-label", "Next image");
    next.style.cssText = `${navBase}right:10px;`;
    imageWrap.appendChild(next);

    const dots = document.createElement("div");
    dots.style.position = "absolute";
    dots.style.left = "0";
    dots.style.right = "0";
    dots.style.bottom = "10px";
    dots.style.display = "flex";
    dots.style.justifyContent = "center";
    dots.style.gap = "6px";
    imageWrap.appendChild(dots);

    const renderDots = () => {
      dots.innerHTML = "";
      images.forEach((_: string, index: number) => {
        const dot = document.createElement("div");
        dot.style.width = "7px";
        dot.style.height = "7px";
        dot.style.borderRadius = "9999px";
        dot.style.background = index === currentIndex ? "#ffffff" : "rgba(255,255,255,0.45)";
        dots.appendChild(dot);
      });
    };

    const updateImage = () => {
      img.src = images[currentIndex];
      renderDots();
    };

    prev.addEventListener("click", (event) => {
      event.stopPropagation();
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateImage();
    });

    next.addEventListener("click", (event) => {
      event.stopPropagation();
      currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      updateImage();
    });

    renderDots();

    const body = document.createElement("div");
    body.style.padding = "14px 16px 16px";

    const name = document.createElement("div");
    name.textContent = r.name;
    name.style.fontSize = "16px";
    name.style.fontWeight = "700";
    name.style.marginBottom = "6px";
    body.appendChild(name);

    const meta = document.createElement("div");
    meta.textContent = `⭐ ${r.rating} · ₹${r.price} for two`;
    meta.style.fontSize = "12px";
    meta.style.color = "rgba(255,255,255,0.8)";
    meta.style.marginBottom = "6px";
    body.appendChild(meta);

    const address = document.createElement("div");
    address.textContent = r.address;
    address.style.fontSize = "12px";
    address.style.color = "rgba(255,255,255,0.68)";
    body.appendChild(address);

    wrapper.appendChild(body);
    return wrapper;
  }


  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
}