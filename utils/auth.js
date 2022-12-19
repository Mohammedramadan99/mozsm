import jwt from "jsonwebtoken";
import User from "../models/User";

export const isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified", verified);
    const id = verified?.id;
    console.log("id", id)
    const user = await User.findById(id).select("-password");
    console.log("user", user)
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
