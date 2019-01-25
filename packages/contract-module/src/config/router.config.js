export default [
  {
    path: "/contracts/v2",
    authority: ["ADMIN", "FSMS1", "FSMS2"],
    routes: [
      {
        path: "/contracts/v2",
        redirect: "/contracts/v2/counteragent/main"
      },
      {
        path: "/contracts/v2/counteragent",
        name: "counteragent",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        hideChildrenInMenu: true,
        routes: [
          {
            path: "/contracts/v2/counteragent",
            redirect: "/contracts/v2/counteragent/main"
          },
          {
            path: "/contracts/v2/counteragent/main",
            component: "./CounterAgent/CounterAgent"
          }
          // {
          //   path: '/contracts/v2/counteragent/viewcontract',
          //   name:"viewcounteragent",
          //   component: './CounterAgent/CounterAgentView',
          // },
        ]
      },
      {
        path: "/contracts/v2/contracts",
        name: "contracts",
        component: "./CounterAgent/CounterAgentMain",
        icon: "database",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts/v2/contracts",
            redirect: "/contracts/v2/contracts/table"
          },
          {
            path: "/contracts/v2/contracts/table",
            component: "./ContractView/ContractTable"
          },
          {
            path: "/contracts/v2/contracts/create",
            name: "contractView",
            component: "./CounterAgent/CounterAgentCreate"
          },
          {
            path: "/contracts/v2/contracts/edit",
            name: "contractView",
            component: "./CounterAgent/CounterAgentEdit"
          },
          {
            path: "/contracts/v2/contracts/view",
            name: "contractView",
            component: "./CounterAgent/CounterAgentView"
          }
        ]
      },
      {
        path: "/contracts/v2/acts",
        name: "acts",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts/v2/acts",
            redirect: "/contracts/v2/acts/table"
          },
          {
            path: "/contracts/v2/acts/table",
            component: "./Acts/main"
          },
          {
            path: "/contracts/v2/acts/create",
            name: "actview",
            component: "./Acts/ViewAct"
          },
          {
            path: "/contracts/v2/acts/edit",
            name: "actadd",
            component: "./Acts/ViewAct"
          }
        ]
      },
      {
        path: "/contracts/v2/contractrequests",
        name: "contractrequests",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts/v2/contractrequests",
            redirect: "/contracts/v2/contractrequests/table"
          },
          {
            path: "/contracts/v2/contractrequests/table",
            component: "./ContractRequests/main"
          },
          {
            path: "/contracts/v2/contractrequests/create",
            component: "./ContractRequests/ContractRequestsadd"
          },
          {
            path: "/contracts/v2/contractrequests/edit",
            name: "add",
            component: "./ContractRequests/ContractRequestsadd"
          }
        ]
      },
      // {
      //   path: "/contracts/v2/documents",
      //   exact: true,
      //   icon: "database",
      //   name: "documents",
      //   component: "./Documents/Documents",
      //   authority: ["ADMIN", "FSMS2"]
      // },
      // {
      //   path: "/contracts/v2/documents/view",
      //   component: "./Documents/ViewDocument"
      // },
      {
        path: "/contracts/v2/bills",
        name: "bills",
        icon: "database",
        component: "./CounterAgent/CounterAgentMain",
        hideChildrenInMenu: true,
        authority: ["ADMIN", "FSMS1", "FSMS2"],
        routes: [
          {
            path: "/contracts/v2/bills",
            redirect: "/contracts/v2/bills/table"
          },
          {
            path: "/contracts/v2/bills/table",
            component: "./Bill/main"
          },
          {
            path: "/contracts/v2/bills/add",
            name: "billadd",
            component: "./Bill/Billsadd"
          },
          {
            path: "/contracts/v2/bills/edit",
            name: "billadd",
            component: "./Bill/ViewBill"
          }
        ]
      }
    ]
  }
];
