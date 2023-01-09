import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
// import { wrapper } from '../../store/store'

const Posts = dynamic(() => import('./Posts'),{ ssr: false })
// import Posts from './Posts'

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })
// import Sidebar from './Sidebar'

import { useSession } from 'next-auth/react'

function MainPage()
{
    const router = useRouter()
    const dispatch = useDispatch()
    const {data:session} = useSession()
    // const { appErr: posterror } = useSelector(state => state.post)
    // const { appErr: commenterror } = useSelector(state => state.comment)
    
    // useEffect(() =>
    // {
    //     if (userAuth === null)
    //     {
    //         router.push('/login')
    //     }
    // }, [])
    useEffect(() => {
        // dispatch(LoggedInUserAction({email:session?.user?.email}))
    }, [session])
    return (
        <div className='mainPage'>
            <div className="mainPage-container">
                <div className="mainPage__left"> <Sidebar /> </div>
                <Posts direction="mainPage__middle" />
            </div>
        </div>
    )
}
// export const getServerSideProps = wrapper.getServerSideProps(
//     store => async (context) =>
//     {
//         const {query} = context
//         const {like,dislike,comment} = query
//         // const user = store.dispatch(LoggedInUserAction());
//         // const { userAuth } = useSelector(state => state.users)
    
//         // console.log("userAuth", user);
//         // await store.dispatch(fetchUsersAction(4));
//         if(like || dislike || comment) {
//             await store.dispatch(fetchPostsAction());
//         }
//         await store.dispatch(fetchPostsAction());
//         // console.log("getServerSideProps returns ->", data.payload?.users)
//     }
// )
// MainPage.getInitialProps = wrapper.getInitialPageProps(
//     (store) =>
//       async ({ pathname, req, res }) =>
//       {
//         console.log({pathname})
//         await store.dispatch(fetchPostsAction());
//       }
//   );
export default MainPage
