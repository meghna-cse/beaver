import {useEffect, useState} from "react";
import async from "async";
import {getRequest} from "../../api/api";
import GradeGenerator from "../../components/utils/GradeGenerator";

export default function StudentHome(){
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const [enrolledCourses, setEnrolledCourses] = useState([]);// [state, setState
    const [averageScore, setAverageScore] = useState(0);// [state, setState
    const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState

    useEffect(() => {
        // fetch student enrolled course
        async function fetchStudentEnrolledCourse(){
            try {
                const response = await getRequest(`/student_enrolments.php?student_id=${currentUser.id}`);
                console.log(response.data.data);
                setEnrolledCourses(response.data.data);
            }catch (e) {
                console.log(e)
                if (e.status === 404) {
                    alert("Enrolled courses not found");
                } else {
                    alert("An error occurred while fetching enrolled courses");
                }
            }
        }

        async function fetchStudentPerformance(){
            try {
                const response = await getRequest(`/student_performances.php?student_id=${currentUser.id}`);
                // sum the score in all this and find average
                let totalScore = 0;
                let performances = response.data.data;

                if (performances.length === 0) {
                    setAverageScore(0);
                    setCoursePerformance([])
                    return;
                }

                setCoursePerformance(performances);
                performances.forEach((performance) => {
                    // Ensure that performance.score is a number
                    const score = parseFloat(performance.score);
                    if (!isNaN(score)) {
                        totalScore += score;
                    }
                });
                setAverageScore(performances.length > 0 ? totalScore / performances.length : 0);
            }catch (e) {
                if (e.status === 404) {
                    alert("Enrolled courses not found");
                } else {
                    alert("An error occurred while fetching enrolled courses");
                }
            }
        }
        fetchStudentEnrolledCourse();
        fetchStudentPerformance();

    }, []);


    const style1 = {
        height: '300px'
    }

    const style2 = {
        height: '120px'
    }

    const style3 = {
        height: '80px'
    }

    const style4 = {
        height: '180px'
    }

    const style5 = {
        height: '160px'
    }

    const style6 = {
        height: '25px'
    }

    return (
        <>
            <div className="dashboard">
                {/*// <!-- Card 1: Enrolled Courses -->*/}
                <div className="card">
                    <h2>Enrolled Course</h2>
                    <p>{enrolledCourses.length > 0 ? enrolledCourses.length : "N/A"}</p>
                </div>

                {/*// <!-- Card 2: Average Score -->*/}
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
                                <td>{performance.exam_name}</td>
                                <td>{performance.score}%</td>
                                <td><GradeGenerator scoreString={performance.score}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}