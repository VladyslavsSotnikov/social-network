import React, { useEffect, } from 'react'
import { getUsers, followThunkCreator, unfollowThunkCreator } from '../../redux/reducers/user-reducer'



import { useDispatch, useSelector } from 'react-redux'
import { AppStoreType } from '../../redux/store'
import { Paginator } from '../../component'
import { User, UserSkeleton } from './components'

export const Users = () => {
    const dispatch = useDispatch()

    const { users, isFetching, count, page, followingInProgress } = useSelector(({ users }: AppStoreType) => users)

    useEffect(() => {
        dispatch(getUsers(count, page))
    }, [page, count, dispatch])

    const onChangePage = (page:number) => {
        dispatch(getUsers(count, page))
    }

    const onClickFollow = (userId:number) => {
        dispatch(followThunkCreator(userId))
    }

    const onClickUnfollow = (userId:number) => {
        dispatch(unfollowThunkCreator(userId))
    }

    return (
        <div className="users">
            <div className="users__content">
                {isFetching
                    ? Array(count).fill(null).map((el, id) => <UserSkeleton key={id} />)
                    : users?.map(user => {
                        return (<User
                                key={user.id}
                                name={user.name}
                                id={user.id}
                                status={user.status}
                                photo={user.photos?.small}
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
};