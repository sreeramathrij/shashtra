import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    checkWidth(); // run on mount

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return isMobile;
};

export const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const setWidth = () => {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, [])

  return viewportWidth;
}
