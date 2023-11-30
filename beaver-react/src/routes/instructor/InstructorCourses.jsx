import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import async from "async";
import {getRequest, deleteRequest} from "../../api/api";
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";
import Swal from "sweetalert2";

export default function InstructorCourses(){
    const [courses, setCourses] = useState([]);
    // fetch all courses
    useEffect(() => {
        async function fetchAllAvailableCourses(){
            // make api call to fetch all courses
            try {
                const c = await getRequest('/courses');
                setCourses(c.data.data);
            }catch (e) {
                // show alert for error
                // alert("An error occurred while fetching courses");
            }
        }

        fetchAllAvailableCourses();
    }, []);

    const handleDeleteCourse = async (courseId) => {
        try {

            //await deleteRequest(`/courses/${courseId}`);
            //console.log(`Deleting course with ID: ${courseId}`);

            // Update the courses state to remove the deleted course
            const updatedCourses = courses.filter(course => course.id !== courseId);
            await Swal.fire({
                title: 'Course successfully deleted!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setCourses(updatedCourses);
    
            // Optionally, show a success message
            // alert("Course deleted successfully");
        } catch (error) {
            console.error("Error deleting course:", error);
            await Swal.fire({
                title: 'Error deleting course!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: error.message ?? error.response.data.message
            });
        }
    };

    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }

    return (
        <Container>
            <h2>Available Courses</h2>
            <NavLink to={'/instructor/courses/add-course'} className="custom-button">
                Add Course
            </NavLink>
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    courses.map((course) => {
                        return (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td className="action-column">
                                    <NavLink to={`/instructor/courses/details/${course.id}`}>
                                        <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                                    </NavLink>
                                    <NavLink onClick={() => handleDeleteCourse(course.id)} className="delete-button">
                                        <FontAwesomeIcon icon={faTrash} style={iconStyle} color={'#0d6efd'}/>
                                    </NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </Container>
    )
}