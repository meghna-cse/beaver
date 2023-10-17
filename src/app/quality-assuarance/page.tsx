import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";

export default function QualityAssuranceDashboard(){
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

    const iconStyle = {
        width: '20px',
        height: '20px'
    }

    return (
        <>
            <div className="dashboard">
                {/*// <!-- Card 1: Enrolled Courses -->*/}
                <div className="card">
                    <h2>Courses</h2>
                    <p>14</p>
                </div>

                {/*// <!-- Card 2: Average Score -->*/}
                <div className="card">
                    <h2>No. of Students</h2>
                    <p>850</p>
                </div>

                {/*// <!-- Card 3: Course Instructor -->*/}
                <div className="card">
                    <h2>No of Instructors</h2>
                    <p>23</p>
                </div>
            </div>
            <div className="course-card">
                <h4>Managing Courses Performance</h4>
                <div className="bar-chart" style={style1}>
                    <div className="bar">
                        <div className="bar-fill" style={style2}></div>
                        <div className="bar-label">Course A</div>
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={style3}></div>
                        <div className="bar-label">Course B</div>
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={style3}></div>
                        <div className="bar-label">Course C</div>
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={style4}></div>
                        <div className="bar-label">Course D</div>
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={style5}></div>
                        <div className="bar-label">Course E</div>
                    </div>
                </div>
            </div>
            <h2>Courses</h2>
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
                        <a href="quality-assuarance/courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Machine Learning and Generative AI</td>
                    <td>Stanislas Fredrick</td>
                    <td className="action-column">
                        <a href="quality-assuarance/courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Database Management & SQL</td>
                    <td>Rebecca Linda</td>
                    <td className="action-column">
                        <a href="quality-assuarance/courses/details">
                            <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}