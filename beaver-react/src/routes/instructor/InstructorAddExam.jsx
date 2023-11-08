import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";
export default function InstructorAddExam(){


     // get course id from param
     const {id} = useParams();
     const navigate = useNavigate();
 
     const [course, setCourse] = useState({});// [state, setState
 
     const [formData, setFormData] = useState({
         course_id: "",
         exam_type: "",
         exam_format: "",
         exam_name : "",
         max_score : "",
         passing_score: "",
         exam_date : ""
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
             const c = postRequest('/add_exam.php', data);
             alert("exam added successfully");
             // navigate to course details page using history
             navigate(`/instructor/exams`);
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
 
    return (
        <>
            <div className={"form-container"}>
            <h2>Add Exam</h2>
            <form id="profile-form">
                <div className="input-group">
                    <label htmlFor="exam_name">Exam Name:</label>
                    <input type="text" id="exam_name" name="exam_name"
                           required value={formData.exam_name} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="course_id">Course id:</label>
                    <input type="text" id="course_id" name="course_id"
                           required value={formData.course_id} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_type_id">Select Exam Type:</label>
                    <input type="text" id="exam_type" name="exam_type"
                           required value={formData.exam_type} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_format_id">Select Exam Format:</label>
                    <input type="text" id="exam_format" name="exam_format"
                           required value={formData.exam_format} onChange={handleInputChange} /><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="max_score">Max Score</label>
                    <input type="number" id="max_score" name="max_score"
                           required value={formData.max_score} onChange={handleInputChange}/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="passing_score">Passing Score</label>
                    <input type="number" id="passing_score" name="passing_score"
                           required  value={formData.passing_score} onChange={handleInputChange}/><br/><br/>
                </div>

                <div className="input-group">
                    <label htmlFor="exam_date">Exam Date:</label>
                    <input type="date" id="exam_date" name="exam_date"
                           required  value={formData.exam_date} onChange={handleInputChange}/><br/><br/>
                </div>

                <input type="submit" value="Add Exam" onClick={handleSubmit}/>
            </form>
            </div>
        </>
    )
}