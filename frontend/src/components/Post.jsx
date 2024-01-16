import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { FaArrowRightLong } from "react-icons/fa6";
import Comments from "./Comments";
import PropTypes from "prop-types";
import Stars from "./Stars";
import Carousel from "./Carousel";
import axios from "axios";
import { getStorage } from "firebase/storage";

const Post = ({ post }) => {
  console.log("Post Prop:", post);

  // Initialize Firebase storage instance
  const storage = getStorage();

  const handleRatingChange = async (updatedPost) => {
    try {
      // Update the server with the new rating
      await axios.put(`/posts/update/${post._id}`, {
        rating: updatedPost.rating,
      });
    } catch (error) {
      console.error("Error updating rating on server:", error);
    }
  };

  const averageRating =
    post.ratings && post.ratings.length > 0
      ? post.ratings.reduce((sum, rating) => sum + rating, 0) /
        post.ratings.length
      : 0;

  return (
    <div
      style={{
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
      key={post._id}
      className="w-full flex flex-col border-t-2 dark:border-t dark:border-slate-200 pt-7 pb-3 mt-5 mb-3 md:col-span-1"
    >
      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-full sm:w-full lg:w-2/3 flex flex-col gap-y-1 flex-grow">
          <h3 className="text-teal-600 text-3xl dark:text-slate-200">
            {post.title}
          </h3>
          <div className="my-1">
            <Stars post={post} onRatingChange={handleRatingChange} />
          </div>
          <p className="text-slate-800 text-2xl dark:text-slate-300">
            {post.place}
          </p>
          <p className="dark:text-slate-300">
            {post.description.slice(0, 80)}...
          </p>
          <Link to={`posts/details/${post._id}`} className="my-1">
            <span className="flex items-center text-teal-700 dark:text-teal-400 ">
              <span className="hover:text-lg  dark:text-teal-400">
                Read more
              </span>
              <FaArrowRightLong className="ms-1" />
            </span>
          </Link>
          <small>
            {formatDistance(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}
            <span> by {post.writer}</span>
          </small>
          <Comments post={post} />
        </div>
        {post.images && <Carousel images={post.images} storage={storage} />}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    writer: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    images: PropTypes.array,
    ratings: PropTypes.array,
  }).isRequired,
};

export default Post;
