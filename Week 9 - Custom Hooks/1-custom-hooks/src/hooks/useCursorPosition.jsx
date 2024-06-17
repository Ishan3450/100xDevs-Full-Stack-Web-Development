import { useState, useEffect } from "react";

function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setPosition({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return position;
}

export default useCursorPosition;
