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

export default function InstructorNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }
    return (
        <>
            <ul className="menu">
                <li>
                    <NavLink to={"/instructor"}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/instructor/courses"}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/instructor/exams"}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Exams
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/instructor/profile"}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/instructor/available-for-chat"}>
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/login"}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}