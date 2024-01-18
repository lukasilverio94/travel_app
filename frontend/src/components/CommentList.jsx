import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { MdOutlineDelete, MdOutlineReply } from "react-icons/md";
import { getUserFromLocalStorage } from "../helper/getUserLocalStorage";

const CommentList = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [refresh, setRefresh] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [reply, setReply] = useState({ replyText: "" });
  const [loading, setLoading] = useState(false);
  const user = getUserFromLocalStorage();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/details/${post._id}`);
        setComments(response.data.comments);
        setRefresh((prevRefresh) => !prevRefresh);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post._id, refresh]);

  //toggle reply mode
  const handleReplyMode = () => {
    setIsReplyMode(!isReplyMode);
  };
  //submit reply on comment
  const submitReply = async (e, commentId) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`/comments/update/${commentId}`, {
        replyText: reply.replyText,
        writer: user ? user.username : "",
      });

      // Update the comment in the state with the new reply
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: [...comment.replies, response.data.comment],
              }
            : comment
        );
        return updatedComments;
      });

      setReply({ replyText: "" });
      setIsReplyMode(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating comment:", error);
      setLoading(false);
    }
  };

  const handleDeleteComment = (id) => {
    axios
      .delete(`/comments/delete/${id}`)
      .then(() => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <div>
      <h3>Comments:</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="pt-2 bg-slate-100 border-2 border-gray-700 p-3 my-2 lg:w-full rounded-lg dark:bg-gray-800 dark:text-slate-200 relative max-w-lg"
          >
            <div className="flex flex-col justify-between">
              <div className="my-2  border-2 p-2 rounded-lg border-gray-600 w-full ">
                <strong className="text-lg">{comment.writer}: </strong>
                <p>{comment.commentText}</p>
              </div>
              <ul className="flex flex-col items-start ml-2 pl-3">
                {comment.replies.map((reply) => (
                  <li
                    key={reply._id}
                    className="my-2  border-2 p-2 rounded-lg border-gray-600 w-full"
                  >
                    <strong>{reply.writer} </strong>
                    <p>{reply.replyText}</p>
                  </li>
                ))}
              </ul>
              {user && user.username === comment.writer ? (
                <div className="flex flex-col items-start mt-2 gap-2 dark:text-gray-900">
                  {isReplyMode ? (
                    <form
                      onSubmit={(e) => submitReply(e, comment._id)}
                      className="max-w-md flex flex-col items-start w-full"
                    >
                      <input
                        className="w-full border dark:text-gray-900  border-gray-300 mb-2 px-3 py-2 rounded"
                        type="text"
                        placeholder={`add a reply to ${comment.writer}'s comment `}
                        onChange={(e) =>
                          setReply({ ...reply, replyText: e.target.value })
                        }
                      />
                      <button
                        className="dark:bg-gray-400 bg-teal-800 text-white py-2 px-4 rounded "
                        type="submit"
                      >
                        {loading ? "Posting..." : "Send"}
                      </button>
                    </form>
                  ) : null}
                  <div className="flex items-center justify-between w-full mt-2">
                    <button
                      onClick={handleReplyMode}
                      className="text-teal-600 dark:text-slate-200 hover:underline flex items-center"
                    >
                      <span className="mr-1">
                        <MdOutlineReply />
                      </span>
                      Reply
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      <MdOutlineDelete className="text-slate-600 dark:text-gray-200 text-3xl cursor-pointer mb-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {isReplyMode ? (
                    <form
                      onSubmit={(e) => submitReply(e, comment._id)}
                      className="max-w-md"
                    >
                      <input
                        className="w-full border border-gray-300 mb-2 px-3 py-2 rounded dark:text-gray-900"
                        type="text"
                        placeholder={`add a reply to ${comment.writer}'s comment `}
                        onChange={(e) =>
                          setReply({ ...reply, replyText: e.target.value })
                        }
                      />
                      <button
                        className="bg-teal-500 dark:bg-gray-500 text-white py-1 px-2 rounded self-end"
                        type="submit"
                      >
                        {loading ? "Posting..." : "Send reply"}
                      </button>
                    </form>
                  ) : null}
                  <button
                    onClick={handleReplyMode}
                    className="text-teal-600 dark:text-slate-200 hover:underline flex items-center"
                  >
                    <span className="mr-1">
                      <MdOutlineReply />
                    </span>
                    Reply
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentList;
