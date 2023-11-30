import { getRequest, postRequest } from '../../api/api';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function StudentFeedbackForm(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        course_id: "",
        instructor_id: "",
        feedback: ""
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

        // make api call to add feedback
        try {
            const response = await postRequest('/add_feedback', formData);
            if (response.data.message === 'Feedback submitted successfully') {
              Swal.fire('Success', 'Feedback submitted successfully', 'success');
            } else {
              Swal.fire('Error', 'An error occurred', 'error');
            }
          } catch (error) {
            Swal.fire('Error', 'Submission failed', 'error');
          }
    }

    useEffect(() => {
        async function fetchAllAvailableCourses(){
            // make api call to fetch all courses
            try {
                const c = await getRequest('/course-instructors-feedback');
                setCourses(c.data.data);
            }catch (e) {
                // show alert for error
                // alert("An error occurred while fetching courses");
            }
        }

        fetchAllAvailableCourses();
    }, []);

    // Create a unique list of instructors
    const uniqueInstructors = courses.reduce((acc, current) => {
        if (acc.find(item => item.instructor_id === current.instructor_id)) {
            return acc;
        } else {
            return [...acc, current];
        }
    }, []);

    return (
        <>
            <Container>
                <div className="container form-container">
                    <h2>Add Feedback</h2>
                    <form id="profile-form">
                        <div className="input-group">
                            <label htmlFor="course_id">Course Id:</label>
                            <select id="course_id" name="course_id" 
                                onChange={handleInputChange} 
                                value={formData.course_id || ''} // Using value prop to control the selection
                                required
                            >
                                <option value="" disabled={true}>Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
                                ))}
                            </select>

                        </div>
                        <div className="input-group">
                            <label htmlFor="instructor_id">Instructor Name:</label>
                            <select id="instructor_id" name="instructor_id" onChange={handleInputChange} 
                                value={formData.instructor_id || ''} // Using value prop to control the selection
                                required>
                                <option value="" disabled={true}>Select Instructor</option>
                                
                                {uniqueInstructors.map((instructor) => (
                                    <option key={instructor.instructor_id} value={instructor.instructor_id}>
                                        {instructor.instructor_name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="input-group">
                            <label htmlFor="feedback">Feedback:</label>
                            <textarea id="feedback" name="feedback" rows={5}
                                    value={formData.feedback} onChange={handleInputChange}
                                    placeholder="Enter your feedback for the course or the instructor"
                                    required></textarea><br/><br/>
                        </div>

                        <input type="submit" value="Submit Feedback " onClick={handleSubmit}/>
                    </form>
                </div>
            </Container>
        </>
    )
}