import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";

export default function InstructorAddCourseObjective(){
    // get course id from param
    const {id} = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({});// [state, setState

    const [formData, setFormData] = useState({
        name: "",
        course_name: course.name,
        course_id: id,
        description: ""
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        // remove the course name from the form data
        delete formData.course_name;

        console.log(formData);

        // convert formData to json string
        const data = JSON.stringify(formData);

        // make api call to update course objective
        // http://beaver-backend.tvtv/course_objectives.php
        try {
            const c = postRequest('/add_course_objectives.php', data);
            alert("Course objective added successfully");
            // navigate to course details page using history
            navigate(`/instructor/courses/details/${id}`);
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

    useEffect(() => {
        // FETCH COURSE DETAILS
        async function fetchCourseDetails(){
            // make api call to fetch all courses
            try {
                const c = await getRequest('/courses.php');
                setCourse(c.data.data ? c.data.data[0] : {});
                setFormData({
                    ...formData,
                    course_name: c.data.data ? c.data.data[0].name : ""
                })
            }catch (e) {
                // show alert for error
                alert("An error occurred while fetching courses");
            }
        }

        fetchCourseDetails();
    }, []);

    const iconStyle = {
        width: '20px',
        height: '20px',
        marginRight: '10px',
        marginLeft: '10px'
    }

    return (
        <>
            <div className={"form-container"}>
            <h2>Add Course Objective</h2>
            <form id="profile-form">
                
                <div className="input-group">
                    <label htmlFor="name">Objective Name:</label>
                    <input type="text" id="name" name="name"
                           required value={formData.name} onChange={handleInputChange}/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="description">Course Objective:</label>
                    <textarea id="description" name="description" rows={5}
                              value={formData.description} onChange={handleInputChange}
                              required></textarea><br/><br/>
                </div>

                <input type="submit" onClick={handleSubmit} value="Add Course Objective"/>
            </form>
            </div>
        </>
    )
}