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
        path: "/refunds/home",
        icon: "database",
        name: "home",
        component: "./Home/Home",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: '/refunds/rpmu',
        icon: 'database',
        name: 'rpmu',
        routes: [
          { path: '/refunds/rpmu', redirect: '/refunds/rpmu/payments' },
          {
            path: '/refunds/rpmu/payments',
            icon: 'database',
            name: 'payments',
            component: './Payments/PaymentsPage',
            authority: ['ADMIN']
          }
        ],
      },

      {
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
            path: "/refunds/calendar",
            icon: "faListAlt",
            name: "calendar",
            component: "./Calendar/CalendarView",
            authority: ["ADMIN", "FSMS1", "FSMS2"]
          }
        ]
      },
      {
        path: "/refunds/options",
        icon: "database",
        name: "options",
        component: "./Options/Options",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: "/refunds/journal",
        icon: "database",
        name: "journal",
        component: "./Journal/JournalPage",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
      {
        path: "/refunds/calendar",
        icon: "faCalendarAlt",
        name: "calendar",
        hideChildrenInMenu: true,
        component: "./Calendar/CalendarView",
        authority: ["ADMIN", "FSMS2"]
      },
      {
        path: '/refunds/reports',
        icon: 'database',
        name: 'reports',
        component: './Reports/ReportsPage',
        authority: ['ADMIN', 'FSMS2']
      },
    ]
  }
];
