import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

const endpoint = "http://3.66.147.152:9000/graphql";
const signIn = `
  {
    signIn(input:{
       email:"superadmin"
      password:"MTT@1234"
    }){
      accessToken
    }
  }
`;


const Login = (props) => {
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = login();
    localStorage.setItem("token", true);
    history.push("/");
  };

  const login = () => {
    const { data, isLoading, error } = useQuery("launches", () => {
      return axios({
        url: endpoint,
        method: "POST",
        data: {
          mutation: signIn
        }
      }).then(response => response.data.data);
    });
  
    if (isLoading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;
    if(data) return data;
  }
  

  const click = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      {localStorage.getItem("token") !== "true" ? (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <fieldset
            style={{
              width: "60%",
              margin: "auto",
              marginBottom: "2%",
              textAlign: "end",
            }}
          >
            <legend>Login</legend>
            <input
              id="username"
              placeholder="UserName"
              className="fields"
              type="text"
            ></input>

            <input
              id="password"
              placeholder="Password"
              className="fields"
              type="password"
            ></input>

            <input type="submit" className="buttons" style={{ width: "20%" }} />
          </fieldset>
        </form>
      ) : (
        <button style={{ width: "50%" }} className="buttons" onClick={click}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
