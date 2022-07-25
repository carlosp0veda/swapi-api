import React, { useEffect, useState } from "react";

interface MousePositionState {
    x: number | null,
    y: number | null
}
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePositionState | null>({ x: null, y: null });
useEffect(() => {
    const mouseMoveHandler = (event: React.MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", () => mouseMoveHandler);
return () => {
      document.removeEventListener("mousemove",() => mouseMoveHandler);
    };
  }, []);
return {x: mousePosition?.x, y:mousePosition?.y};
};
export default useMousePosition;