"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sharedUi = require("@vitacore/shared-ui");

var _ContentLayout = _interopRequireDefault(require("./layouts/ContentLayout"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("./Redux/store"));

var _router = _interopRequireDefault(require("./config/router.config"));

var _reactLoadable = _interopRequireDefault(require("react-loadable"));

var _antd = require("antd");

require("./App.css");

var _jsxFileName = "C:\\refund_tatar\\packages\\refunds-module\\src\\App.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  overflow-x: hidden;\n  background-color: white;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n  background-color: #edf1f5;\n  min-width: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SubMenu = _antd.Menu.SubMenu;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Sider = _antd.Layout.Sider;

var RootContainer = _styledComponents.default.div(_templateObject());

var ContentX = _styledComponents.default.div(_templateObject2());

var refundMenuItems = [{
  name: "Возвраты",
  hrefPrefix: "/refunds/reestr",
  iconName: "database",
  translationKey: "leftMenu.refunds._",
  subItems: []
}, {
  name: "Платежи",
  hrefPrefix: "/refunds/requests",
  iconName: "database",
  translationKey: "leftMenu.refunds.payments",
  subItems: []
}];

var loader = function loader() {
  return _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, " ");
};

var RoutingCollection = [];

function routerItemRender() {
  _router.default.forEach(function (parentMenu) {
    //redirect
    //<Redirect to="/somewhere/else" />
    // if (parentMenu.component) {
    //   RoutingCollection.push(<Route key={parentMenu.path} exact path={parentMenu.path} render={() => {
    //     const Component = withRouter(lazy(() => import("./pages/" + parentMenu.component.replace("./", ""))));
    //     return <Component/>;
    //   }}/>);
    // }
    if (parentMenu.routes) {
      parentMenu.routes.forEach(function (childMenu) {
        //redirect
        // if (childMenu.component) {
        //   RoutingCollection.push(<Route key={childMenu.path} exact path={childMenu.path} render={() => {
        //     const Component = withRouter(lazy(() => import("./pages/" + childMenu.component.replace("./", ""))));
        //     return <Component/>;
        //   }}/>);
        // }
        if (childMenu.routes) {
          childMenu.routes.forEach(function (subChildMenu) {
            if (subChildMenu.component) {
              // const RouteComponent = lazy(() => import("./pages/" + subChildMenu.component.replace("./", "")));
              var RouteComponent = (0, _reactLoadable.default)({
                loader: function loader() {
                  return import("./pages/" + subChildMenu.component.replace("./", ""));
                },
                loading: loader
              });
              RoutingCollection.push(_react.default.createElement(_reactRouterDom.Route, {
                key: subChildMenu.path,
                exact: true,
                path: subChildMenu.path,
                component: (0, _reactRouterDom.withRouter)(RouteComponent),
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 88
                },
                __self: this
              }));
            }
          });
        }
      });
    }
  });
}

function menuItemRender() {}

routerItemRender();
menuItemRender();

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var location = this.props.location.pathname;
      var bcRoutes = [{
        path: "/",
        breadcrumbName: "Главная"
      }, {
        path: "/refunds",
        breadcrumbName: "Возвраты"
      }];

      if (location === "/refunds/reestr") {
        bcRoutes.push({
          path: "/refunds/reestr",
          breadcrumbName: "Реестр"
        });
      }

      if (location === "/refunds/requests") {
        bcRoutes.push({
          path: "/refunds/requests",
          breadcrumbName: "Заявки"
        });
        "";
      }

      return _react.default.createElement(_reactRedux.Provider, {
        store: _store.default,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, _react.default.createElement(ContentX, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, _react.default.createElement(_antd.Layout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        },
        __self: this
      }, _react.default.createElement(_antd.Layout, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }, _react.default.createElement(Sider, {
        width: 300,
        style: {
          background: "#fff"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        },
        __self: this
      }, _react.default.createElement(_sharedUi.LeftMenu, {
        leftMenuItems: refundMenuItems.concat(),
        location: location,
        goToLink: this.props.history.push,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      })), _react.default.createElement(_antd.Layout, {
        style: {
          borderLeft: "1px solid #d6d6d6",
          padding: "0 15px",
          backgroundColor: "white",
          borderTop: "4px solid ".concat(_sharedUi.COLORS.MAIN_GREEN)
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, _react.default.createElement(Content, {
        style: {
          background: "#fff"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, _react.default.createElement(_react.Suspense, {
        fallback: _react.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 160
          },
          __self: this
        }, "..."),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      }, _react.default.createElement(_reactRouterDom.Switch, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        },
        __self: this
      }, RoutingCollection)))))))); // (
      //
      //   <Provider store={store}>
      //     <RootContainer>
      //       <LeftMenu leftMenuItems={[...refundMenuItems]} location={location}
      //                 goToLink={this.props.history.push}/>
      //       <Content>
      //         <ContentLayout
      //           contentName={"Возвраты"}
      //           breadcrumbRoutes={bcRoutes}>
      //           <Suspense fallback={<div>...</div>}>
      //             <Switch>
      //               {RoutingCollection}
      //             </Switch>
      //           </Suspense>
      //         </ContentLayout>
      //       </Content>
      //     </RootContainer>
      //   </Provider>
      // );
    }
  }]);

  return App;
}(_react.default.Component);

var _default = App;
exports.default = _default;
//# sourceMappingURL=App.js.map