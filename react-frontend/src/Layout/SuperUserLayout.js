import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SuperUserLayout = (user) => {
  // console.log(user)
  const [isSuperuser, setIsSuperuser] = useState()
  
  useEffect(() => {
    if (user) {
        setIsSuperuser(user["is_superuser"])
    }
  },[isSuperuser,user])
  
  if(isSuperuser === false){
    return <Navigate to="/" />
  }
  return (
    <>
      <Outlet />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.Auth.user
})

export default connect(mapStateToProps)(SuperUserLayout)