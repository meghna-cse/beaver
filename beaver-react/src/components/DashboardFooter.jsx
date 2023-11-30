import {Col, Container, Row} from "react-bootstrap";
import {primaryColor, textIconsColor} from "../colors";

export default function DashboardFooter(){
    return (
        <footer>
            <Container style={{background:primaryColor}}>
                <Row>
                    <Col className="text-center">
                        <p className="mb-0" style={{color:textIconsColor}}>© 2023 Beaver</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}