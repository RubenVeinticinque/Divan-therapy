import { useState, useRef, useEffect } from "react";

function UseElementTotalSessionsOnScreen(options, props) {
  let session = 0;
  let counter;

  const containerTotalSessionsRef = useRef(null);
  const [isVisibleTotalSessions, setIsVisibleTotalSessions] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisibleTotalSessions(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerTotalSessionsRef.current)
      observer.observe(containerTotalSessionsRef.current);

    if (isVisibleTotalSessions) {
      //Total sessions
      const totalSessions = document.getElementById("p-home-total-sessions");

      function count() {
        if (session > props) {
          clearInterval(counter);
        } else {
          totalSessions.innerHTML = session;
          session++;
        }
      }
      counter = setInterval(count, 125);
    }

    return () => {
      if (containerTotalSessionsRef.current)
        observer.unobserve(containerTotalSessionsRef.current);
      clearInterval(counter);
    };
  }, [containerTotalSessionsRef, options]);
  return [containerTotalSessionsRef, isVisibleTotalSessions];
}

export default UseElementTotalSessionsOnScreen;
