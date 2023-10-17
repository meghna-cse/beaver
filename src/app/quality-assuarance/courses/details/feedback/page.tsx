export default function FeedbackPage() {
    return (
        <div className="container">
            <div className="course-card">
                <h2>Add Feedback</h2>
                <form id="profile-form">
                    <div className="input-group">
                        <label htmlFor="comment_on">Comment on:</label>
                        <select name="comment_on" id="comment_on">
                            <option value="" disabled>Select Option</option>
                            <option value="admin">Exam 1</option>
                            <option value="student">Exam 2</option>
                            <option value="student">Course Objective 1</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="comment">Comment:</label>
                        <input type="text" id="comment" name="comment" required/><br/><br/>
                    </div>

                    <input type="submit" value="Add Feedback"/>
                </form>
            </div>
        </div>
    )
}