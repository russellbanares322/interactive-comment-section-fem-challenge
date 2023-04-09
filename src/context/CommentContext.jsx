import React, { createContext, useState } from "react";
import data from "../data/commentsData.json";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState(data);
  return (
    <CommentContext.Provider value={{ commentsData, setCommentsData }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
