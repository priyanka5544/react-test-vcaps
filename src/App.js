
import React, { Component } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
export default class App extends Component {
  render() {
    return (

      <Router>
        <Route path="/" component={SignIn} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>

    )
  }
}

