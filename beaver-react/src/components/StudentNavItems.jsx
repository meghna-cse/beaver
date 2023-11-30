import './../DashboardApp.css';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faComments,
    faCommentDots,
    faGraduationCap,
    faSignOutAlt,
    faTachometerAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {useAuth} from "./utils/AuthProvider";
import {primaryColor} from "../colors";

export default function StudentNavItems() {
    const {logout} = useAuth();

    function logoutAction(){
        handleCloseIconClick();
        logout();
    }

    const iconStyle = {
        marginRight: '10px',
    }

    const handleCloseIconClick = () => {
        // check if the screen width is small
        // const sidebar = document.querySelector(".sidebar");
        // sidebar.classList.add("collapsed");
    }

    return (
        <>
            <ul className="menu" style={{background:primaryColor}}>
                <li>
                    <NavLink to={'/student'} onClick={() => {handleCloseIconClick()}}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/courses'} onClick={() => {handleCloseIconClick()}}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/profile'} onClick={() => {handleCloseIconClick()}}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/grades'} onClick={() => {handleCloseIconClick()}}>
                        <FontAwesomeIcon icon={faGraduationCap} style={iconStyle}/> Grades
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/feedback'}>
                        <FontAwesomeIcon icon={faCommentDots} style={iconStyle}/> Feedback
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/available-for-chat'} onClick={() => {handleCloseIconClick()}}>
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/login'} onClick={logoutAction} >
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}