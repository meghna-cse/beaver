export default function StudentChatPage(){
    return (
        <>
            <div className="chat-container">
                <div className="chat-cards">
                    {/*// <!-- User profile card -->*/}
                    <div className="user-card">
                        <div className="user-details">
                            <div className="user-icon">U</div>
                            <div className="user-info">
                                <div className="user-name">John Doe</div>
                                <div className="user-role">Instructor</div>

                            </div>
                        </div>
                    </div>

                    {/*// <!-- Chat box card -->*/}
                    <div className="chat-box-card">
                        <div className="chat-messages">
                            <div className="message sender-message">
                                Hello! How can I help you?
                                <span className="timestamp">12:30 PM</span>
                            </div>
                            <div className="message recipient-message">
                                Hi John, I have a question about our project.
                                <span className="timestamp">12:35 PM</span>
                            </div>
                            {/*// <!-- Add more messages as needed -->*/}
                        </div>
                        <div className="message-input">
                            <input type="text" placeholder="Type your message..."/>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}