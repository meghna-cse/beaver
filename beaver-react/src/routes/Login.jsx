import {useState} from "react";
import {getRequest, postRequest} from "../api/api";
import {useAuth} from "../components/utils/AuthProvider";
import {NavLink, useNavigate} from "react-router-dom";

export default function Login(){
   // create json object to store form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // convert formData to json string

        // make api call to login
        const response = await postRequest('/login.php', formData);

        // if login is successful, redirect to home page
        if(response.data.status === "success"){
            login(response.data.data.user,response.data.data.token);
            console.log(response.data.data.user);
            // navigate to appropriate page based on the user's role USING
            userDashboard(response.data.data.user)
        }else{
            alert(response.data.message);
        }
    }

    const userDashboard = (user) => {
        // check if user is student
        if (user.role_name === "student") {
            navigate("/student");
        }
        // check if user is instructor
        if (user.role_name === "instructor") {
            navigate("/instructor");
        }
        // check if user is coordinator
        if (user.role_name === "coordinator") {
            navigate("/coordinator");
        }
        // check if user is quality assurance
        if (user.role_name === "qa") {
            navigate("/quality-assurance");
        }
        // check if user is administrator
        if (user.role_name === "administrator") {
            navigate("/administrator");
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required/>
                    </div>
                    <button type="submit">Login</button>
                    <div>
                        {/*<a href="register.html">Don't have an account? Register</a>*/}
                        <NavLink to={`/register`}>Don't have an account? Register</NavLink>
                        <span className="space-between"></span>
                        {/*<a href="forgot-password.html">Forgot Password?</a>*/}
                    </div>
                </form>
            </div>
        </div>
    )
}