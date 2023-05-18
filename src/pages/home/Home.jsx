import React, { useContext } from "react";
import CommentInput from "../../components/comment-input/CommentInput";
import Comments from "../../components/comments/Comments";
import DeleteModal from "../../components/modal/DeleteModal";
import CommentContext from "../../context/CommentContext";

const Home = () => {
  const { commentsData, isDeleteModalOpen } = useContext(CommentContext);
  console.log(commentsData);
  return (
    <div>
      {isDeleteModalOpen && <DeleteModal />}
      {commentsData?.comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
      <CommentInput />
    </div>
  );
};

export default Home;
