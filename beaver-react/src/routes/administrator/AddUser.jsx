import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api';
import Swal from "sweetalert2";

export default function UpdateUser(){
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        mobile: '',
        identification_number: '',
        role: '',
        password: '',
        role_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await postRequest('/register', formData);
            if (response.status >= 200 && response.status < 300) {
                await Swal.fire({
                    title: 'User created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    mobile: '',
                    identification_number: '',
                    role: '',
                    password: '',
                    role_id: '',
                });
                // Reset form or perform other actions after successful user creation
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            await Swal.fire({
                title: 'Failed to create user!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: error.response.data.message
            });
            console.error('Error adding user:', error);
        }
    };

    return (
        <>          
            <main>
                <div className="form-container">
                    <h1>User Management</h1>
                    <h2>Add User</h2>
                    <form id="profile-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name}
                                onChange={handleChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username"
                                   value={formData.username}
                                onChange={handleChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email"
                                   value={formData.email} onChange={handleChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="identification_number">Identification No:</label>
                            <input type="text" id="identification_number" name="identification_number"
                                value={formData.identification_number} onChange={handleChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="mobile">Mobile No:</label>
                            <input type="text" id="mobile" name="mobile"
                                   value={formData.mobile} onChange={handleChange} required/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="role_id">Role:</label>
                            <select id="role_id" name="role_id" value={formData.role_id}
                                onChange={handleChange} required defaultValue={""}>
                                <option value="">Select Role</option>
                                <option value={3}>Administrator</option>
                                <option value={4}>Quality Assurance</option>
                                <option value={2}>Coordinator</option>
                                <option value={5}>Instructor</option>
                                <option value={1}>Student</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password}
                                onChange={handleChange} required/>
                        </div>

                        <input type="submit" value="Add User"/>
                    </form>
                </div>
            </main>
        </>
)
}
