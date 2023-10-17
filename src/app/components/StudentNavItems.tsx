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

export default function StudentNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }
    return (
        <>
            <ul className="menu">
                <li>
                    <a href="/student">
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </a>
                </li>
                <li>
                    <a href="/student/courses">
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </a>
                </li>
                <li>
                    <a href="/student/profile">
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </a>
                </li>
                <li>
                    <a href="/student/grades">
                        <FontAwesomeIcon icon={faGraduationCap} style={iconStyle}/> Grades
                    </a>
                </li>
                <li>
                    <a href="/student/available-for-chat">
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </a>
                </li>
                <li>
                    <a href="/login">
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </a>
                </li>
            </ul>
        </>
    )
}