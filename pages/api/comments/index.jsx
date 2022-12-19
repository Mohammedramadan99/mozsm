import Comment from '../../../models/Comment';
import User from '../../../models/User';
import nc from 'next-connect';

import db from '../../../utils/db/dbConnect';
import { isAuth } from '../../../utils/auth';
import Notification from '../../../models/NotificationsModal';
import Post from '../../../models/Post';
const handler = nc();

//----------------------------------------------------------------
// GET POSTS
//----------------------------------------------------------------

handler.get(async (req, res) =>
{
    await db.connect();
    try
    {
        const post = req?.query?.post

        const comments = post ? await Comment.find({ post }).populate("user").sort("-created") : await Comment.find({}).sort("-created")
        
        res.json(comments);
    } catch (error)
    {
        res.json(error);
    }
    await db.disconnect();

})
//----------------------------------------------------------------
//CREATE POST
//----------------------------------------------------------------
handler.use(isAuth).post(async (req, res) =>
{
    await db.connect();
    
    const user = req.user;
    //Check if user is blocked 
    //2.Get the post Id
    const { postId, description } = req.body;

    try
    {
        const comment = await Comment.create({
            post: postId,
            user,
            description,
        });
        console.log("comment", comment)
        // const post = await Post.findById(postId).populate('comments');
        // await Notification.create({
        //     reactedUser: post?.user._id,
        //     user:req.user._id,
        //     type: "comment",
        //     title:
        //         `${user?.name}
        //         ${(post?.comments?.length - 1) > 0 ?
        //             `and ${post?.comments?.length - 1} others` : ``},
        //             commented on your post: "${comment.description.length > 20 ?
        //             comment.description.slice(0, 20) + "..." : comment.description}"`,
        //     postId: post._id
        // })
        // console.log("comment desc ", comment ? comment : "no comment")
        res.json(comment);
    } catch (error)
    {
        res.json(error.message);
    }
    await db.disconnect();
})

export default handler;