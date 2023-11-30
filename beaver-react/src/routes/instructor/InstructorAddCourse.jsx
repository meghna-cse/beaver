import {useState} from "react";
import {postRequest} from "../../api/api";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Container} from "react-bootstrap";

export default function InstructorAddCourse(){
    // get current user id
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        instructor_id: currentUser.id
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // convert formData to json string
        const data = JSON.stringify(formData);

        try {
            const response =  await postRequest('/courses', data);
            await Swal.fire({
                title: 'Success!',
                text: 'Course added successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

            // navigate to course details page using history
            navigate(`/instructor/courses/details/${response.data.data.id}`);
        }catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
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
            <Container>
                <div className="course-card">
                    <h2>Add Course</h2>
                    <form id="profile-form">
                        <div className="input-group">
                            <label htmlFor="name">Course Name:</label>
                            <input type="text" id="name" name="name"
                                required value={formData.name} onChange={handleInputChange}/><br/><br/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Course Description:</label>
                            <textarea id="description" name="description" rows={5}
                                      value={formData.description} onChange={handleInputChange}
                                      required></textarea><br/><br/>
                        </div>

                        <input type="submit" value="Add Course" onClick={handleSubmit}/>
                    </form>
                </div>
            </Container>
        </>
    )
}