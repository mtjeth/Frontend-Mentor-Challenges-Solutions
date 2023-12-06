import { useState } from "react";
import Comment_list from "./Comment_list";
import useFetch from "./usefetch";
import Delete_confirm_modal from "./Delete_confirm_modal";
import Comment_input_box from "./Comment_input_box";
import Attribute from "./Attribute"

const Home = () => {
  const {data} = useFetch();
  const [showdelete, setShowdelete] = useState(false);
  const [id, setid] = useState(); 
  const [updated, setupdated] = useState(true);

  function updatedata(){
    localStorage.setItem("userData", JSON.stringify(data));
    setupdated(false);
  }
  function lastid() {
    let id = 0;
    data.comments.map((key) => {
      let temp = recursive_id(key);
      if (temp > id) {
        id = temp;
      }
    });
    return id;
  }
  function recursive_id(value) {
    let id = value.id;
    if (value.replies && value.replies.length > 0) {
      value.replies.map((key) => {
        let temp = recursive_id(key);
        if (temp > id) {
          id = temp;
        }
      });
    }
    return id;
  } 

  return (
    <>
      {data && updated && (
        <div className="comment_list">
          <Comment_list 
          data_main={data}
          updatedata={updatedata}
          setShowdelete={setShowdelete}
          setid={setid}
          lastid={lastid}
        /> 
        <div className="main-comment">
          <Comment_input_box user={data.currentUser} parent={data} setinputshow="" lastid={lastid}  updatedata={updatedata}/>
        </div>
        </div>
        
        
      )}
      {!updated && setupdated(true)}
      {showdelete && (
        <Delete_confirm_modal
          updatedata={updatedata}
          setShowdelete={setShowdelete}
          comments={data.comments}
          id={id}
        />
      )}
      <Attribute />
    </>
  );
};

export default Home;
