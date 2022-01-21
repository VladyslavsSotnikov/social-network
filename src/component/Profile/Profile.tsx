import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { follow, getUserProfile, unfollow } from '../../redux/reducers/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import { useParams  } from 'react-router'
import { AppStoreType } from '../../redux/store'
import { ProfileLoader } from '..'
import { AddPost, Post, ProfileInfo, ProfilePhoto } from './components'

const posts = [
    { id: 1, author: 'Vladyslav Sotnikov', date: '01 grd 2021', text: 'Junior Web UI developer', like: 20 },
    { id: 2, author: 'Vladyslav Sotnikov', date: '25 lis 2020', text: 'Hi! How are you today?', like: 2 }
]

export const Profile = withAuthRedirect(() =>  {
    const dispatch = useDispatch()
    const { userData } = useSelector(({ auth }: AppStoreType) => auth)
    const { profile, isFeaching, followingInProgres, followInfo} = useSelector(({ profile }: AppStoreType) => profile)
    const params = useParams();
    
    let userId = Number(params.userId) as number | undefined; 

    if (!userId) {
        userId = userData?.id
    }

    const onClickFollow = (userId: number) => {
        dispatch(follow(userId))
    }

    const onClickUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    useEffect(() => {
        if(userId){
            dispatch(getUserProfile(userId))
        }
    }, [dispatch, userId])

    return (
        <div >
            {   isFeaching
                ? <div className="content__wrapper content__wrapper--profile"><ProfileLoader /></div>
                : <div className="profile">
                    <ProfilePhoto
                        photo={profile?.photos.large}
                        currentUserId={userId}
                        authUserId={userData?.id}
                        followInfo={followInfo}
                        followingInProgres={followingInProgres}
                        follow={onClickFollow}
                        unfollow={onClickUnfollow}
                    />
                    <div className="profile__page">
                        {<ProfileInfo profile={profile} currentUserId={userId} authUserId={userData?.id} />}

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
});
