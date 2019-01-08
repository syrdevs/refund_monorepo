export default [
  {
    path: "/contracts2",
    authority: ["ADMIN", "FSMS1", "FSMS2"],
    routes: [
      {
        path: "/contracts2",
        redirect: "/contracts2/counteragent/main"
      },
      {
        path: "/contracts2/counteragent",
        name: "counteragent",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        hideChildrenInMenu: true,
        routes: [
          {
            path: "/contracts2/counteragent",
            redirect: "/contracts2/counteragent/main"
          },
          {
            path: "/contracts2/counteragent/main",
            component: "./CounterAgent/CounterAgent"
          }
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
        ]
      },
      {
        path: "/contracts2/contracts",
        name: "contracts",
        component: "./CounterAgent/CounterAgentMain",
        icon: "database",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts2/contracts",
            redirect: "/contracts2/contracts/table"
          },
          {
            path: "/contracts2/contracts/table",
            component: "./ContractView/ContractTable"
          }
        ]
      },

      {
        path: "/contracts2/acts",
        name: "acts",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts2/acts",
            redirect: "/contracts2/acts/table"
          },
          {
            path: "/contracts2/acts/table",
            component: "./Acts/main"
          }
        ]
      },
      {
        path: '/contracts2/contractrequests',
        name: 'contractrequests',
        icon: 'database',
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ['ADMIN', 'FSMS1', 'FSMS2'],
        routes: [
          {
            path: '/contracts2/contractrequests',
            redirect: '/contracts2/contractrequests/table',
          },
          {
            path: '/contracts2/contractrequests/table',
            component: './ContractRequests/main',
          }
        ],
      },

      {
        path: '/contracts2/bills',
        name: 'bills',
        icon: 'database',
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ['ADMIN', 'FSMS1', 'FSMS2'],
        routes: [
          {
            path: '/contracts2/bills',
            redirect: '/contracts2/bills/table',
          },
          {
            path: '/contracts2/bills/table',
            component: './Bill/main',
          }
        ],
      },
    ]
  }
];
