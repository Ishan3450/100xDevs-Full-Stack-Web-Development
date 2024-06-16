import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const divRef = useRef(); // lets you hold reference of a dom element

  useEffect(() => {
    console.log(divRef.current); // holds the curr ref of the DOM element, in this case it will be the <div>User</div>
    divRef.current.innerText = "Ishan";
  }, []);

  return (
    <>
      <div>
        {/* ref is passed meaning divRef will hold the ref to that div */}
        Hey there, this is <div ref={divRef}>User</div>
      </div>
    </>
  );
}

export default App;
