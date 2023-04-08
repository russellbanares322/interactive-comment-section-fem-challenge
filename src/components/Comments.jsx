import React from "react";
import { MinusIcon, PlusIcon, ReplyIcon } from "../data/Icons";
import sample from "../assets/avatars/image-amyrobson.png";

const Comments = () => {
  return (
    <div>
      <div className="bg-white h-auto rounded-md">
        <div className="flex justify-start items-center py-3 px-5 gap-5">
          <div className="bg-light-gray flex flex-col gap-3 h-full items-center justify-center p-2 w-8 rounded-md">
            <PlusIcon />
            <p className="text-moderate-blue font-medium text-sm">12</p>
            <MinusIcon />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <img className="h-7 w-7" src={sample} />
                <p className="text-dark-blue font-medium text-sm">amyrobson</p>
                <p className="text-sm text-grayish-blue">1 month ago</p>
              </div>
              <button className="text-sm text-moderate-blue font-medium flex justify-center items-center gap-2">
                <ReplyIcon />
                Reply
              </button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-grayish-blue">
                Impressive! Though it seems the drag feature could be improved.
                But overall it looks incredible. You've nailed the design and
                the responsiveness at various breakpoints works really well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
