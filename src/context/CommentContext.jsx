import React, { createContext, useState } from "react";
import data from "../data/commentsData.json";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const convertedCommentsData = Object.values(data);
  const currentUserData = convertedCommentsData[0];
  const [commentsData, setCommentsData] = useState(convertedCommentsData[1]);
  const lastCommentId = parseInt(commentsData.map((c) => c.id).slice(-1));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleOpenDeleteModal = (commentId) => {
    setSelectedCommentId(commentId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <CommentContext.Provider
      value={{
        commentsData,
        currentUserData,
        setCommentsData,
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        lastCommentId,
        selectedCommentId,
        setIsDeleteModalOpen,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
