import moment from "moment";
import React, { createContext, useState } from "react";
import data from "../data/commentsData.json";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState(data);
  const commentID = commentsData?.comments?.map((c) => c?.id).slice(-1);

  const [commentsInput, setCommentsInput] = useState({
    content: "",
  });

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
    console.log(newComment);
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
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
