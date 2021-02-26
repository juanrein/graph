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

/***/ "./src/canvascontroller.ts":
/*!*********************************!*\
  !*** ./src/canvascontroller.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CanvasController\": () => (/* binding */ CanvasController)\n/* harmony export */ });\nvar CanvasController = /** @class */ (function () {\r\n    function CanvasController(graph, view, valueController) {\r\n        this.view = view;\r\n        this.graph = graph;\r\n        this.valueController = valueController;\r\n    }\r\n    CanvasController.prototype.handleMouseDown = function (e) {\r\n        var x = e.offsetX;\r\n        var y = e.offsetY;\r\n        this.mouseDownPoint = {\r\n            x: x,\r\n            y: y\r\n        };\r\n    };\r\n    CanvasController.prototype.handleMouseUp = function (e) {\r\n        var x = e.offsetX;\r\n        var y = e.offsetY;\r\n        var radius = this.valueController.values.radius;\r\n        var circle = {\r\n            point: {\r\n                x: x,\r\n                y: y\r\n            },\r\n            radius: radius\r\n        };\r\n        var startPointNode = this.graph.find(this.mouseDownPoint);\r\n        var endPointNode = this.graph.find(circle.point);\r\n        //create new node when startpoint and endpoint are not nodes\r\n        if (!startPointNode && !endPointNode) {\r\n            if (this.valueController.values.nodeValue === \"<autoincrement>\") {\r\n                this.graph.addNode(circle, null);\r\n            }\r\n            else {\r\n                this.graph.addNode(circle, this.valueController.values.nodeValue);\r\n            }\r\n        }\r\n        else if (startPointNode && endPointNode) {\r\n            //create connection when startpoint and endpoint are both nodes and are not the same node\r\n            if (!startPointNode.equals(endPointNode)) {\r\n                this.graph.connect(startPointNode, endPointNode);\r\n            }\r\n        }\r\n        this.view.update();\r\n    };\r\n    return CanvasController;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/canvascontroller.ts?");

/***/ }),

/***/ "./src/exportViewController.ts":
/*!*************************************!*\
  !*** ./src/exportViewController.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ExportViewController\": () => (/* binding */ ExportViewController)\n/* harmony export */ });\nvar ExportViewController = /** @class */ (function () {\r\n    function ExportViewController(graph) {\r\n        this.graph = graph;\r\n    }\r\n    ExportViewController.prototype.handleExport = function (e) {\r\n        var content = JSON.stringify(this.graph, null, 4);\r\n        navigator.clipboard.writeText(content);\r\n    };\r\n    return ExportViewController;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/exportViewController.ts?");

/***/ }),

/***/ "./src/geometry.ts":
/*!*************************!*\
  !*** ./src/geometry.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"contains\": () => (/* binding */ contains),\n/* harmony export */   \"intersects\": () => (/* binding */ intersects),\n/* harmony export */   \"getLineBetween\": () => (/* binding */ getLineBetween)\n/* harmony export */ });\nfunction contains(circle, point) {\r\n    var _a = circle.point, x = _a.x, y = _a.y, radius = circle.radius;\r\n    var x2 = point.x, y2 = point.y;\r\n    return ((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) <= radius * radius);\r\n}\r\n/**\r\n * check if circles touch\r\n */\r\nfunction intersects(circleA, circleB) {\r\n    var r1 = circleA.radius, _a = circleA.point, x1 = _a.x, y1 = _a.y;\r\n    var r2 = circleB.radius, _b = circleB.point, x2 = _b.x, y2 = _b.y;\r\n    var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));\r\n    return distance <= r1 + r2;\r\n}\r\n/**\r\n * Direct line between centers of circles excluding parts that are inside circles\r\n */\r\nfunction getLineBetween(circle1, circle2) {\r\n    var x1 = circle1.point.x;\r\n    var y1 = circle1.point.y;\r\n    var x2 = circle2.point.x;\r\n    var y2 = circle2.point.y;\r\n    var radius1 = circle1.radius;\r\n    var radius2 = circle2.radius;\r\n    var dx1 = x2 - x1;\r\n    var dy1 = y2 - y1;\r\n    var dx2 = x1 - x2;\r\n    var dy2 = y1 - y2;\r\n    var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);\r\n    var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);\r\n    var dx1n = dx1 / len1;\r\n    var dy1n = dy1 / len1;\r\n    var dx2n = dx2 / len2;\r\n    var dy2n = dy2 / len2;\r\n    return {\r\n        x1: x1 + dx1n * radius1,\r\n        y1: y1 + dy1n * radius1,\r\n        x2: x2 + dx2n * radius2,\r\n        y2: y2 + dy2n * radius2\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://js/./src/geometry.ts?");

