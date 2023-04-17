import React, {useState} from 'react'
import '../Styles/ResetPassword.css'
import {connect} from 'react-redux'
import {Navigate, NavLink} from 'react-router-dom'
import {resetPassword} from '../../Actions/Auth'
import Loader from '../Loader/Loader'
import axios from 'axios'



const ForgetPassword = ({resetPassword, isAuthenticated}) => {
  
  const [LoadingVisibility, setLoadingVisibility] = useState("none")
  const [dataVisibility, setDataVisibility] = useState("block")
  const [RequestSent, setRequestSent] = useState(false)
  const [FormData, setFormData] = useState({
    email: ""
  })

  const onChange = e => setFormData({...FormData, [e.target.name]: e.target.value})
  // console.log(FormData)
  const [errorData, setErrorData] = useState({
    status: "",
    message: "",
    errors: []  
  })
  const [ResponseStatus, setResponseStatus] = useState(401)
  const emailValidation = () =>{
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(FormData['email']) === false){
      setErrorData({
        status: "Email Validity",
        message: "Email is not valid, Please enter a valid email",
        errors: ""
      })
      setSubmissionErrorVisibilty("block")
      setTimeout(() => {
        setSubmissionErrorVisibilty("none")
      }, 5000)
      return false
    }
    return true
  }
  const [SubmissionErrorVisibilty, setSubmissionErrorVisibilty] = useState("none")
  const onSubmit = async(e) => {
    e.preventDefault()
    if (emailValidation()){
      const response = await resetPassword(FormData)
      if (response.status === 204){
        setRequestSent(true)
      } else {
        
        if (response.data) {
          setErrorData({
            status: "Account",
            message: response.data  ,
            errors: ""
          })
        }

        setSubmissionErrorVisibilty("block")
        setTimeout(() => {
          setSubmissionErrorVisibilty("none")
        }, 5000)
      }
    }
    
    // setResponse(LoginUser(FormData))
    // console.log(response)
    // window.location.reload();
  }
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
        <main className="reset-password-form w-100 m-auto">
            <form onSubmit={e => onSubmit(e)}>
                {/* <img className="mb-4" alt="" width="72" height="72" /> */}

                <h1 className="h3 mb-3 fw-normal text-center">Request Password Reset</h1>
                <div className="alert alert-danger text-center" style={{display: SubmissionErrorVisibilty}} role="alert">
                    <p><b>Error {errorData.status} </b></p>
                    {errorData.message}
                </div>
                <div className="form-floating">
                  <input type="email" className="form-control" placeholder="name@example.com" name="email" onChange={e => onChange(e)} required/>
                  <label htmlFor="floatingInput">Email address</label>
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

export default connect(mapStateToProps, {resetPassword})(ForgetPassword)