import React, {useEffect, useState} from "react";
import async from "async";
import {getRequest} from "../../api/api";
import GradeGenerator from "../../components/utils/GradeGenerator";
import Swal from "sweetalert2";
import {Card, CardBody, CardTitle, Container} from "react-bootstrap";
import {Line} from "react-chartjs-2";

export default function StudentHome(){
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [enrolledCourses, setEnrolledCourses] = useState([]);// [state, setState
    const [averageScore, setAverageScore] = useState(0);// [state, setState
    const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState
    const [graphData, setGraphData] = useState({labels:[],datasets:[]});// [state, setState
    const [graphLoaded, setGraphLoaded] = useState(false);// [state, setState
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    useEffect(() => {
        // fetch student enrolled course
        async function fetchStudentEnrolledCourse(){
            try {
                const response = await getRequest(`/student-enrolments?student=${currentUser.id}`);
                setEnrolledCourses(response.data.data);
            }catch (e) {
                console.log(e)
                if (e.status >= 400 && e.status < 500) {
                    // alert("Enrolled courses not found");
                } else {
                    // alert("An error occurred while fetching enrolled courses");
                }
            }
        }

        async function fetchStudentPerformance(){
            try {
                const response = await getRequest(`/student-performances?student_id=${currentUser.id}`);
                // sum the score in all this and find average
                let totalScore = 0;
                let performances = response.data.data;

                if (performances.length === 0) {
                    setAverageScore(0);
                    setCoursePerformance([])
                    return;
                }
                const averageScoresData = response.data.data;

                // define the graph data
                // create labels with an array of course names but an initial empty string
                const labels = [].concat(...averageScoresData.map((course) => course.exam.name));
                const datasets = [
                    {
                        label: '',
                        data: [].concat(...averageScoresData.map((course) => course.score)),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ];
                setGraphData({labels, datasets});

                setCoursePerformance(performances);
                performances.forEach((performance) => {
                    // Ensure that performance.score is a number
                    const score = parseFloat(performance.score);
                    if (!isNaN(score)) {
                        totalScore += score;
                    }
                });
                setAverageScore(performances.length > 0 ? Math.round((totalScore / performances.length * 100) / 100) : 0);
            }catch (e) {
                if (e.status === 404) {
                    // alert("Enrolled courses not found");
                } else {
                    // alert("An error occurred while fetching enrolled courses");
                }
            }
        }
        fetchStudentEnrolledCourse();
        fetchStudentPerformance()
            .then(() => {
                setGraphLoaded(true);
            });

    }, []);

    return (
        <Container>
            <div className="dashboard">
                {/*// <!-- Card 1: Enrolled Courses -->*/}
                <div className="card">
                    <h2>Enrolled Course</h2>
                    <p>{enrolledCourses.length > 0 ? enrolledCourses.length : "N/A"}</p>
                </div>

                {/*// <!-- Card 2: Average Score -->*/}
                <div className="card">
                    <h2>Exams Done</h2>
                    <p>{coursePerformance.length}</p>
                </div>

                <div className="card">
                    <h2>Average Score</h2>
                    <p>{averageScore}%</p>
                </div>

            </div>
            
            <h2>Performance Overview</h2>
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Exam</th>
                    <th>Average Score</th>
                    <th>Grade</th>
                </tr>
                </thead>
                <tbody>
                {
                    coursePerformance.map((performance) => {
                        return (
                            <tr key={performance.id}>
                                <td>{performance.exam.name}</td>
                                <td>{performance.score}%</td>
                                <td><GradeGenerator scoreString={performance.score}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

            <br/>
            <br/>

            <Card>
                <CardTitle><center>Student Performance</center></CardTitle>
                <CardBody>
                    {
                        graphLoaded && coursePerformance.length > 0 ? (
                            <Line data={graphData} options={options}/>
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                </CardBody>
            </Card>
        </Container>
    )
}