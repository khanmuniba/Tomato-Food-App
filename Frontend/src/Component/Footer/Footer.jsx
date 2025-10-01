import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
        <div className="footer-left">
            <img src={assets.logo} alt="" />
            <p>Welcome to Tomato, your ultimate solution for fast and reliable food ordering and delivery! Our application is designed to connect food enthusiasts with their favorite restaurants and provide a seamless ordering experience. With Tomato, you can explore a wide variety of cuisines, customize your orders, and enjoy fast deliveries right to your doorstep.</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+54 11-3825 -5413</li>
                <li>pablodomingo19935@gmail.com</li>
            </ul>
        </div>
        
    </div>
    <hr />
    <p className='footer-copyright'>Coded by ® Muniba Khan</p>
    </div>
  )
}

export default Footer