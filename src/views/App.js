import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login"
import AdminLayout from "layouts/Admin.js";

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  } 

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    </BrowserRouter>
  );
}

export default App;