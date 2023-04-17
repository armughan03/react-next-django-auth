import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'

const UserProfile = ({isAuthenticated, user}) => {
  const [FormData, setFormData] = useState({
    new_password :  "",
    re_new_password : "",
    current_password : ""
  })
  const onChange = e => setFormData({...FormData, [e.target.name]: e.target.value})
  const [SuccessMessage, setSuccessMessage] = useState("")
  const [SuccessMessageVisibility, setSuccessMessageVisibility] = useState("none")
  const [ErrorMessage, setErrorMessage] = useState("")
  const [ErrorMessageVisibility, setErrorMessageVisibility] = useState("none")
  const updatePassword = async() => {
    if (FormData['current_password'] === FormData['new_password']){
      setErrorMessage("New passwords can't be same as old password")
      setErrorMessageVisibility("block")
      setTimeout(() => {
        setErrorMessageVisibility("none")
      }, 5000)
    }
    else if (FormData['new_password'] === FormData['re_new_password']){
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `JWT ${localStorage.getItem('access')}`
        }
    }
    const Body = JSON.stringify(FormData)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/users/set_password/`, Body ,config)
        console.log(response.data['code'])
        if (response.status === 204){
            setSuccessMessage("Password is changed successfully")
            setSuccessMessageVisibility("block")
            setFormData({
              new_password :  "",
              re_new_password : "",
              current_password : ""
            })
            setTimeout(() => {
              setSuccessMessageVisibility("none")
            }, 5000)
        }
        // setSubmissionMessageVisibility("block")
    } catch (error) {
        // alert(error.response.data["current_password"])
        // setErrorData({
        //     status: error.response.status,
        //     message: error.response.statusText,
        //     errors: error.response.errors
        // })
        if ("current_password" in error.response.data){
          setErrorMessage("Current Password is invalid")
          setErrorMessageVisibility("block")
          setTimeout(() => {
            setErrorMessageVisibility("none")
          }, 5000)
        }
        // if (error.response.data["non_field_errors"]){
        //   setErrorMessage("")
        // }
    }}else{
      setErrorMessage("New passwords do not match")
      setErrorMessageVisibility("block")
      setTimeout(() => {
        setErrorMessageVisibility("none")
      }, 5000)
    }
  }
  const onSubmit = e => {
    e.preventDefault()
    updatePassword()
    // window.location.reload();
  }
  // setTimeout(() => {
  //   setSuccessMessageVisibility("none")
  //   setErrorMessageVisibility("none")
  // }, 5000)
  return (
    <>
      <div className='container'>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
                {user["first_name"] + " " + user["last_name"]}'s Profile
            </h1>
        </div>
        <div className="notification_container">
            <div className="alert alert-success fade show" style={{display: SuccessMessageVisibility}} role="alert">
            {SuccessMessage}
            {/* <button type="button" className="btn-close" style={{color: "white"}} data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
        </div>
        <div className="notification_container">
            <div className="alert alert-danger fade show" style={{display: ErrorMessageVisibility}} role="alert">
            {ErrorMessage}
            {/* <button type="button" className="btn-close" style={{color: "white"}} data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" value={user["first_name"] + " " + user["last_name"]} name='name' disabled />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={user['email']} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
        </div>
        <hr/>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h3">
                Update Password
            </h1>
        </div>
        <form onSubmit={e => onSubmit(e)}>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Current Password</label>
              <input type="password" className="form-control" name='current_password' value={FormData['current_password']} onChange={(e) => {onChange(e)}} required />
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
              <input type="password" className="form-control" name="new_password" value={FormData['new_password']} onChange={(e) => {onChange(e)}} id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Confirm New Password</label>
              <input type="password" className="form-control" name="re_new_password" value={FormData['re_new_password']} onChange={(e) => {onChange(e)}} id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          <button className='btn btn-primary'>Update Password</button>

        </form>
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
        </div>

      </div>
    </>
  )
}


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
})

export default connect(mapStateToProps)(UserProfile)
