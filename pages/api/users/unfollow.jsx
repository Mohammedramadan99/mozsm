import User from '../../../models/User';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db/dbConnect'
const handler = nc();

handler.use(isAuth).put(async (req, res) =>
{
    await db.connect();
    try {
        const { unFollowId } = req.body;
        const loginUserId = req.user.id;
        console.log(unFollowId)
        await User.findByIdAndUpdate(
            unFollowId,
            {
                $pull: { followers: loginUserId },
                isFollowing: false,
            },
            { new: true }
        );

        await User.findByIdAndUpdate(
            loginUserId,
            {
                $pull: { following: unFollowId },
            },
            { new: true }
        );

        res.status(200).json("You have successfully unfollowed this user");
    } catch (err) {
        res.statusCode(500).json(err.message)
    }
    
    await db.disconnect();

})
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb' // Set desired value here
        }
    }
}
export default handler;