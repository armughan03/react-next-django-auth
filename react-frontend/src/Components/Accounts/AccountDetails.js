import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom"
import Loader from '../Loader/Loader';

const AccountDetails = (props) => {
    const location = useLocation();
    const { state } = location;
    const [data, setData] = useState([])
    const [FormData, setFormData] = useState({
        id : state.userID,
        is_active : 1,
        is_superuser : true,
    })
    const [errorData, setErrorData] = useState({
        status: "",
        message: ""
    })
    const [responseErrorVisibility, setResponseErrorVisibility] = useState("none")
    
    const [UpdateMessage, setUpdateMessage] = useState("")
    const [UpdateMessageVisibility, setUpdateMessageVisibility] = useState("none")
    const [updateErrorData, setUpdateErrorData] = useState({
        status: "",
        message: ""
    })
    const [updateErrorVisibilty, setUpdateErrorVisibility] = useState("none")
    const onChange = e => setFormData({...FormData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        updateUser()
    }
    
    const [LoaderVisibility, setLoaderVisibility] = useState("none")
    const [dataVisibility, setDataVisibility] = useState("none")
    const loadUser = async() => {
        const config = {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `JWT ${localStorage.getItem('access')}`,
              'Accept' : 'application/json'
          }
        }
        const Body = JSON.stringify({userID: state.userID})
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user_details/`,Body, config)
          setData(response.data['user_details'][0])
          setFormData({
            id : state.userID,
            is_active : response.data['user_details'][0]['is_active'],
            is_superuser : response.data['user_details'][0]['is_superuser'],
          })
        //   console.log('Users', JSON.stringify(response.data['user_details'][0]))
        } catch (error) {
            setErrorData({
                status: error.response.status,
                message: error.response.statusText
            })
            setResponseErrorVisibility("block")
        }
    }
    const updateUser = async() => {
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/update_user/`, FormData ,config)
            if (response.status === 200){
                loadUser()
                setUpdateMessage(data['name'] + "'s account updated successfully")
            }
            setUpdateMessageVisibility("block")
        } catch (error) {
            setUpdateErrorData({
                status: error.response.status,
                message: error.response.statusText
            })
            setUpdateErrorVisibility("block")
        }
    }
    useEffect(() => {
        setLoaderVisibility("blokc")
        setDataVisibility("none")
        loadUser()
        setLoaderVisibility("none")
        setDataVisibility("block")
    }, []);
  return (
    <>
        <div style={{display: LoaderVisibility}}>
            <Loader />
        </div>
        <div className='container' style={{display: dataVisibility}}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">
                    {
                        errorData.message === "" ?
                            data['name'] + "'s Details"
                        :
                            "Error"
                    }
                </h1>
            </div>
            {
                errorData.message !== "" ?
                    <>
                        <div className="alert alert-danger" style={{display: responseErrorVisibility}} role="alert">
                            {errorData.status} : {errorData.message}
                        </div>
                    </>
                :
                <>
                    <div className="alert alert-danger" style={{display: updateErrorVisibilty}} role="alert">
                        {updateErrorData.status} : {updateErrorData.message}
                    </div>
                    <div className="alert alert-success" style={{display: UpdateMessageVisibility}} role="alert">
                        {UpdateMessage}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" value={data['name']} name='name' disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={data['email']} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">Status</label>
                            <select className="form-select" onChange={e => onChange(e)} value={FormData['is_active']} name="is_active" aria-label="Default select example">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Role" className="form-label">Role</label>
                            <select className="form-select" onChange={e => onChange(e)} value={FormData['is_superuser']} name="is_superuser" aria-label="Default select example">
                                <option value="true">Admin</option>
                                <option value="false">Agent</option>
                            </select>
                        </div> 
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>  
                </>
            }
        </div>
    </>
  )
}

export default AccountDetails