import { useEffect, useState } from "react";

function useBlinkingElipses(
  delay: number,
  startNumElipses = 0,
  endNumElipses = 3
) {
  const [elipses, setElipses] = useState("");
  const [repeatCount, setRepeatCount] = useState(startNumElipses);

  useEffect(() => {
    const interval = setInterval(() => {
      setRepeatCount((prevCount) => {
        setElipses(".".repeat(prevCount));
        if (prevCount === endNumElipses) {
          return startNumElipses;
        }
        return ++prevCount;
      });
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return elipses;
}

export default useBlinkingElipses;
