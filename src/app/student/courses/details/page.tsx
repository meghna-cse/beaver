export default function CourseDetailsPage() {
    return (
        <>
            <div className="container">
                <h1>Course Details</h1>
                <div className="course-card">
                    <h2>Course Name</h2>
                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet urna et justo volutpat lacinia. Aliquam erat volutpat.</p>
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
                            <tr>
                                <td>Understand Fundamental Programming Concepts</td>
                                <td className="description">Define and explain key programming concepts, such as variables, data types, operators, and control structures.</td>
                            </tr>
                            <tr>
                                <td>Write and Debug Code</td>
                                <td className="description">Write, test, and debug simple programs in a chosen programming language, demonstrating proficiency in problem-solving.</td>
                            </tr>
                            <tr>
                                <td>Apply Problem-Solving Skills:</td>
                                <td className="description">Analyze real-world problems and formulate algorithmic solutions using pseudocode and flowcharts.</td>
                            </tr>
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
                            <tr>
                                <td>Exam 1</td>
                                <td>2023-09-15</td>
                                <td>Midterm Exam</td>
                                <td>Multiple Choice</td>
                                <td>100</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>Exam 2</td>
                                <td>2023-10-05</td>
                                <td>Final Exam</td>
                                <td>Essay</td>
                                <td>100</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>Exam 3</td>
                                <td>2023-10-05</td>
                                <td>Quiz</td>
                                <td>Practical</td>
                                <td>40</td>
                                <td>25</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}