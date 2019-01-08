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
      {
        path: '/contracts2/counteragent',
        name: 'counteragent',
        icon: 'database',
        component: './CounterAgent/CounterAgentMain',
        authority: ['ADMIN', 'FSMS1', 'FSMS2'],
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/contracts2/counteragent',
            redirect: '/contracts2/counteragent/main',
          },
          {
            path: '/contracts2/counteragent/main',
            component: './CounterAgent/CounterAgent',
          },
          // {
          //   path: '/contracts2/counteragent/viewcontract',
          //   name:"viewcounteragent",
          //   component: './CounterAgent/CounterAgentView',
          // },
          // {
          //   path: '/contracts2/counteragent/create',
          //   name:"contractView",
          //   component: './CounterAgent/CounterAgentCreate',
          // },
          // {
          //   path: '/contracts2/counteragent/editcontract',
          //   name:'contractView',
          //   component: './CounterAgent/CounterAgentEdit',
          // },
        ],
      },
    ]
  }
];
