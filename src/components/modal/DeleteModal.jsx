import React, { useContext } from "react";
import CommentContext from "../../context/CommentContext";

const DeleteModal = () => {
  const {
    handleCloseDeleteModal,
    selectedCommentId,
    setCommentsData,
    setIsDeleteModalOpen,
    commentsData,
  } = useContext(CommentContext);

  const handleDeleteComment = () => {
    const repliesId = commentsData.comments.map((comment) =>
      comment.replies.map((reply) => reply.id)
    );

    if (repliesId.includes(selectedCommentId)) {
      const filteredReplyComment = commentsData.comments.map((comment) =>
        comment.replies.filter((reply) => reply.id !== selectedCommentId)
      );

      setCommentsData((prevComments) =>
        prevComments.comments.map((comment) =>
          comment.replies.map((reply) =>
            reply.id === selectedCommentId
              ? reply
              : {
                  ...reply,
                  ...filteredReplyComment,
                }
          )
        )
      );
    } else {
      const filteredComment = commentsData.comments.filter(
        (comment) => comment.id !== selectedCommentId
      );
      setCommentsData({ ...commentsData, comments: filteredComment });
    }

    setIsDeleteModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-dark-blue bg-opacity-50 z-20">
      <div className="translate-y-[-10px] bg-white h-[11rem] w-[17.5rem] z-30 rounded-md p-6">
        <h1 className="text-dark-blue font-medium">Delete comment</h1>
        <p className="text-grayish-blue text-[0.76rem] mt-2">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleCloseDeleteModal}
            className="text-xs text-white font-medium bg-grayish-blue w-[6.7rem] h-[2rem] rounded-md"
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDeleteComment}
            className="text-xs text-white font-medium bg-soft-red w-[6.7rem] h-[2rem] rounded-md"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
