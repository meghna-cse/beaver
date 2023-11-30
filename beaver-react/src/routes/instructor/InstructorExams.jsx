import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";
import {Col, Container} from "react-bootstrap";

export default function InstructorExams(){
    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function fetchExams(){
            try {
                const obj = await getRequest(`/exams`);
                setExams(obj.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Course exams not found");
                }else{
                    // alert("An error occurred while fetching course exams");
                }
            }
        }
        fetchExams();
    }, []);

    return (
        <Container>
            <h2>Exams</h2>
            <NavLink to={'/instructor/exams/add-exam'} className="custom-button">
                Add Exam
            </NavLink>
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                            exams.map((exam) => {
                                return (
                                    <tr key={exam.id}>
                                        <td>{exam.name}</td>
                                        <td>{exam.exam_date}</td>
                                        <td>{exam.exam_type_name}</td>
                                        <td>{exam.exam_format_name}</td>
                                        <td>{exam.max_score}</td>
                                        <td>{exam.passing_score}</td> 
                                        <td className="action-column">
                                            <NavLink to={"/instructor/exams/student-performance/" + exam.id}>
                                                <FontAwesomeIcon icon={faEye} style={iconStyle}/>
                                            </NavLink>
                                        </td>
                                    </tr>
                                )
                            })
                    }

                    </tbody>
                </table>
            </div>
        </Container>
    )
}