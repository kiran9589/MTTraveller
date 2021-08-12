import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

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

  console.log(result);
  return result;

//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
}

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
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};