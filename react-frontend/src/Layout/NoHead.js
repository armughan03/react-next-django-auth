import React, {useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux'
import { checkAuthenticated, LoadUser } from '../Actions/Auth'

const NoHead = (props) => {
  useEffect(() => {
    props.checkAuthenticated()
    props.LoadUser()
  }, [])
  return (
    <>
      <Outlet/>
        {props.children}
    </>
  )
}

export default connect(null, {checkAuthenticated, LoadUser})(NoHead)
