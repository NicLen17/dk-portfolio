"use client";

import { useEffect, useState, useRef } from "react";

export type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection(threshold = 10): {
  direction: ScrollDirection;
  scrollY: number;
  isAtTop: boolean;
} {
  const [direction, setDirection] = useState<ScrollDirection>("none");
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY < 10);

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) return;

      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { direction, scrollY, isAtTop };
}
