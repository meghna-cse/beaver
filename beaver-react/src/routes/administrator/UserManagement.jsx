import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faToggleOff} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api';
import {Link} from "react-router-dom";

export default function UserManagement(){
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchAllUsers(){
            try{
                const allUsers = await getRequest('/users.php');
                setUsers(allUsers.data.data);
            } catch(error) {
                    console.error('There was an error fetching the users', error);
            }
        }
    
        fetchAllUsers();
    }, []);

    // Function to handle user deactivation/deletion
    const deactivateUser = async (userId) => {
        try{
            const response = await postRequest('/users.php', { id: userId });
            if (response.data.status === 'success') {
                setUsers(users.filter(user => user.id !== userId));
                alert('User deactivated successfully.');
            } else {
                // Handle any other status messages from backend
                console.error('Error deactivating user: ', response.message);
            }
        }
        catch (e) {
                console.error('There was an error deactivating the user', e);
            }
    };

    return (
        <>
            <div className="container">
                <h1>User Management</h1>
                <a href="/administrator/user-management/add-user" className="custom-button">Add User</a>

                <div className="course-card">
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Identification Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.identification_number}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td className="action-column">
                                            <a href="#" onClick={() => deactivateUser(user.id)}>
                                                <FontAwesomeIcon icon={faToggleOff} color={"#c72c2c"} />
                                                De-Activate
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>                        
        </>
    )
}