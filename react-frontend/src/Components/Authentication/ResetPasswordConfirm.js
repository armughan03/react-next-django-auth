import React, {useEffect, useState} from 'react'
import '../Styles/ResetPassword.css'
import {connect} from 'react-redux'
import {Navigate, NavLink, useSearchParams } from 'react-router-dom'
import {resetPasswordConfirm} from '../../Actions/Auth'
import Loader from '../Loader/Loader'
import axios from 'axios'



const ResetPasswordConfirm = ({resetPasswordConfirm, isAuthenticated}) => {
  
  const [LoadingVisibility, setLoadingVisibility] = useState("none")
  const [dataVisibility, setDataVisibility] = useState("block")
  const [RequestSent, setRequestSent] = useState(false)
  const [FormData, setFormData] = useState({
    new_password: "",
    re_new_password: ""
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const onChange = e => setFormData({...FormData, [e.target.name]: e.target.value})
  const {new_password, re_new_password} = FormData
  const [errorData, setErrorData] = useState({
    status: "",
    message: "",
    errors: []  
  })
  const [ResponseStatus, setResponseStatus] = useState(401)
  const [SubmissionErrorVisibilty, setSubmissionErrorVisibilty] = useState("none")
  
  const validateToken = async (uid, token) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    const config = {
      headers: {
          'Content-Type' : 'application/json',
          "X-CSRFToken": "csrfToken"
      }
    }
    const Body = JSON.stringify({
        "uid":uid, 
        "token":token
    })
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/email/validateUIDToken/`, Body ,config)
        console.log(response)
    }catch (error) {

    }
  }
  
  const onSubmit = async (e) => {
    e.preventDefault()
    
    const uid = searchParams.get("uid")
    const token = searchParams.get("token")
    if (new_password == re_new_password){
      const response = await resetPasswordConfirm(uid, token, new_password, re_new_password)
      if (response.status === 400) {
        if (response.data['new_password']) {
          setErrorData({
            status: "API Error",
            message: response.data['new_password']  ,
            errors: ""
          })
        }
        if (response.data['token']) {
          setErrorData({
            status: "Expired Token",
            message: response.data['token']  ,
            errors: ""
          })
          setTimeout(() => {
            setRequestSent(true)
          }, 2000)
        }

        setSubmissionErrorVisibilty("block")
        setTimeout(() => {
          setSubmissionErrorVisibilty("none")
        }, 5000)
      } else if (response.status === 204){
        setRequestSent(true)
      }
      // console.log(response)
    } else {
      setErrorData({
        status: "Password Matching Error",
        message: "Passwords don't match",
        errors: ""
      })
      setSubmissionErrorVisibilty("block")
      setTimeout(() => {
        setSubmissionErrorVisibilty("none")
      }, 5000)
    }
    
    // setResponse(LoginUser(FormData))
    // console.log(response)
    // window.location.reload();
  }
  useEffect(() => {
    const uid = searchParams.get("uid")
    const token = searchParams.get("token")
    validateToken(uid, token)
  }, [])
  if (RequestSent) {
    return <Navigate to='/signin' />
  }
  
  if (isAuthenticated === true){
    return <Navigate to='/' />
  }
  return (
    <>
      <div style={{display: LoadingVisibility}}>
        <Loader />
      </div>
      <div className='body' style={{display: dataVisibility}} >
        <main className="reset-password-reset-form w-100 m-auto">
            <form onSubmit={e => onSubmit(e)}>
                {/* <img className="mb-4" alt="" width="72" height="72" /> */}

                <h1 className="h3 mb-3 fw-normal text-center">Request Password Reset</h1>
                <div className="alert alert-danger text-center" style={{display: SubmissionErrorVisibilty}} role="alert">
                    <p><b>Error {errorData.status} </b></p>
                    {errorData.message}
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control new_password" placeholder="name@example.com" name="new_password" onChange={e => onChange(e)} required/>
                  <label htmlFor="floatingInput">New Password</label>
                </div>  
                <div className="form-floating">
                  <input type="password" className="form-control re_new_password" placeholder="name@example.com" name="re_new_password" onChange={e => onChange(e)} required/>
                  <label htmlFor="floatingInput">Confirm New Password</label>
                </div>  
                <br/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Reset Password</button>
                <hr/>
                <p className="mt-5 mb-3 text-center"><NavLink to="/signin">Login?</NavLink></p>
                <p className="mt-5 mb-3 text-muted text-center">&copy; SFP by KCS 2022–2023</p>
            </form>
        </main>
    </div>
    </>
  )
}


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, {resetPasswordConfirm})(ResetPasswordConfirm)