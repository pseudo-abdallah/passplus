"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-full max-w-5xl">
        <div className="px-4 text-center">
          <div className="relative p-12 w-full border border-white/10 rounded-3xl backdrop-blur-sm [mask-image:radial-gradient(100rem_24rem_at_center,white,transparent)]">
            <h1 className="tracking-tighter flex select-none flex-col text-center text-7xl font-black leading-none sm:text-8xl lg:text-9xl">
              <Plus className="absolute -left-4 -top-4 h-8 w-8 text-pink-500" />
              <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-pink-500" />
              <Plus className="absolute -right-4 -top-4 h-8 w-8 text-pink-500" />
              <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-pink-500" />

              <span
                data-content="One Pass."
                className="before:animate-gradient-background-1 relative before:absolute before:inset-0 before:z-0 before:content-[attr(data-content)]"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text text-transparent px-4">
                  One Pass.
                </span>
              </span>
              <span
                data-content="Every."
                className="before:animate-gradient-background-2 relative before:absolute before:inset-0 before:z-0 before:content-[attr(data-content)]"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text text-transparent px-4">
                  Every.
                </span>
              </span>
              <span
                data-content="Venue."
                className="before:animate-gradient-background-3 relative before:absolute before:inset-0 before:z-0 before:content-[attr(data-content)]"
              >
                <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text text-transparent px-4">
                  Venue.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
