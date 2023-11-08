import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faToggleOff} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api'; 

export default function IssueManagement() {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id);

    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority_level: 'Low', // Default priority
        'raised_by': userId,
    });

    // Function to fetch tickets
  const fetchTickets = async () => {
    try {
        const response = await getRequest('/tickets.php', { raised_by: userId });
        if (response.data.status === "success") {
            setTickets(response.data.data);
          } else {
            // If the data is not in the expected format, log the issue and set an empty array
            console.error('Unexpected response format:', response.data);
            setTickets([]);
        }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  // Effect to fetch tickets on mount and after adding a new ticket
  useEffect(() => {
    fetchTickets();
  }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postRequest('/add_tickets.php', formData);
            if (response.status === 201) {
                alert('Ticket created successfully!');
                // Reset form or perform other actions after successful ticket creation
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            alert('Failed to create ticket: ' + error.message);
        }
    };

    return (
        <>
            <div className="container">
                <div className="course-card">
                <h2>Create Ticket</h2>
                <form id="ticket-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Issue Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="priority">Priority:</label>
                        <select id="priority" name="priority" value={formData.priority_level} onChange={handleInputChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <input type="submit" value="Create Ticket" />
                </form>
                </div>
                <div className="course-card">
                    <h2>Issue Management</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Priority Level</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tickets) && tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.description}</td>
                                    <td>{ticket.priority_level}</td>
                                    <td>{ticket.status == 1 ? 'Completed' : 'In Progress'}</td>
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