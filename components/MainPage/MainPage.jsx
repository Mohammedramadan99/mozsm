import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import { toggleAddLikesToPost, toggleAddDisLikesToPost, fetchPostsAction } from '../../store/postsSlice'
// import { wrapper } from '../../store/store'

const Posts = dynamic(() => import('./Posts'),{ ssr: false })

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

function MainPage({ posts })
{
    const router = useRouter()
    const { userAuth, serverErr, appErr: usererror } = useSelector(state => state.users)
    // const { appErr: posterror } = useSelector(state => state.post)
    // const { appErr: commenterror } = useSelector(state => state.comment)
    
    // useEffect(() =>
    // {
    //     if (userAuth === null)
    //     {
    //         router.push('/login')
    //     }
    // }, [])

    return (
        <div className='mainPage'>
            <div className="mainPage-container">
                <div className="mainPage__left"> <Sidebar /> </div>
                <Posts direction="mainPage__middle" posts={posts} />
            </div>
        </div>
    )
}
export default MainPage
// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) =>
// {
//     await store.dispatch(fetchPostsAction(''));
// });