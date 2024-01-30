import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CommentList from "./CommentList";
//helper function localstorage user
import { getUserFromLocalStorage } from "../helper/getUserLocalStorage";

export default function Comments({ post }) {
  const user = getUserFromLocalStorage();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState({
    postId: post._id,
    commentText: "",
    writer: JSON.parse(localStorage.getItem("user")).username,
  });

  const [refreshComments, setRefreshComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = getUserFromLocalStorage();
    if (userFromLocalStorage) {
      const parsedUser = userFromLocalStorage;
      setComment((prevComment) => ({
        ...prevComment,
        writer: parsedUser.username,
      }));
    }
  }, []);

  const toggleShowComment = () => {
    setShowComment((prevShowComment) => !prevShowComment);
  };

  const submitComment = (e) => {
    e.preventDefault();

    if (comment.commentText.trim() !== "") {
      setLoading(true);

      axios
        .post("/comments/newComment", comment, {
          withCredentials: true,
        })
        .then(() => {
          setComment({ ...comment, commentText: "" });
          // Toggle the refreshComments state to trigger a re-render of CommentList
          setRefreshComments((prevRefresh) => !prevRefresh);
        })
        .catch((err) => {
          console.error("Error posting comment", err);
          setError("Error posting comment");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Comment text is required");
    }
  };

  return (
    <div className="container mb-2">
      <form onSubmit={submitComment} className="w-full max-w-[600px]">
        <input
          className="w-full border border-gray-300 mb-4 px-3 py-2 rounded dark:text-gray-950"
          type="text"
          placeholder={`add a comment to ${post.writer}`}
          value={comment.commentText}
          onChange={(e) =>
            setComment({ ...comment, commentText: e.target.value })
          }
        />
        <button
          className="w-full bg-teal-500 dark:bg-gray-500 dark:text-slate-200 dark:hover:bg-gray-400 text-white py-2 rounded"
          type="submit"
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        onClick={toggleShowComment}
        className="my-2 font-semibold text-teal-600 dark:text-slate-200"
      >
        {showComment ? "Hide Comment" : "View all Comments"}
      </button>
      {showComment && <CommentList post={post} refresh={refreshComments} />}
    </div>
  );
}

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};
