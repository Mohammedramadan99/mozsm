import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db/dbConnect';
import { signToken } from '../../../utils/auth';
import generateToken from '../../../utils/token/generateToken';

const handler = nc();
handler.post(async (req, res) =>
{
    await db.connect();
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email }).populate('notifications');
    //check if blocked
    if (userFound && (await userFound.isPasswordMatched(password)))
    {
        //Check if password is match
        res.json({
            _id: userFound?._id,
            name: userFound?.name,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
            isVerified: userFound?.isAccountVerified,
            following: userFound?.following,
            followers: userFound?.followers,
        });
    } else
    {
        res.status(401);
        throw new Error("Invalid Login Credentials");
    }
    await db.disconnect();

});

export default handler;