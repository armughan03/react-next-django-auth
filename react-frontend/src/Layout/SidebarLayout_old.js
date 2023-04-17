import React from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarLayout = (isAuthenticated) => {
  console.log(isAuthenticated)
  // if(!isAuthenticated){
  //   return <Navigate to="/" />
  // }
  return (
    <>
    <Sidebar />
    <div className="container-fluid">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* {props.children} */}
            <Outlet />
          </main>
        </div>
  </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps)(SidebarLayout)