import React, { Component } from 'react';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import axios from 'axios';
import Cookies from './helpers/Cookies';
import UserAuth from './UserAuth';
import Homepage from './components/Homepage';

class App extends Component {
  constructor(){
    super();
    // set up our state.
    this.state = {
      user: false, // default user is no user
      // the app needs to do a request, so there will be a loading time
      // we want to display something else while it does that
      mode: 'loading',
      // url for the API we are using - uncomment the one you want to use

      url: 'http://localhost:3001',
      homepage: 'http://localhost:3000'
    }
  }

  // once the component mounted, we want to initialize our user
  componentDidMount(){
    this.initUser();
  }

  // method to initialize our user
  initUser(){
    // get the token from the cookie
    const token = Cookies.get('token');
    // if there is a token
    if(token && token !== ''){
      // send a request to our API to validate the user
      axios.get(`${this.state.url}/users/validate`, {
        // include the token as a parameter
        params: {auth_token: token}})
        .then(res => { // the response will be the user
          // set the user in the state, and change the mode to content
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => { // if there is an error
          Cookies.set('token', '') // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false, mode: 'auth'});
        })
    } else { // if there is no token
      // we should render the auth forms
      this.setState({mode: 'auth'});
    }
  }

  // method to set a user
  setUser(user){
    // set a cookie with the user's token
    Cookies.set('token', user.token);
    // set state to have the user and the mode to content
    this.setState({user: user, mode: 'content'});
  }

  // method to log out
  logout(){
    // take away the cookie
    Cookies.set('token', '');
    // remove the user and set the mode to auth
    this.setState({user: false, mode: 'auth'});
  }

  // method that renders the view based on the mode in the state
  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/8b/a8/ce/8ba8ce24910d7b2f4c147359a82d50ef.gif"
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else if(this.state.mode === 'content') {
      return (
        //<Content logout={this.logout.bind(this)} user={this.state.user} />
        <BrowserRouter>
          <Homepage logout={this.logout.bind(this)} user={this.state.user}  url={this.state.url} homepage={this.state.homepage} />
        </BrowserRouter>
      )
    }
  }

  render() {
    return (
      <div>
        { this.renderView() }
      </div>
    );
  }
}

export default App;
