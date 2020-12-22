import React, { useEffect } from 'react'

import ProfileInfo from './ProfileInfo/ProfileInfo'
import AddPost from './AddPost/AddPost'
import Post from './Post/Post'

import { follow, getUserProfile, unfollow } from '../../redux/reducers/profile-reducer'
import { useDispatch, useSelector } from 'react-redux'
import ProfileLoader from '../Loader/ProfileLoader/ProfileLoader'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'

function Profile({ match }) {
    const dispatch = useDispatch()
    const { userData } = useSelector(({ auth }) => auth)
    const { profile, isFeaching, followingInProgres } = useSelector(({ profile }) => profile)
    let userId = match.params.userId

    if (!userId) {
        userId = userData.id
    }



    useEffect(() => {
        dispatch(getUserProfile(userId))
    }, [dispatch, userId])

    const posts = [
        { id: 1, author: 'Vladyslav Sotnikov', date: '20 lis 2020', text: 'Junior front end developer', like: 20 },
        { id: 2, author: 'Kamil Bieniek', date: '25 lis 2020', text: 'Hi! How are you today?', like: 2 }
    ]

    const onClickFollow = (userId) => {
        dispatch(follow(userId))
    }

    const onClickUnfollow = userId => {
        dispatch(unfollow(userId))
    }

    return (
        <div >
            {   isFeaching
                ? <div className="content__wrapper content__wrapper--profile"><ProfileLoader /></div>
                : <div className="profile">
                    <ProfilePhoto photo={profile.photos.large}
                        currentUserId={userId}
                        authUserId={userData.id}
                        followInfo={profile.followInfo}
                        followingInProgres={followingInProgres}
                        follow={onClickFollow}
                        unfollow={onClickUnfollow}
                    />
                    <div className="profile__page">
                        {<ProfileInfo profile={profile} currentUserId={userId} authUserId={userData.id} />}

                        <AddPost />
                        {posts.map(post => (
                            <Post
                                key={post.id}
                                author={post.author}
                                date={post.date}
                                text={post.text}
                                like={post.like} />
                        ))}
                    </div>
                </div>}



        </div>
    )
}

export default compose(
    withAuthRedirect,
    withRouter
)(Profile)  
