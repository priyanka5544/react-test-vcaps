import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

let selecteHobby = [
    { text: "reading", value: "reading", selected: false },
    { text: "dancing", value: "dancing", selected: false },
    { text: "singing", value: "singing", selected: false },
]
export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            mobileNo: "",
            password: "",
            confirmPassword: "",
            gender: "",
            hobbies: [...selecteHobby],
            selectedFile:null
        }
    }

    handleFileUpload =(ev)=>{
        console.log(ev.target.files)
        this.setState({selectedFile:ev.target.files[0]})
    }

    handleChecked = (value, index) => {
        let { hobbies } = this.state
        // console.log(hobbies)
        // console.log(index)
        hobbies[index].selected = value

        this.setState({
            hobbies
        });

    }

    handleRegister = () => {
        let profile_pic = new FormData()
        profile_pic.append("file", this.state.selectedFile, this.state.selectedFile.name)
         let { name, email, mobileNo, password, confirmPassword, gender, hobbies } = this.state
        let newHobbies = []
        hobbies.forEach(el => {
            if (el.selected) {
                newHobbies.push({
                    name: el.text,
                    value: el.value
                })
            }
        })
        console.log(newHobbies)
        let data = {
            hobbies: newHobbies,
            name, email, mobileNo, password, confirmPassword, gender,profile_pic
       }
        if(name=="" || email=="" || mobileNo=="" || password=="" || confirmPassword=="" ||
          gender=="" || hobbies==""){
              alert("Fields must be filled...")
          }

        if(password !== confirmPassword){
            alert("Password and Confirm Password must be same...")
        }
        axios.post("http://localhost:3300/user/register", data).then(res => {
            console.log(res)
            let data = res.data
            if (data.status != "OK") {
                toast(data.msg)
            } else {
                toast(data.msg)
                window.location = "/"
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const hobbies = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row signup_mt">
                        <div className="col-md-6 offset-3 border p-4 bg_form">
                            <h2 className="text-center mb-2">Sign Up</h2>

                            <label><i className="fas fa-user mr-2"></i>Full Name</label>
                            <input type="text"
                                className="form-control mb-2"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })} required
                            />

                            <label><i className="fas fa-envelope mr-2"></i>Email Address</label>
                            <input type="email"
                                className="form-control mb-2"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })} required
                            />

                            <label><i className="fas fa-phone mr-2"></i>Mobile Number</label>
                            <input type="number"
                                className="form-control mb-2"
                                value={this.state.mobileNo}
                                onChange={(e) => this.setState({ mobileNo: e.target.value })} required
                            />

                            <label><i className="fas fa-lock mr-2"></i>Password</label>
                            <input type="password"
                                className="form-control mb-2"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })} required
                            />

                            <label><i className="fas fa-lock mr-2"></i>Confirm Password</label>
                            <input type="password"
                                className="form-control mb-2"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })} required
                            />

                            <label><i className="fas fa-image mr-2"></i>Profile Picture</label>
                            <input type="file" className="form-control mb-2"
                                   onChange={(e)=>this.handleFileUpload(e)} />

                            <label>Gender : </label>
                            <input type="radio" name="gender" value="male" className="ml-3"
                                onChange={(e) => this.setState({ gender: e.target.value })}
                            />Male
                           <input type="radio" name="gender" value="female" className="ml-2"
                                onChange={(e) => this.setState({ gender: e.target.value })}
                            />Female<br />

                            <label>Hobbies : </label>
                            {this.state.hobbies.map((hobbie, index) => {
                                return (
                                    <lable>
                                        <input type="checkbox" className="ml-2"
                                            onChange={
                                                () => this.handleChecked(!hobbie.selected, index)
                                            }
                                            selected={hobbies.selected}
                                        />
                                        {hobbie.text}

                                    </lable>

                                )
                            })}

                            <button className="btn btn-primary btn-block mb-2 "
                                onClick={this.handleRegister}>Sign Up</button>

                            <p>already have an account? login<Link to="/">here</Link></p>
                        </div>
                    </div>
                </div>

                <ToastContainer position="top-center" />
            </div>
        )
    }
}
