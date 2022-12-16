import React from 'react'
import { useSelector } from 'react-redux'
import Person from './Person'

function MayKnow()
{
    //! maybe i will need to dispatch the action of userslist
    const { usersList, userAuth } = useSelector(state => state.users)
    const usersFiltered = usersList?.filter(user => user?._id !== userAuth?._id)

    return (
        <div className='People__mainPage__mayKnow'>
            <div className="People__mainPage__mayKnow__title">people you may know</div>
            <div className="People__mainPage__mayKnow__list">
                {usersFiltered?.map((user, i) => <Person key={i} dir="People__mainPage__mayKnow__list" user={user} />)}
            </div>
        </div>
    )
}

export default MayKnow