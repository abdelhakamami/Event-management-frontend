import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import api from '../service/UserService'

const CreateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [appUserRole, setAppUserRole] = useState('')
    
    const history = useNavigate();
    const {id} = useParams();
    const saveOrUpdateUser = (e) => {
        e.preventDefault();
        const user ={name , pwd ,email, appUserRole }

        if(id){
            api.put("http://localhost:8080/api/v1/updateUser/"+ id , user)
            .then((response) => {
                console.log(response.data)
                history('/getAll')

            }).catch(error => {
                console.log(error);
            })

        }else{
            api.post("http://localhost:8080/api/v1/addUser", user)
            .then((response) => {
                console.log(response.data)
                history('/getAll')
    
    
            }).catch(error => {console.log(error)})

        }



        
    }

    useEffect(() => {
        api.get("http://localhost:8080/api/v1/retrieveUserById/"+ id)
        .then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setPwd(response.data.pwd)
            setAppUserRole(response.data.appUserRole)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    

    const title = () => {
        if(id){
            return <h2 className='text-center'> Update User</h2>
        }else {
            return <h2 className='text-center'> Add User</h2>
        }
    }

  

    
    return (
        <div >
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        
                       {
                          title() 
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label">  Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter  name"
                                        name = "name"
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Pwd</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter pwd"
                                        name = "pwd"
                                        className = "form-control"
                                        value = {pwd}
                                        onChange = {(e) => setPwd(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email  :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email"
                                        name = "email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Role</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter role"
                                        name = "role"
                                        className = "form-control"
                                        value = {appUserRole}
                                        onChange = {(e) =>setAppUserRole(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateUser(e)}>submit</button>
                                <Link to ='/getAll' className='btn btn-danger'>Cancel</Link>

                                
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default CreateUser