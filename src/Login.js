import React, { Component } from 'react';
import axios from 'axios';
import Logo from './images/Logo-1.png';

// login component
// this will render when the user auth mode is set to login
class Login extends Component {
  constructor(){
    super();
    // set default state
    this.state = {
      // we have 2 inputs that we will be changing
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  // method to log in
  login(e){
    e.preventDefault(); // prevent default form action
    // send request to make sure the email and password are correct
    //console.log(this.state.inputs)
    axios.post(`${this.props.url}/login`, this.state.inputs)
      .then(res => { // set the user based off of the response
        console.log(res);
        this.props.setUser(res.data);
      })
  }

  // method to change an input
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // sets the state for that input to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
      <div className="login-page">
        <div className="auth-form">
        <img className="logo" src={Logo} alt="logo" />
         <h2>Log In</h2>
          <form onSubmit={this.login.bind(this)}>

            <label htmlFor='email'>Email</label>
            <input value={this.state.inputs.email}
              id='email' name='email' type='email'
              onChange={e => this.changeInput(e, 'email')}
            />

            <label htmlFor='password'>Password</label>
            <input value={this.state.inputs.password}
              id='password' name='password' type='password'
              onChange={e => this.changeInput(e, 'password')}
            />

            <div className="form-buttons">
              <button type="submit" className="form-button">Login</button>
              <button onClick={this.props.toggleMode} className="form-button">Sign Up</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
export default Login;
