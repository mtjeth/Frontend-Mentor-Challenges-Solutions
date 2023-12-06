import { useState } from "react";
import Comment_input_box from "./Comment_input_box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import useResize from "./useresize";
import ReactTextareaAutosize from "react-textarea-autosize";

const Comment_box = (prop) => {
  const data = prop.data;
  const id = data.id;
  const user = prop.user;
  const name = data.user.username;
  const profile_picture = data.user.image.png
    ? data.user.image.png
    : data.user.image.webp;
  const content = data.content;
  const createdAt = data.createdAt;
  const replies = data.replies;
  const [inputshow, setinputshow] = useState(false);
  const { width, listRef } = useResize();
  const [edit, setedit] = useState(false);
  const [edited_comment, setedited_comment] = useState(content);
  function applyedit() {
    if (
      edited_comment != content &&
      edited_comment != "" &&
      typeof edited_comment === "string"
    ) {
      data.content = edited_comment;
      prop.updatedata();
    }
  }
  function compareByscore(a, b) {
    return b.score - a.score;
  }
  function scoresort() {
    prop.scoreparent.sort(compareByscore);
    prop.updatedata();
  }

  return (
    <div className="comment">
      <div className={"comment_box " + width} ref={listRef}>
        <div className="left">
          <div className="score">
            <button onClick={() => ((data.score += 1), scoresort())}>
              {" + "}
            </button>
            <p>{data.score}</p>
            <button onClick={() => ((data.score -= 1), scoresort())}>
              {" - "}
            </button>
          </div>
        </div>
        <div className="right">
          <div className="top">
            <img className="profile_img" alt="name" src={profile_picture} />
            <p className="profile">
              {name}
              {name === user.username ? <span>you</span> : ""}
            </p>
            <p>{createdAt} </p>
          </div>
          <div className="content">
            {!edit ? (
              <ReactTextareaAutosize
                className="current_comment"
                value={content}
                readOnly
              />
            ) : (
              edit && (
                <div className="editor">
                  <ReactTextareaAutosize
                    value={edited_comment}
                    onChange={(e) => setedited_comment(e.target.value)}
                  />
                  <button
                    className="confirm"
                    onClick={() => {
                      setedit(false), applyedit();
                    }}
                  >
                    Update
                  </button>
                </div>
              )
            )}
          </div>
        </div>
        {name === user.username ? (
          <div className="buttons">
            <button
              className="delete"
              onClick={() => {
                prop.setShowdelete(true), prop.setid(id);
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
            <button
              className="edit"
              onClick={() => {
                setedit(true);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
              Edit
            </button>
          </div>
        )
         : (
          <div className="buttons">
            <button onClick={() => setinputshow(true)}>
              <FontAwesomeIcon icon={faReply} />
              Reply
            </button>
          </div>
        )}
      </div>
      {inputshow && (
        <Comment_input_box
          updatedata={prop.updatedata}
          user={user}
          parent={data}
          setinputshow={setinputshow}
          lastid={prop.lastid}
        />
      )}
      {replies && (
        <div className={"reply " + width}>
          <div className="spacer">
            <div className="line"></div>
          </div>
          <div className="reply_box">
            {replies.map((co) => {
              return (
                <Comment_box
                  updatedata={prop.updatedata}
                  data={co}
                  scoreparent={replies}
                  key={co.id}
                  user={user}
                  setShowdelete={prop.setShowdelete}
                  setid={prop.setid}
                  lastid={prop.lastid}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment_box;
