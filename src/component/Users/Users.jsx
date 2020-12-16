import React, { useEffect, } from 'react'
import { getUsers, followThunkCreator, unfollowThunkCreator } from '../../redux/reducers/user-reducer'



import { useDispatch, useSelector } from 'react-redux'
import User from './User/User'
import UserSkeleton from './User/UserSkeleton'
import Paginator from '../Paginator/Paginator'

function Users() {
    const dispatch = useDispatch()

    const { users, isFetching, count, page, followingInProgress } = useSelector(({ users }) => users)

    useEffect(() => {
        dispatch(getUsers(count, page))
    }, [page, count, dispatch])

    const onChangePage = (page) => {
        dispatch(getUsers(count, page))
    }

    const onClickFollow = (userId) => {
        followThunkCreator(userId)(dispatch)
    }

    const onClickUnfollow = (userId) => {
        unfollowThunkCreator(userId)(dispatch)
    }

    return (
        <div className="users">
            <div className="users__content">
                {isFetching
                    ? Array(count).fill(null).map((el, id) => <UserSkeleton key={id} />)
                    : users.map(user => {
                        return (<User key={user.id}
                            name={user.name}
                            id={user.id}
                            status={user.status}
                            photo={user.photos.small}
                            followed={user.followed}
                            follow={onClickFollow}
                            unfollow={onClickUnfollow}
                            followingInProgress={followingInProgress}
                        />)

                    })
                }

            </div>
            <Paginator currentPage={page} onChangePage={onChangePage} />
        </div>
    )
}

export default Users
