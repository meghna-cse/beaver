import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../../api/api";
import Swal from "sweetalert2";
import {Container} from "react-bootstrap";
export default function InstructorAddExam(){
     // get course id from param
     const {id} = useParams();
     const navigate = useNavigate();
 
     const [courses, setCourses] = useState([]);// [state, setState
     const [examTypes, setExamTypes] = useState([]);// [state, setState
     const [examFormats, setExamFormats] = useState([]);// [state, setState
 
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
 
     const handleSubmit = async(event) =>{
         event.preventDefault();
         // remove the course name from the form data
         delete formData.course_name;
 
         // convert formData to json string
         const data = JSON.stringify(formData);
 
         // make api call to update course objective
         try {
             const c = await postRequest('/exams', data);
             await Swal.fire({
                title: 'Exam added successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

             // navigate to course details page using history
             navigate(`/instructor/exams/student-performance/${c.data.data.id}`);
         }catch (e) {
             await Swal.fire({
                title: 'Error adding exam!',
                icon: 'error',
                confirmButtonText: 'OK',
                text: e.message ?? e.response.data.message
            });
             if (e.status === 404) {
                 // alert("Course not found");
             }else{
                 console.log(e);
                 // alert(e.data.message);
             }
         }
 
 
     }
 
     useEffect(() => {
         // fetch course details
         async function fetchCourseDetails(){
             // make api call to fetch all courses
             try {
                 const c = await getRequest('/courses');
                 setCourses(c.data.data);
             }catch (e) {
                 // show alert for error
                 // alert("An error occurred while fetching courses");
             }
         }

         async function fetchExamTypes(){
            try {
                const c = await getRequest('/exam-types');
                setExamTypes(c.data.data)
            }catch (e) {
                // show alert for error
                // alert("An error occurred while fetching exam types");
            }
        }

        async function fetchExamFormats(){
            try {
                const c = await getRequest('/exam-formats');
                setExamFormats(c.data.data)
            }catch (e) {
                // show alert for error
                // alert("An error occurred while fetching exam formats");
            }
        }
 
         fetchCourseDetails();
         fetchExamTypes();
         fetchExamFormats();
     }, []);
 
    return (
        <>
            <Container>
                <h2>Add Exam</h2>
                <form id="profile-form">
                    <div className="input-group">
                        <label htmlFor="exam_name">Exam Name:</label>
                        <input type="text" id="exam_name" name="exam_name"
                               required value={formData.exam_name} onChange={handleInputChange} /><br/><br/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="course_id">Course id:</label>
                        <select id="course_id" name="course_id" onChange={handleInputChange} required>
                            <option value={null} disabled={true} selected={true}>Select Course</option>
                            {
                                courses.map((course) => {
                                    return (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="exam_type">Select Exam Type:</label>
                        <select id="exam_type" name="exam_type" onChange={handleInputChange} required>
                            <option value={null} disabled={true} selected={true}>Select Exam Type</option>
                            {
                                examTypes.map((examType) => {
                                    return (
                                        <option key={examType.id} value={examType.id}>{examType.type}</option>
                                    )
                                })
                            }
                        </select>
                        <br/><br/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="exam_format">Select Exam Format:</label>
                        <select id="exam_format" name="exam_format" onChange={handleInputChange} required>
                            <option value={null} disabled={true} selected={true}>Select Exam Format</option>
                            {
                                examFormats.map((examFormat) => {
                                    return (
                                        <option key={examFormat.id} value={examFormat.id}>{examFormat.format}</option>
                                    )
                                })
                            }
                        </select>
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
            </Container>
        </>
    )
}