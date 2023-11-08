import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api'; 

export default function UpdateUser(){
    const [formData, setFormData] = useState({
        id: Math.random().toString(36).slice(2, 11),
        name: '',
        username: '',
        email: '',
        mobile_number: '0000000000',
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
            const response = await postRequest('/register.php', formData);
            if (response.status === 201) {
                alert('User created successfully!');
                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    mobile_number: '',
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
            console.error('Error adding user:', error);
        }
    };

    return (
        <>          
                    <main>
                        <div class="form-container">
                            <h1>User Management</h1>
                            <h2>Add User</h2>
                            <form id="profile-form" onSubmit={handleSubmit}>
                                <div class="input-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" value={formData.name}
                                        onChange={handleChange} required/>
                                </div>
                                <div class="input-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" name="username" value={formData.username}
                                        onChange={handleChange} required/>
                                </div>
                                <div class="input-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                                </div>
                                <div class="input-group">
                                    <label htmlFor="identification_number">Identification No:</label>
                                    <input type="text" id="identification_number" name="identification_number"
                                        value={formData.identification_number} onChange={handleChange} required/>
                                </div>
                                <div class="input-group">
                                    <label for="role_id">Role:</label>
                                    <select id="role_id" name="role_id" value={formData.role_id}
                                        onChange={handleChange} required>
                                        <option value="">Select Role</option>
                                        <option value={3}>Administrator</option>
                                        <option value={4}>Quality Assurance</option>
                                        <option value={2}>Coordinator</option>
                                        <option value={5}>Instructor</option>
                                        <option value={1}>Student</option>
                                    </select>
                                </div>
                                <div class="input-group">
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
