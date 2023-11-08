import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faComments,
    faGraduationCap,
    faSignOutAlt,
    faTachometerAlt, faTicket,
    faUser, faUserFriends
} from "@fortawesome/free-solid-svg-icons";

export default function AdministratorNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }

    return (
        <>
            <ul className="menu">
                <li>
                    <a href="/administrator">
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </a>
                </li>
                <li>
                    <a href="/administrator/courses">
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </a>
                </li>
                <li>
                    <a href="/administrator/profile">
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </a>
                </li>
                <li>
                    <a href="/administrator/available-for-chat">
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </a>
                </li>
                <li>
                    <a href="/administrator/issue-management">
                        <FontAwesomeIcon icon={faTicket} style={iconStyle}/> Issue Management
                    </a>
                </li>
                <li>
                    <a href="/administrator/user-management">
                        <FontAwesomeIcon icon={faUserFriends} style={iconStyle}/> User Management
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