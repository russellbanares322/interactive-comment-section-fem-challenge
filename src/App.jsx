import { useState } from "react";
import CommentInput from "./components/comment-input/CommentInput";
import Comments from "./components/comments/Comments";
import data from "./data/commentsData.json";

function App() {
  const [commentsData, setCommentsData] = useState(data);
  return (
    <div className="font-rubik bg-light-gray flex flex-col justify-center items-center h-full w-full py-4 px-4 md:px-10">
      <div className="h-full w-full md:w-[39rem]">
        {commentsData.comments.map((comment) => (
          <Comments
            setCommentsData={setCommentsData}
            key={comment.id}
            comment={comment}
          />
        ))}
        <CommentInput />
      </div>
    </div>
  );
}

export default App;
