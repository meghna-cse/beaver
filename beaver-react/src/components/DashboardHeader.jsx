import React, {useEffect, useState} from "react";
import "./../toggle.css";
import {primaryColor} from "../colors";
import {Card, Container} from "react-bootstrap";

export default function DashboardHeader(props) {
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleToggleButtonClick = () => {
        console.log('toggle button clicked')
        // setIsContentExpanded(true);
        // setIsSidebarCollapsed(false);
        // remove the class 'collapsed' from the sidebar
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("collapsed");
        // add the class 'expanded' to the content
        // const content = document.querySelector(".content");
    }

    const handleCloseIconClick = () => {
        setIsContentExpanded(false);
        setIsSidebarCollapsed(false);
    }

    // const toggleButton = document.querySelector(".toggle-button");
    //     const sidebar = document.querySelector(".sidebar");
    //     const content = document.querySelector(".content");
    //     const closeIcon = document.querySelector(".close-icon");
    //
    //     toggleButton.addEventListener("click", () => {
    //         sidebar.classList.toggle("collapsed");
    //         content.classList.toggle("expanded");
    //     });
    //
    //     closeIcon.addEventListener("click", () => {
    //         sidebar.classList.toggle("collapsed");
    //         content.classList.toggle("expanded");
    //     });
    return (
        <header style={{background:primaryColor}}>
            <div className="toggle-button" onClick={handleToggleButtonClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1>Welcome, {props.headerName}!</h1>
        </header>
    )
}