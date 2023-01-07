import dynamic from 'next/dynamic';
// const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import MainPage from '../components/MainPage/MainPage';
import { wrapper } from "../store/store";

import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction, userProfileAction } from '../store/usersSlice';
import { useSelector } from 'react-redux';
import { fetchPostsAction, getCommentsAction } from '../store/postsSlice';
import { getSession } from 'next-auth/react';


export default function Home() {
  return (
    <motion.div
      variants={routerAnimation} 
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MainPage />
    </motion.div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async ({req,res,context}) =>
  {
    const session = await getSession(context)

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    await store.dispatch(fetchPostsAction({url:baseUrl}));
    await store.dispatch(fetchUsersAction({url:baseUrl,props:4}));
    await store.dispatch(getCommentsAction({url:baseUrl}));
    // await store.dispatch(LoggedInUserAction({url:baseUrl,email:session?.user?.email}));
  }
)
// Home.getInitialProps = wrapper.getInitialPageProps(
//   (store) =>
//     async ({ pathname, req, res }) =>
//     {
//       const protocol = req.headers['x-forwarded-proto'] || 'http'
//       const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
//       console.log({baseUrl})
//       await store.dispatch(fetchPostsAction({url:baseUrl}));
//       await store.dispatch(fetchUsersAction({url:baseUrl,props:4}));
//     }
// );