import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import { getRequest } from '../../api/api';
import {NavLink} from "react-router-dom";
import GradeGenerator from "../../components/utils/GradeGenerator";

export default function AdministratorHome(){
    const [instructors, setInstructors] = useState([]);// [state, setState
const [students, setStudents] = useState([]);// [state, setState
const [enrolledCourses, setEnrolledCourses] = useState([]);// [state, setState
const [averageScore, setAverageScore] = useState(0);// [state, setState
const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState

// get current user details
const[currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState

useEffect(() => {
    async function fetchInstructors(){
        try {
            const instructors = await getRequest(`/users.php?role_id=5`);
            setInstructors(instructors.data.data);
        }catch (e) {
            // if http status code is 404, show alert
            if(e.status === 404){
                alert("Instructors not found");
            }else{
                alert("An error occurred while fetching instructors");
            }
        }
    }

    // fetch students
    async function fetchStudents(){
        try {
            const students = await getRequest(`/users.php?role_id=1`);
            setStudents(students.data.data);
        }catch (e) {
            // if http status code is 404, show alert
            if(e.status === 404){
                alert("Students not found");
            }else{
                alert("An error occurred while fetching students");
            }
        }
    };

    async function fetchAverageScores () {
        try {
            const response = await getRequest('/update_student_performances.php');
            const averageScoresData = response.data.data;
            setCoursePerformance(averageScoresData);
        } catch (error) {
            console.error('Error fetching average scores:', error);
        }
    };

    fetchInstructors()
    fetchStudents();
    fetchAverageScores();
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
                <h2>Courses</h2>
                <p>{coursePerformance.length}</p>
            </div>

            {/*// <!-- Card 2: Average Score -->*/}
            <div className="card">
                <h2>No. of Students</h2>
                <p>{students.length}</p>
            </div>

            {/*// <!-- Card 3: Course Instructor -->*/}
            <div className="card">
                <h2>No of Instructors</h2>
                <p>{instructors.length}</p>
            </div>
        </div>
        
        <h2>Performance Overview</h2>
        <table className="performance-table">
            <thead>
            <tr>
                <th>Course</th>
                <th>Average Student Performance</th>
            </tr>
            </thead>
            <tbody>
            {
                coursePerformance.map((course) => {
                    return (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.average_score}%</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </>
)
}