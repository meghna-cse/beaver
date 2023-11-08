    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";

export default function QAAddFeedback(){
    const iconStyle = {
        width: '20px',
        height: '20px',
    }
    const {id} = useParams();
    const [exams, setExams] = useState([]);
    const [course, setCourse] = useState({});
    const [courseObjectives, setCourseObjectives] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({
        course_id: id,
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }


    function handleSubmit(event){
        event.preventDefault();

        console.log(formData);

        // convert formData to json string
        const data = JSON.stringify(formData);

        // make api call to update course objective
        // http://beaver-backend.tvtv/course_objectives.php
        try {
            const c = postRequest('/add_qa_feedback.php', data);
            alert("Feedback added successfully");
            // navigate to course details page using history
            navigate(`/quality-assurance/courses`);
            // history.push(`/instructor/courses/details/${courseId}`);
        }catch (e) {
            if (e.status === 404) {
                // alert("Course not found");
            }else{
                console.log(e);
                // alert(e.data.message);
            }
        }


    }

    // fetch the course details from the api
    useEffect(() => {
        async function fetchCourseDetails(){
            try {
                const details = await getRequest(`/courses.php?id=${id}`);
                console.log(details.data.data ? details.data.data : {});
                setCourse(details.data.data ? details.data.data[0] : {});
            }catch (e) {
                alert("Course not found");
            }
        }
        fetchCourseDetails();
    }, []);

    useEffect(() => {
        async function fetchExams(){
            try {
                //http://beaver-backend.tvtv/exams.php?course_id=1
                const e = await getRequest(`/exams.php?course_id=${id}`);
                setExams(e.data.data);
            }catch (e) {
                console.log(e);
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Exams not found");
                }else{
                    alert("An error occurred while fetching exams");
                }
            }
        }

        async function fetchCourseObjectives(){
            try {
                //http://beaver-backend.tvtv/course_objectives.php?course_id=1
                console.log(user.role);
                const obj = await getRequest(`/course_objectives.php?course_id=${id}`);
                setCourseObjectives(obj.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Course objectives not found");
                }else{
                    // alert("An error occurred while fetching course objectives");
                }
            }
        }
        fetchCourseObjectives();
        fetchExams();
    },[course]);


    return (
        <>
            <div className="container">
            <div className="course-card">
                <h2>Add Feedback</h2>
                <form id="profile-form">
                    <div className="input-group">
                        <label htmlFor="comment_on">Comment on:</label>
                        <select name="comment_on" id="comment_on" onChange={handleInputChange} >
                        <option disabled selected value> -- select an option -- </option>
                            {
                                exams.map((exam) => {
                                    return (
                                       
                                        <option value={exam.id}>{exam.name}</option>
                                        
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="course_obj">Course Objective</label>
                        <select name="course_obj" id="course_obj" onChange={handleInputChange} >
                        <option disabled selected value> -- select an option -- </option>
                            {
                                courseObjectives.map((exam) => {
                                    return (
                                       
                                        <option value={exam.id}>{exam.name}</option>
                                        
                                    )
                                })
                            }
                        </select>
                    </div>


                    <div className="input-group">
                        <label htmlFor="comment">Comment:</label>
                        <input type="text" id="comment" name="comment" required onChange={handleInputChange} /><br/><br/>
                    </div>

                    <input type="submit" value="Add Feedback" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
        </>
    )
}