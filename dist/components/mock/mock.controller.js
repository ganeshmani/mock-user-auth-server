"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _faker = _interopRequireDefault(require("faker"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SECRET_KEY = 'authsecret123';
var expiresIn = '24h';
var userdb = JSON.parse(_fs["default"].readFileSync(__dirname + '/users.json', 'UTF-8'));

var createToken = function createToken(payload) {
  return _jsonwebtoken["default"].sign(payload, SECRET_KEY, {
    expiresIn: expiresIn
  });
};

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var data, status, res_decode;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken["default"].verify(token, SECRET_KEY, function (err, decode) {
              if (err) {
                data = err.message;
                status = false;
              } else {
                res_decode = decode;
              }
            });

          case 2:
            return _context.abrupt("return", {
              data: data,
              status: status,
              res_decode: res_decode
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var deleteAllUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userdb.users = [];
            _context2.next = 3;
            return _fs["default"].writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');

          case 3:
            return _context2.abrupt("return", true);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteAllUsers() {
    return _ref2.apply(this, arguments);
  };
}();

var isAuthenticated = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email, password) {
    var id, res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = undefined;
            res = false;
            _context3.next = 4;
            return userdb.users.findIndex(function (user) {
              if (user.email === email && user.password === password) {
                id = user.id;
                res = true;
              }
            });

          case 4:
            return _context3.abrupt("return", {
              data: id,
              status: res
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isAuthenticated(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var postUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name, email, password, imageUrl) {
    var exist, id, newUser, token;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            exist = false;
            _context4.next = 3;
            return userdb.users.findIndex(function (user) {
              if (user.email === email) {
                exist = true;
              }
            });

          case 3:
            if (exist) {
              _context4.next = 17;
              break;
            }

            _context4.next = 6;
            return _faker["default"].random.number();

          case 6:
            id = _context4.sent;
            newUser = {
              id: id,
              name: name,
              email: email,
              password: password,
              imageUrl: imageUrl
            };
            _context4.next = 10;
            return userdb.users.push(newUser);

          case 10:
            _fs["default"].writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');

            _context4.next = 13;
            return createToken(newUser);

          case 13:
            token = _context4.sent;
            return _context4.abrupt("return", {
              data: token,
              status: true
            });

          case 17:
            return _context4.abrupt("return", {
              data: undefined,
              status: false
            });

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postUser(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var getUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(token) {
    var _yield$verifyToken, data, res_decode, status;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return verifyToken(token);

          case 2:
            _yield$verifyToken = _context5.sent;
            data = _yield$verifyToken.data;
            res_decode = _yield$verifyToken.res_decode;
            status = _yield$verifyToken.status;

            if (!res_decode) {
              _context5.next = 9;
              break;
            }

            _context5.next = 9;
            return userdb.users.findIndex(function (user) {
              if (user.email === res_decode.email && user.id === res_decode.id) {
                data = user;
                status = true;
              }
            });

          case 9:
            return _context5.abrupt("return", {
              data: data,
              status: status
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getUser(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

var updateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(token, body) {
    var _yield$verifyToken2, data, res_decode, status;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return verifyToken(token);

          case 2:
            _yield$verifyToken2 = _context6.sent;
            data = _yield$verifyToken2.data;
            res_decode = _yield$verifyToken2.res_decode;
            status = _yield$verifyToken2.status;

            if (!res_decode) {
              _context6.next = 10;
              break;
            }

            _context6.next = 9;
            return userdb.users.findIndex(function (user) {
              if (user.email === res_decode.email && user.id === res_decode.id) {
                user.name = body.name ? body.name : user.name;
                user.email = body.email ? body.email : user.email;
                user.password = body.password ? body.password : user.password;
                user.imageUrl = body.imageUrl ? body.imageUrl : user.imageUrl;
                data = user;
                status = true;
              }
            });

          case 9:
            _fs["default"].writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');

          case 10:
            return _context6.abrupt("return", {
              data: data,
              status: status
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateUser(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(token) {
    var _yield$verifyToken3, res_decode, status;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return verifyToken(token);

          case 2:
            _yield$verifyToken3 = _context7.sent;
            res_decode = _yield$verifyToken3.res_decode;
            status = _yield$verifyToken3.status;

            if (!res_decode) {
              _context7.next = 9;
              break;
            }

            _context7.next = 8;
            return userdb.users.findIndex(function (user, index) {
              if (user.email === res_decode.email && user.id === res_decode.id) {
                userdb.users.splice(index, 1);
                status = true;
              }
            });

          case 8:
            _fs["default"].writeFileSync(__dirname + '/users.json', JSON.stringify(userdb, null, 2), 'utf8');

          case 9:
            return _context7.abrupt("return", {
              status: status
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteUser(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  createToken: createToken,
  isAuthenticated: isAuthenticated,
  postUser: postUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  deleteAllUsers: deleteAllUsers
};
exports["default"] = _default;