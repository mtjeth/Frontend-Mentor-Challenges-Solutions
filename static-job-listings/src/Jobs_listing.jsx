import Attribute from "./Attribute"
import { useState } from "react";
import Job from "./Job";
import useFetch from "./useFetch";
import Filterbar from "./Filterbar";

const Jobs_listing = () => {
  const {
    data,
    //,isPending,
    //error
  } = useFetch("./data.json");
  //const [data, setdata] = useState(raw_data);
  const blank_filter = {
    role: "",
    level: "",
    languages: [],
    tools: [],
    amount: 0,
  };
  const [showfilter, setshowfilter] = useState(false);
  const [update, setupdate] = useState(false);
  const [data_filter, setdata_filter] = useState(blank_filter);
  const filter_this = (place, value) => {
    let temp = data_filter;
    switch (place) {
      case "role":
        temp.role = value;
        temp.amount += 1;
        break;
      case "level":
        temp.level = value;
        temp.amount += 1;
        break;
      case "languages":
        if (temp.languages.indexOf(value) === -1) {
          temp.languages = [...temp.languages, value];
        }
        temp.amount += 1;
        break;
      case "tools":
        if (temp.tools.indexOf(value) === -1) {
          temp.tools = [...temp.tools, value];
        }
        temp.amount += 1;
        break;
    }
    setshowfilter(true);
    setupdate(false);
    return setdata_filter(temp);
  };
  const filter_show = () => {
    if (data_filter.amount === 0) {
      setshowfilter(false);
    }
    return true;
  };
  const clearup = (place, value) => {
    let temp = data_filter;
    if (place === 0) {
      temp = blank_filter;
    } else {
      switch (place) {
        case "role":
          temp.role = "";
          temp.amount -= 1;
          break;
        case "level":
          temp.level = "";
          temp.amount -= 1;
          break;
        case "languages":
          if (temp.languages.indexOf(value) > -1) {
            temp.languages.splice(temp.languages.indexOf(value), 1);
          }
          temp.amount -= 1;
          break;
        case "tools":
          if (temp.tools.indexOf(value) > -1) {
            temp.tools.splice(temp.tools.indexOf(value), 1);
          }
          temp.amount -= 1;
          break;
      }
    }
    setupdate(false);
    return setdata_filter(temp);
  };
  const filter_system = () => {
    let filtered_data = [];
    const filter_small = (value, filter) => {
      let a = 0;
      filter.map((key) => {
        if (value.indexOf(key) !== -1) {
          a += 1;
        }
      });
      return a === filter.length ? true : false;
    };
    data.map((key) => {
      if (
        (key.role === data_filter.role || data_filter.role === "") &&
        (key.level === data_filter.level || data_filter.level === "") &&
        filter_small(key.languages, data_filter.languages) &&
        filter_small(key.tools, data_filter.tools)
      ) {
        filtered_data.push(key);
      }
    });
    return filtered_data;
  };

  return (
    <>
      <div className="header"></div>
      {showfilter && update && filter_show() && (
        <Filterbar
          data_filter={data_filter}
          showfilter={showfilter}
          clearup={clearup}
        />
      )}
      <div className="job_listing">
        {!update && setupdate(true)}
        {data &&
          update &&
          filter_system().map((id) => (
            <Job
              key={id.id}
              data={id}
              filter_this={filter_this}
              setshowfilter={setshowfilter}
            />
          ))}
        <Attribute />
      </div>
    </>
  );
};

export default Jobs_listing;
