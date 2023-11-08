import {useEffect, useState} from "react";
import {getRequest} from "../api/api";
import {NavLink} from "react-router-dom";

export default function AvailableForChat(){
    const [adminUsers, setAdminUsers] = useState([]);// [state, setState
    const [instructors, setInstructors] = useState([]);// [state, setState
    const [coordinators, setCoordinators] = useState([]);// [state, setState
    const [students, setStudents] = useState([]);// [state, setState

    // get current user details
    const[currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));// [state, setState

    // get admin users
    useEffect(() => {
        async function fetchAdminUsers(){
            try {
                //http://beaver-backend.tvtv/admin_users.php
                const adminUsers = await getRequest(`/users.php?role_id=3`);
                setAdminUsers(adminUsers.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Admin users not found");
                }else{
                    alert("An error occurred while fetching admin users");
                }
            }
        }

        async function fetchInstructors(){
            try {
                const instructors = await getRequest(`/users.php?role_id=5`);
                setInstructors(instructors.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Instructors not found");
                }else{
                    alert("An error occurred while fetching instructors");
                }
            }
        }

        // fetch coordinators
        async function fetchCoordinators(){
            try {
                const coordinators = await getRequest(`/users.php?role_id=2`);
                setCoordinators(coordinators.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Coordinators not found");
                }else{
                    alert("An error occurred while fetching coordinators");
                }
            }
        }

        // fetch students
        async function fetchStudents(){
            try {
                const students = await getRequest(`/users.php?role_id=1`);
                setStudents(students.data.data);
            }catch (e) {
                // if http status code is 404, show alert
                if(e.status === 404){
                    alert("Students not found");
                }else{
                    alert("An error occurred while fetching students");
                }
            }
        }

        fetchAdminUsers()
            .then(() => {
                if (currentUser.role_name === "administrator"){
                    setAdminUsers(adminUsers.filter((adminUser)=>adminUser.id !== currentUser.id));
                }
            });
        fetchInstructors()
            .then(() => {
                if (currentUser.role_name === "instructor"){
                    setInstructors(instructors.filter((instructor)=>instructor.id !== currentUser.id));
                }
            });
        fetchCoordinators()
            .then(() => {
                if (currentUser.role_name === "coordinator"){
                    setCoordinators(coordinators.filter((coordinator)=>coordinator.id !== currentUser.id));
                }
            });
        fetchStudents()
            .then(() => {
                if (currentUser.role_name === "student"){
                    setStudents(students.filter((student)=>student.id !== currentUser.id));
                }
            });
    }, []);

    return (
        <>
            <div className="container">
                <div className="course-card">
                    <h2>Admin</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                adminUsers.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <NavLink to={`${user.id}`} className="btn">
                                                    Chat
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Course Instructors</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                instructors.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <NavLink to={`${user.id}`} className="btn">
                                                    Chat
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Program Co-ordinators</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                coordinators.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <NavLink to={`${user.id}`} className="btn">
                                                    Chat
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="course-card">
                    <h2>Students</h2>
                    <div className="table-container">
                        <table className="performance-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Chat</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>
                                                <NavLink to={`${user.id}`} className="btn">
                                                    Chat
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}