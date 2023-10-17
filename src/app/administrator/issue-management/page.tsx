export default function IssueManagementPage(){
    return (
        <>
            <div className="container">
                <div className="course-card">
                    <h2>Create Ticket</h2>
                    <form id="profile-form">
                        <div className="input-group">
                            <label htmlFor="name">Issue Title:</label>
                            <input type="text" id="name" name="name" required/><br/><br/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" name="username" required/><br/><br/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="priority-level">Priority Level:</label>
                            <select name="priority-level" id="priority-level">
                                <option value="" disabled>Select Priority Level</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="status">Status</label>
                            <select name="status" id="status">
                                <option value="" disabled>Select Status</option>
                                <option value="admin">Pending</option>
                                <option value="student">Complete</option>
                            </select>
                        </div>

                        <input type="submit" value="Add Ticket"/>
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
                            <tr>
                                <td>Slow Service</td>
                                <td>Slow Service</td>
                                <td>High</td>
                                <td>In Progress</td>
                            </tr>
                            <tr>
                                <td>Slow Service</td>
                                <td>Slow Service</td>
                                <td>High</td>
                                <td>In Progress</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}