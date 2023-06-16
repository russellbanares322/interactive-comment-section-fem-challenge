import moment from "moment";
import React, { useContext, useState } from "react";
import CommentContext from "../../context/CommentContext";
import {
  DeleteIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
  ReplyIcon,
} from "../../data/Icons";
import CommentInput from "../comment-input/CommentInput";

const Comments = ({ comment }) => {
  const [showInput, setShowInput] = useState(false);
  const { handleOpenDeleteModal, setCommentsData, commentsData } =
    useContext(CommentContext);

  const replyID = comment?.replies?.map((r) => r?.id);
  const currentUser = comment?.user?.username === "juliusomo";
  const commentsID = comment?.id;
  const [replyInput, setReplyInput] = useState({
    id: replyID + 1,
    content: "",
    createdAt: moment().fromNow(),
  });

  const handleReplyChange = (e) => {
    setReplyInput({ ...replyInput, [e.target.name]: e.target.value });
  };

  const handleIncrementScore = (selectedId) => {
    const updatedComments = commentsData.comments.map((comment) => {
      if (comment.id === selectedId) {
        const updatedScore = comment.score + 1;
        return {
          ...comment,
          score: updatedScore,
        };
      }
      return comment;
    });
    setCommentsData({
      ...commentsData,
      comments: updatedComments,
    });
  };

  const handleDecrementScore = (selectedId) => {
    const updatedComments = commentsData.comments.map((comment) => {
      if (comment.id === selectedId) {
        const updatedScore =
          comment.score === 0 ? comment.score : comment.score - 1;
        return {
          ...comment,
          score: updatedScore,
        };
      }
      return comment;
    });
    setCommentsData({
      ...commentsData,
      comments: updatedComments,
    });
  };

  const handleSelectReply = (selectedCommentID) => {
    if (selectedCommentID === commentsID || selectedCommentID === replyID) {
      setShowInput(!showInput);
    }
  };

  return (
    <div>
      <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
        <div className="flex justify-start items-center py-4 px-5 gap-5">
          <div className="hidden md:bg-light-gray md:flex md:flex-col md:gap-3 md:h-full md:items-center md:justify-center md:px-2 md:py-3 md:w-8 md:rounded-md">
            <div
              className="cursor-pointer"
              onClick={() => handleIncrementScore(comment.id)}
            >
              <PlusIcon />
            </div>
            <p className="text-moderate-blue font-medium text-sm">
              {comment.score}
            </p>
            <div
              className="cursor-pointer"
              onClick={() => handleDecrementScore(comment.id)}
            >
              <MinusIcon />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <img className="h-7 w-7" src={comment?.user?.image?.png} />
                <p className="text-dark-blue font-medium text-sm">
                  {comment?.user?.username}
                </p>
                {currentUser && (
                  <p className="text-xs text-white bg-moderate-blue px-[5px] py-[0.3px] font-medium rounded-sm">
                    you
                  </p>
                )}
                <p className="text-sm text-grayish-blue">
                  {comment?.createdAt}
                </p>
              </div>
              {currentUser && (
                <div className="hidden md:flex md:justify-center md:items-center md:gap-6">
                  <button
                    onClick={() => handleOpenDeleteModal(comment?.id)}
                    className="flex items-center justify-center text-soft-red text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                  <button className="flex items-center justify-center text-moderate-blue text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40">
                    <EditIcon /> Edit
                  </button>
                </div>
              )}
              {!currentUser && (
                <button
                  onClick={() => handleSelectReply(comment?.id)}
                  className="hidden md:text-sm md:text-moderate-blue md:font-medium md:flex md:justify-center md:items-center md:gap-2 md:duration-300 md:ease-in-out md:hover:opacity-40"
                >
                  <ReplyIcon />
                  Reply
                </button>
              )}
            </div>
            <div className="mt-5">
              <p
                className={`text-sm text-grayish-blue ${
                  comment?.content?.split(" ")?.includes("@") &&
                  "text-moderate-blue font-medium"
                }`}
              >
                {comment?.content}
              </p>
            </div>
            <div className="md:hidden flex justify-between items-center mt-4">
              <div className="bg-light-gray flex gap-5 h-8 items-center justify-center px-2 py-3 w-24 rounded-md ">
                <div className="cursor-pointer" onClick={handleIncrementScore}>
                  <PlusIcon />
                </div>
                <p className="text-moderate-blue font-medium text-sm">
                  {comment.score}
                </p>
                <div className="cursor-pointer" onClick={handleDecrementScore}>
                  <MinusIcon />
                </div>
              </div>
              <div>
                {!currentUser && (
                  <button
                    onClick={() => handleSelectReply(comment?.id)}
                    className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2 duration-300 ease-in-out hover:opacity-40"
                  >
                    <ReplyIcon />
                    Reply
                  </button>
                )}
                {currentUser && (
                  <div className="flex justify-center items-center gap-6">
                    <button
                      onClick={() => handleOpenDeleteModal(comment?.id)}
                      className="flex items-center justify-center text-soft-red text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40"
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                    <button className="flex items-center justify-center text-moderate-blue text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40">
                      <EditIcon /> Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative md:before:absolute md:before:left-10 md:before:top-2 md:before:h-full md:before:border-l md:before:border-light-grayish-blue flex flex-col justify-end items-end">
        {comment?.replies?.map((comment) => (
          <div className="w-full md:w-[36rem] pl-0 md:pl-7" key={comment?.id}>
            <Comments comment={comment} />
          </div>
        ))}
      </div>
      {showInput && (
        <CommentInput
          handleReplyChange={handleReplyChange}
          replyContent={replyInput.content}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
};

export default Comments;
