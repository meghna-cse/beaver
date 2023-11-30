import {useState} from "react";
import {getRequest, postRequest} from "../api/api";
import {useAuth} from "../components/utils/AuthProvider";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import Swal from "sweetalert2";

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

        try {
            // make api call to login
            const response = await postRequest('/login', formData);

            // if login is successful, redirect to home page
            if(response.data.status === "success"){
                login(response.data.data.user,response.data.data.token);
                // navigate to appropriate page based on the user's role USING
                userDashboard(response.data.data.user)
            } else{
                // alert(response.data.message);
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        }catch (e){
            if (e.response.status >= 400) {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: e.response.data.message,
                });
            }else{
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: e.response.data.message,
                });
            }
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
        <Container>
            <h2>Login</h2>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username"
                                  value={formData.username} onChange={handleInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password"
                                  value={formData.password} onChange={handleInputChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <div>
                <NavLink to={`/register`}>Don't have an account? Register</NavLink>
                <br/>
                <NavLink to={`/forgot-password`}>Forgot Password?</NavLink>
            </div>
        </Container>
    )
}