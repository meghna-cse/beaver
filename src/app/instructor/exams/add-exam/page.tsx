export default function AddExamPage() {
    return (
        <>
            <h2>Add Exam</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="exam_name">Exam Name:</label>
                    <input type="text" id="exam_name" name="exam_name"
                           required value="Exam Name"/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="course_id">Select Course:</label>
                    <select id="course_id" name="course_id">
                        <option value="" disabled selected>Select Course</option>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                        <option value="course3">Course 3</option>

                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_type_id">Select Exam Type:</label>
                    <select id="exam_type_id" name="exam_type_id">
                        <option value="" disabled selected>Select Exam Type</option>
                        <option value="mid_term">Mid-Term</option>
                        <option value="final_exam">Final Exam</option>
                        <option value="quiz">Quiz</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_format_id">Select Exam Format:</label>
                    <select id="exam_format_id" name="exam_format_id">
                        <option value="" disabled selected>Select Exam Format</option>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="practical">Practical</option>
                        <option value="essay">Essay</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="max_score">Max Score</label>
                    <input type="number" id="max_score" name="max_score"
                           required value="Max Score"/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="passing_score">Passing Score</label>
                    <input type="number" id="passing_score" name="passing_score"
                           required  value="Passing Score"/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_date">Exam Date:</label>
                    <input type="date" id="exam_date" name="exam_date"
                           required  value="Exam Date"/><br/><br/>
                </div>

                <input type="submit" value="Add Exam"/>
            </form>
        </>
    )
}