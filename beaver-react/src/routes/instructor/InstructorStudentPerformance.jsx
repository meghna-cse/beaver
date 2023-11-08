import {getRequest} from "../../api/api";
import GradeGenerator from "../../components/utils/GradeGenerator";
import {useEffect, useState} from "react";

export default function InstructorStudentPerformance(){

    const [averageScore, setAverageScore] = useState(0);// [state, setState
    const [coursePerformance, setCoursePerformance] = useState([]);// [state, setState
    useEffect(() => {
        async function fetchStuPer(){
            try {
                const response = await getRequest(`/student_performances.php`);
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
                    alert("Enrolled courses not found");
                } else {
                    alert("An error occurred while fetching enrolled courses");
                }
            }
        }
        fetchStuPer();
    }, []);

    return (
        <>
            <h2>Exams</h2>
            <a href="student-performance/add" className="custom-button">Add Student Performance</a>
            <div className="table-container">
                <div className="table-container">
                    <table className="performance-table">
                        <thead>
                        <tr>
                            <th>Student ID</th>
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
        </>
    )
}