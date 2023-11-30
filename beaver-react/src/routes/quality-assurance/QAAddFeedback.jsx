    import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";
    import async from "async";
    import Swal from "sweetalert2";

export default function QAAddFeedback(){
    const iconStyle = {
        width: '20px',
        height: '20px',
    }
    const {id} = useParams();
    const [exams, setExams] = useState([]);
    const [course, setCourse] = useState({});
    const [courseObjectives, setCourseObjectives] = useState([])
    const [commentOn, setCommentOn] = useState(''); // ['','exam', 'course_objective']
    const user = JSON.parse(localStorage.getItem('user'));
    const [selectedExam, setSelectedExam] = useState();
    const [formData, setFormData] = useState({
        comment: '',
        exam_id: '',
        course_objective_id: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        // if the changed input is comment_on, set commentOn state and disappear the other select
        if(event.target.name === 'comment_on'){
            setCommentOn(event.target.value);
            if(event.target.value === 'exam'){
                document.getElementById('course_objective_div').style.display = 'none';
                document.getElementById('exam_div').style.display = 'block';
                // unset course_objective_id
                setFormData({
                    ...formData,
                    course_objective_id: ''
                });
            }else if(event.target.value === 'course_objective'){
                document.getElementById('exam_div').style.display = 'none';
                document.getElementById('course_objective_div').style.display = 'block';
                // unset exam_id
                setFormData({
                    ...formData,
                    exam_id: ''
                });
            }
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        // if any element in formData is '' or null, remove it from formData
        for (const [key, value] of Object.entries(formData)) {
            if(value === '' || value === null){
                delete formData[key];
            }
        }

        // convert formData to json string
        const data = JSON.stringify(formData);
        let response = null;
        // make api call to update course objective
        try {
            response = await postRequest('/qa-feedback', data);

            await Swal.fire({
                title: 'Feedback added successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // navigate to course details page using history
            navigate(`/quality-assurance/courses/details/${id}`);
        }catch (e) {
            // display the validation error from the backend
            await Swal.fire({
                title: 'Error adding feedback!',
                icon: 'error',
                confirmButtonText: 'OK',
                text:  response != null ? response.data.message : "Error adding feedback"
            });

            // if (e.status > 400) {
            //     // alert("Course not found");
            // }else{
            //     // console.log(e);
            //     // alert(e.data.message);
            // }
        }


    }

    // fetch the course details from the api
    useEffect(() => {
        async function fetchCourseDetails(){
            try {
                const details = await getRequest(`/courses/${id}`);
                setCourse(details.data.data);
            }catch (e) {
                // alert("Course not found");
            }
        }
        fetchCourseDetails();
    }, []);

    useEffect(() => {
        async function fetchExams(){
            try {
                const e = await getRequest(`/exams?course_id=${id}`);
                setExams(e.data.data);
            }catch (e) {
                console.log(e);
                // if http status code is 404, show alert
                if(e.status === 404){
                    // alert("Exams not found");
                }else{
                    // alert("An error occurred while fetching exams");
                }
            }
        }

        async function fetchCourseObjectives(){
            try {
                const obj = await getRequest(`/course-objectives?course_id=${id}`);
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
                        <label htmlFor="comment_on">Comment On:</label>
                        <select name="comment_on" id="comment_on" defaultValue={""}
                                onChange={handleInputChange}>
                            <option disabled value={""}> -- select an option -- </option>
                            <option value="exam">Exam</option>
                            <option value="course_objective">Course Objective</option>
                        </select>
                    </div>

                    <div className="input-group" id="course_objective_div">
                        <label htmlFor="course_objective_id">Course Objective</label>
                        <select name="course_objective_id" id="course_objective_id" defaultValue={""}
                                onChange={handleInputChange} >
                        <option disabled value={""}> -- select an option -- </option>
                            {
                                courseObjectives.map((courseObjective) => {
                                    return (
                                        <option key={courseObjective.id} value={courseObjective.id}>{courseObjective.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="input-group" id="exam_div">
                        <label htmlFor="exam_id">Exam</label>
                        <select name="exam_id" id="exam_id" defaultValue={""} onChange={handleInputChange} >
                        <option disabled value={""}> -- select an option -- </option>
                            {
                                exams.map((exam) => {
                                    return (
                                        <option key={exam.id} value={exam.id}>{exam.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="comment">Comment:</label>
                        <input type="text" id="comment" name="comment" required
                               onChange={handleInputChange} /><br/><br/>
                    </div>

                    <input type="submit" value="Add Feedback" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
        </>
    )
}