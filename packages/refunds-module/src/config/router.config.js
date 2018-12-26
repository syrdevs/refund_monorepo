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
    routes: [
      {
        path: "/refunds",
        icon: "faCreditCard",
        name: "refunds",
        routes: [
          { path: "/refunds", redirect: "/refunds/reestr" },
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
            path: "/refunds/calendar",
            icon: "faCalendarAlt",
            name: "calendar",
            hideChildrenInMenu: true,
            component: "./Calendar/CalendarView",
            authority: ["ADMIN", "FSMS2"]
          }
        ]
      }
    ]
  }
];
