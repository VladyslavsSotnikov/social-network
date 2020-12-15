import React from 'react'

import man from '../../assests/man.svg'

function Chats() {
    return (
        <div className="chats">
            <div className="chats__dialogs">
                <ul className="chats__dialogs-list">
                    <li className="chats__dialog-item chats__dialog-item--active">
                        <div className="chats__dialog-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__dialog-content">
                            <div className="chats__dialog-name">Vladyslav Sotnikov</div>
                            <div className="chats__dialog-text">Some messages...</div>
                        </div>
                    </li>
                    <li className="chats__dialog-item ">
                        <div className="chats__dialog-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__dialog-content">
                            <div className="chats__dialog-name">Vladyslav Sotnikov</div>
                            <div className="chats__dialog-text">Some messages...</div>
                        </div>
                    </li>
                    <li className="chats__dialog-item">
                        <div className="chats__dialog-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__dialog-content">
                            <div className="chats__dialog-name">Vladyslav Sotnikov</div>
                            <div className="chats__dialog-text">Some messages...</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="chats__messages">
                <div className="chats__messages-content">
                    <div className="chats__message-item">
                        <div className="chats__message-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__message-content">
                            <p className="chats__message-text">Co słychać?</p>
                            <span className="chats__message-time">17:55</span>
                        </div>
                    </div>
                    <div className="chats__message-item">
                        <div className="chats__message-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__message-content">
                            <p className="chats__message-text">Co słychać?</p>
                            <span className="chats__message-time">17:55</span>
                        </div>
                    </div>
                    <div className="chats__message-item">
                        <div className="chats__message-photo">
                            <img src={man} alt="man" />
                        </div>
                        <div className="chats__message-content">
                            <p className="chats__message-text">I am junior React developer</p>
                            <span className="chats__message-time">17:55</span>
                        </div>
                    </div>
                </div>
                <div className="chats__message-form">
                    <form>
                        <input type="text" className="chats__message-input" placeholder="Wpisz wiadomość ..." />
                        <button type="submit" className="chats__message-btn" > Odeśij <lij></lij></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chats
