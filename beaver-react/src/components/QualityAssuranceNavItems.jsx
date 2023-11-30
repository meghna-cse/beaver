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

export default function QualityAssuranceNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }

    return (
        <>
            <ul className="menu">
                <li>
                    <NavLink to={"/quality-assurance"}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/quality-assurance/courses"}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/quality-assurance/profile"}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/quality-assurance/feedback-analysis"}>
                        <FontAwesomeIcon icon={faCommentDots} style={iconStyle}/> Student Feedback
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/quality-assurance/available-for-chat"}>
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