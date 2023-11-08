import * as React from "react";
import '../../DashboardApp.css';
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../../components/Footer";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";
function DashboardAppQA() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            <DashboardSidebar />
            <div className="content">
                <DashboardHeader headerName={user.name}/>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default DashboardAppQA;
