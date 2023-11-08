import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";

export default function InstructorAddPerformance(){
    const [formData, setFormData] = useState({
        student_id: "",
        exam_id: "",
        score: ""
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        // remove the course name from the form data
        delete formData.course_name;

        console.log(formData);

        // convert formData to json string
        const data = JSON.stringify(formData);

             try {
            const c = postRequest('/add_student_performances.php', data);
            alert("Performance added successfully");
            // navigate to course details page using history
            // navigate(`instructor/exams`);
            // history.push(`/instructor/courses/details/${courseId}`);
            }catch (e) {
                if (e.status === 404) {
                    // alert("Course not found");
                }else{
                    console.log(e);
                    // alert(e.data.message);
                }
            }


        }


    return (
        <>
            <div className={"form-container"}>
            <h2>Add Student Performance</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="student_id">Student ID:</label>
                    <input type="text" id="student_id" name="student_id" required 
                    value={formData.student_id} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_id">Select Exam:</label>
                    <input type="text" id="exam_id" name="exam_id" required
                    value={formData.exam_id} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="score">Score:</label>
                    <input type="text" id="score" name="score" required
                    value={formData.score} onChange={handleInputChange} /><br/><br/>
                </div>

                <input type="submit" value="Save Changes" onClick={handleSubmit}/>
            </form>
            </div>
        </>
    )
}