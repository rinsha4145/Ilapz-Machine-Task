import jwt from "jsonwebtoken";

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const admtoken = req.cookies.admtoken;

    if (!admtoken) {
      return res.status(401).json({ message: "Authentication token missing" }); // Return to avoid further execution
    }

    jwt.verify(admtoken, process.env.ADM_JWT_KEY, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ message: "Invalid token" }); // Return here as well
      }

      req.user = user;
      console.log(req.user);
      next(); // Only call next if token is valid
    });
  } catch (error) {
    console.error("Error in adminAuthMiddleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
