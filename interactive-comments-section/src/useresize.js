import { useState, useEffect, useRef } from "react";

const useResize = () => {
  const listRef = useRef();
  const [width, setWidth] = useState("");
  const getListSize = () => {
    const newWidth = listRef.current.clientWidth;
    setWidth(newWidth < 450 ? "sm" : "");
  };
  useEffect(() => {
    getListSize();
  }, [width]);
  useEffect(() => {
    window.addEventListener("resize", getListSize);
  });
  return { width, listRef };
};

export default useResize;
