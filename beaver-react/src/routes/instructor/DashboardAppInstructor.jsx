import * as React from "react";
import '../../DashboardApp.css';
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../../components/Footer";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";
function DashboardAppInstructor() {
    // get current user details
    const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('user')));// [state, setState
    return (
        <>
            <DashboardSidebar />
            <div className="content">
                <DashboardHeader headerName={currentUser.name}/>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default DashboardAppInstructor;
