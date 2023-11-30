import {useEffect, useState} from "react";
import {getRequest} from "../../api/api";

export default function StudentGrades(){
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [courses, setCourses] = useState([]);// [state, setState
    const [studentPerformance, setStudentPerformance] = useState([]);// [state, setState

    useEffect(() => {
        async function fetchStudentEnrolledCourse(){
            try {
                const response = await getRequest(`/student-enrolments?student=${currentUser.id}`);
                // setEnrolledCourses(response.data.data);
                setCourses(response.data.data);
            }catch (e) {
                if (e.status === 404) {
                    // alert("Enrolled courses not found");
                } else {
                    // alert("An error occurred while fetching enrolled courses");
                }
            }
        }

        async function fetchExams(){
            try {
                const e = await getRequest(`/student-performances?student_id=${currentUser.id}`);
                setStudentPerformance(e.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Exams not found");
                }else{
                    // alert("An error occurred while fetching exams");
                }
            }
        }

        fetchStudentEnrolledCourse()
            .then(() => {
                fetchExams();
            });
        console.log(studentPerformance);
    }, []);
    return (
        <>
            <div className="container">
                <div className="course-card">
                    {/* <h2>Course: {course.course_name}</h2> */}
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                studentPerformance.map((performance) => {
                                    return (
                                        <tr>
                                            <td>{performance.exam.name}</td>
                                            <td>{performance.exam.course.name}</td>
                                            <td>{performance.exam.exam_date}</td>
                                            <td>{performance.score}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}