import axios from "axios";
import config from "../common/config"
import { history } from "_helper/history";
const API_URL = config.apiUrl;

class AuthService {
  login(username, password) {
    const signIn = `mutation signIn {
          signIn(input:{
              email:"${username}"
              password:"${password}"
          }){
              accessToken
          }
        }`;

    const requestOptions = {
      url: API_URL,
      method: 'POST',
      data: {
          query: signIn
      }
    };

    return axios(requestOptions)
      .then(response => {
        if (response.data.data) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          const token = response.data.data.signIn.accessToken;
          if (localStorage.getItem("token") != token) {
            localStorage.setItem("token",token);
          }
          return token;
        }
        return null;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
