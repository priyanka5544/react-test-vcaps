import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
export default class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             password:""
        }
    }

        handleLogin = ()=>{
           let {email, password} = this.state
           axios.post("http://localhost:3300/user/login",{email, password}).then(async (res) =>{
            console.log(res)
            let data = res.data
            if(data.status != "OK"){
                toast(data.msg)
            }else{
                let token = data.data.token
                await localStorage.setItem('lgntkn',token)
                toast(data.msg)
                window.location = "/dashboard"
            }
        }).catch(err =>{
            console.log(err)
        })
        }
    render() {
        return (
            <div>
                 <div className="container mt-5 ">
         
                     <div className="row signin_mt ">
                         <div className="col-md-6 offset-3 border p-5 bg_form">
                           <h2 className="text-center mb-4">Sign In</h2>

                           <label><i className="fas fa-envelope mr-2"></i>Email</label>
                           <input type="email" 
                                  className="form-control mb-4"
                                  value={this.state.email}
                                  onChange={(e)=>this.setState({email:e.target.value})} required
                                  />
                                   
                           <label><i className="fas fa-lock mr-2"></i>Password</label>
                           <input type="password" 
                                  className="form-control mb-4"
                                  value={this.state.password}
                                  onChange={(e)=>this.setState({password:e.target.value})} required
                                  />

                           <button className="btn btn-primary btn-block mb-3"
                                   onClick={this.handleLogin}>Sign In</button>

                           <p>Don't have an account yet? register<Link to="/signup">here</Link></p>
                         </div>
                     </div>
                 </div>

                 <ToastContainer position="top-center" />
            </div>
        )
    }
}
