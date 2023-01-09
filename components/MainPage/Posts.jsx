import { useEffect, useState } from 'react'

import WritePost from './WritePost'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
import { stagger } from '../../utils/animations'
import { motion } from 'framer-motion'
// import MyPost from './MyPost'
const Post = dynamic(() => import('./Post'))
// import Post from './Post'
const Spinner = dynamic(() => import('../Spinner'))

function Posts({ direction, user })
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    const { userAuth } = useSelector(state => state.users)
    const [postLiked, setPostLiked] = useState(false)
    const [postDisLiked, setPostDisLiked] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const comment = useSelector(state => state?.comments);
    const { postLists, isCreated, postCreated, loading:postloading } = useSelector(state => state.posts)
    const { profile } = useSelector(state => state.users)
    const { likes, dislikes } = useSelector(state => state.posts)
    const { loading, appErr, serverErr, commentCreated } = comment;
    const [showComments, setShowComments] = useState({ post: "", status: false })
    const [currPost, setCurrPost] = useState({})
    // useEffect(() =>
    // {
    //     // id && dispatch(userProfileAction(id))
    // }, [dispatch, id, likes, dislikes, commentCreated])

    // useEffect(() =>
    // {
    //     // !id && dispatch(fetchPostsAction(""));
    // }, [isCreated, postCreated, dispatch, likes, dislikes, commentCreated]);



    const openCommentHandler = (post) =>
    {
        setShowComments({ post: post._id, status: !showComments.status })
    }
    if (!router.isFallback && !postLists)
    {
        return <div>404</div>;
    }
    return router.isFallback ? (<div>Loading...</div>)
        : (
        <div className={direction}>
                <WritePost dir={direction} userDetails={user} />
                {/* <MyPost /> */}
                {postloading && (
                    <div style={{position:"relative"}}>
                        <Spinner />
                    </div>
                )}
            {direction === "mainPage__middle" ? (
                    postLists?.map(p => (
                        <motion.div variants={stagger} initial="initial" animate="animate" key = { p._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                            <Post  post = { p } direction = { direction } />
                        </motion.div>
                    )
                        )

            ) : direction === "user__bottom__postsGroup" && (
                !user?.posts || user?.posts?.length === 0 ? (
                    <p style={{ textAlign: "center", textTransform: "capitalize", marginTop: "40px" }}>there is not posts yet</p>
                ) : (
                    user?.posts?.map(p => (
                    <motion.div variants={stagger} initial="initial" animate="animate" key = { p._id } className={`${direction}__posts__container`} style={{ position: 'relative' }}>
                        <Post  direction = { direction } profile = { profile } post = { p } />
                    </motion.div>

                    ))
                )
            )}
        </div>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     store => async () =>
//     {

//         // const user = store.dispatch(LoggedInUserAction());
//         // const { userAuth } = useSelector(state => state.users)
//         // console.log("userAuth", user);
//         const data = await store.dispatch(fetchPostsAction());
//         console.log("posts data", data)
//         // await store.dispatch(userProfileAction(user?._id));
//         // console.log("getServerSideProps returns ->", data.payload?.users)
//     }
// )

export default Posts