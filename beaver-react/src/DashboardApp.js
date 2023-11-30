import * as React from "react";
import './DashboardApp.css';
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import {Container} from "react-bootstrap";
import DashboardFooter from "./components/DashboardFooter";
function DashboardApp() {
    // fetch the user name from the local storage
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    return (
        <Container fluid>
            <DashboardSidebar/>
            <div className="content">
                <DashboardHeader headerName={user.name}/>
                <main>
                    <Outlet/>
                </main>
            </div>
            <DashboardFooter/>
        </Container>
    )
}

export default DashboardApp;
