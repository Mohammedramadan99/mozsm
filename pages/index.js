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
    store => async (context) =>
  {
    const session = await getSession(context)

    const {query} = context
    const {like,dislike,comment} = query
    console.log({session})

    // if(like || dislike || comment) {
    //   await store.dispatch(fetchPostsAction());
    //   await store.dispatch(LoggedInUserAction(session?.user?.email));
    //   // await store.dispatch(LoggedInUserAction());
    //   console.log("#1 reaction",query)
    // }
    // // await store.dispatch(fetchUsersAction(4));
    await store.dispatch(fetchPostsAction());
    await store.dispatch(getCommentsAction());

    await store.dispatch(fetchUsersAction(4));
    await store.dispatch(LoggedInUserAction(session?.user?.email));
    // console.log("getServerSideProps returns ->", data.payload?.users)
  }
)
// Home.getInitialProps = wrapper.getInitialPageProps(
//   (store) =>
//     async ({ pathname, req, res }) =>
//     {
//       console.log({pathname})
//       await store.dispatch(fetchPostsAction());
//       await store.dispatch(fetchUsersAction(4));
//     }
// );