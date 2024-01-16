// authUtils.js
import axios from "axios";

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      return {
        username: JSON.parse(localStorage.getItem("user")).username,
        avatar: JSON.parse(localStorage.getItem("user")).avatar,
      };
    } catch (error) {
      console.error("Error fetching user information:", error.message);
    }
  }

  return {};
};
