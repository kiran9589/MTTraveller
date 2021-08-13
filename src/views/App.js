import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login"
import AdminLayout from "layouts/Admin.js";
import PrivateRoute from "../components/PrivateRoute";

function App() {
  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // } 

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