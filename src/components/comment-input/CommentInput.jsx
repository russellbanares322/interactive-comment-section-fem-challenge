import React, { useContext } from "react";
import CommentContext from "../../context/CommentContext";

const CommentInput = ({ setShowInput }) => {
  const { commentsData, handleCommentChange, commentsInput, handleAddComment } =
    useContext(CommentContext);
  const profile = commentsData?.currentUser?.image?.png;

  return (
    <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
      <form
        className="flex flex-col py-7 px-5 gap-2 md:flex md:flex-row md:justify-between md:items-start md:py-7 md:px-5 md:gap-2"
        onSubmit={handleAddComment}
      >
        <img className="hidden md:block md:h-7 md:w-7" src={profile} />
        <textarea
          name="content"
          value={commentsInput.content}
          onChange={handleCommentChange}
          className="w-full h-20 p-3 placeholder:text-sm focus:outline-moderate-blue border border-light-gray rounded-lg resize-none text-sm"
          placeholder="Add a comment..."
          type="text"
        />
        <button
          type="submit"
          className="hidden md:block md:bg-moderate-blue md:text-white md:w-[6rem] md:text-sm md:h-[2.3rem] md:rounded-lg md:px-2 md:duration-300 md:ease-in-out md:hover:opacity-40"
        >
          SEND
        </button>
        <div className="visible flex justify-between items-center md:hidden mt-3">
          <img className="h-7 w-7" src={profile} />
          <button
            type="submit"
            className=" bg-moderate-blue text-white w-[6rem] text-sm h-[2.3rem] rounded-lg px-2 duration-300 ease-in-out hover:opacity-40"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
