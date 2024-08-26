"use client";

import { Popup } from "pixel-retroui";

export default function Loading({ isLoading = true }: { isLoading?: boolean }) {
  return (
    <Popup
      isOpen={isLoading}
      onClose={() => 0}
      bg="#ffbab5"
      baseBg="#990931"
      className="[&>div>div>button]:opacity-0"
    >
      <div>
        <div className="rounded-full animate-spin">
          <img
            draggable={false}
            alt="logo"
            src="/logo.png"
            className="w-24 h-20"
          />
        </div>
      </div>
    </Popup>
  );
}
