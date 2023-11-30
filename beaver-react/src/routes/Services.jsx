import {Card, CardBody, Col, Container, Row} from "react-bootstrap";
export default function Services(){
    const services = [
        {
            id: 1,
            title: "Intuitive Platform Navigation",
            description: "With a focus on user-friendliness, our platform guarantees a hassle-free experience. Whether you're a student, instructor, administrator, quality assurance officer, or program coordinator, navigating our system is a breeze.",
        },
        {
            id: 2,
            title: "Analytics & Reporting",
            description: "For Students: Track your progress, view detailed analytics, and receive reports on your performance, helping you identify strengths and areas for improvement. For Instructors: Monitor student engagement, assess their performance, and gain insights into course effectiveness through detailed reports and analytics.",
        },
        {
            id: 3,
            title: "Administrative & Oversight Features",
            description: "Quality assurance officers and program coordinators can efficiently oversee the system, ensuring policies are adhered to and that the learning environment remains top-notch.",
        },
        {
            id: 4,
            title: "We're Here for You!",
            description: "Have questions or need assistance? Our Computing Department is ready to support. From students to instructors to administrative staff, we're dedicated to ensuring your experience is unparalleled.",
        },
    ];
    return (
        <Container>
            <h1>Services</h1>
            <p>Dive into our range of services, meticulously designed to offer a holistic learning experience!</p>
            <Row>
                {
                    services.map((service) => {
                        return (
                            <Col md={4} key={service.id} xs={12}
                                 lg={6}
                                 className={"mb-4"}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{service.title}</Card.Title>
                                        <Card.Text>{service.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}