"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RouteNavbar() {
  const pathname = usePathname();

  if (pathname === "/landing") {
    return null;
  }

  return <Navbar />;
}