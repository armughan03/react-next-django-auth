import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'


const AccountDashboard = ({isAuthenticated, user}) => {
    const [UsersData, setUsersData] = useState([])
    const [TotalUsers, setTotalUsers] = useState(0)
    const [PageLimit, setPageLimit] = useState(0)
    const [SearchQuery, setSearchQuery] = useState("")
    const [OrderBy, setOrderBy] = useState("name")
    const [userStats, setUserStats] = useState([]);
    const [responseError, setResponseError] = useState("");
    const [LoaderVisibility, setLoaderVisibility] = useState("none")
    const [dataVisibility, setDataVisibility] = useState("block")
    const loadUsers = async(page_number, orderBy, searchQuery) => {
        setLoaderVisibility("block")
        setDataVisibility("none")
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json',
              'X-CSRF-Token': 'my csrf token for DRF auth system'
          }
        }
        const Body = JSON.stringify({
            "page_number" : page_number,
            "order_by" : orderBy,
            "search_query" : searchQuery
          })
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/all_users/`, Body,config)
            setUsersData(response.data['results'])
            setTotalUsers(response.data['total_records'])
            setPageLimit(response.data['pagelimit'])
        //   console.log('Users', JSON.stringify(response.data.Data))
        } catch (error) {
          console.log('first', error.response.statusText)
          setResponseError(error.response.statusText)
        }
        
        setLoaderVisibility("none")
        setDataVisibility("block")
    }
    const onloadUsers = async(page_number, orderBy, searchQuery) => {
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json',
              'X-CSRF-Token': 'my csrf token for DRF auth system'
          }
        }
        const Body = JSON.stringify({
            "page_number" : page_number,
            "order_by" : orderBy,
            "search_query" : searchQuery
          })
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/all_users/`, Body,config)
            setUsersData(response.data['results'])
            setTotalUsers(response.data['total_records'])
            setPageLimit(response.data['pagelimit'])
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
              'Accept' : 'application/json',
              'X-CSRF-Token': 'my csrf token for DRF auth system'
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
    const DeleteUser = async(id) => {
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json',
              'X-CSRF-Token': 'my csrf token for DRF auth system'
          }
        }
        const Body = JSON.stringify({
            "id" : id
        })
        try {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/deleteUser/`, Body, config)
          loadUsers(1,OrderBy,SearchQuery)
        //   console.log('Users', JSON.stringify(response.data.Data))
        } catch (error) {
          console.log('first', error.response.statusText)
          setResponseError(error.response.statusText)
        }
    }
    const onSearchQueryChange = (e) => {
        e.preventDefault()
        setTotalUsers(0)
        loadUsers(1, OrderBy, SearchQuery)    
    }
    
    const onFilterChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
        setTotalUsers(0)
        onloadUsers(1, OrderBy, SearchQuery)    
    }
    const onDeleteButtonClick = (e,id) => {
        e.preventDefault()
        setTotalUsers(0)
        DeleteUser(id)    
    }
    useEffect(() => {
        loadUsers(1,OrderBy,SearchQuery)
        loadUserStats()
    }, [])
    // console.log(data)
  return (
    <>
        <div style={{display: LoaderVisibility}}>
            <Loader />
        </div>
        <div className='container' style={{display: dataVisibility}}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">User Management</h1>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
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
                        <h5 className="card-header">Total Admin Users</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['admin_users']}</h5>
                            <p className="card-text">Number Admin Users.</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className="card">
                        <h5 className="card-header">Total Staff users</h5>
                        <div className="card-body">
                            <h5 className="card-title">{userStats['staff_users']}</h5>
                            <p className="card-text">Number of Staff Users.</p>
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
            <div className="card mb-4">
                <h5 className="card-header">Search Users</h5>
                <div className="card-body">
                    <div>
                        {/* <label htmlFor="defaultFormControlInput" className="form-label">Name</label> */}
                        <input
                            type="text"
                            className="form-control"
                            id="defaultFormControlInput"
                            placeholder="Name / Email"
                            onChange={(e)=>{onFilterChange(e)}}                      
                            aria-describedby="defaultFormControlHelp"
                        />
                    </div>
                </div>
            </div>
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
                            UsersData.map((key,i) => {
                                return(
                                <tr>
                                    <th scope="row">{i+1}</th>
                                    <td>{key['name']}</td>
                                    <td>{key['email']}</td>
                                    <td>{key['is_superuser'] === true ? "Admin" : "staff"}</td>
                                    <td>{key['is_active'] === 1 ? "Active" : "Inactive"}</td>
                                    <td>
                                        <div className='col-6'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    {
                                                        user['id'] === key['id'] ? 
                                                        <button type="button" className="btn btn-sm btn-outline-primary">Can't edit</button> : 
                                                        <NavLink type="button" to={{pathname:"/userdetails"}} state={{userID : key['id']}} className="btn btn-sm btn-outline-primary">Edit</NavLink>
                                                    }
                                                </div>
                                                <div className='col-6'>
                                                    {
                                                        user['id'] === key['id'] ? 
                                                        <button type="button" className="btn btn-sm btn-outline-danger">Can't Delete</button> : 
                                                        <button type="button" onClick={(e)=>{onDeleteButtonClick(e,key.id)}} state={{userID : key['id']}} className="btn btn-sm btn-outline-danger">Delete</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* <NavLink type="button" to={{pathname:"/userdetails"}} state={{userID : key['id']}} className="btn btn-sm btn-outline-primary">Edit</NavLink> */}
                                    </td>
                                </tr>)
                            })
                        }                        
                        {/* <tr>
                            <th scope="row">1</th>
                            <td>{data[0]['name']}</td>
                            <td>{data[0]['email']}</td>
                            <td>{data[0]['role'] === true ? "Admin" : "staff"}</td>
                        </tr> */}
                    </tbody>
                </table>
                <br/>
            </div>
            <div className='d-flex justify-content-center'>
                {
                    TotalUsers > 0 ?
                    <Pagination  totalRecords={TotalUsers} pageLimit={PageLimit} paginationSearchQuery={SearchQuery} paginationOrderBy={OrderBy} onPageChanged={onloadUsers} />
                    : <></>
                }
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
