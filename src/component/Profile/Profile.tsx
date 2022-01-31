import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams  } from "react-router";
import { makeStyles } from "@mui/styles";

import { ProfileLoader } from '..';
import { AddPost, Post, ProfileInfo, ProfilePhoto } from './components';
import { AppStoreType } from '../../redux/store';
import { follow, getUserProfile, unfollow } from '../../redux/reducers/profile-reducer';

const posts = [
    { id: 1, author: 'Vladyslav Sotnikov', date: '01 grd 2021', text: 'Junior Web UI developer', like: 20 },
    { id: 2, author: 'Vladyslav Sotnikov', date: '25 lis 2020', text: 'Hi! How are you today?', like: 2 }
];

const useStyles = makeStyles({
    root:{
        display: 'flex',
    },

    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },

    wall: {
        width: '600px',
    }
});

export const Profile = () =>  {
    const { userData } = useSelector(({ auth }: AppStoreType) => auth);
    const { profile, isFeaching, followingInProgres, followInfo} = useSelector(({ profile }: AppStoreType) => profile);
    const params = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    const authorizedUserId = userData?.id;
    const userId = Number(params?.userId ?? authorizedUserId); 

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
                ? <div className={classes.wrapper}><ProfileLoader /></div>
                : <div className={classes.root}>
                    <ProfilePhoto
                        photo={profile?.photos.large}
                        currentUserId={userId}
                        authUserId={authorizedUserId}
                        followInfo={followInfo}
                        followingInProgres={followingInProgres}
                        follow={onClickFollow}
                        unfollow={onClickUnfollow}
                    />
                    <div className={classes.wall}>
                        <ProfileInfo profile={profile} currentUserId={userId} authUserId={authorizedUserId} />

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
};
