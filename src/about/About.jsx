import React from "react";
import giftPic from "/images/gift_pic.jpg";

function About() {
    return (
        <div className="content about-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-content">
                        <h2 className="section-title">🎁 What is <span className="highlight">Giftly?</span></h2>
                        <p className="description">
                            ✨Tired of guessing what gifts your loved ones want? With <b>Giftly</b>, you can create, manage, and share personalized wish lists for any occasion. 
                            Whether it’s birthdays, holidays, or just because, Giftly takes the stress out of gift-giving and makes it easy for everyone to give and receive meaningful presents.✨
                        </p>
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="image-container">
                            <img src={giftPic} alt="Gift Giving" className="gift-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;

