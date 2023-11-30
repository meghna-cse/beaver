import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Carousel, Container} from "react-bootstrap";
import HomeCarouselImage from "../components/HomeCarouselImage";

export default function Home(){
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const images = [
        {
            id: 1,
            src: "/images/home_school.jpg",
            alt: "Learn today, lead tomorrow.",
            caption: "Embrace the opportunity to learn today, and you'll find yourself confidently leading the way tomorrow. Every lesson is a step toward a brighter future."
        },
        {
            id: 2,
            src: "/images/home_school_2.jpg",
            alt: "Knowledge is power.",
            caption: "In the pursuit of knowledge, you discover the true essence of power. Allow curiosity to be your guide, and let the wisdom you gain shape your path."
        },
        {
            id: 3,
            src: "/images/home_school_3.jpg",
            alt: "Study hard, dream big.",
            caption: "Dive into your studies with determination and passion. As you absorb knowledge, let your dreams expand. Remember, the harder you study, the larger your dreams can grow."
        },
    ]

    const styleWidth = {
        width: '90%',
    }

    return (
        <Container>
            {/*<div className="carousel-container">*/}
            {/*    <button className="carousel-button prev" onClick={moveLeft} >Previous</button>*/}
            {/*    <div className="carousel" style={{transform:`translateX(${translateX}%)`}}>*/}
            {/*        <div className="carousel-item">*/}
            {/*            <img src="/images/home_school.jpg" width={12} height={12} alt="Course 1"/>*/}
            {/*        </div>*/}
            {/*        <div className="carousel-item">*/}
            {/*            <img src="/images/home_school_2.jpg" width={12} height={12} alt="Course 2"/>*/}
            {/*        </div>*/}
            {/*        <div className="carousel-item">*/}
            {/*            <img src="/images/home_school_3.jpg" width={12} height={12} alt="Course 3"/>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <button className="carousel-button next" onClick={moveRight}>Next</button>*/}
            {/*</div>*/}

            <Carousel activeIndex={index} onSelect={handleSelect}>
                {
                    images.map((image) => {
                        return (
                            <Carousel.Item key={image.id}>
                                <HomeCarouselImage text="First slide" imagePath={image.src}/>
                                <Carousel.Caption>
                                    <h3>{image.alt}</h3>
                                    <p>{image.caption}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
                {/*<Carousel.Item>*/}
                {/*    <HomeCarouselImage text="First slide" imagePath={'/images/home_school.jpg'}/>*/}
                {/*    <Carousel.Caption>*/}
                {/*        <h3>First slide label</h3>*/}
                {/*        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                {/*    </Carousel.Caption>*/}
                {/*</Carousel.Item>*/}
            </Carousel>

            <Container>
                <div className="program-details">
                    <h2>Department Overview</h2>
                    <p>Welcome to the Computing Department, where innovation meets education. Our department is committed to fostering a dynamic and enriching environment for students, faculty, and researchers in the ever-evolving field of computing.</p>

                    <h2>Our Mission</h2>
                    <p>
                        Our mission is simple yet profound: to empower individuals and organizations to unlock their full potential through seamless and accessible learning experiences. We believe that education should be a lifelong journey, and our platform is designed to make learning engaging, efficient, and effective.
                    </p>

                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where education knows no boundaries. With our Learning Management System, we aim to break down geographical, economic, and social barriers to education, making quality learning accessible to everyone, everywhere. We dream of a future where every learner has the tools and resources they need to thrive in an ever-evolving world.
                    </p>

                    <h2>Contact Us</h2>
                    <p>For inquiries or to get in touch with our department, please feel free to <NavLink to={'contact'}>contact us.</NavLink>
                    </p>
                </div>
            </Container>

        </Container>
    )
}