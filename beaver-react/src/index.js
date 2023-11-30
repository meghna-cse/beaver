import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, useLocation} from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Services from "./routes/Services";
import Register from "./routes/Register";
import Login from "./routes/Login";
import DashboardApp from "./DashboardApp";
import StudentHome from "./routes/student/StudentHome";
import StudentCourses from "./routes/student/StudentCourses";
import CourseDetails from "./components/CourseDetails";
import CourseDetails_QA from "./components/CourseDetails_QA";
import CourseDetails_InsPC from "./components/CourseDetails_InsPC";
import CourseDetails_PC from "./components/CourseDetails_PC";
import Profile from "./components/Profile";
import StudentGrades from "./routes/student/StudentGrades";
import AvailableForChat from "./components/AvailableForChat";
import Chat from "./components/Chat";
import InstructorHome from "./routes/instructor/InstructorHome";
import InstructorCourses from "./routes/instructor/InstructorCourses";
import InstructorAddCourse from "./routes/instructor/InstructorAddCourse";
import InstructorExams from "./routes/instructor/InstructorExams";
import InstructorAddExam from "./routes/instructor/InstructorAddExam";
import InstructorAddPerformance from "./routes/instructor/InstructorAddPerformance";
import InstructorStudentPerformance from "./routes/instructor/InstructorStudentPerformance";
import InstructorAddCourseObjective from "./routes/instructor/InstructorAddCourseObjective";
import CoordinatorHome from "./routes/coordinator/CoordinatorHome";
import CoordinatorAddCourse from "./routes/coordinator/CoordinatorAddCourse";
import UserManagement from "./routes/administrator/UserManagement";
import UpdateUser from "./routes/administrator/UpdateUser";
import QualityAssuranceHome from "./routes/quality-assurance/QualityAssuranceHome";
import QualityAssuranceCourses from "./routes/quality-assurance/QualityAssuranceCourses";
import QAAddFeedback from "./routes/quality-assurance/QAAddFeedback";
import AdministratorAddCourse from "./routes/administrator/AdministratorAddCourse";
import AdminCourseDetails from "./routes/administrator/AdminCourseDetails";
import CourseDetails_Admin from "./components/CourseDetails_Admin";
import IssueManagement from "./routes/administrator/IssueManagement";
import AddUser from "./routes/administrator/AddUser";
import DashboardAppAdministrator from "./routes/administrator/DashboardAppAdministrator";
import DashboardAppCoordinator from "./routes/coordinator/DashboardAppCoordinator";
import CoordinatorCourses from "./routes/coordinator/CoordinatorCourses";
import DashboardAppInstructor from "./routes/instructor/DashboardAppInstructor";
import DashboardAppQA from "./routes/quality-assurance/DashboardAppQA";
import AdministratorHome from "./routes/administrator/AdministratorHome";
import {ProtectedRoute} from "./components/utils/ProtectedRoute";
import {AuthLayout} from "./components/utils/AuthLayout";
import {AuthProvider} from "./components/utils/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from "./routes/ForgotPassword";
import FailedEmailVerification from "./routes/FailedEmailVerification";
import ResetPassword from "./routes/ResetPassword";
import StudentFeedbackForm from './routes/student/StudentFeedbackForm';
import FeedbackAnalysis from './components/FeedbackAnalysis';

