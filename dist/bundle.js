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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Controller\": () => (/* binding */ Controller)\n/* harmony export */ });\nvar Controller = /** @class */ (function () {\r\n    function Controller(graph, view) {\r\n        this.view = view;\r\n        this.graph = graph;\r\n    }\r\n    Controller.prototype.handleMouseDown = function (e) {\r\n        console.log(\"mouse down event\");\r\n        var x = e.offsetX;\r\n        var y = e.offsetY;\r\n        this.mouseDownPoint = {\r\n            x: x,\r\n            y: y\r\n        };\r\n    };\r\n    Controller.prototype.handleMouseUp = function (e) {\r\n        console.log(\"mouse up event\");\r\n        var x = e.offsetX;\r\n        var y = e.offsetY;\r\n        var circle = {\r\n            point: {\r\n                x: x,\r\n                y: y\r\n            },\r\n            radius: 50\r\n        };\r\n        var value = \"aa\";\r\n        var startPointNode = this.graph.find(this.mouseDownPoint);\r\n        var endPointNode = this.graph.find(circle.point);\r\n        //create new node when startpoint and endpoint are not nodes\r\n        if (!startPointNode && !endPointNode) {\r\n            this.graph.addNode(circle, value);\r\n        }\r\n        else if (startPointNode && endPointNode) {\r\n            //create connection when startpoint and endpoint are both nodes and are not the same node\r\n            if (!startPointNode.equals(endPointNode)) {\r\n                this.graph.connect(startPointNode, endPointNode);\r\n            }\r\n        }\r\n        this.view.update();\r\n    };\r\n    return Controller;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/controller.ts?");

/***/ }),

