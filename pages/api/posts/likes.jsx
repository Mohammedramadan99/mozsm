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

        // await Notification.create({
        //     user: post?.user._id,
        //     reactedUser: req.user._id,
        //     type: "like",
        //     title: `${req?.user?.name} ${post?.likes?.length - 1 > 0 ? `and ${post?.likes?.length - 1} others` : ``}, liked your post`,
        //     content: `"${post?.description}"`,
        //     postId: post._id
        // })
        //2. Find the login user
        const loginUserId = req?.user?.id;
        console.log("user Id", loginUserId )
        //3. Find is this user has liked this post?
        const isLiked = post?.isLiked;
        //4.Chech if this user has dislikes this post
        const alreadyDisliked = post?.disLikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );
        console.log("alreadyDisliked", alreadyDisliked)
        //5.remove the user from dislikes array if exists
        if (alreadyDisliked)
        {
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { disLikes: loginUserId },
                    isDisLiked: false,
                    reactionClass: "like"
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200).json({
                success: true,
                post
            });
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
            res.status(200).json({
                success: true,
                post
            });
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
            res.status(200).json({
                success: true,
                post
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    } finally
    {
        // await db.disconnect()
    }
    
})
export default handler;


