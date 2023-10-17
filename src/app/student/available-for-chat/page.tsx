

export default function StudentAvailableForChatPage(){

    return (
        <>
            <div className="container">
                <div className="course-card">
                    <h2>Admin</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Felix Trisha</td>
                                <td>trishafel@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Belinda Vee</td>
                                <td>veebelinda@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Course Instructors</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Brenan Rodgers</td>
                                <td>brenanrodgers@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Destiny Mary</td>
                                <td>destinymary@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            {/*// <!-- Add more objectives as needed -->*/}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Program Co-ordinators</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Luke Seline</td>
                                <td>selineluke@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Patience Mirriam</td>
                                <td>patiencemirriam@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Students</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Lisa Anabella</td>
                                <td>lisaanabella@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Denis Sam</td>
                                <td>samdennis@gmail.com</td>
                                <td>
                                    <a href="available-for-chat/chat" className="btn">Chat</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}