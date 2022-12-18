import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
function Person({ dir, user })
{
    const { userAuth } = useSelector(state => state.users)

    return (
        <div className={`${dir}__person`}>
            <div className={`${dir}__person__img`}>
                <img src={user?.profilePhoto} alt="profilePhoto" />
            </div>
            <div className={`${dir}__person__info`}>
                <div className={`${dir}__person__info__name`}>
                    {user?.name}
                </div>
                <Link href={`/user/${user._id}`} className={`${dir}__person__info__btn`}>
                    profile
                </Link>
            </div>
        </div>
    )
}

export default Person