"use client";
import Image from 'next/image';
import './app.css';
import {useState} from "react";

export default function Home() {
  const [translateX,setTranslateX] = useState<number>(0);

  const moveLeft = () => {
    setTranslateX(translateX - 100);
  }

  const moveRight = () => {
    setTranslateX(translateX + 100);
  }

  return (
      <html lang="en">
      <body>
      <header>
        <h1>Beaver LMS</h1>
        <p>Welcome to our program</p>
      </header>

      {/*// <!-- Start of navigation bar -->*/}
      <header>
        <nav>
          <div className="nav-container">
            <div className="logo">
              <a href={'/'}>Logo</a>
            </div>
            <div className="menu-toggle">
              <i className="fas fa-bars"></i>
            </div>
            <ul className="menu">
              <li><a href={'/'}>Home</a></li>
              <li><a href={"services"}>Services</a></li>
              <li><a href={"about"}>About Us</a></li>
              <li><a href={"contact-us"}>Contact Us</a></li>
              {/*<li><a href={}>Register</a></li>*/}
              <li><a href="http://mxj3631.uta.cloud/blog/">Blog</a></li>
              <li><a href={"login"}>Login</a></li>
              <li><a href={"only-for-demo"}>Only For Demo</a></li>
            </ul>
          </div>
        </nav>
      </header>
      {/* End of navigation bar */}

      <div>
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={moveLeft} >Previous</button>
          <div className="carousel">
            <div className="carousel-item">
              <Image src="/images/home_school.jpg" width={12} height={12} alt="Course 1"/>
            </div>
            <div className="carousel-item">
              <Image src="/images/home_school_2.jpg" width={12} height={12} alt="Course 2"/>
            </div>
            <div className="carousel-item">
              <Image src="/images/home_school_3.jpg" width={12} height={12} alt="Course 3"/>
            </div>

          </div>
          <button className="carousel-button next" onClick={moveRight}>Next</button>
        </div>

        <div className="container">
          {/* Program details section */}
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
            <p>For inquiries or to get in touch with our department, please feel free to <a href={"contact-us"}>contact us.</a></p>
          </div>
        </div>
      </div>

      <footer>
        &copy; 2023 Course Program Web App
      </footer>

      </body>
      </html>
  )
}
