import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  if (user.role === "admin") {
    const admtoken = jwt.sign(
      { id: user._id, admin: true },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );

    const admrefreshToken = jwt.sign(
      { id: user._id, admin: true },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // Set cookies for admin only
    res.cookie("admin", user, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("admtoken", admtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.cookie("admrefreshToken", admrefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } else {
    res.status(403).json({ message: "Access only for user." });
  }
};

export { generateToken };
