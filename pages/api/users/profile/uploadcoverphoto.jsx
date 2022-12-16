import nc from 'next-connect';
// import Post from '../../../../models/Post';

import fs from "fs"
import cloudinary from 'cloudinary'
import db from '../../../../utils/db/dbConnect';
import { isAuth } from '../../../../utils/auth';
import User from '../../../../models/User';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb' // Set desired value here
        }
    }
}
const handler = nc();

//----------------------------------------------------------------
// GET user details
//----------------------------------------------------------------
cloudinary.config({
    cloud_name: 'dtmjc8y9z',
    api_key: '379966828288349',
    api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});
handler.use(isAuth).put(async (req, res) =>
{
    await db.connect();
    const { _id } = req.user;
    console.log("back: " + _id)
    try
    {
        const result = await cloudinary.v2.uploader.upload(req?.body?.image, {
            folder: "blog",
        });
        const url = result?.secure_url

        const foundUser = await User.findByIdAndUpdate(
            _id,
            {
                coverPhoto: url,
            },
            { new: true }
        );
        res.json(foundUser);
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();

})


export default handler;