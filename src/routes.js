import Dashboard from "views/Dashboard.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-circle-09",
    component: Dashboard,
    layout: "/admin",
    key:"dashboard",
    id:"dashboard"
  },
];

export default dashboardRoutes;
