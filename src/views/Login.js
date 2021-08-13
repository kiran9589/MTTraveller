import React, { useEffect } from "react";
import axios from "axios";
import '../assets/css/login.css';
import authService from "../services/auth.service";

function Login(props) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.history.push("/admin/dashboard");
    }
  }, []);

  const loginUser = async ({userName, password}) => {

    authService.login(userName, password)
                .then(response=>{
                  debugger;
                  console.log("response : ", response);
                  props.history.push("/admin/dashboard");
                });
    // const endpoint = "http://3.66.147.152:9000/graphql";
    // const signIn = `
    //   mutation signIn {
    //     signIn(input:{
    //       email:"${credentials.userName}"
    //       password:"${credentials.password}"
    //     }){
    //       accessToken
    //     }
    //   }
    // `;

    // axios({
    //   url: endpoint,
    //   method: "POST",
    //   data: {
    //     query: signIn,
    //   },
    // })
    //   .then((response) => {
    //     if (response.data.data) {
    //       const token = response.data.data.signIn.accessToken;
    //       if (localStorage.getItem("mTTacessToken") == token) {
    //       } else {
    //         localStorage.setItem(
    //           "mTTacessToken",
    //           response.data.data.signIn.accessToken
    //         );
    //       }
    //       props.history.push("/admin/dashboard");
    //     }
    //   })
    //   .catch((error) => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    const userName = data[0].value;
    const password = data[1].value;

    loginUser({
      userName,
      password,
    });
  };

  return (
    <div className="auth-wrapper">
        <form className="auth-inner" onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
              <label>User Name</label>
              <input type="text" className="form-control" 
              placeholder="Enter username" 
              required />
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control"  placeholder="Enter password" required/>
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
  );
}
export default Login;
