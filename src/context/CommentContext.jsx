import moment from "moment";
import React, { createContext, useState } from "react";
import data from "../data/commentsData.json";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const commentID = commentsData?.comments?.map((c) => c?.id).slice(-1);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentsInput, setCommentsInput] = useState({
    content: "",
  });

  const handleOpenDeleteModal = (commentId) => {
    setSelectedCommentId(commentId);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCommentChange = (e) => {
    setCommentsInput({ ...commentsInput, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = { ...commentsData };
    newComment?.comments?.push({
      id: +commentID + 1,
      content: commentsInput.content,
      createdAt: moment().fromNow(),
      replies: [],
      score: 0,
      user: {
        image: {
          png: commentsData?.currentUser?.image?.png,
          webp: commentsData?.currentUser?.image?.webp,
        },
        username: "juliusomo",
      },
    });
    setCommentsData(newComment);
    setCommentsInput({
      content: "",
    });
  };

  return (
    <CommentContext.Provider
      value={{
        commentsData,
        setCommentsData,
        commentsInput,
        setCommentsInput,
        handleCommentChange,
        handleAddComment,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        selectedCommentId,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
