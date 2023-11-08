import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/UseLocalStorage";


export const ProtectedRoute = ({ children }) => {
    const [routeRole,setRouteRole] = useState('');
    const [currentUrl, setCurrentUrl] = useState('');
    const location = useLocation();

    const userFromContext = useAuth();
    console.log("userFromContext: " + userFromContext.user);

    // get the user from the local storage using get itemc
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    // useEffect(() => {
    //     // check if current url contains student after the base url
    //     const isStudentPage = location.pathname.includes('/student');
    //     const isQualityAssurancePage = location.pathname.includes('/quality-assurance');
    //     const isInstructorPage = location.pathname.includes('/instructor');
    //     const isCoordinatorPage = location.pathname.includes('/coordinator');
    //     const isAdministratorPage = location.pathname.includes('/administrator');
    //
    //     // check if the user role is the same as the route role
    //     if (user && user.role_name === "student" && !isStudentPage) {
    //         setCurrentUrl("/student");
    //     } else if (user && user.role_name === "quality-assurance" && !isQualityAssurancePage) {
    //         setCurrentUrl("/quality-assurance");
    //     }else if (user && user.role_name === "instructor" && !isInstructorPage) {
    //         setCurrentUrl("/instructor");
    //     }else if (user && user.role_name === "coordinator" && !isCoordinatorPage) {
    //         setCurrentUrl("/coordinator");
    //     }else if (user && user.role_name === "administrator" && !isAdministratorPage) {
    //         setCurrentUrl("/administrator");
    //     }else if (!user) {
    //         setCurrentUrl("/");
    //     }
    // }, [location.pathname, user]);

    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }

    // if user role name is not defined navigate to the home page
    if (!user.role_name) {
        return <Navigate to="/" />;
    }

    return children;
};