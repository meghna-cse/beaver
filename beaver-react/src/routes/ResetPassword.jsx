import {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";
import {postRequest} from "../api/api";

export default function ResetPassword(){
    const {token} = useParams();

    const navigate = useNavigate();

    // create json object to store form data
    const [formData, setFormData] = useState({
        token: token,
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // ensure passwords match
        if(formData.password !== formData.confirm_password){
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match",
            });
            return;
        }

        try {
            // make api call to forgot password
            const response = await postRequest('/update-password', formData);

            // if login is successful, redirect to home page
            if(response.data.status === "success"){
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });

                // redirect to login page
                navigate('/login');
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
            <h2>Reset Password</h2>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"
                                  value={formData.email} onChange={handleInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" name="password"
                                  value={formData.password} onChange={handleInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" name="confirm_password"
                                  value={formData.confirm_password} onChange={handleInputChange} required/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}