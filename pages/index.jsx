import dynamic from 'next/dynamic';
// const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import MainPage from '../components/MainPage/MainPage';
import { wrapper } from "../store/store";

import { motion } from "framer-motion";
import { routerAnimation } from "../utils/animations";
import { fetchUsersAction, LoggedInUserAction } from '../store/usersSlice';
import { fetchPostsAction, getAllPosts, getCommentsAction, testo } from '../store/postsSlice';
import { getSession } from 'next-auth/react';
import db from '../utils/db/dbConnect';
// import { getPosts } from './api/posts';


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
    const {req} = context
    const session = await getSession({ req });
    const data = Promise.all([
    await store.dispatch(fetchPostsAction()),
    await store.dispatch(fetchUsersAction(4)),
    await store.dispatch(LoggedInUserAction({email:session.user.email})),
  ])
  console.log("serversidedata", data)
})

// export const getServerSideProps = wrapper.getServerSideProps(
//     store => async (context) =>
    
//   {
    
//     const {req} = context
//     const session = await getSession({ req });
//     const protocol = req.headers['x-forwarded-proto'] || 'http'
//     const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
//     // const posts = await getPosts()
//     // await db.connect();
//     // const res = await fetch(`http://localhost:3000/api/posts`);
//     // const res = await fetch(`${baseUrl}/api/posts`);
//     // const data = await res.json();

//     // console.log({data})
//     // const { data } = await axios.post(
//       //   `${link}`,
//       //   {email:"ramadanmohammed502@gmail.com"}
//       // );
//     //   let link = `${baseUrl}/api/users/profile`;
//     //   const response = await fetch(link, {
//     //   method: "POST",
//     //   body: {email:"ramadanmohammed502@gmail.com"},
//     // });
//     // const data = await response.json();

//       // console.log("#1 mohammedRamadan",data)
//       await store.dispatch(fetchPostsAction());
//     // store.dispatch(getAllPosts(data));
//     await store.dispatch(fetchUsersAction(4));
//     // await store.dispatch(getCommentsAction({url:baseUrl}));
//     await store.dispatch(LoggedInUserAction({email:session.user.email}));
    
//     // await db.disconnect();

//   }
// )
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