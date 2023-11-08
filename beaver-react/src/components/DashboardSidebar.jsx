import './../DashboardApp.css';
import React, {useEffect, useState} from "react";
import StudentNavItems from "./StudentNavItems";
import QualityAssuranceNavItems from "./QualityAssuranceNavItems";
import InstructorNavItems from "./InstructorNavItems";
import CoordinatorNavItems from "./CoordinatorNavItems";
import AdministratorNavItems from "./AdministratorNavItems";

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

    return(
        <div className={'sidebar'}>
         {/* <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isContentExpanded ? 'expanded' : ''}`}> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
            <div className="logo">
                <h1>Beaver Logo</h1>
                <span className="close-icon" onClick={handleCloseIconClick}><i className="fas fa-times"></i></span>
            </div>

            {isStudentPage ? (<StudentNavItems />) : (<> </>)}
            {isQualityAssurancePage ? (<QualityAssuranceNavItems />) : (<> </>)}
            {isInstructorPage ? (<InstructorNavItems />) : (<> </>)}
            {isCoordinatorPage ? (<CoordinatorNavItems />) : (<> </>)}
            {isAdministratorPage ? (<AdministratorNavItems />) : (<> </>)}

        </div>
    )
}