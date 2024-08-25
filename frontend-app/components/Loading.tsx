"use client";

import { Popup } from "pixel-retroui";

export default function Loading({ isLoading = true }: { isLoading?: boolean }) {
  return (
    <Popup
      isOpen={isLoading}
      onClose={() => 0}
      bg="#fff"
      baseBg="#fffeee"
      className="[&>div>div>button]:opacity-0"
    >
      <div>
        <h1 className="text-8xl rounded-full animate-spin">🍳</h1>
      </div>
    </Popup>
  );
}
