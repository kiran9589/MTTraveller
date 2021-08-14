import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login"
import AdminLayout from "layouts/Admin.js";
import PrivateRoute from "../components/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
toast.configure() 

function App() {
  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // } 

  const notify = ()=>{ 
    // Set to 10sec
    toast.warning('Danger', {autoClose:10000})
    // Set to 3sec
    toast.success('successful', {autoClose:3000})
    // User have to close it
    toast.info('GeeksForGeeks', {autoClose:false})
    toast.error('Runtime error', {
    // Set to 15sec
    position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
    toast('Hello Geeks')// Default
      
}

  return (
    <BrowserRouter>
    <Switch>
      <Route path={"/login"} render={(props) => <Login {...props} />} />
      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
  );
}

export default App;