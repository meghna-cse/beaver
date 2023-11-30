import {useEffect, useState, useMemo} from "react";
import { getRequest } from '../../api/api';
import {Card, CardBody, CardTitle, Container} from "react-bootstrap";
import {Chart} from "chart.js";
import {Line} from "react-chartjs-2";
import {CategoryScale,LinearScale,PointElement,LineElement} from "chart.js";
Chart.register(CategoryScale,LinearScale,PointElement,LineElement);

export default function InstructorHome(){
    const [instructors, setInstructors] = useState([]);// [state, setState
    const [students, setStudents] = useState([]);// [state, setState
    const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState
    const [graphData, setGraphData] = useState({labels:[],datasets:[]});// [state, setState
    const[currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    const[graphLoaded, setGraphLoaded] = useState(false);// [state, setState

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
        async function fetchInstructors(){
            try {
                const instructors = await getRequest(`/users?role_id=5`);
                setInstructors(instructors.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Instructors not found");
                }else{
                    // alert("An error occurred while fetching instructors");
                }
            }
        }

        // fetch students
        async function fetchStudents(){
            try {
                const students = await getRequest(`/users?role_id=1`);
                setStudents(students.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Students not found");
                }else{
                    // alert("An error occurred while fetching students");
                }
            }
        }

        async function fetchCoursePerformance () {
            setGraphLoaded(false)
            try {
                const response = await getRequest('/student-performances-aggregation?instructor_id='+ currentUser.id);
                const averageScoresData = response.data.data;
                console.log("Average Scores Data");
                console.log(averageScoresData);
                setCoursePerformance(response.data.data);

                // define the graph data
                // create labels with an array of course names but an initial empty string
                const labels = averageScoresData.map((course) => course.name);
                const datasets = [
                    {
                        label: '',
                        data: averageScoresData.map((course) => course.average_score),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ];
                setGraphData({labels, datasets});
            } catch (error) {
                console.error('Error fetching average scores:', error);
            }
        }

        fetchInstructors()
        fetchStudents();
        fetchCoursePerformance()
            .then(() => {
                setGraphLoaded(true);
            });
    }, []);


    return (
        <Container>
            <div className="dashboard">
                {/*// <!-- Card 1: Enrolled Courses -->*/}
                <div className="card">
                    <h2>Courses Instructing</h2>
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
                                <td>{Math.round(course.average_score * 100) / 100}%</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <br/>
            <br/>

            <Card>
                <CardTitle><center>Average Student Performance</center></CardTitle>
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