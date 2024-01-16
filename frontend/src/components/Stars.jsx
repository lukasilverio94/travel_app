import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

import PropTypes from "prop-types";

export default function Stars({ post, onRatingChange }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const averageRating =
    post.ratings && post.ratings.length > 0
      ? post.ratings.reduce((sum, rating) => sum + rating, 0) /
        post.ratings.length
      : 0;

  useEffect(() => {
    // Check if post is defined before trying to access its properties
    if (post && post._id) {
      setRating(post.rating || Math.round(averageRating));
    }
  }, [post]);

  const handleRatingChange = (newRating) => {
    // Update the local state
    setRating(newRating);

    // Update the post object with the new rating
    if (post) {
      const updatedPost = {
        ...post,
        rating: newRating,
      };

      // Call the onRatingChange callback with the updated post
      if (onRatingChange) {
        onRatingChange(updatedPost);
      }
    }
  };

  return (
    <>
      <div className="flex ">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={Math.random() * 1000000}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => handleRatingChange(currentRating)}
                className="hidden"
              />
              <FaStar
                className="cursor-pointer "
                size={20}
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <p className="text-slate-500 text-sm pt-1">{rating}.0</p>
    </>
  );
}

Stars.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    ratings: PropTypes.array,
  }),
  onRatingChange: PropTypes.func.isRequired,
};
