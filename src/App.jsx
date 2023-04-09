import moment from "moment";
import { useContext, useState } from "react";
import CommentInput from "./components/comment-input/CommentInput";
import Comments from "./components/comments/Comments";
import CommentContext from "./context/CommentContext";

function App() {
  const { commentsData } = useContext(CommentContext);

  const [formInput, setFormInput] = useState({
    id: 1,
    content: "",
    createdAt: moment().fromNow(),
  });

  const handleCommentChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  return (
    <div className="font-rubik bg-light-gray flex flex-col justify-center items-center h-full w-full py-4 px-4 md:px-10">
      <div className="h-full w-full md:w-[39rem]">
        {commentsData?.comments?.map((comment) => (
          <Comments key={comment.id} comment={comment} />
        ))}
        <CommentInput
          handleCommentChange={handleCommentChange}
          commentContent={formInput.content}
        />
      </div>
    </div>
  );
}

export default App;