const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 3000)
    );

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider><App/></AuthProvider>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/services",
                element: <Services/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/login",
                element:<Login/>,
            },
            {
                path: "/forgot-password",
                element:<ForgotPassword/>,
            },
            {
                path: "/failed-email-verification",
                element:<FailedEmailVerification/>,
            },
            {
                path: "/reset-password/:token",
                element:<ResetPassword/>,
            }
        ]
    },
    {
        path: "/student",
        element: <ProtectedRoute><DashboardApp/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/student",
                element: <StudentHome/>
            },
            {
                path: "/student/courses",
                element:<StudentCourses/>,
            },
            {
                path: "/student/courses/details/:id",
                element:<CourseDetails />,
            },
            {
                path: "/student/profile",
                element: <Profile/>,
            },
            {
                path: "/student/grades",
                element:<StudentGrades/>,
            },
            {
                path: "/student/available-for-chat",
                element: <AvailableForChat/>,
            },
            {
                path: "/student/available-for-chat/:id",
                element: <Chat/>,
            },
            {
                path: "/student/feedback",
                element: <StudentFeedbackForm/>,
            }
        ]
    },
    {
        path: "/instructor",
        element: <ProtectedRoute><DashboardAppInstructor/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/instructor/",
                element: <InstructorHome/>
            },
            {
                path: "/instructor/courses",
                element: <InstructorCourses/>,
            },
            {
                path: "/instructor/courses/add-course",
                element: <InstructorAddCourse/>,
            },
            {
                path: "/instructor/profile",
                element: <Profile/>,
            },
            {
                path: "/instructor/available-for-chat",
                element: <AvailableForChat/>,
            },
            {
                path: "/instructor/available-for-chat/:id",
                element: <Chat/>,
            },
            {
                path: "/instructor/courses/details/:id",
                element: <CourseDetails_InsPC/>,
            },
            {
                path: "/instructor/exams",
                element:<InstructorExams/>,
            },
            {
                path: "/instructor/exams/student-performance/:id",
                element:<InstructorStudentPerformance/>,
            },
            {
                path: "/instructor/exams/student-performance/:examId/add",
                element:<InstructorAddPerformance/>,
            },
            {
                path: "/instructor/exams/add-exam",
                element:<InstructorAddExam/>,
            },
            {
                path: "/instructor/courses/details/:id/add-course-objective",
                element:<InstructorAddCourseObjective/>,
            }
        ]
    },
    {
        path: "/coordinator",
        element: <ProtectedRoute><DashboardAppCoordinator/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/coordinator/",
                element: <CoordinatorHome/>
            },
            {
                path: "/coordinator/profile",
                element: <Profile/>,
            },
            {
                path: "/coordinator/available-for-chat",
                element: <AvailableForChat/>,
            },
            {
                path: "/coordinator/available-for-chat/:id",
                element: <Chat/>,
            },
            {
                path: "/coordinator/courses",
                element: <CoordinatorCourses/>,
            },
            {
                path: "/coordinator/courses/details/:id",
                element:<CourseDetails_PC/>,
            },
            {
                path: "/coordinator/courses/add-course",
                element: <CoordinatorAddCourse/>,
            },
            {
                path: "/coordinator/feedback-analysis",
                element: <FeedbackAnalysis/>,
            }
        ]
    },
    {
        path: "/administrator",
        element: <ProtectedRoute><DashboardAppAdministrator/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/administrator/",
                element: <AdministratorHome/>
            },
            {
                path: "/administrator/profile",
                element: <Profile/>,
            },
            {
                path: "/administrator/available-for-chat",
                element: <AvailableForChat/>,
            },
            {
                path: "/administrator/available-for-chat/:id",
                element: <Chat/>,
            },
            {
                path: "/administrator/user-management",
                element: <UserManagement/>,
            },
            {
                path: "/administrator/user-management/update-user",
                element: <UpdateUser/>,
            },
            {
                path: "/administrator/user-management/add-user",
                element: <AddUser/>,
            },
            {
                path: "/administrator/issue-management",
                element: <IssueManagement/>,
            },
            {
                path: "/administrator/courses",
                element: <AdminCourseDetails/>,
            },
            {
                path: "/administrator/courses/details/:id",
                element: <CourseDetails_Admin/>,
            },
            {
                path: "/administrator/courses/add-course",
                element: <AdministratorAddCourse/>,
            },
        ]
    },
    {
        path: "/quality-assurance",
        element: <ProtectedRoute><DashboardAppQA/></ProtectedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/quality-assurance/",
                element: <QualityAssuranceHome/>,
            },
            {
                path: "/quality-assurance/profile",
                element: <Profile/>,
            },
            {
                path: "/quality-assurance/available-for-chat",
                element: <AvailableForChat/>,
            },
            {
                path: "/quality-assurance/available-for-chat/:id",
                element: <Chat/>,
            },
            {
                path: "/quality-assurance/courses",
                element: <QualityAssuranceCourses/>,
            },
            {
                path: "/quality-assurance/courses/details/:id",
                element: <CourseDetails_QA/>,
            },
            {
                path: "/quality-assurance/courses/details/feedback/:id",
                element: <QAAddFeedback/>,
            },
            {
                path: "/quality-assurance/feedback-analysis",
                element: <FeedbackAnalysis/>,
            }

        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/*<App />*/}
  //
  // </React.StrictMode>
<RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
