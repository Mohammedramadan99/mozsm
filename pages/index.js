import dynamic from 'next/dynamic';
const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
// import MainPage from '../components/MainPage/MainPage';
import { wrapper } from "../store/store";

import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction, getCommentsAction } from '../store/postsSlice';
import { getSession } from 'next-auth/react';
import axios from 'axios';


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
    // store => async ({req,res,...rest}) =>
  {
    const {req} = context
    const session = await getSession({ req });

    console.log("firstHellow",session)
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    let link = `${baseUrl}/api/users/profile`;
      const { data } = await axios.post(
        `${link}`,
        {email:session?.user?.email}
      );

    await store.dispatch(fetchPostsAction({url:baseUrl}));
    // await store.dispatch(fetchUsersAction({url:baseUrl,props:4}));
    // await store.dispatch(getCommentsAction({url:baseUrl}));
    // await store.dispatch(LoggedInUserAction(data));
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