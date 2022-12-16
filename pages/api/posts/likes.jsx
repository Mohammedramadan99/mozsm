import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect';
import Post from '../../../models/Post';
import Notification from '../../../models/NotificationsModal';
import { Notifications } from '@mui/icons-material';
const handler = nc();

handler.use(isAuth).patch(async (req, res) =>
{
    await db.connect();
    try {
        //1.Find the post to be liked
        const { postId } = req?.body;
        const post = await Post.findById(postId);
        //2. Find the login user
        const loginUserId = req?.user?.id;
        console.log(req.user);
        //3. Find is this user has liked this post?
        const isLiked = post?.isLiked;
        //4.Chech if this user has dislikes this post
        const alreadyDisliked = post?.disLikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        //5.remove the user from dislikes array if exists
        if (alreadyDisliked)
        {
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { disLikes: loginUserId },
                    isDisLiked: false,

                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.json(post);
        }
        //Toggle
        //Remove the user if he has liked the post
        if (isLiked)
        {
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,

                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            
            res.json(post);
        } else
        {
            //add to likes
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: { likes: loginUserId },
                    isLiked: true,

                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200).json(post);
            
            await Notification.create({
                user: post?.user._id,
                reactedUser: req.user._id,
                type: "like",
                title: `${req?.user?.name} ${post?.likes?.length - 1 > 0 ? `and ${post?.likes?.length - 1} others` : ``}, liked your post`,
                content: `"${post?.description}"`,
                postId: post._id
            })
        }
        // const notification = await Notification.find({postId})
        // console.log("notification", notification.title)
        // if (notification?.type === "like")
        // {
        //     const notifId = notification._id
        //     await Notification.findByIdAndRemove(notifId)
        //     await Notification.create({
        //         user: post?.user._id,
        //         type: "like",
        //         title: `${req?.user?.name} ${post?.likes?.length - 1 > 0 ? `and ${post?.likes?.length - 1} others` : ``}, liked your post`,
        //         content: `"${post?.description}"`,
        //         postId
        //     })
        // } else
        // {
            // }
        
        
    } catch (err) {
        res.status(500).json(err.message)
    }
        await db.disconnect();
})
export default handler;


