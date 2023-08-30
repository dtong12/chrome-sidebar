"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _glamor = require("glamor");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iframeClass = (0, _glamor.css)({
  border: "none",
  width: "100%",
  height: "100%",
  background: "white",
  borderRadius: "8px",
  boxShadow: "-1px 1px 8px rgba(0,0,0,.15)"
});

var maskClass = (0, _glamor.css)({
  display: "none",
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  cursor: "pointer",
  zIndex: "9999"
});

var maskVisibleClass = (0, _glamor.css)({
  display: "block"
});

var containerClass = (0, _glamor.css)({
  position: "fixed",
  top: "0px",
  right: "0px",
  height: "100%",
  width: "65%",
  maxWidth: "900px",
  padding: "8px",
  boxSizing: "border-box",
  transform: "translateX(100%)",
  transition: "transform .45s cubic-bezier(0, 0, 0.3, 1)",
  zIndex: 10000
});

var containerVisibleClass = (0, _glamor.css)({
  transform: "translate3d(0,0,0)"
});

var containerMinimizedClass = (0, _glamor.css)({
  cursor: "pointer",
  transform: "translateX(94%)",
  ":hover": {
    transform: "translateX(92%)"
  },
  "& > iframe": {
    pointerEvents: "none"
  }
});

var FRAME_TOGGLE_FUNCTION = "chromeIframeSheetToggle";

var Frame = exports.Frame = function (_Component) {
  _inherits(Frame, _Component);

  function Frame() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Frame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Frame.__proto__ || Object.getPrototypeOf(Frame)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isVisible: false,
      isMinimized: false
    }, _this.onLoad = function () {
      var onLoad = _this.props.onLoad;


      onLoad({
        mask: _this.mask,
        frame: _this.frame
      });
    }, _this.onMaskClick = function () {
      _this.setState({
        isMinimized: true
      });
    }, _this.onFrameClick = function () {
      _this.setState({
        isMinimized: false
      });
    }, _this.toggleFrame = function () {
      _this.setState({
        isMinimized: !_this.state.isMinimized
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Frame, [{
    key: "render",
    value: function render() {
      var _cx,
          _this2 = this,
          _cx2,
          _cx3;

      var _state = this.state,
          isVisible = _state.isVisible,
          isMinimized = _state.isMinimized;
      var _props = this.props,
          url = _props.url,
          className = _props.className,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          containerClassName = _props.containerClassName,
          containerStyle = _props.containerStyle,
          iframeClassName = _props.iframeClassName,
          iframeStyle = _props.iframeStyle,
          children = _props.children,
          containerChildren = _props.containerChildren;


      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("div", {
          className: (0, _classnames2.default)((_cx = {}, _defineProperty(_cx, maskClass, true), _defineProperty(_cx, maskVisibleClass, !isMinimized), _defineProperty(_cx, maskClassName, true), _cx)),
          style: maskStyle,
          onClick: this.onMaskClick,
          ref: function ref(mask) {
            return _this2.mask = mask;
          }
        }),
        _react2.default.createElement(
          "div",
          {
            className: (0, _classnames2.default)((_cx2 = {}, _defineProperty(_cx2, containerClass, true), _defineProperty(_cx2, containerVisibleClass, isVisible), _defineProperty(_cx2, containerMinimizedClass, isMinimized), _defineProperty(_cx2, containerClassName, true), _cx2)),
            style: containerStyle,
            onClick: this.onFrameClick
          },
          _react2.default.createElement("iframe", {
            className: (0, _classnames2.default)((_cx3 = {}, _defineProperty(_cx3, iframeClass, true), _defineProperty(_cx3, iframeClassName, true), _cx3)),
            style: iframeStyle,
            src: url,
            ref: function ref(frame) {
              return _this2.frame = frame;
            },
            onLoad: this.onLoad
          }),
          containerChildren
        ),
        children
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var _props2 = this.props,
          delay = _props2.delay,
          onMount = _props2.onMount;


      window[FRAME_TOGGLE_FUNCTION] = this.toggleFrame;

      onMount({
        mask: this.mask,
        frame: this.frame
      });

      this._visibleRenderTimeout = setTimeout(function () {
        _this3.setState({
          isVisible: true
        });
      }, delay);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var onUnmount = this.props.onUnmount;


      onUnmount({
        mask: this.mask,
        frame: this.frame
      });

      delete window[FRAME_TOGGLE_FUNCTION];
      clearTimeout(this._visibleRenderTimeout);
    }
  }], [{
    key: "isReady",
    value: function isReady() {
      return typeof window[FRAME_TOGGLE_FUNCTION] !== "undefined";
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (window[FRAME_TOGGLE_FUNCTION]) {
        window[FRAME_TOGGLE_FUNCTION]();
      }
    }
  }]);

  return Frame;
}(_react.Component);

Frame.defaultProps = {
  url: "",
  delay: 500,
  maskClassName: "",
  maskStyle: {},
  containerClassName: "",
  containerStyle: {},
  iframeClassName: "",
  iframeStyle: {},
  onMount: function onMount() {},
  onUnmount: function onUnmount() {},
  onLoad: function onLoad() {}
};
Frame.propTypes = {
  url: _propTypes.string,
  delay: _propTypes.number,
  maskClassName: _propTypes.string,
  maskStyle: _propTypes.object,
  containerClassName: _propTypes.string,
  containerStyle: _propTypes.object,
  iframeClassName: _propTypes.string,
  iframeStyle: _propTypes.object,
  children: _propTypes.node,
  containerChildren: _propTypes.node,
  onMount: _propTypes.func,
  onUnmount: _propTypes.func,
  onLoad: _propTypes.func
};
exports.default = Frame;