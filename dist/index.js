"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _frame = require("./frame");

Object.keys(_frame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _frame[key];
    }
  });
});

var _attach = require("./attach");

Object.keys(_attach).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _attach[key];
    }
  });
});

var _frame2 = _interopRequireDefault(_frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _frame2.default;