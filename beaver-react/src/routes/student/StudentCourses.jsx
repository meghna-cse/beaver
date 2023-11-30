import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import {getRequest, postRequest} from "../../api/api";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {darkPrimaryColor, primaryColor, textIconsColor} from "../../colors";
import backdrop from "bootstrap/js/src/util/backdrop";
import {text} from "@fortawesome/fontawesome-svg-core";
import Swal from "sweetalert2";
import {Badge, Container, Spinner} from "react-bootstrap";

export default function StudentCourses(){
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const fetchCourses = async () =>{
        // make api call to fetch all courses
        try {
            const fetchedCourses = await getRequest('/courses');
            setCourses(fetchedCourses.data.data);
            enrolledCourses.map((enrolledCourse) => {
                courses.map((course) => {
                    if (enrolledCourse.course_id === course.id) {
                        course.enrolled = true;
                    }
                })
            });
        }catch (e) {
            // show alert for error
            // alert("An error occurred while fetching courses");
        }
    }

    const fetchEnrolledCourses = async () =>{
        // make api call to fetch all courses
        try {
            const c = await getRequest(`/student-enrolments?student=${currentUser.id}`);
            setEnrolledCourses(c.data.data);
            console.log(c.data.data);
        }catch (e) {
            // show alert for error
            // alert("An error occurred while fetching enrolled courses");
        }
    }

    useEffect(() => {
        fetchEnrolledCourses()
            .then(() => {
                fetchCourses();
            });
    }, []);

    const iconStyle = {
        width: '20px',
        height: '20px',
    }

    const truncateDescription = (description) => {
        if (description.length > 50) {
            return description.substring(0, 50) + '...';
        }
        return description;
    }

    const enrolStudent = async (courseId) => {
        try {
            const response = await postRequest(`/student-enrolments`,
                {student_id: currentUser.id, course_id: courseId});
            if (response.data.status === 'success') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully enrolled',
                })
                fetchEnrolledCourses()
                    .then(() => {
                        fetchCourses();
                    });
            }
        }catch (e) {
            console.log(e)
            if (e.status >= 400 && e.status < 500) {
                // alert("Enrolled courses not found");
            } else {
                // alert("An error occurred while fetching enrolled courses");
            }
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data.message,
            })
        }
    }

    return (
        <Container>
            <h2>Available Courses</h2>
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Description</th>
                    <th>Enrol</th>
                    <th>View</th>
                </tr>
                </thead>
                <tbody>
                {
                    courses.map((course) => {
                        return (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{truncateDescription(course.description)}</td>
                                <th style={{background:textIconsColor}}>
                                    {
                                        enrolledCourses.some(item => item.course_id == course.id) ?
                                            <Badge pill bg="success">Enrolled</Badge>
                                            :
                                            <FontAwesomeIcon icon={faGraduationCap} color={darkPrimaryColor}
                                                             onClick={() => { enrolStudent(course.id)}}
                                                             style={iconStyle}/>
                                    }
                                </th>
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
        </Container>
    )
}