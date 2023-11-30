import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../api/api";
import Swal from "sweetalert2";

export default function CourseDetails(){
    // get the course id from the url
    const {id} = useParams();
    const [course, setCourse] = useState({});// [state, setState
    const [courseObjectives, setCourseObjectives] = useState([]);// [state, setState
    const [exams, setExams] = useState([]);// [state, setState
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState

    async function fetchCourseObjectives(){
        try {
            const obj = await getRequest(`/course-objectives?course=${id}`);
            setCourseObjectives(obj.data.data);
        }catch (e) {
            console.log(e);
            // if http status code is 404, show alert
            if(e.status === 404){
                // alert("Course objectives not found");
            }else{
                // alert("An error occurred while fetching course objectives");
            }
        }
    }

    async function fetchExams(){
        try {
            const e = await getRequest(`/exams?course_id=${id}`);
            setExams(e.data.data);
        }catch (e) {
            console.log(e);
            // if http status code is 404, show alert
            if(e.status === 404){
                // alert("Exams not found");
            }else{
                // alert("An error occurred while fetching exams");
            }
        }
    }

    async function fetchCourseDetails(){
        try {
            const details = await getRequest(`/courses/${id}`);
            setCourse(details.data.data);
        }catch (e) {
            // alert("Course not found");
        }
    }

    // fetch the course details from the api
    useEffect(() => {
        fetchCourseDetails();
    }, []);

    useEffect(() => {
        fetchCourseObjectives();
        fetchExams();
    },[course]);

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
                                exams.map((exam) => {
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
            </div>
        </>
    )
}