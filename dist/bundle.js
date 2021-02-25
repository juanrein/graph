/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Controller\": () => (/* binding */ Controller)\n/* harmony export */ });\nvar Controller = /** @class */ (function () {\r\n    function Controller(graph, view) {\r\n        this.view = view;\r\n        this.graph = graph;\r\n    }\r\n    Controller.prototype.handleClick = function (e) {\r\n        var x = e.clientX;\r\n        var y = e.clientY;\r\n        var clicked = this.graph.find(x, y);\r\n        if (!this.graph.intersectsAny(x, y, 50)) {\r\n            this.graph.addNode(x, y, 50, \"aa\");\r\n            this.view.drawNode(x, y, 50, \"aa\");\r\n        }\r\n        else if (this.selected) {\r\n            if (clicked != null && !clicked.equals(this.selected)) {\r\n                this.graph.connect(this.selected, clicked, false);\r\n                var line = this.graph.getLineBetween(this.selected, clicked);\r\n                var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;\r\n                this.view.drawConnection(x1, y1, x2, y2);\r\n            }\r\n        }\r\n        this.selected = clicked;\r\n    };\r\n    return Controller;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/controller.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ \"./src/controller.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/model.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/view.ts\");\n\r\n\r\n\r\n/**\r\n * npx webpack\r\n * npm run build\r\n */\r\nwindow.onload = function () {\r\n    var canvas = document.getElementById(\"canvas\");\r\n    canvas.height = window.innerHeight;\r\n    canvas.width = window.innerWidth;\r\n    var ctx = canvas.getContext(\"2d\");\r\n    ctx.font = \"30px Arial\";\r\n    var graph = new _model__WEBPACK_IMPORTED_MODULE_1__.Graph();\r\n    var view = new _view__WEBPACK_IMPORTED_MODULE_2__.View(canvas, ctx);\r\n    var controller = new _controller__WEBPACK_IMPORTED_MODULE_0__.Controller(graph, view);\r\n    canvas.addEventListener(\"click\", function (e) { return controller.handleClick(e); });\r\n};\r\n\n\n//# sourceURL=webpack://js/./src/index.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GraphNode\": () => (/* binding */ GraphNode),\n/* harmony export */   \"Graph\": () => (/* binding */ Graph)\n/* harmony export */ });\nvar GraphNode = /** @class */ (function () {\r\n    function GraphNode(x, y, radius, value) {\r\n        this.value = value;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.radius = radius;\r\n        this.id = GraphNode.identifier;\r\n        GraphNode.identifier++;\r\n    }\r\n    GraphNode.prototype.equals = function (other) {\r\n        return this.id == other.id;\r\n    };\r\n    GraphNode.prototype.contains = function (x, y) {\r\n        return ((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.radius * this.radius);\r\n    };\r\n    /**\r\n     * check if circles touch\r\n     */\r\n    GraphNode.prototype.intersects = function (x, y, radius) {\r\n        var distance = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));\r\n        return distance <= this.radius + radius;\r\n    };\r\n    return GraphNode;\r\n}());\r\n\r\nvar Graph = /** @class */ (function () {\r\n    function Graph() {\r\n        this.nodes = [];\r\n        this.connections = [];\r\n    }\r\n    Graph.prototype.addNode = function (x, y, radius, value) {\r\n        this.nodes.push(new GraphNode(x, y, radius, value));\r\n    };\r\n    Graph.prototype.find = function (x, y) {\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if (node.contains(x, y)) {\r\n                return node;\r\n            }\r\n        }\r\n    };\r\n    Graph.prototype.intersectsAny = function (x, y, radius) {\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if (node.intersects(x, y, radius)) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    Graph.prototype.connect = function (a, b, directed) {\r\n        var ai = this.nodes.findIndex(function (v, i, o) { return a.equals(v); });\r\n        var bi = this.nodes.findIndex(function (v, i, o) { return b.equals(v); });\r\n        if (ai == -1 || bi == -1) {\r\n            return;\r\n        }\r\n        this.connections[ai].push(bi);\r\n        if (!directed) {\r\n            this.connections[bi].push(ai);\r\n        }\r\n    };\r\n    Graph.prototype.getLineBetween = function (a, b) {\r\n        return {\r\n            x1: a.x,\r\n            y1: a.y,\r\n            x2: b.x,\r\n            y2: b.y\r\n        };\r\n    };\r\n    return Graph;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/model.ts?");

/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"View\": () => (/* binding */ View)\n/* harmony export */ });\nvar View = /** @class */ (function () {\r\n    function View(canvas, ctx) {\r\n        this.canvas = canvas;\r\n        this.ctx = ctx;\r\n    }\r\n    View.prototype.getMousePos = function (x, y) {\r\n        var rect = this.canvas.getBoundingClientRect();\r\n        return {\r\n            \"x\": x - rect.left,\r\n            \"y\": y - rect.top\r\n        };\r\n    };\r\n    View.prototype.drawNode = function (x1, y1, radius, value) {\r\n        var pos = this.getMousePos(x1, y1);\r\n        console.log(pos);\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);\r\n        this.ctx.stroke();\r\n        this.ctx.fillText(value, pos.x, pos.y);\r\n    };\r\n    View.prototype.drawConnection = function (x1, y1, x2, y2) {\r\n        this.ctx.beginPath();\r\n        this.ctx.moveTo(x1, y2);\r\n        this.ctx.lineTo(x2, y2);\r\n        this.ctx.stroke();\r\n    };\r\n    return View;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/view.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;