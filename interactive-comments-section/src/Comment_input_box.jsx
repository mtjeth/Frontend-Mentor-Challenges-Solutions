import { useState } from "react";
import useResize from "./useresize";
import ReactTextareaAutosize from "react-textarea-autosize";

const Comment_input_box = (data) => {
  const userimg = data.user.image.png ? data.user.image.png : data.user.image.webp;
  const [comment, setComment] = useState("");
  const parent = data.parent; 
  function handleclick() {

    if (data.setinputshow !== "") {
      if(comment !== "" ){  
        parent["replies"].push({ "id": data.lastid()+1, "content":comment, "createdAt":"today","score":0, "replyingTo": parent.user.username , "user":data.user,"replies": []});
        data.setinputshow(false); 
        data.updatedata();
        setComment(""); 
      }else{
        data.setinputshow(false);
      }
    }else{
      if(comment !== "" ){  
        parent["comments"].push({ "id": data.lastid()+1, "content":comment, "createdAt":"today","score":0, "user":data.user,"replies": []});
        data.updatedata();
        setComment("");  
      }
    }
  }   


  const { width, listRef } = useResize();

  return (
    <div className="input">
      <div className={"comment_box " + width} ref={listRef}>
        <img className="profile_img" src={userimg} alt="profile" />
        <ReactTextareaAutosize placeholder="Add a comment..." value={comment} minRows="3" onChange={(e) => setComment(e.target.value)} /> 
        <button className="confirm" onClick={() => handleclick()}>
          {(data.setinputshow !== "")? "Reply": "Send" }
        </button>
      </div>
    </div>
  );
};

export default Comment_input_box;
