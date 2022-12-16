import mongoose from 'mongoose';
import nc from 'next-connect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import db from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';
import photoUpload from '../../../utils/photoUpload';
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "dtmjc8y9z",
    api_key: "379966828288349",
    api_secret: "a41LSvU3XXAJuQOLxorhOVFPauw",
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb'
        }
    }
}

const handler = nc();


//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await db.connect();
    try {
        const posts = await Post.find().populate('comments').populate('user')
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err.message)
    }
    await db.disconnect();
})

// ----------------------------------------------------------------
// CREATE POST
// ----------------------------------------------------------------

handler.use(isAuth).post(async (req, res) =>
{
    await db.connect();
    const { _id } = req.user;
    
    try
    {
        let images = [];

        if (typeof req.body.images === "string")
        {u
            images.push(req.body.images);
        } else
        {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++)
        {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "ecommerce",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        const post = await Post.create({
            ...req.body,
            user: _id,
            image: imagesLinks[0]?.url
        });
        res.json(post);
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();
})


export default handler;

// export const config = {
//     runtime: 'experimental-edge',
// }