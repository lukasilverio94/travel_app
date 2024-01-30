// Import the functions you need from the SDKs you need
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isImageValid } from "../utils/imageFormatUtils.js";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";
import { app } from "../config/firebase.config.js";
//Helper function getUserLocal storage
import { getUserFromLocalStorage } from "../helper/getUserLocalStorage.js";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();

  // Add Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storage = getStorage(app);
      const imagePaths = [];

      // Check if the image format is valid
      if (!isImageValid(files)) {
        setError(
          "Some of the selected files are not in a supported format. Please only upload files in JPEG or PNG format."
        );

        // clear the error message after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 4000);

        return;
      }

      setLoading(true);

      // Upload files to Firebase Storage
      for (let i = 0; i < files.length; i++) {
        const fileName = new Date().getTime() + files[i].name;
        const storageRef = ref(storage, "images/" + fileName);
        await uploadBytesResumable(storageRef, files[i], {
          contentType: files[i].type,
        });

        // Get the public URL of the uploaded file
        const publicUrl = await getDownloadURL(storageRef);

        imagePaths.push(publicUrl);
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("place", place);
      formData.append("description", description);

      if (user) {
        formData.append("writer", user.username);
        formData.append("writerId", user.userId);
      }

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      // Send other form data and image URLs to your server
      const response = await axios.post(
        "/posts",
        formData,
        {
          title,
          place,
          description,
          writer: JSON.parse(localStorage.getItem("user")).username,
          writerId: JSON.parse(localStorage.getItem("user")).userId,
          images: imagePaths,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      toast.success("Post added successfully", {
        autoClose: 1000,
        position: "top-right",
      });

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);

      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 mt-16 dark:bg-gray-950 dark:text-slate-200 w-full">
      <div className="mt-8 ml-2 lg:ml-56">
        <BackButton />
      </div>
      <form
        encType="multipart/form-data"
        className="flex flex-col mb-6 rounded-xl w-full sm:w-100 lg:max-w-[800px] p-3 m-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl lg:text-5xl sm:text-3xl my-2 text-teal-600 mb-5 dark:text-slate-200">
          New post:
        </h1>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600 dark:text-slate-200">
            Post title
          </label>
          <input
            type="text"
            className="border-2 border-slate-600 px-4 py-2 w-full rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
            placeholder="Title for your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600 dark:text-slate-200">
            Location
          </label>
          <input
            type="text"
            className="border-2 border-slate-600 px-4 py-2 w-full rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
            placeholder="Location from your adventure"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600 dark:text-slate-200">
            Description
          </label>
          <textarea
            className="border-2 border-slate-600 px-4 py-2 min-h-[250px] w-full rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
            placeholder="Tell us your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Upload image */}
        <div>
          <h4 className="text-teal-600 dark:text-slate-200 text-lg font-semibold mb-2">
            Add images to post
          </h4>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        <button
          className="rounded-lg p-2 bg-teal-700 w-100 dark:bg-gray-500 dark:hover:bg-gray-400 text-white my-3"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
}
