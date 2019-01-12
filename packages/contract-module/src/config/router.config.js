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
          },
          {
            path: "/contracts2/contracts/create",
            name: "contractView",
            component: "./CounterAgent/CounterAgentCreate"
          },
          {
            path: "/contracts2/contracts/edit",
            name: "contractView",
            component: "./CounterAgent/CounterAgentEdit"
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
          },
          {
            path: "/contracts2/acts/create",
            name: "actview",
            component: "./Acts/ViewAct"
          },
          {
            path: "/contracts2/acts/edit",
            name: "actadd",
            component: "./Acts/ViewAct"
          }
        ]
      },
      {
        path: "/contracts2/contractrequests",
        name: "contractrequests",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts2/contractrequests",
            redirect: "/contracts2/contractrequests/table"
          },
          {
            path: "/contracts2/contractrequests/table",
            component: "./ContractRequests/main"
          },
          {
            path: "/contracts2/contractrequests/create",
            component: "./ContractRequests/ContractRequestsadd"
          },
          {
            path: "/contracts2/contractrequests/edit",
            name: "add",
            component: "./ContractRequests/ContractRequestsadd"
          }
        ]
      },
      {
        path: "/contracts2/documents",
        exact: true,
        icon: "database",
        name: "documents",
        component: "./Documents/Documents",
        authority: ["ADMIN", "FSMS2"]
      },
      {
        path: "/contracts2/documents/view",
        component: "./Documents/ViewDocument"
      },
      {
        path: "/contracts2/bills",
        name: "bills",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts2/bills",
            redirect: "/contracts2/bills/table"
          },
          {
            path: "/contracts2/bills/table",
            component: "./Bill/main"
          },
          {
            path: "/contracts2/bills/add",
            name: "billadd",
            component: "./Bill/Billsadd"
          },
          {
            path: "/contracts2/bills/edit",
            name: "billadd",
            component: "./Bill/ViewBill"
          }
        ]
      }
    ]
  }
];
