'use client';
import React, {useState} from "react";

export default function DashboardHeader(props: any){
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleToggleButtonClick = () => {
        setIsContentExpanded(!isContentExpanded);
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }

    const handleCloseIconClick = () => {
        setIsContentExpanded(false);
        setIsSidebarCollapsed(false);
    }

    return (
        <header>
            <div className="toggle-button" onClick={handleToggleButtonClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h1>Welcome, {props.headerName}!</h1>
        </header>
    )
}