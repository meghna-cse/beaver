import './../DashboardApp.css';
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faComments,
    faGraduationCap,
    faSignOutAlt,
    faTachometerAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import {useAuth} from "./utils/AuthProvider";

export default function StudentNavItems() {
    const {logout} = useAuth();

    function logoutAction(){
        logout();
    }
    const iconStyle = {
        marginRight: '10px',
    }
    return (
        <>
            <ul className="menu">
                <li>
                    <NavLink to={'/student'}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/courses'}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/profile'}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/grades'}>
                        <FontAwesomeIcon icon={faGraduationCap} style={iconStyle}/> Grades
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/student/available-for-chat'}>
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/login'} onClick={logoutAction}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}