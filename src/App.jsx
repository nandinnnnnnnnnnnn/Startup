import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductList from "./ProductList";
import Features from "./features/Features";
import About from "./about/About";



// Import images correctly
import logo from "/images/Giftly(1).png";
import giftPic from "/images/gift_pic.jpg";
import carousel1 from "/images/carousel1.png";
import carousel2 from "/images/caraousel2.png";

// Home Page Comp
function Home() {
    return (
        <div className="content">
            <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={giftPic} className="d-block w-100" alt="Gift Pic" />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel1} className="d-block w-100" alt="Carousel 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel2} className="d-block w-100" alt="Carousel 2" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2 className="welcome_msg">Welcome to JustGiftly</h2>
            <ProductList />

        </div>
    );
}

// Navigation Bar Component
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Giftly Logo" />
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/features">Wish Lists</Link></li>
                </ul>
                <div className="nav-buttons">
                <Link to="/" className="btn-login">Login</Link>
                <Link to="/" className="btn-signup">Sign Up</Link>

                </div>
            </div> 
        </nav>
    );
}


// Footer Component
function Footer() {
    return (
        <footer className="site-footer">
            <hr />
            <p>Nandintsetseg Batsaikhan</p>
            <p>&copy; 2025 JustGiftly. All rights reserved.</p>
            <a href="https://github.com/nandinnnnnnnnnnnn/Startup">My Github</a>
        </footer>
    );
}

// Main App Component
function App() {
    return (
        <Router>
            <div className="page-wrapper">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

// Move render call BELOW the App function
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
