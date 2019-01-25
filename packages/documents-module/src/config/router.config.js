export default [
  {
    path: "/documents/",
    authority: ["ADMIN", "FSMS1", "FSMS2"],
    routes: [
      {
        path: "/documents",
        redirect: "/documents/main"
      },
      {
        path: "/documents/main",
        exact: true,
        icon: "database",
        name: "documents",
        component: "./Documents/Documents",
        authority: ["ADMIN", "FSMS2"]
      },
      {
        path: "/documents/view",
        component: "./Documents/ViewDocument"
      },
    ]
  }
];