/***/ }),

/***/ "./src/graph.ts":
/*!**********************!*\
  !*** ./src/graph.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GraphNode\": () => (/* binding */ GraphNode),\n/* harmony export */   \"Graph\": () => (/* binding */ Graph)\n/* harmony export */ });\n/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ \"./src/geometry.ts\");\n\r\nvar GraphNode = /** @class */ (function () {\r\n    function GraphNode(circle, value) {\r\n        this.circle = circle;\r\n        this.id = GraphNode.identifier;\r\n        GraphNode.identifier++;\r\n        if (value == null) {\r\n            this.value = this.id.toString();\r\n        }\r\n        else {\r\n            this.value = value;\r\n        }\r\n    }\r\n    GraphNode.prototype.equals = function (other) {\r\n        return this.id == other.id;\r\n    };\r\n    GraphNode.identifier = 0;\r\n    return GraphNode;\r\n}());\r\n\r\nvar Graph = /** @class */ (function () {\r\n    function Graph(directed) {\r\n        this.nodes = [];\r\n        this.connections = [];\r\n        this.directed = directed;\r\n    }\r\n    Graph.prototype.addNode = function (circle, value) {\r\n        var node = new GraphNode(circle, value);\r\n        this.nodes.push(node);\r\n        this.connections.push([]);\r\n        return node;\r\n    };\r\n    Graph.prototype.find = function (point) {\r\n        if (!point) {\r\n            return undefined;\r\n        }\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if ((0,_geometry__WEBPACK_IMPORTED_MODULE_0__.contains)(node.circle, point)) {\r\n                return node;\r\n            }\r\n        }\r\n    };\r\n    Graph.prototype.intersectsAny = function (circle) {\r\n        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {\r\n            var node = _a[_i];\r\n            if ((0,_geometry__WEBPACK_IMPORTED_MODULE_0__.intersects)(node.circle, circle)) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    };\r\n    Graph.prototype.connect = function (a, b) {\r\n        console.log(a, b);\r\n        var ai = this.nodes.findIndex(function (v) { return a.equals(v); });\r\n        var bi = this.nodes.findIndex(function (v) { return b.equals(v); });\r\n        if (ai == -1 || bi == -1) {\r\n            throw new Error(\"Both nodes don't exist \" + a + \" \" + b);\r\n        }\r\n        if (!this.connections[ai].includes(bi)) {\r\n            this.connections[ai].push(bi);\r\n            if (!this.directed && !this.connections[bi].includes(ai)) {\r\n                this.connections[bi].push(ai);\r\n            }\r\n        }\r\n    };\r\n    Graph.prototype.getConnectionsAsLines = function () {\r\n        var lines = [];\r\n        for (var i = 0; i < this.connections.length; i++) {\r\n            var circle = this.nodes[i].circle;\r\n            for (var j = 0; j < this.connections[i].length; j++) {\r\n                var neighbor = this.nodes[this.connections[i][j]];\r\n                var line = (0,_geometry__WEBPACK_IMPORTED_MODULE_0__.getLineBetween)(circle, neighbor.circle);\r\n                lines.push(line);\r\n            }\r\n        }\r\n        return lines;\r\n    };\r\n    return Graph;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/graph.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvascontroller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvascontroller */ \"./src/canvascontroller.ts\");\n/* harmony import */ var _exportViewController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exportViewController */ \"./src/exportViewController.ts\");\n/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graph */ \"./src/graph.ts\");\n/* harmony import */ var _valueController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./valueController */ \"./src/valueController.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view */ \"./src/view.ts\");\n\r\n\r\n\r\n\r\n\r\n/**\r\n * npx webpack\r\n * npm run build\r\n */\r\nwindow.onload = function () {\r\n    var defaultControlValues = {\r\n        radius: 50,\r\n        nodeValue: \"<autoincrement>\",\r\n    };\r\n    var canvas = document.getElementById(\"canvas\");\r\n    var controls = document.getElementById(\"controls\");\r\n    var controlsHeight = controls.offsetHeight;\r\n    canvas.height = Math.floor(window.innerHeight - controlsHeight);\r\n    canvas.width = Math.floor(window.innerWidth);\r\n    var ctx = canvas.getContext(\"2d\");\r\n    ctx.font = \"30px Arial\";\r\n    ctx.textAlign = \"center\";\r\n    ctx.textBaseline = \"middle\";\r\n    var valCtrlDiv = document.getElementById(\"valueControls\");\r\n    var exportButton = document.getElementById(\"exportButton\");\r\n    var graph = new _graph__WEBPACK_IMPORTED_MODULE_2__.Graph(false);\r\n    var view = new _view__WEBPACK_IMPORTED_MODULE_4__.View(canvas, ctx, graph);\r\n    var valueController = new _valueController__WEBPACK_IMPORTED_MODULE_3__.ValueController(valCtrlDiv, defaultControlValues);\r\n    var exportController = new _exportViewController__WEBPACK_IMPORTED_MODULE_1__.ExportViewController(graph);\r\n    var canvasController = new _canvascontroller__WEBPACK_IMPORTED_MODULE_0__.CanvasController(graph, view, valueController);\r\n    exportButton.addEventListener(\"click\", function (e) { return exportController.handleExport(e); });\r\n    canvas.addEventListener(\"mousedown\", function (e) { return canvasController.handleMouseDown(e); });\r\n    canvas.addEventListener(\"mouseup\", function (e) { return canvasController.handleMouseUp(e); });\r\n};\r\n\n\n//# sourceURL=webpack://js/./src/index.ts?");

