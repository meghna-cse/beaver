import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function QualityAssuranceCoursesPage() {
    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }

    return (
        <>
            <h2>Available Courses</h2>
            <a href="courses/add-course" className="custom-button">Add Course</a>
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
                        <a href={"#"} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} style={iconStyle} color={'red'}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Machine Learning and Generative AI</td>
                    <td>Wesley Fofana</td>
                    <td className="action-column">
                        <a href="courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                        <a href={"#"} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} style={iconStyle} color={'red'}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Database Management & SQL</td>
                    <td>Wesley Fofana</td>
                    <td className="action-column">
                        <a href="courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                        <a href={"#"} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} style={iconStyle} color={'red'}/>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}