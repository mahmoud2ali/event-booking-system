import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './header.css'
import { useState } from 'react'
import { logoutUser } from '../../redux/apiCalls/authApiCall'

function Header() {

  const [toggle, steToggle] = useState(false);
  const [dropDown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    setDropdown(false);
    dispatch(logoutUser());
  }
  return (
    <div className='container'>
        <div className='logo'>
            <h1>Eventure</h1>
        </div>
        <div className='menu'><i onClick={() =>steToggle(prev => !prev)} className="bi bi-list"></i></div>
        <ul style={{clipPath: toggle && "polygon(0 0 , 100% 0, 100% 100% , 0 100%)"}} className={`nav ${toggle ? "show" : ""}`}>
          <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)}  to="/">Home</NavLink>
          {user?.isAdmin && <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)}  to="/admin">Admin Panel</NavLink>}
          {/* <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)}  to="/login">Login</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)} to="/register">Register</NavLink> */}
       {user ? (
         <div className='user'>
          <div onClick={() => setDropdown(prev => !prev)} className='user-info'>
            <h4>{user.name}</h4>
          </div>
          <ul style={{ clipPath: dropDown ? "polygon(0 0 , 100% 0, 100% 100% , 0 100%)" : "polygon(0 0, 0 0, 0 0, 0 0)" }} className='dropdown'>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
       ) : (
         <>
          <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)} to="/login">Login</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'link-item active' : 'link-item'} onClick={() =>steToggle(false)} to="/register">Register</NavLink>
        </>
      )}
      </ul>
    </div>
  )
}

export default Header