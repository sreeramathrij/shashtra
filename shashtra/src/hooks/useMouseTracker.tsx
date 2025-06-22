import { useEffect, useState, useRef } from "react";

const useMouseTracker = () => {
  const [mousePos, setMousePos] = useState({ mouseX: 0, mouseY: 0 });

  const animationFrameRef = useRef<number | undefined>(undefined);
  const latestMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestMouse.current = { x: e.clientX, y: e.clientY };

      if (animationFrameRef.current == null) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setMousePos({
            mouseX: latestMouse.current.x,
            mouseY: latestMouse.current.y,
          });
          animationFrameRef.current = undefined;
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return mousePos;
};

export default useMouseTracker;