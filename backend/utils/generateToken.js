import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, "cian2951.", {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export default generateTokenAndSetCookie;
