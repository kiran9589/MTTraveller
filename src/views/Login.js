import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import '../assets/css/login.css';

async function loginUser(credentials) {

  let result = null;
  const endpoint = "http://3.66.147.152:9000/graphql";
  const signIn = `
    mutation signIn {
      signIn(input:{
        email:"superadmin"
        password:"MTT@1234"
      }){
        accessToken
      }
    }
  `;

  await axios({
    url: endpoint,
    method: "POST",
    data: {
      query: signIn
    }
  }).then(response => {
    
    if(response.data.data){
      result = response.data.data.signIn.accessToken
    }
    
  });
  return result;
}

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="auth-wrapper">
        <form className="auth-inner" onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
              <label>User Name</label>
              <input type="text" className="form-control" 
              onChange={e => setUserName(e.target.value)} placeholder="Enter username" 
              validations={[required]}/>
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          </div>

          <div className="form-group">
              <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  {/* <label className="custom-control-label" htmlFor="customCheck1">Remember me</label> */}
              </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          {/* <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
          </p> */}
    </form>
    </div>
    
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};