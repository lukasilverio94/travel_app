import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogIn = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };

    if (email !== "" && password !== "") {
      try {
        const response = await axios.post("/user/login", data);

        localStorage.setItem("token", response.data);
        toast.success("You are logged in");

        // Use navigate to navigate without reloading the page
        window.location.href = "/";
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response.data);
      }
    } else {
      toast.error("Email and Password are required");
    }
  };

  return (
    <div className="flex flex-col  md:flex-row items-center justify-center h-screen md:w-full dark:text-gray-300 dark:bg-gray-950 px-4">
      {/* Left column with image (to be added) */}
      <div className="p-4 hidden md:block dark:bg-gray-950">
        {/* image */}
        <div>
          <img src="/assets/hero_banner.png" alt="Login photo" />
        </div>
      </div>

      {/* Right column with login form */}
      <div className="md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-700 dark:text-slate-200 ">
          Sign in
        </h2>
        <form onSubmit={submitLogIn} className="w-full max-w-md">
          <input
            className="w-full border-2 border-gray-300 mb-4  p-2 rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
            type="email"
            placeholder=" * Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border-2 border-gray-300 mb-4  p-2 rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
            type="password"
            placeholder=" * Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>

        <Link to="/signUp">
          <p className="mt-2 text-blue-700 dark:text-gray-300">
            Don't have an account yet?
            <span className="font-bold hover:underline ml-1 dark:text-teal-300">
              Sign up!
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
}
