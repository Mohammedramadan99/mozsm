import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import dynamic from 'next/dynamic'
import UserDetails from "../../components/UserDetails/UserDetails"

// const UserDetails = dynamic(() => import('../../components/UserDetails/UserDetails'))
function userDetails()
{
  return <UserDetails />
}

export default userDetails

// export const getServerSideProps = wrapper.getServerSideProps( store =>  ({ req, res,params}) =>
// {

//   const data = { req, id:params.id }
//   store.dispatch(userProfileAction(data))
// });