import React from "react";
import { MinusIcon, PlusIcon, ReplyIcon } from "../../data/Icons";
// import CommentInput from "../comment-input/CommentInput";

const Comments = ({ comment, depth }) => {
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
              <button className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2">
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
      {comment?.replies?.map((comment) => (
        <div className="w-full md:w-[35rem]" key={comment?.id}>
          <Comments depth={depth + 10} comment={comment} />
        </div>
      ))}
      {/* <CommentInput /> */}
    </div>
  );
};

export default Comments;
