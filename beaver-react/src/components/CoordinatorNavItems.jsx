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

export default function CoordinatorNavItems() {
    const {logout} = useAuth();

    const iconStyle = {
        marginRight: '10px',
    }

    function logoutAction(){
        logout();
    }

    return (
        <>
            <ul className="menu">
                <li>
                    <NavLink to={`/coordinator`}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/coordinator/courses`}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/coordinator/profile`}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/coordinator/feedback-analysis"}>
                        <FontAwesomeIcon icon={faCommentDots} style={iconStyle}/> Student Feedback
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/coordinator/available-for-chat`}>
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/login`} onClick={logoutAction}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}