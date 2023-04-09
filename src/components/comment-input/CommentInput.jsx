import React from "react";
import profile from "/image-juliusomo.png";

const CommentInput = ({
  handleReplyChange,
  handleCommentChange,
  replyContent,
  commentContent,
}) => {
  return (
    <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
      <div className="flex justify-between items-start py-7 px-5 gap-2">
        <img className="h-7 w-7" src={profile} />
        <textarea
          name="content"
          value={replyContent}
          onChange={handleReplyChange}
          className="w-full h-20 p-3 placeholder:text-sm focus:outline-moderate-blue border border-light-gray rounded-lg resize-none"
          placeholder="Add a comment..."
          type="text"
        ></textarea>
        <button className="bg-moderate-blue text-white w-[6rem] text-sm h-[2.3rem] rounded-lg px-2 duration-300 ease-in-out hover:opacity-40">
          SEND
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
