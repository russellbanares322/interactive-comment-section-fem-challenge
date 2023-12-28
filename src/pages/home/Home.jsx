import moment from "moment";
import React, { useContext, useState } from "react";
import CommentInput from "../../components/comment-input/CommentInput";
import Comments from "../../components/comments/Comments";
import DeleteModal from "../../components/modal/DeleteModal";
import CommentContext from "../../context/CommentContext";

const Home = () => {
  const {
    commentsData,
    setCommentsData,
    isDeleteModalOpen,
    lastCommentId,
    currentUserData,
  } = useContext(CommentContext);
  const [commentValue, setCommentValue] = useState("");

  const handleChangeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: +lastCommentId + 1,
      content: commentValue,
      createdAt: moment().fromNow(),
      replies: [],
      score: 0,
      user: currentUserData,
    };

    setCommentsData([...commentsData, newComment]);
  };

  return (
    <div>
      {isDeleteModalOpen && <DeleteModal />}
      {commentsData?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
      <CommentInput
        commentValue={commentValue}
        handleChangeCommentValue={handleChangeCommentValue}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Home;
