import React from 'react'

import man from '../../../assests/man.svg'
import likeImg from '../../../assests/like.svg'

function Post({ author, date, text, like }) {
    return (
        <div className="profile__post">
            <div className="profile__post-header">
                <div className="profile__post-icon">
                    <img src={man} alt="post-img" className="profile__post-img" />
                </div>
                <div className="profile__post-header-info">
                    <div className="profile__post-author">
                        {author}
                    </div>
                    <div className="profile__post-data">
                        {date}
                    </div>
                </div>
            </div>
            <div className="profile__post-content">
                <div className="profile__text">
                    {text}
                </div>
                <div className="profile__like-wrap">
                    <img src={likeImg} alt="like" className="profile__like" />
                    <span className="profile__like-count">{like}</span>
                </div>
            </div>
        </div>
    )
}

export default Post
