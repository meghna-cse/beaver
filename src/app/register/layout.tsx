// import './globals.css'
import '../styles/app.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Beaver LMS',
    description: 'Beaver LMS',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        // <html lang="en">
        //   <body className={inter.className}>{children}</body>
        // </html>
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
                        <li><a href={"register"}>Register</a></li>
                        <li><a href="http://mxj3631.uta.cloud/blog/">Blog</a></li>
                        <li><a href={"login"}>Login</a></li>
                        <li><a href={"only-for-demo"}>Only For Demo</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        {/* End of navigation bar */}

        {children}

        <footer>
            &copy; 2023 Course Program Web App
        </footer>

        </body>
        </html>)
}
