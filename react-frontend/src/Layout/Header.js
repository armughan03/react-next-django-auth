import React, {Fragment, useState ,useEffect} from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import './Styles/Header.css'
import {LogOut} from '../Actions/Auth'
import { connect } from 'react-redux'
const Header = ({isAuthenticated, user}) => {
  // const isAuthenticated = false
  // if (isAuthenticated!== true || isAuthenticated!== undefined){
  //   return <Navigate to='/signin' />
  // } 
  // console.log(user)
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if (user){
      setUserName(user["first_name"] + " " + user["last_name"])
    }
  },[userName, isAuthenticated, user]);
  const guestLinks = () => (
    <Fragment>
      <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        <NavLink to="/login" className="nav-link px-2 link-dark">Login</NavLink>
      </form>
    </Fragment>
  )
//   const logout = e => {
//     e.preventDefault()
//     LogOut()
//   }
//   console.log(isAuthenticated)
  const authLinks = () => (
    
    <>
      <form className="col-6 col-lg-auto mb-3 mb-lg-0 me-lg-3">
        <NavLink to="/orders" className="nav-link px-2 link-dark">My Orders</NavLink>
      </form>
    </>
  )
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <NavLink className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">Leo Stacks</NavLink>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          {
            isAuthenticated ? 
             <NavLink className="nav-link px-3" to="/profile">{userName}</NavLink>
            : <NavLink className="nav-link px-3" to="/signin">Login</NavLink>
          }
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
})

export default connect(mapStateToProps, {LogOut})(Header)
// export default Header
