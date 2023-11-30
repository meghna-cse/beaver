import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {postRequest} from "../api/api";
import { Button, Container, Form} from "react-bootstrap";
import Swal from "sweetalert2";

export default function Register(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
        identification_number: "",
        password: "",
        role_id: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        // convert formData to json string
        const data = JSON.stringify(formData);

        try {
            // make api call to register
            const response = await postRequest('/register', data);

            // show success message
            await Swal.fire({
                title: "Success!",
                text: "User registered successfully!",
                icon: "success"
            });

            // navigate to login page
            navigate(`/login`);
        }catch (e) {
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
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                                  value={formData.name}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"username"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                                  value={formData.username}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"email"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                                  value={formData.email}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"mobile"}>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" placeholder="Enter mobile"
                                  value={formData.mobile}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"identification_number"}>
                    <Form.Label>Identification Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter identification number"
                                  value={formData.identification_number}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                                  value={formData.password}
                                  onChange={handleInputChange} required={true}/>
                </Form.Group>
                {/*<Form.Group className={"mb-3"} controlId={"confirm_password"}>*/}
                {/*    <Form.Label>Confirm Password</Form.Label>*/}
                {/*    <Form.Control type="password" placeholder="Confirm password"*/}
                {/*                  value={formData.confirm_password}*/}
                {/*                  onChange={handleInputChange} required={true}/>*/}
                {/*</Form.Group>*/}
                <Form.Group className={"mb-3"} controlId={"role_id"}>
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" value={formData.role_id}
                                  onChange={handleInputChange} required={true}>
                        <option value="">Select Role</option>
                        <option value={3}>Administrator</option>
                        <option value={4}>Quality Assurance</option>
                        <option value={2}>Coordinator</option>
                        <option value={5}>Instructor</option>
                        <option value={1}>Student</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            <div className={"mt-5"}>
                <NavLink to={`/login`}>Already have an account? Click to login</NavLink>
            </div>
        </Container>
    )
}