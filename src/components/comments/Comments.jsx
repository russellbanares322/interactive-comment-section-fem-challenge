import React, { useState } from "react";
import { MinusIcon, PlusIcon, ReplyIcon } from "../../data/Icons";
import CommentInput from "../comment-input/CommentInput";

const Comments = ({ comment }) => {
  const [showInput, setShowInput] = useState(false);

  const commentsID = comment?.id;
  const replyID = comment?.replies?.map((r) => r?.id);

  const handleSelectReply = (selectedID) => {
    if (selectedID === commentsID || selectedID === replyID) {
      setShowInput(true);
    }
    console.log(selectedID);
  };

  return (
    <div>
      <div className="bg-white h-auto rounded-md mt-3 md:mt-3">
        <div className="flex justify-start items-center py-4 px-5 gap-5">
          <div className="bg-light-gray flex flex-col gap-3 h-full items-center justify-center px-2 py-3 w-8 rounded-md">
            <PlusIcon />
            <p className="text-moderate-blue font-medium text-sm">
              {comment?.score}
            </p>
            <MinusIcon />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <img className="h-7 w-7" src={comment?.user?.image?.png} />
                <p className="text-dark-blue font-medium text-sm">
                  {comment?.user?.username}
                </p>
                <p className="text-sm text-grayish-blue">
                  {comment?.createdAt}
                </p>
              </div>
              <button
                onClick={() => handleSelectReply(comment?.id)}
                className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2"
              >
                <ReplyIcon />
                Reply
              </button>
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
      <div className="relative md:before:absolute md:before:left-10 md:before:top-4 md:before:h-5/6 md:before:border-l md:before:border-light-grayish-blue flex flex-col justify-end items-end">
        {comment?.replies?.map((comment) => (
          <div className="w-full md:w-[36rem] pl-0 md:pl-7" key={comment?.id}>
            <Comments comment={comment} />
          </div>
        ))}
      </div>
      {showInput && <CommentInput />}
    </div>
  );
};

export default Comments;
