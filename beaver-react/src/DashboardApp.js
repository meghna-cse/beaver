import * as React from "react";
import './DashboardApp.css';
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import {ProtectedRoute} from "./components/utils/ProtectedRoute";
import {AuthLayout} from "./components/utils/AuthLayout";
function DashboardApp() {
    // fetch the user name from the local storage
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <>
            <DashboardSidebar/>
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

export default DashboardApp;
