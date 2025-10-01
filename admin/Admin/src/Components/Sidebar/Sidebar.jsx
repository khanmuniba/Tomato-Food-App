import React from 'react'
import './Sidebar.css'

// import images directly
import shoppingBag from '../../assets/shopping-bag.png'
// import add from '../../assets/add'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img className='logo12' src={assets.add_icon_white}alt="add-icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img className='logo11' src={shoppingBag} alt="list-icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className="sidebar-option">
          <img className='logo11'  src={shoppingBag} alt="orders-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
