"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("./config/cors.js"));

var _mock = _interopRequireDefault(require("./components/mock/mock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_cors.default);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use('/api/v1', _mock.default.api); // catch 404 and forward to error handler

app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});