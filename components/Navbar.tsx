"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full h-14 bg-black text-white flex items-center justify-between px-4 z-50">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Logo (desktop left, mobile center handled below) */}
          <span className="hidden md:block text-xl font-semibold tracking-wide">
            <span className="text-orange-500">z</span>ruchi
          </span>
        </div>

        {/* CENTER (mobile only) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden text-lg font-semibold">
          <span className="text-orange-500">z</span>ruchi
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-orange-500 text-xl">❤</button>

            <button className="border border-orange-500 px-3 py-1 rounded-md text-sm">
              More filters ⌄
            </button>

            <div className="flex items-center gap-1 text-sm">
              <span>⭐</span>
              <span>1.2k</span>
            </div>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-1 text-sm">
            <span>⭐</span>
            <span>1.2k</span>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (simple for now) */}
      {menuOpen && (
        <div className="fixed top-14 left-0 w-full bg-black text-white p-4 z-40 md:hidden">
          <div className="space-y-3">
            <div>Filters</div>
            <div>Favorites</div>
            <div>Settings</div>
          </div>
        </div>
      )}
    </>
  );
}