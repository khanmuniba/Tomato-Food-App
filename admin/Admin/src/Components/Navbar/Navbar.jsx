import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
  <div className="navbar-left">
    <img className='logo' src={assets.logo} alt="logo" />
    <p className="subtitle">Admin Panel</p>
  </div>
  <img className='profile' src={assets.profile_icon} alt="profile" />
</div>

  )
}

export default Navbar