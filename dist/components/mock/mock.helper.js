"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const retrieveRequestToken = async req => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  return token;
};

var _default = {
  asyncMiddleware,
  retrieveRequestToken
};
exports.default = _default;