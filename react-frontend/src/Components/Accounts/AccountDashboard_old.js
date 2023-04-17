import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'


const AccountDashboard = ({isAuthenticated, user}) => {
    console.log(isAuthenticated)
    const [data, setData] = useState([])
    const [userStats, setUserStats] = useState([]);
    const [responseError, setResponseError] = useState("");
    const loadUsers = async() => {
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json'
          }
        }
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/all_users/`, config)
          setData(response.data)
        //   console.log('Users', JSON.stringify(response.data.Data))
        } catch (error) {
          console.log('first', error.response.statusText)
          setResponseError(error.response.statusText)
        }
    }
    const loadUserStats = async() => {
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json'
          }
        }
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users_stats/`, config)
          setUserStats(response.data)
        //   console.log('Users', JSON.stringify(response.data.Data))
        } catch (error) {
          console.log('first', error.response.statusText)
          setResponseError(error.response.statusText)
        }
    }
    useEffect(() => {
        loadUsers()
        loadUserStats()
    }, [])
    // console.log(data)
  return (
    <>
        <div className='container'>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">User Management</h1>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span ></span>
                        This week
                    </button>
                </div> */}
            </div>
            {/* <h2>Forms</h2> */}
            <div className="card">
                <div className="card-header">
                    New User
                </div>
                <div className="card-body">
                    <h5 className="card-title">Create new User Account</h5>
                    <p className="card-text">Admins can create a new web based ROA Form from here</p>
                    <NavLink to="/newuser" className="btn btn-primary">Create</NavLink>
                </div>
            </div>
            <hr/>
            <h5 className="h3">Stats</h5>
            <div className='row'>
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className="card">
                        <h5 className="card-header">Total Users</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['admin_users']}</h5>
                            <p className="card-text">Number Admin Users.</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className="card">
                        <h5 className="card-header">Total Agents</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['agent_users']}</h5>
                            <p className="card-text">Number of Agent Users.</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className="card">
                        <h5 className="card-header">Active Accounts</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['active_users']}</h5>
                            <p className="card-text">Number of Active Users.</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className="card">
                        <h5 className="card-header">Inactive Accounts</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['inactive_users']}</h5>
                            <p className="card-text">Number of Inactive Users.</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <h5 className="h3">User Account List</h5>
            <div className='row'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(data).map((keyName, i) => (
                                <tr>
                                    <th scope="row">{i+1}</th>
                                    <td>{data[i]['name']}</td>
                                    <td>{data[i]['email']}</td>
                                    <td>{data[i]['is_superuser'] === true ? "Admin" : "Agent"}</td>
                                    <td>{data[i]['is_active'] === 1 ? "Active" : "Inactive"}</td>
                                    <td>
                                        <NavLink type="button" to={{pathname:"/userdetails"}} state={{userID : data[i]['id']}} className="btn btn-sm btn-outline-primary">Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        }                        
                        {/* <tr>
                            <th scope="row">1</th>
                            <td>{data[0]['name']}</td>
                            <td>{data[0]['email']}</td>
                            <td>{data[0]['role'] === true ? "Admin" : "Agent"}</td>
                        </tr> */}
                    </tbody>
                </table>
                <br/>
            </div>
        </div>
    
    </>
  )
}


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})

export default connect(mapStateToProps)(AccountDashboard)
