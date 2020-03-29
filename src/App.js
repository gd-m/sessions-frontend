import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'


class App extends Component {

  constructor(){
    super()
    this.state = {
      logged_in: false,
      user: {}
    }
  }

  handleLogin = (data) => {
    this.setState({
      ...this.state,
      logged_in: true,
      user: data
    })
  }

  handleLogout = () => {
    this.setState({
      logged_in: false,
      user: {}
    })
  }

  componentDidMount(){
    fetch("http://localhost:3001/api/v1/session", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    .then(res => res.json())
    .then(data => 
      data.logged_in ? this.handleLogin(data) : this.handleLogout()
    //   this.setState({
    //   ...this.state,
    //   errors: data.error,
    //   logged_in: data.logged_in
    // })
    )
    .catch(error => console.log('API Error', error))
  }

  render(){
    return(
      <Router>
        <div>
            <Route exact path="/" render={props => <Home {...props} handleLogout={this.handleLogout} isLoggedIn={this.state.logged_in} /> }/>
            <Route path="/login" render={props => <Login {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.logged_in} /> } />
            <Route path="/signup" render={props => <Signup {...props} handleLogin={this.handleLogin} isLoggedIn={this.state.logged_in} /> } />

        </div>
      </Router>
    )
  }
}


export default App;
