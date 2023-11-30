import {useState} from "react";
import {getRequest, postRequest} from "../api/api";
import {useAuth} from "../components/utils/AuthProvider";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import Swal from "sweetalert2";

export default function ForgotPassword(){
   // create json object to store form data
    const [formData, setFormData] = useState({
        email: "",
    });

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
            const response = await postRequest('/forgot-password', formData);

            // if login is successful, redirect to home page
            if(response.data.status === "success"){
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });
            }else{
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

    return (
        <Container>
            <h2>Forgot Password</h2>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"
                                  value={formData.email} onChange={handleInputChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}