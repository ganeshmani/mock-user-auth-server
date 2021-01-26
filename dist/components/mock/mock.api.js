"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mock = _interopRequireDefault(require("./mock.controller"));

var _mock2 = _interopRequireDefault(require("./mock.helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

var resHandler = function resHandler(res, code, message) {
  res.status(code).json({
    message: message
  });
}; // const responseFactory = async (req, res, message) => {
//   const token = await helper.retrieveRequestToken(req);
//   const response = await ctrl.deleteUser(token, req.body);
//   if (!response.status) return resHandler(res, 403, message.error);
//   res.status(200).json({ message: message.error });
// }


router.post('/auth', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, response, id, access_token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _mock["default"].isAuthenticated(email, password);

          case 3:
            response = _context.sent;

            if (!(!response.status || response.data === null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", resHandler(res, 401, 'Incorrect email or password'));

          case 6:
            id = response.data;
            access_token = _mock["default"].createToken({
              email: email,
              id: id
            });
            res.status(200).json({
              token: access_token
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
router.post('/users', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, name, email, password, imageUrl, response;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
            imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
            _context2.next = 4;
            return _mock["default"].postUser(name, email, password, imageUrl);

          case 4:
            response = _context2.sent;

            if (response.status) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", resHandler(res, 401, 'User already registered'));

          case 7:
            res.status(200).json({
              message: 'User registered with success',
              token: response.data
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));
router.get('/users', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var authorization, token, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            authorization = 'authorization';
            token = req.body.token || req.query.token || req.headers[authorization];
            _context3.next = 4;
            return _mock["default"].getUser(token);

          case 4:
            response = _context3.sent;

            if (!(!response.status || response.data === null)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", resHandler(res, 403, 'Unauthorized'));

          case 7:
            res.status(200).json(response.data);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));
router.patch('/users', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var token, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _mock2["default"].retrieveRequestToken(req);

          case 2:
            token = _context4.sent;
            _context4.next = 5;
            return _mock["default"].updateUser(token, req.body);

          case 5:
            response = _context4.sent;

            if (response.status) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", resHandler(res, 403, response.data));

          case 8:
            res.status(200).json({
              data: response.data,
              message: 'User updated with success!'
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()));
router["delete"]('/users', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var token, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _mock2["default"].retrieveRequestToken(req);

          case 2:
            token = _context5.sent;
            _context5.next = 5;
            return _mock["default"].deleteUser(token, req.body);

          case 5:
            response = _context5.sent;

            if (response.status) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", resHandler(res, 403, 'Unauthorized to delete'));

          case 8:
            res.status(200).json({
              message: 'User deleted with success!'
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()));
router["delete"]('/all-users', _mock2["default"].asyncMiddleware( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var key_admin;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            key_admin = req.body.key_admin;

            if (key_admin === 'keyadmin123') {
              _mock["default"].deleteAllUsers();

              resHandler(res, 200, 'Users deleted with success');
            } else {
              resHandler(res, 403, 'Unauthorized access');
            }

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()));
var _default = router;
exports["default"] = _default;