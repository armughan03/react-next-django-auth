import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { NavLink, Navigate, useSearchParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = ({user}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [dashboardVisibility, setdashboardVisibility] = useState('block')
    const state = searchParams.get("state") ? searchParams.get("state") : null
    const code = searchParams.get("code") ? searchParams.get("code") : null
    if (state && code) {
      return <Navigate to="/" />
    }
    // console.log(localStorage.getItem('access'))
  return (
    <>
    {
        user ? 
        <>
            <div style={{display: 'none'}}>
                <Loader />
            </div>
            <div style={{display: dashboardVisibility}}>
                <div className='container'>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
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
                    {
                        user['is_superuser'] ? 
                        <>
                            <div className="nav-align-top mb-4">
                                <ul className="nav nav-pills mb-3 justify-content-center" role="tablist">
                                    <li className="nav-item">
                                        <button type="button" className={"nav-link"} role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-dashboard-overall" aria-controls="navs-pills-top-overall" aria-selected="true">
                                            Overall
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className={"nav-link active"} role="tab" data-bs-toggle="tab" data-bs-target="#navs-pills-dashboard-user" aria-controls="navs-pills-top-user" aria-selected="true">
                                            User
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" style={{backgroundColor: "transparent", boxShadow: "none", padding: "none"}}>
                                <div className={"tab-pane fade"} 
                                        id="navs-pills-dashboard-overall" role="tabpanel">
                                    <AdminDashboard />
                                </div>
                                <div className={"tab-pane fade active show"} 
                                        id="navs-pills-dashboard-user" role="tabpanel">
                                    <UserDashboard />
                                </div>
                            </div>
                        </>
                        : 
                        <>
                            <UserDashboard />
                        </>
                    }
                    
                </div>
            </div>
        </>
        :
        <></>
    }
    
    </>

  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})
  
export default connect(mapStateToProps)(Dashboard)