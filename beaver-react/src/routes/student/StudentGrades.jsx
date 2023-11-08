import {useEffect, useState} from "react";
import {getRequest} from "../../api/api";

export default function StudentGrades(){
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [courses, setCourses] = useState([]);// [state, setState
    const [exams, setExams] = useState([]);// [state, setState

    useEffect(() => {
        async function fetchStudentEnrolledCourse(){
            try {
                const response = await getRequest(`/student_enrolments.php?student_id=${currentUser.id}`);
                // setEnrolledCourses(response.data.data);
                setCourses(response.data.data);
            }catch (e) {
                if (e.status === 404) {
                    alert("Enrolled courses not found");
                } else {
                    alert("An error occurred while fetching enrolled courses");
                }
            }
        }

        async function fetchExams(){
            try {
                //http://beaver-backend.tvtv/exams.php?course_id=1
                const e = await getRequest(`/student_performances.php?student_id=${currentUser.id}`);
                setExams(e.data.data);

                const updatedCourses = [];

                // loop through courses injecting into each course the exams
                // courses.map((course) => {
                //     course.exams = [];
                //     e.data.data.map((exam) => {
                //         if(exam.course_id === course.course_id){
                //             console.log("Hapa ni equal");
                //             course.exams.push(exam);
                //         }
                //     });
                //     course.exams = [...course.exams];
                //     updatedCourses.push(course);
                // });
                // setCourses([...updatedCourses]);

            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Exams not found");
                }else{
                    alert("An error occurred while fetching exams");
                }
            }
        }

        fetchStudentEnrolledCourse()
            .then(() => {
                fetchExams();
            });
        console.log(exams);
    }, []);
    return (
        <>
            <div className="container">
                {/* { */}
                    {/* // courses.map((course) => { */}
                    {/* //     return ( */}
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
                                           exams.map((exam) => {
                                                return (
                                                    <tr>
                                                        <td>{exam.exam_name}</td>
                                                        <td>{exam.name}</td>
                                                        <td>{exam.exam_date}</td>
                                                          <td>{exam.score}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        {/* // ) */}
                    {/* // }) */}
                {/* // } */}
            </div>
        </>
    )
}