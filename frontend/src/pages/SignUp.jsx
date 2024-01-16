import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const signUpUser = (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "" && user.userName !== "") {
      axios
        .post("/user/new-account", user, {
          withCredentials: true,
        })
        .then((result) => {
          history.push("/");
        })

        .catch((err) => {
          console.error(err);
          toast.error(err.response.data);
        });
    } else {
      toast.error("All fields are required");
    }
  };

  const handleChange = (e) => {
    // Update the state when input values change
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-12 text-gray-700 dark:text-slate-200">
        Sign up
      </h2>
      <form onSubmit={signUpUser} className="w-full max-w-md px-4">
        <label htmlFor="userName" className="block mb-1">
          * Username
        </label>
        <input
          className="w-full border-2 border-gray-300 mb-4  p-2 rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
          type="text"
          id="userName"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="block mb-1">
          * Email
        </label>
        <input
          className="w-full border-2 border-gray-300 mb-4  p-2 rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="block mb-1">
          * Password
        </label>
        <input
          className="w-full border-2 border-gray-300 mb-4  p-2 rounded-lg dark:bg-transparent dark:focus:outline-none dark:focus:border-teal-500"
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-lg"
          type="submit"
        >
          Sign up
        </button>
      </form>

      <Link to="/signIn">
        <p className="mt-2 text-blue-700 dark:text-gray-300">
          Already have account?
          <span className="font-bold hover:underline ml-1 dark:text-teal-300">
            Sign in!
          </span>
        </p>
      </Link>
    </div>
  );
}
