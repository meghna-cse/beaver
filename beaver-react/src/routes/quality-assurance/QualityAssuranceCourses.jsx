import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getRequest} from "../../api/api";
import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";

export default function QualityAssuranceCourses(){
    const [courses, setCourses] = useState([]);

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

    useEffect(() => {
        fetchAllAvailableCourses();
    }, []);

    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }

    return (
        <Container>
            <h2>Available Courses</h2>
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    courses.map((course) => {
                        return (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.instructor_name == '' ? "N/A" : course.instructor_name}</td>
                                <td className="action-column">
                                    <NavLink to={`/quality-assurance/courses/details/${course.id}`}>
                                        <FontAwesomeIcon icon={faEye} style={iconStyle}/>
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