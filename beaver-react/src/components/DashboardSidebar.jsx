import './../DashboardApp.css';
import React, {useEffect, useState} from "react";
import StudentNavItems from "./StudentNavItems";
import QualityAssuranceNavItems from "./QualityAssuranceNavItems";
import InstructorNavItems from "./InstructorNavItems";
import CoordinatorNavItems from "./CoordinatorNavItems";
import AdministratorNavItems from "./AdministratorNavItems";
import {primaryColor} from "../colors";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function DashboardSidebar(){
    const [isContentExpanded, setIsContentExpanded] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    const handleToggleButtonClick = () => {
        setIsContentExpanded(!isContentExpanded);
        setIsSidebarCollapsed(!isSidebarCollapsed);
    }

    const handleCloseIconClick = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.add("collapsed");
    }

    const handleOpenIconClick = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("collapsed");
    }

    // get the current page url
    useEffect(() => {
        setCurrentUrl(window.location.href.replace('/student-performance', ''));
    }, []);

    // check if current url contains student after the base url
    const isStudentPage = currentUrl.includes('/student');
    const isQualityAssurancePage = currentUrl.includes('/quality-assurance');
    const isInstructorPage = currentUrl.includes('/instructor');
    const isCoordinatorPage = currentUrl.includes('/coordinator');
    const isAdministratorPage = currentUrl.includes('/administrator');

    const iconStyle = {
        width: '20px',
        height: '20px',
    }

    return(
        <div className={'sidebar'} style={{background:primaryColor}}>
            <div className="logo">
                <h1>Beaver Logo</h1>
                <span className={"d-sm-block d-md-none"} onClick={handleCloseIconClick}>
                    <i className="fas fa-times"></i>
                    <FontAwesomeIcon icon={faTimes} style={iconStyle}/>
                </span>

                {/*display below only if the sidebar is collapsed*/}
                <div className={"toggle-button d-none d-md-block mx-3"} onClick={handleOpenIconClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {isStudentPage ? (<StudentNavItems />) : (<> </>)}
            {isQualityAssurancePage ? (<QualityAssuranceNavItems />) : (<> </>)}
            {isInstructorPage ? (<InstructorNavItems />) : (<> </>)}
            {isCoordinatorPage ? (<CoordinatorNavItems />) : (<> </>)}
            {isAdministratorPage ? (<AdministratorNavItems />) : (<> </>)}

        </div>
    )
}