const Delete_confirm_modal = (prop) => {
  const id = prop.id;
  const comments = prop.comments;
  function handleclick() {
    prop.setShowdelete(false);
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        clean(comments, i);
      } else {
        recursive_check(comments[i]);
      }
    }
  }
  function clean(obj, index) {
    for (let i = index; i < obj.length - 1; i++) {
      obj[i] = obj[i + 1];
    }
    obj.pop();
    prop.updatedata();
  }
  function recursive_check(value) {
    if (value.replies.length > 0 ) { 
      for (let j = 0; j < value.replies.length; j++) {
        if (recursive_check(value.replies[j])) {
          clean(value.replies, j);
          return false;
        }
      }
    } else {
      if (value.id === id) {
        return true;
      }
    }
  }

  return (
    <div className="modal-bg" onClick={() => prop.setShowdelete(false)}>
      <div className="modal">
        <h2>Delete Comment</h2>
        <p>
          {" "}
          Are you sure you want to delete this comment? This will remove the
          omment and can&apos;t be undone.
        </p>
        <div className="buttons">
          <button className="cancel" onClick={() => prop.setShowdelete(false)}>
            NO, CANCEL
          </button>
          <button className="delete" onClick={() => handleclick()}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete_confirm_modal;
