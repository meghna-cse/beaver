import {Container, Jumbotron} from "react-bootstrap";
// import Jumbotron from "react-bootstrap/esm/Jumbotron";
import React from "react";
import {Link} from "react-router-dom";

export default function About(){
    return (
        <Container className={'my-5'}>
            <section id="about-us" className="page-section">
                <h1>About Us</h1>
                <p>Welcome to our Learning Management System, where learning meets innovation. We are dedicated to revolutionizing education and training through cutting-edge technology and a passion for knowledge.</p>

                <h2>Our Mission</h2>
                <p>At Learning Management System, our mission is simple yet profound: to empower individuals and organizations to unlock their full potential through seamless and accessible learning experiences. We believe that education should be a lifelong journey, and our platform is designed to make learning engaging, efficient, and effective.
                </p>

                <h2>What sets us apart</h2>
                <ul>
                    <li><strong>Innovative Technology: </strong> We leverage the latest advancements in technology, including artificial intelligence and machine learning, to create a dynamic and personalized learning experience for every user.</li>
                    <li><strong>User-Centric Design:</strong> Our platform is designed with you in mind. We prioritize user-friendliness, ensuring that learners, instructors, and administrators can easily navigate and make the most of our system.</li>
                    <li><strong>Diverse Content:</strong> The Learning Management System offers a vast library of courses and resources across a wide range of subjects, from academic topics to professional development and skill-building.</li>
                    <li><strong>Collaborative Learning:</strong> We foster a sense of community and collaboration by enabling group discussions, forums, and interactive assignments, allowing learners to connect and learn from each other.</li>
                </ul>

                <h2>Get in Touch</h2>
                <p>If you have any questions or would like to learn more about our Computing Department, please do not hesitate to contact us. We are here to assist you on your journey to excellence in computing.</p>
                <Link to={'/contact'} className={'btn btn-primary'}>Contact Us</Link>
            </section>
        </Container>
    )
}