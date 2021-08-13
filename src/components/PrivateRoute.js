import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
