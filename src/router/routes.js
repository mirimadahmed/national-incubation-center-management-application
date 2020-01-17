import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Startups from "@/pages/Startups.vue";
import Techs from "@/pages/Techs.vue";
import Industries from "@/pages/Industries.vue";
import Users from "@/pages/Users.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/startups",
    children: [
      {
        path: "startups",
        name: "startups",
        component: Startups
      },
      {
        path: "technologies",
        name: "technologies",
        component: Techs
      },
      {
        path: "industries",
        name: "industries",
        component: Industries
      },
      {
        path: "users",
        name: "users",
        component: Users
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
