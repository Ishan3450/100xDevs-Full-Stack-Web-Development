import { useCallback } from "react";
import { useRef, useEffect } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  const inputFieldRef = useRef();

  useEffect(() => {
    inputFieldRef.current.focus();
  }, []);

  const handleButtonClick = useCallback(() => {
    inputFieldRef.current.focus();
  }, []); // no need to pass inputFieldRef as dependency here as the reference will be same throughout the lifecycle of component

  return (
    <div>
      <input type="text" placeholder="Enter text here" ref={inputFieldRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
