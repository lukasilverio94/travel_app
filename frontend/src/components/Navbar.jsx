import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserInfo } from "../utils/authUtil.js";
import ThemeBtn from "./ThemeBtn.jsx";
import { MdLogout } from "react-icons/md";
import { useAvatar } from "./AvatarContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { avatar, updateAvatar } = useAvatar();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserInfo = async () => {
    const userInfo = await fetchUserInfo();
    setUsername(userInfo.username);
    setIsLoading(false);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      // Update the avatar in the context
      updateAvatar(storedAvatar);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    toggleNav(false); // close  navigation menu when a link is clicked
  };
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-white py-2 border-gray-200 dark:bg-gray-900 fixed w-full top-0 left-0 z-10 px-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="flex gap-1">
            <img src="/assets/logo.png" alt="Logo" style={{ width: "45px" }} />
            <span className="self-center font-oswald text-3xl  text-teal-800  whitespace-nowrap dark:text-slate-200">
              On the road
            </span>
          </div>
        </Link>
        <button
          onClick={toggleNav}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isNavOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>

        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:flex flex  md:w-auto`}
          id="navbar-search"
        >
          <ul className="flex flex-col md:items-center w-full p-4 md:p-0 mt-4 font-semibold border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3  rounded md:bg-transparent  md:p-0 hover:text-teal-800 hover:underline dark:hover:text-teal-500 dark:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts/create"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3 text-gray-900 rounded   md:hover:bg-transparent md: md:p-0 dark:text-white  dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 hover:text-teal-800 hover:underline dark:hover:text-teal-500"
                  >
                    Add post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locations"
                    onClick={handleLinkClick}
                    className="block py-2 pe-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md: md:p-0  dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 hover:text-teal-800 hover:underline dark:hover:text-teal-500"
                  >
                    Suggestions
                  </Link>
                </li>
                {!isLoading && (
                  <li>
                    <Link
                      to={`/userPanel/${username}`}
                      className="my-1"
                      onClick={handleLinkClick}
                    >
                      <span className="flex items-center gap-1 dark:text-white ">
                        Profile <FaUserCircle />
                      </span>
                    </Link>
                  </li>
                )}

                <li>
                  <Link to="/logout" onClick={handleLinkClick}>
                    <span className="text-gray-800 dark:text-slate-300 text-md  hover:underline dark:hover:text-teal-500 flex items-center gap-1">
                      Logout <MdLogout />
                    </span>
                  </Link>
                </li>
                <li className="mb-1">
                  <ThemeBtn />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin" onClick={handleLinkClick}>
                    <h2 className="text-slate-800 text-lg hover:underline dark:text-gray-200 dark:hover:text-teal-300">
                      Login
                    </h2>
                  </Link>
                </li>
                <ThemeBtn />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