/***/ "./src/geometry.ts":
/*!*************************!*\
  !*** ./src/geometry.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"contains\": () => (/* binding */ contains),\n/* harmony export */   \"intersects\": () => (/* binding */ intersects),\n/* harmony export */   \"getLineBetween\": () => (/* binding */ getLineBetween)\n/* harmony export */ });\nfunction contains(circle, point) {\r\n    var _a = circle.point, x = _a.x, y = _a.y, radius = circle.radius;\r\n    var x2 = point.x, y2 = point.y;\r\n    return ((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) <= radius * radius);\r\n}\r\n/**\r\n * check if circles touch\r\n */\r\nfunction intersects(circleA, circleB) {\r\n    var r1 = circleA.radius, _a = circleA.point, x1 = _a.x, y1 = _a.y;\r\n    var r2 = circleB.radius, _b = circleB.point, x2 = _b.x, y2 = _b.y;\r\n    var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));\r\n    return distance <= r1 + r2;\r\n}\r\nfunction getLineBetween(p1, p2) {\r\n    var x = p1.x, y = p1.y;\r\n    var x2 = p2.x, y2 = p2.y;\r\n    return {\r\n        x1: x,\r\n        y1: y,\r\n        x2: x2,\r\n        y2: y2\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://js/./src/geometry.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ \"./src/controller.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/model.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/view.ts\");\n\r\n\r\n\r\n/**\r\n * npx webpack\r\n * npm run build\r\n */\r\nwindow.onload = function () {\r\n    var canvas = document.getElementById(\"canvas\");\r\n    canvas.height = window.innerHeight;\r\n    canvas.width = window.innerWidth;\r\n    var ctx = canvas.getContext(\"2d\");\r\n    ctx.font = \"30px Arial\";\r\n    var graph = new _model__WEBPACK_IMPORTED_MODULE_1__.Graph(false);\r\n    var view = new _view__WEBPACK_IMPORTED_MODULE_2__.View(canvas, ctx, graph);\r\n    var controller = new _controller__WEBPACK_IMPORTED_MODULE_0__.Controller(graph, view);\r\n    canvas.addEventListener(\"mousedown\", function (e) { return controller.handleMouseDown(e); });\r\n    canvas.addEventListener(\"mouseup\", function (e) { return controller.handleMouseUp(e); });\r\n};\r\n\n\n//# sourceURL=webpack://js/./src/index.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GraphNode\": () => (/* binding */ GraphNode),\n/* harmony export */   \"Graph\": () => (/* binding */ Graph)\n/* harmony export */ });\n/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ \"./src/geometry.ts\");\n\r\nvar GraphNode = /** @class */ (function () {\r\n    function GraphNode(circle, value) {\r\n        this.circle = circle;\r\n        this.value = value;\r\n        this.id = GraphNode.identifier;\r\n        GraphNode.identifier++;\r\n    }\r\n    GraphNode.prototype.equals = function (other) {\r\n        return this.id == other.id;\r\n    };\r\n    GraphNode.identifier = 0;\r\n    return GraphNode;\r\n}());\r\n\r\nvar Graph = /** @class */ (function () {\r\n    function Graph(directed) {\r\n        this.nodes = [];\r\n        this.connections = [];\r\n        this.directed = directed;\r\n    }\r\n    Graph.prototype.addNode = function (circle, value) {\r\n        var node = new GraphNode(circle, value);\r\n        this.nodes.push(node);\r\n        this.connections.push([]);\r\n        return node;\r\n    };\r\n    Graph.prototype.find = function (point) {\r\n        if (!point) {\r\n            return undefined;\r\n        }\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if ((0,_geometry__WEBPACK_IMPORTED_MODULE_0__.contains)(node.circle, point)) {\r\n                return node;\r\n            }\r\n        }\r\n    };\r\n    Graph.prototype.intersectsAny = function (circle) {\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if ((0,_geometry__WEBPACK_IMPORTED_MODULE_0__.intersects)(node.circle, circle)) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    Graph.prototype.connect = function (a, b) {\r\n        console.log(a, b);\r\n        var ai = this.nodes.findIndex(function (v) { return a.equals(v); });\r\n        var bi = this.nodes.findIndex(function (v) { return b.equals(v); });\r\n        if (ai == -1 || bi == -1) {\r\n            throw new Error(\"Both nodes don't exist \" + a + \" \" + b);\r\n        }\r\n        if (!this.connections[ai].includes(bi)) {\r\n            this.connections[ai].push(bi);\r\n            if (!this.directed && !this.connections[bi].includes(ai)) {\r\n                this.connections[bi].push(ai);\r\n            }\r\n        }\r\n    };\r\n    Graph.prototype.getConnectionsAsLines = function () {\r\n        var lines = [];\r\n        for (var i = 0; i < this.connections.length; i++) {\r\n            var node = this.nodes[i];\r\n            var _a = node.circle.point, x1 = _a.x, y1 = _a.y;\r\n            for (var j = 0; j < this.connections[i].length; j++) {\r\n                var neighbor = this.nodes[this.connections[i][j]];\r\n                var _b = neighbor.circle.point, x2 = _b.x, y2 = _b.y;\r\n                var line = { x1: x1, y1: y1, x2: x2, y2: y2 };\r\n                lines.push(line);\r\n            }\r\n        }\r\n        return lines;\r\n    };\r\n    return Graph;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/model.ts?");

/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"View\": () => (/* binding */ View)\n/* harmony export */ });\nvar View = /** @class */ (function () {\r\n    function View(canvas, ctx, graph) {\r\n        this.canvas = canvas;\r\n        this.ctx = ctx;\r\n        this.graph = graph;\r\n    }\r\n    View.prototype.update = function () {\r\n        var _this = this;\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.graph.nodes.forEach(function (n) { return _this.drawNode(n); });\r\n        this.graph.getConnectionsAsLines().forEach(function (line) { return _this.drawLine(line); });\r\n    };\r\n    View.prototype.drawNode = function (_a) {\r\n        var circle = _a.circle, value = _a.value;\r\n        var _b = circle.point, x = _b.x, y = _b.y, radius = circle.radius;\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);\r\n        this.ctx.stroke();\r\n        this.ctx.fillText(value, x, y);\r\n    };\r\n    View.prototype.drawLine = function (line) {\r\n        var x1 = line.x1, y1 = line.y1, x2 = line.x2, y2 = line.y2;\r\n        this.ctx.beginPath();\r\n        this.ctx.moveTo(x1, y1);\r\n        this.ctx.lineTo(x2, y2);\r\n        this.ctx.stroke();\r\n    };\r\n    return View;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/view.ts?");

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