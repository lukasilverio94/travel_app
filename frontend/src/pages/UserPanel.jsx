import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useParams, Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAvatar } from "../components/AvatarContext";
// Firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../config/firebase.config.js";

const UserPanel = () => {
  const { avatar, updateAvatar } = useAvatar();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/user/search/${username}`);
        // console.log("Backend Response:", response.data);

        // Ensure that the response has the expected structure
        const userInfo = response.data.userInfo;
        if (!userInfo) {
          console.error("Invalid response structure. Missing userInfo.");
          return;
        }
        // Update user details, including avatar
        setUser({
          ...userInfo,
          avatar: userInfo.avatar || "/assets/avatar.png", // Use a default avatar if not provided
        });

        updateAvatar(userInfo.avatar);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username, refresh]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file in the Avatar context for preview
      updateAvatar(file);
    } else {
      console.warn("No file selected.");
    }
  };

  const handleUpload = async () => {
    try {
      const storage = getStorage(app);

      if (!avatar) {
        console.error("Please select a file for upload.");
        return;
      }

      const fileName = new Date().getTime() + avatar.name;
      const storageRef = ref(storage, "avatars/" + fileName);

      await uploadBytesResumable(storageRef, avatar, {
        contentType: avatar.type,
      });

      // Get the public URL of the uploaded file
      const avatarURL = await getDownloadURL(storageRef);
      console.log("Avatar url: ", avatarURL);

      // Update the user's avatar in the state (no need to wait for backend response)
      updateAvatar(avatarURL); // Ensure that this is resolved before proceeding

      setUser((prevUser) => {
        return { ...prevUser, avatar: avatarURL };
      });

      // Update the avatar URL in local storage
      localStorage.setItem("avatar", avatarURL);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      // Set uploading to false once done
      setUploading(false);
    }
  };
  return (
    <div className="w-full py-6 mx-auto mt-20 px-4  dark:bg-gray-950 dark:text-slate-300 leading-normal">
      <div className=" mx-auto p-6 shadow-md dark:shadow-sm dark:shadow-white rounded-md">
        <BackButton />

        <div className="mb-4 text-center rounded-full">
          <img
            className="rounded-full w-full max-w-[150px]"
            src={user.avatar ? user.avatar : "/assets/avatar.png"}
            alt={`avatar from ${username}`}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 mt-3">User Details</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {user.userName}
            </p>

            <div className="flex flex-col mt-4">
              <h2 className="text-lg font-semibold mb-2">Upload Avatar:</h2>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {uploading && <p className="text-sm mt-2">Uploading...</p>}
            </div>

            <button
              className="w-full max-w-[200px] bg-teal-500 text-white py-2 rounded mt-2 dark:bg-gray-500"
              onClick={handleUpload}
            >
              Add/Upload Avatar
            </button>

            <h2 className="text-3xl md:text-5xl text-teal-600 font-bold mt-6 mb-8 dark:text-white">
              Your posts:
            </h2>
            {user.posts && user.posts.length > 0 ? (
              <div
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
              >
                {user.posts.map((post) => (
                  <div
                    key={post._id}
                    className="w-full  md:w-full lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    {post.images && post.images.length > 0 && (
                      <img
                        className="w-full rounded-lg h-32 sm:h-52 object-cover"
                        src={post.images[0]}
                        alt={post.place}
                      />
                    )}
                    <div className="p-5">
                      <h5 className="text-2xl dark:text-white">{post.title}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {post.description.slice(0, 100)}...
                      </p>
                      <Link to={`/posts/details/${post._id}`} className="my-1">
                        <span className="flex items-center text-teal-700 dark:text-teal-400 ">
                          <span className="hover:text-lg  dark:text-teal-400">
                            Read more
                          </span>
                          <FaArrowRightLong className="ms-1" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xl">You still didn't post.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
