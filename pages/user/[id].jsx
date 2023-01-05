
import dynamic from 'next/dynamic'
// import UserDetails from "../../components/UserDetails/UserDetails"
import { routerAnimation } from '../../utils/animations'
import { motion } from "framer-motion";
import { wrapper } from "../../store/store"
import { fetchUserDetailsAction, fetchUsersAction, LoggedInUserAction, userProfileAction } from "../../store/usersSlice"
import {getCommentsAction} from '../../store/postsSlice'
import { getSession } from 'next-auth/react';
const UserDetails = dynamic(() => import('../../components/UserDetails/UserDetails'))
function userDetails()
{
  return <motion.div variants={routerAnimation}
    initial="initial"
    animate="animate"
    exit="exit">
    <UserDetails />
  </motion.div>
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) =>
  {
    const session = await getSession(context)
    const { params } = context
    const { id } = params
    await store.dispatch(userProfileAction(id))
    await store.dispatch(fetchUsersAction());
    await store.dispatch(getCommentsAction())
    await store.dispatch(LoggedInUserAction(session?.user?.email));
  }
)

export default userDetails

// export const getServerSideProps = wrapper.getServerSideProps( store =>  ({ req, res,params}) =>
// {

//   // const data = {id:params.id }
//   // store.dispatch(userProfileAction(data))
// });