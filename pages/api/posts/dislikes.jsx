import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect';
import Post from '../../../models/Post';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb' // Set desired value here
        }
    }
}
const handler = nc();

handler.use(isAuth).put(async (req, res) =>
{
    try
    {
        // await db.connect();
        //1.Find the post to be disLiked
        const { postId } = req?.body;
        const post = await Post.findById(postId);
        //2.Find the login user
        console.log("post", post)
        const loginUserId = req?.user?._id;
        //3.Check if this user has already disLikes
        const isDisLiked = post?.isDisLiked;
        //4. Check if already like this post
        const alreadyLiked = post?.likes?.find(
            (userId) => userId.toString() === loginUserId?.toString()
        );
        //Remove this user from likes array if it exists
        if (alreadyLiked)
        {
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $pull: { likes: loginUserId },
                    isLiked: false,
                    reactionClass: "dislike"
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
        //Toggling
        //Remove this user from dislikes if already disliked
        if (isDisLiked)
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
            res.status(200).json({
                success: true,
                post
            });
        } else
        {
            const post = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: { disLikes: loginUserId },
                    isDisLiked: true,
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
    } catch (error)
    {
        res.status(500).json({
            message: error.message,
        })
    }
    finally
    { 
        await db.disconnect()
    }
})

export default handler;