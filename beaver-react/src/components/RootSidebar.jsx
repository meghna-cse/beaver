import * as React from "react";

import {Link, NavLink, Outlet} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {accentColor, primaryColor, textIconsColor} from "../colors";

export default function RootSidebar(){
    return (
        <>
            <header>
                <Navbar expand="lg" className={"navbar-dark"}>
                    <Container style={{ background: accentColor }}>
                        <Navbar.Brand className={'text-white-300'} as={NavLink} to={"/"} style={{ fontWeight: 'bold' }}>Beaver LMS</Navbar.Brand>
                        <Navbar.Toggle className={'text-white'} aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end"}>
                            <Nav>
                                <Nav.Link as={NavLink} to={"/"} style={{ fontWeight: 'bold' }}>Home</Nav.Link>
                                <Nav.Link as={NavLink} to={"/services"} style={{ fontWeight: 'bold' }}>Services</Nav.Link>
                                <Nav.Link as={NavLink} to={"/about"} style={{ fontWeight: 'bold' }}>About Us</Nav.Link>
                                <Nav.Link as={NavLink} to={"/contact"} style={{ fontWeight: 'bold' }}>Contact Us</Nav.Link>
                                <Nav.Link as={NavLink} to={"/register"} style={{ fontWeight: 'bold' }}>Register</Nav.Link>
                                <Nav.Link as={NavLink} to={"/login"} style={{ fontWeight: 'bold' }}>Login</Nav.Link>
                                <Nav.Link href="http://mxj3631.uta.cloud/blog/" style={{ fontWeight: 'bold' }}>Blog</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}