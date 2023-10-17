export default function InstructorAddCourseObjectivePage() {
    return (
        <>
            <h2>Add Course Objective</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="course_name">Course Name:</label>
                    <input type="text" id="course_name" name="course_name"
                           required readOnly value="Course Name"/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="description">Course Objective:</label>
                    <textarea id="description" name="description" rows={5} required></textarea><br/><br/>
                </div>

                <input type="submit" value="Add Course Objective"/>
            </form>
        </>
    )
}