"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const followerX = useSpring(cursorX, { damping: 12, stiffness: 100 });
  const followerY = useSpring(cursorY, { damping: 12, stiffness: 100 });

  useEffect(() => {
    // Check for hover capability only on the client
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    setShouldRender(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!shouldRender) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          left: cursorX,
          top: cursorY,
          width: isHovering ? 20 : 12,
          height: isHovering ? 20 : 12,
          opacity: isVisible ? (isHovering ? 0.5 : 1) : 0,
        }}
      />
      <motion.div
        className="cursor-follower"
        style={{
          left: followerX,
          top: followerY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
