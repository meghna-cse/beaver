export default function UpdateUser(){
    return (
        <>
            <div className="container">
                <div className="course-card">
                    <h2>View User Profile</h2>
                    <form id="profile-form">
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required/><br/><br/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" required/><br/><br/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required/><br/><br/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="identification_number">Identification Number:</label>
                            <input type="text" id="identification_number" name="identification_number" required/><br/><br/>
                        </div>


                        <div className="input-group">
                            <label htmlFor="role">Role:</label>
                            <select name="role" id="role">
                                <option value="" disabled>Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="qa_personell">Quality Assuarance Personell</option>
                                <option value="coordinator">Program Co-ordinator</option>
                            </select>
                        </div>

                        <input type="submit" value="Update Changes"/>
                    </form>
                </div>
            </div>
        </>
    )
}