import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const NonSidebarLayout = ({isAuthenticated}) => {
  if(isAuthenticated === true){
    return <Navigate to="/" />
  }
  return (
    <>
    
      <Outlet />

    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps)(NonSidebarLayout)