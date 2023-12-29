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
  const { currentUserData, commentsData, setCommentsData } =
    useContext(CommentContext);
  const isCurrentUser =
    comment?.user?.username === currentUserData?.user?.username;
  const [replyCommentOptions, setReplyCommentOptions] = useState({
    showInput: false,
    replyCommentValue: "",
    selectedCommentId: null,
  });
  const showReplyButton = comment?.replies !== undefined;

  const handleShowInput = (replyId) => {
    setReplyCommentOptions({
      ...replyCommentOptions,
      showInput: true,
      selectedCommentId: replyId,
    });
  };

  const handleHideInput = () => {
    setReplyCommentOptions({
      showInput: false,
      replyCommentValue: "",
      selectedCommentId: null,
    });
  };

  const handleChangeReplyCommentValue = (e) => {
    setReplyCommentOptions({
      ...replyCommentOptions,
      replyCommentValue: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const selectedRepliesData = commentsData?.find(
      (prevComment) => prevComment.id === replyCommentOptions.selectedCommentId
    )?.replies;
    const recipientName = commentsData?.find(
      (prevComment) => prevComment.id === replyCommentOptions.selectedCommentId
    )?.user?.username;
    const lastReplyId = parseInt(
      selectedRepliesData.map((reply) => reply.id).slice(-1)
    );

    const newReply = {
      id: lastReplyId + 1,
      content: replyCommentOptions.replyCommentValue,
      createdAt: moment().fromNow(),
      score: 0,
      replyingTo: recipientName,
      user: currentUserData,
    };

    setCommentsData((prevComments) =>
      prevComments.map((prevComment) =>
        prevComment.id === replyCommentOptions.selectedCommentId
          ? {
              ...prevComment,
              replies: [...prevComment.replies, newReply],
            }
          : prevComment
      )
    );
    handleHideInput();
  };

  console.log(commentsData);
  return (
    <div>
      <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
        <div className="flex justify-start items-center py-4 px-5 gap-5">
          <div className="hidden md:bg-light-gray md:flex md:flex-col md:gap-3 md:h-full md:items-center md:justify-center md:px-2 md:py-3 md:w-8 md:rounded-md">
            <div className="cursor-pointer">
              <PlusIcon />
            </div>
            <p className="text-moderate-blue font-medium text-sm">
              {comment.score}
            </p>
            <div className="cursor-pointer">
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
                {isCurrentUser && (
                  <p className="text-xs text-white bg-moderate-blue px-[5px] py-[0.3px] font-medium rounded-sm">
                    you
                  </p>
                )}
                <p className="text-sm text-grayish-blue">
                  {comment?.createdAt}
                </p>
              </div>
              {isCurrentUser && (
                <div className="hidden md:flex md:justify-center md:items-center md:gap-6">
                  <button className="flex items-center justify-center text-soft-red text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40">
                    <DeleteIcon />
                    Delete
                  </button>
                  <button className="flex items-center justify-center text-moderate-blue text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40">
                    <EditIcon /> Edit
                  </button>
                </div>
              )}
              {showReplyButton && !isCurrentUser && (
                <button
                  onClick={() => handleShowInput(comment?.id)}
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
                <div className="cursor-pointer">
                  <PlusIcon />
                </div>
                <p className="text-moderate-blue font-medium text-sm">
                  {comment.score}
                </p>
                <div className="cursor-pointer">
                  <MinusIcon />
                </div>
              </div>
              <div>
                {showReplyButton && !isCurrentUser && (
                  <button
                    onClick={() => handleShowInput(comment?.id)}
                    className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2 duration-300 ease-in-out hover:opacity-40"
                  >
                    <ReplyIcon />
                    Reply
                  </button>
                )}
                {isCurrentUser && (
                  <div className="flex justify-center items-center gap-6">
                    <button className="flex items-center justify-center text-soft-red text-sm font-medium gap-2 duration-300 ease-in-out hover:opacity-40">
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
      {replyCommentOptions.showInput && (
        <CommentInput
          handleChangeCommentValue={handleChangeReplyCommentValue}
          commentValue={replyCommentOptions.replyCommentValue}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Comments;
