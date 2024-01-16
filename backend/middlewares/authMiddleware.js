import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify the token

  jwt.verify(token.split(" ")[1], process.env.SECRET, (err, user) => {
    if (err) {
      // If there's an error, return an unauthorized status
      return res.sendStatus(403);
    }
    // Set the user information in the request for further use
    req.user = user;
    next();
  });
};
