import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Home(){
    const [translateX,setTranslateX] = useState(-300);

    const moveLeft = () => {
        setTranslateX(((translateX -100) ) % 300);
    }

    const moveRight = () => {
        setTranslateX((translateX + 100) % 300 > 0 ? ((translateX + 100) % 300) * -1 : (translateX + 100) % 300);
    }

    const styleWidth = {
        width: '90%',
    }

    return (
        <>
            <div className="carousel-container">
                <button className="carousel-button prev" onClick={moveLeft} >Previous</button>
                <div className="carousel" style={{transform:`translateX(${translateX}%)`}}>
                    <div className="carousel-item">
                        <img src="/images/home_school.jpg" width={12} height={12} alt="Course 1"/>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/home_school_2.jpg" width={12} height={12} alt="Course 2"/>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/home_school_3.jpg" width={12} height={12} alt="Course 3"/>
                    </div>

                </div>
                <button className="carousel-button next" onClick={moveRight}>Next</button>
            </div>

            <div className="container">
                {/* Program details section */}
                <div className="program-details" style={styleWidth}>

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
            </div>
        </>
    )
}