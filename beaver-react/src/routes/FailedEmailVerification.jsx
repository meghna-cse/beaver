import {Alert, Button, Card, InputGroup} from "react-bootstrap";
import {getRequest, postRequest} from "../api/api";
import Swal from "sweetalert2";

export default function FailedEmailVerification(){
    const sendVerificationEmail = async () => {
        // ensure email is not empty
        const email = document.getElementById('email').value;

        if(email === ""){
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email cannot be empty",
            });
            return;
        }

        // ensure its a valid email
        if(!email.includes("@")){
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email",
            });
            return;
        }

        try {
            // make api call to send verification email
            const response = await postRequest('/email/resend', {email: email});

            if (response.data.status === "success"){
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });
            }
            // alert(response.data.message);
        } catch (e) {
            // alert(e.response.data.message);
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: e.response.data.message,
            });
        }
    }
    return (
        <div className="container mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Verification Page</Card.Title>

                    <Alert variant="danger" className="mt-3">
                        Email verification failed.
                    </Alert>

                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Resend Verification Email?</Card.Title>
                            <Card.Text>
                                <InputGroup className="mb-3">
                                    <input id={"email"} type="email" className="form-control" placeholder="Email" aria-label="Email" required={true}/>
                                </InputGroup>
                                <Button variant="primary" className="ml-3" onClick={() => {sendVerificationEmail()}}>
                                    Resend Email
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    )
}