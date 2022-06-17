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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vc3JjL3NraW5zL2RlZmF1bHQvanMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBQSxNQUFNLENBQUVDLFFBQUYsQ0FBTixDQUFtQkMsS0FBbkIsQ0FBMEIsVUFBVUMsQ0FBVixFQUFjO0VBQ3ZDLElBQUlDLGVBQWUsR0FBRyxDQUF0QjtFQUVBRCxDQUFDLENBQUUseUNBQUYsQ0FBRCxDQUErQ0UsSUFBL0MsQ0FBcUQsVUFBVUMsS0FBVixFQUFpQkMsRUFBakIsRUFBc0I7SUFDMUUsSUFBSyxNQUFNSixDQUFDLENBQUVJLEVBQUYsQ0FBRCxDQUFRQyxJQUFSLEdBQWVDLElBQWYsR0FBc0JDLE1BQWpDLEVBQTBDO01BQ3pDO01BQ0FQLENBQUMsQ0FBRUksRUFBRixDQUFELENBQVFJLE1BQVI7TUFDQVIsQ0FBQyxDQUFFLDBDQUEyQ0csS0FBSyxHQUFHRixlQUFuRCxJQUF1RSxHQUF6RSxDQUFELENBQWdGTyxNQUFoRjtNQUNBUCxlQUFlO0lBQ2Y7RUFDRCxDQVBEO0FBUUEsQ0FYRDtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGltbW9uZXgva2lja3N0YXJ0Ly4vc3JjL3NraW5zL2RlZmF1bHQvc2Nzcy9pbmRleC5zY3NzPzY5MzkiLCJ3ZWJwYWNrOi8vQGltbW9uZXgva2lja3N0YXJ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BpbW1vbmV4L2tpY2tzdGFydC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BpbW1vbmV4L2tpY2tzdGFydC8uL3NyYy9za2lucy9kZWZhdWx0L2pzL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gKFMpQ1NTXG5pbXBvcnQgJy4uLy4uL3Njc3MvaW5kZXguc2Nzcyc7XG5cbmpRdWVyeSggZG9jdW1lbnQgKS5yZWFkeSggZnVuY3Rpb24oICQgKSB7XG5cdGxldCByZW1vdmVkRWxlbWVudHMgPSAwO1xuXG5cdCQoICcjaW54LXNpbmdsZS1wcm9wZXJ0eV9fdGFiLWNvbnRlbnRzID4gbGknICkuZWFjaCggZnVuY3Rpb24oIGluZGV4LCBsaSApIHtcblx0XHRpZiAoIDAgPT09ICQoIGxpICkuaHRtbCgpLnRyaW0oKS5sZW5ndGggKSB7XG5cdFx0XHQvLyBSZW1vdmUgZW1wdHkgdGFicyBhbmQgdGhlaXIgcmVsYXRlZCBuYXZpZ2F0aW9uIGl0ZW1zLlxuXHRcdFx0JCggbGkgKS5yZW1vdmUoKTtcblx0XHRcdCQoICcuaW54LXNpbmdsZS1wcm9wZXJ0eV9fdGFiLW5hdiBsaTplcSgnICsgKCBpbmRleCAtIHJlbW92ZWRFbGVtZW50cyApICsgJyknICkucmVtb3ZlKCk7XG5cdFx0XHRyZW1vdmVkRWxlbWVudHMrKztcblx0XHR9XG5cdH0pXG59KVxuXG4vKiBjb25zdCBjb21wbyA9IGlueF9zdGF0ZS52dWUuY29tcG9uZW50KCdhc3luYy1leGFtcGxlJywge1xuXHRuYW1lOiAnYXN5bmMtZXhhbXBsZScsXG5cdGRhdGE6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y291bnQ6IDBcblx0XHR9XG5cdH0sXG5cdHRlbXBsYXRlOiAnPGRpdj5IZWxsbyBXb3JsZCEge3sgdGhpcy5pbnhTdGF0ZS55byB9fTwvZGl2Pidcbn0pICovXG4iXSwibmFtZXMiOlsialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSIsIiQiLCJyZW1vdmVkRWxlbWVudHMiLCJlYWNoIiwiaW5kZXgiLCJsaSIsImh0bWwiLCJ0cmltIiwibGVuZ3RoIiwicmVtb3ZlIl0sInNvdXJjZVJvb3QiOiIifQ==