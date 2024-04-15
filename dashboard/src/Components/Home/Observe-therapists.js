import { useState, useRef, useEffect } from "react";

function UseElementOnScreen(options) {
  let index = 0;
  let timerOpacity;
  let timerVisiblity;
  let timer;

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);
    if (isVisible) {
      //Visibilidad del elemento
      function Visibilty() {
        clearTimeout(timerVisiblity);

        for (const i of form) {
          i.style.transitionProperty = "opacity";
          i.style.transitionDuration = "5s";
          i.style.opacity = "1";
        }
        timerVisiblity = setTimeout(Visibilty, 1000);
      }

      function opacity() {
        clearTimeout(timerOpacity);

        for (const i of form) {
          i.style.transitionProperty = "opacity";
          i.style.transitionDuration = "20s";
          i.style.opacity = "0";
        }
        timerOpacity = setTimeout(opacity, 7000);
      }
      //Obtengo los elementos y los oculto
      const form = document.getElementsByClassName("form-therapists");

      for (const i of form) {
        i.style.display = "none";
      }
      //Caruosel
      function carousel(n) {
        //Cancelar el temporizador
        clearTimeout(timer);
        if (form.length > 0) {
          //Ocultar el elemento actual
          form[index].style.display = "none";
          index += n;

          if (index >= form.length) {
            //Ir al principio
            index = 0;
          } else if (index < 0) {
            //Ir al final
            index = form.length - 1;
          }

          //Mostar elemento
          form[index].style.display = "flex";
          timer = setTimeout(carousel, 7000, 1);
        }
      }
      carousel(1);
      Visibilty();
      opacity();
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      clearTimeout(timer);
      clearTimeout(timerVisiblity);
      clearTimeout(timerOpacity);
    };
  }, [containerRef, options]);
  return [containerRef, isVisible];
}

export default UseElementOnScreen;
