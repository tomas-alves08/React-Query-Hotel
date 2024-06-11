import { useEffect, useRef } from "react";

export const useOutsideClick = (handler: Function, propagation = true) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.classList.value.includes(
          (e.target as HTMLElement).classList.value
        )
      ) {
        handler();
      }
    }

    // if (ref.current && ref.current.contains(e.target as Node)) handler();

    document.addEventListener("click", handleClick, propagation);

    return () =>
      document.removeEventListener("click", handleClick, propagation);
  }, [handler]);

  return ref;
};
