import jwt from "jsonwebtoken";
import User from "../models/User";
import db from '../utils/db/dbConnect'
export const isAuth = async (req, res, next) => {
  await db.connect()
  try
  {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified?.id).select("-password");
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally
  {
    await db.disconnect();
  }
};
