import React, {useEffect, useState} from 'react'
import Header from './Header'
import { Navigate, useSearchParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkAuthenticated, LoadUser, checkGoogleAuthenticated, checkMicrosoftAuthenticated } from '../Actions/Auth'

const Layout = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [LoginSuccess, setLoginSuccess] = useState(false)
  const checkAuth = async (state, code) => {
    if (localStorage.getItem('authType') === 'microsoft') {
      const response = await props.checkMicrosoftAuthenticated(state, code)
      setLoginSuccess(response.loginStatus)
    }
    if (localStorage.getItem('authType') === 'google') {
      const response = await props.checkGoogleAuthenticated(state, code)
      setLoginSuccess(response.loginStatus)
    }
  }
  useEffect(() => {
    const state = searchParams.get("state") ? searchParams.get("state") : null
    const code = searchParams.get("code") ? searchParams.get("code") : null
    if (state && code) {
      checkAuth(state, code) 
    }
    else{
      props.checkAuthenticated()
      props.LoadUser()
    }
  }, [])
  return (
    <>
        <Header />
        {props.children}
    </>
  )
}

export default connect(null, {checkAuthenticated, checkGoogleAuthenticated, checkMicrosoftAuthenticated, LoadUser})(Layout)
