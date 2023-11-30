import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPowerOff, faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../api/api';
import {Container} from "react-bootstrap";
import Swal from "sweetalert2";

export default function IssueManagement() {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user')).id);
    const [successfullyRaisedTicket, setSuccessfullyRaisedTicket] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority_level: '', // Default priority level
    });

    // Function to fetch tickets
  const fetchTickets = async () => {
    try {
        const response = await getRequest('/tickets', { raised_by: userId });
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
  }, [successfullyRaisedTicket]);

    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postRequest('/tickets', formData);
            if (response.data.status === 'success') {
                await Swal.fire({
                    title: 'Ticket created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setSuccessfullyRaisedTicket(!successfullyRaisedTicket)
                // set formData to default values
                setFormData({
                    title: '',
                    description: '',
                    priority_level: '', // Default priority level
                });

            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            await Swal.fire({
                title: 'Failed to create ticket!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: error.response.data.message
            });
        }
    }

    const handleTicketStatusChange = async (ticketId) => {
        try {
            const response = await getRequest(`/toggle-ticket-status/${ticketId}`);
            if (response.data.status === 'success') {
                await Swal.fire({
                    title: 'Ticket status updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setSuccessfullyRaisedTicket(!successfullyRaisedTicket)
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            await Swal.fire({
                title: 'Failed to update ticket status!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: error.response.data.message
            });
        }
    }

    return (
        <>
            <Container>
                <div className="course-card">
                <h2>Create Ticket</h2>
                <form id="ticket-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Issue Title:</label>
                        <input type="text" id="title" name="title" value={formData.title}
                               onChange={handleInputChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description}
                                  onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="priority_level">Priority:</label>
                        <select id="priority_level" name="priority_level" value={formData.priority_level}
                                defaultValue={""} onChange={handleInputChange}>
                            <option disabled value={""}>Select Priority</option>
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
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tickets) && tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.description}</td>
                                        <td>{ticket.priority}</td>
                                        <td>{ticket.status === 1 ? 'Completed' : 'In Progress'}</td>
                                        <td>
                                            {
                                                ticket.status === 1 ?
                                                    <FontAwesomeIcon icon={faToggleOff}
                                                                     style={iconStyle}
                                                                     color={'red'}
                                                                     onClick={() => handleTicketStatusChange(ticket.id)}
                                                    />
                                                    :
                                                    <FontAwesomeIcon icon={faToggleOn}
                                                                     style={iconStyle}
                                                                     color={'green'}
                                                                     onClick={() => handleTicketStatusChange(ticket.id)}
                                                    />
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </>
    )
}