import bcrypt from 'bcryptjs';
import { NotFoundError, ValidationError } from "../utils/customError.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../model/User.js";

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new NotFoundError("user not found", 404));
  }

  const matching = await bcrypt.compare(password, user.password);

  if (!matching) {
    return next(new ValidationError("The Email or password is incorrect", 404));
  }

  generateToken(user, res);
  res.status(200).json({ status: "success", message: "Admin Logged in successfully",user });
};

// admin logout
export const adminLogout = async (req, res) => {
  res.clearCookie("admtoken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("admrefreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("admin", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ status: "success", message: "Logout successful" });
};
