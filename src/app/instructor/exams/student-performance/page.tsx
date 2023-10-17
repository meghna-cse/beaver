export  default function StudentPerformancePage() {
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
                            <th>Name</th>
                            <th>Exam Name</th>
                            <th>Score</th>
                            <th>Max Score</th>
                            <th>Passing Score</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Student 1</td>
                            <td>Wesley Nelson</td>
                            <td>Applied Mathematics Unit</td>
                            <td>89 %</td>
                            <td>100 %</td>
                            <td>70 %</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Student 1</td>
                            <td>Wesley Nelson</td>
                            <td>Applied Mathematics Unit</td>
                            <td>89 %</td>
                            <td>100 %</td>
                            <td>70 %</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Student 1</td>
                            <td>Wesley Nelson</td>
                            <td>Applied Mathematics Unit</td>
                            <td>89 %</td>
                            <td>100 %</td>
                            <td>70 %</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Student 1</td>
                            <td>Wesley Nelson</td>
                            <td>Applied Mathematics Unit</td>
                            <td>89 %</td>
                            <td>100 %</td>
                            <td>70 %</td>
                            <td>A</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}