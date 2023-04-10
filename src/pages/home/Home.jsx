import React, { useContext } from "react";
import CommentInput from "../../components/comment-input/CommentInput";
import Comments from "../../components/comments/Comments";
import CommentContext from "../../context/CommentContext";

const Home = () => {
  const { commentsData } = useContext(CommentContext);
  return (
    <div>
      {commentsData?.comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
      <CommentInput />
    </div>
  );
};

export default Home;
