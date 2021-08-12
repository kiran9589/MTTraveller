import Dashboard from "views/Dashboard.js";
import Posts from "views/Posts.js";
import Login from "views/Login.js";

const dashboardRoutes = [
  {
    path: "/posts",
    name: "Posts",
    icon: "nc-icon nc-chart-pie-35",
    component: Posts,
    layout: "/admin",
    key:"post"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-circle-09",
    component: Dashboard,
    layout: "/admin",
    key:"dashboard"
  },
];

export default dashboardRoutes;
