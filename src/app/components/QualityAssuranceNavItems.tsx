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

export default function QualityAssuranceNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }

    return (
        <>
            <ul className="menu">
                <li>
                    <a href="/quality-assuarance">
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </a>
                </li>
                <li>
                    <a href="/quality-assuarance/courses">
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </a>
                </li>
                <li>
                    <a href="/quality-assuarance/profile">
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </a>
                </li>
                <li>
                    <a href="/quality-assuarance/available-for-chat">
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