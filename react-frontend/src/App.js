import logo from './logo.svg'
import './App.css'


import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
  Outlet
} from "react-router-dom"
import Layout from './Layout/Layout'
import Dashboard from './Components/Dashboard/Dashboard'
import SignIn from './Components/Authentication/SignIn'
import SidebarLayout from './Layout/SidebarLayout'
import NonSidebarLayout from './Layout/NonSidebarLayout'
import AccountDashboard from './Components/Accounts/AccountDashboard'
import CreateNewAccount from './Components/Accounts/CreateNewAccount'
import AccountDetails from './Components/Accounts/AccountDetails'
import {Provider} from 'react-redux'
import store from './Store'
import UserProfile from './Components/Authentication/UserProfile'
import SuperUserLayout from './Layout/SuperUserLayout'
import NoHead from './Layout/NoHead'
import UpdatePassword from './Components/Accounts/UpdatePassword'
import ForgetPassword from './Components/Authentication/ForgetPassword'
import ResetPasswordConfirm from './Components/Authentication/ResetPasswordConfirm'


function App() {
  return (
    <>
      <Provider store={store}> 
          <Router>
          {/* <Router basename={process.env.PUBLIC_URL}> */}
          
              <Layout>
                <Routes>
                  <Route element={<SidebarLayout /> }>
                    <Route exact path="/" element={<Dashboard name="" /> } />
                    <Route element={<SuperUserLayout /> }>
                      <Route exact path="/users" element={<AccountDashboard name="" /> } />
                      <Route exact path="/newuser" element={<CreateNewAccount name="" /> } />
                      <Route exact path="/userdetails" element={<AccountDetails name="" /> } />
                    </Route>
                    <Route exact path="/profile" element={<UserProfile name="" /> } />
                    <Route exact path="/updatePassword" element={<UpdatePassword /> } siteName={"SignIn"} />
                  </Route>
                  <Route  element={<NoHead /> }>                    
                      <Route exact path="/updateFirstPassword" element={<UpdatePassword /> } siteName={"SignIn"} />
                  </Route>
                  <Route element={<NonSidebarLayout /> }>
                    <Route exact path="/reset-password-confirm" element={<ResetPasswordConfirm /> } siteName={"Home"} />
                    <Route exact path="/reset-password" element={<ForgetPassword /> } siteName={"Home"} />
                    <Route exact path="/signin" element={<SignIn /> } siteName={"SignIn"} />
                  </Route>
                </Routes>
              </Layout>
          </Router>
      </Provider>
    </>
  )
}

export default App
