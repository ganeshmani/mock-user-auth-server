"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mock = _interopRequireDefault(require("./mock.controller"));

var _mock2 = _interopRequireDefault(require("./mock.helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const resHandler = (res, code, message) => {
  res.status(code).json({
    message: message
  });
}; // const responseFactory = async (req, res, message) => {
//   const token = await helper.retrieveRequestToken(req);
//   const response = await ctrl.deleteUser(token, req.body);
//   if (!response.status) return resHandler(res, 403, message.error);
//   res.status(200).json({ message: message.error });
// }


router.post('/auth', _mock2.default.asyncMiddleware(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const response = await _mock.default.isAuthenticated(email, password);
  if (!response.status || response.data === null) return resHandler(res, 401, 'Incorrect email or password');
  const id = response.data;

  const access_token = _mock.default.createToken({
    email,
    id
  });

  res.status(200).json({
    token: access_token,
    user: response.user
  });
}));
router.post('/users', _mock2.default.asyncMiddleware(async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const imageUrl = 'https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg';
  const response = await _mock.default.postUser(name, email, password, imageUrl);
  if (!response.status) return resHandler(res, 401, 'User already registered');
  res.status(200).json({
    message: 'User registered with success',
    token: response.data,
    user: response.user
  });
}));
router.get('/users', _mock2.default.asyncMiddleware(async (req, res) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  const response = await _mock.default.getUser(token);
  if (!response.status || response.data === null) return resHandler(res, 403, 'Unauthorized');
  res.status(200).json(response.data);
}));
router.patch('/users', _mock2.default.asyncMiddleware(async (req, res) => {
  const token = await _mock2.default.retrieveRequestToken(req);
  const response = await _mock.default.updateUser(token, req.body);
  if (!response.status) return resHandler(res, 403, response.data);
  res.status(200).json({
    data: response.data,
    message: 'User updated with success!'
  });
}));
router.delete('/users', _mock2.default.asyncMiddleware(async (req, res) => {
  const token = await _mock2.default.retrieveRequestToken(req);
  const response = await _mock.default.deleteUser(token, req.body);
  if (!response.status) return resHandler(res, 403, 'Unauthorized to delete');
  res.status(200).json({
    message: 'User deleted with success!'
  });
}));
router.delete('/all-users', _mock2.default.asyncMiddleware(async (req, res) => {
  const {
    key_admin
  } = req.body;

  if (key_admin === 'keyadmin123') {
    _mock.default.deleteAllUsers();

    resHandler(res, 200, 'Users deleted with success');
  } else {
    resHandler(res, 403, 'Unauthorized access');
  }
}));
var _default = router;
exports.default = _default;