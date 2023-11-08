import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {getRequest} from "../../api/api";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export default function StudentCourses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses(){
            // make api call to fetch all courses
            try {
                const c = await getRequest('/courses.php');
                setCourses(c.data.data);
            }catch (e) {
                // show alert for error
                alert("An error occurred while fetching courses");
            }
        }
        fetchCourses();
    }, []);
    const iconStyle = {
        width: '20px',
        height: '20px',
    }

    // fetch all the available courses

    // display them in a table

    return (
        <>
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
                                <td>{course.instructor_name}</td>
                                <td className="action-column">
                                    <NavLink to={`/student/courses/details/${course.id}`}>
                                        <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                                    </NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}