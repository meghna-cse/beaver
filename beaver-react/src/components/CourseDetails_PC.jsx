import {useEffect, useState} from "react";
import {getRequest} from "../api/api";
import {NavLink, useParams} from "react-router-dom";

export default function CourseDetails_PC(){
    // get id from param
    const {id} = useParams();
    const [course, setCourse] = useState({});// [state, setState
    const [courseObjectives, setCourseObjectives] = useState([]);// [state, setState
    const [courseExams, setCourseExams] = useState([]);// [state, setState
    const [qaFeedback, setQaFeedback] = useState([]);// [state, setState
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function fetchCourseDetails(){
            try {
                const details = await getRequest(`/courses.php?id=${id}`);
                // console.log(details.data.data ? details.data.data : {});
                setCourse(details.data.data ? details.data.data[0] : {});
            }catch (e) {
                if (e.status === 404) {
                    // alert("Course not found");
                }else{
                    // alert("An error occurred while fetching course");
                }
            }
        }

        async function fetchCourseObjectives(){
            try {
                //http://beaver-backend.tvtv/course_objectives.php?course_id=1
                console.log(user.role);
                const obj = await getRequest(`/course_objectives.php?course_id=${id}`);
                setCourseObjectives(obj.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Course objectives not found");
                }else{
                    // alert("An error occurred while fetching course objectives");
                }
            }
        }

        async function fetchCourseExams(){
            try {
                //http://beaver-backend.tvtv/course_objectives.php?course_id=1
                const obj = await getRequest(`/exams.php?course_id=${id}`);
                setCourseExams(obj.data.data);
            }catch (e) {
                console.log(e);
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Course exams not found");
                }else{
                    // alert("An error occurred while fetching course exams");
                }
            }
        }

        async function fetchQAFeedback(){
            try {
                //http://beaver-backend.tvtv/course_objectives.php?course_id=1
                const obj = await getRequest(`/qa_feedbacks.php?course_id=${id}`);
                setQaFeedback(obj.data.data);
            }catch (e) {
                console.log(e);
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("QA Feedback not found");
                }else{
                    // alert("An error occurred while fetching QA Feedback");
                }
            }
        }

        fetchCourseDetails();
        fetchCourseObjectives();
        fetchCourseExams();
        fetchQAFeedback();
    }, []);
    return (
        <>
            <div className="container">
            <h1>Course Details</h1>
            <div className="course-card">
                <h2>{course.name}</h2>
                <p className="description">{course.description}</p>
            </div>

            <div className="course-card">
                <h2>Course Objectives</h2>

                <div className="table-container">
                    <table className="performance-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            courseObjectives.map((objective) => {
                                return (
                                    <tr key={objective.id}>
                                        <td>{objective.name}</td>
                                        <td className="description">{objective.description}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="course-card">
                <h2>Exams</h2>
                <div className="table-container">
                    <table className="performance-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Exam Type</th>
                            <th>Exam Format</th>
                            <th>Max Score</th>
                            <th>Passing Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            courseExams.map((exam) => {
                                return (
                                    <tr key={exam.id}>
                                        <td>{exam.name}</td>
                                        <td>{exam.exam_date}</td>
                                        <td>{exam.exam_type_name}</td>
                                        <td>{exam.exam_format_name}</td>
                                        <td>{exam.max_score}</td>
                                        <td>{exam.passing_score}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="course-card">
                <h2>QA Feedback</h2>
                <div className="table-container">
                    <table className="performance-table">
                        <thead>
                        <tr>
                            <th>Comment on:</th>
                            <th>Comment Date</th>
                            <th>Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            qaFeedback.map((feedback) => {
                                return (
                                    <tr key={feedback.id}>
                                        <td>{feedback.exam_name ?? feedback.course_objective_name}</td>
                                        <td>{feedback.created_at}</td>
                                        <td>{feedback.comment}</td>
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