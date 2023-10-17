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

export default function InstructorNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }
    return (
        <>
            <ul className="menu">
                <li>
                    <a href="/instructor">
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </a>
                </li>
                <li>
                    <a href="/instructor/courses">
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </a>
                </li>
                <li>
                    <a href="/instructor/exams">
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Exams
                    </a>
                </li>
                <li>
                    <a href="/instructor/profile">
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </a>
                </li>
                <li>
                    <a href="/instructor/available-for-chat">
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