"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rootSaga;

var _effects = require("redux-saga/effects");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watchSearchForCash),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(watchBootlegging),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watchGraffiti),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

function watchSearchForCash() {
  return regeneratorRuntime.wrap(function watchSearchForCash$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.takeEvery)("watchSearchForCash", function () {
            console.log("watchSearchForCash");
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function watchBootlegging() {
  return regeneratorRuntime.wrap(function watchBootlegging$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)("watchBootlegging", function () {
            console.log("watchBootlegging");
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function watchGraffiti() {
  return regeneratorRuntime.wrap(function watchGraffiti$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)("watchGraffiti", function () {
            console.log("watchGraffiti");
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchSearchForCash), (0, _effects.fork)(watchBootlegging), (0, _effects.fork)(watchGraffiti)]);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}
//# sourceMappingURL=rootSaga.js.map