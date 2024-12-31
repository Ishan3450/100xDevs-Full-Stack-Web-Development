import { useEffect, useState } from "react";

function useIsOnline() {
  const [online, setOnline] = useState(window.navigator.onLine);

  function setStatusOnline() {
    setOnline(true);
  }

  function setOffline() {
    setOnline(false);
  }

  useEffect(() => {
    window.addEventListener("online", setStatusOnline);
    window.addEventListener("offline", setOffline);

    return () => {
        window.removeEventListener("online", setStatusOnline);
        window.removeEventListener("offline", setOffline);    
    };
  }, []);

  return online;
}

export default useIsOnline;
