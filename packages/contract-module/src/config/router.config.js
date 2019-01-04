export default [
  {
    path: "/contracts2",
    authority: ["ADMIN", "FSMS1", "FSMS2"],
    routes: [
      {
        path: "/contracts2/home",
        icon: "database",
        name: "home",
        component: "./Home/Home",
        authority: ["ADMIN", "FSMS1", "FSMS2"]
      },
    ]
  }
];
