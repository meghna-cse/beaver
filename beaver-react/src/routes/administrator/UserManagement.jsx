import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api';
import {Link, NavLink} from "react-router-dom";
import Swal from "sweetalert2";

export default function UserManagement(){
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [users, setUsers] = useState([]);
    const [userStatusToggled, setUserStatusToggled] = useState(false);

    useEffect(() => {
        async function fetchAllUsers(){
            try{
                const allUsers = await getRequest('/users');
                setUsers(allUsers.data.data);
            } catch(error) {
                console.error('There was an error fetching the users', error);
            }
        }
    
        fetchAllUsers();
    }, [userStatusToggled]);

    // Function to handle user deactivation/deletion
    const deactivateUser = async (userId) => {
        try{
            const response = await getRequest('/deactivate-user/'+ userId);
            if (response.data.status === 'success') {
                setUsers(users.filter(user => user.id !== userId));
                setUserStatusToggled(!userStatusToggled);
                await Swal.fire({
                    title: 'User deactivated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                // Handle any other status messages from backend
                console.error('Error deactivating user: ', response.message);
            }
        } catch (e) {
            await Swal.fire({
                title: 'Error encountered deactivating user!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: e.message ?? e.response.data.message,
            });
            console.error('There was an error deactivating the user', e);
        }
    };

    return (
        <>
            <div className="container">
                <h1>User Management</h1>
                <NavLink
                    to={"/administrator/user-management/add-user"}
                    className="custom-button">
                    Add User
                </NavLink>

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
                                            {
                                                user.status === 1
                                                ? <FontAwesomeIcon icon={faToggleOff}
                                                                   onClick={() => deactivateUser(user.id)}
                                                                   color={'red'}/>
                                                : <FontAwesomeIcon icon={faToggleOn}
                                                                 onClick={() => deactivateUser(user.id)}
                                                                 color={'green'}/>
                                            }
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