import { useState, useEffect } from "react";
import main_data from './data';

const useFetch = () => {
  const [data, setdata] = useState(null);
  useEffect(() => { 
    if (!localStorage.getItem("userData")) {
      setdata(main_data); 
    } else {
      setdata(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  
  return { data };
};

export default useFetch;
