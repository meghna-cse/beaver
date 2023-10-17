export default function AddStudentPerformancePage() {
    return (
        <>
            <h2>Add Student Performance</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="student_id">Student ID:</label>
                    <input type="text" id="student_id" name="student_id" required/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_id">Select Exam:</label>
                    <select id="exam_id" name="exam_id">
                        <option value="course1">Exam 1</option>
                        <option value="course2">Exam 2</option>
                        <option value="course3">Exam 3</option>

                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="score">Score:</label>
                    <input type="text" id="score" name="score" required/><br/><br/>
                </div>

                <input type="submit" value="Save Changes"/>
            </form>
        </>
    )
}