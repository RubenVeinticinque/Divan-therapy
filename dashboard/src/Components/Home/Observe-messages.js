import { useState, useRef, useEffect } from "react";

function UseElementMessageOnScreen(options) {
  let indexFeed = 0;
  let timerFeedback;
  let timerOp;
  let timerVis;
  const containerMessageRef = useRef(null);
  const [isVisibleMessage, setIsVisibleMessage] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisibleMessage(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerMessageRef.current)
      observer.observe(containerMessageRef.current);

    if (isVisibleMessage) {
      //Obtengo los elementos y los oculto
      const contFeedback =
        document.getElementsByClassName("container-feedback");
      for (const i of contFeedback) {
        i.style.display = "none";
      }

      //Visibilidad
      function VisibiltyFeed() {
        clearTimeout(timerVis);

        for (const i of contFeedback) {
          i.style.transitionProperty = "opacity";
          i.style.transitionDuration = "5s";
          i.style.opacity = "1";
        }
        timerVis = setTimeout(VisibiltyFeed, 1000);
      }

      function opacityFeed() {
        clearTimeout(timerOp);

        for (const i of contFeedback) {
          i.style.transitionProperty = "opacity";
          i.style.transitionDuration = "20s";
          i.style.opacity = "0";
        }
        timerOp = setTimeout(opacityFeed, 7000);
      }

      //Carousel
      function carouselFeedback(n) {
        //Cancelar el temporizador
        clearTimeout(timerFeedback);

        if (contFeedback.length > 0) {
          //Ocultar el elemento actual
          contFeedback[indexFeed].style.display = "none";
          indexFeed += n;

          if (indexFeed >= contFeedback.length) {
            //Ir al principio
            indexFeed = 0;
          } else if (indexFeed < 0) {
            //Ir al final
            indexFeed = contFeedback.length - 1;
          }
          //Mostar elemento
          contFeedback[indexFeed].style.display = "flex";
          timerFeedback = setTimeout(carouselFeedback, 7000, 1);
        }
      }
      carouselFeedback(1);
      VisibiltyFeed();
      opacityFeed();
    }
    return () => {
      if (containerMessageRef.current)
        observer.unobserve(containerMessageRef.current);
      clearTimeout(timerFeedback);
      clearTimeout(timerVis);
      clearTimeout(timerOp);
    };
  }, [containerMessageRef, options]);
  return [containerMessageRef, isVisibleMessage];
}

export default UseElementMessageOnScreen;
