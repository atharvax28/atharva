"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isProjectRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset cursor state on route change
    if (cursorRef.current) {
      isProjectRef.current = false;
      cursorRef.current.classList.remove("cursor--project");
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // A fine pointer is required, not just a wide viewport: hiding the native cursor on a
    // touch or coarse-pointer device leaves the user with nothing to aim.
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => {
      setEnabled(mq.matches);
      // Drives the `cursor: none` rule in globals.css, so the native cursor is only ever
      // hidden while this component is actually drawing a replacement.
      document.documentElement.classList.toggle("has-custom-cursor", mq.matches);
    };
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rafId: number | null = null;
    let targetX = -9999;
    let targetY = -9999;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!cursorRef.current) return;
      if (target && target.closest && target.closest('[data-cursor="project"]')) {
        isProjectRef.current = true;
        cursorRef.current.classList.add("cursor--project");
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!cursorRef.current) return;
      if (target && target.closest && target.closest('[data-cursor="project"]')) {
        isProjectRef.current = false;
        cursorRef.current.classList.remove("cursor--project");
      }
    };

    const loop = () => {
      if (!cursorRef.current) return;
      const el = cursorRef.current;
      const r = isProjectRef.current ? 64 : 12; // radius for centering
      const x = targetX - r;
      const y = targetY - r;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        display: "block",
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
    >
      <div
        className="cursor-circle"
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          transition: "width 0.18s ease, height 0.18s ease, background 0.18s ease, boxShadow 0.18s ease",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            fill: "#222",
          }}
        >
          <rect x="0" y="0" width="3" height="15" />
          <rect x="0" y="0" width="15" height="3" />
          <rect x="3" y="3" width="3" height="3" />
          <rect x="6" y="6" width="3" height="3" />
          <rect x="9" y="9" width="3" height="3" />
          <rect x="12" y="12" width="3" height="3" />
        </svg>
      </div>

      <style jsx>{`
        .cursor-wrapper.cursor--project .cursor-circle {
          width: 128px !important;
          height: 128px !important;
          background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(0,0,0,0.12));
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        }
        .cursor-wrapper.cursor--project svg {
          width: 28px !important;
          height: 28px !important;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
