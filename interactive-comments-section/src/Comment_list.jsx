import Comment_box from "./Comment_box"; 



const Comment_list = (data) => {
  const comments = data.data_main.comments;
  const user = data.data_main.currentUser;

  return (
    <div className="posted_comment">
      {comments.map((co) => {
        return (
          <Comment_box
            updatedata={data.updatedata}
            data={co}
            scoreparent={comments}
            user={user} 
            key={co.id}
            setShowdelete={data.setShowdelete}
            setid={data.setid} 
            lastid={data.lastid}
          />
        );
      })}
    </div>
  );
};

export default Comment_list;
