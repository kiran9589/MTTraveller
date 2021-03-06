import Dashboard from "views/Dashboard.js";
import Step from "views/Steps.js";
import Notification from "views/Notification.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Posts",
    icon: "nc-icon nc-circle-09",
    component: Dashboard,
    layout: "/admin",
    key:"dashboard",
    id:"dashboard"
  },
  {
    path: "/steps",
    name: "Steps",
    icon: "nc-icon nc-circle-09",
    component: Step,
    layout: "/admin",
    key:"steps",
    id:"steps"
  },
  {
    path: "/notification",
    name: "Notification",
    icon: "nc-icon nc-circle-09",
    component: Notification,
    layout: "/admin",
    key:"notification",
    id:"notification"
  }
];

export default dashboardRoutes;
