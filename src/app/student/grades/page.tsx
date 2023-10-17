export default function StudentGradesPage() {

    return (
        <>
            <div className="container">
                <div className="course-card">
                    <h2>Course: Data Modelling & Analytics</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Exam Type</th>
                                <th>Date</th>
                                <th>Score</th>
                                <th>Maximum Score</th>
                                <th>Passing Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Object Oriented Programming</td>
                                <td>Multiple Choices</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            <tr>
                                <td>Data Structures & Algorithms</td>
                                <td>Practical</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            <tr>
                                <td>Time-space complexity</td>
                                <td>Essay</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Course: Object Oriented Programming</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Exam Type</th>
                                <th>Date</th>
                                <th>Score</th>
                                <th>Maximum Score</th>
                                <th>Passing Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Object Oriented Programming</td>
                                <td>Multiple Choices</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            <tr>
                                <td>Data Structures & Algorithms</td>
                                <td>Practical</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            <tr>
                                <td>Time-space complexity</td>
                                <td>Essay</td>
                                <td>2023-09-15</td>
                                <td>89%</td>
                                <td>100%</td>
                                <td>70%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}