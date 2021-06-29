/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/skins/default/scss/index.scss":
/*!*******************************************!*\
  !*** ./src/skins/default/scss/index.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./src/skins/default/js/src/index.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/index.scss */ "./src/skins/default/scss/index.scss");
// (S)CSS

jQuery(document).ready(function ($) {
  var removedElements = 0;
  $('#inx-single-property__tab-contents > li').each(function (index, li) {
    if (0 === $(li).html().trim().length) {
      // Remove empty tabs and their related navigation items.
      $(li).remove();
      $('.inx-single-property__tab-nav li:eq(' + (index - removedElements) + ')').remove();
      removedElements++;
    }
  });
});
/* const compo = inx_state.vue.component('async-example', {
	name: 'async-example',
	data: function () {
		return {
			count: 0
		}
	},
	template: '<div>Hello World! {{ this.inxState.yo }}</div>'
}) */
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AaW1tb25leC9raWNrc3RhcnQvLi9zcmMvc2tpbnMvZGVmYXVsdC9zY3NzL2luZGV4LnNjc3M/NjkzOSIsIndlYnBhY2s6Ly9AaW1tb25leC9raWNrc3RhcnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGltbW9uZXgva2lja3N0YXJ0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGltbW9uZXgva2lja3N0YXJ0Ly4vc3JjL3NraW5zL2RlZmF1bHQvanMvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCIkIiwicmVtb3ZlZEVsZW1lbnRzIiwiZWFjaCIsImluZGV4IiwibGkiLCJodG1sIiwidHJpbSIsImxlbmd0aCIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUFBLE1BQU0sQ0FBRUMsUUFBRixDQUFOLENBQW1CQyxLQUFuQixDQUEwQixVQUFVQyxDQUFWLEVBQWM7QUFDdkMsTUFBSUMsZUFBZSxHQUFHLENBQXRCO0FBRUFELEdBQUMsQ0FBRSx5Q0FBRixDQUFELENBQStDRSxJQUEvQyxDQUFxRCxVQUFVQyxLQUFWLEVBQWlCQyxFQUFqQixFQUFzQjtBQUMxRSxRQUFLLE1BQU1KLENBQUMsQ0FBRUksRUFBRixDQUFELENBQVFDLElBQVIsR0FBZUMsSUFBZixHQUFzQkMsTUFBakMsRUFBMEM7QUFDekM7QUFDQVAsT0FBQyxDQUFFSSxFQUFGLENBQUQsQ0FBUUksTUFBUjtBQUNBUixPQUFDLENBQUUsMENBQTJDRyxLQUFLLEdBQUdGLGVBQW5ELElBQXVFLEdBQXpFLENBQUQsQ0FBZ0ZPLE1BQWhGO0FBQ0FQLHFCQUFlO0FBQ2Y7QUFDRCxHQVBEO0FBUUEsQ0FYRDtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLIiwiZmlsZSI6Ii4uLy4uL3NyYy9za2lucy9kZWZhdWx0L2pzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIChTKUNTU1xuaW1wb3J0ICcuLi8uLi9zY3NzL2luZGV4LnNjc3MnO1xuXG5qUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCAkICkge1xuXHRsZXQgcmVtb3ZlZEVsZW1lbnRzID0gMDtcblxuXHQkKCAnI2lueC1zaW5nbGUtcHJvcGVydHlfX3RhYi1jb250ZW50cyA+IGxpJyApLmVhY2goIGZ1bmN0aW9uKCBpbmRleCwgbGkgKSB7XG5cdFx0aWYgKCAwID09PSAkKCBsaSApLmh0bWwoKS50cmltKCkubGVuZ3RoICkge1xuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHRhYnMgYW5kIHRoZWlyIHJlbGF0ZWQgbmF2aWdhdGlvbiBpdGVtcy5cblx0XHRcdCQoIGxpICkucmVtb3ZlKCk7XG5cdFx0XHQkKCAnLmlueC1zaW5nbGUtcHJvcGVydHlfX3RhYi1uYXYgbGk6ZXEoJyArICggaW5kZXggLSByZW1vdmVkRWxlbWVudHMgKSArICcpJyApLnJlbW92ZSgpO1xuXHRcdFx0cmVtb3ZlZEVsZW1lbnRzKys7XG5cdFx0fVxuXHR9KVxufSlcblxuLyogY29uc3QgY29tcG8gPSBpbnhfc3RhdGUudnVlLmNvbXBvbmVudCgnYXN5bmMtZXhhbXBsZScsIHtcblx0bmFtZTogJ2FzeW5jLWV4YW1wbGUnLFxuXHRkYXRhOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvdW50OiAwXG5cdFx0fVxuXHR9LFxuXHR0ZW1wbGF0ZTogJzxkaXY+SGVsbG8gV29ybGQhIHt7IHRoaXMuaW54U3RhdGUueW8gfX08L2Rpdj4nXG59KSAqL1xuIl0sInNvdXJjZVJvb3QiOiIifQ==