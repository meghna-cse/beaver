"use client";
import Image from 'next/image'
// import styles from './page.module.css'
import styles from './styles/app.module.css'
import {useState} from "react";

export default function ContactUsPage() {
  return (
      <div className="container">
        <section id="contact-us" className="page-section">
          <h1>Contact Us</h1>
          <p>If you have any questions, feedback, or inquiries, please do not hesitate to get in touch with us. We are here to assist you.</p>

          <div className="contact-details">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p><strong>Email:</strong> [Contact Email]</p>
              <p><strong>Phone:</strong> [Contact Phone Number]</p>
              <p><strong>Address:</strong> [Department Address]</p>
            </div>
            <div className="contact-form">
              <h2>Contact Form</h2>
              <form id="contact-form" action="#" method="post">
                <label className="contact-label" htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required/>

                <label className="contact-label" htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>

                <label className="contact-label" htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows={4} required></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </div>
  )
}
