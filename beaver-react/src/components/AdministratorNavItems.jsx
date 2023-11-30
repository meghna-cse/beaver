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
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function AdministratorNavItems() {
    const iconStyle = {
        marginRight: '10px',
    }

    return (
        <>
            <ul className="menu">
                <li>
                    <NavLink to={'/administrator'}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle}/> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrator/courses'}>
                        <FontAwesomeIcon icon={faBook} style={iconStyle}/> Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrator/profile'}>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrator/available-for-chat'}>
                        <FontAwesomeIcon icon={faComments} style={iconStyle}/> Chat
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrator/issue-management'}>
                        <FontAwesomeIcon icon={faTicket} style={iconStyle}/> Issue Management
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/administrator/user-management'}>
                        <FontAwesomeIcon icon={faUserFriends} style={iconStyle}/> User Management
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/login'}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle}/> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}