require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.baseId = exports.id = undefined;
	exports.equals = equals;
	exports.is = is;
	exports.getIdChain = getIdChain;
	exports.completeAssignToThis = completeAssignToThis;
	exports.nameObj = nameObj;
	exports.nameClass = nameClass;
	
	var _getPrototypeChain = __webpack_require__(3);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	var _protoExtend = __webpack_require__(8);
	
	var _protoExtend2 = _interopRequireDefault(_protoExtend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var id = exports.id = Symbol.for('strictduck/id');
	var baseId = exports.baseId = Symbol.for('strictduck');
	
	function equals(duckA, duckB) {
	    return duckA[id] && duckB[id] && duckA[id] == duckB[id];
	}
	
	function is(_ref) {
	    var instance = _ref.instance;
	    var Class = _ref.Class;
	
	    return (0, _getPrototypeChain2.default)(instance).filter(function (p) {
	        return equals(p, Class);
	    }).length > 0;
	}
	
	function getIdChain(duck) {
	    return (0, _getPrototypeChain2.default)(duck).map(function (p) {
	        return p[id];
	    });
	}
	
	function extendFromBase(objProto, baseProto) {
	    if (Object.getPrototypeOf(objProto) == null || (0, _getPrototypeChain2.default)(baseProto).indexOf(objProto) > -1) {
	        return baseProto;
	    } else {
	        Object.setPrototypeOf(objProto, extendFromBase(objProto.__proto__, baseProto));
	        return objProto;
	    }
	}
	function extendThisFromBase(base) {
	    if (Object.getPrototypeOf(this) != null) {
	        Object.setPrototypeOf(this, extendFromBase(Object.getPrototypeOf(this), Object.getPrototypeOf(base)));
	    } else {
	        Object.setPrototypeOf(this, Object.getPrototypeOf(base));
	    }
	}
	
	function completeAssignToThis(source) {
	    extendThisFromBase.bind(this)(source);
	    var descriptors = Object.getOwnPropertyNames(source).reduce(function (descriptors, key) {
	        if (key != 'constructor') descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
	        return descriptors;
	    }, {});
	    // by default, Object.assign copies enumerable Symbols too
	    Object.getOwnPropertySymbols(source).forEach(function (sym) {
	        var descriptor = Object.getOwnPropertyDescriptor(source, sym);
	        if (descriptor.enumerable) {
	            descriptors[sym] = descriptor;
	        }
	    });
	    Object.defineProperties(this, descriptors);
	}
	
	function nameObj(_ref2) {
	    var name = _ref2.name;
	    var object = _ref2.object;
	
	    var dict = {};
	    dict[name] = object;
	    Object.defineProperty(dict[name], 'name', {
	        configurable: true, value: name
	    });
	    return dict[name];
	}
	
	function parentId(_ref3) {
	    var Class = _ref3.Class;
	
	    return (Class.prototype || {})[id] || baseId;
	}
	
	function extendParentSymbolFor(_ref4) {
	    var Class = _ref4.Class;
	    var name = _ref4.name;
	
	    var parentPath = Symbol.keyFor(parentId({ Class: Class }));
	    return Symbol.for(name ? parentPath + '.' + name : parentPath);
	}
	
	function nameClass(_ref5) {
	    var name = _ref5.name;
	    var Class = _ref5.Class;
	
	    var symbol = extendParentSymbolFor({ name: name, Class: Class });
	    Class[id] = symbol;
	    Class.prototype[id] = symbol;
	    return nameObj({ name: name, object: Class });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Main = undefined;
	exports.shouldImplement = shouldImplement;
	exports.extend = extend;
	
	var _duckface = __webpack_require__(7);
	
	var _duckface2 = _interopRequireDefault(_duckface);
	
	var _getPrototypeChain = __webpack_require__(3);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	var _utils = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function shouldImplement(_ref) {
	    var _ref$name = _ref.name;
	    var name = _ref$name === undefined ? 'strictduckInterface' : _ref$name;
	    var _ref$methods = _ref.methods;
	    var methods = _ref$methods === undefined ? [] : _ref$methods;
	
	    var face = new _duckface2.default(name, methods);
	    return function (instance) {
	        return _duckface2.default.ensureImplements(instance, face);
	    };
	}
	
	function firstToLowerCase(str) {
	    return str.substr(0, 1).toLowerCase() + str.substr(1);
	}
	
	var StrictDuck = function StrictDuck(instance) {
	    _classCallCheck(this, StrictDuck);
	
	    var copy = typeof instance == 'function' ? function () {} : new Object();
	    Object.setPrototypeOf(copy, Object.getPrototypeOf(this));
	    _utils.completeAssignToThis.bind(copy)(instance);
	
	    for (var _len = arguments.length, interfaces = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        interfaces[_key - 1] = arguments[_key];
	    }
	
	    interfaces.forEach(function (i) {
	        return typeof i == 'function' ? i(copy) : shouldImplement(i)(copy);
	    });
	    return (0, _utils.nameObj)({
	        name: firstToLowerCase(Object.getPrototypeOf(this).constructor.name),
	        object: copy
	    });
	};
	
	exports.default = StrictDuck;
	
	
	StrictDuck[_utils.id] = _utils.baseId;
	StrictDuck.prototype[_utils.id] = _utils.baseId;
	
	function extend(_ref2) {
	    var name = _ref2.name;
	    var _ref2$parent = _ref2.parent;
	    var parent = _ref2$parent === undefined ? StrictDuck : _ref2$parent;
	    var _ref2$interfaces = _ref2.interfaces;
	    var interfaces = _ref2$interfaces === undefined ? [] : _ref2$interfaces;
	    var _ref2$methods = _ref2.methods;
	    var methods = _ref2$methods === undefined ? [] : _ref2$methods;
	
	    return (0, _utils.nameClass)({
	        name: name || parent.name,
	        Class: function (_parent) {
	            _inherits(Class, _parent);
	
	            function Class(instance) {
	                var _Object$getPrototypeO;
	
	                _classCallCheck(this, Class);
	
	                for (var _len2 = arguments.length, otherInterfaces = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                    otherInterfaces[_key2 - 1] = arguments[_key2];
	                }
	
	                return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Class)).call.apply(_Object$getPrototypeO, [this, instance, { name: name, methods: methods }].concat(_toConsumableArray(interfaces), otherInterfaces)));
	            }
	
	            return Class;
	        }(parent)
	    });
	}
	
	var Main = exports.Main = extend({ name: 'Main', methods: ['main'] });

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("get-prototype-chain");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = implement;
	
	var _strictduck2 = __webpack_require__(2);
	
	var _strictduck3 = _interopRequireDefault(_strictduck2);
	
	var _utils = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function implement(_ref) {
	    var name = _ref.name;
	    var withClass = _ref.withClass;
	    var _ref$strictduck = _ref.strictduck;
	    var strictduck = _ref$strictduck === undefined ? _strictduck3.default : _ref$strictduck;
	
	    return (0, _utils.nameClass)({
	        name: name || withClass.name || strictduck.name,
	        Class: function (_strictduck) {
	            _inherits(Class, _strictduck);
	
	            function Class() {
	                _classCallCheck(this, Class);
	
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                var implementation = new (Function.prototype.bind.apply(withClass, [null].concat(args)))();
	                return _possibleConstructorReturn(this, Object.getPrototypeOf(Class).call(this, implementation));
	            }
	
	            return Class;
	        }(strictduck)
	    });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = implementable;
	function implementable(fn, defaults) {
	    return function (overrides) {
	        return fn(Object.assign({}, defaults, overrides));
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.equals = exports.id = exports.utils = exports.implementable = exports.implement = exports.default = undefined;
	
	var _strictduck = __webpack_require__(2);
	
	Object.keys(_strictduck).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _strictduck[key];
	    }
	  });
	});
	
	var _utils2 = __webpack_require__(1);
	
	Object.defineProperty(exports, 'id', {
	  enumerable: true,
	  get: function get() {
	    return _utils2.id;
	  }
	});
	Object.defineProperty(exports, 'equals', {
	  enumerable: true,
	  get: function get() {
	    return _utils2.equals;
	  }
	});
	
	var _strictduck2 = _interopRequireDefault(_strictduck);
	
	var _implement2 = __webpack_require__(4);
	
	var _implement3 = _interopRequireDefault(_implement2);
	
	var _implementable2 = __webpack_require__(5);
	
	var _implementable3 = _interopRequireDefault(_implementable2);
	
	var _utils = _interopRequireWildcard(_utils2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _strictduck2.default;
	exports.implement = _implement3.default;
	exports.implementable = _implementable3.default;
	exports.utils = _utils;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("Duckface/src/duckface");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("proto-extend");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map