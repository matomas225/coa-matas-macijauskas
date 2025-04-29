import React, { useEffect, useRef } from "react";

type useOnClickOutsideProps = {
  callback: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>;
};

const useOnClickOutside = ({
  callback,
  ignoreRef,
}: useOnClickOutsideProps): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedOutsidePopup = ref.current && !ref.current.contains(target);

      const clickedOutsideIgnore = ignoreRef?.current
        ? !ignoreRef.current.contains(target)
        : true;

      if (clickedOutsidePopup && clickedOutsideIgnore) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return ref;
};

export default useOnClickOutside;
