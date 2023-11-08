export default function AdministratorAddCourse(){
    return (
        <>
            <h2>Add Course</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="course_name">Course Name:</label>
                    <input type="text" id="course_name" name="course_name"
                           required readOnly value="Course Name"/><br/><br/>
                </div>

                <input type="submit" value="Add Course"/>
            </form>
        </>
    )
}