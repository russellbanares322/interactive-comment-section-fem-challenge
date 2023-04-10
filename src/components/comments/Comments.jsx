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
  const { commentsData, setCommentsData } = useContext(CommentContext);
  const [score, setScore] = useState(comment?.score);
  const commentsID = comment?.id;
  const replyID = comment?.replies?.map((r) => r?.id);
  const currentUser = comment?.user?.username === "juliusomo";

  const [replyInput, setReplyInput] = useState({
    id: replyID + 1,
    content: "",
    createdAt: moment().fromNow(),
  });

  const handleReplyChange = (e) => {
    setReplyInput({ ...replyInput, [e.target.name]: e.target.value });
  };

  const handleIncrementScore = () => {
    setScore((prev) => prev + 1);
  };

  const handleDecrementScore = () => {
    if (score !== 0) {
      setScore((prev) => prev - 1);
    }
  };

  const handleSelectReply = (selectedData) => {
    if (selectedData === commentsID || selectedData === replyID) {
      setShowInput(true);
    }
  };

  const handleDeleteComment = (selectedID) => {
    const newData = { ...commentsData };
    newData?.comments?.filter((comment) => comment?.id !== selectedID) ||
      delete newData?.comments?.map(({ replies }) =>
        replies?.map((r) => r?.[selectedID])
      );
    setCommentsData(newData);
    console.log(newData);
  };

  return (
    <div>
      <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
        <div className="flex justify-start items-center py-4 px-5 gap-5">
          <div className="bg-light-gray flex flex-col gap-3 h-full items-center justify-center px-2 py-3 w-8 rounded-md">
            <div className="cursor-pointer" onClick={handleIncrementScore}>
              <PlusIcon />
            </div>
            <p className="text-moderate-blue font-medium text-sm">{score}</p>
            <div className="cursor-pointer" onClick={handleDecrementScore}>
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
                <div className="flex justify-center items-center gap-6">
                  <button
                    onClick={() => handleDeleteComment(comment?.id)}
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
                  className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2 duration-300 ease-in-out hover:opacity-40"
                >
                  <ReplyIcon />
                  Reply
                </button>
              )}
            </div>
            <div className="mt-5">
              <p className="text-sm text-grayish-blue">
                Impressive! Though it seems the drag feature could be improved.
                But overall it looks incredible. You've nailed the design and
                the responsiveness at various breakpoints works really well.
              </p>
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
        />
      )}
    </div>
  );
};

export default Comments;
