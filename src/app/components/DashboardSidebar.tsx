'use client';
import React, {useState} from "react";
import StudentNavItems from "@/app/components/StudentNavItems";
import QualityAssuranceNavItems from "@/app/components/QualityAssuranceNavItems";
import InstructorNavItems from "@/app/components/InstructorNavItems";
import CoordinatorNavItems from "@/app/components/CoordinatorNavItems";
import AdministratorNavItems from "@/app/components/AdministratorNavItems";

export default function DashboardSidebar(){
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

    // get the current page url
    let currentUrl = window.location.href;

    currentUrl = currentUrl.replace('/student-performance', '');


    // check if current url contains student after the base url
    const isStudentPage = currentUrl.includes('/student');
    // remove student-performance from the current url string

    const isQualityAssurancePage = currentUrl.includes('/quality-assuarance');
    const isInstructorPage = currentUrl.includes('/instructor');
    const isCoordinatorPage = currentUrl.includes('/coordinator');
    const isAdministratorPage = currentUrl.includes('/administrator');

    return(
        <div className={'sidebar' + (isSidebarCollapsed ? ' collapsed' : '')}>
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