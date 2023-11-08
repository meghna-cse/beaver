import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../api/api";

export default function Chat() {
    // get id from params
    const {id} = useParams();
    const [chatWith, setChatWith] = useState({});// [state, setState
    const [messages, setMessages] = useState([]);// [state, setState
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [formData, setFormData] = useState({
        content: ""
    });// [state, setState
    const [isSentMessage, setIsSentMessage] = useState(false);// [state, setState

    useEffect(() => {
        // fetch user details using the id provided
        async function fetchUserDetails() {
            try {
                //http://beaver-backend.tvtv/users.php?id=1
                const user = await getRequest(`/users.php?id=${id}`);
                setChatWith(user.data.data[0]);
            } catch (e) {
                // if http status code is 404, show alert
                if (e.status === 404) {
                    alert("User not found");
                } else {
                    alert("An error occurred while fetching user");
                }
            }
        }
        fetchUserDetails();

    }, []);

    useEffect(() => {
        // fetch chat messages
        async function fetchMessages(){
            try {
                //http://beaver-backend.tvtv/messages.php?sender_id=1&recipient_id=2
                const m = await getRequest(`/chat_messages.php?sender_id=${currentUser.id}&receiver_id=${id}`);
                setMessages(m.data.data);
            }catch (e) {
                console.log(e);
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Messages not found");
                }else{
                    alert("An error occurred while fetching messages");
                }
            }
        }

        fetchMessages();
    }, [isSentMessage]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // include sender id in formData
        formData.sender_id = currentUser.id;
        formData.receiver_id = id;
        // convert formData to json string
        const data = JSON.stringify(formData);

        // make api call to login
        const response = await postRequest('/add_chat_message.php', data);

        // if login is successful, redirect to home page
        if(response.data.status === "success"){
            // alert(response.data.message);
            // window.location.reload();
            setIsSentMessage(!isSentMessage);
            // clear form data
            setFormData({
                content: ""
            });
            // clear form input
            document.getElementById("content").value = "";
        }else{
            alert(response.data.message);
        }
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-cards">
                    {/*// <!-- User profile card -->*/}
                    <div className="user-card">
                        <div className="user-details">
                            <div className="user-icon">U</div>
                            <div className="user-info">
                                <div className="user-name">{chatWith.name}</div>
                                <div className="user-role">{chatWith.role_name}</div>

                            </div>
                        </div>
                    </div>

                    {/*// <!-- Chat box card -->*/}
                    <div className="chat-box-card">
                        <div className="chat-messages">
                            {
                                messages.map((message) => {
                                    return (
                                        <div className={`message ${message.sender_id === currentUser.id ? 'sender-message' : 'recipient-message'}`}>
                                            {/*{message.sender_id === currentUser.id ? 'You' : chatWith.name}*/}
                                            {message.content}
                                            <span className="timestamp">{message.created_at}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="message-input">
                            <input id="content" type="text" placeholder="Type your message..." name="content" onChange={handleInputChange}/>
                            <button onClick={handleSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}