/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/src/backend.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue/dist/vue.js":
/*!**************************************!*\
  !*** ./node_modules/vue/dist/vue.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

  /*  */

  var emptyObject = Object.freeze({});

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive.
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array.
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }

    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };

  /**
   * Generate a string containing static keys from compiler modules.
   */
  function genStaticKeys (modules) {
    return modules.reduce(function (keys, m) {
      return keys.concat(m.staticKeys || [])
    }, []).join(',')
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */



  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /*  */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = ({}).watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      })); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  var _Set;
  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };

      return Set;
    }());
  }

  /*  */

  var warn = noop;
  var tip = noop;
  var generateComponentTrace = (noop); // work around flow check
  var formatComponentName = (noop);

  {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
      .replace(classifyRE, function (c) { return c.toUpperCase(); })
      .replace(/[-_]/g, ''); };

    warn = function (msg, vm) {
      var trace = vm ? generateComponentTrace(vm) : '';

      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole && (!config.silent)) {
        console.error(("[Vue warn]: " + msg + trace));
      }
    };

    tip = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + (
          vm ? generateComponentTrace(vm) : ''
        ));
      }
    };

    formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      var options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
          ? vm.$options || vm.constructor.options
          : vm;
      var name = options.name || options._componentTag;
      var file = options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }

      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
      )
    };

    var repeat = function (str, n) {
      var res = '';
      while (n) {
        if (n % 2 === 1) { res += str; }
        if (n > 1) { str += str; }
        n >>= 1;
      }
      return res
    };

    generateComponentTrace = function (vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
          .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
              ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
              : formatComponentName(vm))); })
          .join('\n')
      } else {
        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
      }
    };
  }

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    if (!config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort(function (a, b) { return a.id - b.id; });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }

  /*  */

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: { configurable: true } };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };

  Object.defineProperties( VNode.prototype, prototypeAccessors );

  var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
  };

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (isUndef(target) || isPrimitive(target)
    ) {
      warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      );
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (isUndef(target) || isPrimitive(target)
    ) {
      warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid deleting properties on a Vue instance or its root $data ' +
        '- just set it to null.'
      );
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Options with restrictions
   */
  {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        );
      }
      return defaultStrat(parent, child)
    };
  }

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }

  /**
   * Data
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        warn(
          'The "data" option should be a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        );

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      assertObjectType(key, childVal, vm);
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && "development" !== 'production') {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  /**
   * Validate component names
   */
  function checkComponents (options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }

  function validateComponentName (name) {
    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
      warn(
        'Invalid component name: "' + name + '". Component names ' +
        'should conform to valid custom element name in html5 specification.'
      );
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + name
      );
    }
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        } else {
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    } else {
      warn(
        "Invalid value for option \"props\": expected an Array or an Object, " +
        "but got " + (toRawType(props)) + ".",
        vm
      );
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    } else {
      warn(
        "Invalid value for option \"inject\": expected an Array or an Object, " +
        "but got " + (toRawType(inject)) + ".",
        vm
      );
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        "Invalid value for option \"" + name + "\": expected an Object, " +
        "but got " + (toRawType(value)) + ".",
        vm
      );
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {
    {
      checkComponents(child);
    }

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      );
    }
    return res
  }

  /*  */



  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        // only cast empty string / same name to boolean if
        // boolean has higher priority
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    {
      assertProp(prop, key, value, vm, absent);
    }
    return value
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (isObject(def)) {
      warn(
        'Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm
      );
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  /**
   * Assert whether a prop is valid.
   */
  function assertProp (
    prop,
    name,
    value,
    vm,
    absent
  ) {
    if (prop.required && absent) {
      warn(
        'Missing required prop: "' + name + '"',
        vm
      );
      return
    }
    if (value == null && !prop.required) {
      return
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }

    if (!valid) {
      warn(
        getInvalidTypeMessage(name, value, expectedTypes),
        vm
      );
      return
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn(
          'Invalid prop: custom validator check failed for prop "' + name + '".',
          vm
        );
      }
    }
  }

  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

  function assertType (value, type) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      // for primitive wrapper objects
      if (!valid && t === 'object') {
        valid = value instanceof type;
      }
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    }
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  function getInvalidTypeMessage (name, value, expectedTypes) {
    var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', '));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue(value, expectedType);
    var receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
      message += " with value " + expectedValue;
    }
    message += ", got " + receivedType + " ";
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
      message += "with value " + receivedValue + ".";
    }
    return message
  }

  function styleValue (value, type) {
    if (type === 'String') {
      return ("\"" + value + "\"")
    } else if (type === 'Number') {
      return ("" + (Number(value)))
    } else {
      return ("" + value)
    }
  }

  function isExplicable (value) {
    var explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
  }

  function isBoolean () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
  }

  /*  */

  function handleError (err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while ((cur = cur.$parent)) {
          var hooks = cur.$options.errorCaptured;
          if (hooks) {
            for (var i = 0; i < hooks.length; i++) {
              try {
                var capture = hooks[i].call(cur, err, vm, info) === false;
                if (capture) { return }
              } catch (e) {
                globalHandleError(e, cur, 'errorCaptured hook');
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
        // issue #9511
        // avoid catch triggering multiple times when nested calls
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        // if the user intentionally throws the original error in the handler,
        // do not log it twice
        if (e !== err) {
          logError(e, null, 'config.errorHandler');
        }
      }
    }
    logError(err, vm, info);
  }

  function logError (err, vm, info) {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }

  /*  */

  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;

  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      // In problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  /*  */

  var mark;
  var measure;

  {
    var perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = function (tag) { return perf.mark(tag); };
      measure = function (name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
        // perf.clearMeasures(name)
      };
    }
  }

  /* not type checking this file because flow doesn't play well with Proxy */

  var initProxy;

  {
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );

    var warnNonPresent = function (target, key) {
      warn(
        "Property or method \"" + key + "\" is not defined on the instance but " +
        'referenced during render. Make sure that this property is reactive, ' +
        'either in the data option, or for class-based components, by ' +
        'initializing the property. ' +
        'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
        target
      );
    };

    var warnReservedPrefix = function (target, key) {
      warn(
        "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
        'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
        'prevent conflicts with Vue internals. ' +
        'See: https://vuejs.org/v2/api/#data',
        target
      );
    };

    var hasProxy =
      typeof Proxy !== 'undefined' && isNative(Proxy);

    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set (target, key, value) {
          if (isBuiltInModifier(key)) {
            warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });
    }

    var hasHandler = {
      has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
        if (!has && !isAllowed) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
      }
    };

    var getHandler = {
      get: function get (target, key) {
        if (typeof key === 'string' && !(key in target)) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return target[key]
      }
    };

    initProxy = function initProxy (vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }

  /*  */

  var seenObjects = new _Set();

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }

  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    }
  });

  function createFnInvoker (fns, vm) {
    function invoker () {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        // return handler return value for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
      }
    }
    invoker.fns = fns;
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        warn(
          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
          vm
        );
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
        }
        add(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData (
    data,
    Ctor,
    tag
  ) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        {
          var keyInLowerCase = key.toLowerCase();
          if (
            key !== keyInLowerCase &&
            attrs && hasOwn(attrs, keyInLowerCase)
          ) {
            tip(
              "Prop \"" + keyInLowerCase + "\" is passed to component " +
              (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
              " \"" + key + "\". " +
              "Note that HTML attributes are case-insensitive and camelCased " +
              "props need to use their kebab-case equivalents when using in-DOM " +
              "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
            );
          }
        }
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) &&
            isDef(c.tag) &&
            isUndef(c.key) &&
            isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }

  /*  */

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key], function () {
            warn(
              "Avoid mutating an injected value directly since the changes will be " +
              "overwritten whenever the provided component re-renders. " +
              "injection being mutated: \"" + key + "\"",
              vm
            );
          });
        }
      });
      toggleObserving(true);
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // #6574 in case the inject object is observed...
        if (key === '__ob__') { continue }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break
          }
          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault;
          } else {
            warn(("Injection \"" + key + "\" not found"), vm);
          }
        }
      }
      return result
    }
  }

  /*  */



  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }

  /*  */

  function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
  ) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      // fast path 1: child component re-render only, parent did not change
      return slots._normalized
    } else if (
      isStable &&
      prevSlots &&
      prevSlots !== emptyObject &&
      key === prevSlots.$key &&
      !hasNormalSlots &&
      !prevSlots.$hasNormal
    ) {
      // fast path 2: stable scoped slots w/ no normal slots to proxy,
      // only need to normalize once
      return prevSlots
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== '$') {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
      (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
  }

  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === 'object' && !Array.isArray(res)
        ? [res] // single vnode
        : normalizeChildren(res);
      return res && (
        res.length === 0 ||
        (res.length === 1 && res[0].isComment) // #9658
      ) ? undefined
        : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized
  }

  function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        if (!isObject(bindObject)) {
          warn(
            'slot v-bind without argument expects an Object',
            this
          );
        }
        props = extend(extend({}, bindObject), props);
      }
      nodes = scopedSlotFn(props) || fallback;
    } else {
      nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  }

  /*  */

  function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1
    } else {
      return expect !== actual
    }
  }

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInKeyCode,
    eventKeyName,
    builtInKeyName
  ) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName)
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp,
    isSync
  ) {
    if (value) {
      if (!isObject(value)) {
        warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function ( key ) {
          if (
            key === 'class' ||
            key === 'style' ||
            isReservedAttribute(key)
          ) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key);
          var hyphenatedKey = hyphenate(key);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on[("update:" + key)] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) loop( key );
      }
    }
    return data
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
      return tree
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
      this._renderProxy,
      null,
      this // for render fns generated for functional component templates
    );
    markStatic(tree, ("__static__" + index), false);
    return tree
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }

  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners (data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        warn(
          'v-on without argument expects an Object value',
          this
        );
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data
  }

  /*  */

  function resolveScopedSlots (
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
  ) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      (res).$key = contentHashKey;
    }
    return res
  }

  /*  */

  function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === 'string' && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (key !== '' && key !== null) {
        // null is a special value for explicitly removing a binding
        warn(
          ("Invalid value for dynamic directive argument (expected string or null): " + key),
          this
        );
      }
    }
    return baseObj
  }

  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
  }

  /*  */

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  /*  */

  function FunctionalRenderContext (
    data,
    props,
    children,
    parent,
    Ctor
  ) {
    var this$1 = this;

    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
      contextVm = Object.create(parent);
      // $flow-disable-line
      contextVm._original = parent;
    } else {
      // the context vm passed in is a functional context as well.
      // in this case we want to make sure we are able to get a hold to the
      // real context instance.
      contextVm = parent;
      // $flow-disable-line
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      if (!this$1.$slots) {
        normalizeScopedSlots(
          data.scopedSlots,
          this$1.$slots = resolveSlots(children, parent)
        );
      }
      return this$1.$slots
    };

    Object.defineProperty(this, 'scopedSlots', ({
      enumerable: true,
      get: function get () {
        return normalizeScopedSlots(data.scopedSlots, this.slots())
      }
    }));

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode
      };
    } else {
      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    contextVm,
    children
  ) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
      if (isDef(data.props)) { mergeProps(props, data.props); }
    }

    var renderContext = new FunctionalRenderContext(
      data,
      props,
      children,
      contextVm,
      Ctor
    );

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res
    }
  }

  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    {
      (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone
  }

  function mergeProps (to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  /*  */

  /*  */

  /*  */

  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },

    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },

    insert: function insert (vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy (vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (isUndef(Ctor)) {
      return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      {
        warn(("Invalid Component definition: " + (String(Ctor))), context);
      }
      return
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
      asyncFactory
    );

    return vnode
  }

  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
  }

  function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
      // flow complains about extra args which is why we use any
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (
        Array.isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (isDef(data) && isDef((data).__ob__)) {
      warn(
        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
        'Always create fresh vnode data objects in each render!',
        context
      );
      return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // warn against non-primitive key
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    ) {
      {
        warn(
          'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
          context
        );
      }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        if (isDef(data) && isDef(data.nativeOn)) {
          warn(
            ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
            context
          );
        }
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(vnode, ns); }
      if (isDef(data)) { registerDeepBindings(data); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }

  function applyNS (vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (
          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings (data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }

  /*  */

  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    }
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;

      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        // There's no need to maintain a stack because all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      // if the returned array contains only a single node, allow it
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        if (Array.isArray(vnode)) {
          warn(
            'Multiple root nodes returned from render function. Render function ' +
            'should return a single root node.',
            vm
          );
        }
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  /*  */

  function ensureCtor (comp, base) {
    if (
      comp.__esModule ||
      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
      comp = comp.default;
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
  }

  function createAsyncPlaceholder (
    factory,
    data,
    context,
    children,
    tag
  ) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node
  }

  function resolveAsyncComponent (
    factory,
    baseCtor
  ) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp
    }

    if (isDef(factory.resolved)) {
      return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      // already pending
      factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null

      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

      var forceRender = function (renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          (owners[i]).$forceUpdate();
        }

        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });

      var reject = once(function (reason) {
        warn(
          "Failed to resolve async component: " + (String(factory)) +
          (reason ? ("\nReason: " + reason) : '')
        );
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (isPromise(res)) {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function () {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function () {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(
                  "timeout (" + (res.timeout) + "ms)"
                );
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
  }

  /*  */

  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }

  /*  */

  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add (event, fn) {
    target.$on(event, fn);
  }

  function remove$1 (event, fn) {
    target.$off(event, fn);
  }

  function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    }
  }

  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
  }

  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip(
            "Event \"" + lowerCaseEvent + "\" is emitted in component " +
            (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
            "Note that HTML attributes are case-insensitive and you cannot use " +
            "v-on to listen to camelCase events when using in-DOM templates. " +
            "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
          );
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm
    };
  }

  /*  */

  var activeInstance = null;
  var isUpdatingChildComponent = false;

  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'compiler is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    if (config.performance && mark) {
      updateComponent = function () {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;

        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure(("vue " + name + " render"), startTag, endTag);

        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure(("vue " + name + " patch"), startTag, endTag);
      };
    } else {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }

  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    {
      isUpdatingChildComponent = true;
    }

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(
      (newScopedSlots && !newScopedSlots.$stable) ||
      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props; // wtf flow?
        props[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }

    {
      isUpdatingChildComponent = false;
    }
  }

  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }

  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }

  /*  */

  var MAX_UPDATE_COUNT = 100;

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    {
      circular = {};
    }
    waiting = flushing = false;
  }

  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;

  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;

  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      // if the event timestamp, although evaluated AFTER the Date.now(), is
      // smaller than it, it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listener timestamps as
      // well.
      getNow = function () { return performance.now(); };
    }
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn(
            'You may have an infinite update loop ' + (
              watcher.user
                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                : "in a component render function."
            ),
            watcher.vm
          );
          break
        }
      }
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent (vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;

        if (!config.async) {
          flushSchedulerQueue();
          return
        }
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */



  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = expOrFn.toString();
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        warn(
          "Failed watching path: \"" + expOrFn + "\" " +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        );
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        var hyphenatedKey = hyphenate(key);
        if (isReservedAttribute(hyphenatedKey) ||
            config.isReservedAttr(hyphenatedKey)) {
          warn(
            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(props, key, value, function () {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop( key );
    toggleObserving(true);
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    // $flow-disable-line
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if (getter == null) {
        warn(
          ("Getter is missing for computed property \"" + key + "\"."),
          vm
        );
      }

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else {
        if (key in vm.$data) {
          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
        }
      }
    }
  }

  function defineComputed (
    target,
    key,
    userDef
  ) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function () {
        warn(
          ("Computed property \"" + key + "\" was assigned to but it has no setter."),
          this
        );
      };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    {
      dataDef.set = function () {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        );
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        try {
          cb.call(vm, watcher.value);
        } catch (error) {
          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  /*  */

  var uid$3 = 0;

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$3++;

      var startTag, endTag;
      /* istanbul ignore if */
      if (config.performance && mark) {
        startTag = "vue-perf-start:" + (vm._uid);
        endTag = "vue-perf-end:" + (vm._uid);
        mark(startTag);
      }

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      {
        initProxy(vm);
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      /* istanbul ignore if */
      if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(("vue " + (vm._name) + " init"), startTag, endTag);
      }

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }

  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = latest[key];
      }
    }
    return modified
  }

  function Vue (options) {
    if (!(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /*  */

  function initUse (Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this
    };
  }

  /*  */

  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this
    };
  }

  /*  */

  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;
      if (name) {
        validateComponentName(name);
      }

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }

  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          /* istanbul ignore if */
          if (type === 'component') {
            validateComponentName(id);
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }

  /*  */



  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }

  function matches (pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }

  function pruneCache (keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;

      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },

    render: function render () {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }
      return vnode || (slot && slot[0])
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    {
      configDef.set = function () {
        warn(
          'Do not replace the Vue.config object, set individual fields instead.'
        );
      };
    }
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext
    }
  });

  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '2.6.12';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

  var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
      ? 'false'
      // allow arbitrary string value for contenteditable
      : key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true'
  };

  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };

  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };

  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };

  /*  */

  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode && parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class)
  }

  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class)
        ? [child.class, parent.class]
        : parent.class
    }
  }

  function renderClass (
    staticClass,
    dynamicClass
  ) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }

  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }

  function stringifyClass (value) {
    if (Array.isArray(value)) {
      return stringifyArray(value)
    }
    if (isObject(value)) {
      return stringifyObject(value)
    }
    if (typeof value === 'string') {
      return value
    }
    /* istanbul ignore next */
    return ''
  }

  function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) { res += ' '; }
        res += stringified;
      }
    }
    return res
  }

  function stringifyObject (value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) { res += ' '; }
        res += key;
      }
    }
    return res
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isPreTag = function (tag) { return tag === 'pre'; };

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        warn(
          'Cannot find element: ' + el
        );
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  /*  */

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }

  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function createComment (text) {
    return document.createComment(text)
  }

  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function tagName (node) {
    return node.tagName
  }

  function setTextContent (node, text) {
    node.textContent = text;
  }

  function setStyleScope (node, scopeId) {
    node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  /*  */

  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode (a, b) {
    return (
      a.key === b.key && (
        (
          a.tag === b.tag &&
          a.isComment === b.isComment &&
          isDef(a.data) === isDef(b.data) &&
          sameInputType(a, b)
        ) || (
          isTrue(a.isAsyncPlaceholder) &&
          a.asyncFactory === b.asyncFactory &&
          isUndef(b.asyncFactory.error)
        )
      )
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }

  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function isUnknownElement$$1 (vnode, inVPre) {
      return (
        !inVPre &&
        !vnode.ns &&
        !(
          config.ignoredElements.length &&
          config.ignoredElements.some(function (ignore) {
            return isRegExp(ignore)
              ? ignore.test(vnode.tag)
              : ignore === vnode.tag
          })
        ) &&
        config.isUnknownElement(vnode.tag)
      )
    }

    var creatingElmInVPre = 0;

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it's used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it's used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
            warn(
              'Unknown custom element: <' + tag + '> - did you ' +
              'register the component correctly? For recursive components, ' +
              'make sure to provide the "name" option.',
              vnode.context
            );
          }
        }

        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }

        if (data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }

    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps.parentNode(ref$$1) === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        {
          checkDuplicateKeys(children);
        }
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        nodeOps.setStyleScope(vnode.elm, i);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes (vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      {
        checkDuplicateKeys(newCh);
      }

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key)
            ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function checkDuplicateKeys (children) {
      var seenKeys = {};
      for (var i = 0; i < children.length; i++) {
        var vnode = children[i];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn(
              ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
              vnode.context
            );
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }

    function findIdxInOld (node, oldCh, start, end) {
      for (var i = start; i < end; i++) {
        var c = oldCh[i];
        if (isDef(c) && sameVnode(node, c)) { return i }
      }
    }

    function patchVnode (
      oldVnode,
      vnode,
      insertedVnodeQueue,
      ownerArray,
      index,
      removeOnly
    ) {
      if (oldVnode === vnode) {
        return
      }

      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // clone reused vnode
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
      ) {
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }

    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }

    var hydrationBailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || (data && data.pre);
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true
      }
      // assert node match
      {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false
        }
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {
                /* istanbul ignore if */
                if (typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('server innerHTML: ', i);
                  console.warn('client innerHTML: ', elm.innerHTML);
                }
                return false
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break
                }
                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {
                /* istanbul ignore if */
                if (typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                }
                return false
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
          if (!fullInvoke && data['class']) {
            // ensure collecting deps for deep class bindings for future updates
            traverse(data['class']);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }

    function assertNodeMatch (node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf('vue-component') === 0 || (
          !isUnknownElement$$1(vnode, inVPre) &&
          vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
        )
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3)
      }
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              } else {
                warn(
                  'The client-side rendered virtual DOM tree is not matching ' +
                  'server-rendered content. This is likely caused by incorrect ' +
                  'HTML markup, for example nesting block-level elements inside ' +
                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
                  'full client-side render.'
                );
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);

          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );

          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var insert = ancestor.data.hook.insert;
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                    insert.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      // $flow-disable-line
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        // $flow-disable-line
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    // $flow-disable-line
    return res
  }

  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }

  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
      }
    }
  }

  var baseModules = [
    ref,
    directives
  ];

  /*  */

  function updateAttrs (oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
          ? 'true'
          : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }

  function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && value !== '' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
      isUndef(data.staticClass) &&
      isUndef(data.class) && (
        isUndef(oldData) || (
          isUndef(oldData.staticClass) &&
          isUndef(oldData.class)
        )
      )
    ) {
      return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  var validDivisionCharRE = /[\w).+\-_$\]]/;

  function parseFilters (exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var lastFilterIndex = 0;
    var c, prev, i, expression, filters;

    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
      } else if (inDouble) {
        if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
      } else if (inTemplateString) {
        if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
      } else if (inRegex) {
        if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
      } else if (
        c === 0x7C && // pipe
        exp.charCodeAt(i + 1) !== 0x7C &&
        exp.charCodeAt(i - 1) !== 0x7C &&
        !curly && !square && !paren
      ) {
        if (expression === undefined) {
          // first filter, end of expression
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 0x22: inDouble = true; break         // "
          case 0x27: inSingle = true; break         // '
          case 0x60: inTemplateString = true; break // `
          case 0x28: paren++; break                 // (
          case 0x29: paren--; break                 // )
          case 0x5B: square++; break                // [
          case 0x5D: square--; break                // ]
          case 0x7B: curly++; break                 // {
          case 0x7D: curly--; break                 // }
        }
        if (c === 0x2f) { // /
          var j = i - 1;
          var p = (void 0);
          // find first non-whitespace prev char
          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== ' ') { break }
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }

    if (expression === undefined) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }

    function pushFilter () {
      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }

    if (filters) {
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i]);
      }
    }

    return expression
  }

  function wrapFilter (exp, filter) {
    var i = filter.indexOf('(');
    if (i < 0) {
      // _f: resolveFilter
      return ("_f(\"" + filter + "\")(" + exp + ")")
    } else {
      var name = filter.slice(0, i);
      var args = filter.slice(i + 1);
      return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
    }
  }

  /*  */



  /* eslint-disable no-unused-vars */
  function baseWarn (msg, range) {
    console.error(("[Vue compiler]: " + msg));
  }
  /* eslint-enable no-unused-vars */

  function pluckModuleFunction (
    modules,
    key
  ) {
    return modules
      ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
      : []
  }

  function addProp (el, name, value, range, dynamic) {
    (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
    el.plain = false;
  }

  function addAttr (el, name, value, range, dynamic) {
    var attrs = dynamic
      ? (el.dynamicAttrs || (el.dynamicAttrs = []))
      : (el.attrs || (el.attrs = []));
    attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
    el.plain = false;
  }

  // add a raw attr (use this in preTransforms)
  function addRawAttr (el, name, value, range) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
  }

  function addDirective (
    el,
    name,
    rawName,
    value,
    arg,
    isDynamicArg,
    modifiers,
    range
  ) {
    (el.directives || (el.directives = [])).push(rangeSetItem({
      name: name,
      rawName: rawName,
      value: value,
      arg: arg,
      isDynamicArg: isDynamicArg,
      modifiers: modifiers
    }, range));
    el.plain = false;
  }

  function prependModifierMarker (symbol, name, dynamic) {
    return dynamic
      ? ("_p(" + name + ",\"" + symbol + "\")")
      : symbol + name // mark the event as captured
  }

  function addHandler (
    el,
    name,
    value,
    modifiers,
    important,
    warn,
    range,
    dynamic
  ) {
    modifiers = modifiers || emptyObject;
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if (
      warn &&
      modifiers.prevent && modifiers.passive
    ) {
      warn(
        'passive and prevent can\'t be used together. ' +
        'Passive handler can\'t prevent default event.',
        range
      );
    }

    // normalize click.right and click.middle since they don't actually fire
    // this is technically browser-specific, but at least for now browsers are
    // the only target envs that have right/middle clicks.
    if (modifiers.right) {
      if (dynamic) {
        name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
      } else if (name === 'click') {
        name = 'contextmenu';
        delete modifiers.right;
      }
    } else if (modifiers.middle) {
      if (dynamic) {
        name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
      } else if (name === 'click') {
        name = 'mouseup';
      }
    }

    // check capture modifier
    if (modifiers.capture) {
      delete modifiers.capture;
      name = prependModifierMarker('!', name, dynamic);
    }
    if (modifiers.once) {
      delete modifiers.once;
      name = prependModifierMarker('~', name, dynamic);
    }
    /* istanbul ignore if */
    if (modifiers.passive) {
      delete modifiers.passive;
      name = prependModifierMarker('&', name, dynamic);
    }

    var events;
    if (modifiers.native) {
      delete modifiers.native;
      events = el.nativeEvents || (el.nativeEvents = {});
    } else {
      events = el.events || (el.events = {});
    }

    var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
    if (modifiers !== emptyObject) {
      newHandler.modifiers = modifiers;
    }

    var handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
      events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
      events[name] = newHandler;
    }

    el.plain = false;
  }

  function getRawBindingAttr (
    el,
    name
  ) {
    return el.rawAttrsMap[':' + name] ||
      el.rawAttrsMap['v-bind:' + name] ||
      el.rawAttrsMap[name]
  }

  function getBindingAttr (
    el,
    name,
    getStatic
  ) {
    var dynamicValue =
      getAndRemoveAttr(el, ':' + name) ||
      getAndRemoveAttr(el, 'v-bind:' + name);
    if (dynamicValue != null) {
      return parseFilters(dynamicValue)
    } else if (getStatic !== false) {
      var staticValue = getAndRemoveAttr(el, name);
      if (staticValue != null) {
        return JSON.stringify(staticValue)
      }
    }
  }

  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.
  function getAndRemoveAttr (
    el,
    name,
    removeFromMap
  ) {
    var val;
    if ((val = el.attrsMap[name]) != null) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].name === name) {
          list.splice(i, 1);
          break
        }
      }
    }
    if (removeFromMap) {
      delete el.attrsMap[name];
    }
    return val
  }

  function getAndRemoveAttrByRegex (
    el,
    name
  ) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      var attr = list[i];
      if (name.test(attr.name)) {
        list.splice(i, 1);
        return attr
      }
    }
  }

  function rangeSetItem (
    item,
    range
  ) {
    if (range) {
      if (range.start != null) {
        item.start = range.start;
      }
      if (range.end != null) {
        item.end = range.end;
      }
    }
    return item
  }

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */
  function genComponentModel (
    el,
    value,
    modifiers
  ) {
    var ref = modifiers || {};
    var number = ref.number;
    var trim = ref.trim;

    var baseValueExpression = '$$v';
    var valueExpression = baseValueExpression;
    if (trim) {
      valueExpression =
        "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }
    var assignment = genAssignmentCode(value, valueExpression);

    el.model = {
      value: ("(" + value + ")"),
      expression: JSON.stringify(value),
      callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
    };
  }

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  function genAssignmentCode (
    value,
    assignment
  ) {
    var res = parseModel(value);
    if (res.key === null) {
      return (value + "=" + assignment)
    } else {
      return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
    }
  }

  /**
   * Parse a v-model expression into a base path and a final key segment.
   * Handles both dot-path and possible square brackets.
   *
   * Possible cases:
   *
   * - test
   * - test[key]
   * - test[test1[key]]
   * - test["a"][key]
   * - xxx.test[a[a].test1[key]]
   * - test.xxx.a["asa"][test1[key]]
   *
   */

  var len, str, chr, index$1, expressionPos, expressionEndPos;



  function parseModel (val) {
    // Fix https://github.com/vuejs/vue/pull/7730
    // allow v-model="obj.val " (trailing whitespace)
    val = val.trim();
    len = val.length;

    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
      index$1 = val.lastIndexOf('.');
      if (index$1 > -1) {
        return {
          exp: val.slice(0, index$1),
          key: '"' + val.slice(index$1 + 1) + '"'
        }
      } else {
        return {
          exp: val,
          key: null
        }
      }
    }

    str = val;
    index$1 = expressionPos = expressionEndPos = 0;

    while (!eof()) {
      chr = next();
      /* istanbul ignore if */
      if (isStringStart(chr)) {
        parseString(chr);
      } else if (chr === 0x5B) {
        parseBracket(chr);
      }
    }

    return {
      exp: val.slice(0, expressionPos),
      key: val.slice(expressionPos + 1, expressionEndPos)
    }
  }

  function next () {
    return str.charCodeAt(++index$1)
  }

  function eof () {
    return index$1 >= len
  }

  function isStringStart (chr) {
    return chr === 0x22 || chr === 0x27
  }

  function parseBracket (chr) {
    var inBracket = 1;
    expressionPos = index$1;
    while (!eof()) {
      chr = next();
      if (isStringStart(chr)) {
        parseString(chr);
        continue
      }
      if (chr === 0x5B) { inBracket++; }
      if (chr === 0x5D) { inBracket--; }
      if (inBracket === 0) {
        expressionEndPos = index$1;
        break
      }
    }
  }

  function parseString (chr) {
    var stringQuote = chr;
    while (!eof()) {
      chr = next();
      if (chr === stringQuote) {
        break
      }
    }
  }

  /*  */

  var warn$1;

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  function model (
    el,
    dir,
    _warn
  ) {
    warn$1 = _warn;
    var value = dir.value;
    var modifiers = dir.modifiers;
    var tag = el.tag;
    var type = el.attrsMap.type;

    {
      // inputs with type="file" are read only and setting the input's
      // value will throw an error.
      if (tag === 'input' && type === 'file') {
        warn$1(
          "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
          "File inputs are read only. Use a v-on:change listener instead.",
          el.rawAttrsMap['v-model']
        );
      }
    }

    if (el.component) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false
    } else if (tag === 'select') {
      genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
      genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
      genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
      genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false
    } else {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "v-model is not supported on this element type. " +
        'If you are working with contenteditable, it\'s recommended to ' +
        'wrap a library dedicated for that purpose inside a custom component.',
        el.rawAttrsMap['v-model']
      );
    }

    // ensure runtime directive metadata
    return true
  }

  function genCheckboxModel (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(el, 'checked',
      "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
    );
    addHandler(el, 'change',
      "var $$a=" + value + "," +
          '$$el=$event.target,' +
          "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
      'if(Array.isArray($$a)){' +
        "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
            '$$i=_i($$a,$$v);' +
        "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
        "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
      "}else{" + (genAssignmentCode(value, '$$c')) + "}",
      null, true
    );
  }

  function genRadioModel (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
    addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
  }

  function genSelect (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var selectedVal = "Array.prototype.filter" +
      ".call($event.target.options,function(o){return o.selected})" +
      ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
      "return " + (number ? '_n(val)' : 'val') + "})";

    var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
    var code = "var $$selectedVal = " + selectedVal + ";";
    code = code + " " + (genAssignmentCode(value, assignment));
    addHandler(el, 'change', code, null, true);
  }

  function genDefaultModel (
    el,
    value,
    modifiers
  ) {
    var type = el.attrsMap.type;

    // warn if v-bind:value conflicts with v-model
    // except for inputs with v-bind:type
    {
      var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
      var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
      if (value$1 && !typeBinding) {
        var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
        warn$1(
          binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
          'because the latter already expands to a value binding internally',
          el.rawAttrsMap[binding]
        );
      }
    }

    var ref = modifiers || {};
    var lazy = ref.lazy;
    var number = ref.number;
    var trim = ref.trim;
    var needCompositionGuard = !lazy && type !== 'range';
    var event = lazy
      ? 'change'
      : type === 'range'
        ? RANGE_TOKEN
        : 'input';

    var valueExpression = '$event.target.value';
    if (trim) {
      valueExpression = "$event.target.value.trim()";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }

    var code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
      code = "if($event.target.composing)return;" + code;
    }

    addProp(el, 'value', ("(" + value + ")"));
    addHandler(el, event, code, null, true);
    if (trim || number) {
      addHandler(el, 'blur', '$forceUpdate()');
    }
  }

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    }
  }

  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

  function add$1 (
    name,
    handler,
    capture,
    passive
  ) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function (e) {
        if (
          // no bubbling, should always fire.
          // this is just a safety net in case event.timeStamp is unreliable in
          // certain weird environments...
          e.target === e.currentTarget ||
          // event is fired after handler attachment
          e.timeStamp >= attachedTimestamp ||
          // bail for environments that have buggy event.timeStamp implementations
          // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
          // #9681 QtWebEngine event.timeStamp is negative value
          e.timeStamp <= 0 ||
          // #9448 bail if event is fired in another document in a multi-page
          // electron/nw.js app, since event.timeStamp will be using a different
          // starting reference
          e.target.ownerDocument !== document
        ) {
          return original.apply(this, arguments)
        }
      };
    }
    target$1.addEventListener(
      name,
      handler,
      supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
  }

  function remove$2 (
    name,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }

  function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = undefined;
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  var svgContainer;

  function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (!(key in props)) {
        elm[key] = '';
      }
    }

    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value' && elm.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        // IE doesn't support innerHTML for SVG elements
        svgContainer = svgContainer || document.createElement('div');
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecessary `checked` update.
        cur !== oldProps[key]
      ) {
        // some property updates can throw
        // e.g. `value` on <progress> w/ non-finite value
        try {
          elm[key] = cur;
        } catch (e) {}
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue (elm, checkVal) {
    return (!elm.composing && (
      elm.tagName === 'OPTION' ||
      isNotInFocusAndDirty(elm, checkVal) ||
      isDirtyWithModifiers(elm, checkVal)
    ))
  }

  function isNotInFocusAndDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try { notInFocus = document.activeElement !== elm; } catch (e) {}
    return notInFocus && elm.value !== checkVal
  }

  function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim()
      }
    }
    return value !== newVal
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (
          childNode && childNode.data &&
          (styleData = normalizeStyleData(childNode.data))
        ) {
          extend(res, styleData);
        }
      }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in emptyStyle)) {
      return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  });

  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
      return
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__)
      ? extend({}, style)
      : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  var whitespaceRE = /\s+/;

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
    ) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
    ) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : /* istanbul ignore next */ function (fn) { return fn(); };

  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass (el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }

  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }

  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  /*  */

  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return
    }

    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;

    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;

    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );

    if (explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, 'enter', vnode);
    }

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode, 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb
        ) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave (vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm()
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
      return
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );

    if (isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, 'leave', vnode);
    }

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  // only used in dev mode
  function checkDuration (val, name, vnode) {
    if (typeof val !== 'number') {
      warn(
        "<transition> explicit " + name + " duration is not a valid number - " +
        "got " + (JSON.stringify(val)) + ".",
        vnode.context
      );
    } else if (isNaN(val)) {
      warn(
        "<transition> explicit " + name + " duration is NaN - " +
        'the duration expression might be incorrect.',
        vnode.context
      );
    }
  }

  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
      return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }

  function _enter (_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var directive = {
    inserted: function inserted (el, binding, vnode, oldVnode) {
      if (vnode.tag === 'select') {
        // #6903
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, 'postpatch', function () {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },

    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple
            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }

  function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      warn(
        "<select multiple v-model=\"" + (binding.expression) + "\"> " +
        "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
        vm
      );
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
  }

  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }

  function onCompositionStart (e) {
    e.target.composing = true;
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) { return }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }

  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (!value === !oldValue) { return }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: directive,
    show: show
  };

  /*  */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }

  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }

  function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      })
    }
  }

  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }

  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }

  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

  var isVShowDirective = function (d) { return d.name === 'show'; };

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
      var this$1 = this;

      var children = this.$slots.default;
      if (!children) {
        return
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(isNotTextNode);
      /* istanbul ignore if */
      if (!children.length) {
        return
      }

      // warn multiple elements
      if (children.length > 1) {
        warn(
          '<transition> can only be used on a single element. Use ' +
          '<transition-group> for lists.',
          this.$parent
        );
      }

      var mode = this.mode;

      // warn invalid mode
      if (mode && mode !== 'in-out' && mode !== 'out-in'
      ) {
        warn(
          'invalid <transition> mode: ' + mode,
          this.$parent
        );
      }

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }

      if (this._leaving) {
        return placeholder(h, rawChild)
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }

      if (
        oldChild &&
        oldChild.data &&
        !isSameChild(child, oldChild) &&
        !isAsyncPlaceholder(oldChild) &&
        // #6687 component root is a comment node
        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
      ) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild
          }
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }

      return rawChild
    }
  };

  /*  */

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    beforeMount: function beforeMount () {
      var this$1 = this;

      var update = this._update;
      this._update = function (vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        // force removing pass
        this$1.__patch__(
          this$1._vnode,
          this$1.kept,
          false, // hydrating
          true // removeOnly (!important, avoids unnecessary moves)
        );
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update.call(this$1, vnode, hydrating);
      };
    },

    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          } else {
            var opts = c.componentOptions;
            var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
            warn(("<transition-group> children must be keyed: <" + name + ">"));
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children)
    },

    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      // assign to this to avoid being removed in tree-shaking
      // $flow-disable-line
      this._reflow = document.body.offsetHeight;

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };

  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue);
        } else {
          console[console.info ? 'info' : 'log'](
            'Download the Vue Devtools extension for a better development experience:\n' +
            'https://github.com/vuejs/vue-devtools'
          );
        }
      }
      if (config.productionTip !== false &&
        typeof console !== 'undefined'
      ) {
        console[console.info ? 'info' : 'log'](
          "You are running Vue in development mode.\n" +
          "Make sure to turn on production mode when deploying for production.\n" +
          "See more tips at https://vuejs.org/guide/deployment.html"
        );
      }
    }, 0);
  }

  /*  */

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

  var buildRegex = cached(function (delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
  });



  function parseText (
    text,
    delimiters
  ) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
      return
    }
    var tokens = [];
    var rawTokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, tokenValue;
    while ((match = tagRE.exec(text))) {
      index = match.index;
      // push text token
      if (index > lastIndex) {
        rawTokens.push(tokenValue = text.slice(lastIndex, index));
        tokens.push(JSON.stringify(tokenValue));
      }
      // tag token
      var exp = parseFilters(match[1].trim());
      tokens.push(("_s(" + exp + ")"));
      rawTokens.push({ '@binding': exp });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      rawTokens.push(tokenValue = text.slice(lastIndex));
      tokens.push(JSON.stringify(tokenValue));
    }
    return {
      expression: tokens.join('+'),
      tokens: rawTokens
    }
  }

  /*  */

  function transformNode (el, options) {
    var warn = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, 'class');
    if (staticClass) {
      var res = parseText(staticClass, options.delimiters);
      if (res) {
        warn(
          "class=\"" + staticClass + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div class="{{ val }}">, use <div :class="val">.',
          el.rawAttrsMap['class']
        );
      }
    }
    if (staticClass) {
      el.staticClass = JSON.stringify(staticClass);
    }
    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
      el.classBinding = classBinding;
    }
  }

  function genData (el) {
    var data = '';
    if (el.staticClass) {
      data += "staticClass:" + (el.staticClass) + ",";
    }
    if (el.classBinding) {
      data += "class:" + (el.classBinding) + ",";
    }
    return data
  }

  var klass$1 = {
    staticKeys: ['staticClass'],
    transformNode: transformNode,
    genData: genData
  };

  /*  */

  function transformNode$1 (el, options) {
    var warn = options.warn || baseWarn;
    var staticStyle = getAndRemoveAttr(el, 'style');
    if (staticStyle) {
      /* istanbul ignore if */
      {
        var res = parseText(staticStyle, options.delimiters);
        if (res) {
          warn(
            "style=\"" + staticStyle + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div style="{{ val }}">, use <div :style="val">.',
            el.rawAttrsMap['style']
          );
        }
      }
      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }

    var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
    if (styleBinding) {
      el.styleBinding = styleBinding;
    }
  }

  function genData$1 (el) {
    var data = '';
    if (el.staticStyle) {
      data += "staticStyle:" + (el.staticStyle) + ",";
    }
    if (el.styleBinding) {
      data += "style:(" + (el.styleBinding) + "),";
    }
    return data
  }

  var style$1 = {
    staticKeys: ['staticStyle'],
    transformNode: transformNode$1,
    genData: genData$1
  };

  /*  */

  var decoder;

  var he = {
    decode: function decode (html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent
    }
  };

  /*  */

  var isUnaryTag = makeMap(
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
  );

  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var canBeLeftOpenTag = makeMap(
    'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
  );

  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
  var isNonPhrasingTag = makeMap(
    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track'
  );

  /**
   * Not type-checking this file because it's mostly vendor code.
   */

  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp(("^<" + qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
  var doctype = /^<!DOCTYPE [^>]+>/i;
  // #7298: escape - to avoid being passed as HTML comment when inlined in page
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;

  // Special Elements (can contain anything)
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};

  var decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

  // #5992
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

  function decodeAttr (value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function (match) { return decodingMap[match]; })
  }

  function parseHTML (html, options) {
    var stack = [];
    var expectHTML = options.expectHTML;
    var isUnaryTag$$1 = options.isUnaryTag || no;
    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
    var index = 0;
    var last, lastTag;
    while (html) {
      last = html;
      // Make sure we're not in a plaintext content element like script/style
      if (!lastTag || !isPlainTextElement(lastTag)) {
        var textEnd = html.indexOf('<');
        if (textEnd === 0) {
          // Comment:
          if (comment.test(html)) {
            var commentEnd = html.indexOf('-->');

            if (commentEnd >= 0) {
              if (options.shouldKeepComment) {
                options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
              }
              advance(commentEnd + 3);
              continue
            }
          }

          // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
          if (conditionalComment.test(html)) {
            var conditionalEnd = html.indexOf(']>');

            if (conditionalEnd >= 0) {
              advance(conditionalEnd + 2);
              continue
            }
          }

          // Doctype:
          var doctypeMatch = html.match(doctype);
          if (doctypeMatch) {
            advance(doctypeMatch[0].length);
            continue
          }

          // End tag:
          var endTagMatch = html.match(endTag);
          if (endTagMatch) {
            var curIndex = index;
            advance(endTagMatch[0].length);
            parseEndTag(endTagMatch[1], curIndex, index);
            continue
          }

          // Start tag:
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            handleStartTag(startTagMatch);
            if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
              advance(1);
            }
            continue
          }
        }

        var text = (void 0), rest = (void 0), next = (void 0);
        if (textEnd >= 0) {
          rest = html.slice(textEnd);
          while (
            !endTag.test(rest) &&
            !startTagOpen.test(rest) &&
            !comment.test(rest) &&
            !conditionalComment.test(rest)
          ) {
            // < in plain text, be forgiving and treat it as text
            next = rest.indexOf('<', 1);
            if (next < 0) { break }
            textEnd += next;
            rest = html.slice(textEnd);
          }
          text = html.substring(0, textEnd);
        }

        if (textEnd < 0) {
          text = html;
        }

        if (text) {
          advance(text.length);
        }

        if (options.chars && text) {
          options.chars(text, index - text.length, index);
        }
      } else {
        var endTagLength = 0;
        var stackedTag = lastTag.toLowerCase();
        var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
        var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
          endTagLength = endTag.length;
          if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
            text = text
              .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
              .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
          }
          if (shouldIgnoreFirstNewline(stackedTag, text)) {
            text = text.slice(1);
          }
          if (options.chars) {
            options.chars(text);
          }
          return ''
        });
        index += html.length - rest$1.length;
        html = rest$1;
        parseEndTag(stackedTag, index - endTagLength, index);
      }

      if (html === last) {
        options.chars && options.chars(html);
        if (!stack.length && options.warn) {
          options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
        }
        break
      }
    }

    // Clean up any remaining tags
    parseEndTag();

    function advance (n) {
      index += n;
      html = html.substring(n);
    }

    function parseStartTag () {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);
        var end, attr;
        while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
          attr.start = index;
          advance(attr[0].length);
          attr.end = index;
          match.attrs.push(attr);
        }
        if (end) {
          match.unarySlash = end[1];
          advance(end[0].length);
          match.end = index;
          return match
        }
      }
    }

    function handleStartTag (match) {
      var tagName = match.tagName;
      var unarySlash = match.unarySlash;

      if (expectHTML) {
        if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
          parseEndTag(lastTag);
        }
        if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
          parseEndTag(tagName);
        }
      }

      var unary = isUnaryTag$$1(tagName) || !!unarySlash;

      var l = match.attrs.length;
      var attrs = new Array(l);
      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || '';
        var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
          ? options.shouldDecodeNewlinesForHref
          : options.shouldDecodeNewlines;
        attrs[i] = {
          name: args[1],
          value: decodeAttr(value, shouldDecodeNewlines)
        };
        if (options.outputSourceRange) {
          attrs[i].start = args.start + args[0].match(/^\s*/).length;
          attrs[i].end = args.end;
        }
      }

      if (!unary) {
        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
        lastTag = tagName;
      }

      if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
      }
    }

    function parseEndTag (tagName, start, end) {
      var pos, lowerCasedTagName;
      if (start == null) { start = index; }
      if (end == null) { end = index; }

      // Find the closest opened tag of the same type
      if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();
        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break
          }
        }
      } else {
        // If no tag name is provided, clean shop
        pos = 0;
      }

      if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--) {
          if (i > pos || !tagName &&
            options.warn
          ) {
            options.warn(
              ("tag <" + (stack[i].tag) + "> has no matching end tag."),
              { start: stack[i].start, end: stack[i].end }
            );
          }
          if (options.end) {
            options.end(stack[i].tag, start, end);
          }
        }

        // Remove the open elements from the stack
        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === 'br') {
        if (options.start) {
          options.start(tagName, [], true, start, end);
        }
      } else if (lowerCasedTagName === 'p') {
        if (options.start) {
          options.start(tagName, [], false, start, end);
        }
        if (options.end) {
          options.end(tagName, start, end);
        }
      }
    }
  }

  /*  */

  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:|^#/;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var dynamicArgRE = /^\[.*\]$/;

  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

  var slotRE = /^v-slot(:|$)|^#/;

  var lineBreakRE = /[\r\n]/;
  var whitespaceRE$1 = /\s+/g;

  var invalidAttributeRE = /[\s"'<>\/=]/;

  var decodeHTMLCached = cached(he.decode);

  var emptySlotScopeToken = "_empty_";

  // configurable state
  var warn$2;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;

  function createASTElement (
    tag,
    attrs,
    parent
  ) {
    return {
      type: 1,
      tag: tag,
      attrsList: attrs,
      attrsMap: makeAttrsMap(attrs),
      rawAttrsMap: {},
      parent: parent,
      children: []
    }
  }

  /**
   * Convert HTML string to AST.
   */
  function parse (
    template,
    options
  ) {
    warn$2 = options.warn || baseWarn;

    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;
    var isReservedTag = options.isReservedTag || no;
    maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

    delimiters = options.delimiters;

    var stack = [];
    var preserveWhitespace = options.preserveWhitespace !== false;
    var whitespaceOption = options.whitespace;
    var root;
    var currentParent;
    var inVPre = false;
    var inPre = false;
    var warned = false;

    function warnOnce (msg, range) {
      if (!warned) {
        warned = true;
        warn$2(msg, range);
      }
    }

    function closeElement (element) {
      trimEndingWhitespace(element);
      if (!inVPre && !element.processed) {
        element = processElement(element, options);
      }
      // tree management
      if (!stack.length && element !== root) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          {
            checkRootConstraints(element);
          }
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead.",
            { start: element.start }
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else {
          if (element.slotScope) {
            // scoped slot
            // keep it in the children list so that v-else(-if) conditions can
            // find it as the prev node.
            var name = element.slotTarget || '"default"'
            ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
          }
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }

      // final children cleanup
      // filter out scoped slots
      element.children = element.children.filter(function (c) { return !(c).slotScope; });
      // remove trailing whitespace node again
      trimEndingWhitespace(element);

      // check pre state
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
      // apply post-transforms
      for (var i = 0; i < postTransforms.length; i++) {
        postTransforms[i](element, options);
      }
    }

    function trimEndingWhitespace (el) {
      // remove trailing whitespace node
      if (!inPre) {
        var lastNode;
        while (
          (lastNode = el.children[el.children.length - 1]) &&
          lastNode.type === 3 &&
          lastNode.text === ' '
        ) {
          el.children.pop();
        }
      }
    }

    function checkRootConstraints (el) {
      if (el.tag === 'slot' || el.tag === 'template') {
        warnOnce(
          "Cannot use <" + (el.tag) + "> as component root element because it may " +
          'contain multiple nodes.',
          { start: el.start }
        );
      }
      if (el.attrsMap.hasOwnProperty('v-for')) {
        warnOnce(
          'Cannot use v-for on stateful component root element because ' +
          'it renders multiple elements.',
          el.rawAttrsMap['v-for']
        );
      }
    }

    parseHTML(template, {
      warn: warn$2,
      expectHTML: options.expectHTML,
      isUnaryTag: options.isUnaryTag,
      canBeLeftOpenTag: options.canBeLeftOpenTag,
      shouldDecodeNewlines: options.shouldDecodeNewlines,
      shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
      shouldKeepComment: options.comments,
      outputSourceRange: options.outputSourceRange,
      start: function start (tag, attrs, unary, start$1, end) {
        // check namespace.
        // inherit parent ns if there is one
        var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

        // handle IE svg bug
        /* istanbul ignore if */
        if (isIE && ns === 'svg') {
          attrs = guardIESVGBug(attrs);
        }

        var element = createASTElement(tag, attrs, currentParent);
        if (ns) {
          element.ns = ns;
        }

        {
          if (options.outputSourceRange) {
            element.start = start$1;
            element.end = end;
            element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
              cumulated[attr.name] = attr;
              return cumulated
            }, {});
          }
          attrs.forEach(function (attr) {
            if (invalidAttributeRE.test(attr.name)) {
              warn$2(
                "Invalid dynamic argument expression: attribute names cannot contain " +
                "spaces, quotes, <, >, / or =.",
                {
                  start: attr.start + attr.name.indexOf("["),
                  end: attr.start + attr.name.length
                }
              );
            }
          });
        }

        if (isForbiddenTag(element) && !isServerRendering()) {
          element.forbidden = true;
          warn$2(
            'Templates should only be responsible for mapping the state to the ' +
            'UI. Avoid placing tags with side-effects in your templates, such as ' +
            "<" + tag + ">" + ', as they will not be parsed.',
            { start: element.start }
          );
        }

        // apply pre-transforms
        for (var i = 0; i < preTransforms.length; i++) {
          element = preTransforms[i](element, options) || element;
        }

        if (!inVPre) {
          processPre(element);
          if (element.pre) {
            inVPre = true;
          }
        }
        if (platformIsPreTag(element.tag)) {
          inPre = true;
        }
        if (inVPre) {
          processRawAttrs(element);
        } else if (!element.processed) {
          // structural directives
          processFor(element);
          processIf(element);
          processOnce(element);
        }

        if (!root) {
          root = element;
          {
            checkRootConstraints(root);
          }
        }

        if (!unary) {
          currentParent = element;
          stack.push(element);
        } else {
          closeElement(element);
        }
      },

      end: function end (tag, start, end$1) {
        var element = stack[stack.length - 1];
        // pop stack
        stack.length -= 1;
        currentParent = stack[stack.length - 1];
        if (options.outputSourceRange) {
          element.end = end$1;
        }
        closeElement(element);
      },

      chars: function chars (text, start, end) {
        if (!currentParent) {
          {
            if (text === template) {
              warnOnce(
                'Component template requires a root element, rather than just text.',
                { start: start }
              );
            } else if ((text = text.trim())) {
              warnOnce(
                ("text \"" + text + "\" outside root element will be ignored."),
                { start: start }
              );
            }
          }
          return
        }
        // IE textarea placeholder bug
        /* istanbul ignore if */
        if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text
        ) {
          return
        }
        var children = currentParent.children;
        if (inPre || text.trim()) {
          text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
        } else if (!children.length) {
          // remove the whitespace-only node right after an opening tag
          text = '';
        } else if (whitespaceOption) {
          if (whitespaceOption === 'condense') {
            // in condense mode, remove the whitespace node if it contains
            // line break, otherwise condense to a single space
            text = lineBreakRE.test(text) ? '' : ' ';
          } else {
            text = ' ';
          }
        } else {
          text = preserveWhitespace ? ' ' : '';
        }
        if (text) {
          if (!inPre && whitespaceOption === 'condense') {
            // condense consecutive whitespaces into single space
            text = text.replace(whitespaceRE$1, ' ');
          }
          var res;
          var child;
          if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
            child = {
              type: 2,
              expression: res.expression,
              tokens: res.tokens,
              text: text
            };
          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
            child = {
              type: 3,
              text: text
            };
          }
          if (child) {
            if (options.outputSourceRange) {
              child.start = start;
              child.end = end;
            }
            children.push(child);
          }
        }
      },
      comment: function comment (text, start, end) {
        // adding anything as a sibling to the root node is forbidden
        // comments should still be allowed, but ignored
        if (currentParent) {
          var child = {
            type: 3,
            text: text,
            isComment: true
          };
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          currentParent.children.push(child);
        }
      }
    });
    return root
  }

  function processPre (el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
      el.pre = true;
    }
  }

  function processRawAttrs (el) {
    var list = el.attrsList;
    var len = list.length;
    if (len) {
      var attrs = el.attrs = new Array(len);
      for (var i = 0; i < len; i++) {
        attrs[i] = {
          name: list[i].name,
          value: JSON.stringify(list[i].value)
        };
        if (list[i].start != null) {
          attrs[i].start = list[i].start;
          attrs[i].end = list[i].end;
        }
      }
    } else if (!el.pre) {
      // non root node in pre blocks with no attributes
      el.plain = true;
    }
  }

  function processElement (
    element,
    options
  ) {
    processKey(element);

    // determine whether this is a plain element after
    // removing structural attributes
    element.plain = (
      !element.key &&
      !element.scopedSlots &&
      !element.attrsList.length
    );

    processRef(element);
    processSlotContent(element);
    processSlotOutlet(element);
    processComponent(element);
    for (var i = 0; i < transforms.length; i++) {
      element = transforms[i](element, options) || element;
    }
    processAttrs(element);
    return element
  }

  function processKey (el) {
    var exp = getBindingAttr(el, 'key');
    if (exp) {
      {
        if (el.tag === 'template') {
          warn$2(
            "<template> cannot be keyed. Place the key on real elements instead.",
            getRawBindingAttr(el, 'key')
          );
        }
        if (el.for) {
          var iterator = el.iterator2 || el.iterator1;
          var parent = el.parent;
          if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
            warn$2(
              "Do not use v-for index as key on <transition-group> children, " +
              "this is the same as not using keys.",
              getRawBindingAttr(el, 'key'),
              true /* tip */
            );
          }
        }
      }
      el.key = exp;
    }
  }

  function processRef (el) {
    var ref = getBindingAttr(el, 'ref');
    if (ref) {
      el.ref = ref;
      el.refInFor = checkInFor(el);
    }
  }

  function processFor (el) {
    var exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
      var res = parseFor(exp);
      if (res) {
        extend(el, res);
      } else {
        warn$2(
          ("Invalid v-for expression: " + exp),
          el.rawAttrsMap['v-for']
        );
      }
    }
  }



  function parseFor (exp) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) { return }
    var res = {};
    res.for = inMatch[2].trim();
    var alias = inMatch[1].trim().replace(stripParensRE, '');
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      res.alias = alias.replace(forIteratorRE, '').trim();
      res.iterator1 = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.iterator2 = iteratorMatch[2].trim();
      }
    } else {
      res.alias = alias;
    }
    return res
  }

  function processIf (el) {
    var exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
      el.if = exp;
      addIfCondition(el, {
        exp: exp,
        block: el
      });
    } else {
      if (getAndRemoveAttr(el, 'v-else') != null) {
        el.else = true;
      }
      var elseif = getAndRemoveAttr(el, 'v-else-if');
      if (elseif) {
        el.elseif = elseif;
      }
    }
  }

  function processIfConditions (el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
      addIfCondition(prev, {
        exp: el.elseif,
        block: el
      });
    } else {
      warn$2(
        "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
        "used on element <" + (el.tag) + "> without corresponding v-if.",
        el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
      );
    }
  }

  function findPrevElement (children) {
    var i = children.length;
    while (i--) {
      if (children[i].type === 1) {
        return children[i]
      } else {
        if (children[i].text !== ' ') {
          warn$2(
            "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
            "will be ignored.",
            children[i]
          );
        }
        children.pop();
      }
    }
  }

  function addIfCondition (el, condition) {
    if (!el.ifConditions) {
      el.ifConditions = [];
    }
    el.ifConditions.push(condition);
  }

  function processOnce (el) {
    var once$$1 = getAndRemoveAttr(el, 'v-once');
    if (once$$1 != null) {
      el.once = true;
    }
  }

  // handle content being passed to a component as slot,
  // e.g. <template slot="xxx">, <div slot-scope="xxx">
  function processSlotContent (el) {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          el.rawAttrsMap['scope'],
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          el.rawAttrsMap['slot-scope'],
          true
        );
      }
      el.slotScope = slotScope;
    }

    // slot="xxx"
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
      }
    }

    // 2.6 v-slot syntax
    {
      if (el.tag === 'template') {
        // v-slot on <template>
        var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding) {
          {
            if (el.slotTarget || el.slotScope) {
              warn$2(
                "Unexpected mixed usage of different slot syntaxes.",
                el
              );
            }
            if (el.parent && !maybeComponent(el.parent)) {
              warn$2(
                "<template v-slot> can only appear at the root level inside " +
                "the receiving component",
                el
              );
            }
          }
          var ref = getSlotName(slotBinding);
          var name = ref.name;
          var dynamic = ref.dynamic;
          el.slotTarget = name;
          el.slotTargetDynamic = dynamic;
          el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
        }
      } else {
        // v-slot on component, denotes default slot
        var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding$1) {
          {
            if (!maybeComponent(el)) {
              warn$2(
                "v-slot can only be used on components or <template>.",
                slotBinding$1
              );
            }
            if (el.slotScope || el.slotTarget) {
              warn$2(
                "Unexpected mixed usage of different slot syntaxes.",
                el
              );
            }
            if (el.scopedSlots) {
              warn$2(
                "To avoid scope ambiguity, the default slot should also use " +
                "<template> syntax when there are other named slots.",
                slotBinding$1
              );
            }
          }
          // add the component's children to its default slot
          var slots = el.scopedSlots || (el.scopedSlots = {});
          var ref$1 = getSlotName(slotBinding$1);
          var name$1 = ref$1.name;
          var dynamic$1 = ref$1.dynamic;
          var slotContainer = slots[name$1] = createASTElement('template', [], el);
          slotContainer.slotTarget = name$1;
          slotContainer.slotTargetDynamic = dynamic$1;
          slotContainer.children = el.children.filter(function (c) {
            if (!c.slotScope) {
              c.parent = slotContainer;
              return true
            }
          });
          slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
          // remove children as they are returned from scopedSlots now
          el.children = [];
          // mark el non-plain so data gets generated
          el.plain = false;
        }
      }
    }
  }

  function getSlotName (binding) {
    var name = binding.name.replace(slotRE, '');
    if (!name) {
      if (binding.name[0] !== '#') {
        name = 'default';
      } else {
        warn$2(
          "v-slot shorthand syntax requires a slot name.",
          binding
        );
      }
    }
    return dynamicArgRE.test(name)
      // dynamic [name]
      ? { name: name.slice(1, -1), dynamic: true }
      // static name
      : { name: ("\"" + name + "\""), dynamic: false }
  }

  // handle <slot/> outlets
  function processSlotOutlet (el) {
    if (el.tag === 'slot') {
      el.slotName = getBindingAttr(el, 'name');
      if (el.key) {
        warn$2(
          "`key` does not work on <slot> because slots are abstract outlets " +
          "and can possibly expand into multiple elements. " +
          "Use the key on a wrapping element instead.",
          getRawBindingAttr(el, 'key')
        );
      }
    }
  }

  function processComponent (el) {
    var binding;
    if ((binding = getBindingAttr(el, 'is'))) {
      el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
      el.inlineTemplate = true;
    }
  }

  function processAttrs (el) {
    var list = el.attrsList;
    var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
    for (i = 0, l = list.length; i < l; i++) {
      name = rawName = list[i].name;
      value = list[i].value;
      if (dirRE.test(name)) {
        // mark element as dynamic
        el.hasBindings = true;
        // modifiers
        modifiers = parseModifiers(name.replace(dirRE, ''));
        // support .foo shorthand syntax for the .prop modifier
        if (modifiers) {
          name = name.replace(modifierRE, '');
        }
        if (bindRE.test(name)) { // v-bind
          name = name.replace(bindRE, '');
          value = parseFilters(value);
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          if (
            value.trim().length === 0
          ) {
            warn$2(
              ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
            );
          }
          if (modifiers) {
            if (modifiers.prop && !isDynamic) {
              name = camelize(name);
              if (name === 'innerHtml') { name = 'innerHTML'; }
            }
            if (modifiers.camel && !isDynamic) {
              name = camelize(name);
            }
            if (modifiers.sync) {
              syncGen = genAssignmentCode(value, "$event");
              if (!isDynamic) {
                addHandler(
                  el,
                  ("update:" + (camelize(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
                if (hyphenate(name) !== camelize(name)) {
                  addHandler(
                    el,
                    ("update:" + (hyphenate(name))),
                    syncGen,
                    null,
                    false,
                    warn$2,
                    list[i]
                  );
                }
              } else {
                // handler w/ dynamic event name
                addHandler(
                  el,
                  ("\"update:\"+(" + name + ")"),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i],
                  true // dynamic
                );
              }
            }
          }
          if ((modifiers && modifiers.prop) || (
            !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
          )) {
            addProp(el, name, value, list[i], isDynamic);
          } else {
            addAttr(el, name, value, list[i], isDynamic);
          }
        } else if (onRE.test(name)) { // v-on
          name = name.replace(onRE, '');
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
        } else { // normal directives
          name = name.replace(dirRE, '');
          // parse arg
          var argMatch = name.match(argRE);
          var arg = argMatch && argMatch[1];
          isDynamic = false;
          if (arg) {
            name = name.slice(0, -(arg.length + 1));
            if (dynamicArgRE.test(arg)) {
              arg = arg.slice(1, -1);
              isDynamic = true;
            }
          }
          addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
          if (name === 'model') {
            checkForAliasModel(el, value);
          }
        }
      } else {
        // literal attribute
        {
          var res = parseText(value, delimiters);
          if (res) {
            warn$2(
              name + "=\"" + value + "\": " +
              'Interpolation inside attributes has been removed. ' +
              'Use v-bind or the colon shorthand instead. For example, ' +
              'instead of <div id="{{ val }}">, use <div :id="val">.',
              list[i]
            );
          }
        }
        addAttr(el, name, JSON.stringify(value), list[i]);
        // #6887 firefox doesn't update muted state if set via attribute
        // even immediately after element creation
        if (!el.component &&
            name === 'muted' &&
            platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, 'true', list[i]);
        }
      }
    }
  }

  function checkInFor (el) {
    var parent = el;
    while (parent) {
      if (parent.for !== undefined) {
        return true
      }
      parent = parent.parent;
    }
    return false
  }

  function parseModifiers (name) {
    var match = name.match(modifierRE);
    if (match) {
      var ret = {};
      match.forEach(function (m) { ret[m.slice(1)] = true; });
      return ret
    }
  }

  function makeAttrsMap (attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
      if (
        map[attrs[i].name] && !isIE && !isEdge
      ) {
        warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
      }
      map[attrs[i].name] = attrs[i].value;
    }
    return map
  }

  // for script (e.g. type="x/template") or style, do not decode content
  function isTextTag (el) {
    return el.tag === 'script' || el.tag === 'style'
  }

  function isForbiddenTag (el) {
    return (
      el.tag === 'style' ||
      (el.tag === 'script' && (
        !el.attrsMap.type ||
        el.attrsMap.type === 'text/javascript'
      ))
    )
  }

  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;

  /* istanbul ignore next */
  function guardIESVGBug (attrs) {
    var res = [];
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (!ieNSBug.test(attr.name)) {
        attr.name = attr.name.replace(ieNSPrefix, '');
        res.push(attr);
      }
    }
    return res
  }

  function checkForAliasModel (el, value) {
    var _el = el;
    while (_el) {
      if (_el.for && _el.alias === value) {
        warn$2(
          "<" + (el.tag) + " v-model=\"" + value + "\">: " +
          "You are binding v-model directly to a v-for iteration alias. " +
          "This will not be able to modify the v-for source array because " +
          "writing to the alias is like modifying a function local variable. " +
          "Consider using an array of objects and use v-model on an object property instead.",
          el.rawAttrsMap['v-model']
        );
      }
      _el = _el.parent;
    }
  }

  /*  */

  function preTransformNode (el, options) {
    if (el.tag === 'input') {
      var map = el.attrsMap;
      if (!map['v-model']) {
        return
      }

      var typeBinding;
      if (map[':type'] || map['v-bind:type']) {
        typeBinding = getBindingAttr(el, 'type');
      }
      if (!map.type && !typeBinding && map['v-bind']) {
        typeBinding = "(" + (map['v-bind']) + ").type";
      }

      if (typeBinding) {
        var ifCondition = getAndRemoveAttr(el, 'v-if', true);
        var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
        var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
        var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
        // 1. checkbox
        var branch0 = cloneASTElement(el);
        // process for on the main node
        processFor(branch0);
        addRawAttr(branch0, 'type', 'checkbox');
        processElement(branch0, options);
        branch0.processed = true; // prevent it from double-processed
        branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
        addIfCondition(branch0, {
          exp: branch0.if,
          block: branch0
        });
        // 2. add radio else-if condition
        var branch1 = cloneASTElement(el);
        getAndRemoveAttr(branch1, 'v-for', true);
        addRawAttr(branch1, 'type', 'radio');
        processElement(branch1, options);
        addIfCondition(branch0, {
          exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
          block: branch1
        });
        // 3. other
        var branch2 = cloneASTElement(el);
        getAndRemoveAttr(branch2, 'v-for', true);
        addRawAttr(branch2, ':type', typeBinding);
        processElement(branch2, options);
        addIfCondition(branch0, {
          exp: ifCondition,
          block: branch2
        });

        if (hasElse) {
          branch0.else = true;
        } else if (elseIfCondition) {
          branch0.elseif = elseIfCondition;
        }

        return branch0
      }
    }
  }

  function cloneASTElement (el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent)
  }

  var model$1 = {
    preTransformNode: preTransformNode
  };

  var modules$1 = [
    klass$1,
    style$1,
    model$1
  ];

  /*  */

  function text (el, dir) {
    if (dir.value) {
      addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
    }
  }

  /*  */

  function html (el, dir) {
    if (dir.value) {
      addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
    }
  }

  var directives$1 = {
    model: model,
    text: text,
    html: html
  };

  /*  */

  var baseOptions = {
    expectHTML: true,
    modules: modules$1,
    directives: directives$1,
    isPreTag: isPreTag,
    isUnaryTag: isUnaryTag,
    mustUseProp: mustUseProp,
    canBeLeftOpenTag: canBeLeftOpenTag,
    isReservedTag: isReservedTag,
    getTagNamespace: getTagNamespace,
    staticKeys: genStaticKeys(modules$1)
  };

  /*  */

  var isStaticKey;
  var isPlatformReservedTag;

  var genStaticKeysCached = cached(genStaticKeys$1);

  /**
   * Goal of the optimizer: walk the generated template AST tree
   * and detect sub-trees that are purely static, i.e. parts of
   * the DOM that never needs to change.
   *
   * Once we detect these sub-trees, we can:
   *
   * 1. Hoist them into constants, so that we no longer need to
   *    create fresh nodes for them on each re-render;
   * 2. Completely skip them in the patching process.
   */
  function optimize (root, options) {
    if (!root) { return }
    isStaticKey = genStaticKeysCached(options.staticKeys || '');
    isPlatformReservedTag = options.isReservedTag || no;
    // first pass: mark all non-static nodes.
    markStatic$1(root);
    // second pass: mark static roots.
    markStaticRoots(root, false);
  }

  function genStaticKeys$1 (keys) {
    return makeMap(
      'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
      (keys ? ',' + keys : '')
    )
  }

  function markStatic$1 (node) {
    node.static = isStatic(node);
    if (node.type === 1) {
      // do not make component slot content static. this avoids
      // 1. components not able to mutate slot nodes
      // 2. static slot content fails for hot-reloading
      if (
        !isPlatformReservedTag(node.tag) &&
        node.tag !== 'slot' &&
        node.attrsMap['inline-template'] == null
      ) {
        return
      }
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        markStatic$1(child);
        if (!child.static) {
          node.static = false;
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          var block = node.ifConditions[i$1].block;
          markStatic$1(block);
          if (!block.static) {
            node.static = false;
          }
        }
      }
    }
  }

  function markStaticRoots (node, isInFor) {
    if (node.type === 1) {
      if (node.static || node.once) {
        node.staticInFor = isInFor;
      }
      // For a node to qualify as a static root, it should have children that
      // are not just static text. Otherwise the cost of hoisting out will
      // outweigh the benefits and it's better off to just always render it fresh.
      if (node.static && node.children.length && !(
        node.children.length === 1 &&
        node.children[0].type === 3
      )) {
        node.staticRoot = true;
        return
      } else {
        node.staticRoot = false;
      }
      if (node.children) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          markStaticRoots(node.children[i], isInFor || !!node.for);
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          markStaticRoots(node.ifConditions[i$1].block, isInFor);
        }
      }
    }
  }

  function isStatic (node) {
    if (node.type === 2) { // expression
      return false
    }
    if (node.type === 3) { // text
      return true
    }
    return !!(node.pre || (
      !node.hasBindings && // no dynamic bindings
      !node.if && !node.for && // not v-if or v-for or v-else
      !isBuiltInTag(node.tag) && // not a built-in
      isPlatformReservedTag(node.tag) && // not a component
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey)
    ))
  }

  function isDirectChildOfTemplateFor (node) {
    while (node.parent) {
      node = node.parent;
      if (node.tag !== 'template') {
        return false
      }
      if (node.for) {
        return true
      }
    }
    return false
  }

  /*  */

  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

  // KeyboardEvent.keyCode aliases
  var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
  };

  // KeyboardEvent.key aliases
  var keyNames = {
    // #7880: IE11 and Edge use `Esc` for Escape key name.
    esc: ['Esc', 'Escape'],
    tab: 'Tab',
    enter: 'Enter',
    // #9112: IE11 uses `Spacebar` for Space key name.
    space: [' ', 'Spacebar'],
    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    // #9112: IE11 uses `Del` for Delete key name.
    'delete': ['Backspace', 'Delete', 'Del']
  };

  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

  var modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard("$event.target !== $event.currentTarget"),
    ctrl: genGuard("!$event.ctrlKey"),
    shift: genGuard("!$event.shiftKey"),
    alt: genGuard("!$event.altKey"),
    meta: genGuard("!$event.metaKey"),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2")
  };

  function genHandlers (
    events,
    isNative
  ) {
    var prefix = isNative ? 'nativeOn:' : 'on:';
    var staticHandlers = "";
    var dynamicHandlers = "";
    for (var name in events) {
      var handlerCode = genHandler(events[name]);
      if (events[name] && events[name].dynamic) {
        dynamicHandlers += name + "," + handlerCode + ",";
      } else {
        staticHandlers += "\"" + name + "\":" + handlerCode + ",";
      }
    }
    staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
    if (dynamicHandlers) {
      return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
    } else {
      return prefix + staticHandlers
    }
  }

  function genHandler (handler) {
    if (!handler) {
      return 'function(){}'
    }

    if (Array.isArray(handler)) {
      return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
    }

    var isMethodPath = simplePathRE.test(handler.value);
    var isFunctionExpression = fnExpRE.test(handler.value);
    var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

    if (!handler.modifiers) {
      if (isMethodPath || isFunctionExpression) {
        return handler.value
      }
      return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
    } else {
      var code = '';
      var genModifierCode = '';
      var keys = [];
      for (var key in handler.modifiers) {
        if (modifierCode[key]) {
          genModifierCode += modifierCode[key];
          // left/right
          if (keyCodes[key]) {
            keys.push(key);
          }
        } else if (key === 'exact') {
          var modifiers = (handler.modifiers);
          genModifierCode += genGuard(
            ['ctrl', 'shift', 'alt', 'meta']
              .filter(function (keyModifier) { return !modifiers[keyModifier]; })
              .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
              .join('||')
          );
        } else {
          keys.push(key);
        }
      }
      if (keys.length) {
        code += genKeyFilter(keys);
      }
      // Make sure modifiers like prevent and stop get executed after key filtering
      if (genModifierCode) {
        code += genModifierCode;
      }
      var handlerCode = isMethodPath
        ? ("return " + (handler.value) + "($event)")
        : isFunctionExpression
          ? ("return (" + (handler.value) + ")($event)")
          : isFunctionInvocation
            ? ("return " + (handler.value))
            : handler.value;
      return ("function($event){" + code + handlerCode + "}")
    }
  }

  function genKeyFilter (keys) {
    return (
      // make sure the key filters only apply to KeyboardEvents
      // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
      // key events that do not have keyCode property...
      "if(!$event.type.indexOf('key')&&" +
      (keys.map(genFilterCode).join('&&')) + ")return null;"
    )
  }

  function genFilterCode (key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
      return ("$event.keyCode!==" + keyVal)
    }
    var keyCode = keyCodes[key];
    var keyName = keyNames[key];
    return (
      "_k($event.keyCode," +
      (JSON.stringify(key)) + "," +
      (JSON.stringify(keyCode)) + "," +
      "$event.key," +
      "" + (JSON.stringify(keyName)) +
      ")"
    )
  }

  /*  */

  function on (el, dir) {
    if (dir.modifiers) {
      warn("v-on without argument does not support modifiers.");
    }
    el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
  }

  /*  */

  function bind$1 (el, dir) {
    el.wrapData = function (code) {
      return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
    };
  }

  /*  */

  var baseDirectives = {
    on: on,
    bind: bind$1,
    cloak: noop
  };

  /*  */





  var CodegenState = function CodegenState (options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
    this.directives = extend(extend({}, baseDirectives), options.directives);
    var isReservedTag = options.isReservedTag || no;
    this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
    this.onceId = 0;
    this.staticRenderFns = [];
    this.pre = false;
  };



  function generate (
    ast,
    options
  ) {
    var state = new CodegenState(options);
    var code = ast ? genElement(ast, state) : '_c("div")';
    return {
      render: ("with(this){return " + code + "}"),
      staticRenderFns: state.staticRenderFns
    }
  }

  function genElement (el, state) {
    if (el.parent) {
      el.pre = el.pre || el.parent.pre;
    }

    if (el.staticRoot && !el.staticProcessed) {
      return genStatic(el, state)
    } else if (el.once && !el.onceProcessed) {
      return genOnce(el, state)
    } else if (el.for && !el.forProcessed) {
      return genFor(el, state)
    } else if (el.if && !el.ifProcessed) {
      return genIf(el, state)
    } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
      return genChildren(el, state) || 'void 0'
    } else if (el.tag === 'slot') {
      return genSlot(el, state)
    } else {
      // component or element
      var code;
      if (el.component) {
        code = genComponent(el.component, el, state);
      } else {
        var data;
        if (!el.plain || (el.pre && state.maybeComponent(el))) {
          data = genData$2(el, state);
        }

        var children = el.inlineTemplate ? null : genChildren(el, state, true);
        code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
      }
      // module transforms
      for (var i = 0; i < state.transforms.length; i++) {
        code = state.transforms[i](el, code);
      }
      return code
    }
  }

  // hoist static sub-trees out
  function genStatic (el, state) {
    el.staticProcessed = true;
    // Some elements (templates) need to behave differently inside of a v-pre
    // node.  All pre nodes are static roots, so we can use this as a location to
    // wrap a state change and reset it upon exiting the pre node.
    var originalPreState = state.pre;
    if (el.pre) {
      state.pre = el.pre;
    }
    state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
    state.pre = originalPreState;
    return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
  }

  // v-once
  function genOnce (el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
      return genIf(el, state)
    } else if (el.staticInFor) {
      var key = '';
      var parent = el.parent;
      while (parent) {
        if (parent.for) {
          key = parent.key;
          break
        }
        parent = parent.parent;
      }
      if (!key) {
        state.warn(
          "v-once can only be used inside v-for that is keyed. ",
          el.rawAttrsMap['v-once']
        );
        return genElement(el, state)
      }
      return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
    } else {
      return genStatic(el, state)
    }
  }

  function genIf (
    el,
    state,
    altGen,
    altEmpty
  ) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
  }

  function genIfConditions (
    conditions,
    state,
    altGen,
    altEmpty
  ) {
    if (!conditions.length) {
      return altEmpty || '_e()'
    }

    var condition = conditions.shift();
    if (condition.exp) {
      return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
    } else {
      return ("" + (genTernaryExp(condition.block)))
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp (el) {
      return altGen
        ? altGen(el, state)
        : el.once
          ? genOnce(el, state)
          : genElement(el, state)
    }
  }

  function genFor (
    el,
    state,
    altGen,
    altHelper
  ) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
    var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

    if (state.maybeComponent(el) &&
      el.tag !== 'slot' &&
      el.tag !== 'template' &&
      !el.key
    ) {
      state.warn(
        "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
        "v-for should have explicit keys. " +
        "See https://vuejs.org/guide/list.html#key for more info.",
        el.rawAttrsMap['v-for'],
        true /* tip */
      );
    }

    el.forProcessed = true; // avoid recursion
    return (altHelper || '_l') + "((" + exp + ")," +
      "function(" + alias + iterator1 + iterator2 + "){" +
        "return " + ((altGen || genElement)(el, state)) +
      '})'
  }

  function genData$2 (el, state) {
    var data = '{';

    // directives first.
    // directives may mutate the el's other properties before they are generated.
    var dirs = genDirectives(el, state);
    if (dirs) { data += dirs + ','; }

    // key
    if (el.key) {
      data += "key:" + (el.key) + ",";
    }
    // ref
    if (el.ref) {
      data += "ref:" + (el.ref) + ",";
    }
    if (el.refInFor) {
      data += "refInFor:true,";
    }
    // pre
    if (el.pre) {
      data += "pre:true,";
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
      data += "tag:\"" + (el.tag) + "\",";
    }
    // module data generation functions
    for (var i = 0; i < state.dataGenFns.length; i++) {
      data += state.dataGenFns[i](el);
    }
    // attributes
    if (el.attrs) {
      data += "attrs:" + (genProps(el.attrs)) + ",";
    }
    // DOM props
    if (el.props) {
      data += "domProps:" + (genProps(el.props)) + ",";
    }
    // event handlers
    if (el.events) {
      data += (genHandlers(el.events, false)) + ",";
    }
    if (el.nativeEvents) {
      data += (genHandlers(el.nativeEvents, true)) + ",";
    }
    // slot target
    // only for non-scoped slots
    if (el.slotTarget && !el.slotScope) {
      data += "slot:" + (el.slotTarget) + ",";
    }
    // scoped slots
    if (el.scopedSlots) {
      data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
    }
    // component v-model
    if (el.model) {
      data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
    }
    // inline-template
    if (el.inlineTemplate) {
      var inlineTemplate = genInlineTemplate(el, state);
      if (inlineTemplate) {
        data += inlineTemplate + ",";
      }
    }
    data = data.replace(/,$/, '') + '}';
    // v-bind dynamic argument wrap
    // v-bind with dynamic arguments must be applied using the same v-bind object
    // merge helper so that class/style/mustUseProp attrs are handled correctly.
    if (el.dynamicAttrs) {
      data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
    }
    // v-bind data wrap
    if (el.wrapData) {
      data = el.wrapData(data);
    }
    // v-on data wrap
    if (el.wrapListeners) {
      data = el.wrapListeners(data);
    }
    return data
  }

  function genDirectives (el, state) {
    var dirs = el.directives;
    if (!dirs) { return }
    var res = 'directives:[';
    var hasRuntime = false;
    var i, l, dir, needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
      dir = dirs[i];
      needRuntime = true;
      var gen = state.directives[dir.name];
      if (gen) {
        // compile-time directive that manipulates AST.
        // returns true if it also needs a runtime counterpart.
        needRuntime = !!gen(el, dir, state.warn);
      }
      if (needRuntime) {
        hasRuntime = true;
        res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
      }
    }
    if (hasRuntime) {
      return res.slice(0, -1) + ']'
    }
  }

  function genInlineTemplate (el, state) {
    var ast = el.children[0];
    if (el.children.length !== 1 || ast.type !== 1) {
      state.warn(
        'Inline-template components must have exactly one child element.',
        { start: el.start }
      );
    }
    if (ast && ast.type === 1) {
      var inlineRenderFns = generate(ast, state.options);
      return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
    }
  }

  function genScopedSlots (
    el,
    slots,
    state
  ) {
    // by default scoped slots are considered "stable", this allows child
    // components with only scoped slots to skip forced updates from parent.
    // but in some cases we have to bail-out of this optimization
    // for example if the slot contains dynamic names, has v-if or v-for on them...
    var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
      var slot = slots[key];
      return (
        slot.slotTargetDynamic ||
        slot.if ||
        slot.for ||
        containsSlotChild(slot) // is passing down slot from parent which may be dynamic
      )
    });

    // #9534: if a component with scoped slots is inside a conditional branch,
    // it's possible for the same component to be reused but with different
    // compiled slot content. To avoid that, we generate a unique key based on
    // the generated code of all the slot contents.
    var needsKey = !!el.if;

    // OR when it is inside another scoped slot or v-for (the reactivity may be
    // disconnected due to the intermediate scope variable)
    // #9438, #9506
    // TODO: this can be further optimized by properly analyzing in-scope bindings
    // and skip force updating ones that do not actually use scope variables.
    if (!needsForceUpdate) {
      var parent = el.parent;
      while (parent) {
        if (
          (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
          parent.for
        ) {
          needsForceUpdate = true;
          break
        }
        if (parent.if) {
          needsKey = true;
        }
        parent = parent.parent;
      }
    }

    var generatedSlots = Object.keys(slots)
      .map(function (key) { return genScopedSlot(slots[key], state); })
      .join(',');

    return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
  }

  function hash(str) {
    var hash = 5381;
    var i = str.length;
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0
  }

  function containsSlotChild (el) {
    if (el.type === 1) {
      if (el.tag === 'slot') {
        return true
      }
      return el.children.some(containsSlotChild)
    }
    return false
  }

  function genScopedSlot (
    el,
    state
  ) {
    var isLegacySyntax = el.attrsMap['slot-scope'];
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
      return genIf(el, state, genScopedSlot, "null")
    }
    if (el.for && !el.forProcessed) {
      return genFor(el, state, genScopedSlot)
    }
    var slotScope = el.slotScope === emptySlotScopeToken
      ? ""
      : String(el.slotScope);
    var fn = "function(" + slotScope + "){" +
      "return " + (el.tag === 'template'
        ? el.if && isLegacySyntax
          ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
          : genChildren(el, state) || 'undefined'
        : genElement(el, state)) + "}";
    // reverse proxy v-slot without scope on this.$slots
    var reverseProxy = slotScope ? "" : ",proxy:true";
    return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
  }

  function genChildren (
    el,
    state,
    checkSkip,
    altGenElement,
    altGenNode
  ) {
    var children = el.children;
    if (children.length) {
      var el$1 = children[0];
      // optimize single v-for
      if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot'
      ) {
        var normalizationType = checkSkip
          ? state.maybeComponent(el$1) ? ",1" : ",0"
          : "";
        return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
      }
      var normalizationType$1 = checkSkip
        ? getNormalizationType(children, state.maybeComponent)
        : 0;
      var gen = altGenNode || genNode;
      return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
    }
  }

  // determine the normalization needed for the children array.
  // 0: no normalization needed
  // 1: simple normalization needed (possible 1-level deep nested array)
  // 2: full normalization needed
  function getNormalizationType (
    children,
    maybeComponent
  ) {
    var res = 0;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.type !== 1) {
        continue
      }
      if (needsNormalization(el) ||
          (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
        res = 2;
        break
      }
      if (maybeComponent(el) ||
          (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
        res = 1;
      }
    }
    return res
  }

  function needsNormalization (el) {
    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
  }

  function genNode (node, state) {
    if (node.type === 1) {
      return genElement(node, state)
    } else if (node.type === 3 && node.isComment) {
      return genComment(node)
    } else {
      return genText(node)
    }
  }

  function genText (text) {
    return ("_v(" + (text.type === 2
      ? text.expression // no need for () because already wrapped in _s()
      : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
  }

  function genComment (comment) {
    return ("_e(" + (JSON.stringify(comment.text)) + ")")
  }

  function genSlot (el, state) {
    var slotName = el.slotName || '"default"';
    var children = genChildren(el, state);
    var res = "_t(" + slotName + (children ? ("," + children) : '');
    var attrs = el.attrs || el.dynamicAttrs
      ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
          // slot props are camelized
          name: camelize(attr.name),
          value: attr.value,
          dynamic: attr.dynamic
        }); }))
      : null;
    var bind$$1 = el.attrsMap['v-bind'];
    if ((attrs || bind$$1) && !children) {
      res += ",null";
    }
    if (attrs) {
      res += "," + attrs;
    }
    if (bind$$1) {
      res += (attrs ? '' : ',null') + "," + bind$$1;
    }
    return res + ')'
  }

  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
  function genComponent (
    componentName,
    el,
    state
  ) {
    var children = el.inlineTemplate ? null : genChildren(el, state, true);
    return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
  }

  function genProps (props) {
    var staticProps = "";
    var dynamicProps = "";
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var value = transformSpecialNewlines(prop.value);
      if (prop.dynamic) {
        dynamicProps += (prop.name) + "," + value + ",";
      } else {
        staticProps += "\"" + (prop.name) + "\":" + value + ",";
      }
    }
    staticProps = "{" + (staticProps.slice(0, -1)) + "}";
    if (dynamicProps) {
      return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
    } else {
      return staticProps
    }
  }

  // #3895, #4268
  function transformSpecialNewlines (text) {
    return text
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
  }

  /*  */



  // these keywords should not appear inside expressions, but operators like
  // typeof, instanceof and in are allowed
  var prohibitedKeywordRE = new RegExp('\\b' + (
    'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
    'super,throw,while,yield,delete,export,import,return,switch,default,' +
    'extends,finally,continue,debugger,function,arguments'
  ).split(',').join('\\b|\\b') + '\\b');

  // these unary operators should not be used as property/method names
  var unaryOperatorsRE = new RegExp('\\b' + (
    'delete,typeof,void'
  ).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

  // strip strings in expressions
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

  // detect problematic expressions in a template
  function detectErrors (ast, warn) {
    if (ast) {
      checkNode(ast, warn);
    }
  }

  function checkNode (node, warn) {
    if (node.type === 1) {
      for (var name in node.attrsMap) {
        if (dirRE.test(name)) {
          var value = node.attrsMap[name];
          if (value) {
            var range = node.rawAttrsMap[name];
            if (name === 'v-for') {
              checkFor(node, ("v-for=\"" + value + "\""), warn, range);
            } else if (name === 'v-slot' || name[0] === '#') {
              checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
            } else if (onRE.test(name)) {
              checkEvent(value, (name + "=\"" + value + "\""), warn, range);
            } else {
              checkExpression(value, (name + "=\"" + value + "\""), warn, range);
            }
          }
        }
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          checkNode(node.children[i], warn);
        }
      }
    } else if (node.type === 2) {
      checkExpression(node.expression, node.text, warn, node);
    }
  }

  function checkEvent (exp, text, warn, range) {
    var stripped = exp.replace(stripStringRE, '');
    var keywordMatch = stripped.match(unaryOperatorsRE);
    if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
      warn(
        "avoid using JavaScript unary operator as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
        range
      );
    }
    checkExpression(exp, text, warn, range);
  }

  function checkFor (node, text, warn, range) {
    checkExpression(node.for || '', text, warn, range);
    checkIdentifier(node.alias, 'v-for alias', text, warn, range);
    checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
    checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
  }

  function checkIdentifier (
    ident,
    type,
    text,
    warn,
    range
  ) {
    if (typeof ident === 'string') {
      try {
        new Function(("var " + ident + "=_"));
      } catch (e) {
        warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
      }
    }
  }

  function checkExpression (exp, text, warn, range) {
    try {
      new Function(("return " + exp));
    } catch (e) {
      var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
      if (keywordMatch) {
        warn(
          "avoid using JavaScript keyword as property name: " +
          "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
          range
        );
      } else {
        warn(
          "invalid expression: " + (e.message) + " in\n\n" +
          "    " + exp + "\n\n" +
          "  Raw expression: " + (text.trim()) + "\n",
          range
        );
      }
    }
  }

  function checkFunctionParameterExpression (exp, text, warn, range) {
    try {
      new Function(exp, '');
    } catch (e) {
      warn(
        "invalid function parameter expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }

  /*  */

  var range = 2;

  function generateCodeFrame (
    source,
    start,
    end
  ) {
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = source.length;

    var lines = source.split(/\r?\n/);
    var count = 0;
    var res = [];
    for (var i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (var j = i - range; j <= i + range || end > count; j++) {
          if (j < 0 || j >= lines.length) { continue }
          res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
          var lineLength = lines[j].length;
          if (j === i) {
            // push underline
            var pad = start - (count - lineLength) + 1;
            var length = end > count ? lineLength - pad : end - start;
            res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
          } else if (j > i) {
            if (end > count) {
              var length$1 = Math.min(end - count, lineLength);
              res.push("   |  " + repeat$1("^", length$1));
            }
            count += lineLength + 1;
          }
        }
        break
      }
    }
    return res.join('\n')
  }

  function repeat$1 (str, n) {
    var result = '';
    if (n > 0) {
      while (true) { // eslint-disable-line
        if (n & 1) { result += str; }
        n >>>= 1;
        if (n <= 0) { break }
        str += str;
      }
    }
    return result
  }

  /*  */



  function createFunction (code, errors) {
    try {
      return new Function(code)
    } catch (err) {
      errors.push({ err: err, code: code });
      return noop
    }
  }

  function createCompileToFunctionFn (compile) {
    var cache = Object.create(null);

    return function compileToFunctions (
      template,
      options,
      vm
    ) {
      options = extend({}, options);
      var warn$$1 = options.warn || warn;
      delete options.warn;

      /* istanbul ignore if */
      {
        // detect possible CSP restriction
        try {
          new Function('return 1');
        } catch (e) {
          if (e.toString().match(/unsafe-eval|CSP/)) {
            warn$$1(
              'It seems you are using the standalone build of Vue.js in an ' +
              'environment with Content Security Policy that prohibits unsafe-eval. ' +
              'The template compiler cannot work in this environment. Consider ' +
              'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
              'templates into render functions.'
            );
          }
        }
      }

      // check cache
      var key = options.delimiters
        ? String(options.delimiters) + template
        : template;
      if (cache[key]) {
        return cache[key]
      }

      // compile
      var compiled = compile(template, options);

      // check compilation errors/tips
      {
        if (compiled.errors && compiled.errors.length) {
          if (options.outputSourceRange) {
            compiled.errors.forEach(function (e) {
              warn$$1(
                "Error compiling template:\n\n" + (e.msg) + "\n\n" +
                generateCodeFrame(template, e.start, e.end),
                vm
              );
            });
          } else {
            warn$$1(
              "Error compiling template:\n\n" + template + "\n\n" +
              compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
              vm
            );
          }
        }
        if (compiled.tips && compiled.tips.length) {
          if (options.outputSourceRange) {
            compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
          } else {
            compiled.tips.forEach(function (msg) { return tip(msg, vm); });
          }
        }
      }

      // turn code into functions
      var res = {};
      var fnGenErrors = [];
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
        return createFunction(code, fnGenErrors)
      });

      // check function generation errors.
      // this should only happen if there is a bug in the compiler itself.
      // mostly for codegen development use
      /* istanbul ignore if */
      {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
          warn$$1(
            "Failed to generate render function:\n\n" +
            fnGenErrors.map(function (ref) {
              var err = ref.err;
              var code = ref.code;

              return ((err.toString()) + " in\n\n" + code + "\n");
          }).join('\n'),
            vm
          );
        }
      }

      return (cache[key] = res)
    }
  }

  /*  */

  function createCompilerCreator (baseCompile) {
    return function createCompiler (baseOptions) {
      function compile (
        template,
        options
      ) {
        var finalOptions = Object.create(baseOptions);
        var errors = [];
        var tips = [];

        var warn = function (msg, range, tip) {
          (tip ? tips : errors).push(msg);
        };

        if (options) {
          if (options.outputSourceRange) {
            // $flow-disable-line
            var leadingSpaceLength = template.match(/^\s*/)[0].length;

            warn = function (msg, range, tip) {
              var data = { msg: msg };
              if (range) {
                if (range.start != null) {
                  data.start = range.start + leadingSpaceLength;
                }
                if (range.end != null) {
                  data.end = range.end + leadingSpaceLength;
                }
              }
              (tip ? tips : errors).push(data);
            };
          }
          // merge custom modules
          if (options.modules) {
            finalOptions.modules =
              (baseOptions.modules || []).concat(options.modules);
          }
          // merge custom directives
          if (options.directives) {
            finalOptions.directives = extend(
              Object.create(baseOptions.directives || null),
              options.directives
            );
          }
          // copy other options
          for (var key in options) {
            if (key !== 'modules' && key !== 'directives') {
              finalOptions[key] = options[key];
            }
          }
        }

        finalOptions.warn = warn;

        var compiled = baseCompile(template.trim(), finalOptions);
        {
          detectErrors(compiled.ast, warn);
        }
        compiled.errors = errors;
        compiled.tips = tips;
        return compiled
      }

      return {
        compile: compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      }
    }
  }

  /*  */

  // `createCompilerCreator` allows creating compilers that use alternative
  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
  // Here we just export a default compiler using the default parts.
  var createCompiler = createCompilerCreator(function baseCompile (
    template,
    options
  ) {
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
      optimize(ast, options);
    }
    var code = generate(ast, options);
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    }
  });

  /*  */

  var ref$1 = createCompiler(baseOptions);
  var compile = ref$1.compile;
  var compileToFunctions = ref$1.compileToFunctions;

  /*  */

  // check whether current browser encodes a char inside attribute values
  var div;
  function getShouldDecode (href) {
    div = div || document.createElement('div');
    div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
    return div.innerHTML.indexOf('&#10;') > 0
  }

  // #3663: IE encodes newlines inside attribute values while other browsers don't
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  // #6828: chrome encodes content in a[href]
  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

  /*  */

  var idToTemplate = cached(function (id) {
    var el = query(id);
    return el && el.innerHTML
  });

  var mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && query(el);

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
      warn(
        "Do not mount Vue to <html> or <body> - mount to normal elements instead."
      );
      return this
    }

    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
      var template = options.template;
      if (template) {
        if (typeof template === 'string') {
          if (template.charAt(0) === '#') {
            template = idToTemplate(template);
            /* istanbul ignore if */
            if (!template) {
              warn(
                ("Template element not found or is empty: " + (options.template)),
                this
              );
            }
          }
        } else if (template.nodeType) {
          template = template.innerHTML;
        } else {
          {
            warn('invalid template option:' + template, this);
          }
          return this
        }
      } else if (el) {
        template = getOuterHTML(el);
      }
      if (template) {
        /* istanbul ignore if */
        if (config.performance && mark) {
          mark('compile');
        }

        var ref = compileToFunctions(template, {
          outputSourceRange: "development" !== 'production',
          shouldDecodeNewlines: shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;

        /* istanbul ignore if */
        if (config.performance && mark) {
          mark('compile end');
          measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
        }
      }
    }
    return mount.call(this, el, hydrating)
  };

  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   */
  function getOuterHTML (el) {
    if (el.outerHTML) {
      return el.outerHTML
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML
    }
  }

  Vue.compile = compileToFunctions;

  return Vue;

}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/src/backend.js":
/*!*******************************!*\
  !*** ./src/js/src/backend.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/js/src/state.js");
/* harmony import */ var _non_vue_components_beToggleReference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./non-vue-components/beToggleReference */ "./src/js/src/non-vue-components/beToggleReference.js");
/* harmony import */ var _scss_backend_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../scss/backend.scss */ "./src/scss/backend.scss");
/* harmony import */ var _scss_backend_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scss_backend_scss__WEBPACK_IMPORTED_MODULE_3__);
// Vue
 // immonex Kickstart State


vue__WEBPACK_IMPORTED_MODULE_0___default.a.mixin(_state__WEBPACK_IMPORTED_MODULE_1__["default"]); // immonex Kickstart Components


inx_state.beToggleReference = _non_vue_components_beToggleReference__WEBPACK_IMPORTED_MODULE_2__["default"]; // (S)CSS


jQuery(document).ready(function ($) {
  $('a[href="#inx-submenu-separator"]').each(function () {
    $(this).parent().html('<div class="inx-submenu-separator"></div>');
  });
  $('#_inx_details_repeat .postbox.cmb-row.cmb-repeatable-grouping').each(function () {
    var elID = $(this).attr('id').match(/[0-9]+$/);
    if (!elID) return;
    var id = elID[0];
    var title = $('#_inx_details_' + id + '_title').val();
    if (!title) return;
    $(this).find('.cmb-group-title > span').append(': ' + title);
  });
});

/***/ }),

/***/ "./src/js/src/non-vue-components/beToggleReference.js":
/*!************************************************************!*\
  !*** ./src/js/src/non-vue-components/beToggleReference.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return beToggleReference; });
function beToggleReference(event) {
  if (!document.getElementById('posts-filter') || !inx_state.rest_nonce) {
    return;
  }

  var propertyId = event.target.getAttribute('data-property-id');

  if (!propertyId) {
    return;
  }

  var apiUrl = inx_state.site_url + '/wp-json/immonex-kickstart/v1/properties/' + propertyId;
  jQuery.ajax({
    type: 'PUT',
    url: apiUrl,
    headers: {
      'X-WP-Nonce': inx_state.rest_nonce
    },
    data: {
      reference: event.target.checked ? 1 : 0
    }
  }).done(function (data) {
    if ('SUCCESS' !== data.status) {
      console.log('immonex Kickstart: Error on saving property reference state!');
    }
  });
} // beToggleReference

/***/ }),

/***/ "./src/js/src/state.js":
/*!*****************************!*\
  !*** ./src/js/src/state.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      inxState: inx_state
    };
  }
});

/***/ }),

/***/ "./src/scss/backend.scss":
/*!*******************************!*\
  !*** ./src/scss/backend.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlL2Rpc3QvdnVlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NyYy9iYWNrZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zcmMvbm9uLXZ1ZS1jb21wb25lbnRzL2JlVG9nZ2xlUmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvYmFja2VuZC5zY3NzP2VmOTEiXSwibmFtZXMiOlsiVnVlIiwibWl4aW4iLCJpbnhTdGF0ZSIsImlueF9zdGF0ZSIsImJlVG9nZ2xlUmVmZXJlbmNlIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSIsIiQiLCJlYWNoIiwicGFyZW50IiwiaHRtbCIsImVsSUQiLCJhdHRyIiwibWF0Y2giLCJpZCIsInRpdGxlIiwidmFsIiwiZmluZCIsImFwcGVuZCIsImV2ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZXN0X25vbmNlIiwicHJvcGVydHlJZCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImFwaVVybCIsInNpdGVfdXJsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiZGF0YSIsInJlZmVyZW5jZSIsImNoZWNrZWQiLCJkb25lIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtR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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQkFBTyxDQUFDLGlFQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sR0FBRztBQUNWO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLHlDQUF5Qyx3QkFBd0IsRUFBRTtBQUNuRSw0QkFBNEI7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEMsb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0JBQW9CLEVBQUU7QUFDdkQ7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsU0FBUyxxQkFBcUI7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsdUJBQXVCO0FBQzNELG1DQUFtQyxzQkFBc0I7QUFDekQ7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLGlDQUFpQztBQUNqQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCOztBQUU1QixvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBCQUEwQjtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msb0JBQW9CLEVBQUU7O0FBRXREO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hELHVCQUF1QiwrQkFBK0I7QUFDdEQ7QUFDQTtBQUNBLEtBQUs7QUFDTCwyQkFBMkI7QUFDM0I7QUFDQSx3QkFBd0IsaUNBQWlDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsMkJBQTJCLEVBQUU7QUFDekUsT0FBTztBQUNQO0FBQ0EsNENBQTRDLDRCQUE0QixFQUFFO0FBQzFFLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsc0JBQXNCOztBQUV2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMERBQTBELG1CQUFtQjtBQUM3RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixhQUFhO0FBQ3RDLHlCQUF5QixhQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRjtBQUNuRiw4QkFBOEI7QUFDOUI7QUFDQSw2QkFBNkI7QUFDN0IsMEJBQTBCLGlFQUFpRTtBQUMzRixjQUFjLDBGQUEwRjtBQUN4RyxRQUFRLEtBQUssMENBQTBDO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGtCQUFrQjtBQUNqRSx3QkFBd0IsK0NBQStDO0FBQ3ZFLG1EQUFtRDs7QUFFbkQ7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDJCQUEyQjtBQUN4RCxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsNkNBQTZDLEVBQUU7QUFDeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCw0QkFBNEIsRUFBRTtBQUNwRixPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwrQkFBK0IsRUFBRTtBQUN2RixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGFBQWE7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMscUNBQXFDOztBQUV4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsdUNBQXVDLEVBQUU7QUFDdEY7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLDJDQUEyQyxFQUFFO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyw4QkFBOEIsRUFBRTtBQUN2RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9DQUFvQyx1Q0FBdUM7O0FBRTNFLHVDQUF1QywwQkFBMEI7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFnRDtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZ0JBQWdCO0FBQzFEO0FBQ0E7QUFDQSxrRUFBa0Usc0JBQXNCLEVBQUU7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHdCQUF3QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx1QkFBdUI7QUFDcEMsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsMkJBQTJCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHlCQUF5QixFQUFFO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFO0FBQzdDLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7O0FBSUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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SztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxvQkFBb0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUyw0QkFBNEI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx3QkFBd0IsRUFBRTtBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFD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QVA7QUFHSDtBQUxVLENBQWYsRTs7Ozs7Ozs7Ozs7QUNBQSx1QyIsImZpbGUiOiJzcmMvanMvYmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL3NyYy9iYWNrZW5kLmpzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwiLyohXG4gKiBWdWUuanMgdjIuNi4xMlxuICogKGMpIDIwMTQtMjAyMCBFdmFuIFlvdVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLlZ1ZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qICAqL1xuXG4gIHZhciBlbXB0eU9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuXG4gIC8vIFRoZXNlIGhlbHBlcnMgcHJvZHVjZSBiZXR0ZXIgVk0gY29kZSBpbiBKUyBlbmdpbmVzIGR1ZSB0byB0aGVpclxuICAvLyBleHBsaWNpdG5lc3MgYW5kIGZ1bmN0aW9uIGlubGluaW5nLlxuICBmdW5jdGlvbiBpc1VuZGVmICh2KSB7XG4gICAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBpc0RlZiAodikge1xuICAgIHJldHVybiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbFxuICB9XG5cbiAgZnVuY3Rpb24gaXNUcnVlICh2KSB7XG4gICAgcmV0dXJuIHYgPT09IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRmFsc2UgKHYpIHtcbiAgICByZXR1cm4gdiA9PT0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB2YWx1ZSBpcyBwcmltaXRpdmUuXG4gICAqL1xuICBmdW5jdGlvbiBpc1ByaW1pdGl2ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fFxuICAgICAgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fFxuICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICB0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnIHx8XG4gICAgICB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJ1xuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAgICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICAgKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gICAqL1xuICBmdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmF3IHR5cGUgc3RyaW5nIG9mIGEgdmFsdWUsIGUuZy4sIFtvYmplY3QgT2JqZWN0XS5cbiAgICovXG4gIHZhciBfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gIGZ1bmN0aW9uIHRvUmF3VHlwZSAodmFsdWUpIHtcbiAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKVxuICB9XG5cbiAgLyoqXG4gICAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAgICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cbiAgICovXG4gIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICAgIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJ1xuICB9XG5cbiAgZnVuY3Rpb24gaXNSZWdFeHAgKHYpIHtcbiAgICByZXR1cm4gX3RvU3RyaW5nLmNhbGwodikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdmFsIGlzIGEgdmFsaWQgYXJyYXkgaW5kZXguXG4gICAqL1xuICBmdW5jdGlvbiBpc1ZhbGlkQXJyYXlJbmRleCAodmFsKSB7XG4gICAgdmFyIG4gPSBwYXJzZUZsb2F0KFN0cmluZyh2YWwpKTtcbiAgICByZXR1cm4gbiA+PSAwICYmIE1hdGguZmxvb3IobikgPT09IG4gJiYgaXNGaW5pdGUodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNQcm9taXNlICh2YWwpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNEZWYodmFsKSAmJlxuICAgICAgdHlwZW9mIHZhbC50aGVuID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgdmFsLmNhdGNoID09PSAnZnVuY3Rpb24nXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGlzIGFjdHVhbGx5IHJlbmRlcmVkLlxuICAgKi9cbiAgZnVuY3Rpb24gdG9TdHJpbmcgKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT0gbnVsbFxuICAgICAgPyAnJ1xuICAgICAgOiBBcnJheS5pc0FycmF5KHZhbCkgfHwgKGlzUGxhaW5PYmplY3QodmFsKSAmJiB2YWwudG9TdHJpbmcgPT09IF90b1N0cmluZylcbiAgICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDIpXG4gICAgICAgIDogU3RyaW5nKHZhbClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFuIGlucHV0IHZhbHVlIHRvIGEgbnVtYmVyIGZvciBwZXJzaXN0ZW5jZS5cbiAgICogSWYgdGhlIGNvbnZlcnNpb24gZmFpbHMsIHJldHVybiBvcmlnaW5hbCBzdHJpbmcuXG4gICAqL1xuICBmdW5jdGlvbiB0b051bWJlciAodmFsKSB7XG4gICAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgcmV0dXJuIGlzTmFOKG4pID8gdmFsIDogblxuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYSBtYXAgYW5kIHJldHVybiBhIGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhIGtleVxuICAgKiBpcyBpbiB0aGF0IG1hcC5cbiAgICovXG4gIGZ1bmN0aW9uIG1ha2VNYXAgKFxuICAgIHN0cixcbiAgICBleHBlY3RzTG93ZXJDYXNlXG4gICkge1xuICAgIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBsaXN0ID0gc3RyLnNwbGl0KCcsJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBtYXBbbGlzdFtpXV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZXhwZWN0c0xvd2VyQ2FzZVxuICAgICAgPyBmdW5jdGlvbiAodmFsKSB7IHJldHVybiBtYXBbdmFsLnRvTG93ZXJDYXNlKCldOyB9XG4gICAgICA6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWxdOyB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgYSBidWlsdC1pbiB0YWcuXG4gICAqL1xuICB2YXIgaXNCdWlsdEluVGFnID0gbWFrZU1hcCgnc2xvdCxjb21wb25lbnQnLCB0cnVlKTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYW4gYXR0cmlidXRlIGlzIGEgcmVzZXJ2ZWQgYXR0cmlidXRlLlxuICAgKi9cbiAgdmFyIGlzUmVzZXJ2ZWRBdHRyaWJ1dGUgPSBtYWtlTWFwKCdrZXkscmVmLHNsb3Qsc2xvdC1zY29wZSxpcycpO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIGFuIGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlIChhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyLmxlbmd0aCkge1xuICAgICAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBhbiBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAgICovXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZ1bmN0aW9uIGhhc093biAob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gICAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGNhY2hlZEZuIChzdHIpIHtcbiAgICAgIHZhciBoaXQgPSBjYWNoZVtzdHJdO1xuICAgICAgcmV0dXJuIGhpdCB8fCAoY2FjaGVbc3RyXSA9IGZuKHN0cikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxpbWl0ZWQgc3RyaW5nLlxuICAgKi9cbiAgdmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG4gIHZhciBjYW1lbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJyc7IH0pXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxuICAgKi9cbiAgdmFyIGNhcGl0YWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gICAqL1xuICB2YXIgaHlwaGVuYXRlUkUgPSAvXFxCKFtBLVpdKS9nO1xuICB2YXIgaHlwaGVuYXRlID0gY2FjaGVkKGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoaHlwaGVuYXRlUkUsICctJDEnKS50b0xvd2VyQ2FzZSgpXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBTaW1wbGUgYmluZCBwb2x5ZmlsbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IHN1cHBvcnQgaXQsXG4gICAqIGUuZy4sIFBoYW50b21KUyAxLnguIFRlY2huaWNhbGx5LCB3ZSBkb24ndCBuZWVkIHRoaXMgYW55bW9yZVxuICAgKiBzaW5jZSBuYXRpdmUgYmluZCBpcyBub3cgcGVyZm9ybWFudCBlbm91Z2ggaW4gbW9zdCBicm93c2Vycy5cbiAgICogQnV0IHJlbW92aW5nIGl0IHdvdWxkIG1lYW4gYnJlYWtpbmcgY29kZSB0aGF0IHdhcyBhYmxlIHRvIHJ1biBpblxuICAgKiBQaGFudG9tSlMgMS54LCBzbyB0aGlzIG11c3QgYmUga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cbiAgICovXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZnVuY3Rpb24gcG9seWZpbGxCaW5kIChmbiwgY3R4KSB7XG4gICAgZnVuY3Rpb24gYm91bmRGbiAoYSkge1xuICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgcmV0dXJuIGxcbiAgICAgICAgPyBsID4gMVxuICAgICAgICAgID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG4gICAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgICAgOiBmbi5jYWxsKGN0eClcbiAgICB9XG5cbiAgICBib3VuZEZuLl9sZW5ndGggPSBmbi5sZW5ndGg7XG4gICAgcmV0dXJuIGJvdW5kRm5cbiAgfVxuXG4gIGZ1bmN0aW9uIG5hdGl2ZUJpbmQgKGZuLCBjdHgpIHtcbiAgICByZXR1cm4gZm4uYmluZChjdHgpXG4gIH1cblxuICB2YXIgYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG4gICAgPyBuYXRpdmVCaW5kXG4gICAgOiBwb2x5ZmlsbEJpbmQ7XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcbiAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoaSk7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gZXh0ZW5kICh0bywgX2Zyb20pIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gX2Zyb20pIHtcbiAgICAgIHRvW2tleV0gPSBfZnJvbVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gdG9cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSBhbiBBcnJheSBvZiBPYmplY3RzIGludG8gYSBzaW5nbGUgT2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gdG9PYmplY3QgKGFycikge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycltpXSkge1xuICAgICAgICBleHRlbmQocmVzLCBhcnJbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtIG5vIG9wZXJhdGlvbi5cbiAgICogU3R1YmJpbmcgYXJncyB0byBtYWtlIEZsb3cgaGFwcHkgd2l0aG91dCBsZWF2aW5nIHVzZWxlc3MgdHJhbnNwaWxlZCBjb2RlXG4gICAqIHdpdGggLi4ucmVzdCAoaHR0cHM6Ly9mbG93Lm9yZy9ibG9nLzIwMTcvMDUvMDcvU3RyaWN0LUZ1bmN0aW9uLUNhbGwtQXJpdHkvKS5cbiAgICovXG4gIGZ1bmN0aW9uIG5vb3AgKGEsIGIsIGMpIHt9XG5cbiAgLyoqXG4gICAqIEFsd2F5cyByZXR1cm4gZmFsc2UuXG4gICAqL1xuICB2YXIgbm8gPSBmdW5jdGlvbiAoYSwgYiwgYykgeyByZXR1cm4gZmFsc2U7IH07XG5cbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHNhbWUgdmFsdWUuXG4gICAqL1xuICB2YXIgaWRlbnRpdHkgPSBmdW5jdGlvbiAoXykgeyByZXR1cm4gXzsgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBzdHJpbmcgY29udGFpbmluZyBzdGF0aWMga2V5cyBmcm9tIGNvbXBpbGVyIG1vZHVsZXMuXG4gICAqL1xuICBmdW5jdGlvbiBnZW5TdGF0aWNLZXlzIChtb2R1bGVzKSB7XG4gICAgcmV0dXJuIG1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChrZXlzLCBtKSB7XG4gICAgICByZXR1cm4ga2V5cy5jb25jYXQobS5zdGF0aWNLZXlzIHx8IFtdKVxuICAgIH0sIFtdKS5qb2luKCcsJylcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gdmFsdWVzIGFyZSBsb29zZWx5IGVxdWFsIC0gdGhhdCBpcyxcbiAgICogaWYgdGhleSBhcmUgcGxhaW4gb2JqZWN0cywgZG8gdGhleSBoYXZlIHRoZSBzYW1lIHNoYXBlP1xuICAgKi9cbiAgZnVuY3Rpb24gbG9vc2VFcXVhbCAoYSwgYikge1xuICAgIGlmIChhID09PSBiKSB7IHJldHVybiB0cnVlIH1cbiAgICB2YXIgaXNPYmplY3RBID0gaXNPYmplY3QoYSk7XG4gICAgdmFyIGlzT2JqZWN0QiA9IGlzT2JqZWN0KGIpO1xuICAgIGlmIChpc09iamVjdEEgJiYgaXNPYmplY3RCKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgaXNBcnJheUEgPSBBcnJheS5pc0FycmF5KGEpO1xuICAgICAgICB2YXIgaXNBcnJheUIgPSBBcnJheS5pc0FycmF5KGIpO1xuICAgICAgICBpZiAoaXNBcnJheUEgJiYgaXNBcnJheUIpIHtcbiAgICAgICAgICByZXR1cm4gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGUsIGJbaV0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcbiAgICAgICAgfSBlbHNlIGlmICghaXNBcnJheUEgJiYgIWlzQXJyYXlCKSB7XG4gICAgICAgICAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMoYSk7XG4gICAgICAgICAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMoYik7XG4gICAgICAgICAgcmV0dXJuIGtleXNBLmxlbmd0aCA9PT0ga2V5c0IubGVuZ3RoICYmIGtleXNBLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29zZUVxdWFsKGFba2V5XSwgYltrZXldKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc09iamVjdEEgJiYgIWlzT2JqZWN0Qikge1xuICAgICAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGZpcnN0IGluZGV4IGF0IHdoaWNoIGEgbG9vc2VseSBlcXVhbCB2YWx1ZSBjYW4gYmVcbiAgICogZm91bmQgaW4gdGhlIGFycmF5IChpZiB2YWx1ZSBpcyBhIHBsYWluIG9iamVjdCwgdGhlIGFycmF5IG11c3RcbiAgICogY29udGFpbiBhbiBvYmplY3Qgb2YgdGhlIHNhbWUgc2hhcGUpLCBvciAtMSBpZiBpdCBpcyBub3QgcHJlc2VudC5cbiAgICovXG4gIGZ1bmN0aW9uIGxvb3NlSW5kZXhPZiAoYXJyLCB2YWwpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxvb3NlRXF1YWwoYXJyW2ldLCB2YWwpKSB7IHJldHVybiBpIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIGEgZnVuY3Rpb24gaXMgY2FsbGVkIG9ubHkgb25jZS5cbiAgICovXG4gIGZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBTU1JfQVRUUiA9ICdkYXRhLXNlcnZlci1yZW5kZXJlZCc7XG5cbiAgdmFyIEFTU0VUX1RZUEVTID0gW1xuICAgICdjb21wb25lbnQnLFxuICAgICdkaXJlY3RpdmUnLFxuICAgICdmaWx0ZXInXG4gIF07XG5cbiAgdmFyIExJRkVDWUNMRV9IT09LUyA9IFtcbiAgICAnYmVmb3JlQ3JlYXRlJyxcbiAgICAnY3JlYXRlZCcsXG4gICAgJ2JlZm9yZU1vdW50JyxcbiAgICAnbW91bnRlZCcsXG4gICAgJ2JlZm9yZVVwZGF0ZScsXG4gICAgJ3VwZGF0ZWQnLFxuICAgICdiZWZvcmVEZXN0cm95JyxcbiAgICAnZGVzdHJveWVkJyxcbiAgICAnYWN0aXZhdGVkJyxcbiAgICAnZGVhY3RpdmF0ZWQnLFxuICAgICdlcnJvckNhcHR1cmVkJyxcbiAgICAnc2VydmVyUHJlZmV0Y2gnXG4gIF07XG5cbiAgLyogICovXG5cblxuXG4gIHZhciBjb25maWcgPSAoe1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiBtZXJnZSBzdHJhdGVnaWVzICh1c2VkIGluIGNvcmUvdXRpbC9vcHRpb25zKVxuICAgICAqL1xuICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgIG9wdGlvbk1lcmdlU3RyYXRlZ2llczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc3VwcHJlc3Mgd2FybmluZ3MuXG4gICAgICovXG4gICAgc2lsZW50OiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFNob3cgcHJvZHVjdGlvbiBtb2RlIHRpcCBtZXNzYWdlIG9uIGJvb3Q/XG4gICAgICovXG4gICAgcHJvZHVjdGlvblRpcDogXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicsXG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkZXZ0b29sc1xuICAgICAqL1xuICAgIGRldnRvb2xzOiBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gcmVjb3JkIHBlcmZcbiAgICAgKi9cbiAgICBwZXJmb3JtYW5jZTogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBFcnJvciBoYW5kbGVyIGZvciB3YXRjaGVyIGVycm9yc1xuICAgICAqL1xuICAgIGVycm9ySGFuZGxlcjogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIFdhcm4gaGFuZGxlciBmb3Igd2F0Y2hlciB3YXJuc1xuICAgICAqL1xuICAgIHdhcm5IYW5kbGVyOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogSWdub3JlIGNlcnRhaW4gY3VzdG9tIGVsZW1lbnRzXG4gICAgICovXG4gICAgaWdub3JlZEVsZW1lbnRzOiBbXSxcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSB1c2VyIGtleSBhbGlhc2VzIGZvciB2LW9uXG4gICAgICovXG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAga2V5Q29kZXM6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIHRhZyBpcyByZXNlcnZlZCBzbyB0aGF0IGl0IGNhbm5vdCBiZSByZWdpc3RlcmVkIGFzIGFcbiAgICAgKiBjb21wb25lbnQuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAgICovXG4gICAgaXNSZXNlcnZlZFRhZzogbm8sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhbiBhdHRyaWJ1dGUgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgdXNlZCBhcyBhIGNvbXBvbmVudFxuICAgICAqIHByb3AuIFRoaXMgaXMgcGxhdGZvcm0tZGVwZW5kZW50IGFuZCBtYXkgYmUgb3ZlcndyaXR0ZW4uXG4gICAgICovXG4gICAgaXNSZXNlcnZlZEF0dHI6IG5vLFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB0YWcgaXMgYW4gdW5rbm93biBlbGVtZW50LlxuICAgICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICAgKi9cbiAgICBpc1Vua25vd25FbGVtZW50OiBubyxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmFtZXNwYWNlIG9mIGFuIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRUYWdOYW1lc3BhY2U6IG5vb3AsXG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgcmVhbCB0YWcgbmFtZSBmb3IgdGhlIHNwZWNpZmljIHBsYXRmb3JtLlxuICAgICAqL1xuICAgIHBhcnNlUGxhdGZvcm1UYWdOYW1lOiBpZGVudGl0eSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBtdXN0IGJlIGJvdW5kIHVzaW5nIHByb3BlcnR5LCBlLmcuIHZhbHVlXG4gICAgICogUGxhdGZvcm0tZGVwZW5kZW50LlxuICAgICAqL1xuICAgIG11c3RVc2VQcm9wOiBubyxcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gdXBkYXRlcyBhc3luY2hyb25vdXNseS4gSW50ZW5kZWQgdG8gYmUgdXNlZCBieSBWdWUgVGVzdCBVdGlsc1xuICAgICAqIFRoaXMgd2lsbCBzaWduaWZpY2FudGx5IHJlZHVjZSBwZXJmb3JtYW5jZSBpZiBzZXQgdG8gZmFsc2UuXG4gICAgICovXG4gICAgYXN5bmM6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2VkIGZvciBsZWdhY3kgcmVhc29uc1xuICAgICAqL1xuICAgIF9saWZlY3ljbGVIb29rczogTElGRUNZQ0xFX0hPT0tTXG4gIH0pO1xuXG4gIC8qICAqL1xuXG4gIC8qKlxuICAgKiB1bmljb2RlIGxldHRlcnMgdXNlZCBmb3IgcGFyc2luZyBodG1sIHRhZ3MsIGNvbXBvbmVudCBuYW1lcyBhbmQgcHJvcGVydHkgcGF0aHMuXG4gICAqIHVzaW5nIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNTMvc2VtYW50aWNzLXNjcmlwdGluZy5odG1sI3BvdGVudGlhbGN1c3RvbWVsZW1lbnRuYW1lXG4gICAqIHNraXBwaW5nIFxcdTEwMDAwLVxcdUVGRkZGIGR1ZSB0byBpdCBmcmVlemluZyB1cCBQaGFudG9tSlNcbiAgICovXG4gIHZhciB1bmljb2RlUmVnRXhwID0gL2EtekEtWlxcdTAwQjdcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDNGLVxcdTIwNDBcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkQvO1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cbiAgICovXG4gIGZ1bmN0aW9uIGlzUmVzZXJ2ZWQgKHN0cikge1xuICAgIHZhciBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApO1xuICAgIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYSBwcm9wZXJ0eS5cbiAgICovXG4gIGZ1bmN0aW9uIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbCxcbiAgICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc2ltcGxlIHBhdGguXG4gICAqL1xuICB2YXIgYmFpbFJFID0gbmV3IFJlZ0V4cCgoXCJbXlwiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiLiRfXFxcXGRdXCIpKTtcbiAgZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG4gICAgaWYgKGJhaWxSRS50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIHNlZ21lbnRzID0gcGF0aC5zcGxpdCgnLicpO1xuICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghb2JqKSB7IHJldHVybiB9XG4gICAgICAgIG9iaiA9IG9ialtzZWdtZW50c1tpXV07XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgLy8gY2FuIHdlIHVzZSBfX3Byb3RvX18/XG4gIHZhciBoYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9O1xuXG4gIC8vIEJyb3dzZXIgZW52aXJvbm1lbnQgc25pZmZpbmdcbiAgdmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuICB2YXIgaW5XZWV4ID0gdHlwZW9mIFdYRW52aXJvbm1lbnQgIT09ICd1bmRlZmluZWQnICYmICEhV1hFbnZpcm9ubWVudC5wbGF0Zm9ybTtcbiAgdmFyIHdlZXhQbGF0Zm9ybSA9IGluV2VleCAmJiBXWEVudmlyb25tZW50LnBsYXRmb3JtLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgaXNJRSA9IFVBICYmIC9tc2llfHRyaWRlbnQvLnRlc3QoVUEpO1xuICB2YXIgaXNJRTkgPSBVQSAmJiBVQS5pbmRleE9mKCdtc2llIDkuMCcpID4gMDtcbiAgdmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xuICB2YXIgaXNBbmRyb2lkID0gKFVBICYmIFVBLmluZGV4T2YoJ2FuZHJvaWQnKSA+IDApIHx8ICh3ZWV4UGxhdGZvcm0gPT09ICdhbmRyb2lkJyk7XG4gIHZhciBpc0lPUyA9IChVQSAmJiAvaXBob25lfGlwYWR8aXBvZHxpb3MvLnRlc3QoVUEpKSB8fCAod2VleFBsYXRmb3JtID09PSAnaW9zJyk7XG4gIHZhciBpc0Nocm9tZSA9IFVBICYmIC9jaHJvbWVcXC9cXGQrLy50ZXN0KFVBKSAmJiAhaXNFZGdlO1xuICB2YXIgaXNQaGFudG9tSlMgPSBVQSAmJiAvcGhhbnRvbWpzLy50ZXN0KFVBKTtcbiAgdmFyIGlzRkYgPSBVQSAmJiBVQS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pO1xuXG4gIC8vIEZpcmVmb3ggaGFzIGEgXCJ3YXRjaFwiIGZ1bmN0aW9uIG9uIE9iamVjdC5wcm90b3R5cGUuLi5cbiAgdmFyIG5hdGl2ZVdhdGNoID0gKHt9KS53YXRjaDtcblxuICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG4gIGlmIChpbkJyb3dzZXIpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG9wdHMgPSB7fTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvcHRzLCAncGFzc2l2ZScsICh7XG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKTsgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QtcGFzc2l2ZScsIG51bGwsIG9wdHMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICAvLyB0aGlzIG5lZWRzIHRvIGJlIGxhenktZXZhbGVkIGJlY2F1c2UgdnVlIG1heSBiZSByZXF1aXJlZCBiZWZvcmVcbiAgLy8gdnVlLXNlcnZlci1yZW5kZXJlciBjYW4gc2V0IFZVRV9FTlZcbiAgdmFyIF9pc1NlcnZlcjtcbiAgdmFyIGlzU2VydmVyUmVuZGVyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChfaXNTZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIWluQnJvd3NlciAmJiAhaW5XZWV4ICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGRldGVjdCBwcmVzZW5jZSBvZiB2dWUtc2VydmVyLXJlbmRlcmVyIGFuZCBhdm9pZFxuICAgICAgICAvLyBXZWJwYWNrIHNoaW1taW5nIHRoZSBwcm9jZXNzXG4gICAgICAgIF9pc1NlcnZlciA9IGdsb2JhbFsncHJvY2VzcyddICYmIGdsb2JhbFsncHJvY2VzcyddLmVudi5WVUVfRU5WID09PSAnc2VydmVyJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9pc1NlcnZlciA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2lzU2VydmVyXG4gIH07XG5cbiAgLy8gZGV0ZWN0IGRldnRvb2xzXG4gIHZhciBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBmdW5jdGlvbiBpc05hdGl2ZSAoQ3Rvcikge1xuICAgIHJldHVybiB0eXBlb2YgQ3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoQ3Rvci50b1N0cmluZygpKVxuICB9XG5cbiAgdmFyIGhhc1N5bWJvbCA9XG4gICAgdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoU3ltYm9sKSAmJlxuICAgIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpO1xuXG4gIHZhciBfU2V0O1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi8gLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gIGlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTZXQpKSB7XG4gICAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXG4gICAgX1NldCA9IFNldDtcbiAgfSBlbHNlIHtcbiAgICAvLyBhIG5vbi1zdGFuZGFyZCBTZXQgcG9seWZpbGwgdGhhdCBvbmx5IHdvcmtzIHdpdGggcHJpbWl0aXZlIGtleXMuXG4gICAgX1NldCA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gU2V0ICgpIHtcbiAgICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgfVxuICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRba2V5XSA9PT0gdHJ1ZVxuICAgICAgfTtcbiAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkIChrZXkpIHtcbiAgICAgICAgdGhpcy5zZXRba2V5XSA9IHRydWU7XG4gICAgICB9O1xuICAgICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5zZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNldDtcbiAgICB9KCkpO1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIHdhcm4gPSBub29wO1xuICB2YXIgdGlwID0gbm9vcDtcbiAgdmFyIGdlbmVyYXRlQ29tcG9uZW50VHJhY2UgPSAobm9vcCk7IC8vIHdvcmsgYXJvdW5kIGZsb3cgY2hlY2tcbiAgdmFyIGZvcm1hdENvbXBvbmVudE5hbWUgPSAobm9vcCk7XG5cbiAge1xuICAgIHZhciBoYXNDb25zb2xlID0gdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnO1xuICAgIHZhciBjbGFzc2lmeVJFID0gLyg/Ol58Wy1fXSkoXFx3KS9nO1xuICAgIHZhciBjbGFzc2lmeSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0clxuICAgICAgLnJlcGxhY2UoY2xhc3NpZnlSRSwgZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMudG9VcHBlckNhc2UoKTsgfSlcbiAgICAgIC5yZXBsYWNlKC9bLV9dL2csICcnKTsgfTtcblxuICAgIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgICAgdmFyIHRyYWNlID0gdm0gPyBnZW5lcmF0ZUNvbXBvbmVudFRyYWNlKHZtKSA6ICcnO1xuXG4gICAgICBpZiAoY29uZmlnLndhcm5IYW5kbGVyKSB7XG4gICAgICAgIGNvbmZpZy53YXJuSGFuZGxlci5jYWxsKG51bGwsIG1zZywgdm0sIHRyYWNlKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzQ29uc29sZSAmJiAoIWNvbmZpZy5zaWxlbnQpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW1Z1ZSB3YXJuXTogXCIgKyBtc2cgKyB0cmFjZSkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aXAgPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgICAgaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50KSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbVnVlIHRpcF06IFwiICsgbXNnICsgKFxuICAgICAgICAgIHZtID8gZ2VuZXJhdGVDb21wb25lbnRUcmFjZSh2bSkgOiAnJ1xuICAgICAgICApKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9ybWF0Q29tcG9uZW50TmFtZSA9IGZ1bmN0aW9uICh2bSwgaW5jbHVkZUZpbGUpIHtcbiAgICAgIGlmICh2bS4kcm9vdCA9PT0gdm0pIHtcbiAgICAgICAgcmV0dXJuICc8Um9vdD4nXG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiB2bSA9PT0gJ2Z1bmN0aW9uJyAmJiB2bS5jaWQgIT0gbnVsbFxuICAgICAgICA/IHZtLm9wdGlvbnNcbiAgICAgICAgOiB2bS5faXNWdWVcbiAgICAgICAgICA/IHZtLiRvcHRpb25zIHx8IHZtLmNvbnN0cnVjdG9yLm9wdGlvbnNcbiAgICAgICAgICA6IHZtO1xuICAgICAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgfHwgb3B0aW9ucy5fY29tcG9uZW50VGFnO1xuICAgICAgdmFyIGZpbGUgPSBvcHRpb25zLl9fZmlsZTtcbiAgICAgIGlmICghbmFtZSAmJiBmaWxlKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGZpbGUubWF0Y2goLyhbXi9cXFxcXSspXFwudnVlJC8pO1xuICAgICAgICBuYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIChuYW1lID8gKFwiPFwiICsgKGNsYXNzaWZ5KG5hbWUpKSArIFwiPlwiKSA6IFwiPEFub255bW91cz5cIikgK1xuICAgICAgICAoZmlsZSAmJiBpbmNsdWRlRmlsZSAhPT0gZmFsc2UgPyAoXCIgYXQgXCIgKyBmaWxlKSA6ICcnKVxuICAgICAgKVxuICAgIH07XG5cbiAgICB2YXIgcmVwZWF0ID0gZnVuY3Rpb24gKHN0ciwgbikge1xuICAgICAgdmFyIHJlcyA9ICcnO1xuICAgICAgd2hpbGUgKG4pIHtcbiAgICAgICAgaWYgKG4gJSAyID09PSAxKSB7IHJlcyArPSBzdHI7IH1cbiAgICAgICAgaWYgKG4gPiAxKSB7IHN0ciArPSBzdHI7IH1cbiAgICAgICAgbiA+Pj0gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVDb21wb25lbnRUcmFjZSA9IGZ1bmN0aW9uICh2bSkge1xuICAgICAgaWYgKHZtLl9pc1Z1ZSAmJiB2bS4kcGFyZW50KSB7XG4gICAgICAgIHZhciB0cmVlID0gW107XG4gICAgICAgIHZhciBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgICB3aGlsZSAodm0pIHtcbiAgICAgICAgICBpZiAodHJlZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IHRyZWVbdHJlZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0LmNvbnN0cnVjdG9yID09PSB2bS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UrKztcbiAgICAgICAgICAgICAgdm0gPSB2bS4kcGFyZW50O1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPiAwKSB7XG4gICAgICAgICAgICAgIHRyZWVbdHJlZS5sZW5ndGggLSAxXSA9IFtsYXN0LCBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2VdO1xuICAgICAgICAgICAgICBjdXJyZW50UmVjdXJzaXZlU2VxdWVuY2UgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0cmVlLnB1c2godm0pO1xuICAgICAgICAgIHZtID0gdm0uJHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ1xcblxcbmZvdW5kIGluXFxuXFxuJyArIHRyZWVcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uICh2bSwgaSkgeyByZXR1cm4gKFwiXCIgKyAoaSA9PT0gMCA/ICctLS0+ICcgOiByZXBlYXQoJyAnLCA1ICsgaSAqIDIpKSArIChBcnJheS5pc0FycmF5KHZtKVxuICAgICAgICAgICAgICA/ICgoZm9ybWF0Q29tcG9uZW50TmFtZSh2bVswXSkpICsgXCIuLi4gKFwiICsgKHZtWzFdKSArIFwiIHJlY3Vyc2l2ZSBjYWxscylcIilcbiAgICAgICAgICAgICAgOiBmb3JtYXRDb21wb25lbnROYW1lKHZtKSkpOyB9KVxuICAgICAgICAgIC5qb2luKCdcXG4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChcIlxcblxcbihmb3VuZCBpbiBcIiArIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIilcIilcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIHVpZCA9IDA7XG5cbiAgLyoqXG4gICAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICAgKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICAgKi9cbiAgdmFyIERlcCA9IGZ1bmN0aW9uIERlcCAoKSB7XG4gICAgdGhpcy5pZCA9IHVpZCsrO1xuICAgIHRoaXMuc3VicyA9IFtdO1xuICB9O1xuXG4gIERlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gYWRkU3ViIChzdWIpIHtcbiAgICB0aGlzLnN1YnMucHVzaChzdWIpO1xuICB9O1xuXG4gIERlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gcmVtb3ZlU3ViIChzdWIpIHtcbiAgICByZW1vdmUodGhpcy5zdWJzLCBzdWIpO1xuICB9O1xuXG4gIERlcC5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgRGVwLnRhcmdldC5hZGREZXAodGhpcyk7XG4gICAgfVxuICB9O1xuXG4gIERlcC5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gbm90aWZ5ICgpIHtcbiAgICAvLyBzdGFiaWxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICAgIHZhciBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKCk7XG4gICAgaWYgKCFjb25maWcuYXN5bmMpIHtcbiAgICAgIC8vIHN1YnMgYXJlbid0IHNvcnRlZCBpbiBzY2hlZHVsZXIgaWYgbm90IHJ1bm5pbmcgYXN5bmNcbiAgICAgIC8vIHdlIG5lZWQgdG8gc29ydCB0aGVtIG5vdyB0byBtYWtlIHN1cmUgdGhleSBmaXJlIGluIGNvcnJlY3RcbiAgICAgIC8vIG9yZGVyXG4gICAgICBzdWJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgc3Vic1tpXS51cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gVGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuICAvLyBUaGlzIGlzIGdsb2JhbGx5IHVuaXF1ZSBiZWNhdXNlIG9ubHkgb25lIHdhdGNoZXJcbiAgLy8gY2FuIGJlIGV2YWx1YXRlZCBhdCBhIHRpbWUuXG4gIERlcC50YXJnZXQgPSBudWxsO1xuICB2YXIgdGFyZ2V0U3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBwdXNoVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICB0YXJnZXRTdGFjay5wdXNoKHRhcmdldCk7XG4gICAgRGVwLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcFRhcmdldCAoKSB7XG4gICAgdGFyZ2V0U3RhY2sucG9wKCk7XG4gICAgRGVwLnRhcmdldCA9IHRhcmdldFN0YWNrW3RhcmdldFN0YWNrLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIFZOb2RlID0gZnVuY3Rpb24gVk5vZGUgKFxuICAgIHRhZyxcbiAgICBkYXRhLFxuICAgIGNoaWxkcmVuLFxuICAgIHRleHQsXG4gICAgZWxtLFxuICAgIGNvbnRleHQsXG4gICAgY29tcG9uZW50T3B0aW9ucyxcbiAgICBhc3luY0ZhY3RvcnlcbiAgKSB7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLmVsbSA9IGVsbTtcbiAgICB0aGlzLm5zID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5mbkNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5mbk9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5mblNjb3BlSWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5rZXkgPSBkYXRhICYmIGRhdGEua2V5O1xuICAgIHRoaXMuY29tcG9uZW50T3B0aW9ucyA9IGNvbXBvbmVudE9wdGlvbnM7XG4gICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJhdyA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICB0aGlzLmlzUm9vdEluc2VydCA9IHRydWU7XG4gICAgdGhpcy5pc0NvbW1lbnQgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2xvbmVkID0gZmFsc2U7XG4gICAgdGhpcy5pc09uY2UgPSBmYWxzZTtcbiAgICB0aGlzLmFzeW5jRmFjdG9yeSA9IGFzeW5jRmFjdG9yeTtcbiAgICB0aGlzLmFzeW5jTWV0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmlzQXN5bmNQbGFjZWhvbGRlciA9IGZhbHNlO1xuICB9O1xuXG4gIHZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGNoaWxkOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbiAgLy8gREVQUkVDQVRFRDogYWxpYXMgZm9yIGNvbXBvbmVudEluc3RhbmNlIGZvciBiYWNrd2FyZHMgY29tcGF0LlxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBwcm90b3R5cGVBY2Nlc3NvcnMuY2hpbGQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEluc3RhbmNlXG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFZOb2RlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbiAgdmFyIGNyZWF0ZUVtcHR5Vk5vZGUgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIGlmICggdGV4dCA9PT0gdm9pZCAwICkgdGV4dCA9ICcnO1xuXG4gICAgdmFyIG5vZGUgPSBuZXcgVk5vZGUoKTtcbiAgICBub2RlLnRleHQgPSB0ZXh0O1xuICAgIG5vZGUuaXNDb21tZW50ID0gdHJ1ZTtcbiAgICByZXR1cm4gbm9kZVxuICB9O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRleHRWTm9kZSAodmFsKSB7XG4gICAgcmV0dXJuIG5ldyBWTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcodmFsKSlcbiAgfVxuXG4gIC8vIG9wdGltaXplZCBzaGFsbG93IGNsb25lXG4gIC8vIHVzZWQgZm9yIHN0YXRpYyBub2RlcyBhbmQgc2xvdCBub2RlcyBiZWNhdXNlIHRoZXkgbWF5IGJlIHJldXNlZCBhY3Jvc3NcbiAgLy8gbXVsdGlwbGUgcmVuZGVycywgY2xvbmluZyB0aGVtIGF2b2lkcyBlcnJvcnMgd2hlbiBET00gbWFuaXB1bGF0aW9ucyByZWx5XG4gIC8vIG9uIHRoZWlyIGVsbSByZWZlcmVuY2UuXG4gIGZ1bmN0aW9uIGNsb25lVk5vZGUgKHZub2RlKSB7XG4gICAgdmFyIGNsb25lZCA9IG5ldyBWTm9kZShcbiAgICAgIHZub2RlLnRhZyxcbiAgICAgIHZub2RlLmRhdGEsXG4gICAgICAvLyAjNzk3NVxuICAgICAgLy8gY2xvbmUgY2hpbGRyZW4gYXJyYXkgdG8gYXZvaWQgbXV0YXRpbmcgb3JpZ2luYWwgaW4gY2FzZSBvZiBjbG9uaW5nXG4gICAgICAvLyBhIGNoaWxkLlxuICAgICAgdm5vZGUuY2hpbGRyZW4gJiYgdm5vZGUuY2hpbGRyZW4uc2xpY2UoKSxcbiAgICAgIHZub2RlLnRleHQsXG4gICAgICB2bm9kZS5lbG0sXG4gICAgICB2bm9kZS5jb250ZXh0LFxuICAgICAgdm5vZGUuY29tcG9uZW50T3B0aW9ucyxcbiAgICAgIHZub2RlLmFzeW5jRmFjdG9yeVxuICAgICk7XG4gICAgY2xvbmVkLm5zID0gdm5vZGUubnM7XG4gICAgY2xvbmVkLmlzU3RhdGljID0gdm5vZGUuaXNTdGF0aWM7XG4gICAgY2xvbmVkLmtleSA9IHZub2RlLmtleTtcbiAgICBjbG9uZWQuaXNDb21tZW50ID0gdm5vZGUuaXNDb21tZW50O1xuICAgIGNsb25lZC5mbkNvbnRleHQgPSB2bm9kZS5mbkNvbnRleHQ7XG4gICAgY2xvbmVkLmZuT3B0aW9ucyA9IHZub2RlLmZuT3B0aW9ucztcbiAgICBjbG9uZWQuZm5TY29wZUlkID0gdm5vZGUuZm5TY29wZUlkO1xuICAgIGNsb25lZC5hc3luY01ldGEgPSB2bm9kZS5hc3luY01ldGE7XG4gICAgY2xvbmVkLmlzQ2xvbmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICAvKlxuICAgKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGhcbiAgICogZHluYW1pY2FsbHkgYWNjZXNzaW5nIG1ldGhvZHMgb24gQXJyYXkgcHJvdG90eXBlXG4gICAqL1xuXG4gIHZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuICB2YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKTtcblxuICB2YXIgbWV0aG9kc1RvUGF0Y2ggPSBbXG4gICAgJ3B1c2gnLFxuICAgICdwb3AnLFxuICAgICdzaGlmdCcsXG4gICAgJ3Vuc2hpZnQnLFxuICAgICdzcGxpY2UnLFxuICAgICdzb3J0JyxcbiAgICAncmV2ZXJzZSdcbiAgXTtcblxuICAvKipcbiAgICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gICAqL1xuICBtZXRob2RzVG9QYXRjaC5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF07XG4gICAgZGVmKGFycmF5TWV0aG9kcywgbWV0aG9kLCBmdW5jdGlvbiBtdXRhdG9yICgpIHtcbiAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB2YXIgb2IgPSB0aGlzLl9fb2JfXztcbiAgICAgIHZhciBpbnNlcnRlZDtcbiAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgICBpbnNlcnRlZCA9IGFyZ3M7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMik7XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGlmIChpbnNlcnRlZCkgeyBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpOyB9XG4gICAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgICBvYi5kZXAubm90aWZ5KCk7XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qICAqL1xuXG4gIHZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpO1xuXG4gIC8qKlxuICAgKiBJbiBzb21lIGNhc2VzIHdlIG1heSB3YW50IHRvIGRpc2FibGUgb2JzZXJ2YXRpb24gaW5zaWRlIGEgY29tcG9uZW50J3NcbiAgICogdXBkYXRlIGNvbXB1dGF0aW9uLlxuICAgKi9cbiAgdmFyIHNob3VsZE9ic2VydmUgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZU9ic2VydmluZyAodmFsdWUpIHtcbiAgICBzaG91bGRPYnNlcnZlID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBpcyBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gICAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRoZSB0YXJnZXRcbiAgICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAgICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoIHVwZGF0ZXMuXG4gICAqL1xuICB2YXIgT2JzZXJ2ZXIgPSBmdW5jdGlvbiBPYnNlcnZlciAodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5kZXAgPSBuZXcgRGVwKCk7XG4gICAgdGhpcy52bUNvdW50ID0gMDtcbiAgICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGlmIChoYXNQcm90bykge1xuICAgICAgICBwcm90b0F1Z21lbnQodmFsdWUsIGFycmF5TWV0aG9kcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3B5QXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhbGsodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogV2FsayB0aHJvdWdoIGFsbCBwcm9wZXJ0aWVzIGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICAgKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAgICogdmFsdWUgdHlwZSBpcyBPYmplY3QuXG4gICAqL1xuICBPYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIHdhbGsgKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlZmluZVJlYWN0aXZlJCQxKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAgICovXG4gIE9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiBvYnNlcnZlQXJyYXkgKGl0ZW1zKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9ic2VydmUoaXRlbXNbaV0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBoZWxwZXJzXG5cbiAgLyoqXG4gICAqIEF1Z21lbnQgYSB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICAgKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICAgKi9cbiAgZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG4gICAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyYztcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXByb3RvICovXG4gIH1cblxuICAvKipcbiAgICogQXVnbWVudCBhIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAgICogaGlkZGVuIHByb3BlcnRpZXMuXG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBmdW5jdGlvbiBjb3B5QXVnbWVudCAodGFyZ2V0LCBzcmMsIGtleXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAgICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAgICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSwgYXNSb290RGF0YSkge1xuICAgIGlmICghaXNPYmplY3QodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgb2I7XG4gICAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgICBvYiA9IHZhbHVlLl9fb2JfXztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgc2hvdWxkT2JzZXJ2ZSAmJlxuICAgICAgIWlzU2VydmVyUmVuZGVyaW5nKCkgJiZcbiAgICAgIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBpc1BsYWluT2JqZWN0KHZhbHVlKSkgJiZcbiAgICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXG4gICAgICAhdmFsdWUuX2lzVnVlXG4gICAgKSB7XG4gICAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChhc1Jvb3REYXRhICYmIG9iKSB7XG4gICAgICBvYi52bUNvdW50Kys7XG4gICAgfVxuICAgIHJldHVybiBvYlxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlJCQxIChcbiAgICBvYmosXG4gICAga2V5LFxuICAgIHZhbCxcbiAgICBjdXN0b21TZXR0ZXIsXG4gICAgc2hhbGxvd1xuICApIHtcbiAgICB2YXIgZGVwID0gbmV3IERlcCgpO1xuXG4gICAgdmFyIHByb3BlcnR5ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICAgIHZhciBnZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5nZXQ7XG4gICAgdmFyIHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldDtcbiAgICBpZiAoKCFnZXR0ZXIgfHwgc2V0dGVyKSAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB2YWwgPSBvYmpba2V5XTtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRPYiA9ICFzaGFsbG93ICYmIG9ic2VydmUodmFsKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyICgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgICBkZXAuZGVwZW5kKCk7XG4gICAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICAgIGNoaWxkT2IuZGVwLmRlcGVuZCgpO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgIGRlcGVuZEFycmF5KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiByZWFjdGl2ZVNldHRlciAobmV3VmFsKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuICAgICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSB8fCAobmV3VmFsICE9PSBuZXdWYWwgJiYgdmFsdWUgIT09IHZhbHVlKSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlICovXG4gICAgICAgIGlmIChjdXN0b21TZXR0ZXIpIHtcbiAgICAgICAgICBjdXN0b21TZXR0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAjNzk4MTogZm9yIGFjY2Vzc29yIHByb3BlcnRpZXMgd2l0aG91dCBzZXR0ZXJcbiAgICAgICAgaWYgKGdldHRlciAmJiAhc2V0dGVyKSB7IHJldHVybiB9XG4gICAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgICBzZXR0ZXIuY2FsbChvYmosIG5ld1ZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsID0gbmV3VmFsO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkT2IgPSAhc2hhbGxvdyAmJiBvYnNlcnZlKG5ld1ZhbCk7XG4gICAgICAgIGRlcC5ub3RpZnkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAgICogdHJpZ2dlcnMgY2hhbmdlIG5vdGlmaWNhdGlvbiBpZiB0aGUgcHJvcGVydHkgZG9lc24ndFxuICAgKiBhbHJlYWR5IGV4aXN0LlxuICAgKi9cbiAgZnVuY3Rpb24gc2V0ICh0YXJnZXQsIGtleSwgdmFsKSB7XG4gICAgaWYgKGlzVW5kZWYodGFyZ2V0KSB8fCBpc1ByaW1pdGl2ZSh0YXJnZXQpXG4gICAgKSB7XG4gICAgICB3YXJuKChcIkNhbm5vdCBzZXQgcmVhY3RpdmUgcHJvcGVydHkgb24gdW5kZWZpbmVkLCBudWxsLCBvciBwcmltaXRpdmUgdmFsdWU6IFwiICsgKCh0YXJnZXQpKSkpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIGlzVmFsaWRBcnJheUluZGV4KGtleSkpIHtcbiAgICAgIHRhcmdldC5sZW5ndGggPSBNYXRoLm1heCh0YXJnZXQubGVuZ3RoLCBrZXkpO1xuICAgICAgdGFyZ2V0LnNwbGljZShrZXksIDEsIHZhbCk7XG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIGlmIChrZXkgaW4gdGFyZ2V0ICYmICEoa2V5IGluIE9iamVjdC5wcm90b3R5cGUpKSB7XG4gICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG4gICAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICAgIGlmICh0YXJnZXQuX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIGFkZGluZyByZWFjdGl2ZSBwcm9wZXJ0aWVzIHRvIGEgVnVlIGluc3RhbmNlIG9yIGl0cyByb290ICRkYXRhICcgK1xuICAgICAgICAnYXQgcnVudGltZSAtIGRlY2xhcmUgaXQgdXBmcm9udCBpbiB0aGUgZGF0YSBvcHRpb24uJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG4gICAgaWYgKCFvYikge1xuICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICByZXR1cm4gdmFsXG4gICAgfVxuICAgIGRlZmluZVJlYWN0aXZlJCQxKG9iLnZhbHVlLCBrZXksIHZhbCk7XG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBwcm9wZXJ0eSBhbmQgdHJpZ2dlciBjaGFuZ2UgaWYgbmVjZXNzYXJ5LlxuICAgKi9cbiAgZnVuY3Rpb24gZGVsICh0YXJnZXQsIGtleSkge1xuICAgIGlmIChpc1VuZGVmKHRhcmdldCkgfHwgaXNQcmltaXRpdmUodGFyZ2V0KVxuICAgICkge1xuICAgICAgd2FybigoXCJDYW5ub3QgZGVsZXRlIHJlYWN0aXZlIHByb3BlcnR5IG9uIHVuZGVmaW5lZCwgbnVsbCwgb3IgcHJpbWl0aXZlIHZhbHVlOiBcIiArICgodGFyZ2V0KSkpKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiBpc1ZhbGlkQXJyYXlJbmRleChrZXkpKSB7XG4gICAgICB0YXJnZXQuc3BsaWNlKGtleSwgMSk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIG9iID0gKHRhcmdldCkuX19vYl9fO1xuICAgIGlmICh0YXJnZXQuX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIGRlbGV0aW5nIHByb3BlcnRpZXMgb24gYSBWdWUgaW5zdGFuY2Ugb3IgaXRzIHJvb3QgJGRhdGEgJyArXG4gICAgICAgICctIGp1c3Qgc2V0IGl0IHRvIG51bGwuJ1xuICAgICAgKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBkZWxldGUgdGFyZ2V0W2tleV07XG4gICAgaWYgKCFvYikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iLmRlcC5ub3RpZnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0IGRlcGVuZGVuY2llcyBvbiBhcnJheSBlbGVtZW50cyB3aGVuIHRoZSBhcnJheSBpcyB0b3VjaGVkLCBzaW5jZVxuICAgKiB3ZSBjYW5ub3QgaW50ZXJjZXB0IGFycmF5IGVsZW1lbnQgYWNjZXNzIGxpa2UgcHJvcGVydHkgZ2V0dGVycy5cbiAgICovXG4gIGZ1bmN0aW9uIGRlcGVuZEFycmF5ICh2YWx1ZSkge1xuICAgIGZvciAodmFyIGUgPSAodm9pZCAwKSwgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGUgPSB2YWx1ZVtpXTtcbiAgICAgIGUgJiYgZS5fX29iX18gJiYgZS5fX29iX18uZGVwLmRlcGVuZCgpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZSkpIHtcbiAgICAgICAgZGVwZW5kQXJyYXkoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgLyoqXG4gICAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcbiAgICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cbiAgICogdmFsdWUgaW50byB0aGUgZmluYWwgdmFsdWUuXG4gICAqL1xuICB2YXIgc3RyYXRzID0gY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcblxuICAvKipcbiAgICogT3B0aW9ucyB3aXRoIHJlc3RyaWN0aW9uc1xuICAgKi9cbiAge1xuICAgIHN0cmF0cy5lbCA9IHN0cmF0cy5wcm9wc0RhdGEgPSBmdW5jdGlvbiAocGFyZW50LCBjaGlsZCwgdm0sIGtleSkge1xuICAgICAgaWYgKCF2bSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwib3B0aW9uIFxcXCJcIiArIGtleSArIFwiXFxcIiBjYW4gb25seSBiZSB1c2VkIGR1cmluZyBpbnN0YW5jZSBcIiArXG4gICAgICAgICAgJ2NyZWF0aW9uIHdpdGggdGhlIGBuZXdgIGtleXdvcmQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRTdHJhdChwYXJlbnQsIGNoaWxkKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRoYXQgcmVjdXJzaXZlbHkgbWVyZ2VzIHR3byBkYXRhIG9iamVjdHMgdG9nZXRoZXIuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZURhdGEgKHRvLCBmcm9tKSB7XG4gICAgaWYgKCFmcm9tKSB7IHJldHVybiB0byB9XG4gICAgdmFyIGtleSwgdG9WYWwsIGZyb21WYWw7XG5cbiAgICB2YXIga2V5cyA9IGhhc1N5bWJvbFxuICAgICAgPyBSZWZsZWN0Lm93bktleXMoZnJvbSlcbiAgICAgIDogT2JqZWN0LmtleXMoZnJvbSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAvLyBpbiBjYXNlIHRoZSBvYmplY3QgaXMgYWxyZWFkeSBvYnNlcnZlZC4uLlxuICAgICAgaWYgKGtleSA9PT0gJ19fb2JfXycpIHsgY29udGludWUgfVxuICAgICAgdG9WYWwgPSB0b1trZXldO1xuICAgICAgZnJvbVZhbCA9IGZyb21ba2V5XTtcbiAgICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XG4gICAgICAgIHNldCh0bywga2V5LCBmcm9tVmFsKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRvVmFsICE9PSBmcm9tVmFsICYmXG4gICAgICAgIGlzUGxhaW5PYmplY3QodG9WYWwpICYmXG4gICAgICAgIGlzUGxhaW5PYmplY3QoZnJvbVZhbClcbiAgICAgICkge1xuICAgICAgICBtZXJnZURhdGEodG9WYWwsIGZyb21WYWwpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9cbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZURhdGFPckZuIChcbiAgICBwYXJlbnRWYWwsXG4gICAgY2hpbGRWYWwsXG4gICAgdm1cbiAgKSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgLy8gaW4gYSBWdWUuZXh0ZW5kIG1lcmdlLCBib3RoIHNob3VsZCBiZSBmdW5jdGlvbnNcbiAgICAgIGlmICghY2hpbGRWYWwpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFZhbFxuICAgICAgfVxuICAgICAgaWYgKCFwYXJlbnRWYWwpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkVmFsXG4gICAgICB9XG4gICAgICAvLyB3aGVuIHBhcmVudFZhbCAmIGNoaWxkVmFsIGFyZSBib3RoIHByZXNlbnQsXG4gICAgICAvLyB3ZSBuZWVkIHRvIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgICAgIC8vIG1lcmdlZCByZXN1bHQgb2YgYm90aCBmdW5jdGlvbnMuLi4gbm8gbmVlZCB0b1xuICAgICAgLy8gY2hlY2sgaWYgcGFyZW50VmFsIGlzIGEgZnVuY3Rpb24gaGVyZSBiZWNhdXNlXG4gICAgICAvLyBpdCBoYXMgdG8gYmUgYSBmdW5jdGlvbiB0byBwYXNzIHByZXZpb3VzIG1lcmdlcy5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZWREYXRhRm4gKCkge1xuICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKFxuICAgICAgICAgIHR5cGVvZiBjaGlsZFZhbCA9PT0gJ2Z1bmN0aW9uJyA/IGNoaWxkVmFsLmNhbGwodGhpcywgdGhpcykgOiBjaGlsZFZhbCxcbiAgICAgICAgICB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nID8gcGFyZW50VmFsLmNhbGwodGhpcywgdGhpcykgOiBwYXJlbnRWYWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkSW5zdGFuY2VEYXRhRm4gKCkge1xuICAgICAgICAvLyBpbnN0YW5jZSBtZXJnZVxuICAgICAgICB2YXIgaW5zdGFuY2VEYXRhID0gdHlwZW9mIGNoaWxkVmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBjaGlsZFZhbC5jYWxsKHZtLCB2bSlcbiAgICAgICAgICA6IGNoaWxkVmFsO1xuICAgICAgICB2YXIgZGVmYXVsdERhdGEgPSB0eXBlb2YgcGFyZW50VmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBwYXJlbnRWYWwuY2FsbCh2bSwgdm0pXG4gICAgICAgICAgOiBwYXJlbnRWYWw7XG4gICAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2VEYXRhKGluc3RhbmNlRGF0YSwgZGVmYXVsdERhdGEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdHJhdHMuZGF0YSA9IGZ1bmN0aW9uIChcbiAgICBwYXJlbnRWYWwsXG4gICAgY2hpbGRWYWwsXG4gICAgdm1cbiAgKSB7XG4gICAgaWYgKCF2bSkge1xuICAgICAgaWYgKGNoaWxkVmFsICYmIHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdUaGUgXCJkYXRhXCIgb3B0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICd0aGF0IHJldHVybnMgYSBwZXItaW5zdGFuY2UgdmFsdWUgaW4gY29tcG9uZW50ICcgK1xuICAgICAgICAgICdkZWZpbml0aW9ucy4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudFZhbFxuICAgICAgfVxuICAgICAgcmV0dXJuIG1lcmdlRGF0YU9yRm4ocGFyZW50VmFsLCBjaGlsZFZhbClcbiAgICB9XG5cbiAgICByZXR1cm4gbWVyZ2VEYXRhT3JGbihwYXJlbnRWYWwsIGNoaWxkVmFsLCB2bSlcbiAgfTtcblxuICAvKipcbiAgICogSG9va3MgYW5kIHByb3BzIGFyZSBtZXJnZWQgYXMgYXJyYXlzLlxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2VIb29rIChcbiAgICBwYXJlbnRWYWwsXG4gICAgY2hpbGRWYWxcbiAgKSB7XG4gICAgdmFyIHJlcyA9IGNoaWxkVmFsXG4gICAgICA/IHBhcmVudFZhbFxuICAgICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXG4gICAgICAgIDogQXJyYXkuaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgICA/IGNoaWxkVmFsXG4gICAgICAgICAgOiBbY2hpbGRWYWxdXG4gICAgICA6IHBhcmVudFZhbDtcbiAgICByZXR1cm4gcmVzXG4gICAgICA/IGRlZHVwZUhvb2tzKHJlcylcbiAgICAgIDogcmVzXG4gIH1cblxuICBmdW5jdGlvbiBkZWR1cGVIb29rcyAoaG9va3MpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlcy5pbmRleE9mKGhvb2tzW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgcmVzLnB1c2goaG9va3NbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBMSUZFQ1lDTEVfSE9PS1MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgIHN0cmF0c1tob29rXSA9IG1lcmdlSG9vaztcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEFzc2V0c1xuICAgKlxuICAgKiBXaGVuIGEgdm0gaXMgcHJlc2VudCAoaW5zdGFuY2UgY3JlYXRpb24pLCB3ZSBuZWVkIHRvIGRvXG4gICAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcbiAgICogb3B0aW9ucyBhbmQgcGFyZW50IG9wdGlvbnMuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZUFzc2V0cyAoXG4gICAgcGFyZW50VmFsLFxuICAgIGNoaWxkVmFsLFxuICAgIHZtLFxuICAgIGtleVxuICApIHtcbiAgICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCk7XG4gICAgaWYgKGNoaWxkVmFsKSB7XG4gICAgICBhc3NlcnRPYmplY3RUeXBlKGtleSwgY2hpbGRWYWwsIHZtKTtcbiAgICAgIHJldHVybiBleHRlbmQocmVzLCBjaGlsZFZhbClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfVxuXG4gIEFTU0VUX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBzdHJhdHNbdHlwZSArICdzJ10gPSBtZXJnZUFzc2V0cztcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFdhdGNoZXJzLlxuICAgKlxuICAgKiBXYXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gICAqIGFub3RoZXIsIHNvIHdlIG1lcmdlIHRoZW0gYXMgYXJyYXlzLlxuICAgKi9cbiAgc3RyYXRzLndhdGNoID0gZnVuY3Rpb24gKFxuICAgIHBhcmVudFZhbCxcbiAgICBjaGlsZFZhbCxcbiAgICB2bSxcbiAgICBrZXlcbiAgKSB7XG4gICAgLy8gd29yayBhcm91bmQgRmlyZWZveCdzIE9iamVjdC5wcm90b3R5cGUud2F0Y2guLi5cbiAgICBpZiAocGFyZW50VmFsID09PSBuYXRpdmVXYXRjaCkgeyBwYXJlbnRWYWwgPSB1bmRlZmluZWQ7IH1cbiAgICBpZiAoY2hpbGRWYWwgPT09IG5hdGl2ZVdhdGNoKSB7IGNoaWxkVmFsID0gdW5kZWZpbmVkOyB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFjaGlsZFZhbCkgeyByZXR1cm4gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCkgfVxuICAgIHtcbiAgICAgIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICAgIH1cbiAgICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICAgIHZhciByZXQgPSB7fTtcbiAgICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICAgIGZvciAodmFyIGtleSQxIGluIGNoaWxkVmFsKSB7XG4gICAgICB2YXIgcGFyZW50ID0gcmV0W2tleSQxXTtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkVmFsW2tleSQxXTtcbiAgICAgIGlmIChwYXJlbnQgJiYgIUFycmF5LmlzQXJyYXkocGFyZW50KSkge1xuICAgICAgICBwYXJlbnQgPSBbcGFyZW50XTtcbiAgICAgIH1cbiAgICAgIHJldFtrZXkkMV0gPSBwYXJlbnRcbiAgICAgICAgPyBwYXJlbnQuY29uY2F0KGNoaWxkKVxuICAgICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGQpID8gY2hpbGQgOiBbY2hpbGRdO1xuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH07XG5cbiAgLyoqXG4gICAqIE90aGVyIG9iamVjdCBoYXNoZXMuXG4gICAqL1xuICBzdHJhdHMucHJvcHMgPVxuICBzdHJhdHMubWV0aG9kcyA9XG4gIHN0cmF0cy5pbmplY3QgPVxuICBzdHJhdHMuY29tcHV0ZWQgPSBmdW5jdGlvbiAoXG4gICAgcGFyZW50VmFsLFxuICAgIGNoaWxkVmFsLFxuICAgIHZtLFxuICAgIGtleVxuICApIHtcbiAgICBpZiAoY2hpbGRWYWwgJiYgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGFzc2VydE9iamVjdFR5cGUoa2V5LCBjaGlsZFZhbCwgdm0pO1xuICAgIH1cbiAgICBpZiAoIXBhcmVudFZhbCkgeyByZXR1cm4gY2hpbGRWYWwgfVxuICAgIHZhciByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gICAgaWYgKGNoaWxkVmFsKSB7IGV4dGVuZChyZXQsIGNoaWxkVmFsKTsgfVxuICAgIHJldHVybiByZXRcbiAgfTtcbiAgc3RyYXRzLnByb3ZpZGUgPSBtZXJnZURhdGFPckZuO1xuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHN0cmF0ZWd5LlxuICAgKi9cbiAgdmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWRcbiAgICAgID8gcGFyZW50VmFsXG4gICAgICA6IGNoaWxkVmFsXG4gIH07XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGNvbXBvbmVudCBuYW1lc1xuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tDb21wb25lbnRzIChvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMuY29tcG9uZW50cykge1xuICAgICAgdmFsaWRhdGVDb21wb25lbnROYW1lKGtleSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVDb21wb25lbnROYW1lIChuYW1lKSB7XG4gICAgaWYgKCFuZXcgUmVnRXhwKChcIl5bYS16QS1aXVtcXFxcLVxcXFwuMC05X1wiICsgKHVuaWNvZGVSZWdFeHAuc291cmNlKSArIFwiXSokXCIpKS50ZXN0KG5hbWUpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnSW52YWxpZCBjb21wb25lbnQgbmFtZTogXCInICsgbmFtZSArICdcIi4gQ29tcG9uZW50IG5hbWVzICcgK1xuICAgICAgICAnc2hvdWxkIGNvbmZvcm0gdG8gdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZSBpbiBodG1sNSBzcGVjaWZpY2F0aW9uLidcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChpc0J1aWx0SW5UYWcobmFtZSkgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobmFtZSkpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgdXNlIGJ1aWx0LWluIG9yIHJlc2VydmVkIEhUTUwgZWxlbWVudHMgYXMgY29tcG9uZW50ICcgK1xuICAgICAgICAnaWQ6ICcgKyBuYW1lXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgYWxsIHByb3BzIG9wdGlvbiBzeW50YXggYXJlIG5vcm1hbGl6ZWQgaW50byB0aGVcbiAgICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BzIChvcHRpb25zLCB2bSkge1xuICAgIHZhciBwcm9wcyA9IG9wdGlvbnMucHJvcHM7XG4gICAgaWYgKCFwcm9wcykgeyByZXR1cm4gfVxuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgaSwgdmFsLCBuYW1lO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFsID0gcHJvcHNbaV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG5hbWUgPSBjYW1lbGl6ZSh2YWwpO1xuICAgICAgICAgIHJlc1tuYW1lXSA9IHsgdHlwZTogbnVsbCB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ3Byb3BzIG11c3QgYmUgc3RyaW5ncyB3aGVuIHVzaW5nIGFycmF5IHN5bnRheC4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgICB2YWwgPSBwcm9wc1trZXldO1xuICAgICAgICBuYW1lID0gY2FtZWxpemUoa2V5KTtcbiAgICAgICAgcmVzW25hbWVdID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgICAgPyB2YWxcbiAgICAgICAgICA6IHsgdHlwZTogdmFsIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwiSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIFxcXCJwcm9wc1xcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKHByb3BzKSkgKyBcIi5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICAgIG9wdGlvbnMucHJvcHMgPSByZXM7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGFsbCBpbmplY3Rpb25zIGludG8gT2JqZWN0LWJhc2VkIGZvcm1hdFxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplSW5qZWN0IChvcHRpb25zLCB2bSkge1xuICAgIHZhciBpbmplY3QgPSBvcHRpb25zLmluamVjdDtcbiAgICBpZiAoIWluamVjdCkgeyByZXR1cm4gfVxuICAgIHZhciBub3JtYWxpemVkID0gb3B0aW9ucy5pbmplY3QgPSB7fTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbmplY3QpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBub3JtYWxpemVkW2luamVjdFtpXV0gPSB7IGZyb206IGluamVjdFtpXSB9O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChpbmplY3QpKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gaW5qZWN0KSB7XG4gICAgICAgIHZhciB2YWwgPSBpbmplY3Rba2V5XTtcbiAgICAgICAgbm9ybWFsaXplZFtrZXldID0gaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICAgICAgPyBleHRlbmQoeyBmcm9tOiBrZXkgfSwgdmFsKVxuICAgICAgICAgIDogeyBmcm9tOiB2YWwgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2FybihcbiAgICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcImluamVjdFxcXCI6IGV4cGVjdGVkIGFuIEFycmF5IG9yIGFuIE9iamVjdCwgXCIgK1xuICAgICAgICBcImJ1dCBnb3QgXCIgKyAodG9SYXdUeXBlKGluamVjdCkpICsgXCIuXCIsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgcmF3IGZ1bmN0aW9uIGRpcmVjdGl2ZXMgaW50byBvYmplY3QgZm9ybWF0LlxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xuICAgIHZhciBkaXJzID0gb3B0aW9ucy5kaXJlY3RpdmVzO1xuICAgIGlmIChkaXJzKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xuICAgICAgICB2YXIgZGVmJCQxID0gZGlyc1trZXldO1xuICAgICAgICBpZiAodHlwZW9mIGRlZiQkMSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmJCQxLCB1cGRhdGU6IGRlZiQkMSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0T2JqZWN0VHlwZSAobmFtZSwgdmFsdWUsIHZtKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gXFxcIlwiICsgbmFtZSArIFwiXFxcIjogZXhwZWN0ZWQgYW4gT2JqZWN0LCBcIiArXG4gICAgICAgIFwiYnV0IGdvdCBcIiArICh0b1Jhd1R5cGUodmFsdWUpKSArIFwiLlwiLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9wdGlvbiBvYmplY3RzIGludG8gYSBuZXcgb25lLlxuICAgKiBDb3JlIHV0aWxpdHkgdXNlZCBpbiBib3RoIGluc3RhbnRpYXRpb24gYW5kIGluaGVyaXRhbmNlLlxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChcbiAgICBwYXJlbnQsXG4gICAgY2hpbGQsXG4gICAgdm1cbiAgKSB7XG4gICAge1xuICAgICAgY2hlY2tDb21wb25lbnRzKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkLm9wdGlvbnM7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplUHJvcHMoY2hpbGQsIHZtKTtcbiAgICBub3JtYWxpemVJbmplY3QoY2hpbGQsIHZtKTtcbiAgICBub3JtYWxpemVEaXJlY3RpdmVzKGNoaWxkKTtcblxuICAgIC8vIEFwcGx5IGV4dGVuZHMgYW5kIG1peGlucyBvbiB0aGUgY2hpbGQgb3B0aW9ucyxcbiAgICAvLyBidXQgb25seSBpZiBpdCBpcyBhIHJhdyBvcHRpb25zIG9iamVjdCB0aGF0IGlzbid0XG4gICAgLy8gdGhlIHJlc3VsdCBvZiBhbm90aGVyIG1lcmdlT3B0aW9ucyBjYWxsLlxuICAgIC8vIE9ubHkgbWVyZ2VkIG9wdGlvbnMgaGFzIHRoZSBfYmFzZSBwcm9wZXJ0eS5cbiAgICBpZiAoIWNoaWxkLl9iYXNlKSB7XG4gICAgICBpZiAoY2hpbGQuZXh0ZW5kcykge1xuICAgICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5leHRlbmRzLCB2bSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGQubWl4aW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLm1peGluc1tpXSwgdm0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIHBhcmVudCkge1xuICAgICAgbWVyZ2VGaWVsZChrZXkpO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICAgIG1lcmdlRmllbGQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VGaWVsZCAoa2V5KSB7XG4gICAgICB2YXIgc3RyYXQgPSBzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQ7XG4gICAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBhbiBhc3NldC5cbiAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJlY2F1c2UgY2hpbGQgaW5zdGFuY2VzIG5lZWQgYWNjZXNzXG4gICAqIHRvIGFzc2V0cyBkZWZpbmVkIGluIGl0cyBhbmNlc3RvciBjaGFpbi5cbiAgICovXG4gIGZ1bmN0aW9uIHJlc29sdmVBc3NldCAoXG4gICAgb3B0aW9ucyxcbiAgICB0eXBlLFxuICAgIGlkLFxuICAgIHdhcm5NaXNzaW5nXG4gICkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgaWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGFzc2V0cyA9IG9wdGlvbnNbdHlwZV07XG4gICAgLy8gY2hlY2sgbG9jYWwgcmVnaXN0cmF0aW9uIHZhcmlhdGlvbnMgZmlyc3RcbiAgICBpZiAoaGFzT3duKGFzc2V0cywgaWQpKSB7IHJldHVybiBhc3NldHNbaWRdIH1cbiAgICB2YXIgY2FtZWxpemVkSWQgPSBjYW1lbGl6ZShpZCk7XG4gICAgaWYgKGhhc093bihhc3NldHMsIGNhbWVsaXplZElkKSkgeyByZXR1cm4gYXNzZXRzW2NhbWVsaXplZElkXSB9XG4gICAgdmFyIFBhc2NhbENhc2VJZCA9IGNhcGl0YWxpemUoY2FtZWxpemVkSWQpO1xuICAgIGlmIChoYXNPd24oYXNzZXRzLCBQYXNjYWxDYXNlSWQpKSB7IHJldHVybiBhc3NldHNbUGFzY2FsQ2FzZUlkXSB9XG4gICAgLy8gZmFsbGJhY2sgdG8gcHJvdG90eXBlIGNoYWluXG4gICAgdmFyIHJlcyA9IGFzc2V0c1tpZF0gfHwgYXNzZXRzW2NhbWVsaXplZElkXSB8fCBhc3NldHNbUGFzY2FsQ2FzZUlkXTtcbiAgICBpZiAod2Fybk1pc3NpbmcgJiYgIXJlcykge1xuICAgICAgd2FybihcbiAgICAgICAgJ0ZhaWxlZCB0byByZXNvbHZlICcgKyB0eXBlLnNsaWNlKDAsIC0xKSArICc6ICcgKyBpZCxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyogICovXG5cblxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUHJvcCAoXG4gICAga2V5LFxuICAgIHByb3BPcHRpb25zLFxuICAgIHByb3BzRGF0YSxcbiAgICB2bVxuICApIHtcbiAgICB2YXIgcHJvcCA9IHByb3BPcHRpb25zW2tleV07XG4gICAgdmFyIGFic2VudCA9ICFoYXNPd24ocHJvcHNEYXRhLCBrZXkpO1xuICAgIHZhciB2YWx1ZSA9IHByb3BzRGF0YVtrZXldO1xuICAgIC8vIGJvb2xlYW4gY2FzdGluZ1xuICAgIHZhciBib29sZWFuSW5kZXggPSBnZXRUeXBlSW5kZXgoQm9vbGVhbiwgcHJvcC50eXBlKTtcbiAgICBpZiAoYm9vbGVhbkluZGV4ID4gLTEpIHtcbiAgICAgIGlmIChhYnNlbnQgJiYgIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gaHlwaGVuYXRlKGtleSkpIHtcbiAgICAgICAgLy8gb25seSBjYXN0IGVtcHR5IHN0cmluZyAvIHNhbWUgbmFtZSB0byBib29sZWFuIGlmXG4gICAgICAgIC8vIGJvb2xlYW4gaGFzIGhpZ2hlciBwcmlvcml0eVxuICAgICAgICB2YXIgc3RyaW5nSW5kZXggPSBnZXRUeXBlSW5kZXgoU3RyaW5nLCBwcm9wLnR5cGUpO1xuICAgICAgICBpZiAoc3RyaW5nSW5kZXggPCAwIHx8IGJvb2xlYW5JbmRleCA8IHN0cmluZ0luZGV4KSB7XG4gICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGRlZmF1bHQgdmFsdWVcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsdWUgPSBnZXRQcm9wRGVmYXVsdFZhbHVlKHZtLCBwcm9wLCBrZXkpO1xuICAgICAgLy8gc2luY2UgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYSBmcmVzaCBjb3B5LFxuICAgICAgLy8gbWFrZSBzdXJlIHRvIG9ic2VydmUgaXQuXG4gICAgICB2YXIgcHJldlNob3VsZE9ic2VydmUgPSBzaG91bGRPYnNlcnZlO1xuICAgICAgdG9nZ2xlT2JzZXJ2aW5nKHRydWUpO1xuICAgICAgb2JzZXJ2ZSh2YWx1ZSk7XG4gICAgICB0b2dnbGVPYnNlcnZpbmcocHJldlNob3VsZE9ic2VydmUpO1xuICAgIH1cbiAgICB7XG4gICAgICBhc3NlcnRQcm9wKHByb3AsIGtleSwgdmFsdWUsIHZtLCBhYnNlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwcm9wLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0UHJvcERlZmF1bHRWYWx1ZSAodm0sIHByb3AsIGtleSkge1xuICAgIC8vIG5vIGRlZmF1bHQsIHJldHVybiB1bmRlZmluZWRcbiAgICBpZiAoIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHZhciBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gICAgLy8gd2FybiBhZ2FpbnN0IG5vbi1mYWN0b3J5IGRlZmF1bHRzIGZvciBPYmplY3QgJiBBcnJheVxuICAgIGlmIChpc09iamVjdChkZWYpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnSW52YWxpZCBkZWZhdWx0IHZhbHVlIGZvciBwcm9wIFwiJyArIGtleSArICdcIjogJyArXG4gICAgICAgICdQcm9wcyB3aXRoIHR5cGUgT2JqZWN0L0FycmF5IG11c3QgdXNlIGEgZmFjdG9yeSBmdW5jdGlvbiAnICtcbiAgICAgICAgJ3RvIHJldHVybiB0aGUgZGVmYXVsdCB2YWx1ZS4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gdGhlIHJhdyBwcm9wIHZhbHVlIHdhcyBhbHNvIHVuZGVmaW5lZCBmcm9tIHByZXZpb3VzIHJlbmRlcixcbiAgICAvLyByZXR1cm4gcHJldmlvdXMgZGVmYXVsdCB2YWx1ZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSB3YXRjaGVyIHRyaWdnZXJcbiAgICBpZiAodm0gJiYgdm0uJG9wdGlvbnMucHJvcHNEYXRhICYmXG4gICAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICB2bS5fcHJvcHNba2V5XSAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICByZXR1cm4gdm0uX3Byb3BzW2tleV1cbiAgICB9XG4gICAgLy8gY2FsbCBmYWN0b3J5IGZ1bmN0aW9uIGZvciBub24tRnVuY3Rpb24gdHlwZXNcbiAgICAvLyBhIHZhbHVlIGlzIEZ1bmN0aW9uIGlmIGl0cyBwcm90b3R5cGUgaXMgZnVuY3Rpb24gZXZlbiBhY3Jvc3MgZGlmZmVyZW50IGV4ZWN1dGlvbiBjb250ZXh0XG4gICAgcmV0dXJuIHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgJiYgZ2V0VHlwZShwcm9wLnR5cGUpICE9PSAnRnVuY3Rpb24nXG4gICAgICA/IGRlZi5jYWxsKHZtKVxuICAgICAgOiBkZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgd2hldGhlciBhIHByb3AgaXMgdmFsaWQuXG4gICAqL1xuICBmdW5jdGlvbiBhc3NlcnRQcm9wIChcbiAgICBwcm9wLFxuICAgIG5hbWUsXG4gICAgdmFsdWUsXG4gICAgdm0sXG4gICAgYWJzZW50XG4gICkge1xuICAgIGlmIChwcm9wLnJlcXVpcmVkICYmIGFic2VudCkge1xuICAgICAgd2FybihcbiAgICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgcHJvcDogXCInICsgbmFtZSArICdcIicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PSBudWxsICYmICFwcm9wLnJlcXVpcmVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIHR5cGUgPSBwcm9wLnR5cGU7XG4gICAgdmFyIHZhbGlkID0gIXR5cGUgfHwgdHlwZSA9PT0gdHJ1ZTtcbiAgICB2YXIgZXhwZWN0ZWRUeXBlcyA9IFtdO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgdHlwZSA9IFt0eXBlXTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5sZW5ndGggJiYgIXZhbGlkOyBpKyspIHtcbiAgICAgICAgdmFyIGFzc2VydGVkVHlwZSA9IGFzc2VydFR5cGUodmFsdWUsIHR5cGVbaV0pO1xuICAgICAgICBleHBlY3RlZFR5cGVzLnB1c2goYXNzZXJ0ZWRUeXBlLmV4cGVjdGVkVHlwZSB8fCAnJyk7XG4gICAgICAgIHZhbGlkID0gYXNzZXJ0ZWRUeXBlLnZhbGlkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdmFsaWQpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGdldEludmFsaWRUeXBlTWVzc2FnZShuYW1lLCB2YWx1ZSwgZXhwZWN0ZWRUeXBlcyksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciB2YWxpZGF0b3IgPSBwcm9wLnZhbGlkYXRvcjtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBpZiAoIXZhbGlkYXRvcih2YWx1ZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnSW52YWxpZCBwcm9wOiBjdXN0b20gdmFsaWRhdG9yIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBuYW1lICsgJ1wiLicsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgc2ltcGxlQ2hlY2tSRSA9IC9eKFN0cmluZ3xOdW1iZXJ8Qm9vbGVhbnxGdW5jdGlvbnxTeW1ib2wpJC87XG5cbiAgZnVuY3Rpb24gYXNzZXJ0VHlwZSAodmFsdWUsIHR5cGUpIHtcbiAgICB2YXIgdmFsaWQ7XG4gICAgdmFyIGV4cGVjdGVkVHlwZSA9IGdldFR5cGUodHlwZSk7XG4gICAgaWYgKHNpbXBsZUNoZWNrUkUudGVzdChleHBlY3RlZFR5cGUpKSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgIHZhbGlkID0gdCA9PT0gZXhwZWN0ZWRUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAvLyBmb3IgcHJpbWl0aXZlIHdyYXBwZXIgb2JqZWN0c1xuICAgICAgaWYgKCF2YWxpZCAmJiB0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YWxpZCA9IHZhbHVlIGluc3RhbmNlb2YgdHlwZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICAgIHZhbGlkID0gaXNQbGFpbk9iamVjdCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdBcnJheScpIHtcbiAgICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkID0gdmFsdWUgaW5zdGFuY2VvZiB0eXBlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IHZhbGlkLFxuICAgICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIGZ1bmN0aW9uIHN0cmluZyBuYW1lIHRvIGNoZWNrIGJ1aWx0LWluIHR5cGVzLFxuICAgKiBiZWNhdXNlIGEgc2ltcGxlIGVxdWFsaXR5IGNoZWNrIHdpbGwgZmFpbCB3aGVuIHJ1bm5pbmdcbiAgICogYWNyb3NzIGRpZmZlcmVudCB2bXMgLyBpZnJhbWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VHlwZSAoZm4pIHtcbiAgICB2YXIgbWF0Y2ggPSBmbiAmJiBmbi50b1N0cmluZygpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChcXHcrKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2FtZVR5cGUgKGEsIGIpIHtcbiAgICByZXR1cm4gZ2V0VHlwZShhKSA9PT0gZ2V0VHlwZShiKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VHlwZUluZGV4ICh0eXBlLCBleHBlY3RlZFR5cGVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVHlwZXMpKSB7XG4gICAgICByZXR1cm4gaXNTYW1lVHlwZShleHBlY3RlZFR5cGVzLCB0eXBlKSA/IDAgOiAtMVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXhwZWN0ZWRUeXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGlzU2FtZVR5cGUoZXhwZWN0ZWRUeXBlc1tpXSwgdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbnZhbGlkVHlwZU1lc3NhZ2UgKG5hbWUsIHZhbHVlLCBleHBlY3RlZFR5cGVzKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBcIkludmFsaWQgcHJvcDogdHlwZSBjaGVjayBmYWlsZWQgZm9yIHByb3AgXFxcIlwiICsgbmFtZSArIFwiXFxcIi5cIiArXG4gICAgICBcIiBFeHBlY3RlZCBcIiArIChleHBlY3RlZFR5cGVzLm1hcChjYXBpdGFsaXplKS5qb2luKCcsICcpKTtcbiAgICB2YXIgZXhwZWN0ZWRUeXBlID0gZXhwZWN0ZWRUeXBlc1swXTtcbiAgICB2YXIgcmVjZWl2ZWRUeXBlID0gdG9SYXdUeXBlKHZhbHVlKTtcbiAgICB2YXIgZXhwZWN0ZWRWYWx1ZSA9IHN0eWxlVmFsdWUodmFsdWUsIGV4cGVjdGVkVHlwZSk7XG4gICAgdmFyIHJlY2VpdmVkVmFsdWUgPSBzdHlsZVZhbHVlKHZhbHVlLCByZWNlaXZlZFR5cGUpO1xuICAgIC8vIGNoZWNrIGlmIHdlIG5lZWQgdG8gc3BlY2lmeSBleHBlY3RlZCB2YWx1ZVxuICAgIGlmIChleHBlY3RlZFR5cGVzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICBpc0V4cGxpY2FibGUoZXhwZWN0ZWRUeXBlKSAmJlxuICAgICAgICAhaXNCb29sZWFuKGV4cGVjdGVkVHlwZSwgcmVjZWl2ZWRUeXBlKSkge1xuICAgICAgbWVzc2FnZSArPSBcIiB3aXRoIHZhbHVlIFwiICsgZXhwZWN0ZWRWYWx1ZTtcbiAgICB9XG4gICAgbWVzc2FnZSArPSBcIiwgZ290IFwiICsgcmVjZWl2ZWRUeXBlICsgXCIgXCI7XG4gICAgLy8gY2hlY2sgaWYgd2UgbmVlZCB0byBzcGVjaWZ5IHJlY2VpdmVkIHZhbHVlXG4gICAgaWYgKGlzRXhwbGljYWJsZShyZWNlaXZlZFR5cGUpKSB7XG4gICAgICBtZXNzYWdlICs9IFwid2l0aCB2YWx1ZSBcIiArIHJlY2VpdmVkVmFsdWUgKyBcIi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0eWxlVmFsdWUgKHZhbHVlLCB0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICdTdHJpbmcnKSB7XG4gICAgICByZXR1cm4gKFwiXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIilcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdOdW1iZXInKSB7XG4gICAgICByZXR1cm4gKFwiXCIgKyAoTnVtYmVyKHZhbHVlKSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCJcIiArIHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRXhwbGljYWJsZSAodmFsdWUpIHtcbiAgICB2YXIgZXhwbGljaXRUeXBlcyA9IFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJ107XG4gICAgcmV0dXJuIGV4cGxpY2l0VHlwZXMuc29tZShmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbTsgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgcmV0dXJuIGFyZ3Muc29tZShmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gZWxlbS50b0xvd2VyQ2FzZSgpID09PSAnYm9vbGVhbic7IH0pXG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBoYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICAgIC8vIERlYWN0aXZhdGUgZGVwcyB0cmFja2luZyB3aGlsZSBwcm9jZXNzaW5nIGVycm9yIGhhbmRsZXIgdG8gYXZvaWQgcG9zc2libGUgaW5maW5pdGUgcmVuZGVyaW5nLlxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZXgvaXNzdWVzLzE1MDVcbiAgICBwdXNoVGFyZ2V0KCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh2bSkge1xuICAgICAgICB2YXIgY3VyID0gdm07XG4gICAgICAgIHdoaWxlICgoY3VyID0gY3VyLiRwYXJlbnQpKSB7XG4gICAgICAgICAgdmFyIGhvb2tzID0gY3VyLiRvcHRpb25zLmVycm9yQ2FwdHVyZWQ7XG4gICAgICAgICAgaWYgKGhvb2tzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGNhcHR1cmUgPSBob29rc1tpXS5jYWxsKGN1ciwgZXJyLCB2bSwgaW5mbykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjYXB0dXJlKSB7IHJldHVybiB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxIYW5kbGVFcnJvcihlLCBjdXIsICdlcnJvckNhcHR1cmVkIGhvb2snKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZ2xvYmFsSGFuZGxlRXJyb3IoZXJyLCB2bSwgaW5mbyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHBvcFRhcmdldCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZVdpdGhFcnJvckhhbmRsaW5nIChcbiAgICBoYW5kbGVyLFxuICAgIGNvbnRleHQsXG4gICAgYXJncyxcbiAgICB2bSxcbiAgICBpbmZvXG4gICkge1xuICAgIHZhciByZXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IGFyZ3MgPyBoYW5kbGVyLmFwcGx5KGNvbnRleHQsIGFyZ3MpIDogaGFuZGxlci5jYWxsKGNvbnRleHQpO1xuICAgICAgaWYgKHJlcyAmJiAhcmVzLl9pc1Z1ZSAmJiBpc1Byb21pc2UocmVzKSAmJiAhcmVzLl9oYW5kbGVkKSB7XG4gICAgICAgIHJlcy5jYXRjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZSwgdm0sIGluZm8gKyBcIiAoUHJvbWlzZS9hc3luYylcIik7IH0pO1xuICAgICAgICAvLyBpc3N1ZSAjOTUxMVxuICAgICAgICAvLyBhdm9pZCBjYXRjaCB0cmlnZ2VyaW5nIG11bHRpcGxlIHRpbWVzIHdoZW4gbmVzdGVkIGNhbGxzXG4gICAgICAgIHJlcy5faGFuZGxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIGluZm8pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiBnbG9iYWxIYW5kbGVFcnJvciAoZXJyLCB2bSwgaW5mbykge1xuICAgIGlmIChjb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gY29uZmlnLmVycm9ySGFuZGxlci5jYWxsKG51bGwsIGVyciwgdm0sIGluZm8pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGludGVudGlvbmFsbHkgdGhyb3dzIHRoZSBvcmlnaW5hbCBlcnJvciBpbiB0aGUgaGFuZGxlcixcbiAgICAgICAgLy8gZG8gbm90IGxvZyBpdCB0d2ljZVxuICAgICAgICBpZiAoZSAhPT0gZXJyKSB7XG4gICAgICAgICAgbG9nRXJyb3IoZSwgbnVsbCwgJ2NvbmZpZy5lcnJvckhhbmRsZXInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsb2dFcnJvcihlcnIsIHZtLCBpbmZvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ0Vycm9yIChlcnIsIHZtLCBpbmZvKSB7XG4gICAge1xuICAgICAgd2FybigoXCJFcnJvciBpbiBcIiArIGluZm8gKyBcIjogXFxcIlwiICsgKGVyci50b1N0cmluZygpKSArIFwiXFxcIlwiKSwgdm0pO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICgoaW5Ccm93c2VyIHx8IGluV2VleCkgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIHZhciBpc1VzaW5nTWljcm9UYXNrID0gZmFsc2U7XG5cbiAgdmFyIGNhbGxiYWNrcyA9IFtdO1xuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGZsdXNoQ2FsbGJhY2tzICgpIHtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgdmFyIGNvcGllcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29waWVzW2ldKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gSGVyZSB3ZSBoYXZlIGFzeW5jIGRlZmVycmluZyB3cmFwcGVycyB1c2luZyBtaWNyb3Rhc2tzLlxuICAvLyBJbiAyLjUgd2UgdXNlZCAobWFjcm8pIHRhc2tzIChpbiBjb21iaW5hdGlvbiB3aXRoIG1pY3JvdGFza3MpLlxuICAvLyBIb3dldmVyLCBpdCBoYXMgc3VidGxlIHByb2JsZW1zIHdoZW4gc3RhdGUgaXMgY2hhbmdlZCByaWdodCBiZWZvcmUgcmVwYWludFxuICAvLyAoZS5nLiAjNjgxMywgb3V0LWluIHRyYW5zaXRpb25zKS5cbiAgLy8gQWxzbywgdXNpbmcgKG1hY3JvKSB0YXNrcyBpbiBldmVudCBoYW5kbGVyIHdvdWxkIGNhdXNlIHNvbWUgd2VpcmQgYmVoYXZpb3JzXG4gIC8vIHRoYXQgY2Fubm90IGJlIGNpcmN1bXZlbnRlZCAoZS5nLiAjNzEwOSwgIzcxNTMsICM3NTQ2LCAjNzgzNCwgIzgxMDkpLlxuICAvLyBTbyB3ZSBub3cgdXNlIG1pY3JvdGFza3MgZXZlcnl3aGVyZSwgYWdhaW4uXG4gIC8vIEEgbWFqb3IgZHJhd2JhY2sgb2YgdGhpcyB0cmFkZW9mZiBpcyB0aGF0IHRoZXJlIGFyZSBzb21lIHNjZW5hcmlvc1xuICAvLyB3aGVyZSBtaWNyb3Rhc2tzIGhhdmUgdG9vIGhpZ2ggYSBwcmlvcml0eSBhbmQgZmlyZSBpbiBiZXR3ZWVuIHN1cHBvc2VkbHlcbiAgLy8gc2VxdWVudGlhbCBldmVudHMgKGUuZy4gIzQ1MjEsICM2NjkwLCB3aGljaCBoYXZlIHdvcmthcm91bmRzKVxuICAvLyBvciBldmVuIGJldHdlZW4gYnViYmxpbmcgb2YgdGhlIHNhbWUgZXZlbnQgKCM2NTY2KS5cbiAgdmFyIHRpbWVyRnVuYztcblxuICAvLyBUaGUgbmV4dFRpY2sgYmVoYXZpb3IgbGV2ZXJhZ2VzIHRoZSBtaWNyb3Rhc2sgcXVldWUsIHdoaWNoIGNhbiBiZSBhY2Nlc3NlZFxuICAvLyB2aWEgZWl0aGVyIG5hdGl2ZSBQcm9taXNlLnRoZW4gb3IgTXV0YXRpb25PYnNlcnZlci5cbiAgLy8gTXV0YXRpb25PYnNlcnZlciBoYXMgd2lkZXIgc3VwcG9ydCwgaG93ZXZlciBpdCBpcyBzZXJpb3VzbHkgYnVnZ2VkIGluXG4gIC8vIFVJV2ViVmlldyBpbiBpT1MgPj0gOS4zLjMgd2hlbiB0cmlnZ2VyZWQgaW4gdG91Y2ggZXZlbnQgaGFuZGxlcnMuIEl0XG4gIC8vIGNvbXBsZXRlbHkgc3RvcHMgd29ya2luZyBhZnRlciB0cmlnZ2VyaW5nIGEgZmV3IHRpbWVzLi4uIHNvLCBpZiBuYXRpdmVcbiAgLy8gUHJvbWlzZSBpcyBhdmFpbGFibGUsIHdlIHdpbGwgdXNlIGl0OlxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCwgJGZsb3ctZGlzYWJsZS1saW5lICovXG4gIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcbiAgICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHAudGhlbihmbHVzaENhbGxiYWNrcyk7XG4gICAgICAvLyBJbiBwcm9ibGVtYXRpYyBVSVdlYlZpZXdzLCBQcm9taXNlLnRoZW4gZG9lc24ndCBjb21wbGV0ZWx5IGJyZWFrLCBidXRcbiAgICAgIC8vIGl0IGNhbiBnZXQgc3R1Y2sgaW4gYSB3ZWlyZCBzdGF0ZSB3aGVyZSBjYWxsYmFja3MgYXJlIHB1c2hlZCBpbnRvIHRoZVxuICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJ1dCB0aGUgcXVldWUgaXNuJ3QgYmVpbmcgZmx1c2hlZCwgdW50aWwgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG5lZWRzIHRvIGRvIHNvbWUgb3RoZXIgd29yaywgZS5nLiBoYW5kbGUgYSB0aW1lci4gVGhlcmVmb3JlIHdlIGNhblxuICAgICAgLy8gXCJmb3JjZVwiIHRoZSBtaWNyb3Rhc2sgcXVldWUgdG8gYmUgZmx1c2hlZCBieSBhZGRpbmcgYW4gZW1wdHkgdGltZXIuXG4gICAgICBpZiAoaXNJT1MpIHsgc2V0VGltZW91dChub29wKTsgfVxuICAgIH07XG4gICAgaXNVc2luZ01pY3JvVGFzayA9IHRydWU7XG4gIH0gZWxzZSBpZiAoIWlzSUUgJiYgdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmIChcbiAgICBpc05hdGl2ZShNdXRhdGlvbk9ic2VydmVyKSB8fFxuICAgIC8vIFBoYW50b21KUyBhbmQgaU9TIDcueFxuICAgIE11dGF0aW9uT2JzZXJ2ZXIudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTXV0YXRpb25PYnNlcnZlckNvbnN0cnVjdG9yXSdcbiAgKSkge1xuICAgIC8vIFVzZSBNdXRhdGlvbk9ic2VydmVyIHdoZXJlIG5hdGl2ZSBQcm9taXNlIGlzIG5vdCBhdmFpbGFibGUsXG4gICAgLy8gZS5nLiBQaGFudG9tSlMsIGlPUzcsIEFuZHJvaWQgNC40XG4gICAgLy8gKCM2NDY2IE11dGF0aW9uT2JzZXJ2ZXIgaXMgdW5yZWxpYWJsZSBpbiBJRTExKVxuICAgIHZhciBjb3VudGVyID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaENhbGxiYWNrcyk7XG4gICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGNvdW50ZXIpKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSk7XG4gICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgY291bnRlciA9IChjb3VudGVyICsgMSkgJSAyO1xuICAgICAgdGV4dE5vZGUuZGF0YSA9IFN0cmluZyhjb3VudGVyKTtcbiAgICB9O1xuICAgIGlzVXNpbmdNaWNyb1Rhc2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKHNldEltbWVkaWF0ZSkpIHtcbiAgICAvLyBGYWxsYmFjayB0byBzZXRJbW1lZGlhdGUuXG4gICAgLy8gVGVjaG5pY2FsbHkgaXQgbGV2ZXJhZ2VzIHRoZSAobWFjcm8pIHRhc2sgcXVldWUsXG4gICAgLy8gYnV0IGl0IGlzIHN0aWxsIGEgYmV0dGVyIGNob2ljZSB0aGFuIHNldFRpbWVvdXQuXG4gICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0SW1tZWRpYXRlKGZsdXNoQ2FsbGJhY2tzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrIHRvIHNldFRpbWVvdXQuXG4gICAgdGltZXJGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0VGltZW91dChmbHVzaENhbGxiYWNrcywgMCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRUaWNrIChjYiwgY3R4KSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNiLmNhbGwoY3R4KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGUsIGN0eCwgJ25leHRUaWNrJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoX3Jlc29sdmUpIHtcbiAgICAgICAgX3Jlc29sdmUoY3R4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGltZXJGdW5jKCk7XG4gICAgfVxuICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgIGlmICghY2IgJiYgdHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICB2YXIgbWFyaztcbiAgdmFyIG1lYXN1cmU7XG5cbiAge1xuICAgIHZhciBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoXG4gICAgICBwZXJmICYmXG4gICAgICBwZXJmLm1hcmsgJiZcbiAgICAgIHBlcmYubWVhc3VyZSAmJlxuICAgICAgcGVyZi5jbGVhck1hcmtzICYmXG4gICAgICBwZXJmLmNsZWFyTWVhc3VyZXNcbiAgICApIHtcbiAgICAgIG1hcmsgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiBwZXJmLm1hcmsodGFnKTsgfTtcbiAgICAgIG1lYXN1cmUgPSBmdW5jdGlvbiAobmFtZSwgc3RhcnRUYWcsIGVuZFRhZykge1xuICAgICAgICBwZXJmLm1lYXN1cmUobmFtZSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XG4gICAgICAgIHBlcmYuY2xlYXJNYXJrcyhlbmRUYWcpO1xuICAgICAgICAvLyBwZXJmLmNsZWFyTWVhc3VyZXMobmFtZSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyogbm90IHR5cGUgY2hlY2tpbmcgdGhpcyBmaWxlIGJlY2F1c2UgZmxvdyBkb2Vzbid0IHBsYXkgd2VsbCB3aXRoIFByb3h5ICovXG5cbiAgdmFyIGluaXRQcm94eTtcblxuICB7XG4gICAgdmFyIGFsbG93ZWRHbG9iYWxzID0gbWFrZU1hcChcbiAgICAgICdJbmZpbml0eSx1bmRlZmluZWQsTmFOLGlzRmluaXRlLGlzTmFOLCcgK1xuICAgICAgJ3BhcnNlRmxvYXQscGFyc2VJbnQsZGVjb2RlVVJJLGRlY29kZVVSSUNvbXBvbmVudCxlbmNvZGVVUkksZW5jb2RlVVJJQ29tcG9uZW50LCcgK1xuICAgICAgJ01hdGgsTnVtYmVyLERhdGUsQXJyYXksT2JqZWN0LEJvb2xlYW4sU3RyaW5nLFJlZ0V4cCxNYXAsU2V0LEpTT04sSW50bCwnICtcbiAgICAgICdyZXF1aXJlJyAvLyBmb3IgV2VicGFjay9Ccm93c2VyaWZ5XG4gICAgKTtcblxuICAgIHZhciB3YXJuTm9uUHJlc2VudCA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJQcm9wZXJ0eSBvciBtZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIG5vdCBkZWZpbmVkIG9uIHRoZSBpbnN0YW5jZSBidXQgXCIgK1xuICAgICAgICAncmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdGhhdCB0aGlzIHByb3BlcnR5IGlzIHJlYWN0aXZlLCAnICtcbiAgICAgICAgJ2VpdGhlciBpbiB0aGUgZGF0YSBvcHRpb24sIG9yIGZvciBjbGFzcy1iYXNlZCBjb21wb25lbnRzLCBieSAnICtcbiAgICAgICAgJ2luaXRpYWxpemluZyB0aGUgcHJvcGVydHkuICcgK1xuICAgICAgICAnU2VlOiBodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9yZWFjdGl2aXR5Lmh0bWwjRGVjbGFyaW5nLVJlYWN0aXZlLVByb3BlcnRpZXMuJyxcbiAgICAgICAgdGFyZ2V0XG4gICAgICApO1xuICAgIH07XG5cbiAgICB2YXIgd2FyblJlc2VydmVkUHJlZml4ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gICAgICB3YXJuKFxuICAgICAgICBcIlByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBtdXN0IGJlIGFjY2Vzc2VkIHdpdGggXFxcIiRkYXRhLlwiICsga2V5ICsgXCJcXFwiIGJlY2F1c2UgXCIgK1xuICAgICAgICAncHJvcGVydGllcyBzdGFydGluZyB3aXRoIFwiJFwiIG9yIFwiX1wiIGFyZSBub3QgcHJveGllZCBpbiB0aGUgVnVlIGluc3RhbmNlIHRvICcgK1xuICAgICAgICAncHJldmVudCBjb25mbGljdHMgd2l0aCBWdWUgaW50ZXJuYWxzLiAnICtcbiAgICAgICAgJ1NlZTogaHR0cHM6Ly92dWVqcy5vcmcvdjIvYXBpLyNkYXRhJyxcbiAgICAgICAgdGFyZ2V0XG4gICAgICApO1xuICAgIH07XG5cbiAgICB2YXIgaGFzUHJveHkgPVxuICAgICAgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShQcm94eSk7XG5cbiAgICBpZiAoaGFzUHJveHkpIHtcbiAgICAgIHZhciBpc0J1aWx0SW5Nb2RpZmllciA9IG1ha2VNYXAoJ3N0b3AscHJldmVudCxzZWxmLGN0cmwsc2hpZnQsYWx0LG1ldGEsZXhhY3QnKTtcbiAgICAgIGNvbmZpZy5rZXlDb2RlcyA9IG5ldyBQcm94eShjb25maWcua2V5Q29kZXMsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGlmIChpc0J1aWx0SW5Nb2RpZmllcihrZXkpKSB7XG4gICAgICAgICAgICB3YXJuKChcIkF2b2lkIG92ZXJ3cml0aW5nIGJ1aWx0LWluIG1vZGlmaWVyIGluIGNvbmZpZy5rZXlDb2RlczogLlwiICsga2V5KSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgaGFzSGFuZGxlciA9IHtcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzICh0YXJnZXQsIGtleSkge1xuICAgICAgICB2YXIgaGFzID0ga2V5IGluIHRhcmdldDtcbiAgICAgICAgdmFyIGlzQWxsb3dlZCA9IGFsbG93ZWRHbG9iYWxzKGtleSkgfHxcbiAgICAgICAgICAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5LmNoYXJBdCgwKSA9PT0gJ18nICYmICEoa2V5IGluIHRhcmdldC4kZGF0YSkpO1xuICAgICAgICBpZiAoIWhhcyAmJiAhaXNBbGxvd2VkKSB7XG4gICAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQuJGRhdGEpIHsgd2FyblJlc2VydmVkUHJlZml4KHRhcmdldCwga2V5KTsgfVxuICAgICAgICAgIGVsc2UgeyB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzIHx8ICFpc0FsbG93ZWRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldEhhbmRsZXIgPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmICEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgICBpZiAoa2V5IGluIHRhcmdldC4kZGF0YSkgeyB3YXJuUmVzZXJ2ZWRQcmVmaXgodGFyZ2V0LCBrZXkpOyB9XG4gICAgICAgICAgZWxzZSB7IHdhcm5Ob25QcmVzZW50KHRhcmdldCwga2V5KTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXRba2V5XVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpbml0UHJveHkgPSBmdW5jdGlvbiBpbml0UHJveHkgKHZtKSB7XG4gICAgICBpZiAoaGFzUHJveHkpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHByb3h5IGhhbmRsZXIgdG8gdXNlXG4gICAgICAgIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG4gICAgICAgIHZhciBoYW5kbGVycyA9IG9wdGlvbnMucmVuZGVyICYmIG9wdGlvbnMucmVuZGVyLl93aXRoU3RyaXBwZWRcbiAgICAgICAgICA/IGdldEhhbmRsZXJcbiAgICAgICAgICA6IGhhc0hhbmRsZXI7XG4gICAgICAgIHZtLl9yZW5kZXJQcm94eSA9IG5ldyBQcm94eSh2bSwgaGFuZGxlcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm0uX3JlbmRlclByb3h5ID0gdm07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qICAqL1xuXG4gIHZhciBzZWVuT2JqZWN0cyA9IG5ldyBfU2V0KCk7XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXG4gICAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gICAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gICAqL1xuICBmdW5jdGlvbiB0cmF2ZXJzZSAodmFsKSB7XG4gICAgX3RyYXZlcnNlKHZhbCwgc2Vlbk9iamVjdHMpO1xuICAgIHNlZW5PYmplY3RzLmNsZWFyKCk7XG4gIH1cblxuICBmdW5jdGlvbiBfdHJhdmVyc2UgKHZhbCwgc2Vlbikge1xuICAgIHZhciBpLCBrZXlzO1xuICAgIHZhciBpc0EgPSBBcnJheS5pc0FycmF5KHZhbCk7XG4gICAgaWYgKCghaXNBICYmICFpc09iamVjdCh2YWwpKSB8fCBPYmplY3QuaXNGcm96ZW4odmFsKSB8fCB2YWwgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh2YWwuX19vYl9fKSB7XG4gICAgICB2YXIgZGVwSWQgPSB2YWwuX19vYl9fLmRlcC5pZDtcbiAgICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZWVuLmFkZChkZXBJZCk7XG4gICAgfVxuICAgIGlmIChpc0EpIHtcbiAgICAgIGkgPSB2YWwubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkgeyBfdHJhdmVyc2UodmFsW2ldLCBzZWVuKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgIGkgPSBrZXlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2Vlbik7IH1cbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICB2YXIgbm9ybWFsaXplRXZlbnQgPSBjYWNoZWQoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgcGFzc2l2ZSA9IG5hbWUuY2hhckF0KDApID09PSAnJic7XG4gICAgbmFtZSA9IHBhc3NpdmUgPyBuYW1lLnNsaWNlKDEpIDogbmFtZTtcbiAgICB2YXIgb25jZSQkMSA9IG5hbWUuY2hhckF0KDApID09PSAnfic7IC8vIFByZWZpeGVkIGxhc3QsIGNoZWNrZWQgZmlyc3RcbiAgICBuYW1lID0gb25jZSQkMSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICAgIHZhciBjYXB0dXJlID0gbmFtZS5jaGFyQXQoMCkgPT09ICchJztcbiAgICBuYW1lID0gY2FwdHVyZSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgb25jZTogb25jZSQkMSxcbiAgICAgIGNhcHR1cmU6IGNhcHR1cmUsXG4gICAgICBwYXNzaXZlOiBwYXNzaXZlXG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjcmVhdGVGbkludm9rZXIgKGZucywgdm0pIHtcbiAgICBmdW5jdGlvbiBpbnZva2VyICgpIHtcbiAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgICAgdmFyIGZucyA9IGludm9rZXIuZm5zO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZm5zKSkge1xuICAgICAgICB2YXIgY2xvbmVkID0gZm5zLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xvbmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoY2xvbmVkW2ldLCBudWxsLCBhcmd1bWVudHMkMSwgdm0sIFwidi1vbiBoYW5kbGVyXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXR1cm4gaGFuZGxlciByZXR1cm4gdmFsdWUgZm9yIHNpbmdsZSBoYW5kbGVyc1xuICAgICAgICByZXR1cm4gaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoZm5zLCBudWxsLCBhcmd1bWVudHMsIHZtLCBcInYtb24gaGFuZGxlclwiKVxuICAgICAgfVxuICAgIH1cbiAgICBpbnZva2VyLmZucyA9IGZucztcbiAgICByZXR1cm4gaW52b2tlclxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTGlzdGVuZXJzIChcbiAgICBvbixcbiAgICBvbGRPbixcbiAgICBhZGQsXG4gICAgcmVtb3ZlJCQxLFxuICAgIGNyZWF0ZU9uY2VIYW5kbGVyLFxuICAgIHZtXG4gICkge1xuICAgIHZhciBuYW1lLCBkZWYkJDEsIGN1ciwgb2xkLCBldmVudDtcbiAgICBmb3IgKG5hbWUgaW4gb24pIHtcbiAgICAgIGRlZiQkMSA9IGN1ciA9IG9uW25hbWVdO1xuICAgICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgICBldmVudCA9IG5vcm1hbGl6ZUV2ZW50KG5hbWUpO1xuICAgICAgaWYgKGlzVW5kZWYoY3VyKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiSW52YWxpZCBoYW5kbGVyIGZvciBldmVudCBcXFwiXCIgKyAoZXZlbnQubmFtZSkgKyBcIlxcXCI6IGdvdCBcIiArIFN0cmluZyhjdXIpLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkKSkge1xuICAgICAgICBpZiAoaXNVbmRlZihjdXIuZm5zKSkge1xuICAgICAgICAgIGN1ciA9IG9uW25hbWVdID0gY3JlYXRlRm5JbnZva2VyKGN1ciwgdm0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RydWUoZXZlbnQub25jZSkpIHtcbiAgICAgICAgICBjdXIgPSBvbltuYW1lXSA9IGNyZWF0ZU9uY2VIYW5kbGVyKGV2ZW50Lm5hbWUsIGN1ciwgZXZlbnQuY2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkKGV2ZW50Lm5hbWUsIGN1ciwgZXZlbnQuY2FwdHVyZSwgZXZlbnQucGFzc2l2ZSwgZXZlbnQucGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VyICE9PSBvbGQpIHtcbiAgICAgICAgb2xkLmZucyA9IGN1cjtcbiAgICAgICAgb25bbmFtZV0gPSBvbGQ7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgICAgaWYgKGlzVW5kZWYob25bbmFtZV0pKSB7XG4gICAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICAgIHJlbW92ZSQkMShldmVudC5uYW1lLCBvbGRPbltuYW1lXSwgZXZlbnQuY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gbWVyZ2VWTm9kZUhvb2sgKGRlZiwgaG9va0tleSwgaG9vaykge1xuICAgIGlmIChkZWYgaW5zdGFuY2VvZiBWTm9kZSkge1xuICAgICAgZGVmID0gZGVmLmRhdGEuaG9vayB8fCAoZGVmLmRhdGEuaG9vayA9IHt9KTtcbiAgICB9XG4gICAgdmFyIGludm9rZXI7XG4gICAgdmFyIG9sZEhvb2sgPSBkZWZbaG9va0tleV07XG5cbiAgICBmdW5jdGlvbiB3cmFwcGVkSG9vayAoKSB7XG4gICAgICBob29rLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAvLyBpbXBvcnRhbnQ6IHJlbW92ZSBtZXJnZWQgaG9vayB0byBlbnN1cmUgaXQncyBjYWxsZWQgb25seSBvbmNlXG4gICAgICAvLyBhbmQgcHJldmVudCBtZW1vcnkgbGVha1xuICAgICAgcmVtb3ZlKGludm9rZXIuZm5zLCB3cmFwcGVkSG9vayk7XG4gICAgfVxuXG4gICAgaWYgKGlzVW5kZWYob2xkSG9vaykpIHtcbiAgICAgIC8vIG5vIGV4aXN0aW5nIGhvb2tcbiAgICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW3dyYXBwZWRIb29rXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGlzRGVmKG9sZEhvb2suZm5zKSAmJiBpc1RydWUob2xkSG9vay5tZXJnZWQpKSB7XG4gICAgICAgIC8vIGFscmVhZHkgYSBtZXJnZWQgaW52b2tlclxuICAgICAgICBpbnZva2VyID0gb2xkSG9vaztcbiAgICAgICAgaW52b2tlci5mbnMucHVzaCh3cmFwcGVkSG9vayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBleGlzdGluZyBwbGFpbiBob29rXG4gICAgICAgIGludm9rZXIgPSBjcmVhdGVGbkludm9rZXIoW29sZEhvb2ssIHdyYXBwZWRIb29rXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW52b2tlci5tZXJnZWQgPSB0cnVlO1xuICAgIGRlZltob29rS2V5XSA9IGludm9rZXI7XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBleHRyYWN0UHJvcHNGcm9tVk5vZGVEYXRhIChcbiAgICBkYXRhLFxuICAgIEN0b3IsXG4gICAgdGFnXG4gICkge1xuICAgIC8vIHdlIGFyZSBvbmx5IGV4dHJhY3RpbmcgcmF3IHZhbHVlcyBoZXJlLlxuICAgIC8vIHZhbGlkYXRpb24gYW5kIGRlZmF1bHQgdmFsdWVzIGFyZSBoYW5kbGVkIGluIHRoZSBjaGlsZFxuICAgIC8vIGNvbXBvbmVudCBpdHNlbGYuXG4gICAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xuICAgIGlmIChpc1VuZGVmKHByb3BPcHRpb25zKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgYXR0cnMgPSBkYXRhLmF0dHJzO1xuICAgIHZhciBwcm9wcyA9IGRhdGEucHJvcHM7XG4gICAgaWYgKGlzRGVmKGF0dHJzKSB8fCBpc0RlZihwcm9wcykpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wT3B0aW9ucykge1xuICAgICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIga2V5SW5Mb3dlckNhc2UgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBrZXkgIT09IGtleUluTG93ZXJDYXNlICYmXG4gICAgICAgICAgICBhdHRycyAmJiBoYXNPd24oYXR0cnMsIGtleUluTG93ZXJDYXNlKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGlwKFxuICAgICAgICAgICAgICBcIlByb3AgXFxcIlwiICsga2V5SW5Mb3dlckNhc2UgKyBcIlxcXCIgaXMgcGFzc2VkIHRvIGNvbXBvbmVudCBcIiArXG4gICAgICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHRhZyB8fCBDdG9yKSkgKyBcIiwgYnV0IHRoZSBkZWNsYXJlZCBwcm9wIG5hbWUgaXNcIiArXG4gICAgICAgICAgICAgIFwiIFxcXCJcIiArIGtleSArIFwiXFxcIi4gXCIgK1xuICAgICAgICAgICAgICBcIk5vdGUgdGhhdCBIVE1MIGF0dHJpYnV0ZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmUgYW5kIGNhbWVsQ2FzZWQgXCIgK1xuICAgICAgICAgICAgICBcInByb3BzIG5lZWQgdG8gdXNlIHRoZWlyIGtlYmFiLWNhc2UgZXF1aXZhbGVudHMgd2hlbiB1c2luZyBpbi1ET00gXCIgK1xuICAgICAgICAgICAgICBcInRlbXBsYXRlcy4gWW91IHNob3VsZCBwcm9iYWJseSB1c2UgXFxcIlwiICsgYWx0S2V5ICsgXCJcXFwiIGluc3RlYWQgb2YgXFxcIlwiICsga2V5ICsgXCJcXFwiLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICAgIGNoZWNrUHJvcChyZXMsIGF0dHJzLCBrZXksIGFsdEtleSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1Byb3AgKFxuICAgIHJlcyxcbiAgICBoYXNoLFxuICAgIGtleSxcbiAgICBhbHRLZXksXG4gICAgcHJlc2VydmVcbiAgKSB7XG4gICAgaWYgKGlzRGVmKGhhc2gpKSB7XG4gICAgICBpZiAoaGFzT3duKGhhc2gsIGtleSkpIHtcbiAgICAgICAgcmVzW2tleV0gPSBoYXNoW2tleV07XG4gICAgICAgIGlmICghcHJlc2VydmUpIHtcbiAgICAgICAgICBkZWxldGUgaGFzaFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2UgaWYgKGhhc093bihoYXNoLCBhbHRLZXkpKSB7XG4gICAgICAgIHJlc1trZXldID0gaGFzaFthbHRLZXldO1xuICAgICAgICBpZiAoIXByZXNlcnZlKSB7XG4gICAgICAgICAgZGVsZXRlIGhhc2hbYWx0S2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8vIFRoZSB0ZW1wbGF0ZSBjb21waWxlciBhdHRlbXB0cyB0byBtaW5pbWl6ZSB0aGUgbmVlZCBmb3Igbm9ybWFsaXphdGlvbiBieVxuICAvLyBzdGF0aWNhbGx5IGFuYWx5emluZyB0aGUgdGVtcGxhdGUgYXQgY29tcGlsZSB0aW1lLlxuICAvL1xuICAvLyBGb3IgcGxhaW4gSFRNTCBtYXJrdXAsIG5vcm1hbGl6YXRpb24gY2FuIGJlIGNvbXBsZXRlbHkgc2tpcHBlZCBiZWNhdXNlIHRoZVxuICAvLyBnZW5lcmF0ZWQgcmVuZGVyIGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gcmV0dXJuIEFycmF5PFZOb2RlPi4gVGhlcmUgYXJlXG4gIC8vIHR3byBjYXNlcyB3aGVyZSBleHRyYSBub3JtYWxpemF0aW9uIGlzIG5lZWRlZDpcblxuICAvLyAxLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb21wb25lbnRzIC0gYmVjYXVzZSBhIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4gIC8vIG1heSByZXR1cm4gYW4gQXJyYXkgaW5zdGVhZCBvZiBhIHNpbmdsZSByb290LiBJbiB0aGlzIGNhc2UsIGp1c3QgYSBzaW1wbGVcbiAgLy8gbm9ybWFsaXphdGlvbiBpcyBuZWVkZWQgLSBpZiBhbnkgY2hpbGQgaXMgYW4gQXJyYXksIHdlIGZsYXR0ZW4gdGhlIHdob2xlXG4gIC8vIHRoaW5nIHdpdGggQXJyYXkucHJvdG90eXBlLmNvbmNhdC4gSXQgaXMgZ3VhcmFudGVlZCB0byBiZSBvbmx5IDEtbGV2ZWwgZGVlcFxuICAvLyBiZWNhdXNlIGZ1bmN0aW9uYWwgY29tcG9uZW50cyBhbHJlYWR5IG5vcm1hbGl6ZSB0aGVpciBvd24gY2hpbGRyZW4uXG4gIGZ1bmN0aW9uIHNpbXBsZU5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuW2ldKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlblxuICB9XG5cbiAgLy8gMi4gV2hlbiB0aGUgY2hpbGRyZW4gY29udGFpbnMgY29uc3RydWN0cyB0aGF0IGFsd2F5cyBnZW5lcmF0ZWQgbmVzdGVkIEFycmF5cyxcbiAgLy8gZS5nLiA8dGVtcGxhdGU+LCA8c2xvdD4sIHYtZm9yLCBvciB3aGVuIHRoZSBjaGlsZHJlbiBpcyBwcm92aWRlZCBieSB1c2VyXG4gIC8vIHdpdGggaGFuZC13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMgLyBKU1guIEluIHN1Y2ggY2FzZXMgYSBmdWxsIG5vcm1hbGl6YXRpb25cbiAgLy8gaXMgbmVlZGVkIHRvIGNhdGVyIHRvIGFsbCBwb3NzaWJsZSB0eXBlcyBvZiBjaGlsZHJlbiB2YWx1ZXMuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUNoaWxkcmVuIChjaGlsZHJlbikge1xuICAgIHJldHVybiBpc1ByaW1pdGl2ZShjaGlsZHJlbilcbiAgICAgID8gW2NyZWF0ZVRleHRWTm9kZShjaGlsZHJlbildXG4gICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pXG4gICAgICAgID8gbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjaGlsZHJlbilcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVGV4dE5vZGUgKG5vZGUpIHtcbiAgICByZXR1cm4gaXNEZWYobm9kZSkgJiYgaXNEZWYobm9kZS50ZXh0KSAmJiBpc0ZhbHNlKG5vZGUuaXNDb21tZW50KVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplQXJyYXlDaGlsZHJlbiAoY2hpbGRyZW4sIG5lc3RlZEluZGV4KSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHZhciBpLCBjLCBsYXN0SW5kZXgsIGxhc3Q7XG4gICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoaXNVbmRlZihjKSB8fCB0eXBlb2YgYyA9PT0gJ2Jvb2xlYW4nKSB7IGNvbnRpbnVlIH1cbiAgICAgIGxhc3RJbmRleCA9IHJlcy5sZW5ndGggLSAxO1xuICAgICAgbGFzdCA9IHJlc1tsYXN0SW5kZXhdO1xuICAgICAgLy8gIG5lc3RlZFxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHtcbiAgICAgICAgaWYgKGMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGMgPSBub3JtYWxpemVBcnJheUNoaWxkcmVuKGMsICgobmVzdGVkSW5kZXggfHwgJycpICsgXCJfXCIgKyBpKSk7XG4gICAgICAgICAgLy8gbWVyZ2UgYWRqYWNlbnQgdGV4dCBub2Rlc1xuICAgICAgICAgIGlmIChpc1RleHROb2RlKGNbMF0pICYmIGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgICAgIHJlc1tsYXN0SW5kZXhdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIChjWzBdKS50ZXh0KTtcbiAgICAgICAgICAgIGMuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2guYXBwbHkocmVzLCBjKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1ByaW1pdGl2ZShjKSkge1xuICAgICAgICBpZiAoaXNUZXh0Tm9kZShsYXN0KSkge1xuICAgICAgICAgIC8vIG1lcmdlIGFkamFjZW50IHRleHQgbm9kZXNcbiAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgU1NSIGh5ZHJhdGlvbiBiZWNhdXNlIHRleHQgbm9kZXMgYXJlXG4gICAgICAgICAgLy8gZXNzZW50aWFsbHkgbWVyZ2VkIHdoZW4gcmVuZGVyZWQgdG8gSFRNTCBzdHJpbmdzXG4gICAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYyk7XG4gICAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJycpIHtcbiAgICAgICAgICAvLyBjb252ZXJ0IHByaW1pdGl2ZSB0byB2bm9kZVxuICAgICAgICAgIHJlcy5wdXNoKGNyZWF0ZVRleHRWTm9kZShjKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1RleHROb2RlKGMpICYmIGlzVGV4dE5vZGUobGFzdCkpIHtcbiAgICAgICAgICAvLyBtZXJnZSBhZGphY2VudCB0ZXh0IG5vZGVzXG4gICAgICAgICAgcmVzW2xhc3RJbmRleF0gPSBjcmVhdGVUZXh0Vk5vZGUobGFzdC50ZXh0ICsgYy50ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkZWZhdWx0IGtleSBmb3IgbmVzdGVkIGFycmF5IGNoaWxkcmVuIChsaWtlbHkgZ2VuZXJhdGVkIGJ5IHYtZm9yKVxuICAgICAgICAgIGlmIChpc1RydWUoY2hpbGRyZW4uX2lzVkxpc3QpICYmXG4gICAgICAgICAgICBpc0RlZihjLnRhZykgJiZcbiAgICAgICAgICAgIGlzVW5kZWYoYy5rZXkpICYmXG4gICAgICAgICAgICBpc0RlZihuZXN0ZWRJbmRleCkpIHtcbiAgICAgICAgICAgIGMua2V5ID0gXCJfX3ZsaXN0XCIgKyBuZXN0ZWRJbmRleCArIFwiX1wiICsgaSArIFwiX19cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2goYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gaW5pdFByb3ZpZGUgKHZtKSB7XG4gICAgdmFyIHByb3ZpZGUgPSB2bS4kb3B0aW9ucy5wcm92aWRlO1xuICAgIGlmIChwcm92aWRlKSB7XG4gICAgICB2bS5fcHJvdmlkZWQgPSB0eXBlb2YgcHJvdmlkZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHByb3ZpZGUuY2FsbCh2bSlcbiAgICAgICAgOiBwcm92aWRlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbmplY3Rpb25zICh2bSkge1xuICAgIHZhciByZXN1bHQgPSByZXNvbHZlSW5qZWN0KHZtLiRvcHRpb25zLmluamVjdCwgdm0pO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSk7XG4gICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICB7XG4gICAgICAgICAgZGVmaW5lUmVhY3RpdmUkJDEodm0sIGtleSwgcmVzdWx0W2tleV0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYW4gaW5qZWN0ZWQgdmFsdWUgZGlyZWN0bHkgc2luY2UgdGhlIGNoYW5nZXMgd2lsbCBiZSBcIiArXG4gICAgICAgICAgICAgIFwib3ZlcndyaXR0ZW4gd2hlbmV2ZXIgdGhlIHByb3ZpZGVkIGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICAgIFwiaW5qZWN0aW9uIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxuICAgICAgICAgICAgICB2bVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUluamVjdCAoaW5qZWN0LCB2bSkge1xuICAgIGlmIChpbmplY3QpIHtcbiAgICAgIC8vIGluamVjdCBpcyA6YW55IGJlY2F1c2UgZmxvdyBpcyBub3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgY2FjaGVkXG4gICAgICB2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHZhciBrZXlzID0gaGFzU3ltYm9sXG4gICAgICAgID8gUmVmbGVjdC5vd25LZXlzKGluamVjdClcbiAgICAgICAgOiBPYmplY3Qua2V5cyhpbmplY3QpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIC8vICM2NTc0IGluIGNhc2UgdGhlIGluamVjdCBvYmplY3QgaXMgb2JzZXJ2ZWQuLi5cbiAgICAgICAgaWYgKGtleSA9PT0gJ19fb2JfXycpIHsgY29udGludWUgfVxuICAgICAgICB2YXIgcHJvdmlkZUtleSA9IGluamVjdFtrZXldLmZyb207XG4gICAgICAgIHZhciBzb3VyY2UgPSB2bTtcbiAgICAgICAgd2hpbGUgKHNvdXJjZSkge1xuICAgICAgICAgIGlmIChzb3VyY2UuX3Byb3ZpZGVkICYmIGhhc093bihzb3VyY2UuX3Byb3ZpZGVkLCBwcm92aWRlS2V5KSkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzb3VyY2UuX3Byb3ZpZGVkW3Byb3ZpZGVLZXldO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgc291cmNlID0gc291cmNlLiRwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICBpZiAoJ2RlZmF1bHQnIGluIGluamVjdFtrZXldKSB7XG4gICAgICAgICAgICB2YXIgcHJvdmlkZURlZmF1bHQgPSBpbmplY3Rba2V5XS5kZWZhdWx0O1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0eXBlb2YgcHJvdmlkZURlZmF1bHQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgPyBwcm92aWRlRGVmYXVsdC5jYWxsKHZtKVxuICAgICAgICAgICAgICA6IHByb3ZpZGVEZWZhdWx0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXJuKChcIkluamVjdGlvbiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgbm90IGZvdW5kXCIpLCB2bSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cblxuXG4gIC8qKlxuICAgKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIHJhdyBjaGlsZHJlbiBWTm9kZXMgaW50byBhIHNsb3Qgb2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gcmVzb2x2ZVNsb3RzIChcbiAgICBjaGlsZHJlbixcbiAgICBjb250ZXh0XG4gICkge1xuICAgIGlmICghY2hpbGRyZW4gfHwgIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICAgIHZhciBzbG90cyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIHZhciBkYXRhID0gY2hpbGQuZGF0YTtcbiAgICAgIC8vIHJlbW92ZSBzbG90IGF0dHJpYnV0ZSBpZiB0aGUgbm9kZSBpcyByZXNvbHZlZCBhcyBhIFZ1ZSBzbG90IG5vZGVcbiAgICAgIGlmIChkYXRhICYmIGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5zbG90KSB7XG4gICAgICAgIGRlbGV0ZSBkYXRhLmF0dHJzLnNsb3Q7XG4gICAgICB9XG4gICAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcbiAgICAgIC8vIHNhbWUgY29udGV4dC5cbiAgICAgIGlmICgoY2hpbGQuY29udGV4dCA9PT0gY29udGV4dCB8fCBjaGlsZC5mbkNvbnRleHQgPT09IGNvbnRleHQpICYmXG4gICAgICAgIGRhdGEgJiYgZGF0YS5zbG90ICE9IG51bGxcbiAgICAgICkge1xuICAgICAgICB2YXIgbmFtZSA9IGRhdGEuc2xvdDtcbiAgICAgICAgdmFyIHNsb3QgPSAoc2xvdHNbbmFtZV0gfHwgKHNsb3RzW25hbWVdID0gW10pKTtcbiAgICAgICAgaWYgKGNoaWxkLnRhZyA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICAgIHNsb3QucHVzaC5hcHBseShzbG90LCBjaGlsZC5jaGlsZHJlbiB8fCBbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xvdC5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHNsb3RzLmRlZmF1bHQgfHwgKHNsb3RzLmRlZmF1bHQgPSBbXSkpLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpZ25vcmUgc2xvdHMgdGhhdCBjb250YWlucyBvbmx5IHdoaXRlc3BhY2VcbiAgICBmb3IgKHZhciBuYW1lJDEgaW4gc2xvdHMpIHtcbiAgICAgIGlmIChzbG90c1tuYW1lJDFdLmV2ZXJ5KGlzV2hpdGVzcGFjZSkpIHtcbiAgICAgICAgZGVsZXRlIHNsb3RzW25hbWUkMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzbG90c1xuICB9XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChub2RlKSB7XG4gICAgcmV0dXJuIChub2RlLmlzQ29tbWVudCAmJiAhbm9kZS5hc3luY0ZhY3RvcnkpIHx8IG5vZGUudGV4dCA9PT0gJyAnXG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemVTY29wZWRTbG90cyAoXG4gICAgc2xvdHMsXG4gICAgbm9ybWFsU2xvdHMsXG4gICAgcHJldlNsb3RzXG4gICkge1xuICAgIHZhciByZXM7XG4gICAgdmFyIGhhc05vcm1hbFNsb3RzID0gT2JqZWN0LmtleXMobm9ybWFsU2xvdHMpLmxlbmd0aCA+IDA7XG4gICAgdmFyIGlzU3RhYmxlID0gc2xvdHMgPyAhIXNsb3RzLiRzdGFibGUgOiAhaGFzTm9ybWFsU2xvdHM7XG4gICAgdmFyIGtleSA9IHNsb3RzICYmIHNsb3RzLiRrZXk7XG4gICAgaWYgKCFzbG90cykge1xuICAgICAgcmVzID0ge307XG4gICAgfSBlbHNlIGlmIChzbG90cy5fbm9ybWFsaXplZCkge1xuICAgICAgLy8gZmFzdCBwYXRoIDE6IGNoaWxkIGNvbXBvbmVudCByZS1yZW5kZXIgb25seSwgcGFyZW50IGRpZCBub3QgY2hhbmdlXG4gICAgICByZXR1cm4gc2xvdHMuX25vcm1hbGl6ZWRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaXNTdGFibGUgJiZcbiAgICAgIHByZXZTbG90cyAmJlxuICAgICAgcHJldlNsb3RzICE9PSBlbXB0eU9iamVjdCAmJlxuICAgICAga2V5ID09PSBwcmV2U2xvdHMuJGtleSAmJlxuICAgICAgIWhhc05vcm1hbFNsb3RzICYmXG4gICAgICAhcHJldlNsb3RzLiRoYXNOb3JtYWxcbiAgICApIHtcbiAgICAgIC8vIGZhc3QgcGF0aCAyOiBzdGFibGUgc2NvcGVkIHNsb3RzIHcvIG5vIG5vcm1hbCBzbG90cyB0byBwcm94eSxcbiAgICAgIC8vIG9ubHkgbmVlZCB0byBub3JtYWxpemUgb25jZVxuICAgICAgcmV0dXJuIHByZXZTbG90c1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSB7fTtcbiAgICAgIGZvciAodmFyIGtleSQxIGluIHNsb3RzKSB7XG4gICAgICAgIGlmIChzbG90c1trZXkkMV0gJiYga2V5JDFbMF0gIT09ICckJykge1xuICAgICAgICAgIHJlc1trZXkkMV0gPSBub3JtYWxpemVTY29wZWRTbG90KG5vcm1hbFNsb3RzLCBrZXkkMSwgc2xvdHNba2V5JDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBleHBvc2Ugbm9ybWFsIHNsb3RzIG9uIHNjb3BlZFNsb3RzXG4gICAgZm9yICh2YXIga2V5JDIgaW4gbm9ybWFsU2xvdHMpIHtcbiAgICAgIGlmICghKGtleSQyIGluIHJlcykpIHtcbiAgICAgICAgcmVzW2tleSQyXSA9IHByb3h5Tm9ybWFsU2xvdChub3JtYWxTbG90cywga2V5JDIpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhdm9yaWF6IHNlZW1zIHRvIG1vY2sgYSBub24tZXh0ZW5zaWJsZSAkc2NvcGVkU2xvdHMgb2JqZWN0XG4gICAgLy8gYW5kIHdoZW4gdGhhdCBpcyBwYXNzZWQgZG93biB0aGlzIHdvdWxkIGNhdXNlIGFuIGVycm9yXG4gICAgaWYgKHNsb3RzICYmIE9iamVjdC5pc0V4dGVuc2libGUoc2xvdHMpKSB7XG4gICAgICAoc2xvdHMpLl9ub3JtYWxpemVkID0gcmVzO1xuICAgIH1cbiAgICBkZWYocmVzLCAnJHN0YWJsZScsIGlzU3RhYmxlKTtcbiAgICBkZWYocmVzLCAnJGtleScsIGtleSk7XG4gICAgZGVmKHJlcywgJyRoYXNOb3JtYWwnLCBoYXNOb3JtYWxTbG90cyk7XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplU2NvcGVkU2xvdChub3JtYWxTbG90cywga2V5LCBmbikge1xuICAgIHZhciBub3JtYWxpemVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlcyA9IGFyZ3VtZW50cy5sZW5ndGggPyBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpIDogZm4oe30pO1xuICAgICAgcmVzID0gcmVzICYmIHR5cGVvZiByZXMgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHJlcylcbiAgICAgICAgPyBbcmVzXSAvLyBzaW5nbGUgdm5vZGVcbiAgICAgICAgOiBub3JtYWxpemVDaGlsZHJlbihyZXMpO1xuICAgICAgcmV0dXJuIHJlcyAmJiAoXG4gICAgICAgIHJlcy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgKHJlcy5sZW5ndGggPT09IDEgJiYgcmVzWzBdLmlzQ29tbWVudCkgLy8gIzk2NThcbiAgICAgICkgPyB1bmRlZmluZWRcbiAgICAgICAgOiByZXNcbiAgICB9O1xuICAgIC8vIHRoaXMgaXMgYSBzbG90IHVzaW5nIHRoZSBuZXcgdi1zbG90IHN5bnRheCB3aXRob3V0IHNjb3BlLiBhbHRob3VnaCBpdCBpc1xuICAgIC8vIGNvbXBpbGVkIGFzIGEgc2NvcGVkIHNsb3QsIHJlbmRlciBmbiB1c2VycyB3b3VsZCBleHBlY3QgaXQgdG8gYmUgcHJlc2VudFxuICAgIC8vIG9uIHRoaXMuJHNsb3RzIGJlY2F1c2UgdGhlIHVzYWdlIGlzIHNlbWFudGljYWxseSBhIG5vcm1hbCBzbG90LlxuICAgIGlmIChmbi5wcm94eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5vcm1hbFNsb3RzLCBrZXksIHtcbiAgICAgICAgZ2V0OiBub3JtYWxpemVkLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZFxuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlOb3JtYWxTbG90KHNsb3RzLCBrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gc2xvdHNba2V5XTsgfVxuICB9XG5cbiAgLyogICovXG5cbiAgLyoqXG4gICAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgdi1mb3IgbGlzdHMuXG4gICAqL1xuICBmdW5jdGlvbiByZW5kZXJMaXN0IChcbiAgICB2YWwsXG4gICAgcmVuZGVyXG4gICkge1xuICAgIHZhciByZXQsIGksIGwsIGtleXMsIGtleTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXQgPSBuZXcgQXJyYXkodmFsLmxlbmd0aCk7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gdmFsLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICByZXRbaV0gPSByZW5kZXIodmFsW2ldLCBpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICByZXQgPSBuZXcgQXJyYXkodmFsKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWw7IGkrKykge1xuICAgICAgICByZXRbaV0gPSByZW5kZXIoaSArIDEsIGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgaWYgKGhhc1N5bWJvbCAmJiB2YWxbU3ltYm9sLml0ZXJhdG9yXSkge1xuICAgICAgICByZXQgPSBbXTtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gdmFsW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuICAgICAgICAgIHJldC5wdXNoKHJlbmRlcihyZXN1bHQudmFsdWUsIHJldC5sZW5ndGgpKTtcbiAgICAgICAgICByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgICAgICByZXQgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxba2V5XSwga2V5LCBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzRGVmKHJldCkpIHtcbiAgICAgIHJldCA9IFtdO1xuICAgIH1cbiAgICAocmV0KS5faXNWTGlzdCA9IHRydWU7XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgLyogICovXG5cbiAgLyoqXG4gICAqIFJ1bnRpbWUgaGVscGVyIGZvciByZW5kZXJpbmcgPHNsb3Q+XG4gICAqL1xuICBmdW5jdGlvbiByZW5kZXJTbG90IChcbiAgICBuYW1lLFxuICAgIGZhbGxiYWNrLFxuICAgIHByb3BzLFxuICAgIGJpbmRPYmplY3RcbiAgKSB7XG4gICAgdmFyIHNjb3BlZFNsb3RGbiA9IHRoaXMuJHNjb3BlZFNsb3RzW25hbWVdO1xuICAgIHZhciBub2RlcztcbiAgICBpZiAoc2NvcGVkU2xvdEZuKSB7IC8vIHNjb3BlZCBzbG90XG4gICAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgICAgaWYgKGJpbmRPYmplY3QpIHtcbiAgICAgICAgaWYgKCFpc09iamVjdChiaW5kT2JqZWN0KSkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnc2xvdCB2LWJpbmQgd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCcsXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9wcyA9IGV4dGVuZChleHRlbmQoe30sIGJpbmRPYmplY3QpLCBwcm9wcyk7XG4gICAgICB9XG4gICAgICBub2RlcyA9IHNjb3BlZFNsb3RGbihwcm9wcykgfHwgZmFsbGJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVzID0gdGhpcy4kc2xvdHNbbmFtZV0gfHwgZmFsbGJhY2s7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldCA9IHByb3BzICYmIHByb3BzLnNsb3Q7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJywgeyBzbG90OiB0YXJnZXQgfSwgbm9kZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2Rlc1xuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8qKlxuICAgKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIGZpbHRlcnNcbiAgICovXG4gIGZ1bmN0aW9uIHJlc29sdmVGaWx0ZXIgKGlkKSB7XG4gICAgcmV0dXJuIHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnZmlsdGVycycsIGlkLCB0cnVlKSB8fCBpZGVudGl0eVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gaXNLZXlOb3RNYXRjaCAoZXhwZWN0LCBhY3R1YWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3QpKSB7XG4gICAgICByZXR1cm4gZXhwZWN0LmluZGV4T2YoYWN0dWFsKSA9PT0gLTFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGV4cGVjdCAhPT0gYWN0dWFsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnRpbWUgaGVscGVyIGZvciBjaGVja2luZyBrZXlDb2RlcyBmcm9tIGNvbmZpZy5cbiAgICogZXhwb3NlZCBhcyBWdWUucHJvdG90eXBlLl9rXG4gICAqIHBhc3NpbmcgaW4gZXZlbnRLZXlOYW1lIGFzIGxhc3QgYXJndW1lbnQgc2VwYXJhdGVseSBmb3IgYmFja3dhcmRzIGNvbXBhdFxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tLZXlDb2RlcyAoXG4gICAgZXZlbnRLZXlDb2RlLFxuICAgIGtleSxcbiAgICBidWlsdEluS2V5Q29kZSxcbiAgICBldmVudEtleU5hbWUsXG4gICAgYnVpbHRJbktleU5hbWVcbiAgKSB7XG4gICAgdmFyIG1hcHBlZEtleUNvZGUgPSBjb25maWcua2V5Q29kZXNba2V5XSB8fCBidWlsdEluS2V5Q29kZTtcbiAgICBpZiAoYnVpbHRJbktleU5hbWUgJiYgZXZlbnRLZXlOYW1lICYmICFjb25maWcua2V5Q29kZXNba2V5XSkge1xuICAgICAgcmV0dXJuIGlzS2V5Tm90TWF0Y2goYnVpbHRJbktleU5hbWUsIGV2ZW50S2V5TmFtZSlcbiAgICB9IGVsc2UgaWYgKG1hcHBlZEtleUNvZGUpIHtcbiAgICAgIHJldHVybiBpc0tleU5vdE1hdGNoKG1hcHBlZEtleUNvZGUsIGV2ZW50S2V5Q29kZSlcbiAgICB9IGVsc2UgaWYgKGV2ZW50S2V5TmFtZSkge1xuICAgICAgcmV0dXJuIGh5cGhlbmF0ZShldmVudEtleU5hbWUpICE9PSBrZXlcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICAvKipcbiAgICogUnVudGltZSBoZWxwZXIgZm9yIG1lcmdpbmcgdi1iaW5kPVwib2JqZWN0XCIgaW50byBhIFZOb2RlJ3MgZGF0YS5cbiAgICovXG4gIGZ1bmN0aW9uIGJpbmRPYmplY3RQcm9wcyAoXG4gICAgZGF0YSxcbiAgICB0YWcsXG4gICAgdmFsdWUsXG4gICAgYXNQcm9wLFxuICAgIGlzU3luY1xuICApIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ3YtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IG9yIEFycmF5IHZhbHVlJyxcbiAgICAgICAgICB0aGlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHRvT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzaDtcbiAgICAgICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGtleSApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBrZXkgPT09ICdjbGFzcycgfHxcbiAgICAgICAgICAgIGtleSA9PT0gJ3N0eWxlJyB8fFxuICAgICAgICAgICAgaXNSZXNlcnZlZEF0dHJpYnV0ZShrZXkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBoYXNoID0gZGF0YTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMudHlwZTtcbiAgICAgICAgICAgIGhhc2ggPSBhc1Byb3AgfHwgY29uZmlnLm11c3RVc2VQcm9wKHRhZywgdHlwZSwga2V5KVxuICAgICAgICAgICAgICA/IGRhdGEuZG9tUHJvcHMgfHwgKGRhdGEuZG9tUHJvcHMgPSB7fSlcbiAgICAgICAgICAgICAgOiBkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2FtZWxpemVkS2V5ID0gY2FtZWxpemUoa2V5KTtcbiAgICAgICAgICB2YXIgaHlwaGVuYXRlZEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgICAgIGlmICghKGNhbWVsaXplZEtleSBpbiBoYXNoKSAmJiAhKGh5cGhlbmF0ZWRLZXkgaW4gaGFzaCkpIHtcbiAgICAgICAgICAgIGhhc2hba2V5XSA9IHZhbHVlW2tleV07XG5cbiAgICAgICAgICAgIGlmIChpc1N5bmMpIHtcbiAgICAgICAgICAgICAgdmFyIG9uID0gZGF0YS5vbiB8fCAoZGF0YS5vbiA9IHt9KTtcbiAgICAgICAgICAgICAgb25bKFwidXBkYXRlOlwiICsga2V5KV0gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVba2V5XSA9ICRldmVudDtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSBsb29wKCBrZXkgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8qKlxuICAgKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIHN0YXRpYyB0cmVlcy5cbiAgICovXG4gIGZ1bmN0aW9uIHJlbmRlclN0YXRpYyAoXG4gICAgaW5kZXgsXG4gICAgaXNJbkZvclxuICApIHtcbiAgICB2YXIgY2FjaGVkID0gdGhpcy5fc3RhdGljVHJlZXMgfHwgKHRoaXMuX3N0YXRpY1RyZWVzID0gW10pO1xuICAgIHZhciB0cmVlID0gY2FjaGVkW2luZGV4XTtcbiAgICAvLyBpZiBoYXMgYWxyZWFkeS1yZW5kZXJlZCBzdGF0aWMgdHJlZSBhbmQgbm90IGluc2lkZSB2LWZvcixcbiAgICAvLyB3ZSBjYW4gcmV1c2UgdGhlIHNhbWUgdHJlZS5cbiAgICBpZiAodHJlZSAmJiAhaXNJbkZvcikge1xuICAgICAgcmV0dXJuIHRyZWVcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlLCByZW5kZXIgYSBmcmVzaCB0cmVlLlxuICAgIHRyZWUgPSBjYWNoZWRbaW5kZXhdID0gdGhpcy4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNbaW5kZXhdLmNhbGwoXG4gICAgICB0aGlzLl9yZW5kZXJQcm94eSxcbiAgICAgIG51bGwsXG4gICAgICB0aGlzIC8vIGZvciByZW5kZXIgZm5zIGdlbmVyYXRlZCBmb3IgZnVuY3Rpb25hbCBjb21wb25lbnQgdGVtcGxhdGVzXG4gICAgKTtcbiAgICBtYXJrU3RhdGljKHRyZWUsIChcIl9fc3RhdGljX19cIiArIGluZGV4KSwgZmFsc2UpO1xuICAgIHJldHVybiB0cmVlXG4gIH1cblxuICAvKipcbiAgICogUnVudGltZSBoZWxwZXIgZm9yIHYtb25jZS5cbiAgICogRWZmZWN0aXZlbHkgaXQgbWVhbnMgbWFya2luZyB0aGUgbm9kZSBhcyBzdGF0aWMgd2l0aCBhIHVuaXF1ZSBrZXkuXG4gICAqL1xuICBmdW5jdGlvbiBtYXJrT25jZSAoXG4gICAgdHJlZSxcbiAgICBpbmRleCxcbiAgICBrZXlcbiAgKSB7XG4gICAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX29uY2VfX1wiICsgaW5kZXggKyAoa2V5ID8gKFwiX1wiICsga2V5KSA6IFwiXCIpKSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRyZWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtTdGF0aWMgKFxuICAgIHRyZWUsXG4gICAga2V5LFxuICAgIGlzT25jZVxuICApIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0cmVlW2ldICYmIHR5cGVvZiB0cmVlW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIG1hcmtTdGF0aWNOb2RlKHRyZWVbaV0sIChrZXkgKyBcIl9cIiArIGkpLCBpc09uY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmtTdGF0aWNOb2RlKHRyZWUsIGtleSwgaXNPbmNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrU3RhdGljTm9kZSAobm9kZSwga2V5LCBpc09uY2UpIHtcbiAgICBub2RlLmlzU3RhdGljID0gdHJ1ZTtcbiAgICBub2RlLmtleSA9IGtleTtcbiAgICBub2RlLmlzT25jZSA9IGlzT25jZTtcbiAgfVxuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGJpbmRPYmplY3RMaXN0ZW5lcnMgKGRhdGEsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ3Ytb24gd2l0aG91dCBhcmd1bWVudCBleHBlY3RzIGFuIE9iamVjdCB2YWx1ZScsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG9uID0gZGF0YS5vbiA9IGRhdGEub24gPyBleHRlbmQoe30sIGRhdGEub24pIDoge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgIHZhciBleGlzdGluZyA9IG9uW2tleV07XG4gICAgICAgICAgdmFyIG91cnMgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgIG9uW2tleV0gPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgb3VycykgOiBvdXJzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICAgIGZucywgLy8gc2VlIGZsb3cvdm5vZGVcbiAgICByZXMsXG4gICAgLy8gdGhlIGZvbGxvd2luZyBhcmUgYWRkZWQgaW4gMi42XG4gICAgaGFzRHluYW1pY0tleXMsXG4gICAgY29udGVudEhhc2hLZXlcbiAgKSB7XG4gICAgcmVzID0gcmVzIHx8IHsgJHN0YWJsZTogIWhhc0R5bmFtaWNLZXlzIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzbG90ID0gZm5zW2ldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2xvdCkpIHtcbiAgICAgICAgcmVzb2x2ZVNjb3BlZFNsb3RzKHNsb3QsIHJlcywgaGFzRHluYW1pY0tleXMpO1xuICAgICAgfSBlbHNlIGlmIChzbG90KSB7XG4gICAgICAgIC8vIG1hcmtlciBmb3IgcmV2ZXJzZSBwcm94eWluZyB2LXNsb3Qgd2l0aG91dCBzY29wZSBvbiB0aGlzLiRzbG90c1xuICAgICAgICBpZiAoc2xvdC5wcm94eSkge1xuICAgICAgICAgIHNsb3QuZm4ucHJveHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc1tzbG90LmtleV0gPSBzbG90LmZuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29udGVudEhhc2hLZXkpIHtcbiAgICAgIChyZXMpLiRrZXkgPSBjb250ZW50SGFzaEtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gYmluZER5bmFtaWNLZXlzIChiYXNlT2JqLCB2YWx1ZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIGtleSA9IHZhbHVlc1tpXTtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBrZXkpIHtcbiAgICAgICAgYmFzZU9ialt2YWx1ZXNbaV1dID0gdmFsdWVzW2kgKyAxXTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSAnJyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgLy8gbnVsbCBpcyBhIHNwZWNpYWwgdmFsdWUgZm9yIGV4cGxpY2l0bHkgcmVtb3ZpbmcgYSBiaW5kaW5nXG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiSW52YWxpZCB2YWx1ZSBmb3IgZHluYW1pYyBkaXJlY3RpdmUgYXJndW1lbnQgKGV4cGVjdGVkIHN0cmluZyBvciBudWxsKTogXCIgKyBrZXkpLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJhc2VPYmpcbiAgfVxuXG4gIC8vIGhlbHBlciB0byBkeW5hbWljYWxseSBhcHBlbmQgbW9kaWZpZXIgcnVudGltZSBtYXJrZXJzIHRvIGV2ZW50IG5hbWVzLlxuICAvLyBlbnN1cmUgb25seSBhcHBlbmQgd2hlbiB2YWx1ZSBpcyBhbHJlYWR5IHN0cmluZywgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgY2FzdFxuICAvLyB0byBzdHJpbmcgYW5kIGNhdXNlIHRoZSB0eXBlIGNoZWNrIHRvIG1pc3MuXG4gIGZ1bmN0aW9uIHByZXBlbmRNb2RpZmllciAodmFsdWUsIHN5bWJvbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gc3ltYm9sICsgdmFsdWUgOiB2YWx1ZVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gaW5zdGFsbFJlbmRlckhlbHBlcnMgKHRhcmdldCkge1xuICAgIHRhcmdldC5fbyA9IG1hcmtPbmNlO1xuICAgIHRhcmdldC5fbiA9IHRvTnVtYmVyO1xuICAgIHRhcmdldC5fcyA9IHRvU3RyaW5nO1xuICAgIHRhcmdldC5fbCA9IHJlbmRlckxpc3Q7XG4gICAgdGFyZ2V0Ll90ID0gcmVuZGVyU2xvdDtcbiAgICB0YXJnZXQuX3EgPSBsb29zZUVxdWFsO1xuICAgIHRhcmdldC5faSA9IGxvb3NlSW5kZXhPZjtcbiAgICB0YXJnZXQuX20gPSByZW5kZXJTdGF0aWM7XG4gICAgdGFyZ2V0Ll9mID0gcmVzb2x2ZUZpbHRlcjtcbiAgICB0YXJnZXQuX2sgPSBjaGVja0tleUNvZGVzO1xuICAgIHRhcmdldC5fYiA9IGJpbmRPYmplY3RQcm9wcztcbiAgICB0YXJnZXQuX3YgPSBjcmVhdGVUZXh0Vk5vZGU7XG4gICAgdGFyZ2V0Ll9lID0gY3JlYXRlRW1wdHlWTm9kZTtcbiAgICB0YXJnZXQuX3UgPSByZXNvbHZlU2NvcGVkU2xvdHM7XG4gICAgdGFyZ2V0Ll9nID0gYmluZE9iamVjdExpc3RlbmVycztcbiAgICB0YXJnZXQuX2QgPSBiaW5kRHluYW1pY0tleXM7XG4gICAgdGFyZ2V0Ll9wID0gcHJlcGVuZE1vZGlmaWVyO1xuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gRnVuY3Rpb25hbFJlbmRlckNvbnRleHQgKFxuICAgIGRhdGEsXG4gICAgcHJvcHMsXG4gICAgY2hpbGRyZW4sXG4gICAgcGFyZW50LFxuICAgIEN0b3JcbiAgKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IEN0b3Iub3B0aW9ucztcbiAgICAvLyBlbnN1cmUgdGhlIGNyZWF0ZUVsZW1lbnQgZnVuY3Rpb24gaW4gZnVuY3Rpb25hbCBjb21wb25lbnRzXG4gICAgLy8gZ2V0cyBhIHVuaXF1ZSBjb250ZXh0IC0gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIGNvcnJlY3QgbmFtZWQgc2xvdCBjaGVja1xuICAgIHZhciBjb250ZXh0Vm07XG4gICAgaWYgKGhhc093bihwYXJlbnQsICdfdWlkJykpIHtcbiAgICAgIGNvbnRleHRWbSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgICAgY29udGV4dFZtLl9vcmlnaW5hbCA9IHBhcmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhlIGNvbnRleHQgdm0gcGFzc2VkIGluIGlzIGEgZnVuY3Rpb25hbCBjb250ZXh0IGFzIHdlbGwuXG4gICAgICAvLyBpbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBtYWtlIHN1cmUgd2UgYXJlIGFibGUgdG8gZ2V0IGEgaG9sZCB0byB0aGVcbiAgICAgIC8vIHJlYWwgY29udGV4dCBpbnN0YW5jZS5cbiAgICAgIGNvbnRleHRWbSA9IHBhcmVudDtcbiAgICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgICAgcGFyZW50ID0gcGFyZW50Ll9vcmlnaW5hbDtcbiAgICB9XG4gICAgdmFyIGlzQ29tcGlsZWQgPSBpc1RydWUob3B0aW9ucy5fY29tcGlsZWQpO1xuICAgIHZhciBuZWVkTm9ybWFsaXphdGlvbiA9ICFpc0NvbXBpbGVkO1xuXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMubGlzdGVuZXJzID0gZGF0YS5vbiB8fCBlbXB0eU9iamVjdDtcbiAgICB0aGlzLmluamVjdGlvbnMgPSByZXNvbHZlSW5qZWN0KG9wdGlvbnMuaW5qZWN0LCBwYXJlbnQpO1xuICAgIHRoaXMuc2xvdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMkMS4kc2xvdHMpIHtcbiAgICAgICAgbm9ybWFsaXplU2NvcGVkU2xvdHMoXG4gICAgICAgICAgZGF0YS5zY29wZWRTbG90cyxcbiAgICAgICAgICB0aGlzJDEuJHNsb3RzID0gcmVzb2x2ZVNsb3RzKGNoaWxkcmVuLCBwYXJlbnQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcyQxLiRzbG90c1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Njb3BlZFNsb3RzJywgKHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCAoKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVTY29wZWRTbG90cyhkYXRhLnNjb3BlZFNsb3RzLCB0aGlzLnNsb3RzKCkpXG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgY29tcGlsZWQgZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICAgIGlmIChpc0NvbXBpbGVkKSB7XG4gICAgICAvLyBleHBvc2luZyAkb3B0aW9ucyBmb3IgcmVuZGVyU3RhdGljKClcbiAgICAgIHRoaXMuJG9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgLy8gcHJlLXJlc29sdmUgc2xvdHMgZm9yIHJlbmRlclNsb3QoKVxuICAgICAgdGhpcy4kc2xvdHMgPSB0aGlzLnNsb3RzKCk7XG4gICAgICB0aGlzLiRzY29wZWRTbG90cyA9IG5vcm1hbGl6ZVNjb3BlZFNsb3RzKGRhdGEuc2NvcGVkU2xvdHMsIHRoaXMuJHNsb3RzKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5fc2NvcGVJZCkge1xuICAgICAgdGhpcy5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciB2bm9kZSA9IGNyZWF0ZUVsZW1lbnQoY29udGV4dFZtLCBhLCBiLCBjLCBkLCBuZWVkTm9ybWFsaXphdGlvbik7XG4gICAgICAgIGlmICh2bm9kZSAmJiAhQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgICB2bm9kZS5mblNjb3BlSWQgPSBvcHRpb25zLl9zY29wZUlkO1xuICAgICAgICAgIHZub2RlLmZuQ29udGV4dCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm5vZGVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2MgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudChjb250ZXh0Vm0sIGEsIGIsIGMsIGQsIG5lZWROb3JtYWxpemF0aW9uKTsgfTtcbiAgICB9XG4gIH1cblxuICBpbnN0YWxsUmVuZGVySGVscGVycyhGdW5jdGlvbmFsUmVuZGVyQ29udGV4dC5wcm90b3R5cGUpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQgKFxuICAgIEN0b3IsXG4gICAgcHJvcHNEYXRhLFxuICAgIGRhdGEsXG4gICAgY29udGV4dFZtLFxuICAgIGNoaWxkcmVuXG4gICkge1xuICAgIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHZhciBwcm9wT3B0aW9ucyA9IG9wdGlvbnMucHJvcHM7XG4gICAgaWYgKGlzRGVmKHByb3BPcHRpb25zKSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhIHx8IGVtcHR5T2JqZWN0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzRGVmKGRhdGEuYXR0cnMpKSB7IG1lcmdlUHJvcHMocHJvcHMsIGRhdGEuYXR0cnMpOyB9XG4gICAgICBpZiAoaXNEZWYoZGF0YS5wcm9wcykpIHsgbWVyZ2VQcm9wcyhwcm9wcywgZGF0YS5wcm9wcyk7IH1cbiAgICB9XG5cbiAgICB2YXIgcmVuZGVyQ29udGV4dCA9IG5ldyBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dChcbiAgICAgIGRhdGEsXG4gICAgICBwcm9wcyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgY29udGV4dFZtLFxuICAgICAgQ3RvclxuICAgICk7XG5cbiAgICB2YXIgdm5vZGUgPSBvcHRpb25zLnJlbmRlci5jYWxsKG51bGwsIHJlbmRlckNvbnRleHQuX2MsIHJlbmRlckNvbnRleHQpO1xuXG4gICAgaWYgKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpIHtcbiAgICAgIHJldHVybiBjbG9uZUFuZE1hcmtGdW5jdGlvbmFsUmVzdWx0KHZub2RlLCBkYXRhLCByZW5kZXJDb250ZXh0LnBhcmVudCwgb3B0aW9ucywgcmVuZGVyQ29udGV4dClcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4gICAgICB2YXIgdm5vZGVzID0gbm9ybWFsaXplQ2hpbGRyZW4odm5vZGUpIHx8IFtdO1xuICAgICAgdmFyIHJlcyA9IG5ldyBBcnJheSh2bm9kZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc1tpXSA9IGNsb25lQW5kTWFya0Z1bmN0aW9uYWxSZXN1bHQodm5vZGVzW2ldLCBkYXRhLCByZW5kZXJDb250ZXh0LnBhcmVudCwgb3B0aW9ucywgcmVuZGVyQ29udGV4dCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVBbmRNYXJrRnVuY3Rpb25hbFJlc3VsdCAodm5vZGUsIGRhdGEsIGNvbnRleHRWbSwgb3B0aW9ucywgcmVuZGVyQ29udGV4dCkge1xuICAgIC8vICM3ODE3IGNsb25lIG5vZGUgYmVmb3JlIHNldHRpbmcgZm5Db250ZXh0LCBvdGhlcndpc2UgaWYgdGhlIG5vZGUgaXMgcmV1c2VkXG4gICAgLy8gKGUuZy4gaXQgd2FzIGZyb20gYSBjYWNoZWQgbm9ybWFsIHNsb3QpIHRoZSBmbkNvbnRleHQgY2F1c2VzIG5hbWVkIHNsb3RzXG4gICAgLy8gdGhhdCBzaG91bGQgbm90IGJlIG1hdGNoZWQgdG8gbWF0Y2guXG4gICAgdmFyIGNsb25lID0gY2xvbmVWTm9kZSh2bm9kZSk7XG4gICAgY2xvbmUuZm5Db250ZXh0ID0gY29udGV4dFZtO1xuICAgIGNsb25lLmZuT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAge1xuICAgICAgKGNsb25lLmRldnRvb2xzTWV0YSA9IGNsb25lLmRldnRvb2xzTWV0YSB8fCB7fSkucmVuZGVyQ29udGV4dCA9IHJlbmRlckNvbnRleHQ7XG4gICAgfVxuICAgIGlmIChkYXRhLnNsb3QpIHtcbiAgICAgIChjbG9uZS5kYXRhIHx8IChjbG9uZS5kYXRhID0ge30pKS5zbG90ID0gZGF0YS5zbG90O1xuICAgIH1cbiAgICByZXR1cm4gY2xvbmVcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlUHJvcHMgKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIHRvW2NhbWVsaXplKGtleSldID0gZnJvbVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8qICAqL1xuXG4gIC8qICAqL1xuXG4gIC8qICAqL1xuXG4gIC8vIGlubGluZSBob29rcyB0byBiZSBpbnZva2VkIG9uIGNvbXBvbmVudCBWTm9kZXMgZHVyaW5nIHBhdGNoXG4gIHZhciBjb21wb25lbnRWTm9kZUhvb2tzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQgKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgJiZcbiAgICAgICAgIXZub2RlLmNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCAmJlxuICAgICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZVxuICAgICAgKSB7XG4gICAgICAgIC8vIGtlcHQtYWxpdmUgY29tcG9uZW50cywgdHJlYXQgYXMgYSBwYXRjaFxuICAgICAgICB2YXIgbW91bnRlZE5vZGUgPSB2bm9kZTsgLy8gd29yayBhcm91bmQgZmxvd1xuICAgICAgICBjb21wb25lbnRWTm9kZUhvb2tzLnByZXBhdGNoKG1vdW50ZWROb2RlLCBtb3VudGVkTm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSA9IGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUoXG4gICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgYWN0aXZlSW5zdGFuY2VcbiAgICAgICAgKTtcbiAgICAgICAgY2hpbGQuJG1vdW50KGh5ZHJhdGluZyA/IHZub2RlLmVsbSA6IHVuZGVmaW5lZCwgaHlkcmF0aW5nKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJlcGF0Y2g6IGZ1bmN0aW9uIHByZXBhdGNoIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICAgIHZhciBjaGlsZCA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gb2xkVm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICB1cGRhdGVDaGlsZENvbXBvbmVudChcbiAgICAgICAgY2hpbGQsXG4gICAgICAgIG9wdGlvbnMucHJvcHNEYXRhLCAvLyB1cGRhdGVkIHByb3BzXG4gICAgICAgIG9wdGlvbnMubGlzdGVuZXJzLCAvLyB1cGRhdGVkIGxpc3RlbmVyc1xuICAgICAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgICAgICBvcHRpb25zLmNoaWxkcmVuIC8vIG5ldyBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgaW5zZXJ0OiBmdW5jdGlvbiBpbnNlcnQgKHZub2RlKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHZub2RlLmNvbnRleHQ7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgIGlmICghY29tcG9uZW50SW5zdGFuY2UuX2lzTW91bnRlZCkge1xuICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5faXNNb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgY2FsbEhvb2soY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAodm5vZGUuZGF0YS5rZWVwQWxpdmUpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuX2lzTW91bnRlZCkge1xuICAgICAgICAgIC8vIHZ1ZS1yb3V0ZXIjMTIxMlxuICAgICAgICAgIC8vIER1cmluZyB1cGRhdGVzLCBhIGtlcHQtYWxpdmUgY29tcG9uZW50J3MgY2hpbGQgY29tcG9uZW50cyBtYXlcbiAgICAgICAgICAvLyBjaGFuZ2UsIHNvIGRpcmVjdGx5IHdhbGtpbmcgdGhlIHRyZWUgaGVyZSBtYXkgY2FsbCBhY3RpdmF0ZWQgaG9va3NcbiAgICAgICAgICAvLyBvbiBpbmNvcnJlY3QgY2hpbGRyZW4uIEluc3RlYWQgd2UgcHVzaCB0aGVtIGludG8gYSBxdWV1ZSB3aGljaCB3aWxsXG4gICAgICAgICAgLy8gYmUgcHJvY2Vzc2VkIGFmdGVyIHRoZSB3aG9sZSBwYXRjaCBwcm9jZXNzIGVuZGVkLlxuICAgICAgICAgIHF1ZXVlQWN0aXZhdGVkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgaWYgKCFjb21wb25lbnRJbnN0YW5jZS5faXNEZXN0cm95ZWQpIHtcbiAgICAgICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLiRkZXN0cm95KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGhvb2tzVG9NZXJnZSA9IE9iamVjdC5rZXlzKGNvbXBvbmVudFZOb2RlSG9va3MpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gICAgQ3RvcixcbiAgICBkYXRhLFxuICAgIGNvbnRleHQsXG4gICAgY2hpbGRyZW4sXG4gICAgdGFnXG4gICkge1xuICAgIGlmIChpc1VuZGVmKEN0b3IpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgYmFzZUN0b3IgPSBjb250ZXh0LiRvcHRpb25zLl9iYXNlO1xuXG4gICAgLy8gcGxhaW4gb3B0aW9ucyBvYmplY3Q6IHR1cm4gaXQgaW50byBhIGNvbnN0cnVjdG9yXG4gICAgaWYgKGlzT2JqZWN0KEN0b3IpKSB7XG4gICAgICBDdG9yID0gYmFzZUN0b3IuZXh0ZW5kKEN0b3IpO1xuICAgIH1cblxuICAgIC8vIGlmIGF0IHRoaXMgc3RhZ2UgaXQncyBub3QgYSBjb25zdHJ1Y3RvciBvciBhbiBhc3luYyBjb21wb25lbnQgZmFjdG9yeSxcbiAgICAvLyByZWplY3QuXG4gICAgaWYgKHR5cGVvZiBDdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB7XG4gICAgICAgIHdhcm4oKFwiSW52YWxpZCBDb21wb25lbnQgZGVmaW5pdGlvbjogXCIgKyAoU3RyaW5nKEN0b3IpKSksIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gYXN5bmMgY29tcG9uZW50XG4gICAgdmFyIGFzeW5jRmFjdG9yeTtcbiAgICBpZiAoaXNVbmRlZihDdG9yLmNpZCkpIHtcbiAgICAgIGFzeW5jRmFjdG9yeSA9IEN0b3I7XG4gICAgICBDdG9yID0gcmVzb2x2ZUFzeW5jQ29tcG9uZW50KGFzeW5jRmFjdG9yeSwgYmFzZUN0b3IpO1xuICAgICAgaWYgKEN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciBub2RlIGZvciBhc3luYyBjb21wb25lbnQsIHdoaWNoIGlzIHJlbmRlcmVkXG4gICAgICAgIC8vIGFzIGEgY29tbWVudCBub2RlIGJ1dCBwcmVzZXJ2ZXMgYWxsIHRoZSByYXcgaW5mb3JtYXRpb24gZm9yIHRoZSBub2RlLlxuICAgICAgICAvLyB0aGUgaW5mb3JtYXRpb24gd2lsbCBiZSB1c2VkIGZvciBhc3luYyBzZXJ2ZXItcmVuZGVyaW5nIGFuZCBoeWRyYXRpb24uXG4gICAgICAgIHJldHVybiBjcmVhdGVBc3luY1BsYWNlaG9sZGVyKFxuICAgICAgICAgIGFzeW5jRmFjdG9yeSxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgdGFnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhID0gZGF0YSB8fCB7fTtcblxuICAgIC8vIHJlc29sdmUgY29uc3RydWN0b3Igb3B0aW9ucyBpbiBjYXNlIGdsb2JhbCBtaXhpbnMgYXJlIGFwcGxpZWQgYWZ0ZXJcbiAgICAvLyBjb21wb25lbnQgY29uc3RydWN0b3IgY3JlYXRpb25cbiAgICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3IpO1xuXG4gICAgLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGRhdGEgaW50byBwcm9wcyAmIGV2ZW50c1xuICAgIGlmIChpc0RlZihkYXRhLm1vZGVsKSkge1xuICAgICAgdHJhbnNmb3JtTW9kZWwoQ3Rvci5vcHRpb25zLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBleHRyYWN0IHByb3BzXG4gICAgdmFyIHByb3BzRGF0YSA9IGV4dHJhY3RQcm9wc0Zyb21WTm9kZURhdGEoZGF0YSwgQ3RvciwgdGFnKTtcblxuICAgIC8vIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4gICAgaWYgKGlzVHJ1ZShDdG9yLm9wdGlvbnMuZnVuY3Rpb25hbCkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVGdW5jdGlvbmFsQ29tcG9uZW50KEN0b3IsIHByb3BzRGF0YSwgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCBsaXN0ZW5lcnMsIHNpbmNlIHRoZXNlIG5lZWRzIHRvIGJlIHRyZWF0ZWQgYXNcbiAgICAvLyBjaGlsZCBjb21wb25lbnQgbGlzdGVuZXJzIGluc3RlYWQgb2YgRE9NIGxpc3RlbmVyc1xuICAgIHZhciBsaXN0ZW5lcnMgPSBkYXRhLm9uO1xuICAgIC8vIHJlcGxhY2Ugd2l0aCBsaXN0ZW5lcnMgd2l0aCAubmF0aXZlIG1vZGlmaWVyXG4gICAgLy8gc28gaXQgZ2V0cyBwcm9jZXNzZWQgZHVyaW5nIHBhcmVudCBjb21wb25lbnQgcGF0Y2guXG4gICAgZGF0YS5vbiA9IGRhdGEubmF0aXZlT247XG5cbiAgICBpZiAoaXNUcnVlKEN0b3Iub3B0aW9ucy5hYnN0cmFjdCkpIHtcbiAgICAgIC8vIGFic3RyYWN0IGNvbXBvbmVudHMgZG8gbm90IGtlZXAgYW55dGhpbmdcbiAgICAgIC8vIG90aGVyIHRoYW4gcHJvcHMgJiBsaXN0ZW5lcnMgJiBzbG90XG5cbiAgICAgIC8vIHdvcmsgYXJvdW5kIGZsb3dcbiAgICAgIHZhciBzbG90ID0gZGF0YS5zbG90O1xuICAgICAgZGF0YSA9IHt9O1xuICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgZGF0YS5zbG90ID0gc2xvdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbnN0YWxsIGNvbXBvbmVudCBtYW5hZ2VtZW50IGhvb2tzIG9udG8gdGhlIHBsYWNlaG9sZGVyIG5vZGVcbiAgICBpbnN0YWxsQ29tcG9uZW50SG9va3MoZGF0YSk7XG5cbiAgICAvLyByZXR1cm4gYSBwbGFjZWhvbGRlciB2bm9kZVxuICAgIHZhciBuYW1lID0gQ3Rvci5vcHRpb25zLm5hbWUgfHwgdGFnO1xuICAgIHZhciB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAgIChcInZ1ZS1jb21wb25lbnQtXCIgKyAoQ3Rvci5jaWQpICsgKG5hbWUgPyAoXCItXCIgKyBuYW1lKSA6ICcnKSksXG4gICAgICBkYXRhLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0LFxuICAgICAgeyBDdG9yOiBDdG9yLCBwcm9wc0RhdGE6IHByb3BzRGF0YSwgbGlzdGVuZXJzOiBsaXN0ZW5lcnMsIHRhZzogdGFnLCBjaGlsZHJlbjogY2hpbGRyZW4gfSxcbiAgICAgIGFzeW5jRmFjdG9yeVxuICAgICk7XG5cbiAgICByZXR1cm4gdm5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlRm9yVm5vZGUgKFxuICAgIHZub2RlLCAvLyB3ZSBrbm93IGl0J3MgTW91bnRlZENvbXBvbmVudFZOb2RlIGJ1dCBmbG93IGRvZXNuJ3RcbiAgICBwYXJlbnQgLy8gYWN0aXZlSW5zdGFuY2UgaW4gbGlmZWN5Y2xlIHN0YXRlXG4gICkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgX2lzQ29tcG9uZW50OiB0cnVlLFxuICAgICAgX3BhcmVudFZub2RlOiB2bm9kZSxcbiAgICAgIHBhcmVudDogcGFyZW50XG4gICAgfTtcbiAgICAvLyBjaGVjayBpbmxpbmUtdGVtcGxhdGUgcmVuZGVyIGZ1bmN0aW9uc1xuICAgIHZhciBpbmxpbmVUZW1wbGF0ZSA9IHZub2RlLmRhdGEuaW5saW5lVGVtcGxhdGU7XG4gICAgaWYgKGlzRGVmKGlubGluZVRlbXBsYXRlKSkge1xuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBpbmxpbmVUZW1wbGF0ZS5yZW5kZXI7XG4gICAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGlubGluZVRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyB2bm9kZS5jb21wb25lbnRPcHRpb25zLkN0b3Iob3B0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIGluc3RhbGxDb21wb25lbnRIb29rcyAoZGF0YSkge1xuICAgIHZhciBob29rcyA9IGRhdGEuaG9vayB8fCAoZGF0YS5ob29rID0ge30pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3NUb01lcmdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gaG9va3NUb01lcmdlW2ldO1xuICAgICAgdmFyIGV4aXN0aW5nID0gaG9va3Nba2V5XTtcbiAgICAgIHZhciB0b01lcmdlID0gY29tcG9uZW50Vk5vZGVIb29rc1trZXldO1xuICAgICAgaWYgKGV4aXN0aW5nICE9PSB0b01lcmdlICYmICEoZXhpc3RpbmcgJiYgZXhpc3RpbmcuX21lcmdlZCkpIHtcbiAgICAgICAgaG9va3Nba2V5XSA9IGV4aXN0aW5nID8gbWVyZ2VIb29rJDEodG9NZXJnZSwgZXhpc3RpbmcpIDogdG9NZXJnZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZUhvb2skMSAoZjEsIGYyKSB7XG4gICAgdmFyIG1lcmdlZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAvLyBmbG93IGNvbXBsYWlucyBhYm91dCBleHRyYSBhcmdzIHdoaWNoIGlzIHdoeSB3ZSB1c2UgYW55XG4gICAgICBmMShhLCBiKTtcbiAgICAgIGYyKGEsIGIpO1xuICAgIH07XG4gICAgbWVyZ2VkLl9tZXJnZWQgPSB0cnVlO1xuICAgIHJldHVybiBtZXJnZWRcbiAgfVxuXG4gIC8vIHRyYW5zZm9ybSBjb21wb25lbnQgdi1tb2RlbCBpbmZvICh2YWx1ZSBhbmQgY2FsbGJhY2spIGludG9cbiAgLy8gcHJvcCBhbmQgZXZlbnQgaGFuZGxlciByZXNwZWN0aXZlbHkuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU1vZGVsIChvcHRpb25zLCBkYXRhKSB7XG4gICAgdmFyIHByb3AgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLnByb3ApIHx8ICd2YWx1ZSc7XG4gICAgdmFyIGV2ZW50ID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5ldmVudCkgfHwgJ2lucHV0J1xuICAgIDsoZGF0YS5hdHRycyB8fCAoZGF0YS5hdHRycyA9IHt9KSlbcHJvcF0gPSBkYXRhLm1vZGVsLnZhbHVlO1xuICAgIHZhciBvbiA9IGRhdGEub24gfHwgKGRhdGEub24gPSB7fSk7XG4gICAgdmFyIGV4aXN0aW5nID0gb25bZXZlbnRdO1xuICAgIHZhciBjYWxsYmFjayA9IGRhdGEubW9kZWwuY2FsbGJhY2s7XG4gICAgaWYgKGlzRGVmKGV4aXN0aW5nKSkge1xuICAgICAgaWYgKFxuICAgICAgICBBcnJheS5pc0FycmF5KGV4aXN0aW5nKVxuICAgICAgICAgID8gZXhpc3RpbmcuaW5kZXhPZihjYWxsYmFjaykgPT09IC0xXG4gICAgICAgICAgOiBleGlzdGluZyAhPT0gY2FsbGJhY2tcbiAgICAgICkge1xuICAgICAgICBvbltldmVudF0gPSBbY2FsbGJhY2tdLmNvbmNhdChleGlzdGluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uW2V2ZW50XSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIHZhciBTSU1QTEVfTk9STUFMSVpFID0gMTtcbiAgdmFyIEFMV0FZU19OT1JNQUxJWkUgPSAyO1xuXG4gIC8vIHdyYXBwZXIgZnVuY3Rpb24gZm9yIHByb3ZpZGluZyBhIG1vcmUgZmxleGlibGUgaW50ZXJmYWNlXG4gIC8vIHdpdGhvdXQgZ2V0dGluZyB5ZWxsZWQgYXQgYnkgZmxvd1xuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcbiAgICBjb250ZXh0LFxuICAgIHRhZyxcbiAgICBkYXRhLFxuICAgIGNoaWxkcmVuLFxuICAgIG5vcm1hbGl6YXRpb25UeXBlLFxuICAgIGFsd2F5c05vcm1hbGl6ZVxuICApIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSB8fCBpc1ByaW1pdGl2ZShkYXRhKSkge1xuICAgICAgbm9ybWFsaXphdGlvblR5cGUgPSBjaGlsZHJlbjtcbiAgICAgIGNoaWxkcmVuID0gZGF0YTtcbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChpc1RydWUoYWx3YXlzTm9ybWFsaXplKSkge1xuICAgICAgbm9ybWFsaXphdGlvblR5cGUgPSBBTFdBWVNfTk9STUFMSVpFO1xuICAgIH1cbiAgICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoY29udGV4dCwgdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUpXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCAoXG4gICAgY29udGV4dCxcbiAgICB0YWcsXG4gICAgZGF0YSxcbiAgICBjaGlsZHJlbixcbiAgICBub3JtYWxpemF0aW9uVHlwZVxuICApIHtcbiAgICBpZiAoaXNEZWYoZGF0YSkgJiYgaXNEZWYoKGRhdGEpLl9fb2JfXykpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwiQXZvaWQgdXNpbmcgb2JzZXJ2ZWQgZGF0YSBvYmplY3QgYXMgdm5vZGUgZGF0YTogXCIgKyAoSlNPTi5zdHJpbmdpZnkoZGF0YSkpICsgXCJcXG5cIiArXG4gICAgICAgICdBbHdheXMgY3JlYXRlIGZyZXNoIHZub2RlIGRhdGEgb2JqZWN0cyBpbiBlYWNoIHJlbmRlciEnLFxuICAgICAgICBjb250ZXh0XG4gICAgICApO1xuICAgICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICAgIH1cbiAgICAvLyBvYmplY3Qgc3ludGF4IGluIHYtYmluZFxuICAgIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZihkYXRhLmlzKSkge1xuICAgICAgdGFnID0gZGF0YS5pcztcbiAgICB9XG4gICAgaWYgKCF0YWcpIHtcbiAgICAgIC8vIGluIGNhc2Ugb2YgY29tcG9uZW50IDppcyBzZXQgdG8gZmFsc3kgdmFsdWVcbiAgICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgICB9XG4gICAgLy8gd2FybiBhZ2FpbnN0IG5vbi1wcmltaXRpdmUga2V5XG4gICAgaWYgKGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEua2V5KSAmJiAhaXNQcmltaXRpdmUoZGF0YS5rZXkpXG4gICAgKSB7XG4gICAgICB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0F2b2lkIHVzaW5nIG5vbi1wcmltaXRpdmUgdmFsdWUgYXMga2V5LCAnICtcbiAgICAgICAgICAndXNlIHN0cmluZy9udW1iZXIgdmFsdWUgaW5zdGVhZC4nLFxuICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc3VwcG9ydCBzaW5nbGUgZnVuY3Rpb24gY2hpbGRyZW4gYXMgZGVmYXVsdCBzY29wZWQgc2xvdFxuICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJlxuICAgICAgdHlwZW9mIGNoaWxkcmVuWzBdID09PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgIGRhdGEuc2NvcGVkU2xvdHMgPSB7IGRlZmF1bHQ6IGNoaWxkcmVuWzBdIH07XG4gICAgICBjaGlsZHJlbi5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IEFMV0FZU19OT1JNQUxJWkUpIHtcbiAgICAgIGNoaWxkcmVuID0gbm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICAgIH0gZWxzZSBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IFNJTVBMRV9OT1JNQUxJWkUpIHtcbiAgICAgIGNoaWxkcmVuID0gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICAgIH1cbiAgICB2YXIgdm5vZGUsIG5zO1xuICAgIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIEN0b3I7XG4gICAgICBucyA9IChjb250ZXh0LiR2bm9kZSAmJiBjb250ZXh0LiR2bm9kZS5ucykgfHwgY29uZmlnLmdldFRhZ05hbWVzcGFjZSh0YWcpO1xuICAgICAgaWYgKGNvbmZpZy5pc1Jlc2VydmVkVGFnKHRhZykpIHtcbiAgICAgICAgLy8gcGxhdGZvcm0gYnVpbHQtaW4gZWxlbWVudHNcbiAgICAgICAgaWYgKGlzRGVmKGRhdGEpICYmIGlzRGVmKGRhdGEubmF0aXZlT24pKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIChcIlRoZSAubmF0aXZlIG1vZGlmaWVyIGZvciB2LW9uIGlzIG9ubHkgdmFsaWQgb24gY29tcG9uZW50cyBidXQgaXQgd2FzIHVzZWQgb24gPFwiICsgdGFnICsgXCI+LlwiKSxcbiAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICAgIGNvbmZpZy5wYXJzZVBsYXRmb3JtVGFnTmFtZSh0YWcpLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY29udGV4dFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICgoIWRhdGEgfHwgIWRhdGEucHJlKSAmJiBpc0RlZihDdG9yID0gcmVzb2x2ZUFzc2V0KGNvbnRleHQuJG9wdGlvbnMsICdjb21wb25lbnRzJywgdGFnKSkpIHtcbiAgICAgICAgLy8gY29tcG9uZW50XG4gICAgICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KEN0b3IsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuLCB0YWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdW5rbm93biBvciB1bmxpc3RlZCBuYW1lc3BhY2VkIGVsZW1lbnRzXG4gICAgICAgIC8vIGNoZWNrIGF0IHJ1bnRpbWUgYmVjYXVzZSBpdCBtYXkgZ2V0IGFzc2lnbmVkIGEgbmFtZXNwYWNlIHdoZW4gaXRzXG4gICAgICAgIC8vIHBhcmVudCBub3JtYWxpemVzIGNoaWxkcmVuXG4gICAgICAgIHZub2RlID0gbmV3IFZOb2RlKFxuICAgICAgICAgIHRhZywgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZGlyZWN0IGNvbXBvbmVudCBvcHRpb25zIC8gY29uc3RydWN0b3JcbiAgICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KHRhZywgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgIHJldHVybiB2bm9kZVxuICAgIH0gZWxzZSBpZiAoaXNEZWYodm5vZGUpKSB7XG4gICAgICBpZiAoaXNEZWYobnMpKSB7IGFwcGx5TlModm5vZGUsIG5zKTsgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7IHJlZ2lzdGVyRGVlcEJpbmRpbmdzKGRhdGEpOyB9XG4gICAgICByZXR1cm4gdm5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNyZWF0ZUVtcHR5Vk5vZGUoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5TlMgKHZub2RlLCBucywgZm9yY2UpIHtcbiAgICB2bm9kZS5ucyA9IG5zO1xuICAgIGlmICh2bm9kZS50YWcgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgICAgLy8gdXNlIGRlZmF1bHQgbmFtZXNwYWNlIGluc2lkZSBmb3JlaWduT2JqZWN0XG4gICAgICBucyA9IHVuZGVmaW5lZDtcbiAgICAgIGZvcmNlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzRGVmKHZub2RlLmNoaWxkcmVuKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChpc0RlZihjaGlsZC50YWcpICYmIChcbiAgICAgICAgICBpc1VuZGVmKGNoaWxkLm5zKSB8fCAoaXNUcnVlKGZvcmNlKSAmJiBjaGlsZC50YWcgIT09ICdzdmcnKSkpIHtcbiAgICAgICAgICBhcHBseU5TKGNoaWxkLCBucywgZm9yY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmVmICM1MzE4XG4gIC8vIG5lY2Vzc2FyeSB0byBlbnN1cmUgcGFyZW50IHJlLXJlbmRlciB3aGVuIGRlZXAgYmluZGluZ3MgbGlrZSA6c3R5bGUgYW5kXG4gIC8vIDpjbGFzcyBhcmUgdXNlZCBvbiBzbG90IG5vZGVzXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyRGVlcEJpbmRpbmdzIChkYXRhKSB7XG4gICAgaWYgKGlzT2JqZWN0KGRhdGEuc3R5bGUpKSB7XG4gICAgICB0cmF2ZXJzZShkYXRhLnN0eWxlKTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KGRhdGEuY2xhc3MpKSB7XG4gICAgICB0cmF2ZXJzZShkYXRhLmNsYXNzKTtcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBpbml0UmVuZGVyICh2bSkge1xuICAgIHZtLl92bm9kZSA9IG51bGw7IC8vIHRoZSByb290IG9mIHRoZSBjaGlsZCB0cmVlXG4gICAgdm0uX3N0YXRpY1RyZWVzID0gbnVsbDsgLy8gdi1vbmNlIGNhY2hlZCB0cmVlc1xuICAgIHZhciBvcHRpb25zID0gdm0uJG9wdGlvbnM7XG4gICAgdmFyIHBhcmVudFZub2RlID0gdm0uJHZub2RlID0gb3B0aW9ucy5fcGFyZW50Vm5vZGU7IC8vIHRoZSBwbGFjZWhvbGRlciBub2RlIGluIHBhcmVudCB0cmVlXG4gICAgdmFyIHJlbmRlckNvbnRleHQgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5jb250ZXh0O1xuICAgIHZtLiRzbG90cyA9IHJlc29sdmVTbG90cyhvcHRpb25zLl9yZW5kZXJDaGlsZHJlbiwgcmVuZGVyQ29udGV4dCk7XG4gICAgdm0uJHNjb3BlZFNsb3RzID0gZW1wdHlPYmplY3Q7XG4gICAgLy8gYmluZCB0aGUgY3JlYXRlRWxlbWVudCBmbiB0byB0aGlzIGluc3RhbmNlXG4gICAgLy8gc28gdGhhdCB3ZSBnZXQgcHJvcGVyIHJlbmRlciBjb250ZXh0IGluc2lkZSBpdC5cbiAgICAvLyBhcmdzIG9yZGVyOiB0YWcsIGRhdGEsIGNoaWxkcmVuLCBub3JtYWxpemF0aW9uVHlwZSwgYWx3YXlzTm9ybWFsaXplXG4gICAgLy8gaW50ZXJuYWwgdmVyc2lvbiBpcyB1c2VkIGJ5IHJlbmRlciBmdW5jdGlvbnMgY29tcGlsZWQgZnJvbSB0ZW1wbGF0ZXNcbiAgICB2bS5fYyA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCBmYWxzZSk7IH07XG4gICAgLy8gbm9ybWFsaXphdGlvbiBpcyBhbHdheXMgYXBwbGllZCBmb3IgdGhlIHB1YmxpYyB2ZXJzaW9uLCB1c2VkIGluXG4gICAgLy8gdXNlci13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMuXG4gICAgdm0uJGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyByZXR1cm4gY3JlYXRlRWxlbWVudCh2bSwgYSwgYiwgYywgZCwgdHJ1ZSk7IH07XG5cbiAgICAvLyAkYXR0cnMgJiAkbGlzdGVuZXJzIGFyZSBleHBvc2VkIGZvciBlYXNpZXIgSE9DIGNyZWF0aW9uLlxuICAgIC8vIHRoZXkgbmVlZCB0byBiZSByZWFjdGl2ZSBzbyB0aGF0IEhPQ3MgdXNpbmcgdGhlbSBhcmUgYWx3YXlzIHVwZGF0ZWRcbiAgICB2YXIgcGFyZW50RGF0YSA9IHBhcmVudFZub2RlICYmIHBhcmVudFZub2RlLmRhdGE7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIHtcbiAgICAgIGRlZmluZVJlYWN0aXZlJCQxKHZtLCAnJGF0dHJzJywgcGFyZW50RGF0YSAmJiBwYXJlbnREYXRhLmF0dHJzIHx8IGVtcHR5T2JqZWN0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgJiYgd2FybihcIiRhdHRycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgICBkZWZpbmVSZWFjdGl2ZSQkMSh2bSwgJyRsaXN0ZW5lcnMnLCBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnMgfHwgZW1wdHlPYmplY3QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgIWlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCAmJiB3YXJuKFwiJGxpc3RlbmVycyBpcyByZWFkb25seS5cIiwgdm0pO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IG51bGw7XG5cbiAgZnVuY3Rpb24gcmVuZGVyTWl4aW4gKFZ1ZSkge1xuICAgIC8vIGluc3RhbGwgcnVudGltZSBjb252ZW5pZW5jZSBoZWxwZXJzXG4gICAgaW5zdGFsbFJlbmRlckhlbHBlcnMoVnVlLnByb3RvdHlwZSk7XG5cbiAgICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIG5leHRUaWNrKGZuLCB0aGlzKVxuICAgIH07XG5cbiAgICBWdWUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdmFyIHJlZiA9IHZtLiRvcHRpb25zO1xuICAgICAgdmFyIHJlbmRlciA9IHJlZi5yZW5kZXI7XG4gICAgICB2YXIgX3BhcmVudFZub2RlID0gcmVmLl9wYXJlbnRWbm9kZTtcblxuICAgICAgaWYgKF9wYXJlbnRWbm9kZSkge1xuICAgICAgICB2bS4kc2NvcGVkU2xvdHMgPSBub3JtYWxpemVTY29wZWRTbG90cyhcbiAgICAgICAgICBfcGFyZW50Vm5vZGUuZGF0YS5zY29wZWRTbG90cyxcbiAgICAgICAgICB2bS4kc2xvdHMsXG4gICAgICAgICAgdm0uJHNjb3BlZFNsb3RzXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBwYXJlbnQgdm5vZGUuIHRoaXMgYWxsb3dzIHJlbmRlciBmdW5jdGlvbnMgdG8gaGF2ZSBhY2Nlc3NcbiAgICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxuICAgICAgdm0uJHZub2RlID0gX3BhcmVudFZub2RlO1xuICAgICAgLy8gcmVuZGVyIHNlbGZcbiAgICAgIHZhciB2bm9kZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoZXJlJ3Mgbm8gbmVlZCB0byBtYWludGFpbiBhIHN0YWNrIGJlY2F1c2UgYWxsIHJlbmRlciBmbnMgYXJlIGNhbGxlZFxuICAgICAgICAvLyBzZXBhcmF0ZWx5IGZyb20gb25lIGFub3RoZXIuIE5lc3RlZCBjb21wb25lbnQncyByZW5kZXIgZm5zIGFyZSBjYWxsZWRcbiAgICAgICAgLy8gd2hlbiBwYXJlbnQgY29tcG9uZW50IGlzIHBhdGNoZWQuXG4gICAgICAgIGN1cnJlbnRSZW5kZXJpbmdJbnN0YW5jZSA9IHZtO1xuICAgICAgICB2bm9kZSA9IHJlbmRlci5jYWxsKHZtLl9yZW5kZXJQcm94eSwgdm0uJGNyZWF0ZUVsZW1lbnQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXJcIik7XG4gICAgICAgIC8vIHJldHVybiBlcnJvciByZW5kZXIgcmVzdWx0LFxuICAgICAgICAvLyBvciBwcmV2aW91cyB2bm9kZSB0byBwcmV2ZW50IHJlbmRlciBlcnJvciBjYXVzaW5nIGJsYW5rIGNvbXBvbmVudFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodm0uJG9wdGlvbnMucmVuZGVyRXJyb3IpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdm5vZGUgPSB2bS4kb3B0aW9ucy5yZW5kZXJFcnJvci5jYWxsKHZtLl9yZW5kZXJQcm94eSwgdm0uJGNyZWF0ZUVsZW1lbnQsIGUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcInJlbmRlckVycm9yXCIpO1xuICAgICAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjdXJyZW50UmVuZGVyaW5nSW5zdGFuY2UgPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gaWYgdGhlIHJldHVybmVkIGFycmF5IGNvbnRhaW5zIG9ubHkgYSBzaW5nbGUgbm9kZSwgYWxsb3cgaXRcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSAmJiB2bm9kZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdm5vZGUgPSB2bm9kZVswXTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcbiAgICAgIGlmICghKHZub2RlIGluc3RhbmNlb2YgVk5vZGUpKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICAgJ3Nob3VsZCByZXR1cm4gYSBzaW5nbGUgcm9vdCBub2RlLicsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdm5vZGUgPSBjcmVhdGVFbXB0eVZOb2RlKCk7XG4gICAgICB9XG4gICAgICAvLyBzZXQgcGFyZW50XG4gICAgICB2bm9kZS5wYXJlbnQgPSBfcGFyZW50Vm5vZGU7XG4gICAgICByZXR1cm4gdm5vZGVcbiAgICB9O1xuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gZW5zdXJlQ3RvciAoY29tcCwgYmFzZSkge1xuICAgIGlmIChcbiAgICAgIGNvbXAuX19lc01vZHVsZSB8fFxuICAgICAgKGhhc1N5bWJvbCAmJiBjb21wW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdNb2R1bGUnKVxuICAgICkge1xuICAgICAgY29tcCA9IGNvbXAuZGVmYXVsdDtcbiAgICB9XG4gICAgcmV0dXJuIGlzT2JqZWN0KGNvbXApXG4gICAgICA/IGJhc2UuZXh0ZW5kKGNvbXApXG4gICAgICA6IGNvbXBcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFzeW5jUGxhY2Vob2xkZXIgKFxuICAgIGZhY3RvcnksXG4gICAgZGF0YSxcbiAgICBjb250ZXh0LFxuICAgIGNoaWxkcmVuLFxuICAgIHRhZ1xuICApIHtcbiAgICB2YXIgbm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgICBub2RlLmFzeW5jRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgbm9kZS5hc3luY01ldGEgPSB7IGRhdGE6IGRhdGEsIGNvbnRleHQ6IGNvbnRleHQsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGFnOiB0YWcgfTtcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUFzeW5jQ29tcG9uZW50IChcbiAgICBmYWN0b3J5LFxuICAgIGJhc2VDdG9yXG4gICkge1xuICAgIGlmIChpc1RydWUoZmFjdG9yeS5lcnJvcikgJiYgaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeS5lcnJvckNvbXBcbiAgICB9XG5cbiAgICBpZiAoaXNEZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5LnJlc29sdmVkXG4gICAgfVxuXG4gICAgdmFyIG93bmVyID0gY3VycmVudFJlbmRlcmluZ0luc3RhbmNlO1xuICAgIGlmIChvd25lciAmJiBpc0RlZihmYWN0b3J5Lm93bmVycykgJiYgZmFjdG9yeS5vd25lcnMuaW5kZXhPZihvd25lcikgPT09IC0xKSB7XG4gICAgICAvLyBhbHJlYWR5IHBlbmRpbmdcbiAgICAgIGZhY3Rvcnkub3duZXJzLnB1c2gob3duZXIpO1xuICAgIH1cblxuICAgIGlmIChpc1RydWUoZmFjdG9yeS5sb2FkaW5nKSAmJiBpc0RlZihmYWN0b3J5LmxvYWRpbmdDb21wKSkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkubG9hZGluZ0NvbXBcbiAgICB9XG5cbiAgICBpZiAob3duZXIgJiYgIWlzRGVmKGZhY3Rvcnkub3duZXJzKSkge1xuICAgICAgdmFyIG93bmVycyA9IGZhY3Rvcnkub3duZXJzID0gW293bmVyXTtcbiAgICAgIHZhciBzeW5jID0gdHJ1ZTtcbiAgICAgIHZhciB0aW1lckxvYWRpbmcgPSBudWxsO1xuICAgICAgdmFyIHRpbWVyVGltZW91dCA9IG51bGxcblxuICAgICAgOyhvd25lcikuJG9uKCdob29rOmRlc3Ryb3llZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZShvd25lcnMsIG93bmVyKTsgfSk7XG5cbiAgICAgIHZhciBmb3JjZVJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJDb21wbGV0ZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvd25lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgKG93bmVyc1tpXSkuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVuZGVyQ29tcGxldGVkKSB7XG4gICAgICAgICAgb3duZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgaWYgKHRpbWVyTG9hZGluZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTG9hZGluZyk7XG4gICAgICAgICAgICB0aW1lckxvYWRpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGltZXJUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJUaW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVyVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgcmVzb2x2ZSA9IG9uY2UoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyBjYWNoZSByZXNvbHZlZFxuICAgICAgICBmYWN0b3J5LnJlc29sdmVkID0gZW5zdXJlQ3RvcihyZXMsIGJhc2VDdG9yKTtcbiAgICAgICAgLy8gaW52b2tlIGNhbGxiYWNrcyBvbmx5IGlmIHRoaXMgaXMgbm90IGEgc3luY2hyb25vdXMgcmVzb2x2ZVxuICAgICAgICAvLyAoYXN5bmMgcmVzb2x2ZXMgYXJlIHNoaW1tZWQgYXMgc3luY2hyb25vdXMgZHVyaW5nIFNTUilcbiAgICAgICAgaWYgKCFzeW5jKSB7XG4gICAgICAgICAgZm9yY2VSZW5kZXIodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3duZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgcmVqZWN0ID0gb25jZShmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJGYWlsZWQgdG8gcmVzb2x2ZSBhc3luYyBjb21wb25lbnQ6IFwiICsgKFN0cmluZyhmYWN0b3J5KSkgK1xuICAgICAgICAgIChyZWFzb24gPyAoXCJcXG5SZWFzb246IFwiICsgcmVhc29uKSA6ICcnKVxuICAgICAgICApO1xuICAgICAgICBpZiAoaXNEZWYoZmFjdG9yeS5lcnJvckNvbXApKSB7XG4gICAgICAgICAgZmFjdG9yeS5lcnJvciA9IHRydWU7XG4gICAgICAgICAgZm9yY2VSZW5kZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgcmVzID0gZmFjdG9yeShyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICBpZiAoaXNPYmplY3QocmVzKSkge1xuICAgICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgICAvLyAoKSA9PiBQcm9taXNlXG4gICAgICAgICAgaWYgKGlzVW5kZWYoZmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZShyZXMuY29tcG9uZW50KSkge1xuICAgICAgICAgIHJlcy5jb21wb25lbnQudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgICAgaWYgKGlzRGVmKHJlcy5lcnJvcikpIHtcbiAgICAgICAgICAgIGZhY3RvcnkuZXJyb3JDb21wID0gZW5zdXJlQ3RvcihyZXMuZXJyb3IsIGJhc2VDdG9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNEZWYocmVzLmxvYWRpbmcpKSB7XG4gICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmdDb21wID0gZW5zdXJlQ3RvcihyZXMubG9hZGluZywgYmFzZUN0b3IpO1xuICAgICAgICAgICAgaWYgKHJlcy5kZWxheSA9PT0gMCkge1xuICAgICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGltZXJMb2FkaW5nID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGltZXJMb2FkaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZihmYWN0b3J5LnJlc29sdmVkKSAmJiBpc1VuZGVmKGZhY3RvcnkuZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICBmYWN0b3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgZm9yY2VSZW5kZXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgcmVzLmRlbGF5IHx8IDIwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRGVmKHJlcy50aW1lb3V0KSkge1xuICAgICAgICAgICAgdGltZXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRpbWVyVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChpc1VuZGVmKGZhY3RvcnkucmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgICAgXCJ0aW1lb3V0IChcIiArIChyZXMudGltZW91dCkgKyBcIm1zKVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVzLnRpbWVvdXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzeW5jID0gZmFsc2U7XG4gICAgICAvLyByZXR1cm4gaW4gY2FzZSByZXNvbHZlZCBzeW5jaHJvbm91c2x5XG4gICAgICByZXR1cm4gZmFjdG9yeS5sb2FkaW5nXG4gICAgICAgID8gZmFjdG9yeS5sb2FkaW5nQ29tcFxuICAgICAgICA6IGZhY3RvcnkucmVzb2x2ZWRcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBpc0FzeW5jUGxhY2Vob2xkZXIgKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5pc0NvbW1lbnQgJiYgbm9kZS5hc3luY0ZhY3RvcnlcbiAgfVxuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQgKGNoaWxkcmVuKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChpc0RlZihjKSAmJiAoaXNEZWYoYy5jb21wb25lbnRPcHRpb25zKSB8fCBpc0FzeW5jUGxhY2Vob2xkZXIoYykpKSB7XG4gICAgICAgICAgcmV0dXJuIGNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XG4gICAgdm0uX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdm0uX2hhc0hvb2tFdmVudCA9IGZhbHNlO1xuICAgIC8vIGluaXQgcGFyZW50IGF0dGFjaGVkIGV2ZW50c1xuICAgIHZhciBsaXN0ZW5lcnMgPSB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO1xuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIGFkZCAoZXZlbnQsIGZuKSB7XG4gICAgdGFyZ2V0LiRvbihldmVudCwgZm4pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlJDEgKGV2ZW50LCBmbikge1xuICAgIHRhcmdldC4kb2ZmKGV2ZW50LCBmbik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPbmNlSGFuZGxlciAoZXZlbnQsIGZuKSB7XG4gICAgdmFyIF90YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9uY2VIYW5kbGVyICgpIHtcbiAgICAgIHZhciByZXMgPSBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHJlcyAhPT0gbnVsbCkge1xuICAgICAgICBfdGFyZ2V0LiRvZmYoZXZlbnQsIG9uY2VIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnMgKFxuICAgIHZtLFxuICAgIGxpc3RlbmVycyxcbiAgICBvbGRMaXN0ZW5lcnNcbiAgKSB7XG4gICAgdGFyZ2V0ID0gdm07XG4gICAgdXBkYXRlTGlzdGVuZXJzKGxpc3RlbmVycywgb2xkTGlzdGVuZXJzIHx8IHt9LCBhZGQsIHJlbW92ZSQxLCBjcmVhdGVPbmNlSGFuZGxlciwgdm0pO1xuICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50c01peGluIChWdWUpIHtcbiAgICB2YXIgaG9va1JFID0gL15ob29rOi87XG4gICAgVnVlLnByb3RvdHlwZS4kb24gPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdm0uJG9uKGV2ZW50W2ldLCBmbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICh2bS5fZXZlbnRzW2V2ZW50XSB8fCAodm0uX2V2ZW50c1tldmVudF0gPSBbXSkpLnB1c2goZm4pO1xuICAgICAgICAvLyBvcHRpbWl6ZSBob29rOmV2ZW50IGNvc3QgYnkgdXNpbmcgYSBib29sZWFuIGZsYWcgbWFya2VkIGF0IHJlZ2lzdHJhdGlvblxuICAgICAgICAvLyBpbnN0ZWFkIG9mIGEgaGFzaCBsb29rdXBcbiAgICAgICAgaWYgKGhvb2tSRS50ZXN0KGV2ZW50KSkge1xuICAgICAgICAgIHZtLl9oYXNIb29rRXZlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1cbiAgICB9O1xuXG4gICAgVnVlLnByb3RvdHlwZS4kb25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICAgIHZtLiRvZmYoZXZlbnQsIG9uKTtcbiAgICAgICAgZm4uYXBwbHkodm0sIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBvbi5mbiA9IGZuO1xuICAgICAgdm0uJG9uKGV2ZW50LCBvbik7XG4gICAgICByZXR1cm4gdm1cbiAgICB9O1xuXG4gICAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIC8vIGFsbFxuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICByZXR1cm4gdm1cbiAgICAgIH1cbiAgICAgIC8vIGFycmF5IG9mIGV2ZW50c1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICAgIGZvciAodmFyIGkkMSA9IDAsIGwgPSBldmVudC5sZW5ndGg7IGkkMSA8IGw7IGkkMSsrKSB7XG4gICAgICAgICAgdm0uJG9mZihldmVudFtpJDFdLCBmbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtXG4gICAgICB9XG4gICAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgICAgdmFyIGNicyA9IHZtLl9ldmVudHNbZXZlbnRdO1xuICAgICAgaWYgKCFjYnMpIHtcbiAgICAgICAgcmV0dXJuIHZtXG4gICAgICB9XG4gICAgICBpZiAoIWZuKSB7XG4gICAgICAgIHZtLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHZtXG4gICAgICB9XG4gICAgICAvLyBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICB2YXIgY2I7XG4gICAgICB2YXIgaSA9IGNicy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNiID0gY2JzW2ldO1xuICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgIGNicy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZtXG4gICAgfTtcblxuICAgIFZ1ZS5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB7XG4gICAgICAgIHZhciBsb3dlckNhc2VFdmVudCA9IGV2ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChsb3dlckNhc2VFdmVudCAhPT0gZXZlbnQgJiYgdm0uX2V2ZW50c1tsb3dlckNhc2VFdmVudF0pIHtcbiAgICAgICAgICB0aXAoXG4gICAgICAgICAgICBcIkV2ZW50IFxcXCJcIiArIGxvd2VyQ2FzZUV2ZW50ICsgXCJcXFwiIGlzIGVtaXR0ZWQgaW4gY29tcG9uZW50IFwiICtcbiAgICAgICAgICAgIChmb3JtYXRDb21wb25lbnROYW1lKHZtKSkgKyBcIiBidXQgdGhlIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZCBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCIuIFwiICtcbiAgICAgICAgICAgIFwiTm90ZSB0aGF0IEhUTUwgYXR0cmlidXRlcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZSBhbmQgeW91IGNhbm5vdCB1c2UgXCIgK1xuICAgICAgICAgICAgXCJ2LW9uIHRvIGxpc3RlbiB0byBjYW1lbENhc2UgZXZlbnRzIHdoZW4gdXNpbmcgaW4tRE9NIHRlbXBsYXRlcy4gXCIgK1xuICAgICAgICAgICAgXCJZb3Ugc2hvdWxkIHByb2JhYmx5IHVzZSBcXFwiXCIgKyAoaHlwaGVuYXRlKGV2ZW50KSkgKyBcIlxcXCIgaW5zdGVhZCBvZiBcXFwiXCIgKyBldmVudCArIFwiXFxcIi5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICAgIGlmIChjYnMpIHtcbiAgICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgICAgICB2YXIgaW5mbyA9IFwiZXZlbnQgaGFuZGxlciBmb3IgXFxcIlwiICsgZXZlbnQgKyBcIlxcXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaW52b2tlV2l0aEVycm9ySGFuZGxpbmcoY2JzW2ldLCB2bSwgYXJncywgdm0sIGluZm8pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1cbiAgICB9O1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIGFjdGl2ZUluc3RhbmNlID0gbnVsbDtcbiAgdmFyIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHNldEFjdGl2ZUluc3RhbmNlKHZtKSB7XG4gICAgdmFyIHByZXZBY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlO1xuICAgIGFjdGl2ZUluc3RhbmNlID0gdm07XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGl2ZUluc3RhbmNlID0gcHJldkFjdGl2ZUluc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRMaWZlY3ljbGUgKHZtKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcblxuICAgIC8vIGxvY2F0ZSBmaXJzdCBub24tYWJzdHJhY3QgcGFyZW50XG4gICAgdmFyIHBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICAgIGlmIChwYXJlbnQgJiYgIW9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICAgIHdoaWxlIChwYXJlbnQuJG9wdGlvbnMuYWJzdHJhY3QgJiYgcGFyZW50LiRwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgICB9XG4gICAgICBwYXJlbnQuJGNoaWxkcmVuLnB1c2godm0pO1xuICAgIH1cblxuICAgIHZtLiRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdm0uJHJvb3QgPSBwYXJlbnQgPyBwYXJlbnQuJHJvb3QgOiB2bTtcblxuICAgIHZtLiRjaGlsZHJlbiA9IFtdO1xuICAgIHZtLiRyZWZzID0ge307XG5cbiAgICB2bS5fd2F0Y2hlciA9IG51bGw7XG4gICAgdm0uX2luYWN0aXZlID0gbnVsbDtcbiAgICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgICB2bS5faXNNb3VudGVkID0gZmFsc2U7XG4gICAgdm0uX2lzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpZmVjeWNsZU1peGluIChWdWUpIHtcbiAgICBWdWUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodm5vZGUsIGh5ZHJhdGluZykge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZhciBwcmV2RWwgPSB2bS4kZWw7XG4gICAgICB2YXIgcHJldlZub2RlID0gdm0uX3Zub2RlO1xuICAgICAgdmFyIHJlc3RvcmVBY3RpdmVJbnN0YW5jZSA9IHNldEFjdGl2ZUluc3RhbmNlKHZtKTtcbiAgICAgIHZtLl92bm9kZSA9IHZub2RlO1xuICAgICAgLy8gVnVlLnByb3RvdHlwZS5fX3BhdGNoX18gaXMgaW5qZWN0ZWQgaW4gZW50cnkgcG9pbnRzXG4gICAgICAvLyBiYXNlZCBvbiB0aGUgcmVuZGVyaW5nIGJhY2tlbmQgdXNlZC5cbiAgICAgIGlmICghcHJldlZub2RlKSB7XG4gICAgICAgIC8vIGluaXRpYWwgcmVuZGVyXG4gICAgICAgIHZtLiRlbCA9IHZtLl9fcGF0Y2hfXyh2bS4kZWwsIHZub2RlLCBoeWRyYXRpbmcsIGZhbHNlIC8qIHJlbW92ZU9ubHkgKi8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXBkYXRlc1xuICAgICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18ocHJldlZub2RlLCB2bm9kZSk7XG4gICAgICB9XG4gICAgICByZXN0b3JlQWN0aXZlSW5zdGFuY2UoKTtcbiAgICAgIC8vIHVwZGF0ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgICAgaWYgKHByZXZFbCkge1xuICAgICAgICBwcmV2RWwuX192dWVfXyA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodm0uJGVsKSB7XG4gICAgICAgIHZtLiRlbC5fX3Z1ZV9fID0gdm07XG4gICAgICB9XG4gICAgICAvLyBpZiBwYXJlbnQgaXMgYW4gSE9DLCB1cGRhdGUgaXRzICRlbCBhcyB3ZWxsXG4gICAgICBpZiAodm0uJHZub2RlICYmIHZtLiRwYXJlbnQgJiYgdm0uJHZub2RlID09PSB2bS4kcGFyZW50Ll92bm9kZSkge1xuICAgICAgICB2bS4kcGFyZW50LiRlbCA9IHZtLiRlbDtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZWQgaG9vayBpcyBjYWxsZWQgYnkgdGhlIHNjaGVkdWxlciB0byBlbnN1cmUgdGhhdCBjaGlsZHJlbiBhcmVcbiAgICAgIC8vIHVwZGF0ZWQgaW4gYSBwYXJlbnQncyB1cGRhdGVkIGhvb2suXG4gICAgfTtcblxuICAgIFZ1ZS5wcm90b3R5cGUuJGZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIGlmICh2bS5fd2F0Y2hlcikge1xuICAgICAgICB2bS5fd2F0Y2hlci51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgVnVlLnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICBpZiAodm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZURlc3Ryb3knKTtcbiAgICAgIHZtLl9pc0JlaW5nRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50XG4gICAgICB2YXIgcGFyZW50ID0gdm0uJHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNCZWluZ0Rlc3Ryb3llZCAmJiAhdm0uJG9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICAgICAgcmVtb3ZlKHBhcmVudC4kY2hpbGRyZW4sIHZtKTtcbiAgICAgIH1cbiAgICAgIC8vIHRlYXJkb3duIHdhdGNoZXJzXG4gICAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgICAgdm0uX3dhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIH1cbiAgICAgIHZhciBpID0gdm0uX3dhdGNoZXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdm0uX3dhdGNoZXJzW2ldLnRlYXJkb3duKCk7XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgcmVmZXJlbmNlIGZyb20gZGF0YSBvYlxuICAgICAgLy8gZnJvemVuIG9iamVjdCBtYXkgbm90IGhhdmUgb2JzZXJ2ZXIuXG4gICAgICBpZiAodm0uX2RhdGEuX19vYl9fKSB7XG4gICAgICAgIHZtLl9kYXRhLl9fb2JfXy52bUNvdW50LS07XG4gICAgICB9XG4gICAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cbiAgICAgIHZtLl9pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcbiAgICAgIHZtLl9fcGF0Y2hfXyh2bS5fdm5vZGUsIG51bGwpO1xuICAgICAgLy8gZmlyZSBkZXN0cm95ZWQgaG9va1xuICAgICAgY2FsbEhvb2sodm0sICdkZXN0cm95ZWQnKTtcbiAgICAgIC8vIHR1cm4gb2ZmIGFsbCBpbnN0YW5jZSBsaXN0ZW5lcnMuXG4gICAgICB2bS4kb2ZmKCk7XG4gICAgICAvLyByZW1vdmUgX192dWVfXyByZWZlcmVuY2VcbiAgICAgIGlmICh2bS4kZWwpIHtcbiAgICAgICAgdm0uJGVsLl9fdnVlX18gPSBudWxsO1xuICAgICAgfVxuICAgICAgLy8gcmVsZWFzZSBjaXJjdWxhciByZWZlcmVuY2UgKCM2NzU5KVxuICAgICAgaWYgKHZtLiR2bm9kZSkge1xuICAgICAgICB2bS4kdm5vZGUucGFyZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbW91bnRDb21wb25lbnQgKFxuICAgIHZtLFxuICAgIGVsLFxuICAgIGh5ZHJhdGluZ1xuICApIHtcbiAgICB2bS4kZWwgPSBlbDtcbiAgICBpZiAoIXZtLiRvcHRpb25zLnJlbmRlcikge1xuICAgICAgdm0uJG9wdGlvbnMucmVuZGVyID0gY3JlYXRlRW1wdHlWTm9kZTtcbiAgICAgIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgodm0uJG9wdGlvbnMudGVtcGxhdGUgJiYgdm0uJG9wdGlvbnMudGVtcGxhdGUuY2hhckF0KDApICE9PSAnIycpIHx8XG4gICAgICAgICAgdm0uJG9wdGlvbnMuZWwgfHwgZWwpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xuICAgICAgICAgICAgJ2NvbXBpbGVyIGlzIG5vdCBhdmFpbGFibGUuIEVpdGhlciBwcmUtY29tcGlsZSB0aGUgdGVtcGxhdGVzIGludG8gJyArXG4gICAgICAgICAgICAncmVuZGVyIGZ1bmN0aW9ucywgb3IgdXNlIHRoZSBjb21waWxlci1pbmNsdWRlZCBidWlsZC4nLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnRmFpbGVkIHRvIG1vdW50IGNvbXBvbmVudDogdGVtcGxhdGUgb3IgcmVuZGVyIGZ1bmN0aW9uIG5vdCBkZWZpbmVkLicsXG4gICAgICAgICAgICB2bVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVNb3VudCcpO1xuXG4gICAgdmFyIHVwZGF0ZUNvbXBvbmVudDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICAgIHVwZGF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB2bS5fbmFtZTtcbiAgICAgICAgdmFyIGlkID0gdm0uX3VpZDtcbiAgICAgICAgdmFyIHN0YXJ0VGFnID0gXCJ2dWUtcGVyZi1zdGFydDpcIiArIGlkO1xuICAgICAgICB2YXIgZW5kVGFnID0gXCJ2dWUtcGVyZi1lbmQ6XCIgKyBpZDtcblxuICAgICAgICBtYXJrKHN0YXJ0VGFnKTtcbiAgICAgICAgdmFyIHZub2RlID0gdm0uX3JlbmRlcigpO1xuICAgICAgICBtYXJrKGVuZFRhZyk7XG4gICAgICAgIG1lYXN1cmUoKFwidnVlIFwiICsgbmFtZSArIFwiIHJlbmRlclwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG5cbiAgICAgICAgbWFyayhzdGFydFRhZyk7XG4gICAgICAgIHZtLl91cGRhdGUodm5vZGUsIGh5ZHJhdGluZyk7XG4gICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgbWVhc3VyZSgoXCJ2dWUgXCIgKyBuYW1lICsgXCIgcGF0Y2hcIiksIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2bS5fdXBkYXRlKHZtLl9yZW5kZXIoKSwgaHlkcmF0aW5nKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gd2Ugc2V0IHRoaXMgdG8gdm0uX3dhdGNoZXIgaW5zaWRlIHRoZSB3YXRjaGVyJ3MgY29uc3RydWN0b3JcbiAgICAvLyBzaW5jZSB0aGUgd2F0Y2hlcidzIGluaXRpYWwgcGF0Y2ggbWF5IGNhbGwgJGZvcmNlVXBkYXRlIChlLmcuIGluc2lkZSBjaGlsZFxuICAgIC8vIGNvbXBvbmVudCdzIG1vdW50ZWQgaG9vayksIHdoaWNoIHJlbGllcyBvbiB2bS5fd2F0Y2hlciBiZWluZyBhbHJlYWR5IGRlZmluZWRcbiAgICBuZXcgV2F0Y2hlcih2bSwgdXBkYXRlQ29tcG9uZW50LCBub29wLCB7XG4gICAgICBiZWZvcmU6IGZ1bmN0aW9uIGJlZm9yZSAoKSB7XG4gICAgICAgIGlmICh2bS5faXNNb3VudGVkICYmICF2bS5faXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZVVwZGF0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgdHJ1ZSAvKiBpc1JlbmRlcldhdGNoZXIgKi8pO1xuICAgIGh5ZHJhdGluZyA9IGZhbHNlO1xuXG4gICAgLy8gbWFudWFsbHkgbW91bnRlZCBpbnN0YW5jZSwgY2FsbCBtb3VudGVkIG9uIHNlbGZcbiAgICAvLyBtb3VudGVkIGlzIGNhbGxlZCBmb3IgcmVuZGVyLWNyZWF0ZWQgY2hpbGQgY29tcG9uZW50cyBpbiBpdHMgaW5zZXJ0ZWQgaG9va1xuICAgIGlmICh2bS4kdm5vZGUgPT0gbnVsbCkge1xuICAgICAgdm0uX2lzTW91bnRlZCA9IHRydWU7XG4gICAgICBjYWxsSG9vayh2bSwgJ21vdW50ZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIHZtXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDaGlsZENvbXBvbmVudCAoXG4gICAgdm0sXG4gICAgcHJvcHNEYXRhLFxuICAgIGxpc3RlbmVycyxcbiAgICBwYXJlbnRWbm9kZSxcbiAgICByZW5kZXJDaGlsZHJlblxuICApIHtcbiAgICB7XG4gICAgICBpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRldGVybWluZSB3aGV0aGVyIGNvbXBvbmVudCBoYXMgc2xvdCBjaGlsZHJlblxuICAgIC8vIHdlIG5lZWQgdG8gZG8gdGhpcyBiZWZvcmUgb3ZlcndyaXRpbmcgJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuLlxuXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGR5bmFtaWMgc2NvcGVkU2xvdHMgKGhhbmQtd3JpdHRlbiBvciBjb21waWxlZCBidXQgd2l0aFxuICAgIC8vIGR5bmFtaWMgc2xvdCBuYW1lcykuIFN0YXRpYyBzY29wZWQgc2xvdHMgY29tcGlsZWQgZnJvbSB0ZW1wbGF0ZSBoYXMgdGhlXG4gICAgLy8gXCIkc3RhYmxlXCIgbWFya2VyLlxuICAgIHZhciBuZXdTY29wZWRTbG90cyA9IHBhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHM7XG4gICAgdmFyIG9sZFNjb3BlZFNsb3RzID0gdm0uJHNjb3BlZFNsb3RzO1xuICAgIHZhciBoYXNEeW5hbWljU2NvcGVkU2xvdCA9ICEhKFxuICAgICAgKG5ld1Njb3BlZFNsb3RzICYmICFuZXdTY29wZWRTbG90cy4kc3RhYmxlKSB8fFxuICAgICAgKG9sZFNjb3BlZFNsb3RzICE9PSBlbXB0eU9iamVjdCAmJiAhb2xkU2NvcGVkU2xvdHMuJHN0YWJsZSkgfHxcbiAgICAgIChuZXdTY29wZWRTbG90cyAmJiB2bS4kc2NvcGVkU2xvdHMuJGtleSAhPT0gbmV3U2NvcGVkU2xvdHMuJGtleSlcbiAgICApO1xuXG4gICAgLy8gQW55IHN0YXRpYyBzbG90IGNoaWxkcmVuIGZyb20gdGhlIHBhcmVudCBtYXkgaGF2ZSBjaGFuZ2VkIGR1cmluZyBwYXJlbnQnc1xuICAgIC8vIHVwZGF0ZS4gRHluYW1pYyBzY29wZWQgc2xvdHMgbWF5IGFsc28gaGF2ZSBjaGFuZ2VkLiBJbiBzdWNoIGNhc2VzLCBhIGZvcmNlZFxuICAgIC8vIHVwZGF0ZSBpcyBuZWNlc3NhcnkgdG8gZW5zdXJlIGNvcnJlY3RuZXNzLlxuICAgIHZhciBuZWVkc0ZvcmNlVXBkYXRlID0gISEoXG4gICAgICByZW5kZXJDaGlsZHJlbiB8fCAgICAgICAgICAgICAgIC8vIGhhcyBuZXcgc3RhdGljIHNsb3RzXG4gICAgICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gfHwgIC8vIGhhcyBvbGQgc3RhdGljIHNsb3RzXG4gICAgICBoYXNEeW5hbWljU2NvcGVkU2xvdFxuICAgICk7XG5cbiAgICB2bS4kb3B0aW9ucy5fcGFyZW50Vm5vZGUgPSBwYXJlbnRWbm9kZTtcbiAgICB2bS4kdm5vZGUgPSBwYXJlbnRWbm9kZTsgLy8gdXBkYXRlIHZtJ3MgcGxhY2Vob2xkZXIgbm9kZSB3aXRob3V0IHJlLXJlbmRlclxuXG4gICAgaWYgKHZtLl92bm9kZSkgeyAvLyB1cGRhdGUgY2hpbGQgdHJlZSdzIHBhcmVudFxuICAgICAgdm0uX3Zub2RlLnBhcmVudCA9IHBhcmVudFZub2RlO1xuICAgIH1cbiAgICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gPSByZW5kZXJDaGlsZHJlbjtcblxuICAgIC8vIHVwZGF0ZSAkYXR0cnMgYW5kICRsaXN0ZW5lcnMgaGFzaFxuICAgIC8vIHRoZXNlIGFyZSBhbHNvIHJlYWN0aXZlIHNvIHRoZXkgbWF5IHRyaWdnZXIgY2hpbGQgdXBkYXRlIGlmIHRoZSBjaGlsZFxuICAgIC8vIHVzZWQgdGhlbSBkdXJpbmcgcmVuZGVyXG4gICAgdm0uJGF0dHJzID0gcGFyZW50Vm5vZGUuZGF0YS5hdHRycyB8fCBlbXB0eU9iamVjdDtcbiAgICB2bS4kbGlzdGVuZXJzID0gbGlzdGVuZXJzIHx8IGVtcHR5T2JqZWN0O1xuXG4gICAgLy8gdXBkYXRlIHByb3BzXG4gICAgaWYgKHByb3BzRGF0YSAmJiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgICAgdG9nZ2xlT2JzZXJ2aW5nKGZhbHNlKTtcbiAgICAgIHZhciBwcm9wcyA9IHZtLl9wcm9wcztcbiAgICAgIHZhciBwcm9wS2V5cyA9IHZtLiRvcHRpb25zLl9wcm9wS2V5cyB8fCBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BLZXlzW2ldO1xuICAgICAgICB2YXIgcHJvcE9wdGlvbnMgPSB2bS4kb3B0aW9ucy5wcm9wczsgLy8gd3RmIGZsb3c/XG4gICAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgICB9XG4gICAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gICAgICAvLyBrZWVwIGEgY29weSBvZiByYXcgcHJvcHNEYXRhXG4gICAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgPSBwcm9wc0RhdGE7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGxpc3RlbmVyc1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycyB8fCBlbXB0eU9iamVjdDtcbiAgICB2YXIgb2xkTGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgICB2bS4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzID0gbGlzdGVuZXJzO1xuICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMpO1xuXG4gICAgLy8gcmVzb2x2ZSBzbG90cyArIGZvcmNlIHVwZGF0ZSBpZiBoYXMgY2hpbGRyZW5cbiAgICBpZiAobmVlZHNGb3JjZVVwZGF0ZSkge1xuICAgICAgdm0uJHNsb3RzID0gcmVzb2x2ZVNsb3RzKHJlbmRlckNoaWxkcmVuLCBwYXJlbnRWbm9kZS5jb250ZXh0KTtcbiAgICAgIHZtLiRmb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlzVXBkYXRpbmdDaGlsZENvbXBvbmVudCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5JbmFjdGl2ZVRyZWUgKHZtKSB7XG4gICAgd2hpbGUgKHZtICYmICh2bSA9IHZtLiRwYXJlbnQpKSB7XG4gICAgICBpZiAodm0uX2luYWN0aXZlKSB7IHJldHVybiB0cnVlIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50ICh2bSwgZGlyZWN0KSB7XG4gICAgaWYgKGRpcmVjdCkge1xuICAgICAgdm0uX2RpcmVjdEluYWN0aXZlID0gZmFsc2U7XG4gICAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2bS5fZGlyZWN0SW5hY3RpdmUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodm0uX2luYWN0aXZlIHx8IHZtLl9pbmFjdGl2ZSA9PT0gbnVsbCkge1xuICAgICAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZtLiRjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHZtLiRjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgICBjYWxsSG9vayh2bSwgJ2FjdGl2YXRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYWN0aXZhdGVDaGlsZENvbXBvbmVudCAodm0sIGRpcmVjdCkge1xuICAgIGlmIChkaXJlY3QpIHtcbiAgICAgIHZtLl9kaXJlY3RJbmFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdm0uX2luYWN0aXZlKSB7XG4gICAgICB2bS5faW5hY3RpdmUgPSB0cnVlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHZtLiRjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgICBjYWxsSG9vayh2bSwgJ2RlYWN0aXZhdGVkJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FsbEhvb2sgKHZtLCBob29rKSB7XG4gICAgLy8gIzc1NzMgZGlzYWJsZSBkZXAgY29sbGVjdGlvbiB3aGVuIGludm9raW5nIGxpZmVjeWNsZSBob29rc1xuICAgIHB1c2hUYXJnZXQoKTtcbiAgICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcbiAgICB2YXIgaW5mbyA9IGhvb2sgKyBcIiBob29rXCI7XG4gICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICBpbnZva2VXaXRoRXJyb3JIYW5kbGluZyhoYW5kbGVyc1tpXSwgdm0sIG51bGwsIHZtLCBpbmZvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZtLl9oYXNIb29rRXZlbnQpIHtcbiAgICAgIHZtLiRlbWl0KCdob29rOicgKyBob29rKTtcbiAgICB9XG4gICAgcG9wVGFyZ2V0KCk7XG4gIH1cblxuICAvKiAgKi9cblxuICB2YXIgTUFYX1VQREFURV9DT1VOVCA9IDEwMDtcblxuICB2YXIgcXVldWUgPSBbXTtcbiAgdmFyIGFjdGl2YXRlZENoaWxkcmVuID0gW107XG4gIHZhciBoYXMgPSB7fTtcbiAgdmFyIGNpcmN1bGFyID0ge307XG4gIHZhciB3YWl0aW5nID0gZmFsc2U7XG4gIHZhciBmbHVzaGluZyA9IGZhbHNlO1xuICB2YXIgaW5kZXggPSAwO1xuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc2NoZWR1bGVyJ3Mgc3RhdGUuXG4gICAqL1xuICBmdW5jdGlvbiByZXNldFNjaGVkdWxlclN0YXRlICgpIHtcbiAgICBpbmRleCA9IHF1ZXVlLmxlbmd0aCA9IGFjdGl2YXRlZENoaWxkcmVuLmxlbmd0aCA9IDA7XG4gICAgaGFzID0ge307XG4gICAge1xuICAgICAgY2lyY3VsYXIgPSB7fTtcbiAgICB9XG4gICAgd2FpdGluZyA9IGZsdXNoaW5nID0gZmFsc2U7XG4gIH1cblxuICAvLyBBc3luYyBlZGdlIGNhc2UgIzY1NjYgcmVxdWlyZXMgc2F2aW5nIHRoZSB0aW1lc3RhbXAgd2hlbiBldmVudCBsaXN0ZW5lcnMgYXJlXG4gIC8vIGF0dGFjaGVkLiBIb3dldmVyLCBjYWxsaW5nIHBlcmZvcm1hbmNlLm5vdygpIGhhcyBhIHBlcmYgb3ZlcmhlYWQgZXNwZWNpYWxseVxuICAvLyBpZiB0aGUgcGFnZSBoYXMgdGhvdXNhbmRzIG9mIGV2ZW50IGxpc3RlbmVycy4gSW5zdGVhZCwgd2UgdGFrZSBhIHRpbWVzdGFtcFxuICAvLyBldmVyeSB0aW1lIHRoZSBzY2hlZHVsZXIgZmx1c2hlcyBhbmQgdXNlIHRoYXQgZm9yIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgLy8gYXR0YWNoZWQgZHVyaW5nIHRoYXQgZmx1c2guXG4gIHZhciBjdXJyZW50Rmx1c2hUaW1lc3RhbXAgPSAwO1xuXG4gIC8vIEFzeW5jIGVkZ2UgY2FzZSBmaXggcmVxdWlyZXMgc3RvcmluZyBhbiBldmVudCBsaXN0ZW5lcidzIGF0dGFjaCB0aW1lc3RhbXAuXG4gIHZhciBnZXROb3cgPSBEYXRlLm5vdztcblxuICAvLyBEZXRlcm1pbmUgd2hhdCBldmVudCB0aW1lc3RhbXAgdGhlIGJyb3dzZXIgaXMgdXNpbmcuIEFubm95aW5nbHksIHRoZVxuICAvLyB0aW1lc3RhbXAgY2FuIGVpdGhlciBiZSBoaS1yZXMgKHJlbGF0aXZlIHRvIHBhZ2UgbG9hZCkgb3IgbG93LXJlc1xuICAvLyAocmVsYXRpdmUgdG8gVU5JWCBlcG9jaCksIHNvIGluIG9yZGVyIHRvIGNvbXBhcmUgdGltZSB3ZSBoYXZlIHRvIHVzZSB0aGVcbiAgLy8gc2FtZSB0aW1lc3RhbXAgdHlwZSB3aGVuIHNhdmluZyB0aGUgZmx1c2ggdGltZXN0YW1wLlxuICAvLyBBbGwgSUUgdmVyc2lvbnMgdXNlIGxvdy1yZXMgZXZlbnQgdGltZXN0YW1wcywgYW5kIGhhdmUgcHJvYmxlbWF0aWMgY2xvY2tcbiAgLy8gaW1wbGVtZW50YXRpb25zICgjOTYzMilcbiAgaWYgKGluQnJvd3NlciAmJiAhaXNJRSkge1xuICAgIHZhciBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICBpZiAoXG4gICAgICBwZXJmb3JtYW5jZSAmJlxuICAgICAgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2V0Tm93KCkgPiBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKS50aW1lU3RhbXBcbiAgICApIHtcbiAgICAgIC8vIGlmIHRoZSBldmVudCB0aW1lc3RhbXAsIGFsdGhvdWdoIGV2YWx1YXRlZCBBRlRFUiB0aGUgRGF0ZS5ub3coKSwgaXNcbiAgICAgIC8vIHNtYWxsZXIgdGhhbiBpdCwgaXQgbWVhbnMgdGhlIGV2ZW50IGlzIHVzaW5nIGEgaGktcmVzIHRpbWVzdGFtcCxcbiAgICAgIC8vIGFuZCB3ZSBuZWVkIHRvIHVzZSB0aGUgaGktcmVzIHZlcnNpb24gZm9yIGV2ZW50IGxpc3RlbmVyIHRpbWVzdGFtcHMgYXNcbiAgICAgIC8vIHdlbGwuXG4gICAgICBnZXROb3cgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTsgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmx1c2ggYm90aCBxdWV1ZXMgYW5kIHJ1biB0aGUgd2F0Y2hlcnMuXG4gICAqL1xuICBmdW5jdGlvbiBmbHVzaFNjaGVkdWxlclF1ZXVlICgpIHtcbiAgICBjdXJyZW50Rmx1c2hUaW1lc3RhbXAgPSBnZXROb3coKTtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgdmFyIHdhdGNoZXIsIGlkO1xuXG4gICAgLy8gU29ydCBxdWV1ZSBiZWZvcmUgZmx1c2guXG4gICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQ6XG4gICAgLy8gMS4gQ29tcG9uZW50cyBhcmUgdXBkYXRlZCBmcm9tIHBhcmVudCB0byBjaGlsZC4gKGJlY2F1c2UgcGFyZW50IGlzIGFsd2F5c1xuICAgIC8vICAgIGNyZWF0ZWQgYmVmb3JlIHRoZSBjaGlsZClcbiAgICAvLyAyLiBBIGNvbXBvbmVudCdzIHVzZXIgd2F0Y2hlcnMgYXJlIHJ1biBiZWZvcmUgaXRzIHJlbmRlciB3YXRjaGVyIChiZWNhdXNlXG4gICAgLy8gICAgdXNlciB3YXRjaGVycyBhcmUgY3JlYXRlZCBiZWZvcmUgdGhlIHJlbmRlciB3YXRjaGVyKVxuICAgIC8vIDMuIElmIGEgY29tcG9uZW50IGlzIGRlc3Ryb3llZCBkdXJpbmcgYSBwYXJlbnQgY29tcG9uZW50J3Mgd2F0Y2hlciBydW4sXG4gICAgLy8gICAgaXRzIHdhdGNoZXJzIGNhbiBiZSBza2lwcGVkLlxuICAgIHF1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcblxuICAgIC8vIGRvIG5vdCBjYWNoZSBsZW5ndGggYmVjYXVzZSBtb3JlIHdhdGNoZXJzIG1pZ2h0IGJlIHB1c2hlZFxuICAgIC8vIGFzIHdlIHJ1biBleGlzdGluZyB3YXRjaGVyc1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHF1ZXVlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgd2F0Y2hlciA9IHF1ZXVlW2luZGV4XTtcbiAgICAgIGlmICh3YXRjaGVyLmJlZm9yZSkge1xuICAgICAgICB3YXRjaGVyLmJlZm9yZSgpO1xuICAgICAgfVxuICAgICAgaWQgPSB3YXRjaGVyLmlkO1xuICAgICAgaGFzW2lkXSA9IG51bGw7XG4gICAgICB3YXRjaGVyLnJ1bigpO1xuICAgICAgLy8gaW4gZGV2IGJ1aWxkLCBjaGVjayBhbmQgc3RvcCBjaXJjdWxhciB1cGRhdGVzLlxuICAgICAgaWYgKGhhc1tpZF0gIT0gbnVsbCkge1xuICAgICAgICBjaXJjdWxhcltpZF0gPSAoY2lyY3VsYXJbaWRdIHx8IDApICsgMTtcbiAgICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IE1BWF9VUERBVEVfQ09VTlQpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBhbiBpbmZpbml0ZSB1cGRhdGUgbG9vcCAnICsgKFxuICAgICAgICAgICAgICB3YXRjaGVyLnVzZXJcbiAgICAgICAgICAgICAgICA/IChcImluIHdhdGNoZXIgd2l0aCBleHByZXNzaW9uIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgOiBcImluIGEgY29tcG9uZW50IHJlbmRlciBmdW5jdGlvbi5cIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHdhdGNoZXIudm1cbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBrZWVwIGNvcGllcyBvZiBwb3N0IHF1ZXVlcyBiZWZvcmUgcmVzZXR0aW5nIHN0YXRlXG4gICAgdmFyIGFjdGl2YXRlZFF1ZXVlID0gYWN0aXZhdGVkQ2hpbGRyZW4uc2xpY2UoKTtcbiAgICB2YXIgdXBkYXRlZFF1ZXVlID0gcXVldWUuc2xpY2UoKTtcblxuICAgIHJlc2V0U2NoZWR1bGVyU3RhdGUoKTtcblxuICAgIC8vIGNhbGwgY29tcG9uZW50IHVwZGF0ZWQgYW5kIGFjdGl2YXRlZCBob29rc1xuICAgIGNhbGxBY3RpdmF0ZWRIb29rcyhhY3RpdmF0ZWRRdWV1ZSk7XG4gICAgY2FsbFVwZGF0ZWRIb29rcyh1cGRhdGVkUXVldWUpO1xuXG4gICAgLy8gZGV2dG9vbCBob29rXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGRldnRvb2xzICYmIGNvbmZpZy5kZXZ0b29scykge1xuICAgICAgZGV2dG9vbHMuZW1pdCgnZmx1c2gnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYWxsVXBkYXRlZEhvb2tzIChxdWV1ZSkge1xuICAgIHZhciBpID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHZhciB3YXRjaGVyID0gcXVldWVbaV07XG4gICAgICB2YXIgdm0gPSB3YXRjaGVyLnZtO1xuICAgICAgaWYgKHZtLl93YXRjaGVyID09PSB3YXRjaGVyICYmIHZtLl9pc01vdW50ZWQgJiYgIXZtLl9pc0Rlc3Ryb3llZCkge1xuICAgICAgICBjYWxsSG9vayh2bSwgJ3VwZGF0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUXVldWUgYSBrZXB0LWFsaXZlIGNvbXBvbmVudCB0aGF0IHdhcyBhY3RpdmF0ZWQgZHVyaW5nIHBhdGNoLlxuICAgKiBUaGUgcXVldWUgd2lsbCBiZSBwcm9jZXNzZWQgYWZ0ZXIgdGhlIGVudGlyZSB0cmVlIGhhcyBiZWVuIHBhdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBxdWV1ZUFjdGl2YXRlZENvbXBvbmVudCAodm0pIHtcbiAgICAvLyBzZXR0aW5nIF9pbmFjdGl2ZSB0byBmYWxzZSBoZXJlIHNvIHRoYXQgYSByZW5kZXIgZnVuY3Rpb24gY2FuXG4gICAgLy8gcmVseSBvbiBjaGVja2luZyB3aGV0aGVyIGl0J3MgaW4gYW4gaW5hY3RpdmUgdHJlZSAoZS5nLiByb3V0ZXItdmlldylcbiAgICB2bS5faW5hY3RpdmUgPSBmYWxzZTtcbiAgICBhY3RpdmF0ZWRDaGlsZHJlbi5wdXNoKHZtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGxBY3RpdmF0ZWRIb29rcyAocXVldWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZVtpXS5faW5hY3RpdmUgPSB0cnVlO1xuICAgICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudChxdWV1ZVtpXSwgdHJ1ZSAvKiB0cnVlICovKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVzaCBhIHdhdGNoZXIgaW50byB0aGUgd2F0Y2hlciBxdWV1ZS5cbiAgICogSm9icyB3aXRoIGR1cGxpY2F0ZSBJRHMgd2lsbCBiZSBza2lwcGVkIHVubGVzcyBpdCdzXG4gICAqIHB1c2hlZCB3aGVuIHRoZSBxdWV1ZSBpcyBiZWluZyBmbHVzaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gcXVldWVXYXRjaGVyICh3YXRjaGVyKSB7XG4gICAgdmFyIGlkID0gd2F0Y2hlci5pZDtcbiAgICBpZiAoaGFzW2lkXSA9PSBudWxsKSB7XG4gICAgICBoYXNbaWRdID0gdHJ1ZTtcbiAgICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgICAgcXVldWUucHVzaCh3YXRjaGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGFscmVhZHkgZmx1c2hpbmcsIHNwbGljZSB0aGUgd2F0Y2hlciBiYXNlZCBvbiBpdHMgaWRcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBwYXN0IGl0cyBpZCwgaXQgd2lsbCBiZSBydW4gbmV4dCBpbW1lZGlhdGVseS5cbiAgICAgICAgdmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaSA+IGluZGV4ICYmIHF1ZXVlW2ldLmlkID4gd2F0Y2hlci5pZCkge1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZS5zcGxpY2UoaSArIDEsIDAsIHdhdGNoZXIpO1xuICAgICAgfVxuICAgICAgLy8gcXVldWUgdGhlIGZsdXNoXG4gICAgICBpZiAoIXdhaXRpbmcpIHtcbiAgICAgICAgd2FpdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFjb25maWcuYXN5bmMpIHtcbiAgICAgICAgICBmbHVzaFNjaGVkdWxlclF1ZXVlKCk7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbmV4dFRpY2soZmx1c2hTY2hlZHVsZXJRdWV1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cblxuXG4gIHZhciB1aWQkMiA9IDA7XG5cbiAgLyoqXG4gICAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICAgKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGJvdGggdGhlICR3YXRjaCgpIGFwaSBhbmQgZGlyZWN0aXZlcy5cbiAgICovXG4gIHZhciBXYXRjaGVyID0gZnVuY3Rpb24gV2F0Y2hlciAoXG4gICAgdm0sXG4gICAgZXhwT3JGbixcbiAgICBjYixcbiAgICBvcHRpb25zLFxuICAgIGlzUmVuZGVyV2F0Y2hlclxuICApIHtcbiAgICB0aGlzLnZtID0gdm07XG4gICAgaWYgKGlzUmVuZGVyV2F0Y2hlcikge1xuICAgICAgdm0uX3dhdGNoZXIgPSB0aGlzO1xuICAgIH1cbiAgICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKTtcbiAgICAvLyBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZGVlcCA9ICEhb3B0aW9ucy5kZWVwO1xuICAgICAgdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXI7XG4gICAgICB0aGlzLmxhenkgPSAhIW9wdGlvbnMubGF6eTtcbiAgICAgIHRoaXMuc3luYyA9ICEhb3B0aW9ucy5zeW5jO1xuICAgICAgdGhpcy5iZWZvcmUgPSBvcHRpb25zLmJlZm9yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWVwID0gdGhpcy51c2VyID0gdGhpcy5sYXp5ID0gdGhpcy5zeW5jID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2IgPSBjYjtcbiAgICB0aGlzLmlkID0gKyt1aWQkMjsgLy8gdWlkIGZvciBiYXRjaGluZ1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmRpcnR5ID0gdGhpcy5sYXp5OyAvLyBmb3IgbGF6eSB3YXRjaGVyc1xuICAgIHRoaXMuZGVwcyA9IFtdO1xuICAgIHRoaXMubmV3RGVwcyA9IFtdO1xuICAgIHRoaXMuZGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgICB0aGlzLm5ld0RlcElkcyA9IG5ldyBfU2V0KCk7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwT3JGbi50b1N0cmluZygpO1xuICAgIC8vIHBhcnNlIGV4cHJlc3Npb24gZm9yIGdldHRlclxuICAgIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBleHBPckZuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKTtcbiAgICAgIGlmICghdGhpcy5nZXR0ZXIpIHtcbiAgICAgICAgdGhpcy5nZXR0ZXIgPSBub29wO1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiRmFpbGVkIHdhdGNoaW5nIHBhdGg6IFxcXCJcIiArIGV4cE9yRm4gKyBcIlxcXCIgXCIgK1xuICAgICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICAgJ0ZvciBmdWxsIGNvbnRyb2wsIHVzZSBhIGZ1bmN0aW9uIGluc3RlYWQuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5sYXp5XG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB0aGlzLmdldCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSB0aGUgZ2V0dGVyLCBhbmQgcmUtY29sbGVjdCBkZXBlbmRlbmNpZXMuXG4gICAqL1xuICBXYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKCkge1xuICAgIHB1c2hUYXJnZXQodGhpcyk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhciB2bSA9IHRoaXMudm07XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICh0aGlzLnVzZXIpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIChcImdldHRlciBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAgICAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gICAgICBpZiAodGhpcy5kZWVwKSB7XG4gICAgICAgIHRyYXZlcnNlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHBvcFRhcmdldCgpO1xuICAgICAgdGhpcy5jbGVhbnVwRGVwcygpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGEgZGVwZW5kZW5jeSB0byB0aGlzIGRpcmVjdGl2ZS5cbiAgICovXG4gIFdhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIGFkZERlcCAoZGVwKSB7XG4gICAgdmFyIGlkID0gZGVwLmlkO1xuICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKTtcbiAgICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcCk7XG4gICAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgICAgZGVwLmFkZFN1Yih0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gICAqL1xuICBXYXRjaGVyLnByb3RvdHlwZS5jbGVhbnVwRGVwcyA9IGZ1bmN0aW9uIGNsZWFudXBEZXBzICgpIHtcbiAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFyIGRlcCA9IHRoaXMuZGVwc1tpXTtcbiAgICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGRlcC5pZCkpIHtcbiAgICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHRtcCA9IHRoaXMuZGVwSWRzO1xuICAgIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHM7XG4gICAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XG4gICAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKTtcbiAgICB0bXAgPSB0aGlzLmRlcHM7XG4gICAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xuICAgIHRoaXMubmV3RGVwcyA9IHRtcDtcbiAgICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMDtcbiAgfTtcblxuICAvKipcbiAgICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gICAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gICAqL1xuICBXYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgICAgIHRoaXMucnVuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHF1ZXVlV2F0Y2hlcih0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlciBqb2IgaW50ZXJmYWNlLlxuICAgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyLlxuICAgKi9cbiAgV2F0Y2hlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gcnVuICgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgICBpZiAoXG4gICAgICAgIHZhbHVlICE9PSB0aGlzLnZhbHVlIHx8XG4gICAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgICAvLyB3aGVuIHRoZSB2YWx1ZSBpcyB0aGUgc2FtZSwgYmVjYXVzZSB0aGUgdmFsdWUgbWF5XG4gICAgICAgIC8vIGhhdmUgbXV0YXRlZC5cbiAgICAgICAgaXNPYmplY3QodmFsdWUpIHx8XG4gICAgICAgIHRoaXMuZGVlcFxuICAgICAgKSB7XG4gICAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZUVycm9yKGUsIHRoaXMudm0sIChcImNhbGxiYWNrIGZvciB3YXRjaGVyIFxcXCJcIiArICh0aGlzLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIHRoZSB2YWx1ZSBvZiB0aGUgd2F0Y2hlci5cbiAgICogVGhpcyBvbmx5IGdldHMgY2FsbGVkIGZvciBsYXp5IHdhdGNoZXJzLlxuICAgKi9cbiAgV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiBldmFsdWF0ZSAoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZXBlbmQgb24gYWxsIGRlcHMgY29sbGVjdGVkIGJ5IHRoaXMgd2F0Y2hlci5cbiAgICovXG4gIFdhdGNoZXIucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uIGRlcGVuZCAoKSB7XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuZGVwc1tpXS5kZXBlbmQoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzZWxmIGZyb20gYWxsIGRlcGVuZGVuY2llcycgc3Vic2NyaWJlciBsaXN0LlxuICAgKi9cbiAgV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiB0ZWFyZG93biAoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG4gICAgICAvLyB0aGlzIGlzIGEgc29tZXdoYXQgZXhwZW5zaXZlIG9wZXJhdGlvbiBzbyB3ZSBza2lwIGl0XG4gICAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkLlxuICAgICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICAgIHJlbW92ZSh0aGlzLnZtLl93YXRjaGVycywgdGhpcyk7XG4gICAgICB9XG4gICAgICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHRoaXMuZGVwc1tpXS5yZW1vdmVTdWIodGhpcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKiAgKi9cblxuICB2YXIgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uID0ge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogbm9vcCxcbiAgICBzZXQ6IG5vb3BcbiAgfTtcblxuICBmdW5jdGlvbiBwcm94eSAodGFyZ2V0LCBzb3VyY2VLZXksIGtleSkge1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5nZXQgPSBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgICByZXR1cm4gdGhpc1tzb3VyY2VLZXldW2tleV1cbiAgICB9O1xuICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgICB0aGlzW3NvdXJjZUtleV1ba2V5XSA9IHZhbDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTdGF0ZSAodm0pIHtcbiAgICB2bS5fd2F0Y2hlcnMgPSBbXTtcbiAgICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zO1xuICAgIGlmIChvcHRzLnByb3BzKSB7IGluaXRQcm9wcyh2bSwgb3B0cy5wcm9wcyk7IH1cbiAgICBpZiAob3B0cy5tZXRob2RzKSB7IGluaXRNZXRob2RzKHZtLCBvcHRzLm1ldGhvZHMpOyB9XG4gICAgaWYgKG9wdHMuZGF0YSkge1xuICAgICAgaW5pdERhdGEodm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYnNlcnZlKHZtLl9kYXRhID0ge30sIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG4gICAgfVxuICAgIGlmIChvcHRzLmNvbXB1dGVkKSB7IGluaXRDb21wdXRlZCh2bSwgb3B0cy5jb21wdXRlZCk7IH1cbiAgICBpZiAob3B0cy53YXRjaCAmJiBvcHRzLndhdGNoICE9PSBuYXRpdmVXYXRjaCkge1xuICAgICAgaW5pdFdhdGNoKHZtLCBvcHRzLndhdGNoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0UHJvcHMgKHZtLCBwcm9wc09wdGlvbnMpIHtcbiAgICB2YXIgcHJvcHNEYXRhID0gdm0uJG9wdGlvbnMucHJvcHNEYXRhIHx8IHt9O1xuICAgIHZhciBwcm9wcyA9IHZtLl9wcm9wcyA9IHt9O1xuICAgIC8vIGNhY2hlIHByb3Aga2V5cyBzbyB0aGF0IGZ1dHVyZSBwcm9wcyB1cGRhdGVzIGNhbiBpdGVyYXRlIHVzaW5nIEFycmF5XG4gICAgLy8gaW5zdGVhZCBvZiBkeW5hbWljIG9iamVjdCBrZXkgZW51bWVyYXRpb24uXG4gICAgdmFyIGtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgPSBbXTtcbiAgICB2YXIgaXNSb290ID0gIXZtLiRwYXJlbnQ7XG4gICAgLy8gcm9vdCBpbnN0YW5jZSBwcm9wcyBzaG91bGQgYmUgY29udmVydGVkXG4gICAgaWYgKCFpc1Jvb3QpIHtcbiAgICAgIHRvZ2dsZU9ic2VydmluZyhmYWxzZSk7XG4gICAgfVxuICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCBrZXkgKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIHZhciB2YWx1ZSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BzT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAge1xuICAgICAgICB2YXIgaHlwaGVuYXRlZEtleSA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgICBpZiAoaXNSZXNlcnZlZEF0dHJpYnV0ZShoeXBoZW5hdGVkS2V5KSB8fFxuICAgICAgICAgICAgY29uZmlnLmlzUmVzZXJ2ZWRBdHRyKGh5cGhlbmF0ZWRLZXkpKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIChcIlxcXCJcIiArIGh5cGhlbmF0ZWRLZXkgKyBcIlxcXCIgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGNvbXBvbmVudCBwcm9wLlwiKSxcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZpbmVSZWFjdGl2ZSQkMShwcm9wcywga2V5LCB2YWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaXNSb290ICYmICFpc1VwZGF0aW5nQ2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgIFwiQXZvaWQgbXV0YXRpbmcgYSBwcm9wIGRpcmVjdGx5IHNpbmNlIHRoZSB2YWx1ZSB3aWxsIGJlIFwiICtcbiAgICAgICAgICAgICAgXCJvdmVyd3JpdHRlbiB3aGVuZXZlciB0aGUgcGFyZW50IGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICAgIFwiSW5zdGVhZCwgdXNlIGEgZGF0YSBvciBjb21wdXRlZCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcHJvcCdzIFwiICtcbiAgICAgICAgICAgICAgXCJ2YWx1ZS4gUHJvcCBiZWluZyBtdXRhdGVkOiBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIixcbiAgICAgICAgICAgICAgdm1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHN0YXRpYyBwcm9wcyBhcmUgYWxyZWFkeSBwcm94aWVkIG9uIHRoZSBjb21wb25lbnQncyBwcm90b3R5cGVcbiAgICAgIC8vIGR1cmluZyBWdWUuZXh0ZW5kKCkuIFdlIG9ubHkgbmVlZCB0byBwcm94eSBwcm9wcyBkZWZpbmVkIGF0XG4gICAgICAvLyBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICAgIHByb3h5KHZtLCBcIl9wcm9wc1wiLCBrZXkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHNPcHRpb25zKSBsb29wKCBrZXkgKTtcbiAgICB0b2dnbGVPYnNlcnZpbmcodHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RGF0YSAodm0pIHtcbiAgICB2YXIgZGF0YSA9IHZtLiRvcHRpb25zLmRhdGE7XG4gICAgZGF0YSA9IHZtLl9kYXRhID0gdHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbidcbiAgICAgID8gZ2V0RGF0YShkYXRhLCB2bSlcbiAgICAgIDogZGF0YSB8fCB7fTtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoZGF0YSkpIHtcbiAgICAgIGRhdGEgPSB7fTtcbiAgICAgIHdhcm4oXG4gICAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICAgJ2h0dHBzOi8vdnVlanMub3JnL3YyL2d1aWRlL2NvbXBvbmVudHMuaHRtbCNkYXRhLU11c3QtQmUtYS1GdW5jdGlvbicsXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgICB2YXIgbWV0aG9kcyA9IHZtLiRvcHRpb25zLm1ldGhvZHM7XG4gICAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHtcbiAgICAgICAgaWYgKG1ldGhvZHMgJiYgaGFzT3duKG1ldGhvZHMsIGtleSkpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgKFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBkYXRhIHByb3BlcnR5LlwiKSxcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzICYmIGhhc093bihwcm9wcywga2V5KSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiVGhlIGRhdGEgcHJvcGVydHkgXFxcIlwiICsga2V5ICsgXCJcXFwiIGlzIGFscmVhZHkgZGVjbGFyZWQgYXMgYSBwcm9wLiBcIiArXG4gICAgICAgICAgXCJVc2UgcHJvcCBkZWZhdWx0IHZhbHVlIGluc3RlYWQuXCIsXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgICBwcm94eSh2bSwgXCJfZGF0YVwiLCBrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBvYnNlcnZlIGRhdGFcbiAgICBvYnNlcnZlKGRhdGEsIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREYXRhIChkYXRhLCB2bSkge1xuICAgIC8vICM3NTczIGRpc2FibGUgZGVwIGNvbGxlY3Rpb24gd2hlbiBpbnZva2luZyBkYXRhIGdldHRlcnNcbiAgICBwdXNoVGFyZ2V0KCk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBkYXRhLmNhbGwodm0sIHZtKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGhhbmRsZUVycm9yKGUsIHZtLCBcImRhdGEoKVwiKTtcbiAgICAgIHJldHVybiB7fVxuICAgIH0gZmluYWxseSB7XG4gICAgICBwb3BUYXJnZXQoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tcHV0ZWRXYXRjaGVyT3B0aW9ucyA9IHsgbGF6eTogdHJ1ZSB9O1xuXG4gIGZ1bmN0aW9uIGluaXRDb21wdXRlZCAodm0sIGNvbXB1dGVkKSB7XG4gICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgdmFyIHdhdGNoZXJzID0gdm0uX2NvbXB1dGVkV2F0Y2hlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIGNvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGp1c3QgZ2V0dGVycyBkdXJpbmcgU1NSXG4gICAgdmFyIGlzU1NSID0gaXNTZXJ2ZXJSZW5kZXJpbmcoKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldO1xuICAgICAgdmFyIGdldHRlciA9IHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nID8gdXNlckRlZiA6IHVzZXJEZWYuZ2V0O1xuICAgICAgaWYgKGdldHRlciA9PSBudWxsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwiR2V0dGVyIGlzIG1pc3NpbmcgZm9yIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIi5cIiksXG4gICAgICAgICAgdm1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1NTUikge1xuICAgICAgICAvLyBjcmVhdGUgaW50ZXJuYWwgd2F0Y2hlciBmb3IgdGhlIGNvbXB1dGVkIHByb3BlcnR5LlxuICAgICAgICB3YXRjaGVyc1trZXldID0gbmV3IFdhdGNoZXIoXG4gICAgICAgICAgdm0sXG4gICAgICAgICAgZ2V0dGVyIHx8IG5vb3AsXG4gICAgICAgICAgbm9vcCxcbiAgICAgICAgICBjb21wdXRlZFdhdGNoZXJPcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbXBvbmVudC1kZWZpbmVkIGNvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGFscmVhZHkgZGVmaW5lZCBvbiB0aGVcbiAgICAgIC8vIGNvbXBvbmVudCBwcm90b3R5cGUuIFdlIG9ubHkgbmVlZCB0byBkZWZpbmUgY29tcHV0ZWQgcHJvcGVydGllcyBkZWZpbmVkXG4gICAgICAvLyBhdCBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgICBpZiAoIShrZXkgaW4gdm0pKSB7XG4gICAgICAgIGRlZmluZUNvbXB1dGVkKHZtLCBrZXksIHVzZXJEZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGtleSBpbiB2bS4kZGF0YSkge1xuICAgICAgICAgIHdhcm4oKFwiVGhlIGNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlZmluZWQgaW4gZGF0YS5cIiksIHZtKTtcbiAgICAgICAgfSBlbHNlIGlmICh2bS4kb3B0aW9ucy5wcm9wcyAmJiBrZXkgaW4gdm0uJG9wdGlvbnMucHJvcHMpIHtcbiAgICAgICAgICB3YXJuKChcIlRoZSBjb21wdXRlZCBwcm9wZXJ0eSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYWxyZWFkeSBkZWZpbmVkIGFzIGEgcHJvcC5cIiksIHZtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUNvbXB1dGVkIChcbiAgICB0YXJnZXQsXG4gICAga2V5LFxuICAgIHVzZXJEZWZcbiAgKSB7XG4gICAgdmFyIHNob3VsZENhY2hlID0gIWlzU2VydmVyUmVuZGVyaW5nKCk7XG4gICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gc2hvdWxkQ2FjaGVcbiAgICAgICAgPyBjcmVhdGVDb21wdXRlZEdldHRlcihrZXkpXG4gICAgICAgIDogY3JlYXRlR2V0dGVySW52b2tlcih1c2VyRGVmKTtcbiAgICAgIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbi5zZXQgPSBub29wO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uZ2V0ID0gdXNlckRlZi5nZXRcbiAgICAgICAgPyBzaG91bGRDYWNoZSAmJiB1c2VyRGVmLmNhY2hlICE9PSBmYWxzZVxuICAgICAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgICAgIDogY3JlYXRlR2V0dGVySW52b2tlcih1c2VyRGVmLmdldClcbiAgICAgICAgOiBub29wO1xuICAgICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IHVzZXJEZWYuc2V0IHx8IG5vb3A7XG4gICAgfVxuICAgIGlmIChzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID09PSBub29wKSB7XG4gICAgICBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24uc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIChcIkNvbXB1dGVkIHByb3BlcnR5IFxcXCJcIiArIGtleSArIFwiXFxcIiB3YXMgYXNzaWduZWQgdG8gYnV0IGl0IGhhcyBubyBzZXR0ZXIuXCIpLFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVkR2V0dGVyIChrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgICAgdmFyIHdhdGNoZXIgPSB0aGlzLl9jb21wdXRlZFdhdGNoZXJzICYmIHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnNba2V5XTtcbiAgICAgIGlmICh3YXRjaGVyKSB7XG4gICAgICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XG4gICAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2F0Y2hlci52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUdldHRlckludm9rZXIoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgdGhpcylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0TWV0aG9kcyAodm0sIG1ldGhvZHMpIHtcbiAgICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgICAge1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZHNba2V5XSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICBcIk1ldGhvZCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaGFzIHR5cGUgXFxcIlwiICsgKHR5cGVvZiBtZXRob2RzW2tleV0pICsgXCJcXFwiIGluIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbi4gXCIgK1xuICAgICAgICAgICAgXCJEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P1wiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcyAmJiBoYXNPd24ocHJvcHMsIGtleSkpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgKFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBwcm9wLlwiKSxcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGtleSBpbiB2bSkgJiYgaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwiTWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBjb25mbGljdHMgd2l0aCBhbiBleGlzdGluZyBWdWUgaW5zdGFuY2UgbWV0aG9kLiBcIiArXG4gICAgICAgICAgICBcIkF2b2lkIGRlZmluaW5nIGNvbXBvbmVudCBtZXRob2RzIHRoYXQgc3RhcnQgd2l0aCBfIG9yICQuXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2bVtrZXldID0gdHlwZW9mIG1ldGhvZHNba2V5XSAhPT0gJ2Z1bmN0aW9uJyA/IG5vb3AgOiBiaW5kKG1ldGhvZHNba2V5XSwgdm0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRXYXRjaCAodm0sIHdhdGNoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHdhdGNoKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShoYW5kbGVyKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVdhdGNoZXIgKFxuICAgIHZtLFxuICAgIGV4cE9yRm4sXG4gICAgaGFuZGxlcixcbiAgICBvcHRpb25zXG4gICkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgICBvcHRpb25zID0gaGFuZGxlcjtcbiAgICAgIGhhbmRsZXIgPSBoYW5kbGVyLmhhbmRsZXI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhhbmRsZXIgPSB2bVtoYW5kbGVyXTtcbiAgICB9XG4gICAgcmV0dXJuIHZtLiR3YXRjaChleHBPckZuLCBoYW5kbGVyLCBvcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gICAgLy8gZmxvdyBzb21laG93IGhhcyBwcm9ibGVtcyB3aXRoIGRpcmVjdGx5IGRlY2xhcmVkIGRlZmluaXRpb24gb2JqZWN0XG4gICAgLy8gd2hlbiB1c2luZyBPYmplY3QuZGVmaW5lUHJvcGVydHksIHNvIHdlIGhhdmUgdG8gcHJvY2VkdXJhbGx5IGJ1aWxkIHVwXG4gICAgLy8gdGhlIG9iamVjdCBoZXJlLlxuICAgIHZhciBkYXRhRGVmID0ge307XG4gICAgZGF0YURlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kYXRhIH07XG4gICAgdmFyIHByb3BzRGVmID0ge307XG4gICAgcHJvcHNEZWYuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fcHJvcHMgfTtcbiAgICB7XG4gICAgICBkYXRhRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnQXZvaWQgcmVwbGFjaW5nIGluc3RhbmNlIHJvb3QgJGRhdGEuICcgK1xuICAgICAgICAgICdVc2UgbmVzdGVkIGRhdGEgcHJvcGVydGllcyBpbnN0ZWFkLicsXG4gICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgICAgfTtcbiAgICAgIHByb3BzRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2FybihcIiRwcm9wcyBpcyByZWFkb25seS5cIiwgdGhpcyk7XG4gICAgICB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRkYXRhJywgZGF0YURlZik7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckcHJvcHMnLCBwcm9wc0RlZik7XG5cbiAgICBWdWUucHJvdG90eXBlLiRzZXQgPSBzZXQ7XG4gICAgVnVlLnByb3RvdHlwZS4kZGVsZXRlID0gZGVsO1xuXG4gICAgVnVlLnByb3RvdHlwZS4kd2F0Y2ggPSBmdW5jdGlvbiAoXG4gICAgICBleHBPckZuLFxuICAgICAgY2IsXG4gICAgICBvcHRpb25zXG4gICAgKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgaWYgKGlzUGxhaW5PYmplY3QoY2IpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVXYXRjaGVyKHZtLCBleHBPckZuLCBjYiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgb3B0aW9ucy51c2VyID0gdHJ1ZTtcbiAgICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLmltbWVkaWF0ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNiLmNhbGwodm0sIHdhdGNoZXIudmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGhhbmRsZUVycm9yKGVycm9yLCB2bSwgKFwiY2FsbGJhY2sgZm9yIGltbWVkaWF0ZSB3YXRjaGVyIFxcXCJcIiArICh3YXRjaGVyLmV4cHJlc3Npb24pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVud2F0Y2hGbiAoKSB7XG4gICAgICAgIHdhdGNoZXIudGVhcmRvd24oKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIHVpZCQzID0gMDtcblxuICBmdW5jdGlvbiBpbml0TWl4aW4gKFZ1ZSkge1xuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIC8vIGEgdWlkXG4gICAgICB2bS5fdWlkID0gdWlkJDMrKztcblxuICAgICAgdmFyIHN0YXJ0VGFnLCBlbmRUYWc7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChjb25maWcucGVyZm9ybWFuY2UgJiYgbWFyaykge1xuICAgICAgICBzdGFydFRhZyA9IFwidnVlLXBlcmYtc3RhcnQ6XCIgKyAodm0uX3VpZCk7XG4gICAgICAgIGVuZFRhZyA9IFwidnVlLXBlcmYtZW5kOlwiICsgKHZtLl91aWQpO1xuICAgICAgICBtYXJrKHN0YXJ0VGFnKTtcbiAgICAgIH1cblxuICAgICAgLy8gYSBmbGFnIHRvIGF2b2lkIHRoaXMgYmVpbmcgb2JzZXJ2ZWRcbiAgICAgIHZtLl9pc1Z1ZSA9IHRydWU7XG4gICAgICAvLyBtZXJnZSBvcHRpb25zXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLl9pc0NvbXBvbmVudCkge1xuICAgICAgICAvLyBvcHRpbWl6ZSBpbnRlcm5hbCBjb21wb25lbnQgaW5zdGFudGlhdGlvblxuICAgICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXG4gICAgICAgIC8vIGludGVybmFsIGNvbXBvbmVudCBvcHRpb25zIG5lZWRzIHNwZWNpYWwgdHJlYXRtZW50LlxuICAgICAgICBpbml0SW50ZXJuYWxDb21wb25lbnQodm0sIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm0uJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoXG4gICAgICAgICAgcmVzb2x2ZUNvbnN0cnVjdG9yT3B0aW9ucyh2bS5jb25zdHJ1Y3RvciksXG4gICAgICAgICAgb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIHtcbiAgICAgICAgaW5pdFByb3h5KHZtKTtcbiAgICAgIH1cbiAgICAgIC8vIGV4cG9zZSByZWFsIHNlbGZcbiAgICAgIHZtLl9zZWxmID0gdm07XG4gICAgICBpbml0TGlmZWN5Y2xlKHZtKTtcbiAgICAgIGluaXRFdmVudHModm0pO1xuICAgICAgaW5pdFJlbmRlcih2bSk7XG4gICAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZUNyZWF0ZScpO1xuICAgICAgaW5pdEluamVjdGlvbnModm0pOyAvLyByZXNvbHZlIGluamVjdGlvbnMgYmVmb3JlIGRhdGEvcHJvcHNcbiAgICAgIGluaXRTdGF0ZSh2bSk7XG4gICAgICBpbml0UHJvdmlkZSh2bSk7IC8vIHJlc29sdmUgcHJvdmlkZSBhZnRlciBkYXRhL3Byb3BzXG4gICAgICBjYWxsSG9vayh2bSwgJ2NyZWF0ZWQnKTtcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoY29uZmlnLnBlcmZvcm1hbmNlICYmIG1hcmspIHtcbiAgICAgICAgdm0uX25hbWUgPSBmb3JtYXRDb21wb25lbnROYW1lKHZtLCBmYWxzZSk7XG4gICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgbWVhc3VyZSgoXCJ2dWUgXCIgKyAodm0uX25hbWUpICsgXCIgaW5pdFwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh2bS4kb3B0aW9ucy5lbCkge1xuICAgICAgICB2bS4kbW91bnQodm0uJG9wdGlvbnMuZWwpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SW50ZXJuYWxDb21wb25lbnQgKHZtLCBvcHRpb25zKSB7XG4gICAgdmFyIG9wdHMgPSB2bS4kb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodm0uY29uc3RydWN0b3Iub3B0aW9ucyk7XG4gICAgLy8gZG9pbmcgdGhpcyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gZHluYW1pYyBlbnVtZXJhdGlvbi5cbiAgICB2YXIgcGFyZW50Vm5vZGUgPSBvcHRpb25zLl9wYXJlbnRWbm9kZTtcbiAgICBvcHRzLnBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICAgIG9wdHMuX3BhcmVudFZub2RlID0gcGFyZW50Vm5vZGU7XG5cbiAgICB2YXIgdm5vZGVDb21wb25lbnRPcHRpb25zID0gcGFyZW50Vm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICBvcHRzLnByb3BzRGF0YSA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy5wcm9wc0RhdGE7XG4gICAgb3B0cy5fcGFyZW50TGlzdGVuZXJzID0gdm5vZGVDb21wb25lbnRPcHRpb25zLmxpc3RlbmVycztcbiAgICBvcHRzLl9yZW5kZXJDaGlsZHJlbiA9IHZub2RlQ29tcG9uZW50T3B0aW9ucy5jaGlsZHJlbjtcbiAgICBvcHRzLl9jb21wb25lbnRUYWcgPSB2bm9kZUNvbXBvbmVudE9wdGlvbnMudGFnO1xuXG4gICAgaWYgKG9wdGlvbnMucmVuZGVyKSB7XG4gICAgICBvcHRzLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyO1xuICAgICAgb3B0cy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZucztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zIChDdG9yKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBDdG9yLm9wdGlvbnM7XG4gICAgaWYgKEN0b3Iuc3VwZXIpIHtcbiAgICAgIHZhciBzdXBlck9wdGlvbnMgPSByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3Iuc3VwZXIpO1xuICAgICAgdmFyIGNhY2hlZFN1cGVyT3B0aW9ucyA9IEN0b3Iuc3VwZXJPcHRpb25zO1xuICAgICAgaWYgKHN1cGVyT3B0aW9ucyAhPT0gY2FjaGVkU3VwZXJPcHRpb25zKSB7XG4gICAgICAgIC8vIHN1cGVyIG9wdGlvbiBjaGFuZ2VkLFxuICAgICAgICAvLyBuZWVkIHRvIHJlc29sdmUgbmV3IG9wdGlvbnMuXG4gICAgICAgIEN0b3Iuc3VwZXJPcHRpb25zID0gc3VwZXJPcHRpb25zO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IGxhdGUtbW9kaWZpZWQvYXR0YWNoZWQgb3B0aW9ucyAoIzQ5NzYpXG4gICAgICAgIHZhciBtb2RpZmllZE9wdGlvbnMgPSByZXNvbHZlTW9kaWZpZWRPcHRpb25zKEN0b3IpO1xuICAgICAgICAvLyB1cGRhdGUgYmFzZSBleHRlbmQgb3B0aW9uc1xuICAgICAgICBpZiAobW9kaWZpZWRPcHRpb25zKSB7XG4gICAgICAgICAgZXh0ZW5kKEN0b3IuZXh0ZW5kT3B0aW9ucywgbW9kaWZpZWRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gQ3Rvci5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHN1cGVyT3B0aW9ucywgQ3Rvci5leHRlbmRPcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xuICAgICAgICAgIG9wdGlvbnMuY29tcG9uZW50c1tvcHRpb25zLm5hbWVdID0gQ3RvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyAoQ3Rvcikge1xuICAgIHZhciBtb2RpZmllZDtcbiAgICB2YXIgbGF0ZXN0ID0gQ3Rvci5vcHRpb25zO1xuICAgIHZhciBzZWFsZWQgPSBDdG9yLnNlYWxlZE9wdGlvbnM7XG4gICAgZm9yICh2YXIga2V5IGluIGxhdGVzdCkge1xuICAgICAgaWYgKGxhdGVzdFtrZXldICE9PSBzZWFsZWRba2V5XSkge1xuICAgICAgICBpZiAoIW1vZGlmaWVkKSB7IG1vZGlmaWVkID0ge307IH1cbiAgICAgICAgbW9kaWZpZWRba2V5XSA9IGxhdGVzdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9kaWZpZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIFZ1ZSAob3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBWdWUpXG4gICAgKSB7XG4gICAgICB3YXJuKCdWdWUgaXMgYSBjb25zdHJ1Y3RvciBhbmQgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSBgbmV3YCBrZXl3b3JkJyk7XG4gICAgfVxuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gIH1cblxuICBpbml0TWl4aW4oVnVlKTtcbiAgc3RhdGVNaXhpbihWdWUpO1xuICBldmVudHNNaXhpbihWdWUpO1xuICBsaWZlY3ljbGVNaXhpbihWdWUpO1xuICByZW5kZXJNaXhpbihWdWUpO1xuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGluaXRVc2UgKFZ1ZSkge1xuICAgIFZ1ZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICB2YXIgaW5zdGFsbGVkUGx1Z2lucyA9ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zIHx8ICh0aGlzLl9pbnN0YWxsZWRQbHVnaW5zID0gW10pKTtcbiAgICAgIGlmIChpbnN0YWxsZWRQbHVnaW5zLmluZGV4T2YocGx1Z2luKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG5cbiAgICAgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cywgMSk7XG4gICAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBsdWdpbi5pbnN0YWxsLmFwcGx5KHBsdWdpbiwgYXJncyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgaW5zdGFsbGVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH07XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBpbml0TWl4aW4kMSAoVnVlKSB7XG4gICAgVnVlLm1peGluID0gZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5vcHRpb25zLCBtaXhpbik7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH07XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBpbml0RXh0ZW5kIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBFYWNoIGluc3RhbmNlIGNvbnN0cnVjdG9yLCBpbmNsdWRpbmcgVnVlLCBoYXMgYSB1bmlxdWVcbiAgICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG4gICAgICogY29uc3RydWN0b3JzXCIgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UgYW5kIGNhY2hlIHRoZW0uXG4gICAgICovXG4gICAgVnVlLmNpZCA9IDA7XG4gICAgdmFyIGNpZCA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBpbmhlcml0YW5jZVxuICAgICAqL1xuICAgIFZ1ZS5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5kT3B0aW9ucykge1xuICAgICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG4gICAgICB2YXIgU3VwZXIgPSB0aGlzO1xuICAgICAgdmFyIFN1cGVySWQgPSBTdXBlci5jaWQ7XG4gICAgICB2YXIgY2FjaGVkQ3RvcnMgPSBleHRlbmRPcHRpb25zLl9DdG9yIHx8IChleHRlbmRPcHRpb25zLl9DdG9yID0ge30pO1xuICAgICAgaWYgKGNhY2hlZEN0b3JzW1N1cGVySWRdKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRDdG9yc1tTdXBlcklkXVxuICAgICAgfVxuXG4gICAgICB2YXIgbmFtZSA9IGV4dGVuZE9wdGlvbnMubmFtZSB8fCBTdXBlci5vcHRpb25zLm5hbWU7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUobmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBTdWIgPSBmdW5jdGlvbiBWdWVDb21wb25lbnQgKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAgIH07XG4gICAgICBTdWIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXBlci5wcm90b3R5cGUpO1xuICAgICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICAgIFN1Yi5jaWQgPSBjaWQrKztcbiAgICAgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgICBTdXBlci5vcHRpb25zLFxuICAgICAgICBleHRlbmRPcHRpb25zXG4gICAgICApO1xuICAgICAgU3ViWydzdXBlciddID0gU3VwZXI7XG5cbiAgICAgIC8vIEZvciBwcm9wcyBhbmQgY29tcHV0ZWQgcHJvcGVydGllcywgd2UgZGVmaW5lIHRoZSBwcm94eSBnZXR0ZXJzIG9uXG4gICAgICAvLyB0aGUgVnVlIGluc3RhbmNlcyBhdCBleHRlbnNpb24gdGltZSwgb24gdGhlIGV4dGVuZGVkIHByb3RvdHlwZS4gVGhpc1xuICAgICAgLy8gYXZvaWRzIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjYWxscyBmb3IgZWFjaCBpbnN0YW5jZSBjcmVhdGVkLlxuICAgICAgaWYgKFN1Yi5vcHRpb25zLnByb3BzKSB7XG4gICAgICAgIGluaXRQcm9wcyQxKFN1Yik7XG4gICAgICB9XG4gICAgICBpZiAoU3ViLm9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgICAgaW5pdENvbXB1dGVkJDEoU3ViKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb24vbWl4aW4vcGx1Z2luIHVzYWdlXG4gICAgICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kO1xuICAgICAgU3ViLm1peGluID0gU3VwZXIubWl4aW47XG4gICAgICBTdWIudXNlID0gU3VwZXIudXNlO1xuXG4gICAgICAvLyBjcmVhdGUgYXNzZXQgcmVnaXN0ZXJzLCBzbyBleHRlbmRlZCBjbGFzc2VzXG4gICAgICAvLyBjYW4gaGF2ZSB0aGVpciBwcml2YXRlIGFzc2V0cyB0b28uXG4gICAgICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIFN1Ylt0eXBlXSA9IFN1cGVyW3R5cGVdO1xuICAgICAgfSk7XG4gICAgICAvLyBlbmFibGUgcmVjdXJzaXZlIHNlbGYtbG9va3VwXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgICAgfVxuXG4gICAgICAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBzdXBlciBvcHRpb25zIGF0IGV4dGVuc2lvbiB0aW1lLlxuICAgICAgLy8gbGF0ZXIgYXQgaW5zdGFudGlhdGlvbiB3ZSBjYW4gY2hlY2sgaWYgU3VwZXIncyBvcHRpb25zIGhhdmVcbiAgICAgIC8vIGJlZW4gdXBkYXRlZC5cbiAgICAgIFN1Yi5zdXBlck9wdGlvbnMgPSBTdXBlci5vcHRpb25zO1xuICAgICAgU3ViLmV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zO1xuICAgICAgU3ViLnNlYWxlZE9wdGlvbnMgPSBleHRlbmQoe30sIFN1Yi5vcHRpb25zKTtcblxuICAgICAgLy8gY2FjaGUgY29uc3RydWN0b3JcbiAgICAgIGNhY2hlZEN0b3JzW1N1cGVySWRdID0gU3ViO1xuICAgICAgcmV0dXJuIFN1YlxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpbml0UHJvcHMkMSAoQ29tcCkge1xuICAgIHZhciBwcm9wcyA9IENvbXAub3B0aW9ucy5wcm9wcztcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHByb3h5KENvbXAucHJvdG90eXBlLCBcIl9wcm9wc1wiLCBrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRDb21wdXRlZCQxIChDb21wKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gQ29tcC5vcHRpb25zLmNvbXB1dGVkO1xuICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgZGVmaW5lQ29tcHV0ZWQoQ29tcC5wcm90b3R5cGUsIGtleSwgY29tcHV0ZWRba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gaW5pdEFzc2V0UmVnaXN0ZXJzIChWdWUpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYXNzZXQgcmVnaXN0cmF0aW9uIG1ldGhvZHMuXG4gICAgICovXG4gICAgQVNTRVRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgVnVlW3R5cGVdID0gZnVuY3Rpb24gKFxuICAgICAgICBpZCxcbiAgICAgICAgZGVmaW5pdGlvblxuICAgICAgKSB7XG4gICAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUNvbXBvbmVudE5hbWUoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgaXNQbGFpbk9iamVjdChkZWZpbml0aW9uKSkge1xuICAgICAgICAgICAgZGVmaW5pdGlvbi5uYW1lID0gZGVmaW5pdGlvbi5uYW1lIHx8IGlkO1xuICAgICAgICAgICAgZGVmaW5pdGlvbiA9IHRoaXMub3B0aW9ucy5fYmFzZS5leHRlbmQoZGVmaW5pdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlID09PSAnZGlyZWN0aXZlJyAmJiB0eXBlb2YgZGVmaW5pdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZGVmaW5pdGlvbiA9IHsgYmluZDogZGVmaW5pdGlvbiwgdXBkYXRlOiBkZWZpbml0aW9uIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3B0aW9uc1t0eXBlICsgJ3MnXVtpZF0gPSBkZWZpbml0aW9uO1xuICAgICAgICAgIHJldHVybiBkZWZpbml0aW9uXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKiAgKi9cblxuXG5cbiAgZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSAob3B0cykge1xuICAgIHJldHVybiBvcHRzICYmIChvcHRzLkN0b3Iub3B0aW9ucy5uYW1lIHx8IG9wdHMudGFnKVxuICB9XG5cbiAgZnVuY3Rpb24gbWF0Y2hlcyAocGF0dGVybiwgbmFtZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi5pbmRleE9mKG5hbWUpID4gLTFcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQoJywnKS5pbmRleE9mKG5hbWUpID4gLTFcbiAgICB9IGVsc2UgaWYgKGlzUmVnRXhwKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBwcnVuZUNhY2hlIChrZWVwQWxpdmVJbnN0YW5jZSwgZmlsdGVyKSB7XG4gICAgdmFyIGNhY2hlID0ga2VlcEFsaXZlSW5zdGFuY2UuY2FjaGU7XG4gICAgdmFyIGtleXMgPSBrZWVwQWxpdmVJbnN0YW5jZS5rZXlzO1xuICAgIHZhciBfdm5vZGUgPSBrZWVwQWxpdmVJbnN0YW5jZS5fdm5vZGU7XG4gICAgZm9yICh2YXIga2V5IGluIGNhY2hlKSB7XG4gICAgICB2YXIgY2FjaGVkTm9kZSA9IGNhY2hlW2tleV07XG4gICAgICBpZiAoY2FjaGVkTm9kZSkge1xuICAgICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY2FjaGVkTm9kZS5jb21wb25lbnRPcHRpb25zKTtcbiAgICAgICAgaWYgKG5hbWUgJiYgIWZpbHRlcihuYW1lKSkge1xuICAgICAgICAgIHBydW5lQ2FjaGVFbnRyeShjYWNoZSwga2V5LCBrZXlzLCBfdm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJ1bmVDYWNoZUVudHJ5IChcbiAgICBjYWNoZSxcbiAgICBrZXksXG4gICAga2V5cyxcbiAgICBjdXJyZW50XG4gICkge1xuICAgIHZhciBjYWNoZWQkJDEgPSBjYWNoZVtrZXldO1xuICAgIGlmIChjYWNoZWQkJDEgJiYgKCFjdXJyZW50IHx8IGNhY2hlZCQkMS50YWcgIT09IGN1cnJlbnQudGFnKSkge1xuICAgICAgY2FjaGVkJCQxLmNvbXBvbmVudEluc3RhbmNlLiRkZXN0cm95KCk7XG4gICAgfVxuICAgIGNhY2hlW2tleV0gPSBudWxsO1xuICAgIHJlbW92ZShrZXlzLCBrZXkpO1xuICB9XG5cbiAgdmFyIHBhdHRlcm5UeXBlcyA9IFtTdHJpbmcsIFJlZ0V4cCwgQXJyYXldO1xuXG4gIHZhciBLZWVwQWxpdmUgPSB7XG4gICAgbmFtZTogJ2tlZXAtYWxpdmUnLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuXG4gICAgcHJvcHM6IHtcbiAgICAgIGluY2x1ZGU6IHBhdHRlcm5UeXBlcyxcbiAgICAgIGV4Y2x1ZGU6IHBhdHRlcm5UeXBlcyxcbiAgICAgIG1heDogW1N0cmluZywgTnVtYmVyXVxuICAgIH0sXG5cbiAgICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkICgpIHtcbiAgICAgIHRoaXMuY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgfSxcblxuICAgIGRlc3Ryb3llZDogZnVuY3Rpb24gZGVzdHJveWVkICgpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICAgIHBydW5lQ2FjaGVFbnRyeSh0aGlzLmNhY2hlLCBrZXksIHRoaXMua2V5cyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQgKCkge1xuICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgIHRoaXMuJHdhdGNoKCdpbmNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICBwcnVuZUNhY2hlKHRoaXMkMSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIG1hdGNoZXModmFsLCBuYW1lKTsgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHdhdGNoKCdleGNsdWRlJywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICBwcnVuZUNhY2hlKHRoaXMkMSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICAgIHZhciBzbG90ID0gdGhpcy4kc2xvdHMuZGVmYXVsdDtcbiAgICAgIHZhciB2bm9kZSA9IGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoc2xvdCk7XG4gICAgICB2YXIgY29tcG9uZW50T3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgICBpZiAoY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICAvLyBjaGVjayBwYXR0ZXJuXG4gICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjb21wb25lbnRPcHRpb25zKTtcbiAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgIHZhciBpbmNsdWRlID0gcmVmLmluY2x1ZGU7XG4gICAgICAgIHZhciBleGNsdWRlID0gcmVmLmV4Y2x1ZGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAvLyBub3QgaW5jbHVkZWRcbiAgICAgICAgICAoaW5jbHVkZSAmJiAoIW5hbWUgfHwgIW1hdGNoZXMoaW5jbHVkZSwgbmFtZSkpKSB8fFxuICAgICAgICAgIC8vIGV4Y2x1ZGVkXG4gICAgICAgICAgKGV4Y2x1ZGUgJiYgbmFtZSAmJiBtYXRjaGVzKGV4Y2x1ZGUsIG5hbWUpKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdm5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWYkMSA9IHRoaXM7XG4gICAgICAgIHZhciBjYWNoZSA9IHJlZiQxLmNhY2hlO1xuICAgICAgICB2YXIga2V5cyA9IHJlZiQxLmtleXM7XG4gICAgICAgIHZhciBrZXkgPSB2bm9kZS5rZXkgPT0gbnVsbFxuICAgICAgICAgIC8vIHNhbWUgY29uc3RydWN0b3IgbWF5IGdldCByZWdpc3RlcmVkIGFzIGRpZmZlcmVudCBsb2NhbCBjb21wb25lbnRzXG4gICAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxuICAgICAgICAgID8gY29tcG9uZW50T3B0aW9ucy5DdG9yLmNpZCArIChjb21wb25lbnRPcHRpb25zLnRhZyA/IChcIjo6XCIgKyAoY29tcG9uZW50T3B0aW9ucy50YWcpKSA6ICcnKVxuICAgICAgICAgIDogdm5vZGUua2V5O1xuICAgICAgICBpZiAoY2FjaGVba2V5XSkge1xuICAgICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gY2FjaGVba2V5XS5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAvLyBtYWtlIGN1cnJlbnQga2V5IGZyZXNoZXN0XG4gICAgICAgICAgcmVtb3ZlKGtleXMsIGtleSk7XG4gICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FjaGVba2V5XSA9IHZub2RlO1xuICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgIC8vIHBydW5lIG9sZGVzdCBlbnRyeVxuICAgICAgICAgIGlmICh0aGlzLm1heCAmJiBrZXlzLmxlbmd0aCA+IHBhcnNlSW50KHRoaXMubWF4KSkge1xuICAgICAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGNhY2hlLCBrZXlzWzBdLCBrZXlzLCB0aGlzLl92bm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdm5vZGUuZGF0YS5rZWVwQWxpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZub2RlIHx8IChzbG90ICYmIHNsb3RbMF0pXG4gICAgfVxuICB9O1xuXG4gIHZhciBidWlsdEluQ29tcG9uZW50cyA9IHtcbiAgICBLZWVwQWxpdmU6IEtlZXBBbGl2ZVxuICB9O1xuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGluaXRHbG9iYWxBUEkgKFZ1ZSkge1xuICAgIC8vIGNvbmZpZ1xuICAgIHZhciBjb25maWdEZWYgPSB7fTtcbiAgICBjb25maWdEZWYuZ2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZmlnOyB9O1xuICAgIHtcbiAgICAgIGNvbmZpZ0RlZi5zZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ0RvIG5vdCByZXBsYWNlIHRoZSBWdWUuY29uZmlnIG9iamVjdCwgc2V0IGluZGl2aWR1YWwgZmllbGRzIGluc3RlYWQuJ1xuICAgICAgICApO1xuICAgICAgfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZSwgJ2NvbmZpZycsIGNvbmZpZ0RlZik7XG5cbiAgICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgICAvLyBOT1RFOiB0aGVzZSBhcmUgbm90IGNvbnNpZGVyZWQgcGFydCBvZiB0aGUgcHVibGljIEFQSSAtIGF2b2lkIHJlbHlpbmcgb25cbiAgICAvLyB0aGVtIHVubGVzcyB5b3UgYXJlIGF3YXJlIG9mIHRoZSByaXNrLlxuICAgIFZ1ZS51dGlsID0ge1xuICAgICAgd2Fybjogd2FybixcbiAgICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgICBkZWZpbmVSZWFjdGl2ZTogZGVmaW5lUmVhY3RpdmUkJDFcbiAgICB9O1xuXG4gICAgVnVlLnNldCA9IHNldDtcbiAgICBWdWUuZGVsZXRlID0gZGVsO1xuICAgIFZ1ZS5uZXh0VGljayA9IG5leHRUaWNrO1xuXG4gICAgLy8gMi42IGV4cGxpY2l0IG9ic2VydmFibGUgQVBJXG4gICAgVnVlLm9ic2VydmFibGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBvYnNlcnZlKG9iaik7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfTtcblxuICAgIFZ1ZS5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBBU1NFVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBWdWUub3B0aW9uc1t0eXBlICsgJ3MnXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGlzIGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIFwiYmFzZVwiIGNvbnN0cnVjdG9yIHRvIGV4dGVuZCBhbGwgcGxhaW4tb2JqZWN0XG4gICAgLy8gY29tcG9uZW50cyB3aXRoIGluIFdlZXgncyBtdWx0aS1pbnN0YW5jZSBzY2VuYXJpb3MuXG4gICAgVnVlLm9wdGlvbnMuX2Jhc2UgPSBWdWU7XG5cbiAgICBleHRlbmQoVnVlLm9wdGlvbnMuY29tcG9uZW50cywgYnVpbHRJbkNvbXBvbmVudHMpO1xuXG4gICAgaW5pdFVzZShWdWUpO1xuICAgIGluaXRNaXhpbiQxKFZ1ZSk7XG4gICAgaW5pdEV4dGVuZChWdWUpO1xuICAgIGluaXRBc3NldFJlZ2lzdGVycyhWdWUpO1xuICB9XG5cbiAgaW5pdEdsb2JhbEFQSShWdWUpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJGlzU2VydmVyJywge1xuICAgIGdldDogaXNTZXJ2ZXJSZW5kZXJpbmdcbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckc3NyQ29udGV4dCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCAoKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgcmV0dXJuIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHRcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGV4cG9zZSBGdW5jdGlvbmFsUmVuZGVyQ29udGV4dCBmb3Igc3NyIHJ1bnRpbWUgaGVscGVyIGluc3RhbGxhdGlvblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnRnVuY3Rpb25hbFJlbmRlckNvbnRleHQnLCB7XG4gICAgdmFsdWU6IEZ1bmN0aW9uYWxSZW5kZXJDb250ZXh0XG4gIH0pO1xuXG4gIFZ1ZS52ZXJzaW9uID0gJzIuNi4xMic7XG5cbiAgLyogICovXG5cbiAgLy8gdGhlc2UgYXJlIHJlc2VydmVkIGZvciB3ZWIgYmVjYXVzZSB0aGV5IGFyZSBkaXJlY3RseSBjb21waWxlZCBhd2F5XG4gIC8vIGR1cmluZyB0ZW1wbGF0ZSBjb21waWxhdGlvblxuICB2YXIgaXNSZXNlcnZlZEF0dHIgPSBtYWtlTWFwKCdzdHlsZSxjbGFzcycpO1xuXG4gIC8vIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgdXNpbmcgcHJvcHMgZm9yIGJpbmRpbmdcbiAgdmFyIGFjY2VwdFZhbHVlID0gbWFrZU1hcCgnaW5wdXQsdGV4dGFyZWEsb3B0aW9uLHNlbGVjdCxwcm9ncmVzcycpO1xuICB2YXIgbXVzdFVzZVByb3AgPSBmdW5jdGlvbiAodGFnLCB0eXBlLCBhdHRyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChhdHRyID09PSAndmFsdWUnICYmIGFjY2VwdFZhbHVlKHRhZykpICYmIHR5cGUgIT09ICdidXR0b24nIHx8XG4gICAgICAoYXR0ciA9PT0gJ3NlbGVjdGVkJyAmJiB0YWcgPT09ICdvcHRpb24nKSB8fFxuICAgICAgKGF0dHIgPT09ICdjaGVja2VkJyAmJiB0YWcgPT09ICdpbnB1dCcpIHx8XG4gICAgICAoYXR0ciA9PT0gJ211dGVkJyAmJiB0YWcgPT09ICd2aWRlbycpXG4gICAgKVxuICB9O1xuXG4gIHZhciBpc0VudW1lcmF0ZWRBdHRyID0gbWFrZU1hcCgnY29udGVudGVkaXRhYmxlLGRyYWdnYWJsZSxzcGVsbGNoZWNrJyk7XG5cbiAgdmFyIGlzVmFsaWRDb250ZW50RWRpdGFibGVWYWx1ZSA9IG1ha2VNYXAoJ2V2ZW50cyxjYXJldCx0eXBpbmcscGxhaW50ZXh0LW9ubHknKTtcblxuICB2YXIgY29udmVydEVudW1lcmF0ZWRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpIHx8IHZhbHVlID09PSAnZmFsc2UnXG4gICAgICA/ICdmYWxzZSdcbiAgICAgIC8vIGFsbG93IGFyYml0cmFyeSBzdHJpbmcgdmFsdWUgZm9yIGNvbnRlbnRlZGl0YWJsZVxuICAgICAgOiBrZXkgPT09ICdjb250ZW50ZWRpdGFibGUnICYmIGlzVmFsaWRDb250ZW50RWRpdGFibGVWYWx1ZSh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6ICd0cnVlJ1xuICB9O1xuXG4gIHZhciBpc0Jvb2xlYW5BdHRyID0gbWFrZU1hcChcbiAgICAnYWxsb3dmdWxsc2NyZWVuLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjaGVja2VkLGNvbXBhY3QsY29udHJvbHMsZGVjbGFyZSwnICtcbiAgICAnZGVmYXVsdCxkZWZhdWx0Y2hlY2tlZCxkZWZhdWx0bXV0ZWQsZGVmYXVsdHNlbGVjdGVkLGRlZmVyLGRpc2FibGVkLCcgK1xuICAgICdlbmFibGVkLGZvcm1ub3ZhbGlkYXRlLGhpZGRlbixpbmRldGVybWluYXRlLGluZXJ0LGlzbWFwLGl0ZW1zY29wZSxsb29wLG11bHRpcGxlLCcgK1xuICAgICdtdXRlZCxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3ZhbGlkYXRlLG5vd3JhcCxvcGVuLHBhdXNlb25leGl0LHJlYWRvbmx5LCcgK1xuICAgICdyZXF1aXJlZCxyZXZlcnNlZCxzY29wZWQsc2VhbWxlc3Msc2VsZWN0ZWQsc29ydGFibGUsdHJhbnNsYXRlLCcgK1xuICAgICd0cnVlc3BlZWQsdHlwZW11c3RtYXRjaCx2aXNpYmxlJ1xuICApO1xuXG4gIHZhciB4bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xuXG4gIHZhciBpc1hsaW5rID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5jaGFyQXQoNSkgPT09ICc6JyAmJiBuYW1lLnNsaWNlKDAsIDUpID09PSAneGxpbmsnXG4gIH07XG5cbiAgdmFyIGdldFhsaW5rUHJvcCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIGlzWGxpbmsobmFtZSkgPyBuYW1lLnNsaWNlKDYsIG5hbWUubGVuZ3RoKSA6ICcnXG4gIH07XG5cbiAgdmFyIGlzRmFsc3lBdHRyVmFsdWUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gZmFsc2VcbiAgfTtcblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBnZW5DbGFzc0ZvclZub2RlICh2bm9kZSkge1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IHZub2RlO1xuICAgIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgICB3aGlsZSAoaXNEZWYoY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgY2hpbGROb2RlID0gY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICAgIGlmIChjaGlsZE5vZGUgJiYgY2hpbGROb2RlLmRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG1lcmdlQ2xhc3NEYXRhKGNoaWxkTm9kZS5kYXRhLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKGlzRGVmKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudCkpIHtcbiAgICAgIGlmIChwYXJlbnROb2RlICYmIHBhcmVudE5vZGUuZGF0YSkge1xuICAgICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoZGF0YSwgcGFyZW50Tm9kZS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlckNsYXNzKGRhdGEuc3RhdGljQ2xhc3MsIGRhdGEuY2xhc3MpXG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZUNsYXNzRGF0YSAoY2hpbGQsIHBhcmVudCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0aWNDbGFzczogY29uY2F0KGNoaWxkLnN0YXRpY0NsYXNzLCBwYXJlbnQuc3RhdGljQ2xhc3MpLFxuICAgICAgY2xhc3M6IGlzRGVmKGNoaWxkLmNsYXNzKVxuICAgICAgICA/IFtjaGlsZC5jbGFzcywgcGFyZW50LmNsYXNzXVxuICAgICAgICA6IHBhcmVudC5jbGFzc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckNsYXNzIChcbiAgICBzdGF0aWNDbGFzcyxcbiAgICBkeW5hbWljQ2xhc3NcbiAgKSB7XG4gICAgaWYgKGlzRGVmKHN0YXRpY0NsYXNzKSB8fCBpc0RlZihkeW5hbWljQ2xhc3MpKSB7XG4gICAgICByZXR1cm4gY29uY2F0KHN0YXRpY0NsYXNzLCBzdHJpbmdpZnlDbGFzcyhkeW5hbWljQ2xhc3MpKVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gY29uY2F0IChhLCBiKSB7XG4gICAgcmV0dXJuIGEgPyBiID8gKGEgKyAnICcgKyBiKSA6IGEgOiAoYiB8fCAnJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeUNsYXNzICh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeUFycmF5KHZhbHVlKVxuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5T2JqZWN0KHZhbHVlKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlBcnJheSAodmFsdWUpIHtcbiAgICB2YXIgcmVzID0gJyc7XG4gICAgdmFyIHN0cmluZ2lmaWVkO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaXNEZWYoc3RyaW5naWZpZWQgPSBzdHJpbmdpZnlDbGFzcyh2YWx1ZVtpXSkpICYmIHN0cmluZ2lmaWVkICE9PSAnJykge1xuICAgICAgICBpZiAocmVzKSB7IHJlcyArPSAnICc7IH1cbiAgICAgICAgcmVzICs9IHN0cmluZ2lmaWVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlPYmplY3QgKHZhbHVlKSB7XG4gICAgdmFyIHJlcyA9ICcnO1xuICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgaWYgKHJlcykgeyByZXMgKz0gJyAnOyB9XG4gICAgICAgIHJlcyArPSBrZXk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qICAqL1xuXG4gIHZhciBuYW1lc3BhY2VNYXAgPSB7XG4gICAgc3ZnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgIG1hdGg6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJ1xuICB9O1xuXG4gIHZhciBpc0hUTUxUYWcgPSBtYWtlTWFwKFxuICAgICdodG1sLGJvZHksYmFzZSxoZWFkLGxpbmssbWV0YSxzdHlsZSx0aXRsZSwnICtcbiAgICAnYWRkcmVzcyxhcnRpY2xlLGFzaWRlLGZvb3RlcixoZWFkZXIsaDEsaDIsaDMsaDQsaDUsaDYsaGdyb3VwLG5hdixzZWN0aW9uLCcgK1xuICAgICdkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUscGljdHVyZSxocixpbWcsbGksbWFpbixvbCxwLHByZSx1bCwnICtcbiAgICAnYSxiLGFiYnIsYmRpLGJkbyxicixjaXRlLGNvZGUsZGF0YSxkZm4sZW0saSxrYmQsbWFyayxxLHJwLHJ0LHJ0YyxydWJ5LCcgK1xuICAgICdzLHNhbXAsc21hbGwsc3BhbixzdHJvbmcsc3ViLHN1cCx0aW1lLHUsdmFyLHdicixhcmVhLGF1ZGlvLG1hcCx0cmFjayx2aWRlbywnICtcbiAgICAnZW1iZWQsb2JqZWN0LHBhcmFtLHNvdXJjZSxjYW52YXMsc2NyaXB0LG5vc2NyaXB0LGRlbCxpbnMsJyArXG4gICAgJ2NhcHRpb24sY29sLGNvbGdyb3VwLHRhYmxlLHRoZWFkLHRib2R5LHRkLHRoLHRyLCcgK1xuICAgICdidXR0b24sZGF0YWxpc3QsZmllbGRzZXQsZm9ybSxpbnB1dCxsYWJlbCxsZWdlbmQsbWV0ZXIsb3B0Z3JvdXAsb3B0aW9uLCcgK1xuICAgICdvdXRwdXQscHJvZ3Jlc3Msc2VsZWN0LHRleHRhcmVhLCcgK1xuICAgICdkZXRhaWxzLGRpYWxvZyxtZW51LG1lbnVpdGVtLHN1bW1hcnksJyArXG4gICAgJ2NvbnRlbnQsZWxlbWVudCxzaGFkb3csdGVtcGxhdGUsYmxvY2txdW90ZSxpZnJhbWUsdGZvb3QnXG4gICk7XG5cbiAgLy8gdGhpcyBtYXAgaXMgaW50ZW50aW9uYWxseSBzZWxlY3RpdmUsIG9ubHkgY292ZXJpbmcgU1ZHIGVsZW1lbnRzIHRoYXQgbWF5XG4gIC8vIGNvbnRhaW4gY2hpbGQgZWxlbWVudHMuXG4gIHZhciBpc1NWRyA9IG1ha2VNYXAoXG4gICAgJ3N2ZyxhbmltYXRlLGNpcmNsZSxjbGlwcGF0aCxjdXJzb3IsZGVmcyxkZXNjLGVsbGlwc2UsZmlsdGVyLGZvbnQtZmFjZSwnICtcbiAgICAnZm9yZWlnbk9iamVjdCxnLGdseXBoLGltYWdlLGxpbmUsbWFya2VyLG1hc2ssbWlzc2luZy1nbHlwaCxwYXRoLHBhdHRlcm4sJyArXG4gICAgJ3BvbHlnb24scG9seWxpbmUscmVjdCxzd2l0Y2gsc3ltYm9sLHRleHQsdGV4dHBhdGgsdHNwYW4sdXNlLHZpZXcnLFxuICAgIHRydWVcbiAgKTtcblxuICB2YXIgaXNQcmVUYWcgPSBmdW5jdGlvbiAodGFnKSB7IHJldHVybiB0YWcgPT09ICdwcmUnOyB9O1xuXG4gIHZhciBpc1Jlc2VydmVkVGFnID0gZnVuY3Rpb24gKHRhZykge1xuICAgIHJldHVybiBpc0hUTUxUYWcodGFnKSB8fCBpc1NWRyh0YWcpXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0VGFnTmFtZXNwYWNlICh0YWcpIHtcbiAgICBpZiAoaXNTVkcodGFnKSkge1xuICAgICAgcmV0dXJuICdzdmcnXG4gICAgfVxuICAgIC8vIGJhc2ljIHN1cHBvcnQgZm9yIE1hdGhNTFxuICAgIC8vIG5vdGUgaXQgZG9lc24ndCBzdXBwb3J0IG90aGVyIE1hdGhNTCBlbGVtZW50cyBiZWluZyBjb21wb25lbnQgcm9vdHNcbiAgICBpZiAodGFnID09PSAnbWF0aCcpIHtcbiAgICAgIHJldHVybiAnbWF0aCdcbiAgICB9XG4gIH1cblxuICB2YXIgdW5rbm93bkVsZW1lbnRDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQgKHRhZykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghaW5Ccm93c2VyKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAoaXNSZXNlcnZlZFRhZyh0YWcpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgdGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5rbm93bkVsZW1lbnRDYWNoZVt0YWddXG4gICAgfVxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBpZiAodGFnLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODIxMDM2NC8xMDcwMjQ0XG4gICAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IChcbiAgICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MVW5rbm93bkVsZW1lbnQgfHxcbiAgICAgICAgZWwuY29uc3RydWN0b3IgPT09IHdpbmRvdy5IVE1MRWxlbWVudFxuICAgICAgKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh1bmtub3duRWxlbWVudENhY2hlW3RhZ10gPSAvSFRNTFVua25vd25FbGVtZW50Ly50ZXN0KGVsLnRvU3RyaW5nKCkpKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpc1RleHRJbnB1dFR5cGUgPSBtYWtlTWFwKCd0ZXh0LG51bWJlcixwYXNzd29yZCxzZWFyY2gsZW1haWwsdGVsLHVybCcpO1xuXG4gIC8qICAqL1xuXG4gIC8qKlxuICAgKiBRdWVyeSBhbiBlbGVtZW50IHNlbGVjdG9yIGlmIGl0J3Mgbm90IGFuIGVsZW1lbnQgYWxyZWFkeS5cbiAgICovXG4gIGZ1bmN0aW9uIHF1ZXJ5IChlbCkge1xuICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnQ2Fubm90IGZpbmQgZWxlbWVudDogJyArIGVsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbFxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQkMSAodGFnTmFtZSwgdm5vZGUpIHtcbiAgICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICBpZiAodGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybiBlbG1cbiAgICB9XG4gICAgLy8gZmFsc2Ugb3IgbnVsbCB3aWxsIHJlbW92ZSB0aGUgYXR0cmlidXRlIGJ1dCB1bmRlZmluZWQgd2lsbCBub3RcbiAgICBpZiAodm5vZGUuZGF0YSAmJiB2bm9kZS5kYXRhLmF0dHJzICYmIHZub2RlLmRhdGEuYXR0cnMubXVsdGlwbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsbVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TIChuYW1lc3BhY2UsIHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZU1hcFtuYW1lc3BhY2VdLCB0YWdOYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQgKHRleHQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0ZXh0KVxuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlIChwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZCAobm9kZSwgY2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZENoaWxkIChub2RlLCBjaGlsZCkge1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyZW50Tm9kZSAobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRTaWJsaW5nIChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmdcbiAgfVxuXG4gIGZ1bmN0aW9uIHRhZ05hbWUgKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50YWdOYW1lXG4gIH1cblxuICBmdW5jdGlvbiBzZXRUZXh0Q29udGVudCAobm9kZSwgdGV4dCkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0U3R5bGVTY29wZSAobm9kZSwgc2NvcGVJZCkge1xuICAgIG5vZGUuc2V0QXR0cmlidXRlKHNjb3BlSWQsICcnKTtcbiAgfVxuXG4gIHZhciBub2RlT3BzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQkMSxcbiAgICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgICBjcmVhdGVUZXh0Tm9kZTogY3JlYXRlVGV4dE5vZGUsXG4gICAgY3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcbiAgICBpbnNlcnRCZWZvcmU6IGluc2VydEJlZm9yZSxcbiAgICByZW1vdmVDaGlsZDogcmVtb3ZlQ2hpbGQsXG4gICAgYXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgbmV4dFNpYmxpbmc6IG5leHRTaWJsaW5nLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50LFxuICAgIHNldFN0eWxlU2NvcGU6IHNldFN0eWxlU2NvcGVcbiAgfSk7XG5cbiAgLyogICovXG5cbiAgdmFyIHJlZiA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSAoXywgdm5vZGUpIHtcbiAgICAgIHJlZ2lzdGVyUmVmKHZub2RlKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgIGlmIChvbGRWbm9kZS5kYXRhLnJlZiAhPT0gdm5vZGUuZGF0YS5yZWYpIHtcbiAgICAgICAgcmVnaXN0ZXJSZWYob2xkVm5vZGUsIHRydWUpO1xuICAgICAgICByZWdpc3RlclJlZih2bm9kZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95ICh2bm9kZSkge1xuICAgICAgcmVnaXN0ZXJSZWYodm5vZGUsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZWdpc3RlclJlZiAodm5vZGUsIGlzUmVtb3ZhbCkge1xuICAgIHZhciBrZXkgPSB2bm9kZS5kYXRhLnJlZjtcbiAgICBpZiAoIWlzRGVmKGtleSkpIHsgcmV0dXJuIH1cblxuICAgIHZhciB2bSA9IHZub2RlLmNvbnRleHQ7XG4gICAgdmFyIHJlZiA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlIHx8IHZub2RlLmVsbTtcbiAgICB2YXIgcmVmcyA9IHZtLiRyZWZzO1xuICAgIGlmIChpc1JlbW92YWwpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlZnNba2V5XSkpIHtcbiAgICAgICAgcmVtb3ZlKHJlZnNba2V5XSwgcmVmKTtcbiAgICAgIH0gZWxzZSBpZiAocmVmc1trZXldID09PSByZWYpIHtcbiAgICAgICAgcmVmc1trZXldID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodm5vZGUuZGF0YS5yZWZJbkZvcikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVmc1trZXldKSkge1xuICAgICAgICAgIHJlZnNba2V5XSA9IFtyZWZdO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZnNba2V5XS5pbmRleE9mKHJlZikgPCAwKSB7XG4gICAgICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICAgICAgcmVmc1trZXldLnB1c2gocmVmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmc1trZXldID0gcmVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWaXJ0dWFsIERPTSBwYXRjaGluZyBhbGdvcml0aG0gYmFzZWQgb24gU25hYmJkb20gYnlcbiAgICogU2ltb24gRnJpaXMgVmluZHVtIChAcGFsZGVwaW5kKVxuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3BhbGRlcGluZC9zbmFiYmRvbS9ibG9iL21hc3Rlci9MSUNFTlNFXG4gICAqXG4gICAqIG1vZGlmaWVkIGJ5IEV2YW4gWW91IChAeXl4OTkwODAzKVxuICAgKlxuICAgKiBOb3QgdHlwZS1jaGVja2luZyB0aGlzIGJlY2F1c2UgdGhpcyBmaWxlIGlzIHBlcmYtY3JpdGljYWwgYW5kIHRoZSBjb3N0XG4gICAqIG9mIG1ha2luZyBmbG93IHVuZGVyc3RhbmQgaXQgaXMgbm90IHdvcnRoIGl0LlxuICAgKi9cblxuICB2YXIgZW1wdHlOb2RlID0gbmV3IFZOb2RlKCcnLCB7fSwgW10pO1xuXG4gIHZhciBob29rcyA9IFsnY3JlYXRlJywgJ2FjdGl2YXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveSddO1xuXG4gIGZ1bmN0aW9uIHNhbWVWbm9kZSAoYSwgYikge1xuICAgIHJldHVybiAoXG4gICAgICBhLmtleSA9PT0gYi5rZXkgJiYgKFxuICAgICAgICAoXG4gICAgICAgICAgYS50YWcgPT09IGIudGFnICYmXG4gICAgICAgICAgYS5pc0NvbW1lbnQgPT09IGIuaXNDb21tZW50ICYmXG4gICAgICAgICAgaXNEZWYoYS5kYXRhKSA9PT0gaXNEZWYoYi5kYXRhKSAmJlxuICAgICAgICAgIHNhbWVJbnB1dFR5cGUoYSwgYilcbiAgICAgICAgKSB8fCAoXG4gICAgICAgICAgaXNUcnVlKGEuaXNBc3luY1BsYWNlaG9sZGVyKSAmJlxuICAgICAgICAgIGEuYXN5bmNGYWN0b3J5ID09PSBiLmFzeW5jRmFjdG9yeSAmJlxuICAgICAgICAgIGlzVW5kZWYoYi5hc3luY0ZhY3RvcnkuZXJyb3IpXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBzYW1lSW5wdXRUeXBlIChhLCBiKSB7XG4gICAgaWYgKGEudGFnICE9PSAnaW5wdXQnKSB7IHJldHVybiB0cnVlIH1cbiAgICB2YXIgaTtcbiAgICB2YXIgdHlwZUEgPSBpc0RlZihpID0gYS5kYXRhKSAmJiBpc0RlZihpID0gaS5hdHRycykgJiYgaS50eXBlO1xuICAgIHZhciB0eXBlQiA9IGlzRGVmKGkgPSBiLmRhdGEpICYmIGlzRGVmKGkgPSBpLmF0dHJzKSAmJiBpLnR5cGU7XG4gICAgcmV0dXJuIHR5cGVBID09PSB0eXBlQiB8fCBpc1RleHRJbnB1dFR5cGUodHlwZUEpICYmIGlzVGV4dElucHV0VHlwZSh0eXBlQilcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4IChjaGlsZHJlbiwgYmVnaW5JZHgsIGVuZElkeCkge1xuICAgIHZhciBpLCBrZXk7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIGZvciAoaSA9IGJlZ2luSWR4OyBpIDw9IGVuZElkeDsgKytpKSB7XG4gICAgICBrZXkgPSBjaGlsZHJlbltpXS5rZXk7XG4gICAgICBpZiAoaXNEZWYoa2V5KSkgeyBtYXBba2V5XSA9IGk7IH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcFxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0Y2hGdW5jdGlvbiAoYmFja2VuZCkge1xuICAgIHZhciBpLCBqO1xuICAgIHZhciBjYnMgPSB7fTtcblxuICAgIHZhciBtb2R1bGVzID0gYmFja2VuZC5tb2R1bGVzO1xuICAgIHZhciBub2RlT3BzID0gYmFja2VuZC5ub2RlT3BzO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjYnNbaG9va3NbaV1dID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgICBpZiAoaXNEZWYobW9kdWxlc1tqXVtob29rc1tpXV0pKSB7XG4gICAgICAgICAgY2JzW2hvb2tzW2ldXS5wdXNoKG1vZHVsZXNbal1baG9va3NbaV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0IChlbG0pIHtcbiAgICAgIHJldHVybiBuZXcgVk5vZGUobm9kZU9wcy50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSwge30sIFtdLCB1bmRlZmluZWQsIGVsbSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSbUNiIChjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgICBmdW5jdGlvbiByZW1vdmUkJDEgKCkge1xuICAgICAgICBpZiAoLS1yZW1vdmUkJDEubGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgICAgcmVtb3ZlTm9kZShjaGlsZEVsbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlbW92ZSQkMS5saXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XG4gICAgICByZXR1cm4gcmVtb3ZlJCQxXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZSAoZWwpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBub2RlT3BzLnBhcmVudE5vZGUoZWwpO1xuICAgICAgLy8gZWxlbWVudCBtYXkgaGF2ZSBhbHJlYWR5IGJlZW4gcmVtb3ZlZCBkdWUgdG8gdi1odG1sIC8gdi10ZXh0XG4gICAgICBpZiAoaXNEZWYocGFyZW50KSkge1xuICAgICAgICBub2RlT3BzLnJlbW92ZUNoaWxkKHBhcmVudCwgZWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5rbm93bkVsZW1lbnQkJDEgKHZub2RlLCBpblZQcmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICFpblZQcmUgJiZcbiAgICAgICAgIXZub2RlLm5zICYmXG4gICAgICAgICEoXG4gICAgICAgICAgY29uZmlnLmlnbm9yZWRFbGVtZW50cy5sZW5ndGggJiZcbiAgICAgICAgICBjb25maWcuaWdub3JlZEVsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGlnbm9yZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzUmVnRXhwKGlnbm9yZSlcbiAgICAgICAgICAgICAgPyBpZ25vcmUudGVzdCh2bm9kZS50YWcpXG4gICAgICAgICAgICAgIDogaWdub3JlID09PSB2bm9kZS50YWdcbiAgICAgICAgICB9KVxuICAgICAgICApICYmXG4gICAgICAgIGNvbmZpZy5pc1Vua25vd25FbGVtZW50KHZub2RlLnRhZylcbiAgICAgIClcbiAgICB9XG5cbiAgICB2YXIgY3JlYXRpbmdFbG1JblZQcmUgPSAwO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxtIChcbiAgICAgIHZub2RlLFxuICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLFxuICAgICAgcGFyZW50RWxtLFxuICAgICAgcmVmRWxtLFxuICAgICAgbmVzdGVkLFxuICAgICAgb3duZXJBcnJheSxcbiAgICAgIGluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoaXNEZWYodm5vZGUuZWxtKSAmJiBpc0RlZihvd25lckFycmF5KSkge1xuICAgICAgICAvLyBUaGlzIHZub2RlIHdhcyB1c2VkIGluIGEgcHJldmlvdXMgcmVuZGVyIVxuICAgICAgICAvLyBub3cgaXQncyB1c2VkIGFzIGEgbmV3IG5vZGUsIG92ZXJ3cml0aW5nIGl0cyBlbG0gd291bGQgY2F1c2VcbiAgICAgICAgLy8gcG90ZW50aWFsIHBhdGNoIGVycm9ycyBkb3duIHRoZSByb2FkIHdoZW4gaXQncyB1c2VkIGFzIGFuIGluc2VydGlvblxuICAgICAgICAvLyByZWZlcmVuY2Ugbm9kZS4gSW5zdGVhZCwgd2UgY2xvbmUgdGhlIG5vZGUgb24tZGVtYW5kIGJlZm9yZSBjcmVhdGluZ1xuICAgICAgICAvLyBhc3NvY2lhdGVkIERPTSBlbGVtZW50IGZvciBpdC5cbiAgICAgICAgdm5vZGUgPSBvd25lckFycmF5W2luZGV4XSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICAgICAgfVxuXG4gICAgICB2bm9kZS5pc1Jvb3RJbnNlcnQgPSAhbmVzdGVkOyAvLyBmb3IgdHJhbnNpdGlvbiBlbnRlciBjaGVja1xuICAgICAgaWYgKGNyZWF0ZUNvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgdmFyIHRhZyA9IHZub2RlLnRhZztcbiAgICAgIGlmIChpc0RlZih0YWcpKSB7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICAgICAgY3JlYXRpbmdFbG1JblZQcmUrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzVW5rbm93bkVsZW1lbnQkJDEodm5vZGUsIGNyZWF0aW5nRWxtSW5WUHJlKSkge1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgJ1Vua25vd24gY3VzdG9tIGVsZW1lbnQ6IDwnICsgdGFnICsgJz4gLSBkaWQgeW91ICcgK1xuICAgICAgICAgICAgICAncmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjb3JyZWN0bHk/IEZvciByZWN1cnNpdmUgY29tcG9uZW50cywgJyArXG4gICAgICAgICAgICAgICdtYWtlIHN1cmUgdG8gcHJvdmlkZSB0aGUgXCJuYW1lXCIgb3B0aW9uLicsXG4gICAgICAgICAgICAgIHZub2RlLmNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdm5vZGUuZWxtID0gdm5vZGUubnNcbiAgICAgICAgICA/IG5vZGVPcHMuY3JlYXRlRWxlbWVudE5TKHZub2RlLm5zLCB0YWcpXG4gICAgICAgICAgOiBub2RlT3BzLmNyZWF0ZUVsZW1lbnQodGFnLCB2bm9kZSk7XG4gICAgICAgIHNldFNjb3BlKHZub2RlKTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICAgIGNyZWF0aW5nRWxtSW5WUHJlLS07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNUcnVlKHZub2RlLmlzQ29tbWVudCkpIHtcbiAgICAgICAgdm5vZGUuZWxtID0gbm9kZU9wcy5jcmVhdGVDb21tZW50KHZub2RlLnRleHQpO1xuICAgICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgICAgdmFyIGkgPSB2bm9kZS5kYXRhO1xuICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgIHZhciBpc1JlYWN0aXZhdGVkID0gaXNEZWYodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpICYmIGkua2VlcEFsaXZlO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IGkuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIHtcbiAgICAgICAgICBpKHZub2RlLCBmYWxzZSAvKiBoeWRyYXRpbmcgKi8pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFmdGVyIGNhbGxpbmcgdGhlIGluaXQgaG9vaywgaWYgdGhlIHZub2RlIGlzIGEgY2hpbGQgY29tcG9uZW50XG4gICAgICAgIC8vIGl0IHNob3VsZCd2ZSBjcmVhdGVkIGEgY2hpbGQgaW5zdGFuY2UgYW5kIG1vdW50ZWQgaXQuIHRoZSBjaGlsZFxuICAgICAgICAvLyBjb21wb25lbnQgYWxzbyBoYXMgc2V0IHRoZSBwbGFjZWhvbGRlciB2bm9kZSdzIGVsbS5cbiAgICAgICAgLy8gaW4gdGhhdCBjYXNlIHdlIGNhbiBqdXN0IHJldHVybiB0aGUgZWxlbWVudCBhbmQgYmUgZG9uZS5cbiAgICAgICAgaWYgKGlzRGVmKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICAgIGluaXRDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICAgICAgICAgIGlmIChpc1RydWUoaXNSZWFjdGl2YXRlZCkpIHtcbiAgICAgICAgICAgIHJlYWN0aXZhdGVDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgICAgaWYgKGlzRGVmKHZub2RlLmRhdGEucGVuZGluZ0luc2VydCkpIHtcbiAgICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2guYXBwbHkoaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQpO1xuICAgICAgICB2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQgPSBudWxsO1xuICAgICAgfVxuICAgICAgdm5vZGUuZWxtID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuJGVsO1xuICAgICAgaWYgKGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgICBpbnZva2VDcmVhdGVIb29rcyh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgc2V0U2NvcGUodm5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZW1wdHkgY29tcG9uZW50IHJvb3QuXG4gICAgICAgIC8vIHNraXAgYWxsIGVsZW1lbnQtcmVsYXRlZCBtb2R1bGVzIGV4Y2VwdCBmb3IgcmVmICgjMzQ1NSlcbiAgICAgICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdG8gaW52b2tlIHRoZSBpbnNlcnQgaG9va1xuICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhY3RpdmF0ZUNvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pIHtcbiAgICAgIHZhciBpO1xuICAgICAgLy8gaGFjayBmb3IgIzQzMzk6IGEgcmVhY3RpdmF0ZWQgY29tcG9uZW50IHdpdGggaW5uZXIgdHJhbnNpdGlvblxuICAgICAgLy8gZG9lcyBub3QgdHJpZ2dlciBiZWNhdXNlIHRoZSBpbm5lciBub2RlJ3MgY3JlYXRlZCBob29rcyBhcmUgbm90IGNhbGxlZFxuICAgICAgLy8gYWdhaW4uIEl0J3Mgbm90IGlkZWFsIHRvIGludm9sdmUgbW9kdWxlLXNwZWNpZmljIGxvZ2ljIGluIGhlcmUgYnV0XG4gICAgICAvLyB0aGVyZSBkb2Vzbid0IHNlZW0gdG8gYmUgYSBiZXR0ZXIgd2F5IHRvIGRvIGl0LlxuICAgICAgdmFyIGlubmVyTm9kZSA9IHZub2RlO1xuICAgICAgd2hpbGUgKGlubmVyTm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICBpbm5lck5vZGUgPSBpbm5lck5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgICAgICBpZiAoaXNEZWYoaSA9IGlubmVyTm9kZS5kYXRhKSAmJiBpc0RlZihpID0gaS50cmFuc2l0aW9uKSkge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuYWN0aXZhdGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNicy5hY3RpdmF0ZVtpXShlbXB0eU5vZGUsIGlubmVyTm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKGlubmVyTm9kZSk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gdW5saWtlIGEgbmV3bHkgY3JlYXRlZCBjb21wb25lbnQsXG4gICAgICAvLyBhIHJlYWN0aXZhdGVkIGtlZXAtYWxpdmUgY29tcG9uZW50IGRvZXNuJ3QgaW5zZXJ0IGl0c2VsZlxuICAgICAgaW5zZXJ0KHBhcmVudEVsbSwgdm5vZGUuZWxtLCByZWZFbG0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2VydCAocGFyZW50LCBlbG0sIHJlZiQkMSkge1xuICAgICAgaWYgKGlzRGVmKHBhcmVudCkpIHtcbiAgICAgICAgaWYgKGlzRGVmKHJlZiQkMSkpIHtcbiAgICAgICAgICBpZiAobm9kZU9wcy5wYXJlbnROb2RlKHJlZiQkMSkgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50LCBlbG0sIHJlZiQkMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGVPcHMuYXBwZW5kQ2hpbGQocGFyZW50LCBlbG0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW4gKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAge1xuICAgICAgICAgIGNoZWNrRHVwbGljYXRlS2V5cyhjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNyZWF0ZUVsbShjaGlsZHJlbltpXSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB2bm9kZS5lbG0sIG51bGwsIHRydWUsIGNoaWxkcmVuLCBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1ByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgICBub2RlT3BzLmFwcGVuZENoaWxkKHZub2RlLmVsbSwgbm9kZU9wcy5jcmVhdGVUZXh0Tm9kZShTdHJpbmcodm5vZGUudGV4dCkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1BhdGNoYWJsZSAodm5vZGUpIHtcbiAgICAgIHdoaWxlICh2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICB2bm9kZSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpc0RlZih2bm9kZS50YWcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52b2tlQ3JlYXRlSG9va3MgKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgICBjYnMuY3JlYXRlW2kkMV0oZW1wdHlOb2RlLCB2bm9kZSk7XG4gICAgICB9XG4gICAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgICAgaWYgKGlzRGVmKGkpKSB7XG4gICAgICAgIGlmIChpc0RlZihpLmNyZWF0ZSkpIHsgaS5jcmVhdGUoZW1wdHlOb2RlLCB2bm9kZSk7IH1cbiAgICAgICAgaWYgKGlzRGVmKGkuaW5zZXJ0KSkgeyBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgc2NvcGUgaWQgYXR0cmlidXRlIGZvciBzY29wZWQgQ1NTLlxuICAgIC8vIHRoaXMgaXMgaW1wbGVtZW50ZWQgYXMgYSBzcGVjaWFsIGNhc2UgdG8gYXZvaWQgdGhlIG92ZXJoZWFkXG4gICAgLy8gb2YgZ29pbmcgdGhyb3VnaCB0aGUgbm9ybWFsIGF0dHJpYnV0ZSBwYXRjaGluZyBwcm9jZXNzLlxuICAgIGZ1bmN0aW9uIHNldFNjb3BlICh2bm9kZSkge1xuICAgICAgdmFyIGk7XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmZuU2NvcGVJZCkpIHtcbiAgICAgICAgbm9kZU9wcy5zZXRTdHlsZVNjb3BlKHZub2RlLmVsbSwgaSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYW5jZXN0b3IgPSB2bm9kZTtcbiAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgaWYgKGlzRGVmKGkgPSBhbmNlc3Rvci5jb250ZXh0KSAmJiBpc0RlZihpID0gaS4kb3B0aW9ucy5fc2NvcGVJZCkpIHtcbiAgICAgICAgICAgIG5vZGVPcHMuc2V0U3R5bGVTY29wZSh2bm9kZS5lbG0sIGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gZm9yIHNsb3QgY29udGVudCB0aGV5IHNob3VsZCBhbHNvIGdldCB0aGUgc2NvcGVJZCBmcm9tIHRoZSBob3N0IGluc3RhbmNlLlxuICAgICAgaWYgKGlzRGVmKGkgPSBhY3RpdmVJbnN0YW5jZSkgJiZcbiAgICAgICAgaSAhPT0gdm5vZGUuY29udGV4dCAmJlxuICAgICAgICBpICE9PSB2bm9kZS5mbkNvbnRleHQgJiZcbiAgICAgICAgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpXG4gICAgICApIHtcbiAgICAgICAgbm9kZU9wcy5zZXRTdHlsZVNjb3BlKHZub2RlLmVsbSwgaSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVm5vZGVzIChwYXJlbnRFbG0sIHJlZkVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgICAgY3JlYXRlRWxtKHZub2Rlc1tzdGFydElkeF0sIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0sIGZhbHNlLCB2bm9kZXMsIHN0YXJ0SWR4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnZva2VEZXN0cm95SG9vayAodm5vZGUpIHtcbiAgICAgIHZhciBpLCBqO1xuICAgICAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5kZXN0cm95KSkgeyBpKHZub2RlKTsgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpIHsgY2JzLmRlc3Ryb3lbaV0odm5vZGUpOyB9XG4gICAgICB9XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNoaWxkcmVuKSkge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayh2bm9kZS5jaGlsZHJlbltqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVWbm9kZXMgKHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgICAgZm9yICg7IHN0YXJ0SWR4IDw9IGVuZElkeDsgKytzdGFydElkeCkge1xuICAgICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgICBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgICAgaWYgKGlzRGVmKGNoLnRhZykpIHtcbiAgICAgICAgICAgIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2soY2gpO1xuICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIFRleHQgbm9kZVxuICAgICAgICAgICAgcmVtb3ZlTm9kZShjaC5lbG0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2sgKHZub2RlLCBybSkge1xuICAgICAgaWYgKGlzRGVmKHJtKSB8fCBpc0RlZih2bm9kZS5kYXRhKSkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgaWYgKGlzRGVmKHJtKSkge1xuICAgICAgICAgIC8vIHdlIGhhdmUgYSByZWN1cnNpdmVseSBwYXNzZWQgZG93biBybSBjYWxsYmFja1xuICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBsaXN0ZW5lcnMgY291bnRcbiAgICAgICAgICBybS5saXN0ZW5lcnMgKz0gbGlzdGVuZXJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpcmVjdGx5IHJlbW92aW5nXG4gICAgICAgICAgcm0gPSBjcmVhdGVSbUNiKHZub2RlLmVsbSwgbGlzdGVuZXJzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWN1cnNpdmVseSBpbnZva2UgaG9va3Mgb24gY2hpbGQgY29tcG9uZW50IHJvb3Qgbm9kZVxuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSAmJiBpc0RlZihpID0gaS5fdm5vZGUpICYmIGlzRGVmKGkuZGF0YSkpIHtcbiAgICAgICAgICByZW1vdmVBbmRJbnZva2VSZW1vdmVIb29rKGksIHJtKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNicy5yZW1vdmVbaV0odm5vZGUsIHJtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucmVtb3ZlKSkge1xuICAgICAgICAgIGkodm5vZGUsIHJtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBybSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVOb2RlKHZub2RlLmVsbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4gKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpIHtcbiAgICAgIHZhciBvbGRTdGFydElkeCA9IDA7XG4gICAgICB2YXIgbmV3U3RhcnRJZHggPSAwO1xuICAgICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgICAgdmFyIG9sZEVuZFZub2RlID0gb2xkQ2hbb2xkRW5kSWR4XTtcbiAgICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICAgIHZhciBuZXdFbmRWbm9kZSA9IG5ld0NoW25ld0VuZElkeF07XG4gICAgICB2YXIgb2xkS2V5VG9JZHgsIGlkeEluT2xkLCB2bm9kZVRvTW92ZSwgcmVmRWxtO1xuXG4gICAgICAvLyByZW1vdmVPbmx5IGlzIGEgc3BlY2lhbCBmbGFnIHVzZWQgb25seSBieSA8dHJhbnNpdGlvbi1ncm91cD5cbiAgICAgIC8vIHRvIGVuc3VyZSByZW1vdmVkIGVsZW1lbnRzIHN0YXkgaW4gY29ycmVjdCByZWxhdGl2ZSBwb3NpdGlvbnNcbiAgICAgIC8vIGR1cmluZyBsZWF2aW5nIHRyYW5zaXRpb25zXG4gICAgICB2YXIgY2FuTW92ZSA9ICFyZW1vdmVPbmx5O1xuXG4gICAgICB7XG4gICAgICAgIGNoZWNrRHVwbGljYXRlS2V5cyhuZXdDaCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChvbGRTdGFydElkeCA8PSBvbGRFbmRJZHggJiYgbmV3U3RhcnRJZHggPD0gbmV3RW5kSWR4KSB7XG4gICAgICAgIGlmIChpc1VuZGVmKG9sZFN0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBoYXMgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVbmRlZihvbGRFbmRWbm9kZSkpIHtcbiAgICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4KTtcbiAgICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgbmV3Q2gsIG5ld0VuZElkeCk7XG4gICAgICAgICAgb2xkRW5kVm5vZGUgPSBvbGRDaFstLW9sZEVuZElkeF07XG4gICAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCByaWdodFxuICAgICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgbmV3Q2gsIG5ld0VuZElkeCk7XG4gICAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBub2RlT3BzLm5leHRTaWJsaW5nKG9sZEVuZFZub2RlLmVsbSkpO1xuICAgICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkRW5kVm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7IC8vIFZub2RlIG1vdmVkIGxlZnRcbiAgICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIG5ld0NoLCBuZXdTdGFydElkeCk7XG4gICAgICAgICAgY2FuTW92ZSAmJiBub2RlT3BzLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZEVuZFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNVbmRlZihvbGRLZXlUb0lkeCkpIHsgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7IH1cbiAgICAgICAgICBpZHhJbk9sZCA9IGlzRGVmKG5ld1N0YXJ0Vm5vZGUua2V5KVxuICAgICAgICAgICAgPyBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV1cbiAgICAgICAgICAgIDogZmluZElkeEluT2xkKG5ld1N0YXJ0Vm5vZGUsIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHsgLy8gTmV3IGVsZW1lbnRcbiAgICAgICAgICAgIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGZhbHNlLCBuZXdDaCwgbmV3U3RhcnRJZHgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2bm9kZVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICAgIGlmIChzYW1lVm5vZGUodm5vZGVUb01vdmUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICAgIHBhdGNoVm5vZGUodm5vZGVUb01vdmUsIG5ld1N0YXJ0Vm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4KTtcbiAgICAgICAgICAgICAgb2xkQ2hbaWR4SW5PbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgdm5vZGVUb01vdmUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBzYW1lIGtleSBidXQgZGlmZmVyZW50IGVsZW1lbnQuIHRyZWF0IGFzIG5ldyBlbGVtZW50XG4gICAgICAgICAgICAgIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIGZhbHNlLCBuZXdDaCwgbmV3U3RhcnRJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvbGRTdGFydElkeCA+IG9sZEVuZElkeCkge1xuICAgICAgICByZWZFbG0gPSBpc1VuZGVmKG5ld0NoW25ld0VuZElkeCArIDFdKSA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIHJlZkVsbSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG5ld1N0YXJ0SWR4ID4gbmV3RW5kSWR4KSB7XG4gICAgICAgIHJlbW92ZVZub2RlcyhvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tEdXBsaWNhdGVLZXlzIChjaGlsZHJlbikge1xuICAgICAgdmFyIHNlZW5LZXlzID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB2bm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIga2V5ID0gdm5vZGUua2V5O1xuICAgICAgICBpZiAoaXNEZWYoa2V5KSkge1xuICAgICAgICAgIGlmIChzZWVuS2V5c1trZXldKSB7XG4gICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAoXCJEdXBsaWNhdGUga2V5cyBkZXRlY3RlZDogJ1wiICsga2V5ICsgXCInLiBUaGlzIG1heSBjYXVzZSBhbiB1cGRhdGUgZXJyb3IuXCIpLFxuICAgICAgICAgICAgICB2bm9kZS5jb250ZXh0XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWVuS2V5c1trZXldID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kSWR4SW5PbGQgKG5vZGUsIG9sZENoLCBzdGFydCwgZW5kKSB7XG4gICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICB2YXIgYyA9IG9sZENoW2ldO1xuICAgICAgICBpZiAoaXNEZWYoYykgJiYgc2FtZVZub2RlKG5vZGUsIGMpKSB7IHJldHVybiBpIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXRjaFZub2RlIChcbiAgICAgIG9sZFZub2RlLFxuICAgICAgdm5vZGUsXG4gICAgICBpbnNlcnRlZFZub2RlUXVldWUsXG4gICAgICBvd25lckFycmF5LFxuICAgICAgaW5kZXgsXG4gICAgICByZW1vdmVPbmx5XG4gICAgKSB7XG4gICAgICBpZiAob2xkVm5vZGUgPT09IHZub2RlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaXNEZWYodm5vZGUuZWxtKSAmJiBpc0RlZihvd25lckFycmF5KSkge1xuICAgICAgICAvLyBjbG9uZSByZXVzZWQgdm5vZGVcbiAgICAgICAgdm5vZGUgPSBvd25lckFycmF5W2luZGV4XSA9IGNsb25lVk5vZGUodm5vZGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxtID0gdm5vZGUuZWxtID0gb2xkVm5vZGUuZWxtO1xuXG4gICAgICBpZiAoaXNUcnVlKG9sZFZub2RlLmlzQXN5bmNQbGFjZWhvbGRlcikpIHtcbiAgICAgICAgaWYgKGlzRGVmKHZub2RlLmFzeW5jRmFjdG9yeS5yZXNvbHZlZCkpIHtcbiAgICAgICAgICBoeWRyYXRlKG9sZFZub2RlLmVsbSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdm5vZGUuaXNBc3luY1BsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gcmV1c2UgZWxlbWVudCBmb3Igc3RhdGljIHRyZWVzLlxuICAgICAgLy8gbm90ZSB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIHZub2RlIGlzIGNsb25lZCAtXG4gICAgICAvLyBpZiB0aGUgbmV3IG5vZGUgaXMgbm90IGNsb25lZCBpdCBtZWFucyB0aGUgcmVuZGVyIGZ1bmN0aW9ucyBoYXZlIGJlZW5cbiAgICAgIC8vIHJlc2V0IGJ5IHRoZSBob3QtcmVsb2FkLWFwaSBhbmQgd2UgbmVlZCB0byBkbyBhIHByb3BlciByZS1yZW5kZXIuXG4gICAgICBpZiAoaXNUcnVlKHZub2RlLmlzU3RhdGljKSAmJlxuICAgICAgICBpc1RydWUob2xkVm5vZGUuaXNTdGF0aWMpICYmXG4gICAgICAgIHZub2RlLmtleSA9PT0gb2xkVm5vZGUua2V5ICYmXG4gICAgICAgIChpc1RydWUodm5vZGUuaXNDbG9uZWQpIHx8IGlzVHJ1ZSh2bm9kZS5pc09uY2UpKVxuICAgICAgKSB7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gb2xkVm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB2YXIgaTtcbiAgICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgIGlmIChpc0RlZihkYXRhKSAmJiBpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wcmVwYXRjaCkpIHtcbiAgICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2xkQ2ggPSBvbGRWbm9kZS5jaGlsZHJlbjtcbiAgICAgIHZhciBjaCA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgaWYgKGlzRGVmKGRhdGEpICYmIGlzUGF0Y2hhYmxlKHZub2RlKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSkgeyBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpIHsgaShvbGRWbm9kZSwgdm5vZGUpOyB9XG4gICAgICB9XG4gICAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgICBpZiAoaXNEZWYob2xkQ2gpICYmIGlzRGVmKGNoKSkge1xuICAgICAgICAgIGlmIChvbGRDaCAhPT0gY2gpIHsgdXBkYXRlQ2hpbGRyZW4oZWxtLCBvbGRDaCwgY2gsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSk7IH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjaGVja0R1cGxpY2F0ZUtleXMoY2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHsgbm9kZU9wcy5zZXRUZXh0Q29udGVudChlbG0sICcnKTsgfVxuICAgICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICAgIHJlbW92ZVZub2RlcyhvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGV4dCkpIHtcbiAgICAgICAgICBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9sZFZub2RlLnRleHQgIT09IHZub2RlLnRleHQpIHtcbiAgICAgICAgbm9kZU9wcy5zZXRUZXh0Q29udGVudChlbG0sIHZub2RlLnRleHQpO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5wb3N0cGF0Y2gpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGludm9rZUluc2VydEhvb2sgKHZub2RlLCBxdWV1ZSwgaW5pdGlhbCkge1xuICAgICAgLy8gZGVsYXkgaW5zZXJ0IGhvb2tzIGZvciBjb21wb25lbnQgcm9vdCBub2RlcywgaW52b2tlIHRoZW0gYWZ0ZXIgdGhlXG4gICAgICAvLyBlbGVtZW50IGlzIHJlYWxseSBpbnNlcnRlZFxuICAgICAgaWYgKGlzVHJ1ZShpbml0aWFsKSAmJiBpc0RlZih2bm9kZS5wYXJlbnQpKSB7XG4gICAgICAgIHZub2RlLnBhcmVudC5kYXRhLnBlbmRpbmdJbnNlcnQgPSBxdWV1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBxdWV1ZVtpXS5kYXRhLmhvb2suaW5zZXJ0KHF1ZXVlW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoeWRyYXRpb25CYWlsZWQgPSBmYWxzZTtcbiAgICAvLyBsaXN0IG9mIG1vZHVsZXMgdGhhdCBjYW4gc2tpcCBjcmVhdGUgaG9vayBkdXJpbmcgaHlkcmF0aW9uIGJlY2F1c2UgdGhleVxuICAgIC8vIGFyZSBhbHJlYWR5IHJlbmRlcmVkIG9uIHRoZSBjbGllbnQgb3IgaGFzIG5vIG5lZWQgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgLy8gTm90ZTogc3R5bGUgaXMgZXhjbHVkZWQgYmVjYXVzZSBpdCByZWxpZXMgb24gaW5pdGlhbCBjbG9uZSBmb3IgZnV0dXJlXG4gICAgLy8gZGVlcCB1cGRhdGVzICgjNzA2MykuXG4gICAgdmFyIGlzUmVuZGVyZWRNb2R1bGUgPSBtYWtlTWFwKCdhdHRycyxjbGFzcyxzdGF0aWNDbGFzcyxzdGF0aWNTdHlsZSxrZXknKTtcblxuICAgIC8vIE5vdGU6IHRoaXMgaXMgYSBicm93c2VyLW9ubHkgZnVuY3Rpb24gc28gd2UgY2FuIGFzc3VtZSBlbG1zIGFyZSBET00gbm9kZXMuXG4gICAgZnVuY3Rpb24gaHlkcmF0ZSAoZWxtLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpblZQcmUpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIHRhZyA9IHZub2RlLnRhZztcbiAgICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgaW5WUHJlID0gaW5WUHJlIHx8IChkYXRhICYmIGRhdGEucHJlKTtcbiAgICAgIHZub2RlLmVsbSA9IGVsbTtcblxuICAgICAgaWYgKGlzVHJ1ZSh2bm9kZS5pc0NvbW1lbnQpICYmIGlzRGVmKHZub2RlLmFzeW5jRmFjdG9yeSkpIHtcbiAgICAgICAgdm5vZGUuaXNBc3luY1BsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIC8vIGFzc2VydCBub2RlIG1hdGNoXG4gICAgICB7XG4gICAgICAgIGlmICghYXNzZXJ0Tm9kZU1hdGNoKGVsbSwgdm5vZGUsIGluVlByZSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkgeyBpKHZub2RlLCB0cnVlIC8qIGh5ZHJhdGluZyAqLyk7IH1cbiAgICAgICAgaWYgKGlzRGVmKGkgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkpIHtcbiAgICAgICAgICAvLyBjaGlsZCBjb21wb25lbnQuIGl0IHNob3VsZCBoYXZlIGh5ZHJhdGVkIGl0cyBvd24gdHJlZS5cbiAgICAgICAgICBpbml0Q29tcG9uZW50KHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZih0YWcpKSB7XG4gICAgICAgIGlmIChpc0RlZihjaGlsZHJlbikpIHtcbiAgICAgICAgICAvLyBlbXB0eSBlbGVtZW50LCBhbGxvdyBjbGllbnQgdG8gcGljayB1cCBhbmQgcG9wdWxhdGUgY2hpbGRyZW5cbiAgICAgICAgICBpZiAoIWVsbS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNoaWxkcmVuKHZub2RlLCBjaGlsZHJlbiwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdi1odG1sIGFuZCBkb21Qcm9wczogaW5uZXJIVE1MXG4gICAgICAgICAgICBpZiAoaXNEZWYoaSA9IGRhdGEpICYmIGlzRGVmKGkgPSBpLmRvbVByb3BzKSAmJiBpc0RlZihpID0gaS5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICAgIGlmIChpICE9PSBlbG0uaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgIWh5ZHJhdGlvbkJhaWxlZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgaHlkcmF0aW9uQmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyZW50OiAnLCBlbG0pO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdzZXJ2ZXIgaW5uZXJIVE1MOiAnLCBpKTtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignY2xpZW50IGlubmVySFRNTDogJywgZWxtLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBpdGVyYXRlIGFuZCBjb21wYXJlIGNoaWxkcmVuIGxpc3RzXG4gICAgICAgICAgICAgIHZhciBjaGlsZHJlbk1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IGVsbS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBjaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZE5vZGUgfHwgIWh5ZHJhdGUoY2hpbGROb2RlLCBjaGlsZHJlbltpJDFdLCBpbnNlcnRlZFZub2RlUXVldWUsIGluVlByZSkpIHtcbiAgICAgICAgICAgICAgICAgIGNoaWxkcmVuTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZSA9IGNoaWxkTm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZiBjaGlsZE5vZGUgaXMgbm90IG51bGwsIGl0IG1lYW5zIHRoZSBhY3R1YWwgY2hpbGROb2RlcyBsaXN0IGlzXG4gICAgICAgICAgICAgIC8vIGxvbmdlciB0aGFuIHRoZSB2aXJ0dWFsIGNoaWxkcmVuIGxpc3QuXG4gICAgICAgICAgICAgIGlmICghY2hpbGRyZW5NYXRjaCB8fCBjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAhaHlkcmF0aW9uQmFpbGVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBoeWRyYXRpb25CYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdQYXJlbnQ6ICcsIGVsbSk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc21hdGNoaW5nIGNoaWxkTm9kZXMgdnMuIFZOb2RlczogJywgZWxtLmNoaWxkTm9kZXMsIGNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgICAgdmFyIGZ1bGxJbnZva2UgPSBmYWxzZTtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKCFpc1JlbmRlcmVkTW9kdWxlKGtleSkpIHtcbiAgICAgICAgICAgICAgZnVsbEludm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZ1bGxJbnZva2UgJiYgZGF0YVsnY2xhc3MnXSkge1xuICAgICAgICAgICAgLy8gZW5zdXJlIGNvbGxlY3RpbmcgZGVwcyBmb3IgZGVlcCBjbGFzcyBiaW5kaW5ncyBmb3IgZnV0dXJlIHVwZGF0ZXNcbiAgICAgICAgICAgIHRyYXZlcnNlKGRhdGFbJ2NsYXNzJ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbG0uZGF0YSAhPT0gdm5vZGUudGV4dCkge1xuICAgICAgICBlbG0uZGF0YSA9IHZub2RlLnRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2VydE5vZGVNYXRjaCAobm9kZSwgdm5vZGUsIGluVlByZSkge1xuICAgICAgaWYgKGlzRGVmKHZub2RlLnRhZykpIHtcbiAgICAgICAgcmV0dXJuIHZub2RlLnRhZy5pbmRleE9mKCd2dWUtY29tcG9uZW50JykgPT09IDAgfHwgKFxuICAgICAgICAgICFpc1Vua25vd25FbGVtZW50JCQxKHZub2RlLCBpblZQcmUpICYmXG4gICAgICAgICAgdm5vZGUudGFnLnRvTG93ZXJDYXNlKCkgPT09IChub2RlLnRhZ05hbWUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAodm5vZGUuaXNDb21tZW50ID8gOCA6IDMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoIChvbGRWbm9kZSwgdm5vZGUsIGh5ZHJhdGluZywgcmVtb3ZlT25seSkge1xuICAgICAgaWYgKGlzVW5kZWYodm5vZGUpKSB7XG4gICAgICAgIGlmIChpc0RlZihvbGRWbm9kZSkpIHsgaW52b2tlRGVzdHJveUhvb2sob2xkVm5vZGUpOyB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB2YXIgaXNJbml0aWFsUGF0Y2ggPSBmYWxzZTtcbiAgICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcblxuICAgICAgaWYgKGlzVW5kZWYob2xkVm5vZGUpKSB7XG4gICAgICAgIC8vIGVtcHR5IG1vdW50IChsaWtlbHkgYXMgY29tcG9uZW50KSwgY3JlYXRlIG5ldyByb290IGVsZW1lbnRcbiAgICAgICAgaXNJbml0aWFsUGF0Y2ggPSB0cnVlO1xuICAgICAgICBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaXNSZWFsRWxlbWVudCA9IGlzRGVmKG9sZFZub2RlLm5vZGVUeXBlKTtcbiAgICAgICAgaWYgKCFpc1JlYWxFbGVtZW50ICYmIHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgICAgLy8gcGF0Y2ggZXhpc3Rpbmcgcm9vdCBub2RlXG4gICAgICAgICAgcGF0Y2hWbm9kZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgbnVsbCwgbnVsbCwgcmVtb3ZlT25seSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzUmVhbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIG1vdW50aW5nIHRvIGEgcmVhbCBlbGVtZW50XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIHNlcnZlci1yZW5kZXJlZCBjb250ZW50IGFuZCBpZiB3ZSBjYW4gcGVyZm9ybVxuICAgICAgICAgICAgLy8gYSBzdWNjZXNzZnVsIGh5ZHJhdGlvbi5cbiAgICAgICAgICAgIGlmIChvbGRWbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBvbGRWbm9kZS5oYXNBdHRyaWJ1dGUoU1NSX0FUVFIpKSB7XG4gICAgICAgICAgICAgIG9sZFZub2RlLnJlbW92ZUF0dHJpYnV0ZShTU1JfQVRUUik7XG4gICAgICAgICAgICAgIGh5ZHJhdGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNUcnVlKGh5ZHJhdGluZykpIHtcbiAgICAgICAgICAgICAgaWYgKGh5ZHJhdGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpKSB7XG4gICAgICAgICAgICAgICAgaW52b2tlSW5zZXJ0SG9vayh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkVm5vZGVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgICAgICAgJ1RoZSBjbGllbnQtc2lkZSByZW5kZXJlZCB2aXJ0dWFsIERPTSB0cmVlIGlzIG5vdCBtYXRjaGluZyAnICtcbiAgICAgICAgICAgICAgICAgICdzZXJ2ZXItcmVuZGVyZWQgY29udGVudC4gVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGluY29ycmVjdCAnICtcbiAgICAgICAgICAgICAgICAgICdIVE1MIG1hcmt1cCwgZm9yIGV4YW1wbGUgbmVzdGluZyBibG9jay1sZXZlbCBlbGVtZW50cyBpbnNpZGUgJyArXG4gICAgICAgICAgICAgICAgICAnPHA+LCBvciBtaXNzaW5nIDx0Ym9keT4uIEJhaWxpbmcgaHlkcmF0aW9uIGFuZCBwZXJmb3JtaW5nICcgK1xuICAgICAgICAgICAgICAgICAgJ2Z1bGwgY2xpZW50LXNpZGUgcmVuZGVyLidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlaXRoZXIgbm90IHNlcnZlci1yZW5kZXJlZCwgb3IgaHlkcmF0aW9uIGZhaWxlZC5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBub2RlIGFuZCByZXBsYWNlIGl0XG4gICAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXBsYWNpbmcgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgICAgIHZhciBvbGRFbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgICAgICAgdmFyIHBhcmVudEVsbSA9IG5vZGVPcHMucGFyZW50Tm9kZShvbGRFbG0pO1xuXG4gICAgICAgICAgLy8gY3JlYXRlIG5ldyBub2RlXG4gICAgICAgICAgY3JlYXRlRWxtKFxuICAgICAgICAgICAgdm5vZGUsXG4gICAgICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUsXG4gICAgICAgICAgICAvLyBleHRyZW1lbHkgcmFyZSBlZGdlIGNhc2U6IGRvIG5vdCBpbnNlcnQgaWYgb2xkIGVsZW1lbnQgaXMgaW4gYVxuICAgICAgICAgICAgLy8gbGVhdmluZyB0cmFuc2l0aW9uLiBPbmx5IGhhcHBlbnMgd2hlbiBjb21iaW5pbmcgdHJhbnNpdGlvbiArXG4gICAgICAgICAgICAvLyBrZWVwLWFsaXZlICsgSE9Dcy4gKCM0NTkwKVxuICAgICAgICAgICAgb2xkRWxtLl9sZWF2ZUNiID8gbnVsbCA6IHBhcmVudEVsbSxcbiAgICAgICAgICAgIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRWxtKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgcGFyZW50IHBsYWNlaG9sZGVyIG5vZGUgZWxlbWVudCwgcmVjdXJzaXZlbHlcbiAgICAgICAgICBpZiAoaXNEZWYodm5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgdmFyIGFuY2VzdG9yID0gdm5vZGUucGFyZW50O1xuICAgICAgICAgICAgdmFyIHBhdGNoYWJsZSA9IGlzUGF0Y2hhYmxlKHZub2RlKTtcbiAgICAgICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY2JzLmRlc3Ryb3lbaV0oYW5jZXN0b3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFuY2VzdG9yLmVsbSA9IHZub2RlLmVsbTtcbiAgICAgICAgICAgICAgaWYgKHBhdGNoYWJsZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgICAgICAgICAgICAgY2JzLmNyZWF0ZVtpJDFdKGVtcHR5Tm9kZSwgYW5jZXN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAjNjUxM1xuICAgICAgICAgICAgICAgIC8vIGludm9rZSBpbnNlcnQgaG9va3MgdGhhdCBtYXkgaGF2ZSBiZWVuIG1lcmdlZCBieSBjcmVhdGUgaG9va3MuXG4gICAgICAgICAgICAgICAgLy8gZS5nLiBmb3IgZGlyZWN0aXZlcyB0aGF0IHVzZXMgdGhlIFwiaW5zZXJ0ZWRcIiBob29rLlxuICAgICAgICAgICAgICAgIHZhciBpbnNlcnQgPSBhbmNlc3Rvci5kYXRhLmhvb2suaW5zZXJ0O1xuICAgICAgICAgICAgICAgIGlmIChpbnNlcnQubWVyZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAvLyBzdGFydCBhdCBpbmRleCAxIHRvIGF2b2lkIHJlLWludm9raW5nIGNvbXBvbmVudCBtb3VudGVkIGhvb2tcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkkMiA9IDE7IGkkMiA8IGluc2VydC5mbnMubGVuZ3RoOyBpJDIrKykge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnQuZm5zW2kkMl0oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYoYW5jZXN0b3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGRlc3Ryb3kgb2xkIG5vZGVcbiAgICAgICAgICBpZiAoaXNEZWYocGFyZW50RWxtKSkge1xuICAgICAgICAgICAgcmVtb3ZlVm5vZGVzKFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNEZWYob2xkVm5vZGUudGFnKSkge1xuICAgICAgICAgICAgaW52b2tlRGVzdHJveUhvb2sob2xkVm5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbnZva2VJbnNlcnRIb29rKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUsIGlzSW5pdGlhbFBhdGNoKTtcbiAgICAgIHJldHVybiB2bm9kZS5lbG1cbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICB2YXIgZGlyZWN0aXZlcyA9IHtcbiAgICBjcmVhdGU6IHVwZGF0ZURpcmVjdGl2ZXMsXG4gICAgdXBkYXRlOiB1cGRhdGVEaXJlY3RpdmVzLFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIHVuYmluZERpcmVjdGl2ZXMgKHZub2RlKSB7XG4gICAgICB1cGRhdGVEaXJlY3RpdmVzKHZub2RlLCBlbXB0eU5vZGUpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB1cGRhdGVEaXJlY3RpdmVzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICBpZiAob2xkVm5vZGUuZGF0YS5kaXJlY3RpdmVzIHx8IHZub2RlLmRhdGEuZGlyZWN0aXZlcykge1xuICAgICAgX3VwZGF0ZShvbGRWbm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGUgKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBpc0NyZWF0ZSA9IG9sZFZub2RlID09PSBlbXB0eU5vZGU7XG4gICAgdmFyIGlzRGVzdHJveSA9IHZub2RlID09PSBlbXB0eU5vZGU7XG4gICAgdmFyIG9sZERpcnMgPSBub3JtYWxpemVEaXJlY3RpdmVzJDEob2xkVm5vZGUuZGF0YS5kaXJlY3RpdmVzLCBvbGRWbm9kZS5jb250ZXh0KTtcbiAgICB2YXIgbmV3RGlycyA9IG5vcm1hbGl6ZURpcmVjdGl2ZXMkMSh2bm9kZS5kYXRhLmRpcmVjdGl2ZXMsIHZub2RlLmNvbnRleHQpO1xuXG4gICAgdmFyIGRpcnNXaXRoSW5zZXJ0ID0gW107XG4gICAgdmFyIGRpcnNXaXRoUG9zdHBhdGNoID0gW107XG5cbiAgICB2YXIga2V5LCBvbGREaXIsIGRpcjtcbiAgICBmb3IgKGtleSBpbiBuZXdEaXJzKSB7XG4gICAgICBvbGREaXIgPSBvbGREaXJzW2tleV07XG4gICAgICBkaXIgPSBuZXdEaXJzW2tleV07XG4gICAgICBpZiAoIW9sZERpcikge1xuICAgICAgICAvLyBuZXcgZGlyZWN0aXZlLCBiaW5kXG4gICAgICAgIGNhbGxIb29rJDEoZGlyLCAnYmluZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICAgIGlmIChkaXIuZGVmICYmIGRpci5kZWYuaW5zZXJ0ZWQpIHtcbiAgICAgICAgICBkaXJzV2l0aEluc2VydC5wdXNoKGRpcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGV4aXN0aW5nIGRpcmVjdGl2ZSwgdXBkYXRlXG4gICAgICAgIGRpci5vbGRWYWx1ZSA9IG9sZERpci52YWx1ZTtcbiAgICAgICAgZGlyLm9sZEFyZyA9IG9sZERpci5hcmc7XG4gICAgICAgIGNhbGxIb29rJDEoZGlyLCAndXBkYXRlJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgICAgaWYgKGRpci5kZWYgJiYgZGlyLmRlZi5jb21wb25lbnRVcGRhdGVkKSB7XG4gICAgICAgICAgZGlyc1dpdGhQb3N0cGF0Y2gucHVzaChkaXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRpcnNXaXRoSW5zZXJ0Lmxlbmd0aCkge1xuICAgICAgdmFyIGNhbGxJbnNlcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyc1dpdGhJbnNlcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoSW5zZXJ0W2ldLCAnaW5zZXJ0ZWQnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKGlzQ3JlYXRlKSB7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAnaW5zZXJ0JywgY2FsbEluc2VydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsSW5zZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRpcnNXaXRoUG9zdHBhdGNoLmxlbmd0aCkge1xuICAgICAgbWVyZ2VWTm9kZUhvb2sodm5vZGUsICdwb3N0cGF0Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyc1dpdGhQb3N0cGF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjYWxsSG9vayQxKGRpcnNXaXRoUG9zdHBhdGNoW2ldLCAnY29tcG9uZW50VXBkYXRlZCcsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNDcmVhdGUpIHtcbiAgICAgIGZvciAoa2V5IGluIG9sZERpcnMpIHtcbiAgICAgICAgaWYgKCFuZXdEaXJzW2tleV0pIHtcbiAgICAgICAgICAvLyBubyBsb25nZXIgcHJlc2VudCwgdW5iaW5kXG4gICAgICAgICAgY2FsbEhvb2skMShvbGREaXJzW2tleV0sICd1bmJpbmQnLCBvbGRWbm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZW1wdHlNb2RpZmllcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURpcmVjdGl2ZXMkMSAoXG4gICAgZGlycyxcbiAgICB2bVxuICApIHtcbiAgICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBpZiAoIWRpcnMpIHtcbiAgICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgICB2YXIgaSwgZGlyO1xuICAgIGZvciAoaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkaXIgPSBkaXJzW2ldO1xuICAgICAgaWYgKCFkaXIubW9kaWZpZXJzKSB7XG4gICAgICAgIC8vICRmbG93LWRpc2FibGUtbGluZVxuICAgICAgICBkaXIubW9kaWZpZXJzID0gZW1wdHlNb2RpZmllcnM7XG4gICAgICB9XG4gICAgICByZXNbZ2V0UmF3RGlyTmFtZShkaXIpXSA9IGRpcjtcbiAgICAgIGRpci5kZWYgPSByZXNvbHZlQXNzZXQodm0uJG9wdGlvbnMsICdkaXJlY3RpdmVzJywgZGlyLm5hbWUsIHRydWUpO1xuICAgIH1cbiAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICBmdW5jdGlvbiBnZXRSYXdEaXJOYW1lIChkaXIpIHtcbiAgICByZXR1cm4gZGlyLnJhd05hbWUgfHwgKChkaXIubmFtZSkgKyBcIi5cIiArIChPYmplY3Qua2V5cyhkaXIubW9kaWZpZXJzIHx8IHt9KS5qb2luKCcuJykpKVxuICB9XG5cbiAgZnVuY3Rpb24gY2FsbEhvb2skMSAoZGlyLCBob29rLCB2bm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSkge1xuICAgIHZhciBmbiA9IGRpci5kZWYgJiYgZGlyLmRlZltob29rXTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKHZub2RlLmVsbSwgZGlyLCB2bm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGUsIHZub2RlLmNvbnRleHQsIChcImRpcmVjdGl2ZSBcIiArIChkaXIubmFtZSkgKyBcIiBcIiArIGhvb2sgKyBcIiBob29rXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZU1vZHVsZXMgPSBbXG4gICAgcmVmLFxuICAgIGRpcmVjdGl2ZXNcbiAgXTtcblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiB1cGRhdGVBdHRycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIG9wdHMgPSB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICAgIGlmIChpc0RlZihvcHRzKSAmJiBvcHRzLkN0b3Iub3B0aW9ucy5pbmhlcml0QXR0cnMgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5hdHRycykgJiYgaXNVbmRlZih2bm9kZS5kYXRhLmF0dHJzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBrZXksIGN1ciwgb2xkO1xuICAgIHZhciBlbG0gPSB2bm9kZS5lbG07XG4gICAgdmFyIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycyB8fCB7fTtcbiAgICB2YXIgYXR0cnMgPSB2bm9kZS5kYXRhLmF0dHJzIHx8IHt9O1xuICAgIC8vIGNsb25lIG9ic2VydmVkIG9iamVjdHMsIGFzIHRoZSB1c2VyIHByb2JhYmx5IHdhbnRzIHRvIG11dGF0ZSBpdFxuICAgIGlmIChpc0RlZihhdHRycy5fX29iX18pKSB7XG4gICAgICBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgPSBleHRlbmQoe30sIGF0dHJzKTtcbiAgICB9XG5cbiAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgY3VyID0gYXR0cnNba2V5XTtcbiAgICAgIG9sZCA9IG9sZEF0dHJzW2tleV07XG4gICAgICBpZiAob2xkICE9PSBjdXIpIHtcbiAgICAgICAgc2V0QXR0cihlbG0sIGtleSwgY3VyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gIzQzOTE6IGluIElFOSwgc2V0dGluZyB0eXBlIGNhbiByZXNldCB2YWx1ZSBmb3IgaW5wdXRbdHlwZT1yYWRpb11cbiAgICAvLyAjNjY2NjogSUUvRWRnZSBmb3JjZXMgcHJvZ3Jlc3MgdmFsdWUgZG93biB0byAxIGJlZm9yZSBzZXR0aW5nIGEgbWF4XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKChpc0lFIHx8IGlzRWRnZSkgJiYgYXR0cnMudmFsdWUgIT09IG9sZEF0dHJzLnZhbHVlKSB7XG4gICAgICBzZXRBdHRyKGVsbSwgJ3ZhbHVlJywgYXR0cnMudmFsdWUpO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgICAgaWYgKGlzVW5kZWYoYXR0cnNba2V5XSkpIHtcbiAgICAgICAgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGVOUyh4bGlua05TLCBnZXRYbGlua1Byb3Aoa2V5KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzRW51bWVyYXRlZEF0dHIoa2V5KSkge1xuICAgICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEF0dHIgKGVsLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGVsLnRhZ05hbWUuaW5kZXhPZignLScpID4gLTEpIHtcbiAgICAgIGJhc2VTZXRBdHRyKGVsLCBrZXksIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbkF0dHIoa2V5KSkge1xuICAgICAgLy8gc2V0IGF0dHJpYnV0ZSBmb3IgYmxhbmsgdmFsdWVcbiAgICAgIC8vIGUuZy4gPG9wdGlvbiBkaXNhYmxlZD5TZWxlY3Qgb25lPC9vcHRpb24+XG4gICAgICBpZiAoaXNGYWxzeUF0dHJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0ZWNobmljYWxseSBhbGxvd2Z1bGxzY3JlZW4gaXMgYSBib29sZWFuIGF0dHJpYnV0ZSBmb3IgPGlmcmFtZT4sXG4gICAgICAgIC8vIGJ1dCBGbGFzaCBleHBlY3RzIGEgdmFsdWUgb2YgXCJ0cnVlXCIgd2hlbiB1c2VkIG9uIDxlbWJlZD4gdGFnXG4gICAgICAgIHZhbHVlID0ga2V5ID09PSAnYWxsb3dmdWxsc2NyZWVuJyAmJiBlbC50YWdOYW1lID09PSAnRU1CRUQnXG4gICAgICAgICAgPyAndHJ1ZSdcbiAgICAgICAgICA6IGtleTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNFbnVtZXJhdGVkQXR0cihrZXkpKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBjb252ZXJ0RW51bWVyYXRlZFZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICB9IGVsc2UgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKHhsaW5rTlMsIGdldFhsaW5rUHJvcChrZXkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKHhsaW5rTlMsIGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBiYXNlU2V0QXR0cihlbCwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYmFzZVNldEF0dHIgKGVsLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gIzcxMzg6IElFMTAgJiAxMSBmaXJlcyBpbnB1dCBldmVudCB3aGVuIHNldHRpbmcgcGxhY2Vob2xkZXIgb25cbiAgICAgIC8vIDx0ZXh0YXJlYT4uLi4gYmxvY2sgdGhlIGZpcnN0IGlucHV0IGV2ZW50IGFuZCByZW1vdmUgdGhlIGJsb2NrZXJcbiAgICAgIC8vIGltbWVkaWF0ZWx5LlxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoXG4gICAgICAgIGlzSUUgJiYgIWlzSUU5ICYmXG4gICAgICAgIGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgJiZcbiAgICAgICAga2V5ID09PSAncGxhY2Vob2xkZXInICYmIHZhbHVlICE9PSAnJyAmJiAhZWwuX19pZXBoXG4gICAgICApIHtcbiAgICAgICAgdmFyIGJsb2NrZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBibG9ja2VyKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBibG9ja2VyKTtcbiAgICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICAgIGVsLl9faWVwaCA9IHRydWU7IC8qIElFIHBsYWNlaG9sZGVyIHBhdGNoZWQgKi9cbiAgICAgIH1cbiAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXR0cnMgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVBdHRycyxcbiAgICB1cGRhdGU6IHVwZGF0ZUF0dHJzXG4gIH07XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2xhc3MgKG9sZFZub2RlLCB2bm9kZSkge1xuICAgIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdmFyIG9sZERhdGEgPSBvbGRWbm9kZS5kYXRhO1xuICAgIGlmIChcbiAgICAgIGlzVW5kZWYoZGF0YS5zdGF0aWNDbGFzcykgJiZcbiAgICAgIGlzVW5kZWYoZGF0YS5jbGFzcykgJiYgKFxuICAgICAgICBpc1VuZGVmKG9sZERhdGEpIHx8IChcbiAgICAgICAgICBpc1VuZGVmKG9sZERhdGEuc3RhdGljQ2xhc3MpICYmXG4gICAgICAgICAgaXNVbmRlZihvbGREYXRhLmNsYXNzKVxuICAgICAgICApXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgY2xzID0gZ2VuQ2xhc3NGb3JWbm9kZSh2bm9kZSk7XG5cbiAgICAvLyBoYW5kbGUgdHJhbnNpdGlvbiBjbGFzc2VzXG4gICAgdmFyIHRyYW5zaXRpb25DbGFzcyA9IGVsLl90cmFuc2l0aW9uQ2xhc3NlcztcbiAgICBpZiAoaXNEZWYodHJhbnNpdGlvbkNsYXNzKSkge1xuICAgICAgY2xzID0gY29uY2F0KGNscywgc3RyaW5naWZ5Q2xhc3ModHJhbnNpdGlvbkNsYXNzKSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBjbGFzc1xuICAgIGlmIChjbHMgIT09IGVsLl9wcmV2Q2xhc3MpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpO1xuICAgICAgZWwuX3ByZXZDbGFzcyA9IGNscztcbiAgICB9XG4gIH1cblxuICB2YXIga2xhc3MgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVDbGFzcyxcbiAgICB1cGRhdGU6IHVwZGF0ZUNsYXNzXG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIHZhbGlkRGl2aXNpb25DaGFyUkUgPSAvW1xcdykuK1xcLV8kXFxdXS87XG5cbiAgZnVuY3Rpb24gcGFyc2VGaWx0ZXJzIChleHApIHtcbiAgICB2YXIgaW5TaW5nbGUgPSBmYWxzZTtcbiAgICB2YXIgaW5Eb3VibGUgPSBmYWxzZTtcbiAgICB2YXIgaW5UZW1wbGF0ZVN0cmluZyA9IGZhbHNlO1xuICAgIHZhciBpblJlZ2V4ID0gZmFsc2U7XG4gICAgdmFyIGN1cmx5ID0gMDtcbiAgICB2YXIgc3F1YXJlID0gMDtcbiAgICB2YXIgcGFyZW4gPSAwO1xuICAgIHZhciBsYXN0RmlsdGVySW5kZXggPSAwO1xuICAgIHZhciBjLCBwcmV2LCBpLCBleHByZXNzaW9uLCBmaWx0ZXJzO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGV4cC5sZW5ndGg7IGkrKykge1xuICAgICAgcHJldiA9IGM7XG4gICAgICBjID0gZXhwLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoaW5TaW5nbGUpIHtcbiAgICAgICAgaWYgKGMgPT09IDB4MjcgJiYgcHJldiAhPT0gMHg1QykgeyBpblNpbmdsZSA9IGZhbHNlOyB9XG4gICAgICB9IGVsc2UgaWYgKGluRG91YmxlKSB7XG4gICAgICAgIGlmIChjID09PSAweDIyICYmIHByZXYgIT09IDB4NUMpIHsgaW5Eb3VibGUgPSBmYWxzZTsgfVxuICAgICAgfSBlbHNlIGlmIChpblRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGlmIChjID09PSAweDYwICYmIHByZXYgIT09IDB4NUMpIHsgaW5UZW1wbGF0ZVN0cmluZyA9IGZhbHNlOyB9XG4gICAgICB9IGVsc2UgaWYgKGluUmVnZXgpIHtcbiAgICAgICAgaWYgKGMgPT09IDB4MmYgJiYgcHJldiAhPT0gMHg1QykgeyBpblJlZ2V4ID0gZmFsc2U7IH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGMgPT09IDB4N0MgJiYgLy8gcGlwZVxuICAgICAgICBleHAuY2hhckNvZGVBdChpICsgMSkgIT09IDB4N0MgJiZcbiAgICAgICAgZXhwLmNoYXJDb2RlQXQoaSAtIDEpICE9PSAweDdDICYmXG4gICAgICAgICFjdXJseSAmJiAhc3F1YXJlICYmICFwYXJlblxuICAgICAgKSB7XG4gICAgICAgIGlmIChleHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBmaXJzdCBmaWx0ZXIsIGVuZCBvZiBleHByZXNzaW9uXG4gICAgICAgICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDE7XG4gICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cC5zbGljZSgwLCBpKS50cmltKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHVzaEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICBjYXNlIDB4MjI6IGluRG91YmxlID0gdHJ1ZTsgYnJlYWsgICAgICAgICAvLyBcIlxuICAgICAgICAgIGNhc2UgMHgyNzogaW5TaW5nbGUgPSB0cnVlOyBicmVhayAgICAgICAgIC8vICdcbiAgICAgICAgICBjYXNlIDB4NjA6IGluVGVtcGxhdGVTdHJpbmcgPSB0cnVlOyBicmVhayAvLyBgXG4gICAgICAgICAgY2FzZSAweDI4OiBwYXJlbisrOyBicmVhayAgICAgICAgICAgICAgICAgLy8gKFxuICAgICAgICAgIGNhc2UgMHgyOTogcGFyZW4tLTsgYnJlYWsgICAgICAgICAgICAgICAgIC8vIClcbiAgICAgICAgICBjYXNlIDB4NUI6IHNxdWFyZSsrOyBicmVhayAgICAgICAgICAgICAgICAvLyBbXG4gICAgICAgICAgY2FzZSAweDVEOiBzcXVhcmUtLTsgYnJlYWsgICAgICAgICAgICAgICAgLy8gXVxuICAgICAgICAgIGNhc2UgMHg3QjogY3VybHkrKzsgYnJlYWsgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICBjYXNlIDB4N0Q6IGN1cmx5LS07IGJyZWFrICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09IDB4MmYpIHsgLy8gL1xuICAgICAgICAgIHZhciBqID0gaSAtIDE7XG4gICAgICAgICAgdmFyIHAgPSAodm9pZCAwKTtcbiAgICAgICAgICAvLyBmaW5kIGZpcnN0IG5vbi13aGl0ZXNwYWNlIHByZXYgY2hhclxuICAgICAgICAgIGZvciAoOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgcCA9IGV4cC5jaGFyQXQoaik7XG4gICAgICAgICAgICBpZiAocCAhPT0gJyAnKSB7IGJyZWFrIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFwIHx8ICF2YWxpZERpdmlzaW9uQ2hhclJFLnRlc3QocCkpIHtcbiAgICAgICAgICAgIGluUmVnZXggPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV4cHJlc3Npb24gPSBleHAuc2xpY2UoMCwgaSkudHJpbSgpO1xuICAgIH0gZWxzZSBpZiAobGFzdEZpbHRlckluZGV4ICE9PSAwKSB7XG4gICAgICBwdXNoRmlsdGVyKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVzaEZpbHRlciAoKSB7XG4gICAgICAoZmlsdGVycyB8fCAoZmlsdGVycyA9IFtdKSkucHVzaChleHAuc2xpY2UobGFzdEZpbHRlckluZGV4LCBpKS50cmltKCkpO1xuICAgICAgbGFzdEZpbHRlckluZGV4ID0gaSArIDE7XG4gICAgfVxuXG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWx0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGV4cHJlc3Npb24gPSB3cmFwRmlsdGVyKGV4cHJlc3Npb24sIGZpbHRlcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleHByZXNzaW9uXG4gIH1cblxuICBmdW5jdGlvbiB3cmFwRmlsdGVyIChleHAsIGZpbHRlcikge1xuICAgIHZhciBpID0gZmlsdGVyLmluZGV4T2YoJygnKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIC8vIF9mOiByZXNvbHZlRmlsdGVyXG4gICAgICByZXR1cm4gKFwiX2YoXFxcIlwiICsgZmlsdGVyICsgXCJcXFwiKShcIiArIGV4cCArIFwiKVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmFtZSA9IGZpbHRlci5zbGljZSgwLCBpKTtcbiAgICAgIHZhciBhcmdzID0gZmlsdGVyLnNsaWNlKGkgKyAxKTtcbiAgICAgIHJldHVybiAoXCJfZihcXFwiXCIgKyBuYW1lICsgXCJcXFwiKShcIiArIGV4cCArIChhcmdzICE9PSAnKScgPyAnLCcgKyBhcmdzIDogYXJncykpXG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cblxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIGZ1bmN0aW9uIGJhc2VXYXJuIChtc2csIHJhbmdlKSB7XG4gICAgY29uc29sZS5lcnJvcigoXCJbVnVlIGNvbXBpbGVyXTogXCIgKyBtc2cpKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbiAgZnVuY3Rpb24gcGx1Y2tNb2R1bGVGdW5jdGlvbiAoXG4gICAgbW9kdWxlcyxcbiAgICBrZXlcbiAgKSB7XG4gICAgcmV0dXJuIG1vZHVsZXNcbiAgICAgID8gbW9kdWxlcy5tYXAoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG1ba2V5XTsgfSkuZmlsdGVyKGZ1bmN0aW9uIChfKSB7IHJldHVybiBfOyB9KVxuICAgICAgOiBbXVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJvcCAoZWwsIG5hbWUsIHZhbHVlLCByYW5nZSwgZHluYW1pYykge1xuICAgIChlbC5wcm9wcyB8fCAoZWwucHJvcHMgPSBbXSkpLnB1c2gocmFuZ2VTZXRJdGVtKHsgbmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlLCBkeW5hbWljOiBkeW5hbWljIH0sIHJhbmdlKSk7XG4gICAgZWwucGxhaW4gPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEF0dHIgKGVsLCBuYW1lLCB2YWx1ZSwgcmFuZ2UsIGR5bmFtaWMpIHtcbiAgICB2YXIgYXR0cnMgPSBkeW5hbWljXG4gICAgICA/IChlbC5keW5hbWljQXR0cnMgfHwgKGVsLmR5bmFtaWNBdHRycyA9IFtdKSlcbiAgICAgIDogKGVsLmF0dHJzIHx8IChlbC5hdHRycyA9IFtdKSk7XG4gICAgYXR0cnMucHVzaChyYW5nZVNldEl0ZW0oeyBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUsIGR5bmFtaWM6IGR5bmFtaWMgfSwgcmFuZ2UpKTtcbiAgICBlbC5wbGFpbiA9IGZhbHNlO1xuICB9XG5cbiAgLy8gYWRkIGEgcmF3IGF0dHIgKHVzZSB0aGlzIGluIHByZVRyYW5zZm9ybXMpXG4gIGZ1bmN0aW9uIGFkZFJhd0F0dHIgKGVsLCBuYW1lLCB2YWx1ZSwgcmFuZ2UpIHtcbiAgICBlbC5hdHRyc01hcFtuYW1lXSA9IHZhbHVlO1xuICAgIGVsLmF0dHJzTGlzdC5wdXNoKHJhbmdlU2V0SXRlbSh7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSB9LCByYW5nZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkRGlyZWN0aXZlIChcbiAgICBlbCxcbiAgICBuYW1lLFxuICAgIHJhd05hbWUsXG4gICAgdmFsdWUsXG4gICAgYXJnLFxuICAgIGlzRHluYW1pY0FyZyxcbiAgICBtb2RpZmllcnMsXG4gICAgcmFuZ2VcbiAgKSB7XG4gICAgKGVsLmRpcmVjdGl2ZXMgfHwgKGVsLmRpcmVjdGl2ZXMgPSBbXSkpLnB1c2gocmFuZ2VTZXRJdGVtKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICByYXdOYW1lOiByYXdOYW1lLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgYXJnOiBhcmcsXG4gICAgICBpc0R5bmFtaWNBcmc6IGlzRHluYW1pY0FyZyxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzXG4gICAgfSwgcmFuZ2UpKTtcbiAgICBlbC5wbGFpbiA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlcGVuZE1vZGlmaWVyTWFya2VyIChzeW1ib2wsIG5hbWUsIGR5bmFtaWMpIHtcbiAgICByZXR1cm4gZHluYW1pY1xuICAgICAgPyAoXCJfcChcIiArIG5hbWUgKyBcIixcXFwiXCIgKyBzeW1ib2wgKyBcIlxcXCIpXCIpXG4gICAgICA6IHN5bWJvbCArIG5hbWUgLy8gbWFyayB0aGUgZXZlbnQgYXMgY2FwdHVyZWRcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEhhbmRsZXIgKFxuICAgIGVsLFxuICAgIG5hbWUsXG4gICAgdmFsdWUsXG4gICAgbW9kaWZpZXJzLFxuICAgIGltcG9ydGFudCxcbiAgICB3YXJuLFxuICAgIHJhbmdlLFxuICAgIGR5bmFtaWNcbiAgKSB7XG4gICAgbW9kaWZpZXJzID0gbW9kaWZpZXJzIHx8IGVtcHR5T2JqZWN0O1xuICAgIC8vIHdhcm4gcHJldmVudCBhbmQgcGFzc2l2ZSBtb2RpZmllclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChcbiAgICAgIHdhcm4gJiZcbiAgICAgIG1vZGlmaWVycy5wcmV2ZW50ICYmIG1vZGlmaWVycy5wYXNzaXZlXG4gICAgKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAncGFzc2l2ZSBhbmQgcHJldmVudCBjYW5cXCd0IGJlIHVzZWQgdG9nZXRoZXIuICcgK1xuICAgICAgICAnUGFzc2l2ZSBoYW5kbGVyIGNhblxcJ3QgcHJldmVudCBkZWZhdWx0IGV2ZW50LicsXG4gICAgICAgIHJhbmdlXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIG5vcm1hbGl6ZSBjbGljay5yaWdodCBhbmQgY2xpY2subWlkZGxlIHNpbmNlIHRoZXkgZG9uJ3QgYWN0dWFsbHkgZmlyZVxuICAgIC8vIHRoaXMgaXMgdGVjaG5pY2FsbHkgYnJvd3Nlci1zcGVjaWZpYywgYnV0IGF0IGxlYXN0IGZvciBub3cgYnJvd3NlcnMgYXJlXG4gICAgLy8gdGhlIG9ubHkgdGFyZ2V0IGVudnMgdGhhdCBoYXZlIHJpZ2h0L21pZGRsZSBjbGlja3MuXG4gICAgaWYgKG1vZGlmaWVycy5yaWdodCkge1xuICAgICAgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgbmFtZSA9IFwiKFwiICsgbmFtZSArIFwiKT09PSdjbGljayc/J2NvbnRleHRtZW51JzooXCIgKyBuYW1lICsgXCIpXCI7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdjbGljaycpIHtcbiAgICAgICAgbmFtZSA9ICdjb250ZXh0bWVudSc7XG4gICAgICAgIGRlbGV0ZSBtb2RpZmllcnMucmlnaHQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2RpZmllcnMubWlkZGxlKSB7XG4gICAgICBpZiAoZHluYW1pYykge1xuICAgICAgICBuYW1lID0gXCIoXCIgKyBuYW1lICsgXCIpPT09J2NsaWNrJz8nbW91c2V1cCc6KFwiICsgbmFtZSArIFwiKVwiO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnY2xpY2snKSB7XG4gICAgICAgIG5hbWUgPSAnbW91c2V1cCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgY2FwdHVyZSBtb2RpZmllclxuICAgIGlmIChtb2RpZmllcnMuY2FwdHVyZSkge1xuICAgICAgZGVsZXRlIG1vZGlmaWVycy5jYXB0dXJlO1xuICAgICAgbmFtZSA9IHByZXBlbmRNb2RpZmllck1hcmtlcignIScsIG5hbWUsIGR5bmFtaWMpO1xuICAgIH1cbiAgICBpZiAobW9kaWZpZXJzLm9uY2UpIHtcbiAgICAgIGRlbGV0ZSBtb2RpZmllcnMub25jZTtcbiAgICAgIG5hbWUgPSBwcmVwZW5kTW9kaWZpZXJNYXJrZXIoJ34nLCBuYW1lLCBkeW5hbWljKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKG1vZGlmaWVycy5wYXNzaXZlKSB7XG4gICAgICBkZWxldGUgbW9kaWZpZXJzLnBhc3NpdmU7XG4gICAgICBuYW1lID0gcHJlcGVuZE1vZGlmaWVyTWFya2VyKCcmJywgbmFtZSwgZHluYW1pYyk7XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50cztcbiAgICBpZiAobW9kaWZpZXJzLm5hdGl2ZSkge1xuICAgICAgZGVsZXRlIG1vZGlmaWVycy5uYXRpdmU7XG4gICAgICBldmVudHMgPSBlbC5uYXRpdmVFdmVudHMgfHwgKGVsLm5hdGl2ZUV2ZW50cyA9IHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzID0gZWwuZXZlbnRzIHx8IChlbC5ldmVudHMgPSB7fSk7XG4gICAgfVxuXG4gICAgdmFyIG5ld0hhbmRsZXIgPSByYW5nZVNldEl0ZW0oeyB2YWx1ZTogdmFsdWUudHJpbSgpLCBkeW5hbWljOiBkeW5hbWljIH0sIHJhbmdlKTtcbiAgICBpZiAobW9kaWZpZXJzICE9PSBlbXB0eU9iamVjdCkge1xuICAgICAgbmV3SGFuZGxlci5tb2RpZmllcnMgPSBtb2RpZmllcnM7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXJzID0gZXZlbnRzW25hbWVdO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChBcnJheS5pc0FycmF5KGhhbmRsZXJzKSkge1xuICAgICAgaW1wb3J0YW50ID8gaGFuZGxlcnMudW5zaGlmdChuZXdIYW5kbGVyKSA6IGhhbmRsZXJzLnB1c2gobmV3SGFuZGxlcik7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVycykge1xuICAgICAgZXZlbnRzW25hbWVdID0gaW1wb3J0YW50ID8gW25ld0hhbmRsZXIsIGhhbmRsZXJzXSA6IFtoYW5kbGVycywgbmV3SGFuZGxlcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tuYW1lXSA9IG5ld0hhbmRsZXI7XG4gICAgfVxuXG4gICAgZWwucGxhaW4gPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJhd0JpbmRpbmdBdHRyIChcbiAgICBlbCxcbiAgICBuYW1lXG4gICkge1xuICAgIHJldHVybiBlbC5yYXdBdHRyc01hcFsnOicgKyBuYW1lXSB8fFxuICAgICAgZWwucmF3QXR0cnNNYXBbJ3YtYmluZDonICsgbmFtZV0gfHxcbiAgICAgIGVsLnJhd0F0dHJzTWFwW25hbWVdXG4gIH1cblxuICBmdW5jdGlvbiBnZXRCaW5kaW5nQXR0ciAoXG4gICAgZWwsXG4gICAgbmFtZSxcbiAgICBnZXRTdGF0aWNcbiAgKSB7XG4gICAgdmFyIGR5bmFtaWNWYWx1ZSA9XG4gICAgICBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnOicgKyBuYW1lKSB8fFxuICAgICAgZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtYmluZDonICsgbmFtZSk7XG4gICAgaWYgKGR5bmFtaWNWYWx1ZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gcGFyc2VGaWx0ZXJzKGR5bmFtaWNWYWx1ZSlcbiAgICB9IGVsc2UgaWYgKGdldFN0YXRpYyAhPT0gZmFsc2UpIHtcbiAgICAgIHZhciBzdGF0aWNWYWx1ZSA9IGdldEFuZFJlbW92ZUF0dHIoZWwsIG5hbWUpO1xuICAgICAgaWYgKHN0YXRpY1ZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHN0YXRpY1ZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGU6IHRoaXMgb25seSByZW1vdmVzIHRoZSBhdHRyIGZyb20gdGhlIEFycmF5IChhdHRyc0xpc3QpIHNvIHRoYXQgaXRcbiAgLy8gZG9lc24ndCBnZXQgcHJvY2Vzc2VkIGJ5IHByb2Nlc3NBdHRycy5cbiAgLy8gQnkgZGVmYXVsdCBpdCBkb2VzIE5PVCByZW1vdmUgaXQgZnJvbSB0aGUgbWFwIChhdHRyc01hcCkgYmVjYXVzZSB0aGUgbWFwIGlzXG4gIC8vIG5lZWRlZCBkdXJpbmcgY29kZWdlbi5cbiAgZnVuY3Rpb24gZ2V0QW5kUmVtb3ZlQXR0ciAoXG4gICAgZWwsXG4gICAgbmFtZSxcbiAgICByZW1vdmVGcm9tTWFwXG4gICkge1xuICAgIHZhciB2YWw7XG4gICAgaWYgKCh2YWwgPSBlbC5hdHRyc01hcFtuYW1lXSkgIT0gbnVsbCkge1xuICAgICAgdmFyIGxpc3QgPSBlbC5hdHRyc0xpc3Q7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZW1vdmVGcm9tTWFwKSB7XG4gICAgICBkZWxldGUgZWwuYXR0cnNNYXBbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuZFJlbW92ZUF0dHJCeVJlZ2V4IChcbiAgICBlbCxcbiAgICBuYW1lXG4gICkge1xuICAgIHZhciBsaXN0ID0gZWwuYXR0cnNMaXN0O1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhdHRyID0gbGlzdFtpXTtcbiAgICAgIGlmIChuYW1lLnRlc3QoYXR0ci5uYW1lKSkge1xuICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuIGF0dHJcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByYW5nZVNldEl0ZW0gKFxuICAgIGl0ZW0sXG4gICAgcmFuZ2VcbiAgKSB7XG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICBpZiAocmFuZ2Uuc3RhcnQgIT0gbnVsbCkge1xuICAgICAgICBpdGVtLnN0YXJ0ID0gcmFuZ2Uuc3RhcnQ7XG4gICAgICB9XG4gICAgICBpZiAocmFuZ2UuZW5kICE9IG51bGwpIHtcbiAgICAgICAgaXRlbS5lbmQgPSByYW5nZS5lbmQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtXG4gIH1cblxuICAvKiAgKi9cblxuICAvKipcbiAgICogQ3Jvc3MtcGxhdGZvcm0gY29kZSBnZW5lcmF0aW9uIGZvciBjb21wb25lbnQgdi1tb2RlbFxuICAgKi9cbiAgZnVuY3Rpb24gZ2VuQ29tcG9uZW50TW9kZWwgKFxuICAgIGVsLFxuICAgIHZhbHVlLFxuICAgIG1vZGlmaWVyc1xuICApIHtcbiAgICB2YXIgcmVmID0gbW9kaWZpZXJzIHx8IHt9O1xuICAgIHZhciBudW1iZXIgPSByZWYubnVtYmVyO1xuICAgIHZhciB0cmltID0gcmVmLnRyaW07XG5cbiAgICB2YXIgYmFzZVZhbHVlRXhwcmVzc2lvbiA9ICckJHYnO1xuICAgIHZhciB2YWx1ZUV4cHJlc3Npb24gPSBiYXNlVmFsdWVFeHByZXNzaW9uO1xuICAgIGlmICh0cmltKSB7XG4gICAgICB2YWx1ZUV4cHJlc3Npb24gPVxuICAgICAgICBcIih0eXBlb2YgXCIgKyBiYXNlVmFsdWVFeHByZXNzaW9uICsgXCIgPT09ICdzdHJpbmcnXCIgK1xuICAgICAgICBcIj8gXCIgKyBiYXNlVmFsdWVFeHByZXNzaW9uICsgXCIudHJpbSgpXCIgK1xuICAgICAgICBcIjogXCIgKyBiYXNlVmFsdWVFeHByZXNzaW9uICsgXCIpXCI7XG4gICAgfVxuICAgIGlmIChudW1iZXIpIHtcbiAgICAgIHZhbHVlRXhwcmVzc2lvbiA9IFwiX24oXCIgKyB2YWx1ZUV4cHJlc3Npb24gKyBcIilcIjtcbiAgICB9XG4gICAgdmFyIGFzc2lnbm1lbnQgPSBnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgdmFsdWVFeHByZXNzaW9uKTtcblxuICAgIGVsLm1vZGVsID0ge1xuICAgICAgdmFsdWU6IChcIihcIiArIHZhbHVlICsgXCIpXCIpLFxuICAgICAgZXhwcmVzc2lvbjogSlNPTi5zdHJpbmdpZnkodmFsdWUpLFxuICAgICAgY2FsbGJhY2s6IChcImZ1bmN0aW9uIChcIiArIGJhc2VWYWx1ZUV4cHJlc3Npb24gKyBcIikge1wiICsgYXNzaWdubWVudCArIFwifVwiKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3Jvc3MtcGxhdGZvcm0gY29kZWdlbiBoZWxwZXIgZm9yIGdlbmVyYXRpbmcgdi1tb2RlbCB2YWx1ZSBhc3NpZ25tZW50IGNvZGUuXG4gICAqL1xuICBmdW5jdGlvbiBnZW5Bc3NpZ25tZW50Q29kZSAoXG4gICAgdmFsdWUsXG4gICAgYXNzaWdubWVudFxuICApIHtcbiAgICB2YXIgcmVzID0gcGFyc2VNb2RlbCh2YWx1ZSk7XG4gICAgaWYgKHJlcy5rZXkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAodmFsdWUgKyBcIj1cIiArIGFzc2lnbm1lbnQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCIkc2V0KFwiICsgKHJlcy5leHApICsgXCIsIFwiICsgKHJlcy5rZXkpICsgXCIsIFwiICsgYXNzaWdubWVudCArIFwiKVwiKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBhIHYtbW9kZWwgZXhwcmVzc2lvbiBpbnRvIGEgYmFzZSBwYXRoIGFuZCBhIGZpbmFsIGtleSBzZWdtZW50LlxuICAgKiBIYW5kbGVzIGJvdGggZG90LXBhdGggYW5kIHBvc3NpYmxlIHNxdWFyZSBicmFja2V0cy5cbiAgICpcbiAgICogUG9zc2libGUgY2FzZXM6XG4gICAqXG4gICAqIC0gdGVzdFxuICAgKiAtIHRlc3Rba2V5XVxuICAgKiAtIHRlc3RbdGVzdDFba2V5XV1cbiAgICogLSB0ZXN0W1wiYVwiXVtrZXldXG4gICAqIC0geHh4LnRlc3RbYVthXS50ZXN0MVtrZXldXVxuICAgKiAtIHRlc3QueHh4LmFbXCJhc2FcIl1bdGVzdDFba2V5XV1cbiAgICpcbiAgICovXG5cbiAgdmFyIGxlbiwgc3RyLCBjaHIsIGluZGV4JDEsIGV4cHJlc3Npb25Qb3MsIGV4cHJlc3Npb25FbmRQb3M7XG5cblxuXG4gIGZ1bmN0aW9uIHBhcnNlTW9kZWwgKHZhbCkge1xuICAgIC8vIEZpeCBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlL3B1bGwvNzczMFxuICAgIC8vIGFsbG93IHYtbW9kZWw9XCJvYmoudmFsIFwiICh0cmFpbGluZyB3aGl0ZXNwYWNlKVxuICAgIHZhbCA9IHZhbC50cmltKCk7XG4gICAgbGVuID0gdmFsLmxlbmd0aDtcblxuICAgIGlmICh2YWwuaW5kZXhPZignWycpIDwgMCB8fCB2YWwubGFzdEluZGV4T2YoJ10nKSA8IGxlbiAtIDEpIHtcbiAgICAgIGluZGV4JDEgPSB2YWwubGFzdEluZGV4T2YoJy4nKTtcbiAgICAgIGlmIChpbmRleCQxID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBleHA6IHZhbC5zbGljZSgwLCBpbmRleCQxKSxcbiAgICAgICAgICBrZXk6ICdcIicgKyB2YWwuc2xpY2UoaW5kZXgkMSArIDEpICsgJ1wiJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGV4cDogdmFsLFxuICAgICAgICAgIGtleTogbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RyID0gdmFsO1xuICAgIGluZGV4JDEgPSBleHByZXNzaW9uUG9zID0gZXhwcmVzc2lvbkVuZFBvcyA9IDA7XG5cbiAgICB3aGlsZSAoIWVvZigpKSB7XG4gICAgICBjaHIgPSBuZXh0KCk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChpc1N0cmluZ1N0YXJ0KGNocikpIHtcbiAgICAgICAgcGFyc2VTdHJpbmcoY2hyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAweDVCKSB7XG4gICAgICAgIHBhcnNlQnJhY2tldChjaHIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleHA6IHZhbC5zbGljZSgwLCBleHByZXNzaW9uUG9zKSxcbiAgICAgIGtleTogdmFsLnNsaWNlKGV4cHJlc3Npb25Qb3MgKyAxLCBleHByZXNzaW9uRW5kUG9zKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHQgKCkge1xuICAgIHJldHVybiBzdHIuY2hhckNvZGVBdCgrK2luZGV4JDEpXG4gIH1cblxuICBmdW5jdGlvbiBlb2YgKCkge1xuICAgIHJldHVybiBpbmRleCQxID49IGxlblxuICB9XG5cbiAgZnVuY3Rpb24gaXNTdHJpbmdTdGFydCAoY2hyKSB7XG4gICAgcmV0dXJuIGNociA9PT0gMHgyMiB8fCBjaHIgPT09IDB4MjdcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQnJhY2tldCAoY2hyKSB7XG4gICAgdmFyIGluQnJhY2tldCA9IDE7XG4gICAgZXhwcmVzc2lvblBvcyA9IGluZGV4JDE7XG4gICAgd2hpbGUgKCFlb2YoKSkge1xuICAgICAgY2hyID0gbmV4dCgpO1xuICAgICAgaWYgKGlzU3RyaW5nU3RhcnQoY2hyKSkge1xuICAgICAgICBwYXJzZVN0cmluZyhjaHIpO1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgaWYgKGNociA9PT0gMHg1QikgeyBpbkJyYWNrZXQrKzsgfVxuICAgICAgaWYgKGNociA9PT0gMHg1RCkgeyBpbkJyYWNrZXQtLTsgfVxuICAgICAgaWYgKGluQnJhY2tldCA9PT0gMCkge1xuICAgICAgICBleHByZXNzaW9uRW5kUG9zID0gaW5kZXgkMTtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVN0cmluZyAoY2hyKSB7XG4gICAgdmFyIHN0cmluZ1F1b3RlID0gY2hyO1xuICAgIHdoaWxlICghZW9mKCkpIHtcbiAgICAgIGNociA9IG5leHQoKTtcbiAgICAgIGlmIChjaHIgPT09IHN0cmluZ1F1b3RlKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIHdhcm4kMTtcblxuICAvLyBpbiBzb21lIGNhc2VzLCB0aGUgZXZlbnQgdXNlZCBoYXMgdG8gYmUgZGV0ZXJtaW5lZCBhdCBydW50aW1lXG4gIC8vIHNvIHdlIHVzZWQgc29tZSByZXNlcnZlZCB0b2tlbnMgZHVyaW5nIGNvbXBpbGUuXG4gIHZhciBSQU5HRV9UT0tFTiA9ICdfX3InO1xuICB2YXIgQ0hFQ0tCT1hfUkFESU9fVE9LRU4gPSAnX19jJztcblxuICBmdW5jdGlvbiBtb2RlbCAoXG4gICAgZWwsXG4gICAgZGlyLFxuICAgIF93YXJuXG4gICkge1xuICAgIHdhcm4kMSA9IF93YXJuO1xuICAgIHZhciB2YWx1ZSA9IGRpci52YWx1ZTtcbiAgICB2YXIgbW9kaWZpZXJzID0gZGlyLm1vZGlmaWVycztcbiAgICB2YXIgdGFnID0gZWwudGFnO1xuICAgIHZhciB0eXBlID0gZWwuYXR0cnNNYXAudHlwZTtcblxuICAgIHtcbiAgICAgIC8vIGlucHV0cyB3aXRoIHR5cGU9XCJmaWxlXCIgYXJlIHJlYWQgb25seSBhbmQgc2V0dGluZyB0aGUgaW5wdXQnc1xuICAgICAgLy8gdmFsdWUgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICAgIGlmICh0YWcgPT09ICdpbnB1dCcgJiYgdHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIHdhcm4kMShcbiAgICAgICAgICBcIjxcIiArIChlbC50YWcpICsgXCIgdi1tb2RlbD1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIiB0eXBlPVxcXCJmaWxlXFxcIj46XFxuXCIgK1xuICAgICAgICAgIFwiRmlsZSBpbnB1dHMgYXJlIHJlYWQgb25seS4gVXNlIGEgdi1vbjpjaGFuZ2UgbGlzdGVuZXIgaW5zdGVhZC5cIixcbiAgICAgICAgICBlbC5yYXdBdHRyc01hcFsndi1tb2RlbCddXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVsLmNvbXBvbmVudCkge1xuICAgICAgZ2VuQ29tcG9uZW50TW9kZWwoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xuICAgICAgLy8gY29tcG9uZW50IHYtbW9kZWwgZG9lc24ndCBuZWVkIGV4dHJhIHJ1bnRpbWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgICAgZ2VuU2VsZWN0KGVsLCB2YWx1ZSwgbW9kaWZpZXJzKTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ2lucHV0JyAmJiB0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBnZW5DaGVja2JveE1vZGVsKGVsLCB2YWx1ZSwgbW9kaWZpZXJzKTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ2lucHV0JyAmJiB0eXBlID09PSAncmFkaW8nKSB7XG4gICAgICBnZW5SYWRpb01vZGVsKGVsLCB2YWx1ZSwgbW9kaWZpZXJzKTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ2lucHV0JyB8fCB0YWcgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgIGdlbkRlZmF1bHRNb2RlbChlbCwgdmFsdWUsIG1vZGlmaWVycyk7XG4gICAgfSBlbHNlIGlmICghY29uZmlnLmlzUmVzZXJ2ZWRUYWcodGFnKSkge1xuICAgICAgZ2VuQ29tcG9uZW50TW9kZWwoZWwsIHZhbHVlLCBtb2RpZmllcnMpO1xuICAgICAgLy8gY29tcG9uZW50IHYtbW9kZWwgZG9lc24ndCBuZWVkIGV4dHJhIHJ1bnRpbWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuJDEoXG4gICAgICAgIFwiPFwiICsgKGVsLnRhZykgKyBcIiB2LW1vZGVsPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiPjogXCIgK1xuICAgICAgICBcInYtbW9kZWwgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIGVsZW1lbnQgdHlwZS4gXCIgK1xuICAgICAgICAnSWYgeW91IGFyZSB3b3JraW5nIHdpdGggY29udGVudGVkaXRhYmxlLCBpdFxcJ3MgcmVjb21tZW5kZWQgdG8gJyArXG4gICAgICAgICd3cmFwIGEgbGlicmFyeSBkZWRpY2F0ZWQgZm9yIHRoYXQgcHVycG9zZSBpbnNpZGUgYSBjdXN0b20gY29tcG9uZW50LicsXG4gICAgICAgIGVsLnJhd0F0dHJzTWFwWyd2LW1vZGVsJ11cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIHJ1bnRpbWUgZGlyZWN0aXZlIG1ldGFkYXRhXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkNoZWNrYm94TW9kZWwgKFxuICAgIGVsLFxuICAgIHZhbHVlLFxuICAgIG1vZGlmaWVyc1xuICApIHtcbiAgICB2YXIgbnVtYmVyID0gbW9kaWZpZXJzICYmIG1vZGlmaWVycy5udW1iZXI7XG4gICAgdmFyIHZhbHVlQmluZGluZyA9IGdldEJpbmRpbmdBdHRyKGVsLCAndmFsdWUnKSB8fCAnbnVsbCc7XG4gICAgdmFyIHRydWVWYWx1ZUJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3RydWUtdmFsdWUnKSB8fCAndHJ1ZSc7XG4gICAgdmFyIGZhbHNlVmFsdWVCaW5kaW5nID0gZ2V0QmluZGluZ0F0dHIoZWwsICdmYWxzZS12YWx1ZScpIHx8ICdmYWxzZSc7XG4gICAgYWRkUHJvcChlbCwgJ2NoZWNrZWQnLFxuICAgICAgXCJBcnJheS5pc0FycmF5KFwiICsgdmFsdWUgKyBcIilcIiArXG4gICAgICBcIj9faShcIiArIHZhbHVlICsgXCIsXCIgKyB2YWx1ZUJpbmRpbmcgKyBcIik+LTFcIiArIChcbiAgICAgICAgdHJ1ZVZhbHVlQmluZGluZyA9PT0gJ3RydWUnXG4gICAgICAgICAgPyAoXCI6KFwiICsgdmFsdWUgKyBcIilcIilcbiAgICAgICAgICA6IChcIjpfcShcIiArIHZhbHVlICsgXCIsXCIgKyB0cnVlVmFsdWVCaW5kaW5nICsgXCIpXCIpXG4gICAgICApXG4gICAgKTtcbiAgICBhZGRIYW5kbGVyKGVsLCAnY2hhbmdlJyxcbiAgICAgIFwidmFyICQkYT1cIiArIHZhbHVlICsgXCIsXCIgK1xuICAgICAgICAgICckJGVsPSRldmVudC50YXJnZXQsJyArXG4gICAgICAgICAgXCIkJGM9JCRlbC5jaGVja2VkPyhcIiArIHRydWVWYWx1ZUJpbmRpbmcgKyBcIik6KFwiICsgZmFsc2VWYWx1ZUJpbmRpbmcgKyBcIik7XCIgK1xuICAgICAgJ2lmKEFycmF5LmlzQXJyYXkoJCRhKSl7JyArXG4gICAgICAgIFwidmFyICQkdj1cIiArIChudW1iZXIgPyAnX24oJyArIHZhbHVlQmluZGluZyArICcpJyA6IHZhbHVlQmluZGluZykgKyBcIixcIiArXG4gICAgICAgICAgICAnJCRpPV9pKCQkYSwkJHYpOycgK1xuICAgICAgICBcImlmKCQkZWwuY2hlY2tlZCl7JCRpPDAmJihcIiArIChnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgJyQkYS5jb25jYXQoWyQkdl0pJykpICsgXCIpfVwiICtcbiAgICAgICAgXCJlbHNleyQkaT4tMSYmKFwiICsgKGdlbkFzc2lnbm1lbnRDb2RlKHZhbHVlLCAnJCRhLnNsaWNlKDAsJCRpKS5jb25jYXQoJCRhLnNsaWNlKCQkaSsxKSknKSkgKyBcIil9XCIgK1xuICAgICAgXCJ9ZWxzZXtcIiArIChnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgJyQkYycpKSArIFwifVwiLFxuICAgICAgbnVsbCwgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5SYWRpb01vZGVsIChcbiAgICBlbCxcbiAgICB2YWx1ZSxcbiAgICBtb2RpZmllcnNcbiAgKSB7XG4gICAgdmFyIG51bWJlciA9IG1vZGlmaWVycyAmJiBtb2RpZmllcnMubnVtYmVyO1xuICAgIHZhciB2YWx1ZUJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3ZhbHVlJykgfHwgJ251bGwnO1xuICAgIHZhbHVlQmluZGluZyA9IG51bWJlciA/IChcIl9uKFwiICsgdmFsdWVCaW5kaW5nICsgXCIpXCIpIDogdmFsdWVCaW5kaW5nO1xuICAgIGFkZFByb3AoZWwsICdjaGVja2VkJywgKFwiX3EoXCIgKyB2YWx1ZSArIFwiLFwiICsgdmFsdWVCaW5kaW5nICsgXCIpXCIpKTtcbiAgICBhZGRIYW5kbGVyKGVsLCAnY2hhbmdlJywgZ2VuQXNzaWdubWVudENvZGUodmFsdWUsIHZhbHVlQmluZGluZyksIG51bGwsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuU2VsZWN0IChcbiAgICBlbCxcbiAgICB2YWx1ZSxcbiAgICBtb2RpZmllcnNcbiAgKSB7XG4gICAgdmFyIG51bWJlciA9IG1vZGlmaWVycyAmJiBtb2RpZmllcnMubnVtYmVyO1xuICAgIHZhciBzZWxlY3RlZFZhbCA9IFwiQXJyYXkucHJvdG90eXBlLmZpbHRlclwiICtcbiAgICAgIFwiLmNhbGwoJGV2ZW50LnRhcmdldC5vcHRpb25zLGZ1bmN0aW9uKG8pe3JldHVybiBvLnNlbGVjdGVkfSlcIiArXG4gICAgICBcIi5tYXAoZnVuY3Rpb24obyl7dmFyIHZhbCA9IFxcXCJfdmFsdWVcXFwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWU7XCIgK1xuICAgICAgXCJyZXR1cm4gXCIgKyAobnVtYmVyID8gJ19uKHZhbCknIDogJ3ZhbCcpICsgXCJ9KVwiO1xuXG4gICAgdmFyIGFzc2lnbm1lbnQgPSAnJGV2ZW50LnRhcmdldC5tdWx0aXBsZSA/ICQkc2VsZWN0ZWRWYWwgOiAkJHNlbGVjdGVkVmFsWzBdJztcbiAgICB2YXIgY29kZSA9IFwidmFyICQkc2VsZWN0ZWRWYWwgPSBcIiArIHNlbGVjdGVkVmFsICsgXCI7XCI7XG4gICAgY29kZSA9IGNvZGUgKyBcIiBcIiArIChnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgYXNzaWdubWVudCkpO1xuICAgIGFkZEhhbmRsZXIoZWwsICdjaGFuZ2UnLCBjb2RlLCBudWxsLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkRlZmF1bHRNb2RlbCAoXG4gICAgZWwsXG4gICAgdmFsdWUsXG4gICAgbW9kaWZpZXJzXG4gICkge1xuICAgIHZhciB0eXBlID0gZWwuYXR0cnNNYXAudHlwZTtcblxuICAgIC8vIHdhcm4gaWYgdi1iaW5kOnZhbHVlIGNvbmZsaWN0cyB3aXRoIHYtbW9kZWxcbiAgICAvLyBleGNlcHQgZm9yIGlucHV0cyB3aXRoIHYtYmluZDp0eXBlXG4gICAge1xuICAgICAgdmFyIHZhbHVlJDEgPSBlbC5hdHRyc01hcFsndi1iaW5kOnZhbHVlJ10gfHwgZWwuYXR0cnNNYXBbJzp2YWx1ZSddO1xuICAgICAgdmFyIHR5cGVCaW5kaW5nID0gZWwuYXR0cnNNYXBbJ3YtYmluZDp0eXBlJ10gfHwgZWwuYXR0cnNNYXBbJzp0eXBlJ107XG4gICAgICBpZiAodmFsdWUkMSAmJiAhdHlwZUJpbmRpbmcpIHtcbiAgICAgICAgdmFyIGJpbmRpbmcgPSBlbC5hdHRyc01hcFsndi1iaW5kOnZhbHVlJ10gPyAndi1iaW5kOnZhbHVlJyA6ICc6dmFsdWUnO1xuICAgICAgICB3YXJuJDEoXG4gICAgICAgICAgYmluZGluZyArIFwiPVxcXCJcIiArIHZhbHVlJDEgKyBcIlxcXCIgY29uZmxpY3RzIHdpdGggdi1tb2RlbCBvbiB0aGUgc2FtZSBlbGVtZW50IFwiICtcbiAgICAgICAgICAnYmVjYXVzZSB0aGUgbGF0dGVyIGFscmVhZHkgZXhwYW5kcyB0byBhIHZhbHVlIGJpbmRpbmcgaW50ZXJuYWxseScsXG4gICAgICAgICAgZWwucmF3QXR0cnNNYXBbYmluZGluZ11cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVmID0gbW9kaWZpZXJzIHx8IHt9O1xuICAgIHZhciBsYXp5ID0gcmVmLmxhenk7XG4gICAgdmFyIG51bWJlciA9IHJlZi5udW1iZXI7XG4gICAgdmFyIHRyaW0gPSByZWYudHJpbTtcbiAgICB2YXIgbmVlZENvbXBvc2l0aW9uR3VhcmQgPSAhbGF6eSAmJiB0eXBlICE9PSAncmFuZ2UnO1xuICAgIHZhciBldmVudCA9IGxhenlcbiAgICAgID8gJ2NoYW5nZSdcbiAgICAgIDogdHlwZSA9PT0gJ3JhbmdlJ1xuICAgICAgICA/IFJBTkdFX1RPS0VOXG4gICAgICAgIDogJ2lucHV0JztcblxuICAgIHZhciB2YWx1ZUV4cHJlc3Npb24gPSAnJGV2ZW50LnRhcmdldC52YWx1ZSc7XG4gICAgaWYgKHRyaW0pIHtcbiAgICAgIHZhbHVlRXhwcmVzc2lvbiA9IFwiJGV2ZW50LnRhcmdldC52YWx1ZS50cmltKClcIjtcbiAgICB9XG4gICAgaWYgKG51bWJlcikge1xuICAgICAgdmFsdWVFeHByZXNzaW9uID0gXCJfbihcIiArIHZhbHVlRXhwcmVzc2lvbiArIFwiKVwiO1xuICAgIH1cblxuICAgIHZhciBjb2RlID0gZ2VuQXNzaWdubWVudENvZGUodmFsdWUsIHZhbHVlRXhwcmVzc2lvbik7XG4gICAgaWYgKG5lZWRDb21wb3NpdGlvbkd1YXJkKSB7XG4gICAgICBjb2RlID0gXCJpZigkZXZlbnQudGFyZ2V0LmNvbXBvc2luZylyZXR1cm47XCIgKyBjb2RlO1xuICAgIH1cblxuICAgIGFkZFByb3AoZWwsICd2YWx1ZScsIChcIihcIiArIHZhbHVlICsgXCIpXCIpKTtcbiAgICBhZGRIYW5kbGVyKGVsLCBldmVudCwgY29kZSwgbnVsbCwgdHJ1ZSk7XG4gICAgaWYgKHRyaW0gfHwgbnVtYmVyKSB7XG4gICAgICBhZGRIYW5kbGVyKGVsLCAnYmx1cicsICckZm9yY2VVcGRhdGUoKScpO1xuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8vIG5vcm1hbGl6ZSB2LW1vZGVsIGV2ZW50IHRva2VucyB0aGF0IGNhbiBvbmx5IGJlIGRldGVybWluZWQgYXQgcnVudGltZS5cbiAgLy8gaXQncyBpbXBvcnRhbnQgdG8gcGxhY2UgdGhlIGV2ZW50IGFzIHRoZSBmaXJzdCBpbiB0aGUgYXJyYXkgYmVjYXVzZVxuICAvLyB0aGUgd2hvbGUgcG9pbnQgaXMgZW5zdXJpbmcgdGhlIHYtbW9kZWwgY2FsbGJhY2sgZ2V0cyBjYWxsZWQgYmVmb3JlXG4gIC8vIHVzZXItYXR0YWNoZWQgaGFuZGxlcnMuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUV2ZW50cyAob24pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNEZWYob25bUkFOR0VfVE9LRU5dKSkge1xuICAgICAgLy8gSUUgaW5wdXRbdHlwZT1yYW5nZV0gb25seSBzdXBwb3J0cyBgY2hhbmdlYCBldmVudFxuICAgICAgdmFyIGV2ZW50ID0gaXNJRSA/ICdjaGFuZ2UnIDogJ2lucHV0JztcbiAgICAgIG9uW2V2ZW50XSA9IFtdLmNvbmNhdChvbltSQU5HRV9UT0tFTl0sIG9uW2V2ZW50XSB8fCBbXSk7XG4gICAgICBkZWxldGUgb25bUkFOR0VfVE9LRU5dO1xuICAgIH1cbiAgICAvLyBUaGlzIHdhcyBvcmlnaW5hbGx5IGludGVuZGVkIHRvIGZpeCAjNDUyMSBidXQgbm8gbG9uZ2VyIG5lY2Vzc2FyeVxuICAgIC8vIGFmdGVyIDIuNS4gS2VlcGluZyBpdCBmb3IgYmFja3dhcmRzIGNvbXBhdCB3aXRoIGdlbmVyYXRlZCBjb2RlIGZyb20gPCAyLjRcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoaXNEZWYob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dKSkge1xuICAgICAgb24uY2hhbmdlID0gW10uY29uY2F0KG9uW0NIRUNLQk9YX1JBRElPX1RPS0VOXSwgb24uY2hhbmdlIHx8IFtdKTtcbiAgICAgIGRlbGV0ZSBvbltDSEVDS0JPWF9SQURJT19UT0tFTl07XG4gICAgfVxuICB9XG5cbiAgdmFyIHRhcmdldCQxO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9uY2VIYW5kbGVyJDEgKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIF90YXJnZXQgPSB0YXJnZXQkMTsgLy8gc2F2ZSBjdXJyZW50IHRhcmdldCBlbGVtZW50IGluIGNsb3N1cmVcbiAgICByZXR1cm4gZnVuY3Rpb24gb25jZUhhbmRsZXIgKCkge1xuICAgICAgdmFyIHJlcyA9IGhhbmRsZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIGlmIChyZXMgIT09IG51bGwpIHtcbiAgICAgICAgcmVtb3ZlJDIoZXZlbnQsIG9uY2VIYW5kbGVyLCBjYXB0dXJlLCBfdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAjOTQ0NjogRmlyZWZveCA8PSA1MyAoaW4gcGFydGljdWxhciwgRVNSIDUyKSBoYXMgaW5jb3JyZWN0IEV2ZW50LnRpbWVTdGFtcFxuICAvLyBpbXBsZW1lbnRhdGlvbiBhbmQgZG9lcyBub3QgZmlyZSBtaWNyb3Rhc2tzIGluIGJldHdlZW4gZXZlbnQgcHJvcGFnYXRpb24sIHNvXG4gIC8vIHNhZmUgdG8gZXhjbHVkZS5cbiAgdmFyIHVzZU1pY3JvdGFza0ZpeCA9IGlzVXNpbmdNaWNyb1Rhc2sgJiYgIShpc0ZGICYmIE51bWJlcihpc0ZGWzFdKSA8PSA1Myk7XG5cbiAgZnVuY3Rpb24gYWRkJDEgKFxuICAgIG5hbWUsXG4gICAgaGFuZGxlcixcbiAgICBjYXB0dXJlLFxuICAgIHBhc3NpdmVcbiAgKSB7XG4gICAgLy8gYXN5bmMgZWRnZSBjYXNlICM2NTY2OiBpbm5lciBjbGljayBldmVudCB0cmlnZ2VycyBwYXRjaCwgZXZlbnQgaGFuZGxlclxuICAgIC8vIGF0dGFjaGVkIHRvIG91dGVyIGVsZW1lbnQgZHVyaW5nIHBhdGNoLCBhbmQgdHJpZ2dlcmVkIGFnYWluLiBUaGlzXG4gICAgLy8gaGFwcGVucyBiZWNhdXNlIGJyb3dzZXJzIGZpcmUgbWljcm90YXNrIHRpY2tzIGJldHdlZW4gZXZlbnQgcHJvcGFnYXRpb24uXG4gICAgLy8gdGhlIHNvbHV0aW9uIGlzIHNpbXBsZTogd2Ugc2F2ZSB0aGUgdGltZXN0YW1wIHdoZW4gYSBoYW5kbGVyIGlzIGF0dGFjaGVkLFxuICAgIC8vIGFuZCB0aGUgaGFuZGxlciB3b3VsZCBvbmx5IGZpcmUgaWYgdGhlIGV2ZW50IHBhc3NlZCB0byBpdCB3YXMgZmlyZWRcbiAgICAvLyBBRlRFUiBpdCB3YXMgYXR0YWNoZWQuXG4gICAgaWYgKHVzZU1pY3JvdGFza0ZpeCkge1xuICAgICAgdmFyIGF0dGFjaGVkVGltZXN0YW1wID0gY3VycmVudEZsdXNoVGltZXN0YW1wO1xuICAgICAgdmFyIG9yaWdpbmFsID0gaGFuZGxlcjtcbiAgICAgIGhhbmRsZXIgPSBvcmlnaW5hbC5fd3JhcHBlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAvLyBubyBidWJibGluZywgc2hvdWxkIGFsd2F5cyBmaXJlLlxuICAgICAgICAgIC8vIHRoaXMgaXMganVzdCBhIHNhZmV0eSBuZXQgaW4gY2FzZSBldmVudC50aW1lU3RhbXAgaXMgdW5yZWxpYWJsZSBpblxuICAgICAgICAgIC8vIGNlcnRhaW4gd2VpcmQgZW52aXJvbm1lbnRzLi4uXG4gICAgICAgICAgZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCB8fFxuICAgICAgICAgIC8vIGV2ZW50IGlzIGZpcmVkIGFmdGVyIGhhbmRsZXIgYXR0YWNobWVudFxuICAgICAgICAgIGUudGltZVN0YW1wID49IGF0dGFjaGVkVGltZXN0YW1wIHx8XG4gICAgICAgICAgLy8gYmFpbCBmb3IgZW52aXJvbm1lbnRzIHRoYXQgaGF2ZSBidWdneSBldmVudC50aW1lU3RhbXAgaW1wbGVtZW50YXRpb25zXG4gICAgICAgICAgLy8gIzk0NjIgaU9TIDkgYnVnOiBldmVudC50aW1lU3RhbXAgaXMgMCBhZnRlciBoaXN0b3J5LnB1c2hTdGF0ZVxuICAgICAgICAgIC8vICM5NjgxIFF0V2ViRW5naW5lIGV2ZW50LnRpbWVTdGFtcCBpcyBuZWdhdGl2ZSB2YWx1ZVxuICAgICAgICAgIGUudGltZVN0YW1wIDw9IDAgfHxcbiAgICAgICAgICAvLyAjOTQ0OCBiYWlsIGlmIGV2ZW50IGlzIGZpcmVkIGluIGFub3RoZXIgZG9jdW1lbnQgaW4gYSBtdWx0aS1wYWdlXG4gICAgICAgICAgLy8gZWxlY3Ryb24vbncuanMgYXBwLCBzaW5jZSBldmVudC50aW1lU3RhbXAgd2lsbCBiZSB1c2luZyBhIGRpZmZlcmVudFxuICAgICAgICAgIC8vIHN0YXJ0aW5nIHJlZmVyZW5jZVxuICAgICAgICAgIGUudGFyZ2V0Lm93bmVyRG9jdW1lbnQgIT09IGRvY3VtZW50XG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHRhcmdldCQxLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBuYW1lLFxuICAgICAgaGFuZGxlcixcbiAgICAgIHN1cHBvcnRzUGFzc2l2ZVxuICAgICAgICA/IHsgY2FwdHVyZTogY2FwdHVyZSwgcGFzc2l2ZTogcGFzc2l2ZSB9XG4gICAgICAgIDogY2FwdHVyZVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUkMiAoXG4gICAgbmFtZSxcbiAgICBoYW5kbGVyLFxuICAgIGNhcHR1cmUsXG4gICAgX3RhcmdldFxuICApIHtcbiAgICAoX3RhcmdldCB8fCB0YXJnZXQkMSkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgIG5hbWUsXG4gICAgICBoYW5kbGVyLl93cmFwcGVyIHx8IGhhbmRsZXIsXG4gICAgICBjYXB0dXJlXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURPTUxpc3RlbmVycyAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5vbikgJiYgaXNVbmRlZih2bm9kZS5kYXRhLm9uKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBvbiA9IHZub2RlLmRhdGEub24gfHwge307XG4gICAgdmFyIG9sZE9uID0gb2xkVm5vZGUuZGF0YS5vbiB8fCB7fTtcbiAgICB0YXJnZXQkMSA9IHZub2RlLmVsbTtcbiAgICBub3JtYWxpemVFdmVudHMob24pO1xuICAgIHVwZGF0ZUxpc3RlbmVycyhvbiwgb2xkT24sIGFkZCQxLCByZW1vdmUkMiwgY3JlYXRlT25jZUhhbmRsZXIkMSwgdm5vZGUuY29udGV4dCk7XG4gICAgdGFyZ2V0JDEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgZXZlbnRzID0ge1xuICAgIGNyZWF0ZTogdXBkYXRlRE9NTGlzdGVuZXJzLFxuICAgIHVwZGF0ZTogdXBkYXRlRE9NTGlzdGVuZXJzXG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIHN2Z0NvbnRhaW5lcjtcblxuICBmdW5jdGlvbiB1cGRhdGVET01Qcm9wcyAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgaWYgKGlzVW5kZWYob2xkVm5vZGUuZGF0YS5kb21Qcm9wcykgJiYgaXNVbmRlZih2bm9kZS5kYXRhLmRvbVByb3BzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBrZXksIGN1cjtcbiAgICB2YXIgZWxtID0gdm5vZGUuZWxtO1xuICAgIHZhciBvbGRQcm9wcyA9IG9sZFZub2RlLmRhdGEuZG9tUHJvcHMgfHwge307XG4gICAgdmFyIHByb3BzID0gdm5vZGUuZGF0YS5kb21Qcm9wcyB8fCB7fTtcbiAgICAvLyBjbG9uZSBvYnNlcnZlZCBvYmplY3RzLCBhcyB0aGUgdXNlciBwcm9iYWJseSB3YW50cyB0byBtdXRhdGUgaXRcbiAgICBpZiAoaXNEZWYocHJvcHMuX19vYl9fKSkge1xuICAgICAgcHJvcHMgPSB2bm9kZS5kYXRhLmRvbVByb3BzID0gZXh0ZW5kKHt9LCBwcm9wcyk7XG4gICAgfVxuXG4gICAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm9wcykpIHtcbiAgICAgICAgZWxtW2tleV0gPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgY3VyID0gcHJvcHNba2V5XTtcbiAgICAgIC8vIGlnbm9yZSBjaGlsZHJlbiBpZiB0aGUgbm9kZSBoYXMgdGV4dENvbnRlbnQgb3IgaW5uZXJIVE1MLFxuICAgICAgLy8gYXMgdGhlc2Ugd2lsbCB0aHJvdyBhd2F5IGV4aXN0aW5nIERPTSBub2RlcyBhbmQgY2F1c2UgcmVtb3ZhbCBlcnJvcnNcbiAgICAgIC8vIG9uIHN1YnNlcXVlbnQgcGF0Y2hlcyAoIzMzNjApXG4gICAgICBpZiAoa2V5ID09PSAndGV4dENvbnRlbnQnIHx8IGtleSA9PT0gJ2lubmVySFRNTCcpIHtcbiAgICAgICAgaWYgKHZub2RlLmNoaWxkcmVuKSB7IHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9IDA7IH1cbiAgICAgICAgaWYgKGN1ciA9PT0gb2xkUHJvcHNba2V5XSkgeyBjb250aW51ZSB9XG4gICAgICAgIC8vICM2NjAxIHdvcmsgYXJvdW5kIENocm9tZSB2ZXJzaW9uIDw9IDU1IGJ1ZyB3aGVyZSBzaW5nbGUgdGV4dE5vZGVcbiAgICAgICAgLy8gcmVwbGFjZWQgYnkgaW5uZXJIVE1ML3RleHRDb250ZW50IHJldGFpbnMgaXRzIHBhcmVudE5vZGUgcHJvcGVydHlcbiAgICAgICAgaWYgKGVsbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGVsbS5yZW1vdmVDaGlsZChlbG0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3ZhbHVlJyAmJiBlbG0udGFnTmFtZSAhPT0gJ1BST0dSRVNTJykge1xuICAgICAgICAvLyBzdG9yZSB2YWx1ZSBhcyBfdmFsdWUgYXMgd2VsbCBzaW5jZVxuICAgICAgICAvLyBub24tc3RyaW5nIHZhbHVlcyB3aWxsIGJlIHN0cmluZ2lmaWVkXG4gICAgICAgIGVsbS5fdmFsdWUgPSBjdXI7XG4gICAgICAgIC8vIGF2b2lkIHJlc2V0dGluZyBjdXJzb3IgcG9zaXRpb24gd2hlbiB2YWx1ZSBpcyB0aGUgc2FtZVxuICAgICAgICB2YXIgc3RyQ3VyID0gaXNVbmRlZihjdXIpID8gJycgOiBTdHJpbmcoY3VyKTtcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVZhbHVlKGVsbSwgc3RyQ3VyKSkge1xuICAgICAgICAgIGVsbS52YWx1ZSA9IHN0ckN1cjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdpbm5lckhUTUwnICYmIGlzU1ZHKGVsbS50YWdOYW1lKSAmJiBpc1VuZGVmKGVsbS5pbm5lckhUTUwpKSB7XG4gICAgICAgIC8vIElFIGRvZXNuJ3Qgc3VwcG9ydCBpbm5lckhUTUwgZm9yIFNWRyBlbGVtZW50c1xuICAgICAgICBzdmdDb250YWluZXIgPSBzdmdDb250YWluZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN2Z0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIjxzdmc+XCIgKyBjdXIgKyBcIjwvc3ZnPlwiO1xuICAgICAgICB2YXIgc3ZnID0gc3ZnQ29udGFpbmVyLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChlbG0uZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGVsbS5yZW1vdmVDaGlsZChlbG0uZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHN2Zy5maXJzdENoaWxkKSB7XG4gICAgICAgICAgZWxtLmFwcGVuZENoaWxkKHN2Zy5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgLy8gc2tpcCB0aGUgdXBkYXRlIGlmIG9sZCBhbmQgbmV3IFZET00gc3RhdGUgaXMgdGhlIHNhbWUuXG4gICAgICAgIC8vIGB2YWx1ZWAgaXMgaGFuZGxlZCBzZXBhcmF0ZWx5IGJlY2F1c2UgdGhlIERPTSB2YWx1ZSBtYXkgYmUgdGVtcG9yYXJpbHlcbiAgICAgICAgLy8gb3V0IG9mIHN5bmMgd2l0aCBWRE9NIHN0YXRlIGR1ZSB0byBmb2N1cywgY29tcG9zaXRpb24gYW5kIG1vZGlmaWVycy5cbiAgICAgICAgLy8gVGhpcyAgIzQ1MjEgYnkgc2tpcHBpbmcgdGhlIHVubmVjZXNzYXJ5IGBjaGVja2VkYCB1cGRhdGUuXG4gICAgICAgIGN1ciAhPT0gb2xkUHJvcHNba2V5XVxuICAgICAgKSB7XG4gICAgICAgIC8vIHNvbWUgcHJvcGVydHkgdXBkYXRlcyBjYW4gdGhyb3dcbiAgICAgICAgLy8gZS5nLiBgdmFsdWVgIG9uIDxwcm9ncmVzcz4gdy8gbm9uLWZpbml0ZSB2YWx1ZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsbVtrZXldID0gY3VyO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrIHBsYXRmb3Jtcy93ZWIvdXRpbC9hdHRycy5qcyBhY2NlcHRWYWx1ZVxuXG5cbiAgZnVuY3Rpb24gc2hvdWxkVXBkYXRlVmFsdWUgKGVsbSwgY2hlY2tWYWwpIHtcbiAgICByZXR1cm4gKCFlbG0uY29tcG9zaW5nICYmIChcbiAgICAgIGVsbS50YWdOYW1lID09PSAnT1BUSU9OJyB8fFxuICAgICAgaXNOb3RJbkZvY3VzQW5kRGlydHkoZWxtLCBjaGVja1ZhbCkgfHxcbiAgICAgIGlzRGlydHlXaXRoTW9kaWZpZXJzKGVsbSwgY2hlY2tWYWwpXG4gICAgKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm90SW5Gb2N1c0FuZERpcnR5IChlbG0sIGNoZWNrVmFsKSB7XG4gICAgLy8gcmV0dXJuIHRydWUgd2hlbiB0ZXh0Ym94ICgubnVtYmVyIGFuZCAudHJpbSkgbG9zZXMgZm9jdXMgYW5kIGl0cyB2YWx1ZSBpc1xuICAgIC8vIG5vdCBlcXVhbCB0byB0aGUgdXBkYXRlZCB2YWx1ZVxuICAgIHZhciBub3RJbkZvY3VzID0gdHJ1ZTtcbiAgICAvLyAjNjE1N1xuICAgIC8vIHdvcmsgYXJvdW5kIElFIGJ1ZyB3aGVuIGFjY2Vzc2luZyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluIGFuIGlmcmFtZVxuICAgIHRyeSB7IG5vdEluRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBlbG07IH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIG5vdEluRm9jdXMgJiYgZWxtLnZhbHVlICE9PSBjaGVja1ZhbFxuICB9XG5cbiAgZnVuY3Rpb24gaXNEaXJ0eVdpdGhNb2RpZmllcnMgKGVsbSwgbmV3VmFsKSB7XG4gICAgdmFyIHZhbHVlID0gZWxtLnZhbHVlO1xuICAgIHZhciBtb2RpZmllcnMgPSBlbG0uX3ZNb2RpZmllcnM7IC8vIGluamVjdGVkIGJ5IHYtbW9kZWwgcnVudGltZVxuICAgIGlmIChpc0RlZihtb2RpZmllcnMpKSB7XG4gICAgICBpZiAobW9kaWZpZXJzLm51bWJlcikge1xuICAgICAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpICE9PSB0b051bWJlcihuZXdWYWwpXG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZXJzLnRyaW0pIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKSAhPT0gbmV3VmFsLnRyaW0oKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgIT09IG5ld1ZhbFxuICB9XG5cbiAgdmFyIGRvbVByb3BzID0ge1xuICAgIGNyZWF0ZTogdXBkYXRlRE9NUHJvcHMsXG4gICAgdXBkYXRlOiB1cGRhdGVET01Qcm9wc1xuICB9O1xuXG4gIC8qICAqL1xuXG4gIHZhciBwYXJzZVN0eWxlVGV4dCA9IGNhY2hlZChmdW5jdGlvbiAoY3NzVGV4dCkge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgbGlzdERlbGltaXRlciA9IC87KD8hW14oXSpcXCkpL2c7XG4gICAgdmFyIHByb3BlcnR5RGVsaW1pdGVyID0gLzooLispLztcbiAgICBjc3NUZXh0LnNwbGl0KGxpc3REZWxpbWl0ZXIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KHByb3BlcnR5RGVsaW1pdGVyKTtcbiAgICAgICAgdG1wLmxlbmd0aCA+IDEgJiYgKHJlc1t0bXBbMF0udHJpbSgpXSA9IHRtcFsxXS50cmltKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXNcbiAgfSk7XG5cbiAgLy8gbWVyZ2Ugc3RhdGljIGFuZCBkeW5hbWljIHN0eWxlIGRhdGEgb24gdGhlIHNhbWUgdm5vZGVcbiAgZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVEYXRhIChkYXRhKSB7XG4gICAgdmFyIHN0eWxlID0gbm9ybWFsaXplU3R5bGVCaW5kaW5nKGRhdGEuc3R5bGUpO1xuICAgIC8vIHN0YXRpYyBzdHlsZSBpcyBwcmUtcHJvY2Vzc2VkIGludG8gYW4gb2JqZWN0IGR1cmluZyBjb21waWxhdGlvblxuICAgIC8vIGFuZCBpcyBhbHdheXMgYSBmcmVzaCBvYmplY3QsIHNvIGl0J3Mgc2FmZSB0byBtZXJnZSBpbnRvIGl0XG4gICAgcmV0dXJuIGRhdGEuc3RhdGljU3R5bGVcbiAgICAgID8gZXh0ZW5kKGRhdGEuc3RhdGljU3R5bGUsIHN0eWxlKVxuICAgICAgOiBzdHlsZVxuICB9XG5cbiAgLy8gbm9ybWFsaXplIHBvc3NpYmxlIGFycmF5IC8gc3RyaW5nIHZhbHVlcyBpbnRvIE9iamVjdFxuICBmdW5jdGlvbiBub3JtYWxpemVTdHlsZUJpbmRpbmcgKGJpbmRpbmdTdHlsZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGJpbmRpbmdTdHlsZSkpIHtcbiAgICAgIHJldHVybiB0b09iamVjdChiaW5kaW5nU3R5bGUpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgYmluZGluZ1N0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHBhcnNlU3R5bGVUZXh0KGJpbmRpbmdTdHlsZSlcbiAgICB9XG4gICAgcmV0dXJuIGJpbmRpbmdTdHlsZVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudCBjb21wb25lbnQgc3R5bGUgc2hvdWxkIGJlIGFmdGVyIGNoaWxkJ3NcbiAgICogc28gdGhhdCBwYXJlbnQgY29tcG9uZW50J3Mgc3R5bGUgY291bGQgb3ZlcnJpZGUgaXRcbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0eWxlICh2bm9kZSwgY2hlY2tDaGlsZCkge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgc3R5bGVEYXRhO1xuXG4gICAgaWYgKGNoZWNrQ2hpbGQpIHtcbiAgICAgIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgICAgIHdoaWxlIChjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgICAgY2hpbGROb2RlID0gY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNoaWxkTm9kZSAmJiBjaGlsZE5vZGUuZGF0YSAmJlxuICAgICAgICAgIChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEoY2hpbGROb2RlLmRhdGEpKVxuICAgICAgICApIHtcbiAgICAgICAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEodm5vZGUuZGF0YSkpKSB7XG4gICAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xuICAgIH1cblxuICAgIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gICAgd2hpbGUgKChwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnQpKSB7XG4gICAgICBpZiAocGFyZW50Tm9kZS5kYXRhICYmIChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEocGFyZW50Tm9kZS5kYXRhKSkpIHtcbiAgICAgICAgZXh0ZW5kKHJlcywgc3R5bGVEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIGNzc1ZhclJFID0gL14tLS87XG4gIHZhciBpbXBvcnRhbnRSRSA9IC9cXHMqIWltcG9ydGFudCQvO1xuICB2YXIgc2V0UHJvcCA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgdmFsKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGNzc1ZhclJFLnRlc3QobmFtZSkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpbXBvcnRhbnRSRS50ZXN0KHZhbCkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KGh5cGhlbmF0ZShuYW1lKSwgdmFsLnJlcGxhY2UoaW1wb3J0YW50UkUsICcnKSwgJ2ltcG9ydGFudCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemUobmFtZSk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIC8vIFN1cHBvcnQgdmFsdWVzIGFycmF5IGNyZWF0ZWQgYnkgYXV0b3ByZWZpeGVyLCBlLmcuXG4gICAgICAgIC8vIHtkaXNwbGF5OiBbXCItd2Via2l0LWJveFwiLCBcIi1tcy1mbGV4Ym94XCIsIFwiZmxleFwiXX1cbiAgICAgICAgLy8gU2V0IHRoZW0gb25lIGJ5IG9uZSwgYW5kIHRoZSBicm93c2VyIHdpbGwgb25seSBzZXQgdGhvc2UgaXQgY2FuIHJlY29nbml6ZVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgZWwuc3R5bGVbbm9ybWFsaXplZE5hbWVdID0gdmFsW2ldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zdHlsZVtub3JtYWxpemVkTmFtZV0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB2ZW5kb3JOYW1lcyA9IFsnV2Via2l0JywgJ01veicsICdtcyddO1xuXG4gIHZhciBlbXB0eVN0eWxlO1xuICB2YXIgbm9ybWFsaXplID0gY2FjaGVkKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgZW1wdHlTdHlsZSA9IGVtcHR5U3R5bGUgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgcHJvcCA9IGNhbWVsaXplKHByb3ApO1xuICAgIGlmIChwcm9wICE9PSAnZmlsdGVyJyAmJiAocHJvcCBpbiBlbXB0eVN0eWxlKSkge1xuICAgICAgcmV0dXJuIHByb3BcbiAgICB9XG4gICAgdmFyIGNhcE5hbWUgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZlbmRvck5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IHZlbmRvck5hbWVzW2ldICsgY2FwTmFtZTtcbiAgICAgIGlmIChuYW1lIGluIGVtcHR5U3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgdmFyIG9sZERhdGEgPSBvbGRWbm9kZS5kYXRhO1xuXG4gICAgaWYgKGlzVW5kZWYoZGF0YS5zdGF0aWNTdHlsZSkgJiYgaXNVbmRlZihkYXRhLnN0eWxlKSAmJlxuICAgICAgaXNVbmRlZihvbGREYXRhLnN0YXRpY1N0eWxlKSAmJiBpc1VuZGVmKG9sZERhdGEuc3R5bGUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgY3VyLCBuYW1lO1xuICAgIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgICB2YXIgb2xkU3RhdGljU3R5bGUgPSBvbGREYXRhLnN0YXRpY1N0eWxlO1xuICAgIHZhciBvbGRTdHlsZUJpbmRpbmcgPSBvbGREYXRhLm5vcm1hbGl6ZWRTdHlsZSB8fCBvbGREYXRhLnN0eWxlIHx8IHt9O1xuXG4gICAgLy8gaWYgc3RhdGljIHN0eWxlIGV4aXN0cywgc3R5bGViaW5kaW5nIGFscmVhZHkgbWVyZ2VkIGludG8gaXQgd2hlbiBkb2luZyBub3JtYWxpemVTdHlsZURhdGFcbiAgICB2YXIgb2xkU3R5bGUgPSBvbGRTdGF0aWNTdHlsZSB8fCBvbGRTdHlsZUJpbmRpbmc7XG5cbiAgICB2YXIgc3R5bGUgPSBub3JtYWxpemVTdHlsZUJpbmRpbmcodm5vZGUuZGF0YS5zdHlsZSkgfHwge307XG5cbiAgICAvLyBzdG9yZSBub3JtYWxpemVkIHN0eWxlIHVuZGVyIGEgZGlmZmVyZW50IGtleSBmb3IgbmV4dCBkaWZmXG4gICAgLy8gbWFrZSBzdXJlIHRvIGNsb25lIGl0IGlmIGl0J3MgcmVhY3RpdmUsIHNpbmNlIHRoZSB1c2VyIGxpa2VseSB3YW50c1xuICAgIC8vIHRvIG11dGF0ZSBpdC5cbiAgICB2bm9kZS5kYXRhLm5vcm1hbGl6ZWRTdHlsZSA9IGlzRGVmKHN0eWxlLl9fb2JfXylcbiAgICAgID8gZXh0ZW5kKHt9LCBzdHlsZSlcbiAgICAgIDogc3R5bGU7XG5cbiAgICB2YXIgbmV3U3R5bGUgPSBnZXRTdHlsZSh2bm9kZSwgdHJ1ZSk7XG5cbiAgICBmb3IgKG5hbWUgaW4gb2xkU3R5bGUpIHtcbiAgICAgIGlmIChpc1VuZGVmKG5ld1N0eWxlW25hbWVdKSkge1xuICAgICAgICBzZXRQcm9wKGVsLCBuYW1lLCAnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiBuZXdTdHlsZSkge1xuICAgICAgY3VyID0gbmV3U3R5bGVbbmFtZV07XG4gICAgICBpZiAoY3VyICE9PSBvbGRTdHlsZVtuYW1lXSkge1xuICAgICAgICAvLyBpZTkgc2V0dGluZyB0byBudWxsIGhhcyBubyBlZmZlY3QsIG11c3QgdXNlIGVtcHR5IHN0cmluZ1xuICAgICAgICBzZXRQcm9wKGVsLCBuYW1lLCBjdXIgPT0gbnVsbCA/ICcnIDogY3VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgc3R5bGUgPSB7XG4gICAgY3JlYXRlOiB1cGRhdGVTdHlsZSxcbiAgICB1cGRhdGU6IHVwZGF0ZVN0eWxlXG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIHdoaXRlc3BhY2VSRSA9IC9cXHMrLztcblxuICAvKipcbiAgICogQWRkIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgU1ZHIHNpbmNlIGNsYXNzTGlzdCBpcyBub3Qgc3VwcG9ydGVkIG9uXG4gICAqIFNWRyBlbGVtZW50cyBpbiBJRVxuICAgKi9cbiAgZnVuY3Rpb24gYWRkQ2xhc3MgKGVsLCBjbHMpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIWNscyB8fCAhKGNscyA9IGNscy50cmltKCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgIGlmIChjbHMuaW5kZXhPZignICcpID4gLTEpIHtcbiAgICAgICAgY2xzLnNwbGl0KHdoaXRlc3BhY2VSRSkuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjKTsgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjdXIgPSBcIiBcIiArIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpICsgXCIgXCI7XG4gICAgICBpZiAoY3VyLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA8IDApIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChjdXIgKyBjbHMpLnRyaW0oKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbGFzcyB3aXRoIGNvbXBhdGliaWxpdHkgZm9yIFNWRyBzaW5jZSBjbGFzc0xpc3QgaXMgbm90IHN1cHBvcnRlZCBvblxuICAgKiBTVkcgZWxlbWVudHMgaW4gSUVcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzIChlbCwgY2xzKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFjbHMgfHwgIShjbHMgPSBjbHMudHJpbSgpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBpZiAoY2xzLmluZGV4T2YoJyAnKSA+IC0xKSB7XG4gICAgICAgIGNscy5zcGxpdCh3aGl0ZXNwYWNlUkUpLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpO1xuICAgICAgfVxuICAgICAgaWYgKCFlbC5jbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGN1ciA9IFwiIFwiICsgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykgKyBcIiBcIjtcbiAgICAgIHZhciB0YXIgPSAnICcgKyBjbHMgKyAnICc7XG4gICAgICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XG4gICAgICAgIGN1ciA9IGN1ci5yZXBsYWNlKHRhciwgJyAnKTtcbiAgICAgIH1cbiAgICAgIGN1ciA9IGN1ci50cmltKCk7XG4gICAgICBpZiAoY3VyKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjdXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVUcmFuc2l0aW9uIChkZWYkJDEpIHtcbiAgICBpZiAoIWRlZiQkMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHR5cGVvZiBkZWYkJDEgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgcmVzID0ge307XG4gICAgICBpZiAoZGVmJCQxLmNzcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgZXh0ZW5kKHJlcywgYXV0b0Nzc1RyYW5zaXRpb24oZGVmJCQxLm5hbWUgfHwgJ3YnKSk7XG4gICAgICB9XG4gICAgICBleHRlbmQocmVzLCBkZWYkJDEpO1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZiQkMSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBhdXRvQ3NzVHJhbnNpdGlvbihkZWYkJDEpXG4gICAgfVxuICB9XG5cbiAgdmFyIGF1dG9Dc3NUcmFuc2l0aW9uID0gY2FjaGVkKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVudGVyQ2xhc3M6IChuYW1lICsgXCItZW50ZXJcIiksXG4gICAgICBlbnRlclRvQ2xhc3M6IChuYW1lICsgXCItZW50ZXItdG9cIiksXG4gICAgICBlbnRlckFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWVudGVyLWFjdGl2ZVwiKSxcbiAgICAgIGxlYXZlQ2xhc3M6IChuYW1lICsgXCItbGVhdmVcIiksXG4gICAgICBsZWF2ZVRvQ2xhc3M6IChuYW1lICsgXCItbGVhdmUtdG9cIiksXG4gICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiAobmFtZSArIFwiLWxlYXZlLWFjdGl2ZVwiKVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGhhc1RyYW5zaXRpb24gPSBpbkJyb3dzZXIgJiYgIWlzSUU5O1xuICB2YXIgVFJBTlNJVElPTiA9ICd0cmFuc2l0aW9uJztcbiAgdmFyIEFOSU1BVElPTiA9ICdhbmltYXRpb24nO1xuXG4gIC8vIFRyYW5zaXRpb24gcHJvcGVydHkvZXZlbnQgc25pZmZpbmdcbiAgdmFyIHRyYW5zaXRpb25Qcm9wID0gJ3RyYW5zaXRpb24nO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3RyYW5zaXRpb25lbmQnO1xuICB2YXIgYW5pbWF0aW9uUHJvcCA9ICdhbmltYXRpb24nO1xuICB2YXIgYW5pbWF0aW9uRW5kRXZlbnQgPSAnYW5pbWF0aW9uZW5kJztcbiAgaWYgKGhhc1RyYW5zaXRpb24pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAod2luZG93Lm9udHJhbnNpdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIHRyYW5zaXRpb25Qcm9wID0gJ1dlYmtpdFRyYW5zaXRpb24nO1xuICAgICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xuICAgIH1cbiAgICBpZiAod2luZG93Lm9uYW5pbWF0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcbiAgICAgIHdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBhbmltYXRpb25Qcm9wID0gJ1dlYmtpdEFuaW1hdGlvbic7XG4gICAgICBhbmltYXRpb25FbmRFdmVudCA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xuICAgIH1cbiAgfVxuXG4gIC8vIGJpbmRpbmcgdG8gd2luZG93IGlzIG5lY2Vzc2FyeSB0byBtYWtlIGhvdCByZWxvYWQgd29yayBpbiBJRSBpbiBzdHJpY3QgbW9kZVxuICB2YXIgcmFmID0gaW5Ccm93c2VyXG4gICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpXG4gICAgICA6IHNldFRpbWVvdXRcbiAgICA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4oKTsgfTtcblxuICBmdW5jdGlvbiBuZXh0RnJhbWUgKGZuKSB7XG4gICAgcmFmKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJhZihmbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUcmFuc2l0aW9uQ2xhc3MgKGVsLCBjbHMpIHtcbiAgICB2YXIgdHJhbnNpdGlvbkNsYXNzZXMgPSBlbC5fdHJhbnNpdGlvbkNsYXNzZXMgfHwgKGVsLl90cmFuc2l0aW9uQ2xhc3NlcyA9IFtdKTtcbiAgICBpZiAodHJhbnNpdGlvbkNsYXNzZXMuaW5kZXhPZihjbHMpIDwgMCkge1xuICAgICAgdHJhbnNpdGlvbkNsYXNzZXMucHVzaChjbHMpO1xuICAgICAgYWRkQ2xhc3MoZWwsIGNscyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVHJhbnNpdGlvbkNsYXNzIChlbCwgY2xzKSB7XG4gICAgaWYgKGVsLl90cmFuc2l0aW9uQ2xhc3Nlcykge1xuICAgICAgcmVtb3ZlKGVsLl90cmFuc2l0aW9uQ2xhc3NlcywgY2xzKTtcbiAgICB9XG4gICAgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7XG4gIH1cblxuICBmdW5jdGlvbiB3aGVuVHJhbnNpdGlvbkVuZHMgKFxuICAgIGVsLFxuICAgIGV4cGVjdGVkVHlwZSxcbiAgICBjYlxuICApIHtcbiAgICB2YXIgcmVmID0gZ2V0VHJhbnNpdGlvbkluZm8oZWwsIGV4cGVjdGVkVHlwZSk7XG4gICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICB2YXIgdGltZW91dCA9IHJlZi50aW1lb3V0O1xuICAgIHZhciBwcm9wQ291bnQgPSByZWYucHJvcENvdW50O1xuICAgIGlmICghdHlwZSkgeyByZXR1cm4gY2IoKSB9XG4gICAgdmFyIGV2ZW50ID0gdHlwZSA9PT0gVFJBTlNJVElPTiA/IHRyYW5zaXRpb25FbmRFdmVudCA6IGFuaW1hdGlvbkVuZEV2ZW50O1xuICAgIHZhciBlbmRlZCA9IDA7XG4gICAgdmFyIGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uRW5kKTtcbiAgICAgIGNiKCk7XG4gICAgfTtcbiAgICB2YXIgb25FbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICBpZiAoKytlbmRlZCA+PSBwcm9wQ291bnQpIHtcbiAgICAgICAgICBlbmQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZW5kZWQgPCBwcm9wQ291bnQpIHtcbiAgICAgICAgZW5kKCk7XG4gICAgICB9XG4gICAgfSwgdGltZW91dCArIDEpO1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uRW5kKTtcbiAgfVxuXG4gIHZhciB0cmFuc2Zvcm1SRSA9IC9cXGIodHJhbnNmb3JtfGFsbCkoLHwkKS87XG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkluZm8gKGVsLCBleHBlY3RlZFR5cGUpIHtcbiAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgIC8vIEpTRE9NIG1heSByZXR1cm4gdW5kZWZpbmVkIGZvciB0cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAgICB2YXIgdHJhbnNpdGlvbkRlbGF5cyA9IChzdHlsZXNbdHJhbnNpdGlvblByb3AgKyAnRGVsYXknXSB8fCAnJykuc3BsaXQoJywgJyk7XG4gICAgdmFyIHRyYW5zaXRpb25EdXJhdGlvbnMgPSAoc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIHZhciB0cmFuc2l0aW9uVGltZW91dCA9IGdldFRpbWVvdXQodHJhbnNpdGlvbkRlbGF5cywgdHJhbnNpdGlvbkR1cmF0aW9ucyk7XG4gICAgdmFyIGFuaW1hdGlvbkRlbGF5cyA9IChzdHlsZXNbYW5pbWF0aW9uUHJvcCArICdEZWxheSddIHx8ICcnKS5zcGxpdCgnLCAnKTtcbiAgICB2YXIgYW5pbWF0aW9uRHVyYXRpb25zID0gKHN0eWxlc1thbmltYXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIHZhciBhbmltYXRpb25UaW1lb3V0ID0gZ2V0VGltZW91dChhbmltYXRpb25EZWxheXMsIGFuaW1hdGlvbkR1cmF0aW9ucyk7XG5cbiAgICB2YXIgdHlwZTtcbiAgICB2YXIgdGltZW91dCA9IDA7XG4gICAgdmFyIHByb3BDb3VudCA9IDA7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGV4cGVjdGVkVHlwZSA9PT0gVFJBTlNJVElPTikge1xuICAgICAgaWYgKHRyYW5zaXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgICB0eXBlID0gVFJBTlNJVElPTjtcbiAgICAgICAgdGltZW91dCA9IHRyYW5zaXRpb25UaW1lb3V0O1xuICAgICAgICBwcm9wQ291bnQgPSB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gQU5JTUFUSU9OKSB7XG4gICAgICBpZiAoYW5pbWF0aW9uVGltZW91dCA+IDApIHtcbiAgICAgICAgdHlwZSA9IEFOSU1BVElPTjtcbiAgICAgICAgdGltZW91dCA9IGFuaW1hdGlvblRpbWVvdXQ7XG4gICAgICAgIHByb3BDb3VudCA9IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0cmFuc2l0aW9uVGltZW91dCwgYW5pbWF0aW9uVGltZW91dCk7XG4gICAgICB0eXBlID0gdGltZW91dCA+IDBcbiAgICAgICAgPyB0cmFuc2l0aW9uVGltZW91dCA+IGFuaW1hdGlvblRpbWVvdXRcbiAgICAgICAgICA/IFRSQU5TSVRJT05cbiAgICAgICAgICA6IEFOSU1BVElPTlxuICAgICAgICA6IG51bGw7XG4gICAgICBwcm9wQ291bnQgPSB0eXBlXG4gICAgICAgID8gdHlwZSA9PT0gVFJBTlNJVElPTlxuICAgICAgICAgID8gdHJhbnNpdGlvbkR1cmF0aW9ucy5sZW5ndGhcbiAgICAgICAgICA6IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwO1xuICAgIH1cbiAgICB2YXIgaGFzVHJhbnNmb3JtID1cbiAgICAgIHR5cGUgPT09IFRSQU5TSVRJT04gJiZcbiAgICAgIHRyYW5zZm9ybVJFLnRlc3Qoc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ1Byb3BlcnR5J10pO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgdGltZW91dDogdGltZW91dCxcbiAgICAgIHByb3BDb3VudDogcHJvcENvdW50LFxuICAgICAgaGFzVHJhbnNmb3JtOiBoYXNUcmFuc2Zvcm1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUaW1lb3V0IChkZWxheXMsIGR1cmF0aW9ucykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICBkZWxheXMgPSBkZWxheXMuY29uY2F0KGRlbGF5cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGR1cmF0aW9ucy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiB0b01zKGQpICsgdG9NcyhkZWxheXNbaV0pXG4gICAgfSkpXG4gIH1cblxuICAvLyBPbGQgdmVyc2lvbnMgb2YgQ2hyb21pdW0gKGJlbG93IDYxLjAuMzE2My4xMDApIGZvcm1hdHMgZmxvYXRpbmcgcG9pbnRlciBudW1iZXJzXG4gIC8vIGluIGEgbG9jYWxlLWRlcGVuZGVudCB3YXksIHVzaW5nIGEgY29tbWEgaW5zdGVhZCBvZiBhIGRvdC5cbiAgLy8gSWYgY29tbWEgaXMgbm90IHJlcGxhY2VkIHdpdGggYSBkb3QsIHRoZSBpbnB1dCB3aWxsIGJlIHJvdW5kZWQgZG93biAoaS5lLiBhY3RpbmdcbiAgLy8gYXMgYSBmbG9vciBmdW5jdGlvbikgY2F1c2luZyB1bmV4cGVjdGVkIGJlaGF2aW9yc1xuICBmdW5jdGlvbiB0b01zIChzKSB7XG4gICAgcmV0dXJuIE51bWJlcihzLnNsaWNlKDAsIC0xKS5yZXBsYWNlKCcsJywgJy4nKSkgKiAxMDAwXG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBlbnRlciAodm5vZGUsIHRvZ2dsZURpc3BsYXkpIHtcbiAgICB2YXIgZWwgPSB2bm9kZS5lbG07XG5cbiAgICAvLyBjYWxsIGxlYXZlIGNhbGxiYWNrIG5vd1xuICAgIGlmIChpc0RlZihlbC5fbGVhdmVDYikpIHtcbiAgICAgIGVsLl9sZWF2ZUNiLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICBlbC5fbGVhdmVDYigpO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0gcmVzb2x2ZVRyYW5zaXRpb24odm5vZGUuZGF0YS50cmFuc2l0aW9uKTtcbiAgICBpZiAoaXNVbmRlZihkYXRhKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzRGVmKGVsLl9lbnRlckNiKSB8fCBlbC5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIGNzcyA9IGRhdGEuY3NzO1xuICAgIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICAgIHZhciBlbnRlckNsYXNzID0gZGF0YS5lbnRlckNsYXNzO1xuICAgIHZhciBlbnRlclRvQ2xhc3MgPSBkYXRhLmVudGVyVG9DbGFzcztcbiAgICB2YXIgZW50ZXJBY3RpdmVDbGFzcyA9IGRhdGEuZW50ZXJBY3RpdmVDbGFzcztcbiAgICB2YXIgYXBwZWFyQ2xhc3MgPSBkYXRhLmFwcGVhckNsYXNzO1xuICAgIHZhciBhcHBlYXJUb0NsYXNzID0gZGF0YS5hcHBlYXJUb0NsYXNzO1xuICAgIHZhciBhcHBlYXJBY3RpdmVDbGFzcyA9IGRhdGEuYXBwZWFyQWN0aXZlQ2xhc3M7XG4gICAgdmFyIGJlZm9yZUVudGVyID0gZGF0YS5iZWZvcmVFbnRlcjtcbiAgICB2YXIgZW50ZXIgPSBkYXRhLmVudGVyO1xuICAgIHZhciBhZnRlckVudGVyID0gZGF0YS5hZnRlckVudGVyO1xuICAgIHZhciBlbnRlckNhbmNlbGxlZCA9IGRhdGEuZW50ZXJDYW5jZWxsZWQ7XG4gICAgdmFyIGJlZm9yZUFwcGVhciA9IGRhdGEuYmVmb3JlQXBwZWFyO1xuICAgIHZhciBhcHBlYXIgPSBkYXRhLmFwcGVhcjtcbiAgICB2YXIgYWZ0ZXJBcHBlYXIgPSBkYXRhLmFmdGVyQXBwZWFyO1xuICAgIHZhciBhcHBlYXJDYW5jZWxsZWQgPSBkYXRhLmFwcGVhckNhbmNlbGxlZDtcbiAgICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gICAgLy8gYWN0aXZlSW5zdGFuY2Ugd2lsbCBhbHdheXMgYmUgdGhlIDx0cmFuc2l0aW9uPiBjb21wb25lbnQgbWFuYWdpbmcgdGhpc1xuICAgIC8vIHRyYW5zaXRpb24uIE9uZSBlZGdlIGNhc2UgdG8gY2hlY2sgaXMgd2hlbiB0aGUgPHRyYW5zaXRpb24+IGlzIHBsYWNlZFxuICAgIC8vIGFzIHRoZSByb290IG5vZGUgb2YgYSBjaGlsZCBjb21wb25lbnQuIEluIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIGNoZWNrXG4gICAgLy8gPHRyYW5zaXRpb24+J3MgcGFyZW50IGZvciBhcHBlYXIgY2hlY2suXG4gICAgdmFyIGNvbnRleHQgPSBhY3RpdmVJbnN0YW5jZTtcbiAgICB2YXIgdHJhbnNpdGlvbk5vZGUgPSBhY3RpdmVJbnN0YW5jZS4kdm5vZGU7XG4gICAgd2hpbGUgKHRyYW5zaXRpb25Ob2RlICYmIHRyYW5zaXRpb25Ob2RlLnBhcmVudCkge1xuICAgICAgY29udGV4dCA9IHRyYW5zaXRpb25Ob2RlLmNvbnRleHQ7XG4gICAgICB0cmFuc2l0aW9uTm9kZSA9IHRyYW5zaXRpb25Ob2RlLnBhcmVudDtcbiAgICB9XG5cbiAgICB2YXIgaXNBcHBlYXIgPSAhY29udGV4dC5faXNNb3VudGVkIHx8ICF2bm9kZS5pc1Jvb3RJbnNlcnQ7XG5cbiAgICBpZiAoaXNBcHBlYXIgJiYgIWFwcGVhciAmJiBhcHBlYXIgIT09ICcnKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgc3RhcnRDbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhckNsYXNzXG4gICAgICA/IGFwcGVhckNsYXNzXG4gICAgICA6IGVudGVyQ2xhc3M7XG4gICAgdmFyIGFjdGl2ZUNsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICAgID8gYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICAgIDogZW50ZXJBY3RpdmVDbGFzcztcbiAgICB2YXIgdG9DbGFzcyA9IGlzQXBwZWFyICYmIGFwcGVhclRvQ2xhc3NcbiAgICAgID8gYXBwZWFyVG9DbGFzc1xuICAgICAgOiBlbnRlclRvQ2xhc3M7XG5cbiAgICB2YXIgYmVmb3JlRW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICAgID8gKGJlZm9yZUFwcGVhciB8fCBiZWZvcmVFbnRlcilcbiAgICAgIDogYmVmb3JlRW50ZXI7XG4gICAgdmFyIGVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgICA/ICh0eXBlb2YgYXBwZWFyID09PSAnZnVuY3Rpb24nID8gYXBwZWFyIDogZW50ZXIpXG4gICAgICA6IGVudGVyO1xuICAgIHZhciBhZnRlckVudGVySG9vayA9IGlzQXBwZWFyXG4gICAgICA/IChhZnRlckFwcGVhciB8fCBhZnRlckVudGVyKVxuICAgICAgOiBhZnRlckVudGVyO1xuICAgIHZhciBlbnRlckNhbmNlbGxlZEhvb2sgPSBpc0FwcGVhclxuICAgICAgPyAoYXBwZWFyQ2FuY2VsbGVkIHx8IGVudGVyQ2FuY2VsbGVkKVxuICAgICAgOiBlbnRlckNhbmNlbGxlZDtcblxuICAgIHZhciBleHBsaWNpdEVudGVyRHVyYXRpb24gPSB0b051bWJlcihcbiAgICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgICA/IGR1cmF0aW9uLmVudGVyXG4gICAgICAgIDogZHVyYXRpb25cbiAgICApO1xuXG4gICAgaWYgKGV4cGxpY2l0RW50ZXJEdXJhdGlvbiAhPSBudWxsKSB7XG4gICAgICBjaGVja0R1cmF0aW9uKGV4cGxpY2l0RW50ZXJEdXJhdGlvbiwgJ2VudGVyJywgdm5vZGUpO1xuICAgIH1cblxuICAgIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gICAgdmFyIHVzZXJXYW50c0NvbnRyb2wgPSBnZXRIb29rQXJndW1lbnRzTGVuZ3RoKGVudGVySG9vayk7XG5cbiAgICB2YXIgY2IgPSBlbC5fZW50ZXJDYiA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCB0b0NsYXNzKTtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBhY3RpdmVDbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAoY2IuY2FuY2VsbGVkKSB7XG4gICAgICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBlbnRlckNhbmNlbGxlZEhvb2sgJiYgZW50ZXJDYW5jZWxsZWRIb29rKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFmdGVyRW50ZXJIb29rICYmIGFmdGVyRW50ZXJIb29rKGVsKTtcbiAgICAgIH1cbiAgICAgIGVsLl9lbnRlckNiID0gbnVsbDtcbiAgICB9KTtcblxuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICAvLyByZW1vdmUgcGVuZGluZyBsZWF2ZSBlbGVtZW50IG9uIGVudGVyIGJ5IGluamVjdGluZyBhbiBpbnNlcnQgaG9va1xuICAgICAgbWVyZ2VWTm9kZUhvb2sodm5vZGUsICdpbnNlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgcGVuZGluZ05vZGUgPSBwYXJlbnQgJiYgcGFyZW50Ll9wZW5kaW5nICYmIHBhcmVudC5fcGVuZGluZ1t2bm9kZS5rZXldO1xuICAgICAgICBpZiAocGVuZGluZ05vZGUgJiZcbiAgICAgICAgICBwZW5kaW5nTm9kZS50YWcgPT09IHZub2RlLnRhZyAmJlxuICAgICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYlxuICAgICAgICApIHtcbiAgICAgICAgICBwZW5kaW5nTm9kZS5lbG0uX2xlYXZlQ2IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbnRlckhvb2sgJiYgZW50ZXJIb29rKGVsLCBjYik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzdGFydCBlbnRlciB0cmFuc2l0aW9uXG4gICAgYmVmb3JlRW50ZXJIb29rICYmIGJlZm9yZUVudGVySG9vayhlbCk7XG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgc3RhcnRDbGFzcyk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFjdGl2ZUNsYXNzKTtcbiAgICAgIG5leHRGcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgc3RhcnRDbGFzcyk7XG4gICAgICAgIGlmICghY2IuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCB0b0NsYXNzKTtcbiAgICAgICAgICBpZiAoIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkRHVyYXRpb24oZXhwbGljaXRFbnRlckR1cmF0aW9uKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNiLCBleHBsaWNpdEVudGVyRHVyYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICB0b2dnbGVEaXNwbGF5ICYmIHRvZ2dsZURpc3BsYXkoKTtcbiAgICAgIGVudGVySG9vayAmJiBlbnRlckhvb2soZWwsIGNiKTtcbiAgICB9XG5cbiAgICBpZiAoIWV4cGVjdHNDU1MgJiYgIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGVhdmUgKHZub2RlLCBybSkge1xuICAgIHZhciBlbCA9IHZub2RlLmVsbTtcblxuICAgIC8vIGNhbGwgZW50ZXIgY2FsbGJhY2sgbm93XG4gICAgaWYgKGlzRGVmKGVsLl9lbnRlckNiKSkge1xuICAgICAgZWwuX2VudGVyQ2IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGVsLl9lbnRlckNiKCk7XG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSByZXNvbHZlVHJhbnNpdGlvbih2bm9kZS5kYXRhLnRyYW5zaXRpb24pO1xuICAgIGlmIChpc1VuZGVmKGRhdGEpIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICByZXR1cm4gcm0oKVxuICAgIH1cblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChpc0RlZihlbC5fbGVhdmVDYikpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBjc3MgPSBkYXRhLmNzcztcbiAgICB2YXIgdHlwZSA9IGRhdGEudHlwZTtcbiAgICB2YXIgbGVhdmVDbGFzcyA9IGRhdGEubGVhdmVDbGFzcztcbiAgICB2YXIgbGVhdmVUb0NsYXNzID0gZGF0YS5sZWF2ZVRvQ2xhc3M7XG4gICAgdmFyIGxlYXZlQWN0aXZlQ2xhc3MgPSBkYXRhLmxlYXZlQWN0aXZlQ2xhc3M7XG4gICAgdmFyIGJlZm9yZUxlYXZlID0gZGF0YS5iZWZvcmVMZWF2ZTtcbiAgICB2YXIgbGVhdmUgPSBkYXRhLmxlYXZlO1xuICAgIHZhciBhZnRlckxlYXZlID0gZGF0YS5hZnRlckxlYXZlO1xuICAgIHZhciBsZWF2ZUNhbmNlbGxlZCA9IGRhdGEubGVhdmVDYW5jZWxsZWQ7XG4gICAgdmFyIGRlbGF5TGVhdmUgPSBkYXRhLmRlbGF5TGVhdmU7XG4gICAgdmFyIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbjtcblxuICAgIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gICAgdmFyIHVzZXJXYW50c0NvbnRyb2wgPSBnZXRIb29rQXJndW1lbnRzTGVuZ3RoKGxlYXZlKTtcblxuICAgIHZhciBleHBsaWNpdExlYXZlRHVyYXRpb24gPSB0b051bWJlcihcbiAgICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgICA/IGR1cmF0aW9uLmxlYXZlXG4gICAgICAgIDogZHVyYXRpb25cbiAgICApO1xuXG4gICAgaWYgKGlzRGVmKGV4cGxpY2l0TGVhdmVEdXJhdGlvbikpIHtcbiAgICAgIGNoZWNrRHVyYXRpb24oZXhwbGljaXRMZWF2ZUR1cmF0aW9uLCAnbGVhdmUnLCB2bm9kZSk7XG4gICAgfVxuXG4gICAgdmFyIGNiID0gZWwuX2xlYXZlQ2IgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUuX3BlbmRpbmcpIHtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5fcGVuZGluZ1t2bm9kZS5rZXldID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVUb0NsYXNzKTtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYi5jYW5jZWxsZWQpIHtcbiAgICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGxlYXZlQ2FuY2VsbGVkICYmIGxlYXZlQ2FuY2VsbGVkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJtKCk7XG4gICAgICAgIGFmdGVyTGVhdmUgJiYgYWZ0ZXJMZWF2ZShlbCk7XG4gICAgICB9XG4gICAgICBlbC5fbGVhdmVDYiA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBpZiAoZGVsYXlMZWF2ZSkge1xuICAgICAgZGVsYXlMZWF2ZShwZXJmb3JtTGVhdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwZXJmb3JtTGVhdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZXJmb3JtTGVhdmUgKCkge1xuICAgICAgLy8gdGhlIGRlbGF5ZWQgbGVhdmUgbWF5IGhhdmUgYWxyZWFkeSBiZWVuIGNhbmNlbGxlZFxuICAgICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIHJlY29yZCBsZWF2aW5nIGVsZW1lbnRcbiAgICAgIGlmICghdm5vZGUuZGF0YS5zaG93ICYmIGVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgKGVsLnBhcmVudE5vZGUuX3BlbmRpbmcgfHwgKGVsLnBhcmVudE5vZGUuX3BlbmRpbmcgPSB7fSkpWyh2bm9kZS5rZXkpXSA9IHZub2RlO1xuICAgICAgfVxuICAgICAgYmVmb3JlTGVhdmUgJiYgYmVmb3JlTGVhdmUoZWwpO1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQ2xhc3MpO1xuICAgICAgICAgIGlmICghY2IuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlVG9DbGFzcyk7XG4gICAgICAgICAgICBpZiAoIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICAgICAgICAgICAgaWYgKGlzVmFsaWREdXJhdGlvbihleHBsaWNpdExlYXZlRHVyYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjYiwgZXhwbGljaXRMZWF2ZUR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGVuVHJhbnNpdGlvbkVuZHMoZWwsIHR5cGUsIGNiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsZWF2ZSAmJiBsZWF2ZShlbCwgY2IpO1xuICAgICAgaWYgKCFleHBlY3RzQ1NTICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gb25seSB1c2VkIGluIGRldiBtb2RlXG4gIGZ1bmN0aW9uIGNoZWNrRHVyYXRpb24gKHZhbCwgbmFtZSwgdm5vZGUpIHtcbiAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwiPHRyYW5zaXRpb24+IGV4cGxpY2l0IFwiICsgbmFtZSArIFwiIGR1cmF0aW9uIGlzIG5vdCBhIHZhbGlkIG51bWJlciAtIFwiICtcbiAgICAgICAgXCJnb3QgXCIgKyAoSlNPTi5zdHJpbmdpZnkodmFsKSkgKyBcIi5cIixcbiAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwiPHRyYW5zaXRpb24+IGV4cGxpY2l0IFwiICsgbmFtZSArIFwiIGR1cmF0aW9uIGlzIE5hTiAtIFwiICtcbiAgICAgICAgJ3RoZSBkdXJhdGlvbiBleHByZXNzaW9uIG1pZ2h0IGJlIGluY29ycmVjdC4nLFxuICAgICAgICB2bm9kZS5jb250ZXh0XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWREdXJhdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmICFpc05hTih2YWwpXG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdHJhbnNpdGlvbiBob29rJ3MgYXJndW1lbnQgbGVuZ3RoLiBUaGUgaG9vayBtYXkgYmU6XG4gICAqIC0gYSBtZXJnZWQgaG9vayAoaW52b2tlcikgd2l0aCB0aGUgb3JpZ2luYWwgaW4gLmZuc1xuICAgKiAtIGEgd3JhcHBlZCBjb21wb25lbnQgbWV0aG9kIChjaGVjayAuX2xlbmd0aClcbiAgICogLSBhIHBsYWluIGZ1bmN0aW9uICgubGVuZ3RoKVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SG9va0FyZ3VtZW50c0xlbmd0aCAoZm4pIHtcbiAgICBpZiAoaXNVbmRlZihmbikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB2YXIgaW52b2tlckZucyA9IGZuLmZucztcbiAgICBpZiAoaXNEZWYoaW52b2tlckZucykpIHtcbiAgICAgIC8vIGludm9rZXJcbiAgICAgIHJldHVybiBnZXRIb29rQXJndW1lbnRzTGVuZ3RoKFxuICAgICAgICBBcnJheS5pc0FycmF5KGludm9rZXJGbnMpXG4gICAgICAgICAgPyBpbnZva2VyRm5zWzBdXG4gICAgICAgICAgOiBpbnZva2VyRm5zXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoZm4uX2xlbmd0aCB8fCBmbi5sZW5ndGgpID4gMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9lbnRlciAoXywgdm5vZGUpIHtcbiAgICBpZiAodm5vZGUuZGF0YS5zaG93ICE9PSB0cnVlKSB7XG4gICAgICBlbnRlcih2bm9kZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHRyYW5zaXRpb24gPSBpbkJyb3dzZXIgPyB7XG4gICAgY3JlYXRlOiBfZW50ZXIsXG4gICAgYWN0aXZhdGU6IF9lbnRlcixcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSQkMSAodm5vZGUsIHJtKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHZub2RlLmRhdGEuc2hvdyAhPT0gdHJ1ZSkge1xuICAgICAgICBsZWF2ZSh2bm9kZSwgcm0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gOiB7fTtcblxuICB2YXIgcGxhdGZvcm1Nb2R1bGVzID0gW1xuICAgIGF0dHJzLFxuICAgIGtsYXNzLFxuICAgIGV2ZW50cyxcbiAgICBkb21Qcm9wcyxcbiAgICBzdHlsZSxcbiAgICB0cmFuc2l0aW9uXG4gIF07XG5cbiAgLyogICovXG5cbiAgLy8gdGhlIGRpcmVjdGl2ZSBtb2R1bGUgc2hvdWxkIGJlIGFwcGxpZWQgbGFzdCwgYWZ0ZXIgYWxsXG4gIC8vIGJ1aWx0LWluIG1vZHVsZXMgaGF2ZSBiZWVuIGFwcGxpZWQuXG4gIHZhciBtb2R1bGVzID0gcGxhdGZvcm1Nb2R1bGVzLmNvbmNhdChiYXNlTW9kdWxlcyk7XG5cbiAgdmFyIHBhdGNoID0gY3JlYXRlUGF0Y2hGdW5jdGlvbih7IG5vZGVPcHM6IG5vZGVPcHMsIG1vZHVsZXM6IG1vZHVsZXMgfSk7XG5cbiAgLyoqXG4gICAqIE5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBsaWtlIGF0dGFjaGluZ1xuICAgKiBwcm9wZXJ0aWVzIHRvIEVsZW1lbnRzLlxuICAgKi9cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzSUU5KSB7XG4gICAgLy8gaHR0cDovL3d3dy5tYXR0czQxMS5jb20vcG9zdC9pbnRlcm5ldC1leHBsb3Jlci05LW9uaW5wdXQvXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChlbCAmJiBlbC52bW9kZWwpIHtcbiAgICAgICAgdHJpZ2dlcihlbCwgJ2lucHV0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIGluc2VydGVkOiBmdW5jdGlvbiBpbnNlcnRlZCAoZWwsIGJpbmRpbmcsIHZub2RlLCBvbGRWbm9kZSkge1xuICAgICAgaWYgKHZub2RlLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgLy8gIzY5MDNcbiAgICAgICAgaWYgKG9sZFZub2RlLmVsbSAmJiAhb2xkVm5vZGUuZWxtLl92T3B0aW9ucykge1xuICAgICAgICAgIG1lcmdlVk5vZGVIb29rKHZub2RlLCAncG9zdHBhdGNoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlyZWN0aXZlLmNvbXBvbmVudFVwZGF0ZWQoZWwsIGJpbmRpbmcsIHZub2RlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm5vZGUuY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuX3ZPcHRpb25zID0gW10ubWFwLmNhbGwoZWwub3B0aW9ucywgZ2V0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2bm9kZS50YWcgPT09ICd0ZXh0YXJlYScgfHwgaXNUZXh0SW5wdXRUeXBlKGVsLnR5cGUpKSB7XG4gICAgICAgIGVsLl92TW9kaWZpZXJzID0gYmluZGluZy5tb2RpZmllcnM7XG4gICAgICAgIGlmICghYmluZGluZy5tb2RpZmllcnMubGF6eSkge1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uc3RhcnQnLCBvbkNvbXBvc2l0aW9uU3RhcnQpO1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgaWYgKGlzSUU5KSB7XG4gICAgICAgICAgICBlbC52bW9kZWwgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRVcGRhdGVkOiBmdW5jdGlvbiBjb21wb25lbnRVcGRhdGVkIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICAgIGlmICh2bm9kZS50YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHNldFNlbGVjdGVkKGVsLCBiaW5kaW5nLCB2bm9kZS5jb250ZXh0KTtcbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgb3B0aW9ucyByZW5kZXJlZCBieSB2LWZvciBoYXZlIGNoYW5nZWQsXG4gICAgICAgIC8vIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgdmFsdWUgaXMgb3V0LW9mLXN5bmMgd2l0aCB0aGUgcmVuZGVyZWQgb3B0aW9ucy5cbiAgICAgICAgLy8gZGV0ZWN0IHN1Y2ggY2FzZXMgYW5kIGZpbHRlciBvdXQgdmFsdWVzIHRoYXQgbm8gbG9uZ2VyIGhhcyBhIG1hdGNoaW5nXG4gICAgICAgIC8vIG9wdGlvbiBpbiB0aGUgRE9NLlxuICAgICAgICB2YXIgcHJldk9wdGlvbnMgPSBlbC5fdk9wdGlvbnM7XG4gICAgICAgIHZhciBjdXJPcHRpb25zID0gZWwuX3ZPcHRpb25zID0gW10ubWFwLmNhbGwoZWwub3B0aW9ucywgZ2V0VmFsdWUpO1xuICAgICAgICBpZiAoY3VyT3B0aW9ucy5zb21lKGZ1bmN0aW9uIChvLCBpKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCBwcmV2T3B0aW9uc1tpXSk7IH0pKSB7XG4gICAgICAgICAgLy8gdHJpZ2dlciBjaGFuZ2UgZXZlbnQgaWZcbiAgICAgICAgICAvLyBubyBtYXRjaGluZyBvcHRpb24gZm91bmQgZm9yIGF0IGxlYXN0IG9uZSB2YWx1ZVxuICAgICAgICAgIHZhciBuZWVkUmVzZXQgPSBlbC5tdWx0aXBsZVxuICAgICAgICAgICAgPyBiaW5kaW5nLnZhbHVlLnNvbWUoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGhhc05vTWF0Y2hpbmdPcHRpb24odiwgY3VyT3B0aW9ucyk7IH0pXG4gICAgICAgICAgICA6IGJpbmRpbmcudmFsdWUgIT09IGJpbmRpbmcub2xkVmFsdWUgJiYgaGFzTm9NYXRjaGluZ09wdGlvbihiaW5kaW5nLnZhbHVlLCBjdXJPcHRpb25zKTtcbiAgICAgICAgICBpZiAobmVlZFJlc2V0KSB7XG4gICAgICAgICAgICB0cmlnZ2VyKGVsLCAnY2hhbmdlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHNldFNlbGVjdGVkIChlbCwgYmluZGluZywgdm0pIHtcbiAgICBhY3R1YWxseVNldFNlbGVjdGVkKGVsLCBiaW5kaW5nLCB2bSk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGlzSUUgfHwgaXNFZGdlKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWN0dWFsbHlTZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm0pO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWN0dWFsbHlTZXRTZWxlY3RlZCAoZWwsIGJpbmRpbmcsIHZtKSB7XG4gICAgdmFyIHZhbHVlID0gYmluZGluZy52YWx1ZTtcbiAgICB2YXIgaXNNdWx0aXBsZSA9IGVsLm11bHRpcGxlO1xuICAgIGlmIChpc011bHRpcGxlICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCI8c2VsZWN0IG11bHRpcGxlIHYtbW9kZWw9XFxcIlwiICsgKGJpbmRpbmcuZXhwcmVzc2lvbikgKyBcIlxcXCI+IFwiICtcbiAgICAgICAgXCJleHBlY3RzIGFuIEFycmF5IHZhbHVlIGZvciBpdHMgYmluZGluZywgYnV0IGdvdCBcIiArIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKSksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBzZWxlY3RlZCwgb3B0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG9wdGlvbiA9IGVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICBzZWxlY3RlZCA9IGxvb3NlSW5kZXhPZih2YWx1ZSwgZ2V0VmFsdWUob3B0aW9uKSkgPiAtMTtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAhPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvb3NlRXF1YWwoZ2V0VmFsdWUob3B0aW9uKSwgdmFsdWUpKSB7XG4gICAgICAgICAgaWYgKGVsLnNlbGVjdGVkSW5kZXggIT09IGkpIHtcbiAgICAgICAgICAgIGVsLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWlzTXVsdGlwbGUpIHtcbiAgICAgIGVsLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYXNOb01hdGNoaW5nT3B0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmV2ZXJ5KGZ1bmN0aW9uIChvKSB7IHJldHVybiAhbG9vc2VFcXVhbChvLCB2YWx1ZSk7IH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRWYWx1ZSAob3B0aW9uKSB7XG4gICAgcmV0dXJuICdfdmFsdWUnIGluIG9wdGlvblxuICAgICAgPyBvcHRpb24uX3ZhbHVlXG4gICAgICA6IG9wdGlvbi52YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db21wb3NpdGlvblN0YXJ0IChlKSB7XG4gICAgZS50YXJnZXQuY29tcG9zaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29tcG9zaXRpb25FbmQgKGUpIHtcbiAgICAvLyBwcmV2ZW50IHRyaWdnZXJpbmcgYW4gaW5wdXQgZXZlbnQgZm9yIG5vIHJlYXNvblxuICAgIGlmICghZS50YXJnZXQuY29tcG9zaW5nKSB7IHJldHVybiB9XG4gICAgZS50YXJnZXQuY29tcG9zaW5nID0gZmFsc2U7XG4gICAgdHJpZ2dlcihlLnRhcmdldCwgJ2lucHV0Jyk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmlnZ2VyIChlbCwgdHlwZSkge1xuICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICBlLmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcbiAgICBlbC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgLyogICovXG5cbiAgLy8gcmVjdXJzaXZlbHkgc2VhcmNoIGZvciBwb3NzaWJsZSB0cmFuc2l0aW9uIGRlZmluZWQgaW5zaWRlIHRoZSBjb21wb25lbnQgcm9vdFxuICBmdW5jdGlvbiBsb2NhdGVOb2RlICh2bm9kZSkge1xuICAgIHJldHVybiB2bm9kZS5jb21wb25lbnRJbnN0YW5jZSAmJiAoIXZub2RlLmRhdGEgfHwgIXZub2RlLmRhdGEudHJhbnNpdGlvbilcbiAgICAgID8gbG9jYXRlTm9kZSh2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGUpXG4gICAgICA6IHZub2RlXG4gIH1cblxuICB2YXIgc2hvdyA9IHtcbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kIChlbCwgcmVmLCB2bm9kZSkge1xuICAgICAgdmFyIHZhbHVlID0gcmVmLnZhbHVlO1xuXG4gICAgICB2bm9kZSA9IGxvY2F0ZU5vZGUodm5vZGUpO1xuICAgICAgdmFyIHRyYW5zaXRpb24kJDEgPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEudHJhbnNpdGlvbjtcbiAgICAgIHZhciBvcmlnaW5hbERpc3BsYXkgPSBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgPVxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnJyA6IGVsLnN0eWxlLmRpc3BsYXk7XG4gICAgICBpZiAodmFsdWUgJiYgdHJhbnNpdGlvbiQkMSkge1xuICAgICAgICB2bm9kZS5kYXRhLnNob3cgPSB0cnVlO1xuICAgICAgICBlbnRlcih2bm9kZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBvcmlnaW5hbERpc3BsYXk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gb3JpZ2luYWxEaXNwbGF5IDogJ25vbmUnO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSAoZWwsIHJlZiwgdm5vZGUpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHJlZi52YWx1ZTtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHJlZi5vbGRWYWx1ZTtcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIXZhbHVlID09PSAhb2xkVmFsdWUpIHsgcmV0dXJuIH1cbiAgICAgIHZub2RlID0gbG9jYXRlTm9kZSh2bm9kZSk7XG4gICAgICB2YXIgdHJhbnNpdGlvbiQkMSA9IHZub2RlLmRhdGEgJiYgdm5vZGUuZGF0YS50cmFuc2l0aW9uO1xuICAgICAgaWYgKHRyYW5zaXRpb24kJDEpIHtcbiAgICAgICAgdm5vZGUuZGF0YS5zaG93ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgZW50ZXIodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBlbC5fX3ZPcmlnaW5hbERpc3BsYXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVhdmUodm5vZGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IGVsLl9fdk9yaWdpbmFsRGlzcGxheSA6ICdub25lJztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbiB1bmJpbmQgKFxuICAgICAgZWwsXG4gICAgICBiaW5kaW5nLFxuICAgICAgdm5vZGUsXG4gICAgICBvbGRWbm9kZSxcbiAgICAgIGlzRGVzdHJveVxuICAgICkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3kpIHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHBsYXRmb3JtRGlyZWN0aXZlcyA9IHtcbiAgICBtb2RlbDogZGlyZWN0aXZlLFxuICAgIHNob3c6IHNob3dcbiAgfTtcblxuICAvKiAgKi9cblxuICB2YXIgdHJhbnNpdGlvblByb3BzID0ge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBhcHBlYXI6IEJvb2xlYW4sXG4gICAgY3NzOiBCb29sZWFuLFxuICAgIG1vZGU6IFN0cmluZyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZW50ZXJDbGFzczogU3RyaW5nLFxuICAgIGxlYXZlQ2xhc3M6IFN0cmluZyxcbiAgICBlbnRlclRvQ2xhc3M6IFN0cmluZyxcbiAgICBsZWF2ZVRvQ2xhc3M6IFN0cmluZyxcbiAgICBlbnRlckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgbGVhdmVBY3RpdmVDbGFzczogU3RyaW5nLFxuICAgIGFwcGVhckNsYXNzOiBTdHJpbmcsXG4gICAgYXBwZWFyQWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBhcHBlYXJUb0NsYXNzOiBTdHJpbmcsXG4gICAgZHVyYXRpb246IFtOdW1iZXIsIFN0cmluZywgT2JqZWN0XVxuICB9O1xuXG4gIC8vIGluIGNhc2UgdGhlIGNoaWxkIGlzIGFsc28gYW4gYWJzdHJhY3QgY29tcG9uZW50LCBlLmcuIDxrZWVwLWFsaXZlPlxuICAvLyB3ZSB3YW50IHRvIHJlY3Vyc2l2ZWx5IHJldHJpZXZlIHRoZSByZWFsIGNvbXBvbmVudCB0byBiZSByZW5kZXJlZFxuICBmdW5jdGlvbiBnZXRSZWFsQ2hpbGQgKHZub2RlKSB7XG4gICAgdmFyIGNvbXBPcHRpb25zID0gdm5vZGUgJiYgdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgICBpZiAoY29tcE9wdGlvbnMgJiYgY29tcE9wdGlvbnMuQ3Rvci5vcHRpb25zLmFic3RyYWN0KSB7XG4gICAgICByZXR1cm4gZ2V0UmVhbENoaWxkKGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY29tcE9wdGlvbnMuY2hpbGRyZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdm5vZGVcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0VHJhbnNpdGlvbkRhdGEgKGNvbXApIHtcbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIHZhciBvcHRpb25zID0gY29tcC4kb3B0aW9ucztcbiAgICAvLyBwcm9wc1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnByb3BzRGF0YSkge1xuICAgICAgZGF0YVtrZXldID0gY29tcFtrZXldO1xuICAgIH1cbiAgICAvLyBldmVudHMuXG4gICAgLy8gZXh0cmFjdCBsaXN0ZW5lcnMgYW5kIHBhc3MgdGhlbSBkaXJlY3RseSB0byB0aGUgdHJhbnNpdGlvbiBtZXRob2RzXG4gICAgdmFyIGxpc3RlbmVycyA9IG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgICBmb3IgKHZhciBrZXkkMSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgIGRhdGFbY2FtZWxpemUoa2V5JDEpXSA9IGxpc3RlbmVyc1trZXkkMV07XG4gICAgfVxuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZWhvbGRlciAoaCwgcmF3Q2hpbGQpIHtcbiAgICBpZiAoL1xcZC1rZWVwLWFsaXZlJC8udGVzdChyYXdDaGlsZC50YWcpKSB7XG4gICAgICByZXR1cm4gaCgna2VlcC1hbGl2ZScsIHtcbiAgICAgICAgcHJvcHM6IHJhd0NoaWxkLmNvbXBvbmVudE9wdGlvbnMucHJvcHNEYXRhXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XG4gICAgd2hpbGUgKCh2bm9kZSA9IHZub2RlLnBhcmVudCkpIHtcbiAgICAgIGlmICh2bm9kZS5kYXRhLnRyYW5zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1NhbWVDaGlsZCAoY2hpbGQsIG9sZENoaWxkKSB7XG4gICAgcmV0dXJuIG9sZENoaWxkLmtleSA9PT0gY2hpbGQua2V5ICYmIG9sZENoaWxkLnRhZyA9PT0gY2hpbGQudGFnXG4gIH1cblxuICB2YXIgaXNOb3RUZXh0Tm9kZSA9IGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnRhZyB8fCBpc0FzeW5jUGxhY2Vob2xkZXIoYyk7IH07XG5cbiAgdmFyIGlzVlNob3dEaXJlY3RpdmUgPSBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnc2hvdyc7IH07XG5cbiAgdmFyIFRyYW5zaXRpb24gPSB7XG4gICAgbmFtZTogJ3RyYW5zaXRpb24nLFxuICAgIHByb3BzOiB0cmFuc2l0aW9uUHJvcHMsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBmaWx0ZXIgb3V0IHRleHQgbm9kZXMgKHBvc3NpYmxlIHdoaXRlc3BhY2VzKVxuICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoaXNOb3RUZXh0Tm9kZSk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyB3YXJuIG11bHRpcGxlIGVsZW1lbnRzXG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICc8dHJhbnNpdGlvbj4gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIHNpbmdsZSBlbGVtZW50LiBVc2UgJyArXG4gICAgICAgICAgJzx0cmFuc2l0aW9uLWdyb3VwPiBmb3IgbGlzdHMuJyxcbiAgICAgICAgICB0aGlzLiRwYXJlbnRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1vZGUgPSB0aGlzLm1vZGU7XG5cbiAgICAgIC8vIHdhcm4gaW52YWxpZCBtb2RlXG4gICAgICBpZiAobW9kZSAmJiBtb2RlICE9PSAnaW4tb3V0JyAmJiBtb2RlICE9PSAnb3V0LWluJ1xuICAgICAgKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ2ludmFsaWQgPHRyYW5zaXRpb24+IG1vZGU6ICcgKyBtb2RlLFxuICAgICAgICAgIHRoaXMuJHBhcmVudFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmF3Q2hpbGQgPSBjaGlsZHJlblswXTtcblxuICAgICAgLy8gaWYgdGhpcyBpcyBhIGNvbXBvbmVudCByb290IG5vZGUgYW5kIHRoZSBjb21wb25lbnQnc1xuICAgICAgLy8gcGFyZW50IGNvbnRhaW5lciBub2RlIGFsc28gaGFzIHRyYW5zaXRpb24sIHNraXAuXG4gICAgICBpZiAoaGFzUGFyZW50VHJhbnNpdGlvbih0aGlzLiR2bm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIHJhd0NoaWxkXG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGx5IHRyYW5zaXRpb24gZGF0YSB0byBjaGlsZFxuICAgICAgLy8gdXNlIGdldFJlYWxDaGlsZCgpIHRvIGlnbm9yZSBhYnN0cmFjdCBjb21wb25lbnRzIGUuZy4ga2VlcC1hbGl2ZVxuICAgICAgdmFyIGNoaWxkID0gZ2V0UmVhbENoaWxkKHJhd0NoaWxkKTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICByZXR1cm4gcmF3Q2hpbGRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2xlYXZpbmcpIHtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyKGgsIHJhd0NoaWxkKVxuICAgICAgfVxuXG4gICAgICAvLyBlbnN1cmUgYSBrZXkgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIHZub2RlIHR5cGUgYW5kIHRvIHRoaXMgdHJhbnNpdGlvblxuICAgICAgLy8gY29tcG9uZW50IGluc3RhbmNlLiBUaGlzIGtleSB3aWxsIGJlIHVzZWQgdG8gcmVtb3ZlIHBlbmRpbmcgbGVhdmluZyBub2Rlc1xuICAgICAgLy8gZHVyaW5nIGVudGVyaW5nLlxuICAgICAgdmFyIGlkID0gXCJfX3RyYW5zaXRpb24tXCIgKyAodGhpcy5fdWlkKSArIFwiLVwiO1xuICAgICAgY2hpbGQua2V5ID0gY2hpbGQua2V5ID09IG51bGxcbiAgICAgICAgPyBjaGlsZC5pc0NvbW1lbnRcbiAgICAgICAgICA/IGlkICsgJ2NvbW1lbnQnXG4gICAgICAgICAgOiBpZCArIGNoaWxkLnRhZ1xuICAgICAgICA6IGlzUHJpbWl0aXZlKGNoaWxkLmtleSlcbiAgICAgICAgICA/IChTdHJpbmcoY2hpbGQua2V5KS5pbmRleE9mKGlkKSA9PT0gMCA/IGNoaWxkLmtleSA6IGlkICsgY2hpbGQua2V5KVxuICAgICAgICAgIDogY2hpbGQua2V5O1xuXG4gICAgICB2YXIgZGF0YSA9IChjaGlsZC5kYXRhIHx8IChjaGlsZC5kYXRhID0ge30pKS50cmFuc2l0aW9uID0gZXh0cmFjdFRyYW5zaXRpb25EYXRhKHRoaXMpO1xuICAgICAgdmFyIG9sZFJhd0NoaWxkID0gdGhpcy5fdm5vZGU7XG4gICAgICB2YXIgb2xkQ2hpbGQgPSBnZXRSZWFsQ2hpbGQob2xkUmF3Q2hpbGQpO1xuXG4gICAgICAvLyBtYXJrIHYtc2hvd1xuICAgICAgLy8gc28gdGhhdCB0aGUgdHJhbnNpdGlvbiBtb2R1bGUgY2FuIGhhbmQgb3ZlciB0aGUgY29udHJvbCB0byB0aGUgZGlyZWN0aXZlXG4gICAgICBpZiAoY2hpbGQuZGF0YS5kaXJlY3RpdmVzICYmIGNoaWxkLmRhdGEuZGlyZWN0aXZlcy5zb21lKGlzVlNob3dEaXJlY3RpdmUpKSB7XG4gICAgICAgIGNoaWxkLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgb2xkQ2hpbGQgJiZcbiAgICAgICAgb2xkQ2hpbGQuZGF0YSAmJlxuICAgICAgICAhaXNTYW1lQ2hpbGQoY2hpbGQsIG9sZENoaWxkKSAmJlxuICAgICAgICAhaXNBc3luY1BsYWNlaG9sZGVyKG9sZENoaWxkKSAmJlxuICAgICAgICAvLyAjNjY4NyBjb21wb25lbnQgcm9vdCBpcyBhIGNvbW1lbnQgbm9kZVxuICAgICAgICAhKG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlICYmIG9sZENoaWxkLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZS5pc0NvbW1lbnQpXG4gICAgICApIHtcbiAgICAgICAgLy8gcmVwbGFjZSBvbGQgY2hpbGQgdHJhbnNpdGlvbiBkYXRhIHdpdGggZnJlc2ggb25lXG4gICAgICAgIC8vIGltcG9ydGFudCBmb3IgZHluYW1pYyB0cmFuc2l0aW9ucyFcbiAgICAgICAgdmFyIG9sZERhdGEgPSBvbGRDaGlsZC5kYXRhLnRyYW5zaXRpb24gPSBleHRlbmQoe30sIGRhdGEpO1xuICAgICAgICAvLyBoYW5kbGUgdHJhbnNpdGlvbiBtb2RlXG4gICAgICAgIGlmIChtb2RlID09PSAnb3V0LWluJykge1xuICAgICAgICAgIC8vIHJldHVybiBwbGFjZWhvbGRlciBub2RlIGFuZCBxdWV1ZSB1cGRhdGUgd2hlbiBsZWF2ZSBmaW5pc2hlc1xuICAgICAgICAgIHRoaXMuX2xlYXZpbmcgPSB0cnVlO1xuICAgICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdhZnRlckxlYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcyQxLl9sZWF2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzJDEuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyKGgsIHJhd0NoaWxkKVxuICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdpbi1vdXQnKSB7XG4gICAgICAgICAgaWYgKGlzQXN5bmNQbGFjZWhvbGRlcihjaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRSYXdDaGlsZFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZGVsYXllZExlYXZlO1xuICAgICAgICAgIHZhciBwZXJmb3JtTGVhdmUgPSBmdW5jdGlvbiAoKSB7IGRlbGF5ZWRMZWF2ZSgpOyB9O1xuICAgICAgICAgIG1lcmdlVk5vZGVIb29rKGRhdGEsICdhZnRlckVudGVyJywgcGVyZm9ybUxlYXZlKTtcbiAgICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnZW50ZXJDYW5jZWxsZWQnLCBwZXJmb3JtTGVhdmUpO1xuICAgICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdkZWxheUxlYXZlJywgZnVuY3Rpb24gKGxlYXZlKSB7IGRlbGF5ZWRMZWF2ZSA9IGxlYXZlOyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmF3Q2hpbGRcbiAgICB9XG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIHByb3BzID0gZXh0ZW5kKHtcbiAgICB0YWc6IFN0cmluZyxcbiAgICBtb3ZlQ2xhc3M6IFN0cmluZ1xuICB9LCB0cmFuc2l0aW9uUHJvcHMpO1xuXG4gIGRlbGV0ZSBwcm9wcy5tb2RlO1xuXG4gIHZhciBUcmFuc2l0aW9uR3JvdXAgPSB7XG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgYmVmb3JlTW91bnQ6IGZ1bmN0aW9uIGJlZm9yZU1vdW50ICgpIHtcbiAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICB2YXIgdXBkYXRlID0gdGhpcy5fdXBkYXRlO1xuICAgICAgdGhpcy5fdXBkYXRlID0gZnVuY3Rpb24gKHZub2RlLCBoeWRyYXRpbmcpIHtcbiAgICAgICAgdmFyIHJlc3RvcmVBY3RpdmVJbnN0YW5jZSA9IHNldEFjdGl2ZUluc3RhbmNlKHRoaXMkMSk7XG4gICAgICAgIC8vIGZvcmNlIHJlbW92aW5nIHBhc3NcbiAgICAgICAgdGhpcyQxLl9fcGF0Y2hfXyhcbiAgICAgICAgICB0aGlzJDEuX3Zub2RlLFxuICAgICAgICAgIHRoaXMkMS5rZXB0LFxuICAgICAgICAgIGZhbHNlLCAvLyBoeWRyYXRpbmdcbiAgICAgICAgICB0cnVlIC8vIHJlbW92ZU9ubHkgKCFpbXBvcnRhbnQsIGF2b2lkcyB1bm5lY2Vzc2FyeSBtb3ZlcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcyQxLl92bm9kZSA9IHRoaXMkMS5rZXB0O1xuICAgICAgICByZXN0b3JlQWN0aXZlSW5zdGFuY2UoKTtcbiAgICAgICAgdXBkYXRlLmNhbGwodGhpcyQxLCB2bm9kZSwgaHlkcmF0aW5nKTtcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyIChoKSB7XG4gICAgICB2YXIgdGFnID0gdGhpcy50YWcgfHwgdGhpcy4kdm5vZGUuZGF0YS50YWcgfHwgJ3NwYW4nO1xuICAgICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICB2YXIgcHJldkNoaWxkcmVuID0gdGhpcy5wcmV2Q2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgdmFyIHJhd0NoaWxkcmVuID0gdGhpcy4kc2xvdHMuZGVmYXVsdCB8fCBbXTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgIHZhciB0cmFuc2l0aW9uRGF0YSA9IGV4dHJhY3RUcmFuc2l0aW9uRGF0YSh0aGlzKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHJhd0NoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoYy50YWcpIHtcbiAgICAgICAgICBpZiAoYy5rZXkgIT0gbnVsbCAmJiBTdHJpbmcoYy5rZXkpLmluZGV4T2YoJ19fdmxpc3QnKSAhPT0gMCkge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjKTtcbiAgICAgICAgICAgIG1hcFtjLmtleV0gPSBjXG4gICAgICAgICAgICA7KGMuZGF0YSB8fCAoYy5kYXRhID0ge30pKS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkRhdGE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gYy5jb21wb25lbnRPcHRpb25zO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBvcHRzID8gKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcgfHwgJycpIDogYy50YWc7XG4gICAgICAgICAgICB3YXJuKChcIjx0cmFuc2l0aW9uLWdyb3VwPiBjaGlsZHJlbiBtdXN0IGJlIGtleWVkOiA8XCIgKyBuYW1lICsgXCI+XCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHByZXZDaGlsZHJlbikge1xuICAgICAgICB2YXIga2VwdCA9IFtdO1xuICAgICAgICB2YXIgcmVtb3ZlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBwcmV2Q2hpbGRyZW4ubGVuZ3RoOyBpJDErKykge1xuICAgICAgICAgIHZhciBjJDEgPSBwcmV2Q2hpbGRyZW5baSQxXTtcbiAgICAgICAgICBjJDEuZGF0YS50cmFuc2l0aW9uID0gdHJhbnNpdGlvbkRhdGE7XG4gICAgICAgICAgYyQxLmRhdGEucG9zID0gYyQxLmVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAobWFwW2MkMS5rZXldKSB7XG4gICAgICAgICAgICBrZXB0LnB1c2goYyQxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKGMkMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMua2VwdCA9IGgodGFnLCBudWxsLCBrZXB0KTtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gcmVtb3ZlZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgodGFnLCBudWxsLCBjaGlsZHJlbilcbiAgICB9LFxuXG4gICAgdXBkYXRlZDogZnVuY3Rpb24gdXBkYXRlZCAoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByZXZDaGlsZHJlbjtcbiAgICAgIHZhciBtb3ZlQ2xhc3MgPSB0aGlzLm1vdmVDbGFzcyB8fCAoKHRoaXMubmFtZSB8fCAndicpICsgJy1tb3ZlJyk7XG4gICAgICBpZiAoIWNoaWxkcmVuLmxlbmd0aCB8fCAhdGhpcy5oYXNNb3ZlKGNoaWxkcmVuWzBdLmVsbSwgbW92ZUNsYXNzKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gd2UgZGl2aWRlIHRoZSB3b3JrIGludG8gdGhyZWUgbG9vcHMgdG8gYXZvaWQgbWl4aW5nIERPTSByZWFkcyBhbmQgd3JpdGVzXG4gICAgICAvLyBpbiBlYWNoIGl0ZXJhdGlvbiAtIHdoaWNoIGhlbHBzIHByZXZlbnQgbGF5b3V0IHRocmFzaGluZy5cbiAgICAgIGNoaWxkcmVuLmZvckVhY2goY2FsbFBlbmRpbmdDYnMpO1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaChyZWNvcmRQb3NpdGlvbik7XG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGFwcGx5VHJhbnNsYXRpb24pO1xuXG4gICAgICAvLyBmb3JjZSByZWZsb3cgdG8gcHV0IGV2ZXJ5dGhpbmcgaW4gcG9zaXRpb25cbiAgICAgIC8vIGFzc2lnbiB0byB0aGlzIHRvIGF2b2lkIGJlaW5nIHJlbW92ZWQgaW4gdHJlZS1zaGFraW5nXG4gICAgICAvLyAkZmxvdy1kaXNhYmxlLWxpbmVcbiAgICAgIHRoaXMuX3JlZmxvdyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmIChjLmRhdGEubW92ZWQpIHtcbiAgICAgICAgICB2YXIgZWwgPSBjLmVsbTtcbiAgICAgICAgICB2YXIgcyA9IGVsLnN0eWxlO1xuICAgICAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FbmRFdmVudCwgZWwuX21vdmVDYiA9IGZ1bmN0aW9uIGNiIChlKSB7XG4gICAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWUgfHwgL3RyYW5zZm9ybSQvLnRlc3QoZS5wcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkVuZEV2ZW50LCBjYik7XG4gICAgICAgICAgICAgIGVsLl9tb3ZlQ2IgPSBudWxsO1xuICAgICAgICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIG1vdmVDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICBoYXNNb3ZlOiBmdW5jdGlvbiBoYXNNb3ZlIChlbCwgbW92ZUNsYXNzKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIWhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMuX2hhc01vdmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faGFzTW92ZVxuICAgICAgICB9XG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIGFuIGVsZW1lbnQgd2l0aCB0aGUgbW92ZSBjbGFzcyBhcHBsaWVkIGhhc1xuICAgICAgICAvLyBDU1MgdHJhbnNpdGlvbnMuIFNpbmNlIHRoZSBlbGVtZW50IG1heSBiZSBpbnNpZGUgYW4gZW50ZXJpbmdcbiAgICAgICAgLy8gdHJhbnNpdGlvbiBhdCB0aGlzIHZlcnkgbW9tZW50LCB3ZSBtYWtlIGEgY2xvbmUgb2YgaXQgYW5kIHJlbW92ZVxuICAgICAgICAvLyBhbGwgb3RoZXIgdHJhbnNpdGlvbiBjbGFzc2VzIGFwcGxpZWQgdG8gZW5zdXJlIG9ubHkgdGhlIG1vdmUgY2xhc3NcbiAgICAgICAgLy8gaXMgYXBwbGllZC5cbiAgICAgICAgdmFyIGNsb25lID0gZWwuY2xvbmVOb2RlKCk7XG4gICAgICAgIGlmIChlbC5fdHJhbnNpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgICBlbC5fdHJhbnNpdGlvbkNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7IHJlbW92ZUNsYXNzKGNsb25lLCBjbHMpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBhZGRDbGFzcyhjbG9uZSwgbW92ZUNsYXNzKTtcbiAgICAgICAgY2xvbmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy4kZWwuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgICAgICB2YXIgaW5mbyA9IGdldFRyYW5zaXRpb25JbmZvKGNsb25lKTtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQ2hpbGQoY2xvbmUpO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2hhc01vdmUgPSBpbmZvLmhhc1RyYW5zZm9ybSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY2FsbFBlbmRpbmdDYnMgKGMpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoYy5lbG0uX21vdmVDYikge1xuICAgICAgYy5lbG0uX21vdmVDYigpO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoYy5lbG0uX2VudGVyQ2IpIHtcbiAgICAgIGMuZWxtLl9lbnRlckNiKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjb3JkUG9zaXRpb24gKGMpIHtcbiAgICBjLmRhdGEubmV3UG9zID0gYy5lbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVRyYW5zbGF0aW9uIChjKSB7XG4gICAgdmFyIG9sZFBvcyA9IGMuZGF0YS5wb3M7XG4gICAgdmFyIG5ld1BvcyA9IGMuZGF0YS5uZXdQb3M7XG4gICAgdmFyIGR4ID0gb2xkUG9zLmxlZnQgLSBuZXdQb3MubGVmdDtcbiAgICB2YXIgZHkgPSBvbGRQb3MudG9wIC0gbmV3UG9zLnRvcDtcbiAgICBpZiAoZHggfHwgZHkpIHtcbiAgICAgIGMuZGF0YS5tb3ZlZCA9IHRydWU7XG4gICAgICB2YXIgcyA9IGMuZWxtLnN0eWxlO1xuICAgICAgcy50cmFuc2Zvcm0gPSBzLldlYmtpdFRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgZHggKyBcInB4LFwiICsgZHkgKyBcInB4KVwiO1xuICAgICAgcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwbGF0Zm9ybUNvbXBvbmVudHMgPSB7XG4gICAgVHJhbnNpdGlvbjogVHJhbnNpdGlvbixcbiAgICBUcmFuc2l0aW9uR3JvdXA6IFRyYW5zaXRpb25Hcm91cFxuICB9O1xuXG4gIC8qICAqL1xuXG4gIC8vIGluc3RhbGwgcGxhdGZvcm0gc3BlY2lmaWMgdXRpbHNcbiAgVnVlLmNvbmZpZy5tdXN0VXNlUHJvcCA9IG11c3RVc2VQcm9wO1xuICBWdWUuY29uZmlnLmlzUmVzZXJ2ZWRUYWcgPSBpc1Jlc2VydmVkVGFnO1xuICBWdWUuY29uZmlnLmlzUmVzZXJ2ZWRBdHRyID0gaXNSZXNlcnZlZEF0dHI7XG4gIFZ1ZS5jb25maWcuZ2V0VGFnTmFtZXNwYWNlID0gZ2V0VGFnTmFtZXNwYWNlO1xuICBWdWUuY29uZmlnLmlzVW5rbm93bkVsZW1lbnQgPSBpc1Vua25vd25FbGVtZW50O1xuXG4gIC8vIGluc3RhbGwgcGxhdGZvcm0gcnVudGltZSBkaXJlY3RpdmVzICYgY29tcG9uZW50c1xuICBleHRlbmQoVnVlLm9wdGlvbnMuZGlyZWN0aXZlcywgcGxhdGZvcm1EaXJlY3RpdmVzKTtcbiAgZXh0ZW5kKFZ1ZS5vcHRpb25zLmNvbXBvbmVudHMsIHBsYXRmb3JtQ29tcG9uZW50cyk7XG5cbiAgLy8gaW5zdGFsbCBwbGF0Zm9ybSBwYXRjaCBmdW5jdGlvblxuICBWdWUucHJvdG90eXBlLl9fcGF0Y2hfXyA9IGluQnJvd3NlciA/IHBhdGNoIDogbm9vcDtcblxuICAvLyBwdWJsaWMgbW91bnQgbWV0aG9kXG4gIFZ1ZS5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKFxuICAgIGVsLFxuICAgIGh5ZHJhdGluZ1xuICApIHtcbiAgICBlbCA9IGVsICYmIGluQnJvd3NlciA/IHF1ZXJ5KGVsKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gbW91bnRDb21wb25lbnQodGhpcywgZWwsIGh5ZHJhdGluZylcbiAgfTtcblxuICAvLyBkZXZ0b29scyBnbG9iYWwgaG9va1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaW5Ccm93c2VyKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY29uZmlnLmRldnRvb2xzKSB7XG4gICAgICAgIGlmIChkZXZ0b29scykge1xuICAgICAgICAgIGRldnRvb2xzLmVtaXQoJ2luaXQnLCBWdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGVbY29uc29sZS5pbmZvID8gJ2luZm8nIDogJ2xvZyddKFxuICAgICAgICAgICAgJ0Rvd25sb2FkIHRoZSBWdWUgRGV2dG9vbHMgZXh0ZW5zaW9uIGZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOlxcbicgK1xuICAgICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtZGV2dG9vbHMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5wcm9kdWN0aW9uVGlwICE9PSBmYWxzZSAmJlxuICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlW2NvbnNvbGUuaW5mbyA/ICdpbmZvJyA6ICdsb2cnXShcbiAgICAgICAgICBcIllvdSBhcmUgcnVubmluZyBWdWUgaW4gZGV2ZWxvcG1lbnQgbW9kZS5cXG5cIiArXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdG8gdHVybiBvbiBwcm9kdWN0aW9uIG1vZGUgd2hlbiBkZXBsb3lpbmcgZm9yIHByb2R1Y3Rpb24uXFxuXCIgK1xuICAgICAgICAgIFwiU2VlIG1vcmUgdGlwcyBhdCBodHRwczovL3Z1ZWpzLm9yZy9ndWlkZS9kZXBsb3ltZW50Lmh0bWxcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIGRlZmF1bHRUYWdSRSA9IC9cXHtcXHsoKD86LnxcXHI/XFxuKSs/KVxcfVxcfS9nO1xuICB2YXIgcmVnZXhFc2NhcGVSRSA9IC9bLS4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2c7XG5cbiAgdmFyIGJ1aWxkUmVnZXggPSBjYWNoZWQoZnVuY3Rpb24gKGRlbGltaXRlcnMpIHtcbiAgICB2YXIgb3BlbiA9IGRlbGltaXRlcnNbMF0ucmVwbGFjZShyZWdleEVzY2FwZVJFLCAnXFxcXCQmJyk7XG4gICAgdmFyIGNsb3NlID0gZGVsaW1pdGVyc1sxXS5yZXBsYWNlKHJlZ2V4RXNjYXBlUkUsICdcXFxcJCYnKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChvcGVuICsgJygoPzoufFxcXFxuKSs/KScgKyBjbG9zZSwgJ2cnKVxuICB9KTtcblxuXG5cbiAgZnVuY3Rpb24gcGFyc2VUZXh0IChcbiAgICB0ZXh0LFxuICAgIGRlbGltaXRlcnNcbiAgKSB7XG4gICAgdmFyIHRhZ1JFID0gZGVsaW1pdGVycyA/IGJ1aWxkUmVnZXgoZGVsaW1pdGVycykgOiBkZWZhdWx0VGFnUkU7XG4gICAgaWYgKCF0YWdSRS50ZXN0KHRleHQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIHRva2VucyA9IFtdO1xuICAgIHZhciByYXdUb2tlbnMgPSBbXTtcbiAgICB2YXIgbGFzdEluZGV4ID0gdGFnUkUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbWF0Y2gsIGluZGV4LCB0b2tlblZhbHVlO1xuICAgIHdoaWxlICgobWF0Y2ggPSB0YWdSRS5leGVjKHRleHQpKSkge1xuICAgICAgaW5kZXggPSBtYXRjaC5pbmRleDtcbiAgICAgIC8vIHB1c2ggdGV4dCB0b2tlblxuICAgICAgaWYgKGluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICAgIHJhd1Rva2Vucy5wdXNoKHRva2VuVmFsdWUgPSB0ZXh0LnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpKTtcbiAgICAgICAgdG9rZW5zLnB1c2goSlNPTi5zdHJpbmdpZnkodG9rZW5WYWx1ZSkpO1xuICAgICAgfVxuICAgICAgLy8gdGFnIHRva2VuXG4gICAgICB2YXIgZXhwID0gcGFyc2VGaWx0ZXJzKG1hdGNoWzFdLnRyaW0oKSk7XG4gICAgICB0b2tlbnMucHVzaCgoXCJfcyhcIiArIGV4cCArIFwiKVwiKSk7XG4gICAgICByYXdUb2tlbnMucHVzaCh7ICdAYmluZGluZyc6IGV4cCB9KTtcbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgIHJhd1Rva2Vucy5wdXNoKHRva2VuVmFsdWUgPSB0ZXh0LnNsaWNlKGxhc3RJbmRleCkpO1xuICAgICAgdG9rZW5zLnB1c2goSlNPTi5zdHJpbmdpZnkodG9rZW5WYWx1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZXhwcmVzc2lvbjogdG9rZW5zLmpvaW4oJysnKSxcbiAgICAgIHRva2VuczogcmF3VG9rZW5zXG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTm9kZSAoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgd2FybiA9IG9wdGlvbnMud2FybiB8fCBiYXNlV2FybjtcbiAgICB2YXIgc3RhdGljQ2xhc3MgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnY2xhc3MnKTtcbiAgICBpZiAoc3RhdGljQ2xhc3MpIHtcbiAgICAgIHZhciByZXMgPSBwYXJzZVRleHQoc3RhdGljQ2xhc3MsIG9wdGlvbnMuZGVsaW1pdGVycyk7XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJjbGFzcz1cXFwiXCIgKyBzdGF0aWNDbGFzcyArIFwiXFxcIjogXCIgK1xuICAgICAgICAgICdJbnRlcnBvbGF0aW9uIGluc2lkZSBhdHRyaWJ1dGVzIGhhcyBiZWVuIHJlbW92ZWQuICcgK1xuICAgICAgICAgICdVc2Ugdi1iaW5kIG9yIHRoZSBjb2xvbiBzaG9ydGhhbmQgaW5zdGVhZC4gRm9yIGV4YW1wbGUsICcgK1xuICAgICAgICAgICdpbnN0ZWFkIG9mIDxkaXYgY2xhc3M9XCJ7eyB2YWwgfX1cIj4sIHVzZSA8ZGl2IDpjbGFzcz1cInZhbFwiPi4nLFxuICAgICAgICAgIGVsLnJhd0F0dHJzTWFwWydjbGFzcyddXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdGF0aWNDbGFzcykge1xuICAgICAgZWwuc3RhdGljQ2xhc3MgPSBKU09OLnN0cmluZ2lmeShzdGF0aWNDbGFzcyk7XG4gICAgfVxuICAgIHZhciBjbGFzc0JpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ2NsYXNzJywgZmFsc2UgLyogZ2V0U3RhdGljICovKTtcbiAgICBpZiAoY2xhc3NCaW5kaW5nKSB7XG4gICAgICBlbC5jbGFzc0JpbmRpbmcgPSBjbGFzc0JpbmRpbmc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuRGF0YSAoZWwpIHtcbiAgICB2YXIgZGF0YSA9ICcnO1xuICAgIGlmIChlbC5zdGF0aWNDbGFzcykge1xuICAgICAgZGF0YSArPSBcInN0YXRpY0NsYXNzOlwiICsgKGVsLnN0YXRpY0NsYXNzKSArIFwiLFwiO1xuICAgIH1cbiAgICBpZiAoZWwuY2xhc3NCaW5kaW5nKSB7XG4gICAgICBkYXRhICs9IFwiY2xhc3M6XCIgKyAoZWwuY2xhc3NCaW5kaW5nKSArIFwiLFwiO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgdmFyIGtsYXNzJDEgPSB7XG4gICAgc3RhdGljS2V5czogWydzdGF0aWNDbGFzcyddLFxuICAgIHRyYW5zZm9ybU5vZGU6IHRyYW5zZm9ybU5vZGUsXG4gICAgZ2VuRGF0YTogZ2VuRGF0YVxuICB9O1xuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU5vZGUkMSAoZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgd2FybiA9IG9wdGlvbnMud2FybiB8fCBiYXNlV2FybjtcbiAgICB2YXIgc3RhdGljU3R5bGUgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnc3R5bGUnKTtcbiAgICBpZiAoc3RhdGljU3R5bGUpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAge1xuICAgICAgICB2YXIgcmVzID0gcGFyc2VUZXh0KHN0YXRpY1N0eWxlLCBvcHRpb25zLmRlbGltaXRlcnMpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgd2FybihcbiAgICAgICAgICAgIFwic3R5bGU9XFxcIlwiICsgc3RhdGljU3R5bGUgKyBcIlxcXCI6IFwiICtcbiAgICAgICAgICAgICdJbnRlcnBvbGF0aW9uIGluc2lkZSBhdHRyaWJ1dGVzIGhhcyBiZWVuIHJlbW92ZWQuICcgK1xuICAgICAgICAgICAgJ1VzZSB2LWJpbmQgb3IgdGhlIGNvbG9uIHNob3J0aGFuZCBpbnN0ZWFkLiBGb3IgZXhhbXBsZSwgJyArXG4gICAgICAgICAgICAnaW5zdGVhZCBvZiA8ZGl2IHN0eWxlPVwie3sgdmFsIH19XCI+LCB1c2UgPGRpdiA6c3R5bGU9XCJ2YWxcIj4uJyxcbiAgICAgICAgICAgIGVsLnJhd0F0dHJzTWFwWydzdHlsZSddXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWwuc3RhdGljU3R5bGUgPSBKU09OLnN0cmluZ2lmeShwYXJzZVN0eWxlVGV4dChzdGF0aWNTdHlsZSkpO1xuICAgIH1cblxuICAgIHZhciBzdHlsZUJpbmRpbmcgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3N0eWxlJywgZmFsc2UgLyogZ2V0U3RhdGljICovKTtcbiAgICBpZiAoc3R5bGVCaW5kaW5nKSB7XG4gICAgICBlbC5zdHlsZUJpbmRpbmcgPSBzdHlsZUJpbmRpbmc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuRGF0YSQxIChlbCkge1xuICAgIHZhciBkYXRhID0gJyc7XG4gICAgaWYgKGVsLnN0YXRpY1N0eWxlKSB7XG4gICAgICBkYXRhICs9IFwic3RhdGljU3R5bGU6XCIgKyAoZWwuc3RhdGljU3R5bGUpICsgXCIsXCI7XG4gICAgfVxuICAgIGlmIChlbC5zdHlsZUJpbmRpbmcpIHtcbiAgICAgIGRhdGEgKz0gXCJzdHlsZTooXCIgKyAoZWwuc3R5bGVCaW5kaW5nKSArIFwiKSxcIjtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIHZhciBzdHlsZSQxID0ge1xuICAgIHN0YXRpY0tleXM6IFsnc3RhdGljU3R5bGUnXSxcbiAgICB0cmFuc2Zvcm1Ob2RlOiB0cmFuc2Zvcm1Ob2RlJDEsXG4gICAgZ2VuRGF0YTogZ2VuRGF0YSQxXG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIGRlY29kZXI7XG5cbiAgdmFyIGhlID0ge1xuICAgIGRlY29kZTogZnVuY3Rpb24gZGVjb2RlIChodG1sKSB7XG4gICAgICBkZWNvZGVyID0gZGVjb2RlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRlY29kZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIHJldHVybiBkZWNvZGVyLnRleHRDb250ZW50XG4gICAgfVxuICB9O1xuXG4gIC8qICAqL1xuXG4gIHZhciBpc1VuYXJ5VGFnID0gbWFrZU1hcChcbiAgICAnYXJlYSxiYXNlLGJyLGNvbCxlbWJlZCxmcmFtZSxocixpbWcsaW5wdXQsaXNpbmRleCxrZXlnZW4sJyArXG4gICAgJ2xpbmssbWV0YSxwYXJhbSxzb3VyY2UsdHJhY2ssd2JyJ1xuICApO1xuXG4gIC8vIEVsZW1lbnRzIHRoYXQgeW91IGNhbiwgaW50ZW50aW9uYWxseSwgbGVhdmUgb3BlblxuICAvLyAoYW5kIHdoaWNoIGNsb3NlIHRoZW1zZWx2ZXMpXG4gIHZhciBjYW5CZUxlZnRPcGVuVGFnID0gbWFrZU1hcChcbiAgICAnY29sZ3JvdXAsZGQsZHQsbGksb3B0aW9ucyxwLHRkLHRmb290LHRoLHRoZWFkLHRyLHNvdXJjZSdcbiAgKTtcblxuICAvLyBIVE1MNSB0YWdzIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbCNlbGVtZW50cy0zXG4gIC8vIFBocmFzaW5nIENvbnRlbnQgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjcGhyYXNpbmctY29udGVudFxuICB2YXIgaXNOb25QaHJhc2luZ1RhZyA9IG1ha2VNYXAoXG4gICAgJ2FkZHJlc3MsYXJ0aWNsZSxhc2lkZSxiYXNlLGJsb2NrcXVvdGUsYm9keSxjYXB0aW9uLGNvbCxjb2xncm91cCxkZCwnICtcbiAgICAnZGV0YWlscyxkaWFsb2csZGl2LGRsLGR0LGZpZWxkc2V0LGZpZ2NhcHRpb24sZmlndXJlLGZvb3Rlcixmb3JtLCcgK1xuICAgICdoMSxoMixoMyxoNCxoNSxoNixoZWFkLGhlYWRlcixoZ3JvdXAsaHIsaHRtbCxsZWdlbmQsbGksbWVudWl0ZW0sbWV0YSwnICtcbiAgICAnb3B0Z3JvdXAsb3B0aW9uLHBhcmFtLHJwLHJ0LHNvdXJjZSxzdHlsZSxzdW1tYXJ5LHRib2R5LHRkLHRmb290LHRoLHRoZWFkLCcgK1xuICAgICd0aXRsZSx0cix0cmFjaydcbiAgKTtcblxuICAvKipcbiAgICogTm90IHR5cGUtY2hlY2tpbmcgdGhpcyBmaWxlIGJlY2F1c2UgaXQncyBtb3N0bHkgdmVuZG9yIGNvZGUuXG4gICAqL1xuXG4gIC8vIFJlZ3VsYXIgRXhwcmVzc2lvbnMgZm9yIHBhcnNpbmcgdGFncyBhbmQgYXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlID0gL15cXHMqKFteXFxzXCInPD5cXC89XSspKD86XFxzKig9KVxccyooPzpcIihbXlwiXSopXCIrfCcoW14nXSopJyt8KFteXFxzXCInPTw+YF0rKSkpPy87XG4gIHZhciBkeW5hbWljQXJnQXR0cmlidXRlID0gL15cXHMqKCg/OnYtW1xcdy1dKzp8QHw6fCMpXFxbW149XStcXF1bXlxcc1wiJzw+XFwvPV0qKSg/OlxccyooPSlcXHMqKD86XCIoW15cIl0qKVwiK3wnKFteJ10qKScrfChbXlxcc1wiJz08PmBdKykpKT8vO1xuICB2YXIgbmNuYW1lID0gXCJbYS16QS1aX11bXFxcXC1cXFxcLjAtOV9hLXpBLVpcIiArICh1bmljb2RlUmVnRXhwLnNvdXJjZSkgKyBcIl0qXCI7XG4gIHZhciBxbmFtZUNhcHR1cmUgPSBcIigoPzpcIiArIG5jbmFtZSArIFwiXFxcXDopP1wiICsgbmNuYW1lICsgXCIpXCI7XG4gIHZhciBzdGFydFRhZ09wZW4gPSBuZXcgUmVnRXhwKChcIl48XCIgKyBxbmFtZUNhcHR1cmUpKTtcbiAgdmFyIHN0YXJ0VGFnQ2xvc2UgPSAvXlxccyooXFwvPyk+LztcbiAgdmFyIGVuZFRhZyA9IG5ldyBSZWdFeHAoKFwiXjxcXFxcL1wiICsgcW5hbWVDYXB0dXJlICsgXCJbXj5dKj5cIikpO1xuICB2YXIgZG9jdHlwZSA9IC9ePCFET0NUWVBFIFtePl0rPi9pO1xuICAvLyAjNzI5ODogZXNjYXBlIC0gdG8gYXZvaWQgYmVpbmcgcGFzc2VkIGFzIEhUTUwgY29tbWVudCB3aGVuIGlubGluZWQgaW4gcGFnZVxuICB2YXIgY29tbWVudCA9IC9ePCFcXC0tLztcbiAgdmFyIGNvbmRpdGlvbmFsQ29tbWVudCA9IC9ePCFcXFsvO1xuXG4gIC8vIFNwZWNpYWwgRWxlbWVudHMgKGNhbiBjb250YWluIGFueXRoaW5nKVxuICB2YXIgaXNQbGFpblRleHRFbGVtZW50ID0gbWFrZU1hcCgnc2NyaXB0LHN0eWxlLHRleHRhcmVhJywgdHJ1ZSk7XG4gIHZhciByZUNhY2hlID0ge307XG5cbiAgdmFyIGRlY29kaW5nTWFwID0ge1xuICAgICcmbHQ7JzogJzwnLFxuICAgICcmZ3Q7JzogJz4nLFxuICAgICcmcXVvdDsnOiAnXCInLFxuICAgICcmYW1wOyc6ICcmJyxcbiAgICAnJiMxMDsnOiAnXFxuJyxcbiAgICAnJiM5Oyc6ICdcXHQnLFxuICAgICcmIzM5Oyc6IFwiJ1wiXG4gIH07XG4gIHZhciBlbmNvZGVkQXR0ciA9IC8mKD86bHR8Z3R8cXVvdHxhbXB8IzM5KTsvZztcbiAgdmFyIGVuY29kZWRBdHRyV2l0aE5ld0xpbmVzID0gLyYoPzpsdHxndHxxdW90fGFtcHwjMzl8IzEwfCM5KTsvZztcblxuICAvLyAjNTk5MlxuICB2YXIgaXNJZ25vcmVOZXdsaW5lVGFnID0gbWFrZU1hcCgncHJlLHRleHRhcmVhJywgdHJ1ZSk7XG4gIHZhciBzaG91bGRJZ25vcmVGaXJzdE5ld2xpbmUgPSBmdW5jdGlvbiAodGFnLCBodG1sKSB7IHJldHVybiB0YWcgJiYgaXNJZ25vcmVOZXdsaW5lVGFnKHRhZykgJiYgaHRtbFswXSA9PT0gJ1xcbic7IH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlQXR0ciAodmFsdWUsIHNob3VsZERlY29kZU5ld2xpbmVzKSB7XG4gICAgdmFyIHJlID0gc2hvdWxkRGVjb2RlTmV3bGluZXMgPyBlbmNvZGVkQXR0cldpdGhOZXdMaW5lcyA6IGVuY29kZWRBdHRyO1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlLCBmdW5jdGlvbiAobWF0Y2gpIHsgcmV0dXJuIGRlY29kaW5nTWFwW21hdGNoXTsgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSFRNTCAoaHRtbCwgb3B0aW9ucykge1xuICAgIHZhciBzdGFjayA9IFtdO1xuICAgIHZhciBleHBlY3RIVE1MID0gb3B0aW9ucy5leHBlY3RIVE1MO1xuICAgIHZhciBpc1VuYXJ5VGFnJCQxID0gb3B0aW9ucy5pc1VuYXJ5VGFnIHx8IG5vO1xuICAgIHZhciBjYW5CZUxlZnRPcGVuVGFnJCQxID0gb3B0aW9ucy5jYW5CZUxlZnRPcGVuVGFnIHx8IG5vO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGxhc3QsIGxhc3RUYWc7XG4gICAgd2hpbGUgKGh0bWwpIHtcbiAgICAgIGxhc3QgPSBodG1sO1xuICAgICAgLy8gTWFrZSBzdXJlIHdlJ3JlIG5vdCBpbiBhIHBsYWludGV4dCBjb250ZW50IGVsZW1lbnQgbGlrZSBzY3JpcHQvc3R5bGVcbiAgICAgIGlmICghbGFzdFRhZyB8fCAhaXNQbGFpblRleHRFbGVtZW50KGxhc3RUYWcpKSB7XG4gICAgICAgIHZhciB0ZXh0RW5kID0gaHRtbC5pbmRleE9mKCc8Jyk7XG4gICAgICAgIGlmICh0ZXh0RW5kID09PSAwKSB7XG4gICAgICAgICAgLy8gQ29tbWVudDpcbiAgICAgICAgICBpZiAoY29tbWVudC50ZXN0KGh0bWwpKSB7XG4gICAgICAgICAgICB2YXIgY29tbWVudEVuZCA9IGh0bWwuaW5kZXhPZignLS0+Jyk7XG5cbiAgICAgICAgICAgIGlmIChjb21tZW50RW5kID49IDApIHtcbiAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2hvdWxkS2VlcENvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbW1lbnQoaHRtbC5zdWJzdHJpbmcoNCwgY29tbWVudEVuZCksIGluZGV4LCBpbmRleCArIGNvbW1lbnRFbmQgKyAzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhZHZhbmNlKGNvbW1lbnRFbmQgKyAzKTtcbiAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbmRpdGlvbmFsX2NvbW1lbnQjRG93bmxldmVsLXJldmVhbGVkX2NvbmRpdGlvbmFsX2NvbW1lbnRcbiAgICAgICAgICBpZiAoY29uZGl0aW9uYWxDb21tZW50LnRlc3QoaHRtbCkpIHtcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25hbEVuZCA9IGh0bWwuaW5kZXhPZignXT4nKTtcblxuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsRW5kID49IDApIHtcbiAgICAgICAgICAgICAgYWR2YW5jZShjb25kaXRpb25hbEVuZCArIDIpO1xuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERvY3R5cGU6XG4gICAgICAgICAgdmFyIGRvY3R5cGVNYXRjaCA9IGh0bWwubWF0Y2goZG9jdHlwZSk7XG4gICAgICAgICAgaWYgKGRvY3R5cGVNYXRjaCkge1xuICAgICAgICAgICAgYWR2YW5jZShkb2N0eXBlTWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRW5kIHRhZzpcbiAgICAgICAgICB2YXIgZW5kVGFnTWF0Y2ggPSBodG1sLm1hdGNoKGVuZFRhZyk7XG4gICAgICAgICAgaWYgKGVuZFRhZ01hdGNoKSB7XG4gICAgICAgICAgICB2YXIgY3VySW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIGFkdmFuY2UoZW5kVGFnTWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIHBhcnNlRW5kVGFnKGVuZFRhZ01hdGNoWzFdLCBjdXJJbmRleCwgaW5kZXgpO1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTdGFydCB0YWc6XG4gICAgICAgICAgdmFyIHN0YXJ0VGFnTWF0Y2ggPSBwYXJzZVN0YXJ0VGFnKCk7XG4gICAgICAgICAgaWYgKHN0YXJ0VGFnTWF0Y2gpIHtcbiAgICAgICAgICAgIGhhbmRsZVN0YXJ0VGFnKHN0YXJ0VGFnTWF0Y2gpO1xuICAgICAgICAgICAgaWYgKHNob3VsZElnbm9yZUZpcnN0TmV3bGluZShzdGFydFRhZ01hdGNoLnRhZ05hbWUsIGh0bWwpKSB7XG4gICAgICAgICAgICAgIGFkdmFuY2UoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0ID0gKHZvaWQgMCksIHJlc3QgPSAodm9pZCAwKSwgbmV4dCA9ICh2b2lkIDApO1xuICAgICAgICBpZiAodGV4dEVuZCA+PSAwKSB7XG4gICAgICAgICAgcmVzdCA9IGh0bWwuc2xpY2UodGV4dEVuZCk7XG4gICAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgIWVuZFRhZy50ZXN0KHJlc3QpICYmXG4gICAgICAgICAgICAhc3RhcnRUYWdPcGVuLnRlc3QocmVzdCkgJiZcbiAgICAgICAgICAgICFjb21tZW50LnRlc3QocmVzdCkgJiZcbiAgICAgICAgICAgICFjb25kaXRpb25hbENvbW1lbnQudGVzdChyZXN0KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gPCBpbiBwbGFpbiB0ZXh0LCBiZSBmb3JnaXZpbmcgYW5kIHRyZWF0IGl0IGFzIHRleHRcbiAgICAgICAgICAgIG5leHQgPSByZXN0LmluZGV4T2YoJzwnLCAxKTtcbiAgICAgICAgICAgIGlmIChuZXh0IDwgMCkgeyBicmVhayB9XG4gICAgICAgICAgICB0ZXh0RW5kICs9IG5leHQ7XG4gICAgICAgICAgICByZXN0ID0gaHRtbC5zbGljZSh0ZXh0RW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGV4dCA9IGh0bWwuc3Vic3RyaW5nKDAsIHRleHRFbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRleHRFbmQgPCAwKSB7XG4gICAgICAgICAgdGV4dCA9IGh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgIGFkdmFuY2UodGV4dC5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnMgJiYgdGV4dCkge1xuICAgICAgICAgIG9wdGlvbnMuY2hhcnModGV4dCwgaW5kZXggLSB0ZXh0Lmxlbmd0aCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZW5kVGFnTGVuZ3RoID0gMDtcbiAgICAgICAgdmFyIHN0YWNrZWRUYWcgPSBsYXN0VGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciByZVN0YWNrZWRUYWcgPSByZUNhY2hlW3N0YWNrZWRUYWddIHx8IChyZUNhY2hlW3N0YWNrZWRUYWddID0gbmV3IFJlZ0V4cCgnKFtcXFxcc1xcXFxTXSo/KSg8LycgKyBzdGFja2VkVGFnICsgJ1tePl0qPiknLCAnaScpKTtcbiAgICAgICAgdmFyIHJlc3QkMSA9IGh0bWwucmVwbGFjZShyZVN0YWNrZWRUYWcsIGZ1bmN0aW9uIChhbGwsIHRleHQsIGVuZFRhZykge1xuICAgICAgICAgIGVuZFRhZ0xlbmd0aCA9IGVuZFRhZy5sZW5ndGg7XG4gICAgICAgICAgaWYgKCFpc1BsYWluVGV4dEVsZW1lbnQoc3RhY2tlZFRhZykgJiYgc3RhY2tlZFRhZyAhPT0gJ25vc2NyaXB0Jykge1xuICAgICAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAgICAgLnJlcGxhY2UoLzwhXFwtLShbXFxzXFxTXSo/KS0tPi9nLCAnJDEnKSAvLyAjNzI5OFxuICAgICAgICAgICAgICAucmVwbGFjZSgvPCFcXFtDREFUQVxcWyhbXFxzXFxTXSo/KV1dPi9nLCAnJDEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNob3VsZElnbm9yZUZpcnN0TmV3bGluZShzdGFja2VkVGFnLCB0ZXh0KSkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuc2xpY2UoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcHRpb25zLmNoYXJzKSB7XG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzKHRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgfSk7XG4gICAgICAgIGluZGV4ICs9IGh0bWwubGVuZ3RoIC0gcmVzdCQxLmxlbmd0aDtcbiAgICAgICAgaHRtbCA9IHJlc3QkMTtcbiAgICAgICAgcGFyc2VFbmRUYWcoc3RhY2tlZFRhZywgaW5kZXggLSBlbmRUYWdMZW5ndGgsIGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGh0bWwgPT09IGxhc3QpIHtcbiAgICAgICAgb3B0aW9ucy5jaGFycyAmJiBvcHRpb25zLmNoYXJzKGh0bWwpO1xuICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCAmJiBvcHRpb25zLndhcm4pIHtcbiAgICAgICAgICBvcHRpb25zLndhcm4oKFwiTWFsLWZvcm1hdHRlZCB0YWcgYXQgZW5kIG9mIHRlbXBsYXRlOiBcXFwiXCIgKyBodG1sICsgXCJcXFwiXCIpLCB7IHN0YXJ0OiBpbmRleCArIGh0bWwubGVuZ3RoIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYW55IHJlbWFpbmluZyB0YWdzXG4gICAgcGFyc2VFbmRUYWcoKTtcblxuICAgIGZ1bmN0aW9uIGFkdmFuY2UgKG4pIHtcbiAgICAgIGluZGV4ICs9IG47XG4gICAgICBodG1sID0gaHRtbC5zdWJzdHJpbmcobik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VTdGFydFRhZyAoKSB7XG4gICAgICB2YXIgc3RhcnQgPSBodG1sLm1hdGNoKHN0YXJ0VGFnT3Blbik7XG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgdmFyIG1hdGNoID0ge1xuICAgICAgICAgIHRhZ05hbWU6IHN0YXJ0WzFdLFxuICAgICAgICAgIGF0dHJzOiBbXSxcbiAgICAgICAgICBzdGFydDogaW5kZXhcbiAgICAgICAgfTtcbiAgICAgICAgYWR2YW5jZShzdGFydFswXS5sZW5ndGgpO1xuICAgICAgICB2YXIgZW5kLCBhdHRyO1xuICAgICAgICB3aGlsZSAoIShlbmQgPSBodG1sLm1hdGNoKHN0YXJ0VGFnQ2xvc2UpKSAmJiAoYXR0ciA9IGh0bWwubWF0Y2goZHluYW1pY0FyZ0F0dHJpYnV0ZSkgfHwgaHRtbC5tYXRjaChhdHRyaWJ1dGUpKSkge1xuICAgICAgICAgIGF0dHIuc3RhcnQgPSBpbmRleDtcbiAgICAgICAgICBhZHZhbmNlKGF0dHJbMF0ubGVuZ3RoKTtcbiAgICAgICAgICBhdHRyLmVuZCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoLmF0dHJzLnB1c2goYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZCkge1xuICAgICAgICAgIG1hdGNoLnVuYXJ5U2xhc2ggPSBlbmRbMV07XG4gICAgICAgICAgYWR2YW5jZShlbmRbMF0ubGVuZ3RoKTtcbiAgICAgICAgICBtYXRjaC5lbmQgPSBpbmRleDtcbiAgICAgICAgICByZXR1cm4gbWF0Y2hcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXJ0VGFnIChtYXRjaCkge1xuICAgICAgdmFyIHRhZ05hbWUgPSBtYXRjaC50YWdOYW1lO1xuICAgICAgdmFyIHVuYXJ5U2xhc2ggPSBtYXRjaC51bmFyeVNsYXNoO1xuXG4gICAgICBpZiAoZXhwZWN0SFRNTCkge1xuICAgICAgICBpZiAobGFzdFRhZyA9PT0gJ3AnICYmIGlzTm9uUGhyYXNpbmdUYWcodGFnTmFtZSkpIHtcbiAgICAgICAgICBwYXJzZUVuZFRhZyhsYXN0VGFnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQmVMZWZ0T3BlblRhZyQkMSh0YWdOYW1lKSAmJiBsYXN0VGFnID09PSB0YWdOYW1lKSB7XG4gICAgICAgICAgcGFyc2VFbmRUYWcodGFnTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHVuYXJ5ID0gaXNVbmFyeVRhZyQkMSh0YWdOYW1lKSB8fCAhIXVuYXJ5U2xhc2g7XG5cbiAgICAgIHZhciBsID0gbWF0Y2guYXR0cnMubGVuZ3RoO1xuICAgICAgdmFyIGF0dHJzID0gbmV3IEFycmF5KGwpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBtYXRjaC5hdHRyc1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gYXJnc1szXSB8fCBhcmdzWzRdIHx8IGFyZ3NbNV0gfHwgJyc7XG4gICAgICAgIHZhciBzaG91bGREZWNvZGVOZXdsaW5lcyA9IHRhZ05hbWUgPT09ICdhJyAmJiBhcmdzWzFdID09PSAnaHJlZidcbiAgICAgICAgICA/IG9wdGlvbnMuc2hvdWxkRGVjb2RlTmV3bGluZXNGb3JIcmVmXG4gICAgICAgICAgOiBvcHRpb25zLnNob3VsZERlY29kZU5ld2xpbmVzO1xuICAgICAgICBhdHRyc1tpXSA9IHtcbiAgICAgICAgICBuYW1lOiBhcmdzWzFdLFxuICAgICAgICAgIHZhbHVlOiBkZWNvZGVBdHRyKHZhbHVlLCBzaG91bGREZWNvZGVOZXdsaW5lcylcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3V0cHV0U291cmNlUmFuZ2UpIHtcbiAgICAgICAgICBhdHRyc1tpXS5zdGFydCA9IGFyZ3Muc3RhcnQgKyBhcmdzWzBdLm1hdGNoKC9eXFxzKi8pLmxlbmd0aDtcbiAgICAgICAgICBhdHRyc1tpXS5lbmQgPSBhcmdzLmVuZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXVuYXJ5KSB7XG4gICAgICAgIHN0YWNrLnB1c2goeyB0YWc6IHRhZ05hbWUsIGxvd2VyQ2FzZWRUYWc6IHRhZ05hbWUudG9Mb3dlckNhc2UoKSwgYXR0cnM6IGF0dHJzLCBzdGFydDogbWF0Y2guc3RhcnQsIGVuZDogbWF0Y2guZW5kIH0pO1xuICAgICAgICBsYXN0VGFnID0gdGFnTmFtZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuc3RhcnQpIHtcbiAgICAgICAgb3B0aW9ucy5zdGFydCh0YWdOYW1lLCBhdHRycywgdW5hcnksIG1hdGNoLnN0YXJ0LCBtYXRjaC5lbmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlRW5kVGFnICh0YWdOYW1lLCBzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgcG9zLCBsb3dlckNhc2VkVGFnTmFtZTtcbiAgICAgIGlmIChzdGFydCA9PSBudWxsKSB7IHN0YXJ0ID0gaW5kZXg7IH1cbiAgICAgIGlmIChlbmQgPT0gbnVsbCkgeyBlbmQgPSBpbmRleDsgfVxuXG4gICAgICAvLyBGaW5kIHRoZSBjbG9zZXN0IG9wZW5lZCB0YWcgb2YgdGhlIHNhbWUgdHlwZVxuICAgICAgaWYgKHRhZ05hbWUpIHtcbiAgICAgICAgbG93ZXJDYXNlZFRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGZvciAocG9zID0gc3RhY2subGVuZ3RoIC0gMTsgcG9zID49IDA7IHBvcy0tKSB7XG4gICAgICAgICAgaWYgKHN0YWNrW3Bvc10ubG93ZXJDYXNlZFRhZyA9PT0gbG93ZXJDYXNlZFRhZ05hbWUpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBubyB0YWcgbmFtZSBpcyBwcm92aWRlZCwgY2xlYW4gc2hvcFxuICAgICAgICBwb3MgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgLy8gQ2xvc2UgYWxsIHRoZSBvcGVuIGVsZW1lbnRzLCB1cCB0aGUgc3RhY2tcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gcG9zOyBpLS0pIHtcbiAgICAgICAgICBpZiAoaSA+IHBvcyB8fCAhdGFnTmFtZSAmJlxuICAgICAgICAgICAgb3B0aW9ucy53YXJuXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBvcHRpb25zLndhcm4oXG4gICAgICAgICAgICAgIChcInRhZyA8XCIgKyAoc3RhY2tbaV0udGFnKSArIFwiPiBoYXMgbm8gbWF0Y2hpbmcgZW5kIHRhZy5cIiksXG4gICAgICAgICAgICAgIHsgc3RhcnQ6IHN0YWNrW2ldLnN0YXJ0LCBlbmQ6IHN0YWNrW2ldLmVuZCB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZW5kKHN0YWNrW2ldLnRhZywgc3RhcnQsIGVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBvcGVuIGVsZW1lbnRzIGZyb20gdGhlIHN0YWNrXG4gICAgICAgIHN0YWNrLmxlbmd0aCA9IHBvcztcbiAgICAgICAgbGFzdFRhZyA9IHBvcyAmJiBzdGFja1twb3MgLSAxXS50YWc7XG4gICAgICB9IGVsc2UgaWYgKGxvd2VyQ2FzZWRUYWdOYW1lID09PSAnYnInKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnN0YXJ0KSB7XG4gICAgICAgICAgb3B0aW9ucy5zdGFydCh0YWdOYW1lLCBbXSwgdHJ1ZSwgc3RhcnQsIGVuZCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobG93ZXJDYXNlZFRhZ05hbWUgPT09ICdwJykge1xuICAgICAgICBpZiAob3B0aW9ucy5zdGFydCkge1xuICAgICAgICAgIG9wdGlvbnMuc3RhcnQodGFnTmFtZSwgW10sIGZhbHNlLCBzdGFydCwgZW5kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5lbmQpIHtcbiAgICAgICAgICBvcHRpb25zLmVuZCh0YWdOYW1lLCBzdGFydCwgZW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIHZhciBvblJFID0gL15AfF52LW9uOi87XG4gIHZhciBkaXJSRSA9IC9edi18XkB8Xjp8XiMvO1xuICB2YXIgZm9yQWxpYXNSRSA9IC8oW1xcc1xcU10qPylcXHMrKD86aW58b2YpXFxzKyhbXFxzXFxTXSopLztcbiAgdmFyIGZvckl0ZXJhdG9yUkUgPSAvLChbXixcXH1cXF1dKikoPzosKFteLFxcfVxcXV0qKSk/JC87XG4gIHZhciBzdHJpcFBhcmVuc1JFID0gL15cXCh8XFwpJC9nO1xuICB2YXIgZHluYW1pY0FyZ1JFID0gL15cXFsuKlxcXSQvO1xuXG4gIHZhciBhcmdSRSA9IC86KC4qKSQvO1xuICB2YXIgYmluZFJFID0gL146fF5cXC58XnYtYmluZDovO1xuICB2YXIgbW9kaWZpZXJSRSA9IC9cXC5bXi5cXF1dKyg/PVteXFxdXSokKS9nO1xuXG4gIHZhciBzbG90UkUgPSAvXnYtc2xvdCg6fCQpfF4jLztcblxuICB2YXIgbGluZUJyZWFrUkUgPSAvW1xcclxcbl0vO1xuICB2YXIgd2hpdGVzcGFjZVJFJDEgPSAvXFxzKy9nO1xuXG4gIHZhciBpbnZhbGlkQXR0cmlidXRlUkUgPSAvW1xcc1wiJzw+XFwvPV0vO1xuXG4gIHZhciBkZWNvZGVIVE1MQ2FjaGVkID0gY2FjaGVkKGhlLmRlY29kZSk7XG5cbiAgdmFyIGVtcHR5U2xvdFNjb3BlVG9rZW4gPSBcIl9lbXB0eV9cIjtcblxuICAvLyBjb25maWd1cmFibGUgc3RhdGVcbiAgdmFyIHdhcm4kMjtcbiAgdmFyIGRlbGltaXRlcnM7XG4gIHZhciB0cmFuc2Zvcm1zO1xuICB2YXIgcHJlVHJhbnNmb3JtcztcbiAgdmFyIHBvc3RUcmFuc2Zvcm1zO1xuICB2YXIgcGxhdGZvcm1Jc1ByZVRhZztcbiAgdmFyIHBsYXRmb3JtTXVzdFVzZVByb3A7XG4gIHZhciBwbGF0Zm9ybUdldFRhZ05hbWVzcGFjZTtcbiAgdmFyIG1heWJlQ29tcG9uZW50O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFTVEVsZW1lbnQgKFxuICAgIHRhZyxcbiAgICBhdHRycyxcbiAgICBwYXJlbnRcbiAgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IDEsXG4gICAgICB0YWc6IHRhZyxcbiAgICAgIGF0dHJzTGlzdDogYXR0cnMsXG4gICAgICBhdHRyc01hcDogbWFrZUF0dHJzTWFwKGF0dHJzKSxcbiAgICAgIHJhd0F0dHJzTWFwOiB7fSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgY2hpbGRyZW46IFtdXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgSFRNTCBzdHJpbmcgdG8gQVNULlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2UgKFxuICAgIHRlbXBsYXRlLFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgd2FybiQyID0gb3B0aW9ucy53YXJuIHx8IGJhc2VXYXJuO1xuXG4gICAgcGxhdGZvcm1Jc1ByZVRhZyA9IG9wdGlvbnMuaXNQcmVUYWcgfHwgbm87XG4gICAgcGxhdGZvcm1NdXN0VXNlUHJvcCA9IG9wdGlvbnMubXVzdFVzZVByb3AgfHwgbm87XG4gICAgcGxhdGZvcm1HZXRUYWdOYW1lc3BhY2UgPSBvcHRpb25zLmdldFRhZ05hbWVzcGFjZSB8fCBubztcbiAgICB2YXIgaXNSZXNlcnZlZFRhZyA9IG9wdGlvbnMuaXNSZXNlcnZlZFRhZyB8fCBubztcbiAgICBtYXliZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gISFlbC5jb21wb25lbnQgfHwgIWlzUmVzZXJ2ZWRUYWcoZWwudGFnKTsgfTtcblxuICAgIHRyYW5zZm9ybXMgPSBwbHVja01vZHVsZUZ1bmN0aW9uKG9wdGlvbnMubW9kdWxlcywgJ3RyYW5zZm9ybU5vZGUnKTtcbiAgICBwcmVUcmFuc2Zvcm1zID0gcGx1Y2tNb2R1bGVGdW5jdGlvbihvcHRpb25zLm1vZHVsZXMsICdwcmVUcmFuc2Zvcm1Ob2RlJyk7XG4gICAgcG9zdFRyYW5zZm9ybXMgPSBwbHVja01vZHVsZUZ1bmN0aW9uKG9wdGlvbnMubW9kdWxlcywgJ3Bvc3RUcmFuc2Zvcm1Ob2RlJyk7XG5cbiAgICBkZWxpbWl0ZXJzID0gb3B0aW9ucy5kZWxpbWl0ZXJzO1xuXG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgdmFyIHByZXNlcnZlV2hpdGVzcGFjZSA9IG9wdGlvbnMucHJlc2VydmVXaGl0ZXNwYWNlICE9PSBmYWxzZTtcbiAgICB2YXIgd2hpdGVzcGFjZU9wdGlvbiA9IG9wdGlvbnMud2hpdGVzcGFjZTtcbiAgICB2YXIgcm9vdDtcbiAgICB2YXIgY3VycmVudFBhcmVudDtcbiAgICB2YXIgaW5WUHJlID0gZmFsc2U7XG4gICAgdmFyIGluUHJlID0gZmFsc2U7XG4gICAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gd2Fybk9uY2UgKG1zZywgcmFuZ2UpIHtcbiAgICAgIGlmICghd2FybmVkKSB7XG4gICAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICAgIHdhcm4kMihtc2csIHJhbmdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZUVsZW1lbnQgKGVsZW1lbnQpIHtcbiAgICAgIHRyaW1FbmRpbmdXaGl0ZXNwYWNlKGVsZW1lbnQpO1xuICAgICAgaWYgKCFpblZQcmUgJiYgIWVsZW1lbnQucHJvY2Vzc2VkKSB7XG4gICAgICAgIGVsZW1lbnQgPSBwcm9jZXNzRWxlbWVudChlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIC8vIHRyZWUgbWFuYWdlbWVudFxuICAgICAgaWYgKCFzdGFjay5sZW5ndGggJiYgZWxlbWVudCAhPT0gcm9vdCkge1xuICAgICAgICAvLyBhbGxvdyByb290IGVsZW1lbnRzIHdpdGggdi1pZiwgdi1lbHNlLWlmIGFuZCB2LWVsc2VcbiAgICAgICAgaWYgKHJvb3QuaWYgJiYgKGVsZW1lbnQuZWxzZWlmIHx8IGVsZW1lbnQuZWxzZSkpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjaGVja1Jvb3RDb25zdHJhaW50cyhlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSWZDb25kaXRpb24ocm9vdCwge1xuICAgICAgICAgICAgZXhwOiBlbGVtZW50LmVsc2VpZixcbiAgICAgICAgICAgIGJsb2NrOiBlbGVtZW50XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgICBcIkNvbXBvbmVudCB0ZW1wbGF0ZSBzaG91bGQgY29udGFpbiBleGFjdGx5IG9uZSByb290IGVsZW1lbnQuIFwiICtcbiAgICAgICAgICAgIFwiSWYgeW91IGFyZSB1c2luZyB2LWlmIG9uIG11bHRpcGxlIGVsZW1lbnRzLCBcIiArXG4gICAgICAgICAgICBcInVzZSB2LWVsc2UtaWYgdG8gY2hhaW4gdGhlbSBpbnN0ZWFkLlwiLFxuICAgICAgICAgICAgeyBzdGFydDogZWxlbWVudC5zdGFydCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRQYXJlbnQgJiYgIWVsZW1lbnQuZm9yYmlkZGVuKSB7XG4gICAgICAgIGlmIChlbGVtZW50LmVsc2VpZiB8fCBlbGVtZW50LmVsc2UpIHtcbiAgICAgICAgICBwcm9jZXNzSWZDb25kaXRpb25zKGVsZW1lbnQsIGN1cnJlbnRQYXJlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlbGVtZW50LnNsb3RTY29wZSkge1xuICAgICAgICAgICAgLy8gc2NvcGVkIHNsb3RcbiAgICAgICAgICAgIC8vIGtlZXAgaXQgaW4gdGhlIGNoaWxkcmVuIGxpc3Qgc28gdGhhdCB2LWVsc2UoLWlmKSBjb25kaXRpb25zIGNhblxuICAgICAgICAgICAgLy8gZmluZCBpdCBhcyB0aGUgcHJldiBub2RlLlxuICAgICAgICAgICAgdmFyIG5hbWUgPSBlbGVtZW50LnNsb3RUYXJnZXQgfHwgJ1wiZGVmYXVsdFwiJ1xuICAgICAgICAgICAgOyhjdXJyZW50UGFyZW50LnNjb3BlZFNsb3RzIHx8IChjdXJyZW50UGFyZW50LnNjb3BlZFNsb3RzID0ge30pKVtuYW1lXSA9IGVsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRQYXJlbnQuY2hpbGRyZW4ucHVzaChlbGVtZW50KTtcbiAgICAgICAgICBlbGVtZW50LnBhcmVudCA9IGN1cnJlbnRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZmluYWwgY2hpbGRyZW4gY2xlYW51cFxuICAgICAgLy8gZmlsdGVyIG91dCBzY29wZWQgc2xvdHNcbiAgICAgIGVsZW1lbnQuY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gIShjKS5zbG90U2NvcGU7IH0pO1xuICAgICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHdoaXRlc3BhY2Ugbm9kZSBhZ2FpblxuICAgICAgdHJpbUVuZGluZ1doaXRlc3BhY2UoZWxlbWVudCk7XG5cbiAgICAgIC8vIGNoZWNrIHByZSBzdGF0ZVxuICAgICAgaWYgKGVsZW1lbnQucHJlKSB7XG4gICAgICAgIGluVlByZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXRmb3JtSXNQcmVUYWcoZWxlbWVudC50YWcpKSB7XG4gICAgICAgIGluUHJlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBhcHBseSBwb3N0LXRyYW5zZm9ybXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdFRyYW5zZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9zdFRyYW5zZm9ybXNbaV0oZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpbUVuZGluZ1doaXRlc3BhY2UgKGVsKSB7XG4gICAgICAvLyByZW1vdmUgdHJhaWxpbmcgd2hpdGVzcGFjZSBub2RlXG4gICAgICBpZiAoIWluUHJlKSB7XG4gICAgICAgIHZhciBsYXN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgIChsYXN0Tm9kZSA9IGVsLmNoaWxkcmVuW2VsLmNoaWxkcmVuLmxlbmd0aCAtIDFdKSAmJlxuICAgICAgICAgIGxhc3ROb2RlLnR5cGUgPT09IDMgJiZcbiAgICAgICAgICBsYXN0Tm9kZS50ZXh0ID09PSAnICdcbiAgICAgICAgKSB7XG4gICAgICAgICAgZWwuY2hpbGRyZW4ucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Jvb3RDb25zdHJhaW50cyAoZWwpIHtcbiAgICAgIGlmIChlbC50YWcgPT09ICdzbG90JyB8fCBlbC50YWcgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgXCJDYW5ub3QgdXNlIDxcIiArIChlbC50YWcpICsgXCI+IGFzIGNvbXBvbmVudCByb290IGVsZW1lbnQgYmVjYXVzZSBpdCBtYXkgXCIgK1xuICAgICAgICAgICdjb250YWluIG11bHRpcGxlIG5vZGVzLicsXG4gICAgICAgICAgeyBzdGFydDogZWwuc3RhcnQgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGVsLmF0dHJzTWFwLmhhc093blByb3BlcnR5KCd2LWZvcicpKSB7XG4gICAgICAgIHdhcm5PbmNlKFxuICAgICAgICAgICdDYW5ub3QgdXNlIHYtZm9yIG9uIHN0YXRlZnVsIGNvbXBvbmVudCByb290IGVsZW1lbnQgYmVjYXVzZSAnICtcbiAgICAgICAgICAnaXQgcmVuZGVycyBtdWx0aXBsZSBlbGVtZW50cy4nLFxuICAgICAgICAgIGVsLnJhd0F0dHJzTWFwWyd2LWZvciddXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFyc2VIVE1MKHRlbXBsYXRlLCB7XG4gICAgICB3YXJuOiB3YXJuJDIsXG4gICAgICBleHBlY3RIVE1MOiBvcHRpb25zLmV4cGVjdEhUTUwsXG4gICAgICBpc1VuYXJ5VGFnOiBvcHRpb25zLmlzVW5hcnlUYWcsXG4gICAgICBjYW5CZUxlZnRPcGVuVGFnOiBvcHRpb25zLmNhbkJlTGVmdE9wZW5UYWcsXG4gICAgICBzaG91bGREZWNvZGVOZXdsaW5lczogb3B0aW9ucy5zaG91bGREZWNvZGVOZXdsaW5lcyxcbiAgICAgIHNob3VsZERlY29kZU5ld2xpbmVzRm9ySHJlZjogb3B0aW9ucy5zaG91bGREZWNvZGVOZXdsaW5lc0ZvckhyZWYsXG4gICAgICBzaG91bGRLZWVwQ29tbWVudDogb3B0aW9ucy5jb21tZW50cyxcbiAgICAgIG91dHB1dFNvdXJjZVJhbmdlOiBvcHRpb25zLm91dHB1dFNvdXJjZVJhbmdlLFxuICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0ICh0YWcsIGF0dHJzLCB1bmFyeSwgc3RhcnQkMSwgZW5kKSB7XG4gICAgICAgIC8vIGNoZWNrIG5hbWVzcGFjZS5cbiAgICAgICAgLy8gaW5oZXJpdCBwYXJlbnQgbnMgaWYgdGhlcmUgaXMgb25lXG4gICAgICAgIHZhciBucyA9IChjdXJyZW50UGFyZW50ICYmIGN1cnJlbnRQYXJlbnQubnMpIHx8IHBsYXRmb3JtR2V0VGFnTmFtZXNwYWNlKHRhZyk7XG5cbiAgICAgICAgLy8gaGFuZGxlIElFIHN2ZyBidWdcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChpc0lFICYmIG5zID09PSAnc3ZnJykge1xuICAgICAgICAgIGF0dHJzID0gZ3VhcmRJRVNWR0J1ZyhhdHRycyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUFTVEVsZW1lbnQodGFnLCBhdHRycywgY3VycmVudFBhcmVudCk7XG4gICAgICAgIGlmIChucykge1xuICAgICAgICAgIGVsZW1lbnQubnMgPSBucztcbiAgICAgICAgfVxuXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5vdXRwdXRTb3VyY2VSYW5nZSkge1xuICAgICAgICAgICAgZWxlbWVudC5zdGFydCA9IHN0YXJ0JDE7XG4gICAgICAgICAgICBlbGVtZW50LmVuZCA9IGVuZDtcbiAgICAgICAgICAgIGVsZW1lbnQucmF3QXR0cnNNYXAgPSBlbGVtZW50LmF0dHJzTGlzdC5yZWR1Y2UoZnVuY3Rpb24gKGN1bXVsYXRlZCwgYXR0cikge1xuICAgICAgICAgICAgICBjdW11bGF0ZWRbYXR0ci5uYW1lXSA9IGF0dHI7XG4gICAgICAgICAgICAgIHJldHVybiBjdW11bGF0ZWRcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXR0cnMuZm9yRWFjaChmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICAgICAgaWYgKGludmFsaWRBdHRyaWJ1dGVSRS50ZXN0KGF0dHIubmFtZSkpIHtcbiAgICAgICAgICAgICAgd2FybiQyKFxuICAgICAgICAgICAgICAgIFwiSW52YWxpZCBkeW5hbWljIGFyZ3VtZW50IGV4cHJlc3Npb246IGF0dHJpYnV0ZSBuYW1lcyBjYW5ub3QgY29udGFpbiBcIiArXG4gICAgICAgICAgICAgICAgXCJzcGFjZXMsIHF1b3RlcywgPCwgPiwgLyBvciA9LlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXJ0OiBhdHRyLnN0YXJ0ICsgYXR0ci5uYW1lLmluZGV4T2YoXCJbXCIpLFxuICAgICAgICAgICAgICAgICAgZW5kOiBhdHRyLnN0YXJ0ICsgYXR0ci5uYW1lLmxlbmd0aFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZvcmJpZGRlblRhZyhlbGVtZW50KSAmJiAhaXNTZXJ2ZXJSZW5kZXJpbmcoKSkge1xuICAgICAgICAgIGVsZW1lbnQuZm9yYmlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgICAnVGVtcGxhdGVzIHNob3VsZCBvbmx5IGJlIHJlc3BvbnNpYmxlIGZvciBtYXBwaW5nIHRoZSBzdGF0ZSB0byB0aGUgJyArXG4gICAgICAgICAgICAnVUkuIEF2b2lkIHBsYWNpbmcgdGFncyB3aXRoIHNpZGUtZWZmZWN0cyBpbiB5b3VyIHRlbXBsYXRlcywgc3VjaCBhcyAnICtcbiAgICAgICAgICAgIFwiPFwiICsgdGFnICsgXCI+XCIgKyAnLCBhcyB0aGV5IHdpbGwgbm90IGJlIHBhcnNlZC4nLFxuICAgICAgICAgICAgeyBzdGFydDogZWxlbWVudC5zdGFydCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IHByZS10cmFuc2Zvcm1zXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlVHJhbnNmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVsZW1lbnQgPSBwcmVUcmFuc2Zvcm1zW2ldKGVsZW1lbnQsIG9wdGlvbnMpIHx8IGVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluVlByZSkge1xuICAgICAgICAgIHByb2Nlc3NQcmUoZWxlbWVudCk7XG4gICAgICAgICAgaWYgKGVsZW1lbnQucHJlKSB7XG4gICAgICAgICAgICBpblZQcmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhdGZvcm1Jc1ByZVRhZyhlbGVtZW50LnRhZykpIHtcbiAgICAgICAgICBpblByZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluVlByZSkge1xuICAgICAgICAgIHByb2Nlc3NSYXdBdHRycyhlbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICghZWxlbWVudC5wcm9jZXNzZWQpIHtcbiAgICAgICAgICAvLyBzdHJ1Y3R1cmFsIGRpcmVjdGl2ZXNcbiAgICAgICAgICBwcm9jZXNzRm9yKGVsZW1lbnQpO1xuICAgICAgICAgIHByb2Nlc3NJZihlbGVtZW50KTtcbiAgICAgICAgICBwcm9jZXNzT25jZShlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgIHJvb3QgPSBlbGVtZW50O1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNoZWNrUm9vdENvbnN0cmFpbnRzKHJvb3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdW5hcnkpIHtcbiAgICAgICAgICBjdXJyZW50UGFyZW50ID0gZWxlbWVudDtcbiAgICAgICAgICBzdGFjay5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZW5kOiBmdW5jdGlvbiBlbmQgKHRhZywgc3RhcnQsIGVuZCQxKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIC8vIHBvcCBzdGFja1xuICAgICAgICBzdGFjay5sZW5ndGggLT0gMTtcbiAgICAgICAgY3VycmVudFBhcmVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAob3B0aW9ucy5vdXRwdXRTb3VyY2VSYW5nZSkge1xuICAgICAgICAgIGVsZW1lbnQuZW5kID0gZW5kJDE7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgfSxcblxuICAgICAgY2hhcnM6IGZ1bmN0aW9uIGNoYXJzICh0ZXh0LCBzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmICghY3VycmVudFBhcmVudCkge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0ZXh0ID09PSB0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICB3YXJuT25jZShcbiAgICAgICAgICAgICAgICAnQ29tcG9uZW50IHRlbXBsYXRlIHJlcXVpcmVzIGEgcm9vdCBlbGVtZW50LCByYXRoZXIgdGhhbiBqdXN0IHRleHQuJyxcbiAgICAgICAgICAgICAgICB7IHN0YXJ0OiBzdGFydCB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh0ZXh0ID0gdGV4dC50cmltKCkpKSB7XG4gICAgICAgICAgICAgIHdhcm5PbmNlKFxuICAgICAgICAgICAgICAgIChcInRleHQgXFxcIlwiICsgdGV4dCArIFwiXFxcIiBvdXRzaWRlIHJvb3QgZWxlbWVudCB3aWxsIGJlIGlnbm9yZWQuXCIpLFxuICAgICAgICAgICAgICAgIHsgc3RhcnQ6IHN0YXJ0IH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgLy8gSUUgdGV4dGFyZWEgcGxhY2Vob2xkZXIgYnVnXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoaXNJRSAmJlxuICAgICAgICAgIGN1cnJlbnRQYXJlbnQudGFnID09PSAndGV4dGFyZWEnICYmXG4gICAgICAgICAgY3VycmVudFBhcmVudC5hdHRyc01hcC5wbGFjZWhvbGRlciA9PT0gdGV4dFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBjdXJyZW50UGFyZW50LmNoaWxkcmVuO1xuICAgICAgICBpZiAoaW5QcmUgfHwgdGV4dC50cmltKCkpIHtcbiAgICAgICAgICB0ZXh0ID0gaXNUZXh0VGFnKGN1cnJlbnRQYXJlbnQpID8gdGV4dCA6IGRlY29kZUhUTUxDYWNoZWQodGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgd2hpdGVzcGFjZS1vbmx5IG5vZGUgcmlnaHQgYWZ0ZXIgYW4gb3BlbmluZyB0YWdcbiAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAod2hpdGVzcGFjZU9wdGlvbikge1xuICAgICAgICAgIGlmICh3aGl0ZXNwYWNlT3B0aW9uID09PSAnY29uZGVuc2UnKSB7XG4gICAgICAgICAgICAvLyBpbiBjb25kZW5zZSBtb2RlLCByZW1vdmUgdGhlIHdoaXRlc3BhY2Ugbm9kZSBpZiBpdCBjb250YWluc1xuICAgICAgICAgICAgLy8gbGluZSBicmVhaywgb3RoZXJ3aXNlIGNvbmRlbnNlIHRvIGEgc2luZ2xlIHNwYWNlXG4gICAgICAgICAgICB0ZXh0ID0gbGluZUJyZWFrUkUudGVzdCh0ZXh0KSA/ICcnIDogJyAnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0ID0gJyAnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0ID0gcHJlc2VydmVXaGl0ZXNwYWNlID8gJyAnIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICBpZiAoIWluUHJlICYmIHdoaXRlc3BhY2VPcHRpb24gPT09ICdjb25kZW5zZScpIHtcbiAgICAgICAgICAgIC8vIGNvbmRlbnNlIGNvbnNlY3V0aXZlIHdoaXRlc3BhY2VzIGludG8gc2luZ2xlIHNwYWNlXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHdoaXRlc3BhY2VSRSQxLCAnICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmVzO1xuICAgICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgICBpZiAoIWluVlByZSAmJiB0ZXh0ICE9PSAnICcgJiYgKHJlcyA9IHBhcnNlVGV4dCh0ZXh0LCBkZWxpbWl0ZXJzKSkpIHtcbiAgICAgICAgICAgIGNoaWxkID0ge1xuICAgICAgICAgICAgICB0eXBlOiAyLFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiByZXMuZXhwcmVzc2lvbixcbiAgICAgICAgICAgICAgdG9rZW5zOiByZXMudG9rZW5zLFxuICAgICAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAodGV4dCAhPT0gJyAnIHx8ICFjaGlsZHJlbi5sZW5ndGggfHwgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0udGV4dCAhPT0gJyAnKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHtcbiAgICAgICAgICAgICAgdHlwZTogMyxcbiAgICAgICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vdXRwdXRTb3VyY2VSYW5nZSkge1xuICAgICAgICAgICAgICBjaGlsZC5zdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgICBjaGlsZC5lbmQgPSBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb21tZW50OiBmdW5jdGlvbiBjb21tZW50ICh0ZXh0LCBzdGFydCwgZW5kKSB7XG4gICAgICAgIC8vIGFkZGluZyBhbnl0aGluZyBhcyBhIHNpYmxpbmcgdG8gdGhlIHJvb3Qgbm9kZSBpcyBmb3JiaWRkZW5cbiAgICAgICAgLy8gY29tbWVudHMgc2hvdWxkIHN0aWxsIGJlIGFsbG93ZWQsIGJ1dCBpZ25vcmVkXG4gICAgICAgIGlmIChjdXJyZW50UGFyZW50KSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0ge1xuICAgICAgICAgICAgdHlwZTogMyxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBpc0NvbW1lbnQ6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChvcHRpb25zLm91dHB1dFNvdXJjZVJhbmdlKSB7XG4gICAgICAgICAgICBjaGlsZC5zdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgY2hpbGQuZW5kID0gZW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50UGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJvb3RcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NQcmUgKGVsKSB7XG4gICAgaWYgKGdldEFuZFJlbW92ZUF0dHIoZWwsICd2LXByZScpICE9IG51bGwpIHtcbiAgICAgIGVsLnByZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Jhd0F0dHJzIChlbCkge1xuICAgIHZhciBsaXN0ID0gZWwuYXR0cnNMaXN0O1xuICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICBpZiAobGVuKSB7XG4gICAgICB2YXIgYXR0cnMgPSBlbC5hdHRycyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBhdHRyc1tpXSA9IHtcbiAgICAgICAgICBuYW1lOiBsaXN0W2ldLm5hbWUsXG4gICAgICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KGxpc3RbaV0udmFsdWUpXG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0W2ldLnN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgICBhdHRyc1tpXS5zdGFydCA9IGxpc3RbaV0uc3RhcnQ7XG4gICAgICAgICAgYXR0cnNbaV0uZW5kID0gbGlzdFtpXS5lbmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFlbC5wcmUpIHtcbiAgICAgIC8vIG5vbiByb290IG5vZGUgaW4gcHJlIGJsb2NrcyB3aXRoIG5vIGF0dHJpYnV0ZXNcbiAgICAgIGVsLnBsYWluID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzRWxlbWVudCAoXG4gICAgZWxlbWVudCxcbiAgICBvcHRpb25zXG4gICkge1xuICAgIHByb2Nlc3NLZXkoZWxlbWVudCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIGEgcGxhaW4gZWxlbWVudCBhZnRlclxuICAgIC8vIHJlbW92aW5nIHN0cnVjdHVyYWwgYXR0cmlidXRlc1xuICAgIGVsZW1lbnQucGxhaW4gPSAoXG4gICAgICAhZWxlbWVudC5rZXkgJiZcbiAgICAgICFlbGVtZW50LnNjb3BlZFNsb3RzICYmXG4gICAgICAhZWxlbWVudC5hdHRyc0xpc3QubGVuZ3RoXG4gICAgKTtcblxuICAgIHByb2Nlc3NSZWYoZWxlbWVudCk7XG4gICAgcHJvY2Vzc1Nsb3RDb250ZW50KGVsZW1lbnQpO1xuICAgIHByb2Nlc3NTbG90T3V0bGV0KGVsZW1lbnQpO1xuICAgIHByb2Nlc3NDb21wb25lbnQoZWxlbWVudCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2Zvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbGVtZW50ID0gdHJhbnNmb3Jtc1tpXShlbGVtZW50LCBvcHRpb25zKSB8fCBlbGVtZW50O1xuICAgIH1cbiAgICBwcm9jZXNzQXR0cnMoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NLZXkgKGVsKSB7XG4gICAgdmFyIGV4cCA9IGdldEJpbmRpbmdBdHRyKGVsLCAna2V5Jyk7XG4gICAgaWYgKGV4cCkge1xuICAgICAge1xuICAgICAgICBpZiAoZWwudGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgICAgd2FybiQyKFxuICAgICAgICAgICAgXCI8dGVtcGxhdGU+IGNhbm5vdCBiZSBrZXllZC4gUGxhY2UgdGhlIGtleSBvbiByZWFsIGVsZW1lbnRzIGluc3RlYWQuXCIsXG4gICAgICAgICAgICBnZXRSYXdCaW5kaW5nQXR0cihlbCwgJ2tleScpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWwuZm9yKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gZWwuaXRlcmF0b3IyIHx8IGVsLml0ZXJhdG9yMTtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50O1xuICAgICAgICAgIGlmIChpdGVyYXRvciAmJiBpdGVyYXRvciA9PT0gZXhwICYmIHBhcmVudCAmJiBwYXJlbnQudGFnID09PSAndHJhbnNpdGlvbi1ncm91cCcpIHtcbiAgICAgICAgICAgIHdhcm4kMihcbiAgICAgICAgICAgICAgXCJEbyBub3QgdXNlIHYtZm9yIGluZGV4IGFzIGtleSBvbiA8dHJhbnNpdGlvbi1ncm91cD4gY2hpbGRyZW4sIFwiICtcbiAgICAgICAgICAgICAgXCJ0aGlzIGlzIHRoZSBzYW1lIGFzIG5vdCB1c2luZyBrZXlzLlwiLFxuICAgICAgICAgICAgICBnZXRSYXdCaW5kaW5nQXR0cihlbCwgJ2tleScpLFxuICAgICAgICAgICAgICB0cnVlIC8qIHRpcCAqL1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsLmtleSA9IGV4cDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzUmVmIChlbCkge1xuICAgIHZhciByZWYgPSBnZXRCaW5kaW5nQXR0cihlbCwgJ3JlZicpO1xuICAgIGlmIChyZWYpIHtcbiAgICAgIGVsLnJlZiA9IHJlZjtcbiAgICAgIGVsLnJlZkluRm9yID0gY2hlY2tJbkZvcihlbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0ZvciAoZWwpIHtcbiAgICB2YXIgZXhwO1xuICAgIGlmICgoZXhwID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZm9yJykpKSB7XG4gICAgICB2YXIgcmVzID0gcGFyc2VGb3IoZXhwKTtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgZXh0ZW5kKGVsLCByZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybiQyKFxuICAgICAgICAgIChcIkludmFsaWQgdi1mb3IgZXhwcmVzc2lvbjogXCIgKyBleHApLFxuICAgICAgICAgIGVsLnJhd0F0dHJzTWFwWyd2LWZvciddXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG4gIGZ1bmN0aW9uIHBhcnNlRm9yIChleHApIHtcbiAgICB2YXIgaW5NYXRjaCA9IGV4cC5tYXRjaChmb3JBbGlhc1JFKTtcbiAgICBpZiAoIWluTWF0Y2gpIHsgcmV0dXJuIH1cbiAgICB2YXIgcmVzID0ge307XG4gICAgcmVzLmZvciA9IGluTWF0Y2hbMl0udHJpbSgpO1xuICAgIHZhciBhbGlhcyA9IGluTWF0Y2hbMV0udHJpbSgpLnJlcGxhY2Uoc3RyaXBQYXJlbnNSRSwgJycpO1xuICAgIHZhciBpdGVyYXRvck1hdGNoID0gYWxpYXMubWF0Y2goZm9ySXRlcmF0b3JSRSk7XG4gICAgaWYgKGl0ZXJhdG9yTWF0Y2gpIHtcbiAgICAgIHJlcy5hbGlhcyA9IGFsaWFzLnJlcGxhY2UoZm9ySXRlcmF0b3JSRSwgJycpLnRyaW0oKTtcbiAgICAgIHJlcy5pdGVyYXRvcjEgPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcbiAgICAgIGlmIChpdGVyYXRvck1hdGNoWzJdKSB7XG4gICAgICAgIHJlcy5pdGVyYXRvcjIgPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmFsaWFzID0gYWxpYXM7XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NJZiAoZWwpIHtcbiAgICB2YXIgZXhwID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtaWYnKTtcbiAgICBpZiAoZXhwKSB7XG4gICAgICBlbC5pZiA9IGV4cDtcbiAgICAgIGFkZElmQ29uZGl0aW9uKGVsLCB7XG4gICAgICAgIGV4cDogZXhwLFxuICAgICAgICBibG9jazogZWxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZWxzZScpICE9IG51bGwpIHtcbiAgICAgICAgZWwuZWxzZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgZWxzZWlmID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZWxzZS1pZicpO1xuICAgICAgaWYgKGVsc2VpZikge1xuICAgICAgICBlbC5lbHNlaWYgPSBlbHNlaWY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0lmQ29uZGl0aW9ucyAoZWwsIHBhcmVudCkge1xuICAgIHZhciBwcmV2ID0gZmluZFByZXZFbGVtZW50KHBhcmVudC5jaGlsZHJlbik7XG4gICAgaWYgKHByZXYgJiYgcHJldi5pZikge1xuICAgICAgYWRkSWZDb25kaXRpb24ocHJldiwge1xuICAgICAgICBleHA6IGVsLmVsc2VpZixcbiAgICAgICAgYmxvY2s6IGVsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybiQyKFxuICAgICAgICBcInYtXCIgKyAoZWwuZWxzZWlmID8gKCdlbHNlLWlmPVwiJyArIGVsLmVsc2VpZiArICdcIicpIDogJ2Vsc2UnKSArIFwiIFwiICtcbiAgICAgICAgXCJ1c2VkIG9uIGVsZW1lbnQgPFwiICsgKGVsLnRhZykgKyBcIj4gd2l0aG91dCBjb3JyZXNwb25kaW5nIHYtaWYuXCIsXG4gICAgICAgIGVsLnJhd0F0dHJzTWFwW2VsLmVsc2VpZiA/ICd2LWVsc2UtaWYnIDogJ3YtZWxzZSddXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRQcmV2RWxlbWVudCAoY2hpbGRyZW4pIHtcbiAgICB2YXIgaSA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoY2hpbGRyZW5baV0udHlwZSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5baV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjaGlsZHJlbltpXS50ZXh0ICE9PSAnICcpIHtcbiAgICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgICBcInRleHQgXFxcIlwiICsgKGNoaWxkcmVuW2ldLnRleHQudHJpbSgpKSArIFwiXFxcIiBiZXR3ZWVuIHYtaWYgYW5kIHYtZWxzZSgtaWYpIFwiICtcbiAgICAgICAgICAgIFwid2lsbCBiZSBpZ25vcmVkLlwiLFxuICAgICAgICAgICAgY2hpbGRyZW5baV1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuLnBvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZElmQ29uZGl0aW9uIChlbCwgY29uZGl0aW9uKSB7XG4gICAgaWYgKCFlbC5pZkNvbmRpdGlvbnMpIHtcbiAgICAgIGVsLmlmQ29uZGl0aW9ucyA9IFtdO1xuICAgIH1cbiAgICBlbC5pZkNvbmRpdGlvbnMucHVzaChjb25kaXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc09uY2UgKGVsKSB7XG4gICAgdmFyIG9uY2UkJDEgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAndi1vbmNlJyk7XG4gICAgaWYgKG9uY2UkJDEgIT0gbnVsbCkge1xuICAgICAgZWwub25jZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGNvbnRlbnQgYmVpbmcgcGFzc2VkIHRvIGEgY29tcG9uZW50IGFzIHNsb3QsXG4gIC8vIGUuZy4gPHRlbXBsYXRlIHNsb3Q9XCJ4eHhcIj4sIDxkaXYgc2xvdC1zY29wZT1cInh4eFwiPlxuICBmdW5jdGlvbiBwcm9jZXNzU2xvdENvbnRlbnQgKGVsKSB7XG4gICAgdmFyIHNsb3RTY29wZTtcbiAgICBpZiAoZWwudGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICBzbG90U2NvcGUgPSBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnc2NvcGUnKTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHNsb3RTY29wZSkge1xuICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgXCJ0aGUgXFxcInNjb3BlXFxcIiBhdHRyaWJ1dGUgZm9yIHNjb3BlZCBzbG90cyBoYXZlIGJlZW4gZGVwcmVjYXRlZCBhbmQgXCIgK1xuICAgICAgICAgIFwicmVwbGFjZWQgYnkgXFxcInNsb3Qtc2NvcGVcXFwiIHNpbmNlIDIuNS4gVGhlIG5ldyBcXFwic2xvdC1zY29wZVxcXCIgYXR0cmlidXRlIFwiICtcbiAgICAgICAgICBcImNhbiBhbHNvIGJlIHVzZWQgb24gcGxhaW4gZWxlbWVudHMgaW4gYWRkaXRpb24gdG8gPHRlbXBsYXRlPiB0byBcIiArXG4gICAgICAgICAgXCJkZW5vdGUgc2NvcGVkIHNsb3RzLlwiLFxuICAgICAgICAgIGVsLnJhd0F0dHJzTWFwWydzY29wZSddLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGVsLnNsb3RTY29wZSA9IHNsb3RTY29wZSB8fCBnZXRBbmRSZW1vdmVBdHRyKGVsLCAnc2xvdC1zY29wZScpO1xuICAgIH0gZWxzZSBpZiAoKHNsb3RTY29wZSA9IGdldEFuZFJlbW92ZUF0dHIoZWwsICdzbG90LXNjb3BlJykpKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmIChlbC5hdHRyc01hcFsndi1mb3InXSkge1xuICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgXCJBbWJpZ3VvdXMgY29tYmluZWQgdXNhZ2Ugb2Ygc2xvdC1zY29wZSBhbmQgdi1mb3Igb24gPFwiICsgKGVsLnRhZykgKyBcIj4gXCIgK1xuICAgICAgICAgIFwiKHYtZm9yIHRha2VzIGhpZ2hlciBwcmlvcml0eSkuIFVzZSBhIHdyYXBwZXIgPHRlbXBsYXRlPiBmb3IgdGhlIFwiICtcbiAgICAgICAgICBcInNjb3BlZCBzbG90IHRvIG1ha2UgaXQgY2xlYXJlci5cIixcbiAgICAgICAgICBlbC5yYXdBdHRyc01hcFsnc2xvdC1zY29wZSddLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGVsLnNsb3RTY29wZSA9IHNsb3RTY29wZTtcbiAgICB9XG5cbiAgICAvLyBzbG90PVwieHh4XCJcbiAgICB2YXIgc2xvdFRhcmdldCA9IGdldEJpbmRpbmdBdHRyKGVsLCAnc2xvdCcpO1xuICAgIGlmIChzbG90VGFyZ2V0KSB7XG4gICAgICBlbC5zbG90VGFyZ2V0ID0gc2xvdFRhcmdldCA9PT0gJ1wiXCInID8gJ1wiZGVmYXVsdFwiJyA6IHNsb3RUYXJnZXQ7XG4gICAgICBlbC5zbG90VGFyZ2V0RHluYW1pYyA9ICEhKGVsLmF0dHJzTWFwWyc6c2xvdCddIHx8IGVsLmF0dHJzTWFwWyd2LWJpbmQ6c2xvdCddKTtcbiAgICAgIC8vIHByZXNlcnZlIHNsb3QgYXMgYW4gYXR0cmlidXRlIGZvciBuYXRpdmUgc2hhZG93IERPTSBjb21wYXRcbiAgICAgIC8vIG9ubHkgZm9yIG5vbi1zY29wZWQgc2xvdHMuXG4gICAgICBpZiAoZWwudGFnICE9PSAndGVtcGxhdGUnICYmICFlbC5zbG90U2NvcGUpIHtcbiAgICAgICAgYWRkQXR0cihlbCwgJ3Nsb3QnLCBzbG90VGFyZ2V0LCBnZXRSYXdCaW5kaW5nQXR0cihlbCwgJ3Nsb3QnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi42IHYtc2xvdCBzeW50YXhcbiAgICB7XG4gICAgICBpZiAoZWwudGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgIC8vIHYtc2xvdCBvbiA8dGVtcGxhdGU+XG4gICAgICAgIHZhciBzbG90QmluZGluZyA9IGdldEFuZFJlbW92ZUF0dHJCeVJlZ2V4KGVsLCBzbG90UkUpO1xuICAgICAgICBpZiAoc2xvdEJpbmRpbmcpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZiAoZWwuc2xvdFRhcmdldCB8fCBlbC5zbG90U2NvcGUpIHtcbiAgICAgICAgICAgICAgd2FybiQyKFxuICAgICAgICAgICAgICAgIFwiVW5leHBlY3RlZCBtaXhlZCB1c2FnZSBvZiBkaWZmZXJlbnQgc2xvdCBzeW50YXhlcy5cIixcbiAgICAgICAgICAgICAgICBlbFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsLnBhcmVudCAmJiAhbWF5YmVDb21wb25lbnQoZWwucGFyZW50KSkge1xuICAgICAgICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgICAgICAgXCI8dGVtcGxhdGUgdi1zbG90PiBjYW4gb25seSBhcHBlYXIgYXQgdGhlIHJvb3QgbGV2ZWwgaW5zaWRlIFwiICtcbiAgICAgICAgICAgICAgICBcInRoZSByZWNlaXZpbmcgY29tcG9uZW50XCIsXG4gICAgICAgICAgICAgICAgZWxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJlZiA9IGdldFNsb3ROYW1lKHNsb3RCaW5kaW5nKTtcbiAgICAgICAgICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICAgICAgICAgIHZhciBkeW5hbWljID0gcmVmLmR5bmFtaWM7XG4gICAgICAgICAgZWwuc2xvdFRhcmdldCA9IG5hbWU7XG4gICAgICAgICAgZWwuc2xvdFRhcmdldER5bmFtaWMgPSBkeW5hbWljO1xuICAgICAgICAgIGVsLnNsb3RTY29wZSA9IHNsb3RCaW5kaW5nLnZhbHVlIHx8IGVtcHR5U2xvdFNjb3BlVG9rZW47IC8vIGZvcmNlIGl0IGludG8gYSBzY29wZWQgc2xvdCBmb3IgcGVyZlxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB2LXNsb3Qgb24gY29tcG9uZW50LCBkZW5vdGVzIGRlZmF1bHQgc2xvdFxuICAgICAgICB2YXIgc2xvdEJpbmRpbmckMSA9IGdldEFuZFJlbW92ZUF0dHJCeVJlZ2V4KGVsLCBzbG90UkUpO1xuICAgICAgICBpZiAoc2xvdEJpbmRpbmckMSkge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmICghbWF5YmVDb21wb25lbnQoZWwpKSB7XG4gICAgICAgICAgICAgIHdhcm4kMihcbiAgICAgICAgICAgICAgICBcInYtc2xvdCBjYW4gb25seSBiZSB1c2VkIG9uIGNvbXBvbmVudHMgb3IgPHRlbXBsYXRlPi5cIixcbiAgICAgICAgICAgICAgICBzbG90QmluZGluZyQxXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwuc2xvdFNjb3BlIHx8IGVsLnNsb3RUYXJnZXQpIHtcbiAgICAgICAgICAgICAgd2FybiQyKFxuICAgICAgICAgICAgICAgIFwiVW5leHBlY3RlZCBtaXhlZCB1c2FnZSBvZiBkaWZmZXJlbnQgc2xvdCBzeW50YXhlcy5cIixcbiAgICAgICAgICAgICAgICBlbFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsLnNjb3BlZFNsb3RzKSB7XG4gICAgICAgICAgICAgIHdhcm4kMihcbiAgICAgICAgICAgICAgICBcIlRvIGF2b2lkIHNjb3BlIGFtYmlndWl0eSwgdGhlIGRlZmF1bHQgc2xvdCBzaG91bGQgYWxzbyB1c2UgXCIgK1xuICAgICAgICAgICAgICAgIFwiPHRlbXBsYXRlPiBzeW50YXggd2hlbiB0aGVyZSBhcmUgb3RoZXIgbmFtZWQgc2xvdHMuXCIsXG4gICAgICAgICAgICAgICAgc2xvdEJpbmRpbmckMVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBhZGQgdGhlIGNvbXBvbmVudCdzIGNoaWxkcmVuIHRvIGl0cyBkZWZhdWx0IHNsb3RcbiAgICAgICAgICB2YXIgc2xvdHMgPSBlbC5zY29wZWRTbG90cyB8fCAoZWwuc2NvcGVkU2xvdHMgPSB7fSk7XG4gICAgICAgICAgdmFyIHJlZiQxID0gZ2V0U2xvdE5hbWUoc2xvdEJpbmRpbmckMSk7XG4gICAgICAgICAgdmFyIG5hbWUkMSA9IHJlZiQxLm5hbWU7XG4gICAgICAgICAgdmFyIGR5bmFtaWMkMSA9IHJlZiQxLmR5bmFtaWM7XG4gICAgICAgICAgdmFyIHNsb3RDb250YWluZXIgPSBzbG90c1tuYW1lJDFdID0gY3JlYXRlQVNURWxlbWVudCgndGVtcGxhdGUnLCBbXSwgZWwpO1xuICAgICAgICAgIHNsb3RDb250YWluZXIuc2xvdFRhcmdldCA9IG5hbWUkMTtcbiAgICAgICAgICBzbG90Q29udGFpbmVyLnNsb3RUYXJnZXREeW5hbWljID0gZHluYW1pYyQxO1xuICAgICAgICAgIHNsb3RDb250YWluZXIuY2hpbGRyZW4gPSBlbC5jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIGlmICghYy5zbG90U2NvcGUpIHtcbiAgICAgICAgICAgICAgYy5wYXJlbnQgPSBzbG90Q29udGFpbmVyO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNsb3RDb250YWluZXIuc2xvdFNjb3BlID0gc2xvdEJpbmRpbmckMS52YWx1ZSB8fCBlbXB0eVNsb3RTY29wZVRva2VuO1xuICAgICAgICAgIC8vIHJlbW92ZSBjaGlsZHJlbiBhcyB0aGV5IGFyZSByZXR1cm5lZCBmcm9tIHNjb3BlZFNsb3RzIG5vd1xuICAgICAgICAgIGVsLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgLy8gbWFyayBlbCBub24tcGxhaW4gc28gZGF0YSBnZXRzIGdlbmVyYXRlZFxuICAgICAgICAgIGVsLnBsYWluID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbG90TmFtZSAoYmluZGluZykge1xuICAgIHZhciBuYW1lID0gYmluZGluZy5uYW1lLnJlcGxhY2Uoc2xvdFJFLCAnJyk7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICBpZiAoYmluZGluZy5uYW1lWzBdICE9PSAnIycpIHtcbiAgICAgICAgbmFtZSA9ICdkZWZhdWx0JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4kMihcbiAgICAgICAgICBcInYtc2xvdCBzaG9ydGhhbmQgc3ludGF4IHJlcXVpcmVzIGEgc2xvdCBuYW1lLlwiLFxuICAgICAgICAgIGJpbmRpbmdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGR5bmFtaWNBcmdSRS50ZXN0KG5hbWUpXG4gICAgICAvLyBkeW5hbWljIFtuYW1lXVxuICAgICAgPyB7IG5hbWU6IG5hbWUuc2xpY2UoMSwgLTEpLCBkeW5hbWljOiB0cnVlIH1cbiAgICAgIC8vIHN0YXRpYyBuYW1lXG4gICAgICA6IHsgbmFtZTogKFwiXFxcIlwiICsgbmFtZSArIFwiXFxcIlwiKSwgZHluYW1pYzogZmFsc2UgfVxuICB9XG5cbiAgLy8gaGFuZGxlIDxzbG90Lz4gb3V0bGV0c1xuICBmdW5jdGlvbiBwcm9jZXNzU2xvdE91dGxldCAoZWwpIHtcbiAgICBpZiAoZWwudGFnID09PSAnc2xvdCcpIHtcbiAgICAgIGVsLnNsb3ROYW1lID0gZ2V0QmluZGluZ0F0dHIoZWwsICduYW1lJyk7XG4gICAgICBpZiAoZWwua2V5KSB7XG4gICAgICAgIHdhcm4kMihcbiAgICAgICAgICBcImBrZXlgIGRvZXMgbm90IHdvcmsgb24gPHNsb3Q+IGJlY2F1c2Ugc2xvdHMgYXJlIGFic3RyYWN0IG91dGxldHMgXCIgK1xuICAgICAgICAgIFwiYW5kIGNhbiBwb3NzaWJseSBleHBhbmQgaW50byBtdWx0aXBsZSBlbGVtZW50cy4gXCIgK1xuICAgICAgICAgIFwiVXNlIHRoZSBrZXkgb24gYSB3cmFwcGluZyBlbGVtZW50IGluc3RlYWQuXCIsXG4gICAgICAgICAgZ2V0UmF3QmluZGluZ0F0dHIoZWwsICdrZXknKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NDb21wb25lbnQgKGVsKSB7XG4gICAgdmFyIGJpbmRpbmc7XG4gICAgaWYgKChiaW5kaW5nID0gZ2V0QmluZGluZ0F0dHIoZWwsICdpcycpKSkge1xuICAgICAgZWwuY29tcG9uZW50ID0gYmluZGluZztcbiAgICB9XG4gICAgaWYgKGdldEFuZFJlbW92ZUF0dHIoZWwsICdpbmxpbmUtdGVtcGxhdGUnKSAhPSBudWxsKSB7XG4gICAgICBlbC5pbmxpbmVUZW1wbGF0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0F0dHJzIChlbCkge1xuICAgIHZhciBsaXN0ID0gZWwuYXR0cnNMaXN0O1xuICAgIHZhciBpLCBsLCBuYW1lLCByYXdOYW1lLCB2YWx1ZSwgbW9kaWZpZXJzLCBzeW5jR2VuLCBpc0R5bmFtaWM7XG4gICAgZm9yIChpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBuYW1lID0gcmF3TmFtZSA9IGxpc3RbaV0ubmFtZTtcbiAgICAgIHZhbHVlID0gbGlzdFtpXS52YWx1ZTtcbiAgICAgIGlmIChkaXJSRS50ZXN0KG5hbWUpKSB7XG4gICAgICAgIC8vIG1hcmsgZWxlbWVudCBhcyBkeW5hbWljXG4gICAgICAgIGVsLmhhc0JpbmRpbmdzID0gdHJ1ZTtcbiAgICAgICAgLy8gbW9kaWZpZXJzXG4gICAgICAgIG1vZGlmaWVycyA9IHBhcnNlTW9kaWZpZXJzKG5hbWUucmVwbGFjZShkaXJSRSwgJycpKTtcbiAgICAgICAgLy8gc3VwcG9ydCAuZm9vIHNob3J0aGFuZCBzeW50YXggZm9yIHRoZSAucHJvcCBtb2RpZmllclxuICAgICAgICBpZiAobW9kaWZpZXJzKSB7XG4gICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZShtb2RpZmllclJFLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJpbmRSRS50ZXN0KG5hbWUpKSB7IC8vIHYtYmluZFxuICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoYmluZFJFLCAnJyk7XG4gICAgICAgICAgdmFsdWUgPSBwYXJzZUZpbHRlcnModmFsdWUpO1xuICAgICAgICAgIGlzRHluYW1pYyA9IGR5bmFtaWNBcmdSRS50ZXN0KG5hbWUpO1xuICAgICAgICAgIGlmIChpc0R5bmFtaWMpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdmFsdWUudHJpbSgpLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybiQyKFxuICAgICAgICAgICAgICAoXCJUaGUgdmFsdWUgZm9yIGEgdi1iaW5kIGV4cHJlc3Npb24gY2Fubm90IGJlIGVtcHR5LiBGb3VuZCBpbiBcXFwidi1iaW5kOlwiICsgbmFtZSArIFwiXFxcIlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1vZGlmaWVycykge1xuICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5wcm9wICYmICFpc0R5bmFtaWMpIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGNhbWVsaXplKG5hbWUpO1xuICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2lubmVySHRtbCcpIHsgbmFtZSA9ICdpbm5lckhUTUwnOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kaWZpZXJzLmNhbWVsICYmICFpc0R5bmFtaWMpIHtcbiAgICAgICAgICAgICAgbmFtZSA9IGNhbWVsaXplKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5zeW5jKSB7XG4gICAgICAgICAgICAgIHN5bmNHZW4gPSBnZW5Bc3NpZ25tZW50Q29kZSh2YWx1ZSwgXCIkZXZlbnRcIik7XG4gICAgICAgICAgICAgIGlmICghaXNEeW5hbWljKSB7XG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgICAgKFwidXBkYXRlOlwiICsgKGNhbWVsaXplKG5hbWUpKSksXG4gICAgICAgICAgICAgICAgICBzeW5jR2VuLFxuICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgd2FybiQyLFxuICAgICAgICAgICAgICAgICAgbGlzdFtpXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGh5cGhlbmF0ZShuYW1lKSAhPT0gY2FtZWxpemUobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgIGFkZEhhbmRsZXIoXG4gICAgICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgICAgICAoXCJ1cGRhdGU6XCIgKyAoaHlwaGVuYXRlKG5hbWUpKSksXG4gICAgICAgICAgICAgICAgICAgIHN5bmNHZW4sXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB3YXJuJDIsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaV1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsZXIgdy8gZHluYW1pYyBldmVudCBuYW1lXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlcihcbiAgICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgICAgKFwiXFxcInVwZGF0ZTpcXFwiKyhcIiArIG5hbWUgKyBcIilcIiksXG4gICAgICAgICAgICAgICAgICBzeW5jR2VuLFxuICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgd2FybiQyLFxuICAgICAgICAgICAgICAgICAgbGlzdFtpXSxcbiAgICAgICAgICAgICAgICAgIHRydWUgLy8gZHluYW1pY1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKChtb2RpZmllcnMgJiYgbW9kaWZpZXJzLnByb3ApIHx8IChcbiAgICAgICAgICAgICFlbC5jb21wb25lbnQgJiYgcGxhdGZvcm1NdXN0VXNlUHJvcChlbC50YWcsIGVsLmF0dHJzTWFwLnR5cGUsIG5hbWUpXG4gICAgICAgICAgKSkge1xuICAgICAgICAgICAgYWRkUHJvcChlbCwgbmFtZSwgdmFsdWUsIGxpc3RbaV0sIGlzRHluYW1pYyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEF0dHIoZWwsIG5hbWUsIHZhbHVlLCBsaXN0W2ldLCBpc0R5bmFtaWMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvblJFLnRlc3QobmFtZSkpIHsgLy8gdi1vblxuICAgICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2Uob25SRSwgJycpO1xuICAgICAgICAgIGlzRHluYW1pYyA9IGR5bmFtaWNBcmdSRS50ZXN0KG5hbWUpO1xuICAgICAgICAgIGlmIChpc0R5bmFtaWMpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSGFuZGxlcihlbCwgbmFtZSwgdmFsdWUsIG1vZGlmaWVycywgZmFsc2UsIHdhcm4kMiwgbGlzdFtpXSwgaXNEeW5hbWljKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gbm9ybWFsIGRpcmVjdGl2ZXNcbiAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGRpclJFLCAnJyk7XG4gICAgICAgICAgLy8gcGFyc2UgYXJnXG4gICAgICAgICAgdmFyIGFyZ01hdGNoID0gbmFtZS5tYXRjaChhcmdSRSk7XG4gICAgICAgICAgdmFyIGFyZyA9IGFyZ01hdGNoICYmIGFyZ01hdGNoWzFdO1xuICAgICAgICAgIGlzRHluYW1pYyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChhcmcpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0oYXJnLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgIGlmIChkeW5hbWljQXJnUkUudGVzdChhcmcpKSB7XG4gICAgICAgICAgICAgIGFyZyA9IGFyZy5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgICAgIGlzRHluYW1pYyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZERpcmVjdGl2ZShlbCwgbmFtZSwgcmF3TmFtZSwgdmFsdWUsIGFyZywgaXNEeW5hbWljLCBtb2RpZmllcnMsIGxpc3RbaV0pO1xuICAgICAgICAgIGlmIChuYW1lID09PSAnbW9kZWwnKSB7XG4gICAgICAgICAgICBjaGVja0ZvckFsaWFzTW9kZWwoZWwsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxpdGVyYWwgYXR0cmlidXRlXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgcmVzID0gcGFyc2VUZXh0KHZhbHVlLCBkZWxpbWl0ZXJzKTtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgICAgIG5hbWUgKyBcIj1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIjogXCIgK1xuICAgICAgICAgICAgICAnSW50ZXJwb2xhdGlvbiBpbnNpZGUgYXR0cmlidXRlcyBoYXMgYmVlbiByZW1vdmVkLiAnICtcbiAgICAgICAgICAgICAgJ1VzZSB2LWJpbmQgb3IgdGhlIGNvbG9uIHNob3J0aGFuZCBpbnN0ZWFkLiBGb3IgZXhhbXBsZSwgJyArXG4gICAgICAgICAgICAgICdpbnN0ZWFkIG9mIDxkaXYgaWQ9XCJ7eyB2YWwgfX1cIj4sIHVzZSA8ZGl2IDppZD1cInZhbFwiPi4nLFxuICAgICAgICAgICAgICBsaXN0W2ldXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRBdHRyKGVsLCBuYW1lLCBKU09OLnN0cmluZ2lmeSh2YWx1ZSksIGxpc3RbaV0pO1xuICAgICAgICAvLyAjNjg4NyBmaXJlZm94IGRvZXNuJ3QgdXBkYXRlIG11dGVkIHN0YXRlIGlmIHNldCB2aWEgYXR0cmlidXRlXG4gICAgICAgIC8vIGV2ZW4gaW1tZWRpYXRlbHkgYWZ0ZXIgZWxlbWVudCBjcmVhdGlvblxuICAgICAgICBpZiAoIWVsLmNvbXBvbmVudCAmJlxuICAgICAgICAgICAgbmFtZSA9PT0gJ211dGVkJyAmJlxuICAgICAgICAgICAgcGxhdGZvcm1NdXN0VXNlUHJvcChlbC50YWcsIGVsLmF0dHJzTWFwLnR5cGUsIG5hbWUpKSB7XG4gICAgICAgICAgYWRkUHJvcChlbCwgbmFtZSwgJ3RydWUnLCBsaXN0W2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrSW5Gb3IgKGVsKSB7XG4gICAgdmFyIHBhcmVudCA9IGVsO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQuZm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VNb2RpZmllcnMgKG5hbWUpIHtcbiAgICB2YXIgbWF0Y2ggPSBuYW1lLm1hdGNoKG1vZGlmaWVyUkUpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgbWF0Y2guZm9yRWFjaChmdW5jdGlvbiAobSkgeyByZXRbbS5zbGljZSgxKV0gPSB0cnVlOyB9KTtcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlQXR0cnNNYXAgKGF0dHJzKSB7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXR0cnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIG1hcFthdHRyc1tpXS5uYW1lXSAmJiAhaXNJRSAmJiAhaXNFZGdlXG4gICAgICApIHtcbiAgICAgICAgd2FybiQyKCdkdXBsaWNhdGUgYXR0cmlidXRlOiAnICsgYXR0cnNbaV0ubmFtZSwgYXR0cnNbaV0pO1xuICAgICAgfVxuICAgICAgbWFwW2F0dHJzW2ldLm5hbWVdID0gYXR0cnNbaV0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBtYXBcbiAgfVxuXG4gIC8vIGZvciBzY3JpcHQgKGUuZy4gdHlwZT1cIngvdGVtcGxhdGVcIikgb3Igc3R5bGUsIGRvIG5vdCBkZWNvZGUgY29udGVudFxuICBmdW5jdGlvbiBpc1RleHRUYWcgKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRhZyA9PT0gJ3NjcmlwdCcgfHwgZWwudGFnID09PSAnc3R5bGUnXG4gIH1cblxuICBmdW5jdGlvbiBpc0ZvcmJpZGRlblRhZyAoZWwpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZWwudGFnID09PSAnc3R5bGUnIHx8XG4gICAgICAoZWwudGFnID09PSAnc2NyaXB0JyAmJiAoXG4gICAgICAgICFlbC5hdHRyc01hcC50eXBlIHx8XG4gICAgICAgIGVsLmF0dHJzTWFwLnR5cGUgPT09ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgICApKVxuICAgIClcbiAgfVxuXG4gIHZhciBpZU5TQnVnID0gL154bWxuczpOU1xcZCsvO1xuICB2YXIgaWVOU1ByZWZpeCA9IC9eTlNcXGQrOi87XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZnVuY3Rpb24gZ3VhcmRJRVNWR0J1ZyAoYXR0cnMpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgIGlmICghaWVOU0J1Zy50ZXN0KGF0dHIubmFtZSkpIHtcbiAgICAgICAgYXR0ci5uYW1lID0gYXR0ci5uYW1lLnJlcGxhY2UoaWVOU1ByZWZpeCwgJycpO1xuICAgICAgICByZXMucHVzaChhdHRyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGb3JBbGlhc01vZGVsIChlbCwgdmFsdWUpIHtcbiAgICB2YXIgX2VsID0gZWw7XG4gICAgd2hpbGUgKF9lbCkge1xuICAgICAgaWYgKF9lbC5mb3IgJiYgX2VsLmFsaWFzID09PSB2YWx1ZSkge1xuICAgICAgICB3YXJuJDIoXG4gICAgICAgICAgXCI8XCIgKyAoZWwudGFnKSArIFwiIHYtbW9kZWw9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCI+OiBcIiArXG4gICAgICAgICAgXCJZb3UgYXJlIGJpbmRpbmcgdi1tb2RlbCBkaXJlY3RseSB0byBhIHYtZm9yIGl0ZXJhdGlvbiBhbGlhcy4gXCIgK1xuICAgICAgICAgIFwiVGhpcyB3aWxsIG5vdCBiZSBhYmxlIHRvIG1vZGlmeSB0aGUgdi1mb3Igc291cmNlIGFycmF5IGJlY2F1c2UgXCIgK1xuICAgICAgICAgIFwid3JpdGluZyB0byB0aGUgYWxpYXMgaXMgbGlrZSBtb2RpZnlpbmcgYSBmdW5jdGlvbiBsb2NhbCB2YXJpYWJsZS4gXCIgK1xuICAgICAgICAgIFwiQ29uc2lkZXIgdXNpbmcgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgdXNlIHYtbW9kZWwgb24gYW4gb2JqZWN0IHByb3BlcnR5IGluc3RlYWQuXCIsXG4gICAgICAgICAgZWwucmF3QXR0cnNNYXBbJ3YtbW9kZWwnXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgX2VsID0gX2VsLnBhcmVudDtcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBwcmVUcmFuc2Zvcm1Ob2RlIChlbCwgb3B0aW9ucykge1xuICAgIGlmIChlbC50YWcgPT09ICdpbnB1dCcpIHtcbiAgICAgIHZhciBtYXAgPSBlbC5hdHRyc01hcDtcbiAgICAgIGlmICghbWFwWyd2LW1vZGVsJ10pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlQmluZGluZztcbiAgICAgIGlmIChtYXBbJzp0eXBlJ10gfHwgbWFwWyd2LWJpbmQ6dHlwZSddKSB7XG4gICAgICAgIHR5cGVCaW5kaW5nID0gZ2V0QmluZGluZ0F0dHIoZWwsICd0eXBlJyk7XG4gICAgICB9XG4gICAgICBpZiAoIW1hcC50eXBlICYmICF0eXBlQmluZGluZyAmJiBtYXBbJ3YtYmluZCddKSB7XG4gICAgICAgIHR5cGVCaW5kaW5nID0gXCIoXCIgKyAobWFwWyd2LWJpbmQnXSkgKyBcIikudHlwZVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZUJpbmRpbmcpIHtcbiAgICAgICAgdmFyIGlmQ29uZGl0aW9uID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtaWYnLCB0cnVlKTtcbiAgICAgICAgdmFyIGlmQ29uZGl0aW9uRXh0cmEgPSBpZkNvbmRpdGlvbiA/IChcIiYmKFwiICsgaWZDb25kaXRpb24gKyBcIilcIikgOiBcIlwiO1xuICAgICAgICB2YXIgaGFzRWxzZSA9IGdldEFuZFJlbW92ZUF0dHIoZWwsICd2LWVsc2UnLCB0cnVlKSAhPSBudWxsO1xuICAgICAgICB2YXIgZWxzZUlmQ29uZGl0aW9uID0gZ2V0QW5kUmVtb3ZlQXR0cihlbCwgJ3YtZWxzZS1pZicsIHRydWUpO1xuICAgICAgICAvLyAxLiBjaGVja2JveFxuICAgICAgICB2YXIgYnJhbmNoMCA9IGNsb25lQVNURWxlbWVudChlbCk7XG4gICAgICAgIC8vIHByb2Nlc3MgZm9yIG9uIHRoZSBtYWluIG5vZGVcbiAgICAgICAgcHJvY2Vzc0ZvcihicmFuY2gwKTtcbiAgICAgICAgYWRkUmF3QXR0cihicmFuY2gwLCAndHlwZScsICdjaGVja2JveCcpO1xuICAgICAgICBwcm9jZXNzRWxlbWVudChicmFuY2gwLCBvcHRpb25zKTtcbiAgICAgICAgYnJhbmNoMC5wcm9jZXNzZWQgPSB0cnVlOyAvLyBwcmV2ZW50IGl0IGZyb20gZG91YmxlLXByb2Nlc3NlZFxuICAgICAgICBicmFuY2gwLmlmID0gXCIoXCIgKyB0eXBlQmluZGluZyArIFwiKT09PSdjaGVja2JveCdcIiArIGlmQ29uZGl0aW9uRXh0cmE7XG4gICAgICAgIGFkZElmQ29uZGl0aW9uKGJyYW5jaDAsIHtcbiAgICAgICAgICBleHA6IGJyYW5jaDAuaWYsXG4gICAgICAgICAgYmxvY2s6IGJyYW5jaDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIDIuIGFkZCByYWRpbyBlbHNlLWlmIGNvbmRpdGlvblxuICAgICAgICB2YXIgYnJhbmNoMSA9IGNsb25lQVNURWxlbWVudChlbCk7XG4gICAgICAgIGdldEFuZFJlbW92ZUF0dHIoYnJhbmNoMSwgJ3YtZm9yJywgdHJ1ZSk7XG4gICAgICAgIGFkZFJhd0F0dHIoYnJhbmNoMSwgJ3R5cGUnLCAncmFkaW8nKTtcbiAgICAgICAgcHJvY2Vzc0VsZW1lbnQoYnJhbmNoMSwgb3B0aW9ucyk7XG4gICAgICAgIGFkZElmQ29uZGl0aW9uKGJyYW5jaDAsIHtcbiAgICAgICAgICBleHA6IFwiKFwiICsgdHlwZUJpbmRpbmcgKyBcIik9PT0ncmFkaW8nXCIgKyBpZkNvbmRpdGlvbkV4dHJhLFxuICAgICAgICAgIGJsb2NrOiBicmFuY2gxXG4gICAgICAgIH0pO1xuICAgICAgICAvLyAzLiBvdGhlclxuICAgICAgICB2YXIgYnJhbmNoMiA9IGNsb25lQVNURWxlbWVudChlbCk7XG4gICAgICAgIGdldEFuZFJlbW92ZUF0dHIoYnJhbmNoMiwgJ3YtZm9yJywgdHJ1ZSk7XG4gICAgICAgIGFkZFJhd0F0dHIoYnJhbmNoMiwgJzp0eXBlJywgdHlwZUJpbmRpbmcpO1xuICAgICAgICBwcm9jZXNzRWxlbWVudChicmFuY2gyLCBvcHRpb25zKTtcbiAgICAgICAgYWRkSWZDb25kaXRpb24oYnJhbmNoMCwge1xuICAgICAgICAgIGV4cDogaWZDb25kaXRpb24sXG4gICAgICAgICAgYmxvY2s6IGJyYW5jaDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhhc0Vsc2UpIHtcbiAgICAgICAgICBicmFuY2gwLmVsc2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsc2VJZkNvbmRpdGlvbikge1xuICAgICAgICAgIGJyYW5jaDAuZWxzZWlmID0gZWxzZUlmQ29uZGl0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJyYW5jaDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZUFTVEVsZW1lbnQgKGVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFTVEVsZW1lbnQoZWwudGFnLCBlbC5hdHRyc0xpc3Quc2xpY2UoKSwgZWwucGFyZW50KVxuICB9XG5cbiAgdmFyIG1vZGVsJDEgPSB7XG4gICAgcHJlVHJhbnNmb3JtTm9kZTogcHJlVHJhbnNmb3JtTm9kZVxuICB9O1xuXG4gIHZhciBtb2R1bGVzJDEgPSBbXG4gICAga2xhc3MkMSxcbiAgICBzdHlsZSQxLFxuICAgIG1vZGVsJDFcbiAgXTtcblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiB0ZXh0IChlbCwgZGlyKSB7XG4gICAgaWYgKGRpci52YWx1ZSkge1xuICAgICAgYWRkUHJvcChlbCwgJ3RleHRDb250ZW50JywgKFwiX3MoXCIgKyAoZGlyLnZhbHVlKSArIFwiKVwiKSwgZGlyKTtcbiAgICB9XG4gIH1cblxuICAvKiAgKi9cblxuICBmdW5jdGlvbiBodG1sIChlbCwgZGlyKSB7XG4gICAgaWYgKGRpci52YWx1ZSkge1xuICAgICAgYWRkUHJvcChlbCwgJ2lubmVySFRNTCcsIChcIl9zKFwiICsgKGRpci52YWx1ZSkgKyBcIilcIiksIGRpcik7XG4gICAgfVxuICB9XG5cbiAgdmFyIGRpcmVjdGl2ZXMkMSA9IHtcbiAgICBtb2RlbDogbW9kZWwsXG4gICAgdGV4dDogdGV4dCxcbiAgICBodG1sOiBodG1sXG4gIH07XG5cbiAgLyogICovXG5cbiAgdmFyIGJhc2VPcHRpb25zID0ge1xuICAgIGV4cGVjdEhUTUw6IHRydWUsXG4gICAgbW9kdWxlczogbW9kdWxlcyQxLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMkMSxcbiAgICBpc1ByZVRhZzogaXNQcmVUYWcsXG4gICAgaXNVbmFyeVRhZzogaXNVbmFyeVRhZyxcbiAgICBtdXN0VXNlUHJvcDogbXVzdFVzZVByb3AsXG4gICAgY2FuQmVMZWZ0T3BlblRhZzogY2FuQmVMZWZ0T3BlblRhZyxcbiAgICBpc1Jlc2VydmVkVGFnOiBpc1Jlc2VydmVkVGFnLFxuICAgIGdldFRhZ05hbWVzcGFjZTogZ2V0VGFnTmFtZXNwYWNlLFxuICAgIHN0YXRpY0tleXM6IGdlblN0YXRpY0tleXMobW9kdWxlcyQxKVxuICB9O1xuXG4gIC8qICAqL1xuXG4gIHZhciBpc1N0YXRpY0tleTtcbiAgdmFyIGlzUGxhdGZvcm1SZXNlcnZlZFRhZztcblxuICB2YXIgZ2VuU3RhdGljS2V5c0NhY2hlZCA9IGNhY2hlZChnZW5TdGF0aWNLZXlzJDEpO1xuXG4gIC8qKlxuICAgKiBHb2FsIG9mIHRoZSBvcHRpbWl6ZXI6IHdhbGsgdGhlIGdlbmVyYXRlZCB0ZW1wbGF0ZSBBU1QgdHJlZVxuICAgKiBhbmQgZGV0ZWN0IHN1Yi10cmVlcyB0aGF0IGFyZSBwdXJlbHkgc3RhdGljLCBpLmUuIHBhcnRzIG9mXG4gICAqIHRoZSBET00gdGhhdCBuZXZlciBuZWVkcyB0byBjaGFuZ2UuXG4gICAqXG4gICAqIE9uY2Ugd2UgZGV0ZWN0IHRoZXNlIHN1Yi10cmVlcywgd2UgY2FuOlxuICAgKlxuICAgKiAxLiBIb2lzdCB0aGVtIGludG8gY29uc3RhbnRzLCBzbyB0aGF0IHdlIG5vIGxvbmdlciBuZWVkIHRvXG4gICAqICAgIGNyZWF0ZSBmcmVzaCBub2RlcyBmb3IgdGhlbSBvbiBlYWNoIHJlLXJlbmRlcjtcbiAgICogMi4gQ29tcGxldGVseSBza2lwIHRoZW0gaW4gdGhlIHBhdGNoaW5nIHByb2Nlc3MuXG4gICAqL1xuICBmdW5jdGlvbiBvcHRpbWl6ZSAocm9vdCwgb3B0aW9ucykge1xuICAgIGlmICghcm9vdCkgeyByZXR1cm4gfVxuICAgIGlzU3RhdGljS2V5ID0gZ2VuU3RhdGljS2V5c0NhY2hlZChvcHRpb25zLnN0YXRpY0tleXMgfHwgJycpO1xuICAgIGlzUGxhdGZvcm1SZXNlcnZlZFRhZyA9IG9wdGlvbnMuaXNSZXNlcnZlZFRhZyB8fCBubztcbiAgICAvLyBmaXJzdCBwYXNzOiBtYXJrIGFsbCBub24tc3RhdGljIG5vZGVzLlxuICAgIG1hcmtTdGF0aWMkMShyb290KTtcbiAgICAvLyBzZWNvbmQgcGFzczogbWFyayBzdGF0aWMgcm9vdHMuXG4gICAgbWFya1N0YXRpY1Jvb3RzKHJvb3QsIGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlblN0YXRpY0tleXMkMSAoa2V5cykge1xuICAgIHJldHVybiBtYWtlTWFwKFxuICAgICAgJ3R5cGUsdGFnLGF0dHJzTGlzdCxhdHRyc01hcCxwbGFpbixwYXJlbnQsY2hpbGRyZW4sYXR0cnMsc3RhcnQsZW5kLHJhd0F0dHJzTWFwJyArXG4gICAgICAoa2V5cyA/ICcsJyArIGtleXMgOiAnJylcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBtYXJrU3RhdGljJDEgKG5vZGUpIHtcbiAgICBub2RlLnN0YXRpYyA9IGlzU3RhdGljKG5vZGUpO1xuICAgIGlmIChub2RlLnR5cGUgPT09IDEpIHtcbiAgICAgIC8vIGRvIG5vdCBtYWtlIGNvbXBvbmVudCBzbG90IGNvbnRlbnQgc3RhdGljLiB0aGlzIGF2b2lkc1xuICAgICAgLy8gMS4gY29tcG9uZW50cyBub3QgYWJsZSB0byBtdXRhdGUgc2xvdCBub2Rlc1xuICAgICAgLy8gMi4gc3RhdGljIHNsb3QgY29udGVudCBmYWlscyBmb3IgaG90LXJlbG9hZGluZ1xuICAgICAgaWYgKFxuICAgICAgICAhaXNQbGF0Zm9ybVJlc2VydmVkVGFnKG5vZGUudGFnKSAmJlxuICAgICAgICBub2RlLnRhZyAhPT0gJ3Nsb3QnICYmXG4gICAgICAgIG5vZGUuYXR0cnNNYXBbJ2lubGluZS10ZW1wbGF0ZSddID09IG51bGxcbiAgICAgICkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgbWFya1N0YXRpYyQxKGNoaWxkKTtcbiAgICAgICAgaWYgKCFjaGlsZC5zdGF0aWMpIHtcbiAgICAgICAgICBub2RlLnN0YXRpYyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5pZkNvbmRpdGlvbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSQxID0gMSwgbCQxID0gbm9kZS5pZkNvbmRpdGlvbnMubGVuZ3RoOyBpJDEgPCBsJDE7IGkkMSsrKSB7XG4gICAgICAgICAgdmFyIGJsb2NrID0gbm9kZS5pZkNvbmRpdGlvbnNbaSQxXS5ibG9jaztcbiAgICAgICAgICBtYXJrU3RhdGljJDEoYmxvY2spO1xuICAgICAgICAgIGlmICghYmxvY2suc3RhdGljKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRpYyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtTdGF0aWNSb290cyAobm9kZSwgaXNJbkZvcikge1xuICAgIGlmIChub2RlLnR5cGUgPT09IDEpIHtcbiAgICAgIGlmIChub2RlLnN0YXRpYyB8fCBub2RlLm9uY2UpIHtcbiAgICAgICAgbm9kZS5zdGF0aWNJbkZvciA9IGlzSW5Gb3I7XG4gICAgICB9XG4gICAgICAvLyBGb3IgYSBub2RlIHRvIHF1YWxpZnkgYXMgYSBzdGF0aWMgcm9vdCwgaXQgc2hvdWxkIGhhdmUgY2hpbGRyZW4gdGhhdFxuICAgICAgLy8gYXJlIG5vdCBqdXN0IHN0YXRpYyB0ZXh0LiBPdGhlcndpc2UgdGhlIGNvc3Qgb2YgaG9pc3Rpbmcgb3V0IHdpbGxcbiAgICAgIC8vIG91dHdlaWdoIHRoZSBiZW5lZml0cyBhbmQgaXQncyBiZXR0ZXIgb2ZmIHRvIGp1c3QgYWx3YXlzIHJlbmRlciBpdCBmcmVzaC5cbiAgICAgIGlmIChub2RlLnN0YXRpYyAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCAmJiAhKFxuICAgICAgICBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLnR5cGUgPT09IDNcbiAgICAgICkpIHtcbiAgICAgICAgbm9kZS5zdGF0aWNSb290ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnN0YXRpY1Jvb3QgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBtYXJrU3RhdGljUm9vdHMobm9kZS5jaGlsZHJlbltpXSwgaXNJbkZvciB8fCAhIW5vZGUuZm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG5vZGUuaWZDb25kaXRpb25zKSB7XG4gICAgICAgIGZvciAodmFyIGkkMSA9IDEsIGwkMSA9IG5vZGUuaWZDb25kaXRpb25zLmxlbmd0aDsgaSQxIDwgbCQxOyBpJDErKykge1xuICAgICAgICAgIG1hcmtTdGF0aWNSb290cyhub2RlLmlmQ29uZGl0aW9uc1tpJDFdLmJsb2NrLCBpc0luRm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3RhdGljIChub2RlKSB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gMikgeyAvLyBleHByZXNzaW9uXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gMykgeyAvLyB0ZXh0XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gISEobm9kZS5wcmUgfHwgKFxuICAgICAgIW5vZGUuaGFzQmluZGluZ3MgJiYgLy8gbm8gZHluYW1pYyBiaW5kaW5nc1xuICAgICAgIW5vZGUuaWYgJiYgIW5vZGUuZm9yICYmIC8vIG5vdCB2LWlmIG9yIHYtZm9yIG9yIHYtZWxzZVxuICAgICAgIWlzQnVpbHRJblRhZyhub2RlLnRhZykgJiYgLy8gbm90IGEgYnVpbHQtaW5cbiAgICAgIGlzUGxhdGZvcm1SZXNlcnZlZFRhZyhub2RlLnRhZykgJiYgLy8gbm90IGEgY29tcG9uZW50XG4gICAgICAhaXNEaXJlY3RDaGlsZE9mVGVtcGxhdGVGb3Iobm9kZSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKG5vZGUpLmV2ZXJ5KGlzU3RhdGljS2V5KVxuICAgICkpXG4gIH1cblxuICBmdW5jdGlvbiBpc0RpcmVjdENoaWxkT2ZUZW1wbGF0ZUZvciAobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnBhcmVudCkge1xuICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgaWYgKG5vZGUudGFnICE9PSAndGVtcGxhdGUnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKG5vZGUuZm9yKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIGZuRXhwUkUgPSAvXihbXFx3JF9dK3xcXChbXildKj9cXCkpXFxzKj0+fF5mdW5jdGlvbig/OlxccytbXFx3JF0rKT9cXHMqXFwoLztcbiAgdmFyIGZuSW52b2tlUkUgPSAvXFwoW14pXSo/XFwpOyokLztcbiAgdmFyIHNpbXBsZVBhdGhSRSA9IC9eW0EtWmEtel8kXVtcXHckXSooPzpcXC5bQS1aYS16XyRdW1xcdyRdKnxcXFsnW14nXSo/J118XFxbXCJbXlwiXSo/XCJdfFxcW1xcZCtdfFxcW1tBLVphLXpfJF1bXFx3JF0qXSkqJC87XG5cbiAgLy8gS2V5Ym9hcmRFdmVudC5rZXlDb2RlIGFsaWFzZXNcbiAgdmFyIGtleUNvZGVzID0ge1xuICAgIGVzYzogMjcsXG4gICAgdGFiOiA5LFxuICAgIGVudGVyOiAxMyxcbiAgICBzcGFjZTogMzIsXG4gICAgdXA6IDM4LFxuICAgIGxlZnQ6IDM3LFxuICAgIHJpZ2h0OiAzOSxcbiAgICBkb3duOiA0MCxcbiAgICAnZGVsZXRlJzogWzgsIDQ2XVxuICB9O1xuXG4gIC8vIEtleWJvYXJkRXZlbnQua2V5IGFsaWFzZXNcbiAgdmFyIGtleU5hbWVzID0ge1xuICAgIC8vICM3ODgwOiBJRTExIGFuZCBFZGdlIHVzZSBgRXNjYCBmb3IgRXNjYXBlIGtleSBuYW1lLlxuICAgIGVzYzogWydFc2MnLCAnRXNjYXBlJ10sXG4gICAgdGFiOiAnVGFiJyxcbiAgICBlbnRlcjogJ0VudGVyJyxcbiAgICAvLyAjOTExMjogSUUxMSB1c2VzIGBTcGFjZWJhcmAgZm9yIFNwYWNlIGtleSBuYW1lLlxuICAgIHNwYWNlOiBbJyAnLCAnU3BhY2ViYXInXSxcbiAgICAvLyAjNzgwNjogSUUxMSB1c2VzIGtleSBuYW1lcyB3aXRob3V0IGBBcnJvd2AgcHJlZml4IGZvciBhcnJvdyBrZXlzLlxuICAgIHVwOiBbJ1VwJywgJ0Fycm93VXAnXSxcbiAgICBsZWZ0OiBbJ0xlZnQnLCAnQXJyb3dMZWZ0J10sXG4gICAgcmlnaHQ6IFsnUmlnaHQnLCAnQXJyb3dSaWdodCddLFxuICAgIGRvd246IFsnRG93bicsICdBcnJvd0Rvd24nXSxcbiAgICAvLyAjOTExMjogSUUxMSB1c2VzIGBEZWxgIGZvciBEZWxldGUga2V5IG5hbWUuXG4gICAgJ2RlbGV0ZSc6IFsnQmFja3NwYWNlJywgJ0RlbGV0ZScsICdEZWwnXVxuICB9O1xuXG4gIC8vICM0ODY4OiBtb2RpZmllcnMgdGhhdCBwcmV2ZW50IHRoZSBleGVjdXRpb24gb2YgdGhlIGxpc3RlbmVyXG4gIC8vIG5lZWQgdG8gZXhwbGljaXRseSByZXR1cm4gbnVsbCBzbyB0aGF0IHdlIGNhbiBkZXRlcm1pbmUgd2hldGhlciB0byByZW1vdmVcbiAgLy8gdGhlIGxpc3RlbmVyIGZvciAub25jZVxuICB2YXIgZ2VuR3VhcmQgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7IHJldHVybiAoXCJpZihcIiArIGNvbmRpdGlvbiArIFwiKXJldHVybiBudWxsO1wiKTsgfTtcblxuICB2YXIgbW9kaWZpZXJDb2RlID0ge1xuICAgIHN0b3A6ICckZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7JyxcbiAgICBwcmV2ZW50OiAnJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7JyxcbiAgICBzZWxmOiBnZW5HdWFyZChcIiRldmVudC50YXJnZXQgIT09ICRldmVudC5jdXJyZW50VGFyZ2V0XCIpLFxuICAgIGN0cmw6IGdlbkd1YXJkKFwiISRldmVudC5jdHJsS2V5XCIpLFxuICAgIHNoaWZ0OiBnZW5HdWFyZChcIiEkZXZlbnQuc2hpZnRLZXlcIiksXG4gICAgYWx0OiBnZW5HdWFyZChcIiEkZXZlbnQuYWx0S2V5XCIpLFxuICAgIG1ldGE6IGdlbkd1YXJkKFwiISRldmVudC5tZXRhS2V5XCIpLFxuICAgIGxlZnQ6IGdlbkd1YXJkKFwiJ2J1dHRvbicgaW4gJGV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDBcIiksXG4gICAgbWlkZGxlOiBnZW5HdWFyZChcIididXR0b24nIGluICRldmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAxXCIpLFxuICAgIHJpZ2h0OiBnZW5HdWFyZChcIididXR0b24nIGluICRldmVudCAmJiAkZXZlbnQuYnV0dG9uICE9PSAyXCIpXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2VuSGFuZGxlcnMgKFxuICAgIGV2ZW50cyxcbiAgICBpc05hdGl2ZVxuICApIHtcbiAgICB2YXIgcHJlZml4ID0gaXNOYXRpdmUgPyAnbmF0aXZlT246JyA6ICdvbjonO1xuICAgIHZhciBzdGF0aWNIYW5kbGVycyA9IFwiXCI7XG4gICAgdmFyIGR5bmFtaWNIYW5kbGVycyA9IFwiXCI7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBldmVudHMpIHtcbiAgICAgIHZhciBoYW5kbGVyQ29kZSA9IGdlbkhhbmRsZXIoZXZlbnRzW25hbWVdKTtcbiAgICAgIGlmIChldmVudHNbbmFtZV0gJiYgZXZlbnRzW25hbWVdLmR5bmFtaWMpIHtcbiAgICAgICAgZHluYW1pY0hhbmRsZXJzICs9IG5hbWUgKyBcIixcIiArIGhhbmRsZXJDb2RlICsgXCIsXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0aWNIYW5kbGVycyArPSBcIlxcXCJcIiArIG5hbWUgKyBcIlxcXCI6XCIgKyBoYW5kbGVyQ29kZSArIFwiLFwiO1xuICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWNIYW5kbGVycyA9IFwie1wiICsgKHN0YXRpY0hhbmRsZXJzLnNsaWNlKDAsIC0xKSkgKyBcIn1cIjtcbiAgICBpZiAoZHluYW1pY0hhbmRsZXJzKSB7XG4gICAgICByZXR1cm4gcHJlZml4ICsgXCJfZChcIiArIHN0YXRpY0hhbmRsZXJzICsgXCIsW1wiICsgKGR5bmFtaWNIYW5kbGVycy5zbGljZSgwLCAtMSkpICsgXCJdKVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcmVmaXggKyBzdGF0aWNIYW5kbGVyc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkhhbmRsZXIgKGhhbmRsZXIpIHtcbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgIHJldHVybiAnZnVuY3Rpb24oKXt9J1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGhhbmRsZXIpKSB7XG4gICAgICByZXR1cm4gKFwiW1wiICsgKGhhbmRsZXIubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiBnZW5IYW5kbGVyKGhhbmRsZXIpOyB9KS5qb2luKCcsJykpICsgXCJdXCIpXG4gICAgfVxuXG4gICAgdmFyIGlzTWV0aG9kUGF0aCA9IHNpbXBsZVBhdGhSRS50ZXN0KGhhbmRsZXIudmFsdWUpO1xuICAgIHZhciBpc0Z1bmN0aW9uRXhwcmVzc2lvbiA9IGZuRXhwUkUudGVzdChoYW5kbGVyLnZhbHVlKTtcbiAgICB2YXIgaXNGdW5jdGlvbkludm9jYXRpb24gPSBzaW1wbGVQYXRoUkUudGVzdChoYW5kbGVyLnZhbHVlLnJlcGxhY2UoZm5JbnZva2VSRSwgJycpKTtcblxuICAgIGlmICghaGFuZGxlci5tb2RpZmllcnMpIHtcbiAgICAgIGlmIChpc01ldGhvZFBhdGggfHwgaXNGdW5jdGlvbkV4cHJlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIudmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXCJmdW5jdGlvbigkZXZlbnQpe1wiICsgKGlzRnVuY3Rpb25JbnZvY2F0aW9uID8gKFwicmV0dXJuIFwiICsgKGhhbmRsZXIudmFsdWUpKSA6IGhhbmRsZXIudmFsdWUpICsgXCJ9XCIpIC8vIGlubGluZSBzdGF0ZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvZGUgPSAnJztcbiAgICAgIHZhciBnZW5Nb2RpZmllckNvZGUgPSAnJztcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICBmb3IgKHZhciBrZXkgaW4gaGFuZGxlci5tb2RpZmllcnMpIHtcbiAgICAgICAgaWYgKG1vZGlmaWVyQ29kZVtrZXldKSB7XG4gICAgICAgICAgZ2VuTW9kaWZpZXJDb2RlICs9IG1vZGlmaWVyQ29kZVtrZXldO1xuICAgICAgICAgIC8vIGxlZnQvcmlnaHRcbiAgICAgICAgICBpZiAoa2V5Q29kZXNba2V5XSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2V4YWN0Jykge1xuICAgICAgICAgIHZhciBtb2RpZmllcnMgPSAoaGFuZGxlci5tb2RpZmllcnMpO1xuICAgICAgICAgIGdlbk1vZGlmaWVyQ29kZSArPSBnZW5HdWFyZChcbiAgICAgICAgICAgIFsnY3RybCcsICdzaGlmdCcsICdhbHQnLCAnbWV0YSddXG4gICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleU1vZGlmaWVyKSB7IHJldHVybiAhbW9kaWZpZXJzW2tleU1vZGlmaWVyXTsgfSlcbiAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoa2V5TW9kaWZpZXIpIHsgcmV0dXJuIChcIiRldmVudC5cIiArIGtleU1vZGlmaWVyICsgXCJLZXlcIik7IH0pXG4gICAgICAgICAgICAgIC5qb2luKCd8fCcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGNvZGUgKz0gZ2VuS2V5RmlsdGVyKGtleXMpO1xuICAgICAgfVxuICAgICAgLy8gTWFrZSBzdXJlIG1vZGlmaWVycyBsaWtlIHByZXZlbnQgYW5kIHN0b3AgZ2V0IGV4ZWN1dGVkIGFmdGVyIGtleSBmaWx0ZXJpbmdcbiAgICAgIGlmIChnZW5Nb2RpZmllckNvZGUpIHtcbiAgICAgICAgY29kZSArPSBnZW5Nb2RpZmllckNvZGU7XG4gICAgICB9XG4gICAgICB2YXIgaGFuZGxlckNvZGUgPSBpc01ldGhvZFBhdGhcbiAgICAgICAgPyAoXCJyZXR1cm4gXCIgKyAoaGFuZGxlci52YWx1ZSkgKyBcIigkZXZlbnQpXCIpXG4gICAgICAgIDogaXNGdW5jdGlvbkV4cHJlc3Npb25cbiAgICAgICAgICA/IChcInJldHVybiAoXCIgKyAoaGFuZGxlci52YWx1ZSkgKyBcIikoJGV2ZW50KVwiKVxuICAgICAgICAgIDogaXNGdW5jdGlvbkludm9jYXRpb25cbiAgICAgICAgICAgID8gKFwicmV0dXJuIFwiICsgKGhhbmRsZXIudmFsdWUpKVxuICAgICAgICAgICAgOiBoYW5kbGVyLnZhbHVlO1xuICAgICAgcmV0dXJuIChcImZ1bmN0aW9uKCRldmVudCl7XCIgKyBjb2RlICsgaGFuZGxlckNvZGUgKyBcIn1cIilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5LZXlGaWx0ZXIgKGtleXMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSBrZXkgZmlsdGVycyBvbmx5IGFwcGx5IHRvIEtleWJvYXJkRXZlbnRzXG4gICAgICAvLyAjOTQ0MTogY2FuJ3QgdXNlICdrZXlDb2RlJyBpbiAkZXZlbnQgYmVjYXVzZSBDaHJvbWUgYXV0b2ZpbGwgZmlyZXMgZmFrZVxuICAgICAgLy8ga2V5IGV2ZW50cyB0aGF0IGRvIG5vdCBoYXZlIGtleUNvZGUgcHJvcGVydHkuLi5cbiAgICAgIFwiaWYoISRldmVudC50eXBlLmluZGV4T2YoJ2tleScpJiZcIiArXG4gICAgICAoa2V5cy5tYXAoZ2VuRmlsdGVyQ29kZSkuam9pbignJiYnKSkgKyBcIilyZXR1cm4gbnVsbDtcIlxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkZpbHRlckNvZGUgKGtleSkge1xuICAgIHZhciBrZXlWYWwgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICBpZiAoa2V5VmFsKSB7XG4gICAgICByZXR1cm4gKFwiJGV2ZW50LmtleUNvZGUhPT1cIiArIGtleVZhbClcbiAgICB9XG4gICAgdmFyIGtleUNvZGUgPSBrZXlDb2Rlc1trZXldO1xuICAgIHZhciBrZXlOYW1lID0ga2V5TmFtZXNba2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgXCJfaygkZXZlbnQua2V5Q29kZSxcIiArXG4gICAgICAoSlNPTi5zdHJpbmdpZnkoa2V5KSkgKyBcIixcIiArXG4gICAgICAoSlNPTi5zdHJpbmdpZnkoa2V5Q29kZSkpICsgXCIsXCIgK1xuICAgICAgXCIkZXZlbnQua2V5LFwiICtcbiAgICAgIFwiXCIgKyAoSlNPTi5zdHJpbmdpZnkoa2V5TmFtZSkpICtcbiAgICAgIFwiKVwiXG4gICAgKVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gb24gKGVsLCBkaXIpIHtcbiAgICBpZiAoZGlyLm1vZGlmaWVycykge1xuICAgICAgd2FybihcInYtb24gd2l0aG91dCBhcmd1bWVudCBkb2VzIG5vdCBzdXBwb3J0IG1vZGlmaWVycy5cIik7XG4gICAgfVxuICAgIGVsLndyYXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoY29kZSkgeyByZXR1cm4gKFwiX2coXCIgKyBjb2RlICsgXCIsXCIgKyAoZGlyLnZhbHVlKSArIFwiKVwiKTsgfTtcbiAgfVxuXG4gIC8qICAqL1xuXG4gIGZ1bmN0aW9uIGJpbmQkMSAoZWwsIGRpcikge1xuICAgIGVsLndyYXBEYXRhID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgIHJldHVybiAoXCJfYihcIiArIGNvZGUgKyBcIiwnXCIgKyAoZWwudGFnKSArIFwiJyxcIiArIChkaXIudmFsdWUpICsgXCIsXCIgKyAoZGlyLm1vZGlmaWVycyAmJiBkaXIubW9kaWZpZXJzLnByb3AgPyAndHJ1ZScgOiAnZmFsc2UnKSArIChkaXIubW9kaWZpZXJzICYmIGRpci5tb2RpZmllcnMuc3luYyA/ICcsdHJ1ZScgOiAnJykgKyBcIilcIilcbiAgICB9O1xuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIGJhc2VEaXJlY3RpdmVzID0ge1xuICAgIG9uOiBvbixcbiAgICBiaW5kOiBiaW5kJDEsXG4gICAgY2xvYWs6IG5vb3BcbiAgfTtcblxuICAvKiAgKi9cblxuXG5cblxuXG4gIHZhciBDb2RlZ2VuU3RhdGUgPSBmdW5jdGlvbiBDb2RlZ2VuU3RhdGUgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMud2FybiA9IG9wdGlvbnMud2FybiB8fCBiYXNlV2FybjtcbiAgICB0aGlzLnRyYW5zZm9ybXMgPSBwbHVja01vZHVsZUZ1bmN0aW9uKG9wdGlvbnMubW9kdWxlcywgJ3RyYW5zZm9ybUNvZGUnKTtcbiAgICB0aGlzLmRhdGFHZW5GbnMgPSBwbHVja01vZHVsZUZ1bmN0aW9uKG9wdGlvbnMubW9kdWxlcywgJ2dlbkRhdGEnKTtcbiAgICB0aGlzLmRpcmVjdGl2ZXMgPSBleHRlbmQoZXh0ZW5kKHt9LCBiYXNlRGlyZWN0aXZlcyksIG9wdGlvbnMuZGlyZWN0aXZlcyk7XG4gICAgdmFyIGlzUmVzZXJ2ZWRUYWcgPSBvcHRpb25zLmlzUmVzZXJ2ZWRUYWcgfHwgbm87XG4gICAgdGhpcy5tYXliZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gISFlbC5jb21wb25lbnQgfHwgIWlzUmVzZXJ2ZWRUYWcoZWwudGFnKTsgfTtcbiAgICB0aGlzLm9uY2VJZCA9IDA7XG4gICAgdGhpcy5zdGF0aWNSZW5kZXJGbnMgPSBbXTtcbiAgICB0aGlzLnByZSA9IGZhbHNlO1xuICB9O1xuXG5cblxuICBmdW5jdGlvbiBnZW5lcmF0ZSAoXG4gICAgYXN0LFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgdmFyIHN0YXRlID0gbmV3IENvZGVnZW5TdGF0ZShvcHRpb25zKTtcbiAgICB2YXIgY29kZSA9IGFzdCA/IGdlbkVsZW1lbnQoYXN0LCBzdGF0ZSkgOiAnX2MoXCJkaXZcIiknO1xuICAgIHJldHVybiB7XG4gICAgICByZW5kZXI6IChcIndpdGgodGhpcyl7cmV0dXJuIFwiICsgY29kZSArIFwifVwiKSxcbiAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuRWxlbWVudCAoZWwsIHN0YXRlKSB7XG4gICAgaWYgKGVsLnBhcmVudCkge1xuICAgICAgZWwucHJlID0gZWwucHJlIHx8IGVsLnBhcmVudC5wcmU7XG4gICAgfVxuXG4gICAgaWYgKGVsLnN0YXRpY1Jvb3QgJiYgIWVsLnN0YXRpY1Byb2Nlc3NlZCkge1xuICAgICAgcmV0dXJuIGdlblN0YXRpYyhlbCwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChlbC5vbmNlICYmICFlbC5vbmNlUHJvY2Vzc2VkKSB7XG4gICAgICByZXR1cm4gZ2VuT25jZShlbCwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChlbC5mb3IgJiYgIWVsLmZvclByb2Nlc3NlZCkge1xuICAgICAgcmV0dXJuIGdlbkZvcihlbCwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChlbC5pZiAmJiAhZWwuaWZQcm9jZXNzZWQpIHtcbiAgICAgIHJldHVybiBnZW5JZihlbCwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChlbC50YWcgPT09ICd0ZW1wbGF0ZScgJiYgIWVsLnNsb3RUYXJnZXQgJiYgIXN0YXRlLnByZSkge1xuICAgICAgcmV0dXJuIGdlbkNoaWxkcmVuKGVsLCBzdGF0ZSkgfHwgJ3ZvaWQgMCdcbiAgICB9IGVsc2UgaWYgKGVsLnRhZyA9PT0gJ3Nsb3QnKSB7XG4gICAgICByZXR1cm4gZ2VuU2xvdChlbCwgc3RhdGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbXBvbmVudCBvciBlbGVtZW50XG4gICAgICB2YXIgY29kZTtcbiAgICAgIGlmIChlbC5jb21wb25lbnQpIHtcbiAgICAgICAgY29kZSA9IGdlbkNvbXBvbmVudChlbC5jb21wb25lbnQsIGVsLCBzdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKCFlbC5wbGFpbiB8fCAoZWwucHJlICYmIHN0YXRlLm1heWJlQ29tcG9uZW50KGVsKSkpIHtcbiAgICAgICAgICBkYXRhID0gZ2VuRGF0YSQyKGVsLCBzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBlbC5pbmxpbmVUZW1wbGF0ZSA/IG51bGwgOiBnZW5DaGlsZHJlbihlbCwgc3RhdGUsIHRydWUpO1xuICAgICAgICBjb2RlID0gXCJfYygnXCIgKyAoZWwudGFnKSArIFwiJ1wiICsgKGRhdGEgPyAoXCIsXCIgKyBkYXRhKSA6ICcnKSArIChjaGlsZHJlbiA/IChcIixcIiArIGNoaWxkcmVuKSA6ICcnKSArIFwiKVwiO1xuICAgICAgfVxuICAgICAgLy8gbW9kdWxlIHRyYW5zZm9ybXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGUudHJhbnNmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb2RlID0gc3RhdGUudHJhbnNmb3Jtc1tpXShlbCwgY29kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29kZVxuICAgIH1cbiAgfVxuXG4gIC8vIGhvaXN0IHN0YXRpYyBzdWItdHJlZXMgb3V0XG4gIGZ1bmN0aW9uIGdlblN0YXRpYyAoZWwsIHN0YXRlKSB7XG4gICAgZWwuc3RhdGljUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAvLyBTb21lIGVsZW1lbnRzICh0ZW1wbGF0ZXMpIG5lZWQgdG8gYmVoYXZlIGRpZmZlcmVudGx5IGluc2lkZSBvZiBhIHYtcHJlXG4gICAgLy8gbm9kZS4gIEFsbCBwcmUgbm9kZXMgYXJlIHN0YXRpYyByb290cywgc28gd2UgY2FuIHVzZSB0aGlzIGFzIGEgbG9jYXRpb24gdG9cbiAgICAvLyB3cmFwIGEgc3RhdGUgY2hhbmdlIGFuZCByZXNldCBpdCB1cG9uIGV4aXRpbmcgdGhlIHByZSBub2RlLlxuICAgIHZhciBvcmlnaW5hbFByZVN0YXRlID0gc3RhdGUucHJlO1xuICAgIGlmIChlbC5wcmUpIHtcbiAgICAgIHN0YXRlLnByZSA9IGVsLnByZTtcbiAgICB9XG4gICAgc3RhdGUuc3RhdGljUmVuZGVyRm5zLnB1c2goKFwid2l0aCh0aGlzKXtyZXR1cm4gXCIgKyAoZ2VuRWxlbWVudChlbCwgc3RhdGUpKSArIFwifVwiKSk7XG4gICAgc3RhdGUucHJlID0gb3JpZ2luYWxQcmVTdGF0ZTtcbiAgICByZXR1cm4gKFwiX20oXCIgKyAoc3RhdGUuc3RhdGljUmVuZGVyRm5zLmxlbmd0aCAtIDEpICsgKGVsLnN0YXRpY0luRm9yID8gJyx0cnVlJyA6ICcnKSArIFwiKVwiKVxuICB9XG5cbiAgLy8gdi1vbmNlXG4gIGZ1bmN0aW9uIGdlbk9uY2UgKGVsLCBzdGF0ZSkge1xuICAgIGVsLm9uY2VQcm9jZXNzZWQgPSB0cnVlO1xuICAgIGlmIChlbC5pZiAmJiAhZWwuaWZQcm9jZXNzZWQpIHtcbiAgICAgIHJldHVybiBnZW5JZihlbCwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChlbC5zdGF0aWNJbkZvcikge1xuICAgICAgdmFyIGtleSA9ICcnO1xuICAgICAgdmFyIHBhcmVudCA9IGVsLnBhcmVudDtcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5mb3IpIHtcbiAgICAgICAgICBrZXkgPSBwYXJlbnQua2V5O1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgIH1cbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIHN0YXRlLndhcm4oXG4gICAgICAgICAgXCJ2LW9uY2UgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgdi1mb3IgdGhhdCBpcyBrZXllZC4gXCIsXG4gICAgICAgICAgZWwucmF3QXR0cnNNYXBbJ3Ytb25jZSddXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBnZW5FbGVtZW50KGVsLCBzdGF0ZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXCJfbyhcIiArIChnZW5FbGVtZW50KGVsLCBzdGF0ZSkpICsgXCIsXCIgKyAoc3RhdGUub25jZUlkKyspICsgXCIsXCIgKyBrZXkgKyBcIilcIilcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdlblN0YXRpYyhlbCwgc3RhdGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuSWYgKFxuICAgIGVsLFxuICAgIHN0YXRlLFxuICAgIGFsdEdlbixcbiAgICBhbHRFbXB0eVxuICApIHtcbiAgICBlbC5pZlByb2Nlc3NlZCA9IHRydWU7IC8vIGF2b2lkIHJlY3Vyc2lvblxuICAgIHJldHVybiBnZW5JZkNvbmRpdGlvbnMoZWwuaWZDb25kaXRpb25zLnNsaWNlKCksIHN0YXRlLCBhbHRHZW4sIGFsdEVtcHR5KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuSWZDb25kaXRpb25zIChcbiAgICBjb25kaXRpb25zLFxuICAgIHN0YXRlLFxuICAgIGFsdEdlbixcbiAgICBhbHRFbXB0eVxuICApIHtcbiAgICBpZiAoIWNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYWx0RW1wdHkgfHwgJ19lKCknXG4gICAgfVxuXG4gICAgdmFyIGNvbmRpdGlvbiA9IGNvbmRpdGlvbnMuc2hpZnQoKTtcbiAgICBpZiAoY29uZGl0aW9uLmV4cCkge1xuICAgICAgcmV0dXJuIChcIihcIiArIChjb25kaXRpb24uZXhwKSArIFwiKT9cIiArIChnZW5UZXJuYXJ5RXhwKGNvbmRpdGlvbi5ibG9jaykpICsgXCI6XCIgKyAoZ2VuSWZDb25kaXRpb25zKGNvbmRpdGlvbnMsIHN0YXRlLCBhbHRHZW4sIGFsdEVtcHR5KSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXCJcIiArIChnZW5UZXJuYXJ5RXhwKGNvbmRpdGlvbi5ibG9jaykpKVxuICAgIH1cblxuICAgIC8vIHYtaWYgd2l0aCB2LW9uY2Ugc2hvdWxkIGdlbmVyYXRlIGNvZGUgbGlrZSAoYSk/X20oMCk6X20oMSlcbiAgICBmdW5jdGlvbiBnZW5UZXJuYXJ5RXhwIChlbCkge1xuICAgICAgcmV0dXJuIGFsdEdlblxuICAgICAgICA/IGFsdEdlbihlbCwgc3RhdGUpXG4gICAgICAgIDogZWwub25jZVxuICAgICAgICAgID8gZ2VuT25jZShlbCwgc3RhdGUpXG4gICAgICAgICAgOiBnZW5FbGVtZW50KGVsLCBzdGF0ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5Gb3IgKFxuICAgIGVsLFxuICAgIHN0YXRlLFxuICAgIGFsdEdlbixcbiAgICBhbHRIZWxwZXJcbiAgKSB7XG4gICAgdmFyIGV4cCA9IGVsLmZvcjtcbiAgICB2YXIgYWxpYXMgPSBlbC5hbGlhcztcbiAgICB2YXIgaXRlcmF0b3IxID0gZWwuaXRlcmF0b3IxID8gKFwiLFwiICsgKGVsLml0ZXJhdG9yMSkpIDogJyc7XG4gICAgdmFyIGl0ZXJhdG9yMiA9IGVsLml0ZXJhdG9yMiA/IChcIixcIiArIChlbC5pdGVyYXRvcjIpKSA6ICcnO1xuXG4gICAgaWYgKHN0YXRlLm1heWJlQ29tcG9uZW50KGVsKSAmJlxuICAgICAgZWwudGFnICE9PSAnc2xvdCcgJiZcbiAgICAgIGVsLnRhZyAhPT0gJ3RlbXBsYXRlJyAmJlxuICAgICAgIWVsLmtleVxuICAgICkge1xuICAgICAgc3RhdGUud2FybihcbiAgICAgICAgXCI8XCIgKyAoZWwudGFnKSArIFwiIHYtZm9yPVxcXCJcIiArIGFsaWFzICsgXCIgaW4gXCIgKyBleHAgKyBcIlxcXCI+OiBjb21wb25lbnQgbGlzdHMgcmVuZGVyZWQgd2l0aCBcIiArXG4gICAgICAgIFwidi1mb3Igc2hvdWxkIGhhdmUgZXhwbGljaXQga2V5cy4gXCIgK1xuICAgICAgICBcIlNlZSBodHRwczovL3Z1ZWpzLm9yZy9ndWlkZS9saXN0Lmh0bWwja2V5IGZvciBtb3JlIGluZm8uXCIsXG4gICAgICAgIGVsLnJhd0F0dHJzTWFwWyd2LWZvciddLFxuICAgICAgICB0cnVlIC8qIHRpcCAqL1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBlbC5mb3JQcm9jZXNzZWQgPSB0cnVlOyAvLyBhdm9pZCByZWN1cnNpb25cbiAgICByZXR1cm4gKGFsdEhlbHBlciB8fCAnX2wnKSArIFwiKChcIiArIGV4cCArIFwiKSxcIiArXG4gICAgICBcImZ1bmN0aW9uKFwiICsgYWxpYXMgKyBpdGVyYXRvcjEgKyBpdGVyYXRvcjIgKyBcIil7XCIgK1xuICAgICAgICBcInJldHVybiBcIiArICgoYWx0R2VuIHx8IGdlbkVsZW1lbnQpKGVsLCBzdGF0ZSkpICtcbiAgICAgICd9KSdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkRhdGEkMiAoZWwsIHN0YXRlKSB7XG4gICAgdmFyIGRhdGEgPSAneyc7XG5cbiAgICAvLyBkaXJlY3RpdmVzIGZpcnN0LlxuICAgIC8vIGRpcmVjdGl2ZXMgbWF5IG11dGF0ZSB0aGUgZWwncyBvdGhlciBwcm9wZXJ0aWVzIGJlZm9yZSB0aGV5IGFyZSBnZW5lcmF0ZWQuXG4gICAgdmFyIGRpcnMgPSBnZW5EaXJlY3RpdmVzKGVsLCBzdGF0ZSk7XG4gICAgaWYgKGRpcnMpIHsgZGF0YSArPSBkaXJzICsgJywnOyB9XG5cbiAgICAvLyBrZXlcbiAgICBpZiAoZWwua2V5KSB7XG4gICAgICBkYXRhICs9IFwia2V5OlwiICsgKGVsLmtleSkgKyBcIixcIjtcbiAgICB9XG4gICAgLy8gcmVmXG4gICAgaWYgKGVsLnJlZikge1xuICAgICAgZGF0YSArPSBcInJlZjpcIiArIChlbC5yZWYpICsgXCIsXCI7XG4gICAgfVxuICAgIGlmIChlbC5yZWZJbkZvcikge1xuICAgICAgZGF0YSArPSBcInJlZkluRm9yOnRydWUsXCI7XG4gICAgfVxuICAgIC8vIHByZVxuICAgIGlmIChlbC5wcmUpIHtcbiAgICAgIGRhdGEgKz0gXCJwcmU6dHJ1ZSxcIjtcbiAgICB9XG4gICAgLy8gcmVjb3JkIG9yaWdpbmFsIHRhZyBuYW1lIGZvciBjb21wb25lbnRzIHVzaW5nIFwiaXNcIiBhdHRyaWJ1dGVcbiAgICBpZiAoZWwuY29tcG9uZW50KSB7XG4gICAgICBkYXRhICs9IFwidGFnOlxcXCJcIiArIChlbC50YWcpICsgXCJcXFwiLFwiO1xuICAgIH1cbiAgICAvLyBtb2R1bGUgZGF0YSBnZW5lcmF0aW9uIGZ1bmN0aW9uc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhdGUuZGF0YUdlbkZucy5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YSArPSBzdGF0ZS5kYXRhR2VuRm5zW2ldKGVsKTtcbiAgICB9XG4gICAgLy8gYXR0cmlidXRlc1xuICAgIGlmIChlbC5hdHRycykge1xuICAgICAgZGF0YSArPSBcImF0dHJzOlwiICsgKGdlblByb3BzKGVsLmF0dHJzKSkgKyBcIixcIjtcbiAgICB9XG4gICAgLy8gRE9NIHByb3BzXG4gICAgaWYgKGVsLnByb3BzKSB7XG4gICAgICBkYXRhICs9IFwiZG9tUHJvcHM6XCIgKyAoZ2VuUHJvcHMoZWwucHJvcHMpKSArIFwiLFwiO1xuICAgIH1cbiAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgIGlmIChlbC5ldmVudHMpIHtcbiAgICAgIGRhdGEgKz0gKGdlbkhhbmRsZXJzKGVsLmV2ZW50cywgZmFsc2UpKSArIFwiLFwiO1xuICAgIH1cbiAgICBpZiAoZWwubmF0aXZlRXZlbnRzKSB7XG4gICAgICBkYXRhICs9IChnZW5IYW5kbGVycyhlbC5uYXRpdmVFdmVudHMsIHRydWUpKSArIFwiLFwiO1xuICAgIH1cbiAgICAvLyBzbG90IHRhcmdldFxuICAgIC8vIG9ubHkgZm9yIG5vbi1zY29wZWQgc2xvdHNcbiAgICBpZiAoZWwuc2xvdFRhcmdldCAmJiAhZWwuc2xvdFNjb3BlKSB7XG4gICAgICBkYXRhICs9IFwic2xvdDpcIiArIChlbC5zbG90VGFyZ2V0KSArIFwiLFwiO1xuICAgIH1cbiAgICAvLyBzY29wZWQgc2xvdHNcbiAgICBpZiAoZWwuc2NvcGVkU2xvdHMpIHtcbiAgICAgIGRhdGEgKz0gKGdlblNjb3BlZFNsb3RzKGVsLCBlbC5zY29wZWRTbG90cywgc3RhdGUpKSArIFwiLFwiO1xuICAgIH1cbiAgICAvLyBjb21wb25lbnQgdi1tb2RlbFxuICAgIGlmIChlbC5tb2RlbCkge1xuICAgICAgZGF0YSArPSBcIm1vZGVsOnt2YWx1ZTpcIiArIChlbC5tb2RlbC52YWx1ZSkgKyBcIixjYWxsYmFjazpcIiArIChlbC5tb2RlbC5jYWxsYmFjaykgKyBcIixleHByZXNzaW9uOlwiICsgKGVsLm1vZGVsLmV4cHJlc3Npb24pICsgXCJ9LFwiO1xuICAgIH1cbiAgICAvLyBpbmxpbmUtdGVtcGxhdGVcbiAgICBpZiAoZWwuaW5saW5lVGVtcGxhdGUpIHtcbiAgICAgIHZhciBpbmxpbmVUZW1wbGF0ZSA9IGdlbklubGluZVRlbXBsYXRlKGVsLCBzdGF0ZSk7XG4gICAgICBpZiAoaW5saW5lVGVtcGxhdGUpIHtcbiAgICAgICAgZGF0YSArPSBpbmxpbmVUZW1wbGF0ZSArIFwiLFwiO1xuICAgICAgfVxuICAgIH1cbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC8sJC8sICcnKSArICd9JztcbiAgICAvLyB2LWJpbmQgZHluYW1pYyBhcmd1bWVudCB3cmFwXG4gICAgLy8gdi1iaW5kIHdpdGggZHluYW1pYyBhcmd1bWVudHMgbXVzdCBiZSBhcHBsaWVkIHVzaW5nIHRoZSBzYW1lIHYtYmluZCBvYmplY3RcbiAgICAvLyBtZXJnZSBoZWxwZXIgc28gdGhhdCBjbGFzcy9zdHlsZS9tdXN0VXNlUHJvcCBhdHRycyBhcmUgaGFuZGxlZCBjb3JyZWN0bHkuXG4gICAgaWYgKGVsLmR5bmFtaWNBdHRycykge1xuICAgICAgZGF0YSA9IFwiX2IoXCIgKyBkYXRhICsgXCIsXFxcIlwiICsgKGVsLnRhZykgKyBcIlxcXCIsXCIgKyAoZ2VuUHJvcHMoZWwuZHluYW1pY0F0dHJzKSkgKyBcIilcIjtcbiAgICB9XG4gICAgLy8gdi1iaW5kIGRhdGEgd3JhcFxuICAgIGlmIChlbC53cmFwRGF0YSkge1xuICAgICAgZGF0YSA9IGVsLndyYXBEYXRhKGRhdGEpO1xuICAgIH1cbiAgICAvLyB2LW9uIGRhdGEgd3JhcFxuICAgIGlmIChlbC53cmFwTGlzdGVuZXJzKSB7XG4gICAgICBkYXRhID0gZWwud3JhcExpc3RlbmVycyhkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbkRpcmVjdGl2ZXMgKGVsLCBzdGF0ZSkge1xuICAgIHZhciBkaXJzID0gZWwuZGlyZWN0aXZlcztcbiAgICBpZiAoIWRpcnMpIHsgcmV0dXJuIH1cbiAgICB2YXIgcmVzID0gJ2RpcmVjdGl2ZXM6Wyc7XG4gICAgdmFyIGhhc1J1bnRpbWUgPSBmYWxzZTtcbiAgICB2YXIgaSwgbCwgZGlyLCBuZWVkUnVudGltZTtcbiAgICBmb3IgKGkgPSAwLCBsID0gZGlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGRpciA9IGRpcnNbaV07XG4gICAgICBuZWVkUnVudGltZSA9IHRydWU7XG4gICAgICB2YXIgZ2VuID0gc3RhdGUuZGlyZWN0aXZlc1tkaXIubmFtZV07XG4gICAgICBpZiAoZ2VuKSB7XG4gICAgICAgIC8vIGNvbXBpbGUtdGltZSBkaXJlY3RpdmUgdGhhdCBtYW5pcHVsYXRlcyBBU1QuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBpdCBhbHNvIG5lZWRzIGEgcnVudGltZSBjb3VudGVycGFydC5cbiAgICAgICAgbmVlZFJ1bnRpbWUgPSAhIWdlbihlbCwgZGlyLCBzdGF0ZS53YXJuKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkUnVudGltZSkge1xuICAgICAgICBoYXNSdW50aW1lID0gdHJ1ZTtcbiAgICAgICAgcmVzICs9IFwie25hbWU6XFxcIlwiICsgKGRpci5uYW1lKSArIFwiXFxcIixyYXdOYW1lOlxcXCJcIiArIChkaXIucmF3TmFtZSkgKyBcIlxcXCJcIiArIChkaXIudmFsdWUgPyAoXCIsdmFsdWU6KFwiICsgKGRpci52YWx1ZSkgKyBcIiksZXhwcmVzc2lvbjpcIiArIChKU09OLnN0cmluZ2lmeShkaXIudmFsdWUpKSkgOiAnJykgKyAoZGlyLmFyZyA/IChcIixhcmc6XCIgKyAoZGlyLmlzRHluYW1pY0FyZyA/IGRpci5hcmcgOiAoXCJcXFwiXCIgKyAoZGlyLmFyZykgKyBcIlxcXCJcIikpKSA6ICcnKSArIChkaXIubW9kaWZpZXJzID8gKFwiLG1vZGlmaWVyczpcIiArIChKU09OLnN0cmluZ2lmeShkaXIubW9kaWZpZXJzKSkpIDogJycpICsgXCJ9LFwiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGFzUnVudGltZSkge1xuICAgICAgcmV0dXJuIHJlcy5zbGljZSgwLCAtMSkgKyAnXSdcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5JbmxpbmVUZW1wbGF0ZSAoZWwsIHN0YXRlKSB7XG4gICAgdmFyIGFzdCA9IGVsLmNoaWxkcmVuWzBdO1xuICAgIGlmIChlbC5jaGlsZHJlbi5sZW5ndGggIT09IDEgfHwgYXN0LnR5cGUgIT09IDEpIHtcbiAgICAgIHN0YXRlLndhcm4oXG4gICAgICAgICdJbmxpbmUtdGVtcGxhdGUgY29tcG9uZW50cyBtdXN0IGhhdmUgZXhhY3RseSBvbmUgY2hpbGQgZWxlbWVudC4nLFxuICAgICAgICB7IHN0YXJ0OiBlbC5zdGFydCB9XG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYXN0ICYmIGFzdC50eXBlID09PSAxKSB7XG4gICAgICB2YXIgaW5saW5lUmVuZGVyRm5zID0gZ2VuZXJhdGUoYXN0LCBzdGF0ZS5vcHRpb25zKTtcbiAgICAgIHJldHVybiAoXCJpbmxpbmVUZW1wbGF0ZTp7cmVuZGVyOmZ1bmN0aW9uKCl7XCIgKyAoaW5saW5lUmVuZGVyRm5zLnJlbmRlcikgKyBcIn0sc3RhdGljUmVuZGVyRm5zOltcIiArIChpbmxpbmVSZW5kZXJGbnMuc3RhdGljUmVuZGVyRm5zLm1hcChmdW5jdGlvbiAoY29kZSkgeyByZXR1cm4gKFwiZnVuY3Rpb24oKXtcIiArIGNvZGUgKyBcIn1cIik7IH0pLmpvaW4oJywnKSkgKyBcIl19XCIpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuU2NvcGVkU2xvdHMgKFxuICAgIGVsLFxuICAgIHNsb3RzLFxuICAgIHN0YXRlXG4gICkge1xuICAgIC8vIGJ5IGRlZmF1bHQgc2NvcGVkIHNsb3RzIGFyZSBjb25zaWRlcmVkIFwic3RhYmxlXCIsIHRoaXMgYWxsb3dzIGNoaWxkXG4gICAgLy8gY29tcG9uZW50cyB3aXRoIG9ubHkgc2NvcGVkIHNsb3RzIHRvIHNraXAgZm9yY2VkIHVwZGF0ZXMgZnJvbSBwYXJlbnQuXG4gICAgLy8gYnV0IGluIHNvbWUgY2FzZXMgd2UgaGF2ZSB0byBiYWlsLW91dCBvZiB0aGlzIG9wdGltaXphdGlvblxuICAgIC8vIGZvciBleGFtcGxlIGlmIHRoZSBzbG90IGNvbnRhaW5zIGR5bmFtaWMgbmFtZXMsIGhhcyB2LWlmIG9yIHYtZm9yIG9uIHRoZW0uLi5cbiAgICB2YXIgbmVlZHNGb3JjZVVwZGF0ZSA9IGVsLmZvciB8fCBPYmplY3Qua2V5cyhzbG90cykuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgc2xvdCA9IHNsb3RzW2tleV07XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzbG90LnNsb3RUYXJnZXREeW5hbWljIHx8XG4gICAgICAgIHNsb3QuaWYgfHxcbiAgICAgICAgc2xvdC5mb3IgfHxcbiAgICAgICAgY29udGFpbnNTbG90Q2hpbGQoc2xvdCkgLy8gaXMgcGFzc2luZyBkb3duIHNsb3QgZnJvbSBwYXJlbnQgd2hpY2ggbWF5IGJlIGR5bmFtaWNcbiAgICAgIClcbiAgICB9KTtcblxuICAgIC8vICM5NTM0OiBpZiBhIGNvbXBvbmVudCB3aXRoIHNjb3BlZCBzbG90cyBpcyBpbnNpZGUgYSBjb25kaXRpb25hbCBicmFuY2gsXG4gICAgLy8gaXQncyBwb3NzaWJsZSBmb3IgdGhlIHNhbWUgY29tcG9uZW50IHRvIGJlIHJldXNlZCBidXQgd2l0aCBkaWZmZXJlbnRcbiAgICAvLyBjb21waWxlZCBzbG90IGNvbnRlbnQuIFRvIGF2b2lkIHRoYXQsIHdlIGdlbmVyYXRlIGEgdW5pcXVlIGtleSBiYXNlZCBvblxuICAgIC8vIHRoZSBnZW5lcmF0ZWQgY29kZSBvZiBhbGwgdGhlIHNsb3QgY29udGVudHMuXG4gICAgdmFyIG5lZWRzS2V5ID0gISFlbC5pZjtcblxuICAgIC8vIE9SIHdoZW4gaXQgaXMgaW5zaWRlIGFub3RoZXIgc2NvcGVkIHNsb3Qgb3Igdi1mb3IgKHRoZSByZWFjdGl2aXR5IG1heSBiZVxuICAgIC8vIGRpc2Nvbm5lY3RlZCBkdWUgdG8gdGhlIGludGVybWVkaWF0ZSBzY29wZSB2YXJpYWJsZSlcbiAgICAvLyAjOTQzOCwgIzk1MDZcbiAgICAvLyBUT0RPOiB0aGlzIGNhbiBiZSBmdXJ0aGVyIG9wdGltaXplZCBieSBwcm9wZXJseSBhbmFseXppbmcgaW4tc2NvcGUgYmluZGluZ3NcbiAgICAvLyBhbmQgc2tpcCBmb3JjZSB1cGRhdGluZyBvbmVzIHRoYXQgZG8gbm90IGFjdHVhbGx5IHVzZSBzY29wZSB2YXJpYWJsZXMuXG4gICAgaWYgKCFuZWVkc0ZvcmNlVXBkYXRlKSB7XG4gICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50O1xuICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHBhcmVudC5zbG90U2NvcGUgJiYgcGFyZW50LnNsb3RTY29wZSAhPT0gZW1wdHlTbG90U2NvcGVUb2tlbikgfHxcbiAgICAgICAgICBwYXJlbnQuZm9yXG4gICAgICAgICkge1xuICAgICAgICAgIG5lZWRzRm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5pZikge1xuICAgICAgICAgIG5lZWRzS2V5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZWRTbG90cyA9IE9iamVjdC5rZXlzKHNsb3RzKVxuICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBnZW5TY29wZWRTbG90KHNsb3RzW2tleV0sIHN0YXRlKTsgfSlcbiAgICAgIC5qb2luKCcsJyk7XG5cbiAgICByZXR1cm4gKFwic2NvcGVkU2xvdHM6X3UoW1wiICsgZ2VuZXJhdGVkU2xvdHMgKyBcIl1cIiArIChuZWVkc0ZvcmNlVXBkYXRlID8gXCIsbnVsbCx0cnVlXCIgOiBcIlwiKSArICghbmVlZHNGb3JjZVVwZGF0ZSAmJiBuZWVkc0tleSA/IChcIixudWxsLGZhbHNlLFwiICsgKGhhc2goZ2VuZXJhdGVkU2xvdHMpKSkgOiBcIlwiKSArIFwiKVwiKVxuICB9XG5cbiAgZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgICB2YXIgaGFzaCA9IDUzODE7XG4gICAgdmFyIGkgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlKGkpIHtcbiAgICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHN0ci5jaGFyQ29kZUF0KC0taSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNoID4+PiAwXG4gIH1cblxuICBmdW5jdGlvbiBjb250YWluc1Nsb3RDaGlsZCAoZWwpIHtcbiAgICBpZiAoZWwudHlwZSA9PT0gMSkge1xuICAgICAgaWYgKGVsLnRhZyA9PT0gJ3Nsb3QnKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZWwuY2hpbGRyZW4uc29tZShjb250YWluc1Nsb3RDaGlsZClcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBnZW5TY29wZWRTbG90IChcbiAgICBlbCxcbiAgICBzdGF0ZVxuICApIHtcbiAgICB2YXIgaXNMZWdhY3lTeW50YXggPSBlbC5hdHRyc01hcFsnc2xvdC1zY29wZSddO1xuICAgIGlmIChlbC5pZiAmJiAhZWwuaWZQcm9jZXNzZWQgJiYgIWlzTGVnYWN5U3ludGF4KSB7XG4gICAgICByZXR1cm4gZ2VuSWYoZWwsIHN0YXRlLCBnZW5TY29wZWRTbG90LCBcIm51bGxcIilcbiAgICB9XG4gICAgaWYgKGVsLmZvciAmJiAhZWwuZm9yUHJvY2Vzc2VkKSB7XG4gICAgICByZXR1cm4gZ2VuRm9yKGVsLCBzdGF0ZSwgZ2VuU2NvcGVkU2xvdClcbiAgICB9XG4gICAgdmFyIHNsb3RTY29wZSA9IGVsLnNsb3RTY29wZSA9PT0gZW1wdHlTbG90U2NvcGVUb2tlblxuICAgICAgPyBcIlwiXG4gICAgICA6IFN0cmluZyhlbC5zbG90U2NvcGUpO1xuICAgIHZhciBmbiA9IFwiZnVuY3Rpb24oXCIgKyBzbG90U2NvcGUgKyBcIil7XCIgK1xuICAgICAgXCJyZXR1cm4gXCIgKyAoZWwudGFnID09PSAndGVtcGxhdGUnXG4gICAgICAgID8gZWwuaWYgJiYgaXNMZWdhY3lTeW50YXhcbiAgICAgICAgICA/IChcIihcIiArIChlbC5pZikgKyBcIik/XCIgKyAoZ2VuQ2hpbGRyZW4oZWwsIHN0YXRlKSB8fCAndW5kZWZpbmVkJykgKyBcIjp1bmRlZmluZWRcIilcbiAgICAgICAgICA6IGdlbkNoaWxkcmVuKGVsLCBzdGF0ZSkgfHwgJ3VuZGVmaW5lZCdcbiAgICAgICAgOiBnZW5FbGVtZW50KGVsLCBzdGF0ZSkpICsgXCJ9XCI7XG4gICAgLy8gcmV2ZXJzZSBwcm94eSB2LXNsb3Qgd2l0aG91dCBzY29wZSBvbiB0aGlzLiRzbG90c1xuICAgIHZhciByZXZlcnNlUHJveHkgPSBzbG90U2NvcGUgPyBcIlwiIDogXCIscHJveHk6dHJ1ZVwiO1xuICAgIHJldHVybiAoXCJ7a2V5OlwiICsgKGVsLnNsb3RUYXJnZXQgfHwgXCJcXFwiZGVmYXVsdFxcXCJcIikgKyBcIixmbjpcIiArIGZuICsgcmV2ZXJzZVByb3h5ICsgXCJ9XCIpXG4gIH1cblxuICBmdW5jdGlvbiBnZW5DaGlsZHJlbiAoXG4gICAgZWwsXG4gICAgc3RhdGUsXG4gICAgY2hlY2tTa2lwLFxuICAgIGFsdEdlbkVsZW1lbnQsXG4gICAgYWx0R2VuTm9kZVxuICApIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBlbC5jaGlsZHJlbjtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB2YXIgZWwkMSA9IGNoaWxkcmVuWzBdO1xuICAgICAgLy8gb3B0aW1pemUgc2luZ2xlIHYtZm9yXG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmXG4gICAgICAgIGVsJDEuZm9yICYmXG4gICAgICAgIGVsJDEudGFnICE9PSAndGVtcGxhdGUnICYmXG4gICAgICAgIGVsJDEudGFnICE9PSAnc2xvdCdcbiAgICAgICkge1xuICAgICAgICB2YXIgbm9ybWFsaXphdGlvblR5cGUgPSBjaGVja1NraXBcbiAgICAgICAgICA/IHN0YXRlLm1heWJlQ29tcG9uZW50KGVsJDEpID8gXCIsMVwiIDogXCIsMFwiXG4gICAgICAgICAgOiBcIlwiO1xuICAgICAgICByZXR1cm4gKFwiXCIgKyAoKGFsdEdlbkVsZW1lbnQgfHwgZ2VuRWxlbWVudCkoZWwkMSwgc3RhdGUpKSArIG5vcm1hbGl6YXRpb25UeXBlKVxuICAgICAgfVxuICAgICAgdmFyIG5vcm1hbGl6YXRpb25UeXBlJDEgPSBjaGVja1NraXBcbiAgICAgICAgPyBnZXROb3JtYWxpemF0aW9uVHlwZShjaGlsZHJlbiwgc3RhdGUubWF5YmVDb21wb25lbnQpXG4gICAgICAgIDogMDtcbiAgICAgIHZhciBnZW4gPSBhbHRHZW5Ob2RlIHx8IGdlbk5vZGU7XG4gICAgICByZXR1cm4gKFwiW1wiICsgKGNoaWxkcmVuLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gZ2VuKGMsIHN0YXRlKTsgfSkuam9pbignLCcpKSArIFwiXVwiICsgKG5vcm1hbGl6YXRpb25UeXBlJDEgPyAoXCIsXCIgKyBub3JtYWxpemF0aW9uVHlwZSQxKSA6ICcnKSlcbiAgICB9XG4gIH1cblxuICAvLyBkZXRlcm1pbmUgdGhlIG5vcm1hbGl6YXRpb24gbmVlZGVkIGZvciB0aGUgY2hpbGRyZW4gYXJyYXkuXG4gIC8vIDA6IG5vIG5vcm1hbGl6YXRpb24gbmVlZGVkXG4gIC8vIDE6IHNpbXBsZSBub3JtYWxpemF0aW9uIG5lZWRlZCAocG9zc2libGUgMS1sZXZlbCBkZWVwIG5lc3RlZCBhcnJheSlcbiAgLy8gMjogZnVsbCBub3JtYWxpemF0aW9uIG5lZWRlZFxuICBmdW5jdGlvbiBnZXROb3JtYWxpemF0aW9uVHlwZSAoXG4gICAgY2hpbGRyZW4sXG4gICAgbWF5YmVDb21wb25lbnRcbiAgKSB7XG4gICAgdmFyIHJlcyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVsID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoZWwudHlwZSAhPT0gMSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgaWYgKG5lZWRzTm9ybWFsaXphdGlvbihlbCkgfHxcbiAgICAgICAgICAoZWwuaWZDb25kaXRpb25zICYmIGVsLmlmQ29uZGl0aW9ucy5zb21lKGZ1bmN0aW9uIChjKSB7IHJldHVybiBuZWVkc05vcm1hbGl6YXRpb24oYy5ibG9jayk7IH0pKSkge1xuICAgICAgICByZXMgPSAyO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgaWYgKG1heWJlQ29tcG9uZW50KGVsKSB8fFxuICAgICAgICAgIChlbC5pZkNvbmRpdGlvbnMgJiYgZWwuaWZDb25kaXRpb25zLnNvbWUoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIG1heWJlQ29tcG9uZW50KGMuYmxvY2spOyB9KSkpIHtcbiAgICAgICAgcmVzID0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgZnVuY3Rpb24gbmVlZHNOb3JtYWxpemF0aW9uIChlbCkge1xuICAgIHJldHVybiBlbC5mb3IgIT09IHVuZGVmaW5lZCB8fCBlbC50YWcgPT09ICd0ZW1wbGF0ZScgfHwgZWwudGFnID09PSAnc2xvdCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbk5vZGUgKG5vZGUsIHN0YXRlKSB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGdlbkVsZW1lbnQobm9kZSwgc3RhdGUpXG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09IDMgJiYgbm9kZS5pc0NvbW1lbnQpIHtcbiAgICAgIHJldHVybiBnZW5Db21tZW50KG5vZGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZW5UZXh0KG5vZGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuVGV4dCAodGV4dCkge1xuICAgIHJldHVybiAoXCJfdihcIiArICh0ZXh0LnR5cGUgPT09IDJcbiAgICAgID8gdGV4dC5leHByZXNzaW9uIC8vIG5vIG5lZWQgZm9yICgpIGJlY2F1c2UgYWxyZWFkeSB3cmFwcGVkIGluIF9zKClcbiAgICAgIDogdHJhbnNmb3JtU3BlY2lhbE5ld2xpbmVzKEpTT04uc3RyaW5naWZ5KHRleHQudGV4dCkpKSArIFwiKVwiKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuQ29tbWVudCAoY29tbWVudCkge1xuICAgIHJldHVybiAoXCJfZShcIiArIChKU09OLnN0cmluZ2lmeShjb21tZW50LnRleHQpKSArIFwiKVwiKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuU2xvdCAoZWwsIHN0YXRlKSB7XG4gICAgdmFyIHNsb3ROYW1lID0gZWwuc2xvdE5hbWUgfHwgJ1wiZGVmYXVsdFwiJztcbiAgICB2YXIgY2hpbGRyZW4gPSBnZW5DaGlsZHJlbihlbCwgc3RhdGUpO1xuICAgIHZhciByZXMgPSBcIl90KFwiICsgc2xvdE5hbWUgKyAoY2hpbGRyZW4gPyAoXCIsXCIgKyBjaGlsZHJlbikgOiAnJyk7XG4gICAgdmFyIGF0dHJzID0gZWwuYXR0cnMgfHwgZWwuZHluYW1pY0F0dHJzXG4gICAgICA/IGdlblByb3BzKChlbC5hdHRycyB8fCBbXSkuY29uY2F0KGVsLmR5bmFtaWNBdHRycyB8fCBbXSkubWFwKGZ1bmN0aW9uIChhdHRyKSB7IHJldHVybiAoe1xuICAgICAgICAgIC8vIHNsb3QgcHJvcHMgYXJlIGNhbWVsaXplZFxuICAgICAgICAgIG5hbWU6IGNhbWVsaXplKGF0dHIubmFtZSksXG4gICAgICAgICAgdmFsdWU6IGF0dHIudmFsdWUsXG4gICAgICAgICAgZHluYW1pYzogYXR0ci5keW5hbWljXG4gICAgICAgIH0pOyB9KSlcbiAgICAgIDogbnVsbDtcbiAgICB2YXIgYmluZCQkMSA9IGVsLmF0dHJzTWFwWyd2LWJpbmQnXTtcbiAgICBpZiAoKGF0dHJzIHx8IGJpbmQkJDEpICYmICFjaGlsZHJlbikge1xuICAgICAgcmVzICs9IFwiLG51bGxcIjtcbiAgICB9XG4gICAgaWYgKGF0dHJzKSB7XG4gICAgICByZXMgKz0gXCIsXCIgKyBhdHRycztcbiAgICB9XG4gICAgaWYgKGJpbmQkJDEpIHtcbiAgICAgIHJlcyArPSAoYXR0cnMgPyAnJyA6ICcsbnVsbCcpICsgXCIsXCIgKyBiaW5kJCQxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzICsgJyknXG4gIH1cblxuICAvLyBjb21wb25lbnROYW1lIGlzIGVsLmNvbXBvbmVudCwgdGFrZSBpdCBhcyBhcmd1bWVudCB0byBzaHVuIGZsb3cncyBwZXNzaW1pc3RpYyByZWZpbmVtZW50XG4gIGZ1bmN0aW9uIGdlbkNvbXBvbmVudCAoXG4gICAgY29tcG9uZW50TmFtZSxcbiAgICBlbCxcbiAgICBzdGF0ZVxuICApIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBlbC5pbmxpbmVUZW1wbGF0ZSA/IG51bGwgOiBnZW5DaGlsZHJlbihlbCwgc3RhdGUsIHRydWUpO1xuICAgIHJldHVybiAoXCJfYyhcIiArIGNvbXBvbmVudE5hbWUgKyBcIixcIiArIChnZW5EYXRhJDIoZWwsIHN0YXRlKSkgKyAoY2hpbGRyZW4gPyAoXCIsXCIgKyBjaGlsZHJlbikgOiAnJykgKyBcIilcIilcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlblByb3BzIChwcm9wcykge1xuICAgIHZhciBzdGF0aWNQcm9wcyA9IFwiXCI7XG4gICAgdmFyIGR5bmFtaWNQcm9wcyA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IHRyYW5zZm9ybVNwZWNpYWxOZXdsaW5lcyhwcm9wLnZhbHVlKTtcbiAgICAgIGlmIChwcm9wLmR5bmFtaWMpIHtcbiAgICAgICAgZHluYW1pY1Byb3BzICs9IChwcm9wLm5hbWUpICsgXCIsXCIgKyB2YWx1ZSArIFwiLFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGljUHJvcHMgKz0gXCJcXFwiXCIgKyAocHJvcC5uYW1lKSArIFwiXFxcIjpcIiArIHZhbHVlICsgXCIsXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHN0YXRpY1Byb3BzID0gXCJ7XCIgKyAoc3RhdGljUHJvcHMuc2xpY2UoMCwgLTEpKSArIFwifVwiO1xuICAgIGlmIChkeW5hbWljUHJvcHMpIHtcbiAgICAgIHJldHVybiAoXCJfZChcIiArIHN0YXRpY1Byb3BzICsgXCIsW1wiICsgKGR5bmFtaWNQcm9wcy5zbGljZSgwLCAtMSkpICsgXCJdKVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RhdGljUHJvcHNcbiAgICB9XG4gIH1cblxuICAvLyAjMzg5NSwgIzQyNjhcbiAgZnVuY3Rpb24gdHJhbnNmb3JtU3BlY2lhbE5ld2xpbmVzICh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHRcbiAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csICdcXFxcdTIwMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgJ1xcXFx1MjAyOScpXG4gIH1cblxuICAvKiAgKi9cblxuXG5cbiAgLy8gdGhlc2Uga2V5d29yZHMgc2hvdWxkIG5vdCBhcHBlYXIgaW5zaWRlIGV4cHJlc3Npb25zLCBidXQgb3BlcmF0b3JzIGxpa2VcbiAgLy8gdHlwZW9mLCBpbnN0YW5jZW9mIGFuZCBpbiBhcmUgYWxsb3dlZFxuICB2YXIgcHJvaGliaXRlZEtleXdvcmRSRSA9IG5ldyBSZWdFeHAoJ1xcXFxiJyArIChcbiAgICAnZG8saWYsZm9yLGxldCxuZXcsdHJ5LHZhcixjYXNlLGVsc2Usd2l0aCxhd2FpdCxicmVhayxjYXRjaCxjbGFzcyxjb25zdCwnICtcbiAgICAnc3VwZXIsdGhyb3csd2hpbGUseWllbGQsZGVsZXRlLGV4cG9ydCxpbXBvcnQscmV0dXJuLHN3aXRjaCxkZWZhdWx0LCcgK1xuICAgICdleHRlbmRzLGZpbmFsbHksY29udGludWUsZGVidWdnZXIsZnVuY3Rpb24sYXJndW1lbnRzJ1xuICApLnNwbGl0KCcsJykuam9pbignXFxcXGJ8XFxcXGInKSArICdcXFxcYicpO1xuXG4gIC8vIHRoZXNlIHVuYXJ5IG9wZXJhdG9ycyBzaG91bGQgbm90IGJlIHVzZWQgYXMgcHJvcGVydHkvbWV0aG9kIG5hbWVzXG4gIHZhciB1bmFyeU9wZXJhdG9yc1JFID0gbmV3IFJlZ0V4cCgnXFxcXGInICsgKFxuICAgICdkZWxldGUsdHlwZW9mLHZvaWQnXG4gICkuc3BsaXQoJywnKS5qb2luKCdcXFxccypcXFxcKFteXFxcXCldKlxcXFwpfFxcXFxiJykgKyAnXFxcXHMqXFxcXChbXlxcXFwpXSpcXFxcKScpO1xuXG4gIC8vIHN0cmlwIHN0cmluZ3MgaW4gZXhwcmVzc2lvbnNcbiAgdmFyIHN0cmlwU3RyaW5nUkUgPSAvJyg/OlteJ1xcXFxdfFxcXFwuKSonfFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInxgKD86W15gXFxcXF18XFxcXC4pKlxcJFxce3xcXH0oPzpbXmBcXFxcXXxcXFxcLikqYHxgKD86W15gXFxcXF18XFxcXC4pKmAvZztcblxuICAvLyBkZXRlY3QgcHJvYmxlbWF0aWMgZXhwcmVzc2lvbnMgaW4gYSB0ZW1wbGF0ZVxuICBmdW5jdGlvbiBkZXRlY3RFcnJvcnMgKGFzdCwgd2Fybikge1xuICAgIGlmIChhc3QpIHtcbiAgICAgIGNoZWNrTm9kZShhc3QsIHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTm9kZSAobm9kZSwgd2Fybikge1xuICAgIGlmIChub2RlLnR5cGUgPT09IDEpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gbm9kZS5hdHRyc01hcCkge1xuICAgICAgICBpZiAoZGlyUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IG5vZGUuYXR0cnNNYXBbbmFtZV07XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBub2RlLnJhd0F0dHJzTWFwW25hbWVdO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICd2LWZvcicpIHtcbiAgICAgICAgICAgICAgY2hlY2tGb3Iobm9kZSwgKFwidi1mb3I9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiksIHdhcm4sIHJhbmdlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3Ytc2xvdCcgfHwgbmFtZVswXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgIGNoZWNrRnVuY3Rpb25QYXJhbWV0ZXJFeHByZXNzaW9uKHZhbHVlLCAobmFtZSArIFwiPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpLCB3YXJuLCByYW5nZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9uUkUudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgICBjaGVja0V2ZW50KHZhbHVlLCAobmFtZSArIFwiPVxcXCJcIiArIHZhbHVlICsgXCJcXFwiXCIpLCB3YXJuLCByYW5nZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjaGVja0V4cHJlc3Npb24odmFsdWUsIChuYW1lICsgXCI9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiksIHdhcm4sIHJhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNoZWNrTm9kZShub2RlLmNoaWxkcmVuW2ldLCB3YXJuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAyKSB7XG4gICAgICBjaGVja0V4cHJlc3Npb24obm9kZS5leHByZXNzaW9uLCBub2RlLnRleHQsIHdhcm4sIG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrRXZlbnQgKGV4cCwgdGV4dCwgd2FybiwgcmFuZ2UpIHtcbiAgICB2YXIgc3RyaXBwZWQgPSBleHAucmVwbGFjZShzdHJpcFN0cmluZ1JFLCAnJyk7XG4gICAgdmFyIGtleXdvcmRNYXRjaCA9IHN0cmlwcGVkLm1hdGNoKHVuYXJ5T3BlcmF0b3JzUkUpO1xuICAgIGlmIChrZXl3b3JkTWF0Y2ggJiYgc3RyaXBwZWQuY2hhckF0KGtleXdvcmRNYXRjaC5pbmRleCAtIDEpICE9PSAnJCcpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIFwiYXZvaWQgdXNpbmcgSmF2YVNjcmlwdCB1bmFyeSBvcGVyYXRvciBhcyBwcm9wZXJ0eSBuYW1lOiBcIiArXG4gICAgICAgIFwiXFxcIlwiICsgKGtleXdvcmRNYXRjaFswXSkgKyBcIlxcXCIgaW4gZXhwcmVzc2lvbiBcIiArICh0ZXh0LnRyaW0oKSksXG4gICAgICAgIHJhbmdlXG4gICAgICApO1xuICAgIH1cbiAgICBjaGVja0V4cHJlc3Npb24oZXhwLCB0ZXh0LCB3YXJuLCByYW5nZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0ZvciAobm9kZSwgdGV4dCwgd2FybiwgcmFuZ2UpIHtcbiAgICBjaGVja0V4cHJlc3Npb24obm9kZS5mb3IgfHwgJycsIHRleHQsIHdhcm4sIHJhbmdlKTtcbiAgICBjaGVja0lkZW50aWZpZXIobm9kZS5hbGlhcywgJ3YtZm9yIGFsaWFzJywgdGV4dCwgd2FybiwgcmFuZ2UpO1xuICAgIGNoZWNrSWRlbnRpZmllcihub2RlLml0ZXJhdG9yMSwgJ3YtZm9yIGl0ZXJhdG9yJywgdGV4dCwgd2FybiwgcmFuZ2UpO1xuICAgIGNoZWNrSWRlbnRpZmllcihub2RlLml0ZXJhdG9yMiwgJ3YtZm9yIGl0ZXJhdG9yJywgdGV4dCwgd2FybiwgcmFuZ2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tJZGVudGlmaWVyIChcbiAgICBpZGVudCxcbiAgICB0eXBlLFxuICAgIHRleHQsXG4gICAgd2FybixcbiAgICByYW5nZVxuICApIHtcbiAgICBpZiAodHlwZW9mIGlkZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEZ1bmN0aW9uKChcInZhciBcIiArIGlkZW50ICsgXCI9X1wiKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHdhcm4oKFwiaW52YWxpZCBcIiArIHR5cGUgKyBcIiBcXFwiXCIgKyBpZGVudCArIFwiXFxcIiBpbiBleHByZXNzaW9uOiBcIiArICh0ZXh0LnRyaW0oKSkpLCByYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tFeHByZXNzaW9uIChleHAsIHRleHQsIHdhcm4sIHJhbmdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIG5ldyBGdW5jdGlvbigoXCJyZXR1cm4gXCIgKyBleHApKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2YXIga2V5d29yZE1hdGNoID0gZXhwLnJlcGxhY2Uoc3RyaXBTdHJpbmdSRSwgJycpLm1hdGNoKHByb2hpYml0ZWRLZXl3b3JkUkUpO1xuICAgICAgaWYgKGtleXdvcmRNYXRjaCkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiYXZvaWQgdXNpbmcgSmF2YVNjcmlwdCBrZXl3b3JkIGFzIHByb3BlcnR5IG5hbWU6IFwiICtcbiAgICAgICAgICBcIlxcXCJcIiArIChrZXl3b3JkTWF0Y2hbMF0pICsgXCJcXFwiXFxuICBSYXcgZXhwcmVzc2lvbjogXCIgKyAodGV4dC50cmltKCkpLFxuICAgICAgICAgIHJhbmdlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIFwiaW52YWxpZCBleHByZXNzaW9uOiBcIiArIChlLm1lc3NhZ2UpICsgXCIgaW5cXG5cXG5cIiArXG4gICAgICAgICAgXCIgICAgXCIgKyBleHAgKyBcIlxcblxcblwiICtcbiAgICAgICAgICBcIiAgUmF3IGV4cHJlc3Npb246IFwiICsgKHRleHQudHJpbSgpKSArIFwiXFxuXCIsXG4gICAgICAgICAgcmFuZ2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0Z1bmN0aW9uUGFyYW1ldGVyRXhwcmVzc2lvbiAoZXhwLCB0ZXh0LCB3YXJuLCByYW5nZSkge1xuICAgIHRyeSB7XG4gICAgICBuZXcgRnVuY3Rpb24oZXhwLCAnJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2FybihcbiAgICAgICAgXCJpbnZhbGlkIGZ1bmN0aW9uIHBhcmFtZXRlciBleHByZXNzaW9uOiBcIiArIChlLm1lc3NhZ2UpICsgXCIgaW5cXG5cXG5cIiArXG4gICAgICAgIFwiICAgIFwiICsgZXhwICsgXCJcXG5cXG5cIiArXG4gICAgICAgIFwiICBSYXcgZXhwcmVzc2lvbjogXCIgKyAodGV4dC50cmltKCkpICsgXCJcXG5cIixcbiAgICAgICAgcmFuZ2VcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgdmFyIHJhbmdlID0gMjtcblxuICBmdW5jdGlvbiBnZW5lcmF0ZUNvZGVGcmFtZSAoXG4gICAgc291cmNlLFxuICAgIHN0YXJ0LFxuICAgIGVuZFxuICApIHtcbiAgICBpZiAoIHN0YXJ0ID09PSB2b2lkIDAgKSBzdGFydCA9IDA7XG4gICAgaWYgKCBlbmQgPT09IHZvaWQgMCApIGVuZCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgICB2YXIgbGluZXMgPSBzb3VyY2Uuc3BsaXQoL1xccj9cXG4vKTtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb3VudCArPSBsaW5lc1tpXS5sZW5ndGggKyAxO1xuICAgICAgaWYgKGNvdW50ID49IHN0YXJ0KSB7XG4gICAgICAgIGZvciAodmFyIGogPSBpIC0gcmFuZ2U7IGogPD0gaSArIHJhbmdlIHx8IGVuZCA+IGNvdW50OyBqKyspIHtcbiAgICAgICAgICBpZiAoaiA8IDAgfHwgaiA+PSBsaW5lcy5sZW5ndGgpIHsgY29udGludWUgfVxuICAgICAgICAgIHJlcy5wdXNoKChcIlwiICsgKGogKyAxKSArIChyZXBlYXQkMShcIiBcIiwgMyAtIFN0cmluZyhqICsgMSkubGVuZ3RoKSkgKyBcInwgIFwiICsgKGxpbmVzW2pdKSkpO1xuICAgICAgICAgIHZhciBsaW5lTGVuZ3RoID0gbGluZXNbal0ubGVuZ3RoO1xuICAgICAgICAgIGlmIChqID09PSBpKSB7XG4gICAgICAgICAgICAvLyBwdXNoIHVuZGVybGluZVxuICAgICAgICAgICAgdmFyIHBhZCA9IHN0YXJ0IC0gKGNvdW50IC0gbGluZUxlbmd0aCkgKyAxO1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGVuZCA+IGNvdW50ID8gbGluZUxlbmd0aCAtIHBhZCA6IGVuZCAtIHN0YXJ0O1xuICAgICAgICAgICAgcmVzLnB1c2goXCIgICB8ICBcIiArIHJlcGVhdCQxKFwiIFwiLCBwYWQpICsgcmVwZWF0JDEoXCJeXCIsIGxlbmd0aCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA+IGkpIHtcbiAgICAgICAgICAgIGlmIChlbmQgPiBjb3VudCkge1xuICAgICAgICAgICAgICB2YXIgbGVuZ3RoJDEgPSBNYXRoLm1pbihlbmQgLSBjb3VudCwgbGluZUxlbmd0aCk7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKFwiICAgfCAgXCIgKyByZXBlYXQkMShcIl5cIiwgbGVuZ3RoJDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ICs9IGxpbmVMZW5ndGggKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzLmpvaW4oJ1xcbicpXG4gIH1cblxuICBmdW5jdGlvbiByZXBlYXQkMSAoc3RyLCBuKSB7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIGlmIChuID4gMCkge1xuICAgICAgd2hpbGUgKHRydWUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAobiAmIDEpIHsgcmVzdWx0ICs9IHN0cjsgfVxuICAgICAgICBuID4+Pj0gMTtcbiAgICAgICAgaWYgKG4gPD0gMCkgeyBicmVhayB9XG4gICAgICAgIHN0ciArPSBzdHI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qICAqL1xuXG5cblxuICBmdW5jdGlvbiBjcmVhdGVGdW5jdGlvbiAoY29kZSwgZXJyb3JzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oY29kZSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9ycy5wdXNoKHsgZXJyOiBlcnIsIGNvZGU6IGNvZGUgfSk7XG4gICAgICByZXR1cm4gbm9vcFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVUb0Z1bmN0aW9uRm4gKGNvbXBpbGUpIHtcbiAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBpbGVUb0Z1bmN0aW9ucyAoXG4gICAgICB0ZW1wbGF0ZSxcbiAgICAgIG9wdGlvbnMsXG4gICAgICB2bVxuICAgICkge1xuICAgICAgb3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICB2YXIgd2FybiQkMSA9IG9wdGlvbnMud2FybiB8fCB3YXJuO1xuICAgICAgZGVsZXRlIG9wdGlvbnMud2FybjtcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICB7XG4gICAgICAgIC8vIGRldGVjdCBwb3NzaWJsZSBDU1AgcmVzdHJpY3Rpb25cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXcgRnVuY3Rpb24oJ3JldHVybiAxJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZS50b1N0cmluZygpLm1hdGNoKC91bnNhZmUtZXZhbHxDU1AvKSkge1xuICAgICAgICAgICAgd2FybiQkMShcbiAgICAgICAgICAgICAgJ0l0IHNlZW1zIHlvdSBhcmUgdXNpbmcgdGhlIHN0YW5kYWxvbmUgYnVpbGQgb2YgVnVlLmpzIGluIGFuICcgK1xuICAgICAgICAgICAgICAnZW52aXJvbm1lbnQgd2l0aCBDb250ZW50IFNlY3VyaXR5IFBvbGljeSB0aGF0IHByb2hpYml0cyB1bnNhZmUtZXZhbC4gJyArXG4gICAgICAgICAgICAgICdUaGUgdGVtcGxhdGUgY29tcGlsZXIgY2Fubm90IHdvcmsgaW4gdGhpcyBlbnZpcm9ubWVudC4gQ29uc2lkZXIgJyArXG4gICAgICAgICAgICAgICdyZWxheGluZyB0aGUgcG9saWN5IHRvIGFsbG93IHVuc2FmZS1ldmFsIG9yIHByZS1jb21waWxpbmcgeW91ciAnICtcbiAgICAgICAgICAgICAgJ3RlbXBsYXRlcyBpbnRvIHJlbmRlciBmdW5jdGlvbnMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgY2FjaGVcbiAgICAgIHZhciBrZXkgPSBvcHRpb25zLmRlbGltaXRlcnNcbiAgICAgICAgPyBTdHJpbmcob3B0aW9ucy5kZWxpbWl0ZXJzKSArIHRlbXBsYXRlXG4gICAgICAgIDogdGVtcGxhdGU7XG4gICAgICBpZiAoY2FjaGVba2V5XSkge1xuICAgICAgICByZXR1cm4gY2FjaGVba2V5XVxuICAgICAgfVxuXG4gICAgICAvLyBjb21waWxlXG4gICAgICB2YXIgY29tcGlsZWQgPSBjb21waWxlKHRlbXBsYXRlLCBvcHRpb25zKTtcblxuICAgICAgLy8gY2hlY2sgY29tcGlsYXRpb24gZXJyb3JzL3RpcHNcbiAgICAgIHtcbiAgICAgICAgaWYgKGNvbXBpbGVkLmVycm9ycyAmJiBjb21waWxlZC5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMub3V0cHV0U291cmNlUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbXBpbGVkLmVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIHdhcm4kJDEoXG4gICAgICAgICAgICAgICAgXCJFcnJvciBjb21waWxpbmcgdGVtcGxhdGU6XFxuXFxuXCIgKyAoZS5tc2cpICsgXCJcXG5cXG5cIiArXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDb2RlRnJhbWUodGVtcGxhdGUsIGUuc3RhcnQsIGUuZW5kKSxcbiAgICAgICAgICAgICAgICB2bVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhcm4kJDEoXG4gICAgICAgICAgICAgIFwiRXJyb3IgY29tcGlsaW5nIHRlbXBsYXRlOlxcblxcblwiICsgdGVtcGxhdGUgKyBcIlxcblxcblwiICtcbiAgICAgICAgICAgICAgY29tcGlsZWQuZXJyb3JzLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gKFwiLSBcIiArIGUpOyB9KS5qb2luKCdcXG4nKSArICdcXG4nLFxuICAgICAgICAgICAgICB2bVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBpbGVkLnRpcHMgJiYgY29tcGlsZWQudGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5vdXRwdXRTb3VyY2VSYW5nZSkge1xuICAgICAgICAgICAgY29tcGlsZWQudGlwcy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiB0aXAoZS5tc2csIHZtKTsgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBpbGVkLnRpcHMuZm9yRWFjaChmdW5jdGlvbiAobXNnKSB7IHJldHVybiB0aXAobXNnLCB2bSk7IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0dXJuIGNvZGUgaW50byBmdW5jdGlvbnNcbiAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgIHZhciBmbkdlbkVycm9ycyA9IFtdO1xuICAgICAgcmVzLnJlbmRlciA9IGNyZWF0ZUZ1bmN0aW9uKGNvbXBpbGVkLnJlbmRlciwgZm5HZW5FcnJvcnMpO1xuICAgICAgcmVzLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkLnN0YXRpY1JlbmRlckZucy5tYXAoZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZ1bmN0aW9uKGNvZGUsIGZuR2VuRXJyb3JzKVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGNoZWNrIGZ1bmN0aW9uIGdlbmVyYXRpb24gZXJyb3JzLlxuICAgICAgLy8gdGhpcyBzaG91bGQgb25seSBoYXBwZW4gaWYgdGhlcmUgaXMgYSBidWcgaW4gdGhlIGNvbXBpbGVyIGl0c2VsZi5cbiAgICAgIC8vIG1vc3RseSBmb3IgY29kZWdlbiBkZXZlbG9wbWVudCB1c2VcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAge1xuICAgICAgICBpZiAoKCFjb21waWxlZC5lcnJvcnMgfHwgIWNvbXBpbGVkLmVycm9ycy5sZW5ndGgpICYmIGZuR2VuRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHdhcm4kJDEoXG4gICAgICAgICAgICBcIkZhaWxlZCB0byBnZW5lcmF0ZSByZW5kZXIgZnVuY3Rpb246XFxuXFxuXCIgK1xuICAgICAgICAgICAgZm5HZW5FcnJvcnMubWFwKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgdmFyIGVyciA9IHJlZi5lcnI7XG4gICAgICAgICAgICAgIHZhciBjb2RlID0gcmVmLmNvZGU7XG5cbiAgICAgICAgICAgICAgcmV0dXJuICgoZXJyLnRvU3RyaW5nKCkpICsgXCIgaW5cXG5cXG5cIiArIGNvZGUgKyBcIlxcblwiKTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgIHZtXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGNhY2hlW2tleV0gPSByZXMpXG4gICAgfVxuICB9XG5cbiAgLyogICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlQ29tcGlsZXJDcmVhdG9yIChiYXNlQ29tcGlsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBjcmVhdGVDb21waWxlciAoYmFzZU9wdGlvbnMpIHtcbiAgICAgIGZ1bmN0aW9uIGNvbXBpbGUgKFxuICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKSB7XG4gICAgICAgIHZhciBmaW5hbE9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKGJhc2VPcHRpb25zKTtcbiAgICAgICAgdmFyIGVycm9ycyA9IFtdO1xuICAgICAgICB2YXIgdGlwcyA9IFtdO1xuXG4gICAgICAgIHZhciB3YXJuID0gZnVuY3Rpb24gKG1zZywgcmFuZ2UsIHRpcCkge1xuICAgICAgICAgICh0aXAgPyB0aXBzIDogZXJyb3JzKS5wdXNoKG1zZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5vdXRwdXRTb3VyY2VSYW5nZSkge1xuICAgICAgICAgICAgLy8gJGZsb3ctZGlzYWJsZS1saW5lXG4gICAgICAgICAgICB2YXIgbGVhZGluZ1NwYWNlTGVuZ3RoID0gdGVtcGxhdGUubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICB3YXJuID0gZnVuY3Rpb24gKG1zZywgcmFuZ2UsIHRpcCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHsgbXNnOiBtc2cgfTtcbiAgICAgICAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEuc3RhcnQgPSByYW5nZS5zdGFydCArIGxlYWRpbmdTcGFjZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhLmVuZCA9IHJhbmdlLmVuZCArIGxlYWRpbmdTcGFjZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKHRpcCA/IHRpcHMgOiBlcnJvcnMpLnB1c2goZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSBjdXN0b20gbW9kdWxlc1xuICAgICAgICAgIGlmIChvcHRpb25zLm1vZHVsZXMpIHtcbiAgICAgICAgICAgIGZpbmFsT3B0aW9ucy5tb2R1bGVzID1cbiAgICAgICAgICAgICAgKGJhc2VPcHRpb25zLm1vZHVsZXMgfHwgW10pLmNvbmNhdChvcHRpb25zLm1vZHVsZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSBjdXN0b20gZGlyZWN0aXZlc1xuICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgICAgIGZpbmFsT3B0aW9ucy5kaXJlY3RpdmVzID0gZXh0ZW5kKFxuICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlKGJhc2VPcHRpb25zLmRpcmVjdGl2ZXMgfHwgbnVsbCksXG4gICAgICAgICAgICAgIG9wdGlvbnMuZGlyZWN0aXZlc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29weSBvdGhlciBvcHRpb25zXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdtb2R1bGVzJyAmJiBrZXkgIT09ICdkaXJlY3RpdmVzJykge1xuICAgICAgICAgICAgICBmaW5hbE9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmaW5hbE9wdGlvbnMud2FybiA9IHdhcm47XG5cbiAgICAgICAgdmFyIGNvbXBpbGVkID0gYmFzZUNvbXBpbGUodGVtcGxhdGUudHJpbSgpLCBmaW5hbE9wdGlvbnMpO1xuICAgICAgICB7XG4gICAgICAgICAgZGV0ZWN0RXJyb3JzKGNvbXBpbGVkLmFzdCwgd2Fybik7XG4gICAgICAgIH1cbiAgICAgICAgY29tcGlsZWQuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICBjb21waWxlZC50aXBzID0gdGlwcztcbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBpbGU6IGNvbXBpbGUsXG4gICAgICAgIGNvbXBpbGVUb0Z1bmN0aW9uczogY3JlYXRlQ29tcGlsZVRvRnVuY3Rpb25Gbihjb21waWxlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qICAqL1xuXG4gIC8vIGBjcmVhdGVDb21waWxlckNyZWF0b3JgIGFsbG93cyBjcmVhdGluZyBjb21waWxlcnMgdGhhdCB1c2UgYWx0ZXJuYXRpdmVcbiAgLy8gcGFyc2VyL29wdGltaXplci9jb2RlZ2VuLCBlLmcgdGhlIFNTUiBvcHRpbWl6aW5nIGNvbXBpbGVyLlxuICAvLyBIZXJlIHdlIGp1c3QgZXhwb3J0IGEgZGVmYXVsdCBjb21waWxlciB1c2luZyB0aGUgZGVmYXVsdCBwYXJ0cy5cbiAgdmFyIGNyZWF0ZUNvbXBpbGVyID0gY3JlYXRlQ29tcGlsZXJDcmVhdG9yKGZ1bmN0aW9uIGJhc2VDb21waWxlIChcbiAgICB0ZW1wbGF0ZSxcbiAgICBvcHRpb25zXG4gICkge1xuICAgIHZhciBhc3QgPSBwYXJzZSh0ZW1wbGF0ZS50cmltKCksIG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLm9wdGltaXplICE9PSBmYWxzZSkge1xuICAgICAgb3B0aW1pemUoYXN0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgdmFyIGNvZGUgPSBnZW5lcmF0ZShhc3QsIG9wdGlvbnMpO1xuICAgIHJldHVybiB7XG4gICAgICBhc3Q6IGFzdCxcbiAgICAgIHJlbmRlcjogY29kZS5yZW5kZXIsXG4gICAgICBzdGF0aWNSZW5kZXJGbnM6IGNvZGUuc3RhdGljUmVuZGVyRm5zXG4gICAgfVxuICB9KTtcblxuICAvKiAgKi9cblxuICB2YXIgcmVmJDEgPSBjcmVhdGVDb21waWxlcihiYXNlT3B0aW9ucyk7XG4gIHZhciBjb21waWxlID0gcmVmJDEuY29tcGlsZTtcbiAgdmFyIGNvbXBpbGVUb0Z1bmN0aW9ucyA9IHJlZiQxLmNvbXBpbGVUb0Z1bmN0aW9ucztcblxuICAvKiAgKi9cblxuICAvLyBjaGVjayB3aGV0aGVyIGN1cnJlbnQgYnJvd3NlciBlbmNvZGVzIGEgY2hhciBpbnNpZGUgYXR0cmlidXRlIHZhbHVlc1xuICB2YXIgZGl2O1xuICBmdW5jdGlvbiBnZXRTaG91bGREZWNvZGUgKGhyZWYpIHtcbiAgICBkaXYgPSBkaXYgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGhyZWYgPyBcIjxhIGhyZWY9XFxcIlxcblxcXCIvPlwiIDogXCI8ZGl2IGE9XFxcIlxcblxcXCIvPlwiO1xuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MLmluZGV4T2YoJyYjMTA7JykgPiAwXG4gIH1cblxuICAvLyAjMzY2MzogSUUgZW5jb2RlcyBuZXdsaW5lcyBpbnNpZGUgYXR0cmlidXRlIHZhbHVlcyB3aGlsZSBvdGhlciBicm93c2VycyBkb24ndFxuICB2YXIgc2hvdWxkRGVjb2RlTmV3bGluZXMgPSBpbkJyb3dzZXIgPyBnZXRTaG91bGREZWNvZGUoZmFsc2UpIDogZmFsc2U7XG4gIC8vICM2ODI4OiBjaHJvbWUgZW5jb2RlcyBjb250ZW50IGluIGFbaHJlZl1cbiAgdmFyIHNob3VsZERlY29kZU5ld2xpbmVzRm9ySHJlZiA9IGluQnJvd3NlciA/IGdldFNob3VsZERlY29kZSh0cnVlKSA6IGZhbHNlO1xuXG4gIC8qICAqL1xuXG4gIHZhciBpZFRvVGVtcGxhdGUgPSBjYWNoZWQoZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsID0gcXVlcnkoaWQpO1xuICAgIHJldHVybiBlbCAmJiBlbC5pbm5lckhUTUxcbiAgfSk7XG5cbiAgdmFyIG1vdW50ID0gVnVlLnByb3RvdHlwZS4kbW91bnQ7XG4gIFZ1ZS5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKFxuICAgIGVsLFxuICAgIGh5ZHJhdGluZ1xuICApIHtcbiAgICBlbCA9IGVsICYmIHF1ZXJ5KGVsKTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbCA9PT0gZG9jdW1lbnQuYm9keSB8fCBlbCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICB3YXJuKFxuICAgICAgICBcIkRvIG5vdCBtb3VudCBWdWUgdG8gPGh0bWw+IG9yIDxib2R5PiAtIG1vdW50IHRvIG5vcm1hbCBlbGVtZW50cyBpbnN0ZWFkLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgLy8gcmVzb2x2ZSB0ZW1wbGF0ZS9lbCBhbmQgY29udmVydCB0byByZW5kZXIgZnVuY3Rpb25cbiAgICBpZiAoIW9wdGlvbnMucmVuZGVyKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IGlkVG9UZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAoXCJUZW1wbGF0ZSBlbGVtZW50IG5vdCBmb3VuZCBvciBpcyBlbXB0eTogXCIgKyAob3B0aW9ucy50ZW1wbGF0ZSkpLFxuICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGVtcGxhdGUubm9kZVR5cGUpIHtcbiAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmlubmVySFRNTDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3YXJuKCdpbnZhbGlkIHRlbXBsYXRlIG9wdGlvbjonICsgdGVtcGxhdGUsIHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsKSB7XG4gICAgICAgIHRlbXBsYXRlID0gZ2V0T3V0ZXJIVE1MKGVsKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICAgICAgbWFyaygnY29tcGlsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlZiA9IGNvbXBpbGVUb0Z1bmN0aW9ucyh0ZW1wbGF0ZSwge1xuICAgICAgICAgIG91dHB1dFNvdXJjZVJhbmdlOiBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgICBzaG91bGREZWNvZGVOZXdsaW5lczogc2hvdWxkRGVjb2RlTmV3bGluZXMsXG4gICAgICAgICAgc2hvdWxkRGVjb2RlTmV3bGluZXNGb3JIcmVmOiBzaG91bGREZWNvZGVOZXdsaW5lc0ZvckhyZWYsXG4gICAgICAgICAgZGVsaW1pdGVyczogb3B0aW9ucy5kZWxpbWl0ZXJzLFxuICAgICAgICAgIGNvbW1lbnRzOiBvcHRpb25zLmNvbW1lbnRzXG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB2YXIgcmVuZGVyID0gcmVmLnJlbmRlcjtcbiAgICAgICAgdmFyIHN0YXRpY1JlbmRlckZucyA9IHJlZi5zdGF0aWNSZW5kZXJGbnM7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyID0gcmVuZGVyO1xuICAgICAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZucztcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBtYXJrKSB7XG4gICAgICAgICAgbWFyaygnY29tcGlsZSBlbmQnKTtcbiAgICAgICAgICBtZWFzdXJlKChcInZ1ZSBcIiArICh0aGlzLl9uYW1lKSArIFwiIGNvbXBpbGVcIiksICdjb21waWxlJywgJ2NvbXBpbGUgZW5kJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vdW50LmNhbGwodGhpcywgZWwsIGh5ZHJhdGluZylcbiAgfTtcblxuICAvKipcbiAgICogR2V0IG91dGVySFRNTCBvZiBlbGVtZW50cywgdGFraW5nIGNhcmVcbiAgICogb2YgU1ZHIGVsZW1lbnRzIGluIElFIGFzIHdlbGwuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRPdXRlckhUTUwgKGVsKSB7XG4gICAgaWYgKGVsLm91dGVySFRNTCkge1xuICAgICAgcmV0dXJuIGVsLm91dGVySFRNTFxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgIHJldHVybiBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgVnVlLmNvbXBpbGUgPSBjb21waWxlVG9GdW5jdGlvbnM7XG5cbiAgcmV0dXJuIFZ1ZTtcblxufSkpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gVnVlXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcblxuLy8gaW1tb25leCBLaWNrc3RhcnQgU3RhdGVcbmltcG9ydCBpbnhTdGF0ZSBmcm9tICcuL3N0YXRlJ1xuVnVlLm1peGluKGlueFN0YXRlKVxuXG4vLyBpbW1vbmV4IEtpY2tzdGFydCBDb21wb25lbnRzXG5pbXBvcnQgYmVUb2dnbGVSZWZlcmVuY2UgZnJvbSAnLi9ub24tdnVlLWNvbXBvbmVudHMvYmVUb2dnbGVSZWZlcmVuY2UnXG5pbnhfc3RhdGUuYmVUb2dnbGVSZWZlcmVuY2UgPSBiZVRvZ2dsZVJlZmVyZW5jZVxuXG4vLyAoUylDU1NcbmltcG9ydCAnLi4vLi4vc2Nzcy9iYWNrZW5kLnNjc3MnXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXHQkKCdhW2hyZWY9XCIjaW54LXN1Ym1lbnUtc2VwYXJhdG9yXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLnBhcmVudCgpLmh0bWwoJzxkaXYgY2xhc3M9XCJpbngtc3VibWVudS1zZXBhcmF0b3JcIj48L2Rpdj4nKVxuXHR9KVxuXG5cdCQoJyNfaW54X2RldGFpbHNfcmVwZWF0IC5wb3N0Ym94LmNtYi1yb3cuY21iLXJlcGVhdGFibGUtZ3JvdXBpbmcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGxldCBlbElEID0gJCh0aGlzKS5hdHRyKCdpZCcpLm1hdGNoKC9bMC05XSskLylcblx0XHRpZiAoIWVsSUQpIHJldHVybjtcblxuXHRcdGxldCBpZCA9IGVsSURbMF1cblx0XHRsZXQgdGl0bGUgPSAkKCcjX2lueF9kZXRhaWxzXycgKyBpZCArICdfdGl0bGUnKS52YWwoKVxuXHRcdGlmICghdGl0bGUpIHJldHVybjtcblxuXHRcdCQodGhpcykuZmluZCgnLmNtYi1ncm91cC10aXRsZSA+IHNwYW4nKS5hcHBlbmQoJzogJyArIHRpdGxlKVxuXHR9KVxufSlcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlVG9nZ2xlUmVmZXJlbmNlKGV2ZW50KSB7XG5cdGlmIChcblx0XHQhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3RzLWZpbHRlcicpIHx8XG5cdFx0IWlueF9zdGF0ZS5yZXN0X25vbmNlXG5cdCkge1xuXHRcdHJldHVyblxuXHR9XG5cblx0Y29uc3QgcHJvcGVydHlJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvcGVydHktaWQnKTtcblx0aWYgKCFwcm9wZXJ0eUlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYXBpVXJsID0gaW54X3N0YXRlLnNpdGVfdXJsICsgJy93cC1qc29uL2ltbW9uZXgta2lja3N0YXJ0L3YxL3Byb3BlcnRpZXMvJyArIHByb3BlcnR5SWRcblxuXHRqUXVlcnkuYWpheCh7XG5cdFx0dHlwZTogJ1BVVCcsXG5cdFx0dXJsOiBhcGlVcmwsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J1gtV1AtTm9uY2UnOiBpbnhfc3RhdGUucmVzdF9ub25jZVxuXHRcdH0sXG5cdFx0ZGF0YToge1xuXHRcdFx0cmVmZXJlbmNlOiBldmVudC50YXJnZXQuY2hlY2tlZCA/IDEgOiAwXG5cdFx0fVxuXHR9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0aWYgKCdTVUNDRVNTJyAhPT0gZGF0YS5zdGF0dXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdpbW1vbmV4IEtpY2tzdGFydDogRXJyb3Igb24gc2F2aW5nIHByb3BlcnR5IHJlZmVyZW5jZSBzdGF0ZSEnKTtcblx0XHR9XG5cdH0pO1xufSAvLyBiZVRvZ2dsZVJlZmVyZW5jZVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgXHRpbnhTdGF0ZTogaW54X3N0YXRlXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9