/***/ }),

/***/ "./src/valueController.ts":
/*!********************************!*\
  !*** ./src/valueController.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ValueController\": () => (/* binding */ ValueController)\n/* harmony export */ });\nvar ValueController = /** @class */ (function () {\r\n    function ValueController(root, defaults) {\r\n        var _this = this;\r\n        var _a;\r\n        this.defaults = defaults;\r\n        this.values = Object.assign({}, defaults);\r\n        var _loop_1 = function (k) {\r\n            var div = document.createElement(\"div\");\r\n            var label = document.createElement(\"label\");\r\n            label.setAttribute(\"for\", k);\r\n            label.textContent = k;\r\n            var input = document.createElement(\"input\");\r\n            if (k in this_1.defaults) {\r\n                input.value = ((_a = this_1.defaults[k]) === null || _a === void 0 ? void 0 : _a.toString()) || \"\";\r\n            }\r\n            input.setAttribute(\"id\", k);\r\n            input.addEventListener(\"change\", function (e) {\r\n                _this.handleInputValueChange(input);\r\n            });\r\n            div.appendChild(label);\r\n            div.appendChild(input);\r\n            root.appendChild(div);\r\n        };\r\n        var this_1 = this;\r\n        for (var k in this.defaults) {\r\n            _loop_1(k);\r\n        }\r\n    }\r\n    ValueController.prototype.handleInputValueChange = function (input) {\r\n        var id = input.id;\r\n        var value = input.value;\r\n        if (typeof this.values[id] === \"number\") {\r\n            var asInteger = parseInt(value);\r\n            if (!isNaN(asInteger)) {\r\n                this.values[id] = asInteger;\r\n            }\r\n        }\r\n        else {\r\n            this.values[id] = value;\r\n        }\r\n    };\r\n    return ValueController;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://js/./src/valueController.ts?");

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