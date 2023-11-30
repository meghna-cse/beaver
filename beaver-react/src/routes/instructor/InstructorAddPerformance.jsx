import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";
import async from "async";
import Swal from "sweetalert2";
import {Container} from "react-bootstrap";

export default function InstructorAddPerformance(){
    const {examId} = useParams();
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        exam_id: examId,
        score: ""
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        // remove the course name from the form data
        delete formData.course_name;

        // convert formData to json string
        const data = JSON.stringify(formData);

        try {
            const c = await postRequest('/student-performances', data);
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Performance added successfully',
            });

            // navigate to course details page using history
            navigate(`/instructor/exams`);
            }catch (e) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.response.data.message,
                })
                if (e.status === 404) {
                    // alert("Course not found");
                }else{
                    console.log(e);
                    // alert(e.data.message);
                }
            }
        }

        useEffect(() => {
            async function fetchStudents(){
                try {
                    //http://beaver-backend.tvtv/exams.php?course_id=1
                    const e = await getRequest(`/users?role_id=1`);
                    setStudents(e.data.data);
                }catch (e) {
                    console.log(e);
                }
            }
            fetchStudents();
    },[]);


    return (
        <Container>
            <h2>Add Student Performance</h2>
            <form id="profile-form">
            <div className="input-group">
                    <label htmlFor="student_id">Select Student:</label>
                        <select name="student_id" id="student_id" onChange={handleInputChange} >
                            <option disabled selected value> -- select an option -- </option>
                                {
                                    students.map((student) => {
                                        return (
                                        
                                            <option value={student.id}>{student.name}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                </div>

                <div className="input-group">
                    <label htmlFor="score">Score:</label>
                    <input type="text" id="score" name="score" required
                           value={formData.score} onChange={handleInputChange} /><br/><br/>
                </div>

                <input type="submit" value="Save Changes" onClick={handleSubmit}/>
            </form>
        </Container>
    )
}