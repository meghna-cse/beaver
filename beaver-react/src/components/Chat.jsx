import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../api/api";
import {io} from "socket.io-client";
import Swal from "sweetalert2";

export default function Chat() {
    // get id from params
    const {id} = useParams();
    const [chatWith, setChatWith] = useState({});// [state, setState
    const [messages, setMessages] = useState([]);// [state, setState
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [formData, setFormData] = useState({
        message_content: ""
    });// [state, setState
    const [isSentMessage, setIsSentMessage] = useState(false);// [state, setState
    const socket = io('http://localhost:9078',{
        retries:3
    });
    const [isReceivedNewMessage,setIsReceivedNewMessage] =useState(false);

    async function fetchMessages(){
        try {
            // url structure 'chat-messages/{sender_id}/{receiver_id}'
            const m = await getRequest(`/chat-messages/${currentUser.id}/${id}`);
            setMessages(m.data.data);
        }catch (e) {
            console.log(e);
            // if http status code is 404, show alert
            if(e.status === 404){
                // alert("Messages not found");
            }else{
                // alert("An error occurred while fetching messages");
            }
        }
    }

    async function fetchUserDetails() {
        try {
            const user = await getRequest(`/users/${id}`);
            setChatWith(user.data.data);
        } catch (e) {
            // if http status code is 404, show alert
            if (e.status === 404) {
                // alert("User not found");
            } else {
                // alert("An error occurred while fetching user");
            }
        }
    }

    useEffect(() => {
        fetchUserDetails();
        socket.on('new_message_for_you',(data) =>{
            // check if the receiver id matches the current user id
            if (data.receiver_id == currentUser.id){
                // wait for fetch messages to complete
                // setIsSentMessage(!isSentMessage);
                // fetchMessages()
                console.log("New Message");
                setIsReceivedNewMessage(!isReceivedNewMessage);
            }
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    useEffect(() => {
        // fetch chat messages
        fetchMessages();
    }, [isSentMessage,isReceivedNewMessage]);

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

        try{
            // make api call to send chat message
            const response = await postRequest('/chat-messages', data);

            // if login is successful, redirect to home page
            if(response.data.status === "success"){
                console.log("Message sent");
                socket.emit('message_sent', {"receiver_id": id});
                setIsSentMessage(!isSentMessage);

                // clear form input
                document.getElementById("message_content").value = "";
            }else{
                // alert(response.data.message);
            }
        }catch (e){
            console.log(e.message);
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
                                        <div key={message.id} className={`message ${message.sender_id === currentUser.id ? 'sender-message' : 'recipient-message'}`}>
                                            {/*{message.sender_id === currentUser.id ? 'You' : chatWith.name}*/}
                                            {message.content}
                                            <span className="timestamp">{message.created_at}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="message-input">
                            <input id="message_content" type="text" placeholder="Type your message..."
                                   name="message_content" onChange={handleInputChange}/>
                            <button onClick={handleSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}