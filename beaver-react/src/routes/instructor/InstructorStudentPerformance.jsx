import {getRequest} from "../../api/api";
import GradeGenerator from "../../components/utils/GradeGenerator";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";

export default function InstructorStudentPerformance(){
    const {id} = useParams();
    const [averageScore, setAverageScore] = useState(0);// [state, setState
    const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState
    useEffect(() => {
        async function fetchStuPer(){
            try {
                const response = await getRequest(`/student-performances?exam_id=${id}`);
                // sum the score in all this and find average
                let totalScore = 0;
                let performances = response.data.data;

                if (performances.length === 0) {
                    setAverageScore(0);
                    setCoursePerformance([])
                    return;
                }

                setCoursePerformance(performances);
                performances.map((performance) => {
                    totalScore += performance.score;
                    return performance;
                });
                setAverageScore(totalScore / performances.length ?? 1);
            }catch (e) {
                if (e.status === 404) {
                    // alert("Enrolled courses not found");
                } else {
                    // alert("An error occurred while fetching enrolled courses");
                }
            }
        }
        fetchStuPer();
    }, []);

    return (
        <Container>
            <h2>Exams</h2>
            <NavLink to={`/instructor/exams/student-performance/${id}/add`}
                     className="custom-button"
                     style={{textDecoration:'none'}}>
                Add Student Performance
            </NavLink>
            <div className="table-container">
                <div className="table-container">
                    <table className="performance-table">
                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Score</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            coursePerformance.map((performance) => {
                                return (
                                    <tr key={performance.id}>
                                        <td>{performance.student_id}</td>
                                        <td>{performance.student.name}</td>
                                        <td>{performance.score}%</td>
                                        <td><GradeGenerator scoreString={performance.score}/></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}