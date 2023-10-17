import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function InstructorsExamsPage() {
    const iconStyle = {
        width: '20px',
        height: '20px',
    }
    return (
        <>
            <h2>Exams</h2>
            <a href="exams/add-exam" className="custom-button">Add Exam</a>
            <div className="table-container">
                <table className="performance-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course Name</th>
                        <th>Date</th>
                        <th>Exam Type</th>
                        <th>Exam Format</th>
                        <th>Max Score</th>
                        <th>Passing Score</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Exam 1</td>
                        <td>Course 1</td>
                        <td>2023-09-15</td>
                        <td>Midterm</td>
                        <td>Multiple Choice</td>
                        <td>100</td>
                        <td>70</td>
                        <td className="action-column">
                            <a href="exams/student-performance">
                                <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Exam 2</td>
                        <td>Course 1</td>
                        <td>2023-10-05</td>
                        <td>Final</td>
                        <td>Multiple Choice</td>
                        <td>100</td>
                        <td>70</td>
                        <td className="action-column">
                            <a href="exams/student-performance">
                                <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}