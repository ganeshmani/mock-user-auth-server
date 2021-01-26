"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mock = _interopRequireDefault(require("./mock.api"));

var _mock2 = _interopRequireDefault(require("./mock.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  api: _mock["default"],
  controller: _mock2["default"]
};
exports["default"] = _default;