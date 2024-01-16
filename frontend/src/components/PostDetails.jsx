import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AlertBox from "../components/AlertBox";

const PostDetails = ({
  post,
  isEditMode,
  handleInputChange,
  handleImageDelete,
  handleSave,
  handleEditMode,
}) => {
  return (
    <div className="w-full bg-white p-6 mt-7 dark:bg-gray-950 dark:text-slate-200 leading-loose">
      <h3 className="text-teal-600 text-3xl mb-4 dark:text-white">
        {isEditMode ? (
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full border-b-2 border-teal-600 focus:outline-none text-xl dark:bg-transparent dark:border-gray-300 dark:p-2"
          />
        ) : (
          post.title
        )}
      </h3>
      <p className="text-slate-800 text-2xl  mb-2 dark:text-slate-200">
        {isEditMode ? (
          <input
            type="text"
            name="place"
            value={post.place}
            onChange={handleInputChange}
            className="w-full border-b-2 border-teal-600 focus:outline-none dark:bg-transparent dark:border-2 dark:p-2 dark:border-gray-300"
          />
        ) : (
          post.place
        )}
      </p>
      {isEditMode ? (
        <textarea
          name="description"
          value={post.description}
          onChange={handleInputChange}
          className="w-full border-2 p-2 border-teal-600 focus:outline-none mb-4 resize-none dark:bg-transparent dark:border-2 dark:border-gray-300"
          style={{
            minHeight: "200px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        />
      ) : (
        <p className="text-slate-800 mb-4 leading-loose break-words overflow-hidden dark:text-slate-200">
          {post.description}
        </p>
      )}

      <div className="flex items-center gap-4 mt-2">
        <Link to={`/posts/delete/${post._id}`}>
          <span className="bg-red-600 text-white px-4 py-2 rounded-md dark:bg-red-600">
            Delete
          </span>
        </Link>
        {isEditMode && (
          <button
            className="bg-teal-600 text-white px-4 py-1 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {!isEditMode && (
          <button
            className="bg-slate-800 text-white px-4 py-1 rounded-md dark:bg-gray-500"
            onClick={handleEditMode}
          >
            Edit
          </button>
        )}
      </div>
      {/* Render images */}
      {post.images.length > 0 && <AlertBox />}
      {console.log(post.images)}
      {post.images && post.images.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {post.images.map((image, index) => (
            <div key={index} className="relative">
              {/* Display image */}
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onClick={() => console.log(`Clicked on image ${index + 1}`)}
              />
              {/* Delete button (visible to the post owner) */}
              {JSON.parse(localStorage.getItem("user")).username ===
                post.writer && (
                <button
                  className="absolute top-2 right-2 text-2xl bg-transparent text-white px-2 py-1 rounded-md"
                  onClick={() => handleImageDelete(index)}
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {/* End images */}
    </div>
  );
};

export default PostDetails;
