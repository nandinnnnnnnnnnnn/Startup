import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./app.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProductList from "./ProductList";
import Features from "./features/Features";
import About from "./about/About";
import Login from "./Login"; 
import Signup from "./Signup"; 
import ForgotPassword from "./ForgotPassword";

import logo from "/images/Giftly(1).png";
import giftPic from "/images/pixel1.jpg";
import carousel1 from "/images/pixel-gift2.jpg";
import carousel2 from "/images/giftbear.jpg";

// Home Page Comp
function Home({ user }) {
    useEffect(() => {
        setTimeout(() => {
            const carouselElement = document.querySelector("#carouselExampleRide");
            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, {
                    interval: 3000, 
                    ride: "carousel",
                });
            }
        }, 100);
    }, []);

    return (
        <div className="content">
            <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
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


// Navigation Bar 
function Navbar({ user, onLogout }) {
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
                    {user ? (
                        <>
                            <span className="nav-user">Hello, {user}!</span>
                            <button onClick={onLogout} className="btn-logout">Logout</button> 
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-login">Login</Link>
                            <Link to="/signup" className="btn-signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div> 
        </nav>
    );
  }

// Footer 
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

// Main App 
function App() {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(savedUser);
        }

        // Temporary WebSocket Placeholder, simulates 5 seconds
        const temporaryWebSocket = setInterval(() => {
            const fakeMessage = {
                user: "System",
                text: "🎁 Someone just added a new gift to their wishlist!",
            };
            setNotifications((prev) => [...prev, fakeMessage]);
            setTimeout(() => {
                setNotifications((prev) => prev.slice(1));
            }, 20000);
        }, 5000);

        return () => clearInterval(temporaryWebSocket); // Cleanup 
    }, []);

    const handleLogin = (username) => {
        setUser(username);
        localStorage.setItem("user", username);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    const handleSignup = (username) => {
        setUser(username);
        localStorage.setItem("user", username);
    };

  return (
      <Router>
           <div className="page-wrapper">
                <Navbar user={user} onLogout={handleLogout} />
                <div className="notifications">
                    {notifications.map((notif, index) => (
                        <p key={index} className="notification-item">
                            {notif.user}: {notif.text}
                        </p>
                    ))}
                </div>

              <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features user={user} />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/" element={<ProductList user={user} />} /> 
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;

