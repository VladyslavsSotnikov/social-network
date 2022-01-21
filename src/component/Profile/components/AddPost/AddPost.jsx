import { useState, useEffect, useRef } from 'react';

import man from '../../../../assests/man.svg'

export const AddPost = () => {
    const postRef = useRef()
    const [editMode, setEditMode] = useState(false)
    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if (!e.path.includes(postRef.current)) {
                setEditMode(false)
            }
        })
    }, [])
    return (
        <div className="profile__add-post" ref={postRef}>
            <form action="" className="profile__add-post-form">
                <div className="profile__new-post">
                    <div className="profile__post-icon">
                        <img src={man} alt="ava" className="profile__post-img" />
                    </div>
                    <input className="profile__post-input" type="text" placeholder="Co słychać?" onClick={() => setEditMode(true)} />
                </div>
                {
                    editMode &&
                    <div className="profile__btn-container">
                        <button className="profile__post-btn">Dodaj</button>
                    </div>

                }
            </form>
        </div>
    )
};
