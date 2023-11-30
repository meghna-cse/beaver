import {Button, Card, CardBody, Col, Container, Form, Row} from "react-bootstrap";

export default function Contact(){
    return (
        <Container>
            <h1>Contact Us</h1>
            <p>If you have any questions, feedback, or inquiries, please do not hesitate to get in touch with us. We are here to assist you.</p>
            <Row>
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <Card.Title>Contact Information</Card.Title>
                            <Card.Text>
                                <p><strong>Email:</strong> [Contact Email]</p>
                                <p><strong>Phone:</strong> [Contact Phone Number]</p>
                                <p><strong>Address:</strong> [Department Address]</p>
                            </Card.Text>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Title>Contact Form</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={"email"}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={"message"}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}