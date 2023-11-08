import * as React from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function RootSidebar(){
    const [menuActive,setMenuActive] = React.useState(false);
    const toggleMenu = () => {
        // check if the screen size is less than 768px
        if(window.innerWidth < 768) {
            setMenuActive(!menuActive);
        }
    }
    return (
        <>
            <header>
                <nav>
                    <div className="nav-container">
                        <div className="logo">
                            <a href={'/'}>Logo</a>
                        </div>
                        <div className="menu-toggle" onClick={toggleMenu}>
                            {/*<i className="fas fa-bars"></i>*/}
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                        <ul className={`menu ${menuActive ? 'active' : ''}`}>
                            <li><NavLink onClick={toggleMenu} to={'/'}>Home</NavLink></li>
                            <li><NavLink onClick={toggleMenu} to={'services'}>Services</NavLink></li>
                            <li><NavLink onClick={toggleMenu} to={'about'}>About Us</NavLink></li>
                            <li><NavLink onClick={toggleMenu} to={'contact'}>Contact Us</NavLink></li>
                            <li><NavLink onClick={toggleMenu} to={'register'}>Register</NavLink></li>
                            <li><a href="http://mxj3631.uta.cloud/blog/">Blog</a></li>
                            <li><NavLink onClick={toggleMenu} to={'login'}>Login</NavLink></li>
                            {/* <li><NavLink onClick={toggleMenu} to={'only-for-demo'}>Only For Demo</NavLink></li> */}
                        </ul>
                    </div>
                </nav>
            </header>

        </>
    )
}