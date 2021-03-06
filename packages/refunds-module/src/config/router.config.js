export default [
  //exceptions
  // {
  //   path: "/exception",
  //   routes: [
  //     { path: "/exception", component: "/Exception/404" },
  //     { path: "/exception/404", component: "/Exception/404" },
  //     { path: "/exception/403", component: "/Exception/403" },
  //     { path: "/exception/500", component: "/Exception/500" }
  //   ]
  // },
  // app
  {
    path: "/refunds",
    //component: "../App",
    //Routes: ["src/pages/Authorized"],
    authority: ["ADMIN", "FSMS1", "FSMS2"],
    redirect: "/refunds/rpmu/payments",
    routes: [
      {
        path:"/refunds/refunds",
        redirect:"/refunds/home",
        hideChildrenInMenu:true
      },
      {
        path: "/refunds/home",
        icon: "database",
        name: "home",
        component: "./Home/Home",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: "/refunds/rpmu",
        icon: "database",
        name: "rpmu",
        routes: [
          { path: "/refunds/rpmu", redirect: "/refunds/rpmu/payments" },
          {
            path: "/refunds/rpmu/payments",
            icon: "database",
            name: "payments",
            component: "./PaymentsPage/PaymentsPage",
            authority: ["ADMIN"]
          }
        ]
      },
      {
        path: "/refunds/refund",
        icon: "database",
        name: "refund",
        routes: [
          { path: "/refunds/refund", redirect: "/refunds/refund/reestr" },
          {
            path: "/refunds/refund/requests",
            name: "requests",
            icon: "faListAlt",
            component: "./Requests/Requests",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/refund/reestr",
            icon: "faListAlt",
            name: "reestr",
            component: "./Main/MainView",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/refund/pool",
            icon: "database",
            name: "pulls",
            component: "./Pulls/Pulls",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/refund/calendar",
            icon: "faListAlt",
            name: "calendar",
            component: "./Calendar/CalendarView",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          }
        ]
      },

      /*{
        path: "/refunds",
        icon: "database",
        name: "refunds",
        routes: [
          { path: "/refunds", redirect: "/refunds/home" },
          {
            path: "/refunds/requests",
            name: "requests",
            icon: "faListAlt",
            component: "./Requests/Requests",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/reestr",
            icon: "faListAlt",
            name: "reestr",
            component: "./Main/MainView",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/pool",
            icon: "database",
            name: "pulls",
            component: "./Pulls/Pulls",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          },
          {
            path: "/refunds/calendar",
            icon: "faListAlt",
            name: "calendar",
            component: "./Calendar/CalendarView",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          }
          // {
          //   path: "/refunds/template",
          //   icon: "faListAlt",
          //   name: "template",
          //   component: "./Templates/Template",
          //   authority: ["ADMIN", "FSMS1", "FSMS2"]
          // },
          // {
          //   path: "/refunds/static",
          //   icon: "faListAlt",
          //   name: "staticview",
          //   component: "./StaticticsView/StaticticsView",
          //   authority: ["ADMIN", "FSMS1", "FSMS2"]
          // }
        ]
      },*/
      {
        path: "/refunds/options",
        icon: "database",
        name: "options",
        component: "./Options/Options",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: "/refunds/documents",
        icon: "database",
        name: "documents",
        routes: [
          { path: "/refunds/documents", redirect: "/documents/main" }
        ]
      },
      {
        path: "/refunds/journal",
        icon: "database",
        name: "journal",
        component: "./Journal/JournalPage",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: "/refunds/reports",
        icon: "database",
        name: "reports",
        component: "./ReportsPage/ReportsPage",
        authority: ["ADMIN", "FSMS2"]
      }
    ]
  }
];
