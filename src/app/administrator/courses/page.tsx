import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function QualityAssuranceCoursesPage() {
    const iconStyle = {
        width: '20px',
        height: '20px',
    }
    return (
        <>
            <h2>Available Courses</h2>
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Data Analytics and Modelling</td>
                    <td>Wesley Fofana</td>
                    <td className="action-column">
                        <a href="courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Machine Learning and Generative AI</td>
                    <td>Stanislas Fredrick</td>
                    <td className="action-column">
                        <a href="courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Database Management & SQL</td>
                    <td>Rebecca Linda</td>
                    <td className="action-column">
                        <a href="courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}