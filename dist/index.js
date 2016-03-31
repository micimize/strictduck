require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "2e8a2efff5ed13f83532"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(Object.defineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(Object.defineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	
		function checkForUpdate(fromUpdate) {
			if(module.hot.status() === "idle") {
				module.hot.check(true, function(err, updatedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update.");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
					if(!updatedModules) {
						if(fromUpdate) console.log("[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				});
			}
		}
		setInterval(checkForUpdate, hotPollInterval);
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.utils = exports.typedMap = exports.implementable = exports.implement = exports.Composit = exports.provides = exports.depends = exports.resolve = exports.default = undefined;
	
	var _strictduck = __webpack_require__(4);
	
	Object.keys(_strictduck).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _strictduck[key];
	    }
	  });
	});
	
	var _strictduck2 = _interopRequireDefault(_strictduck);
	
	var _resolve2 = __webpack_require__(9);
	
	var _resolve = _interopRequireWildcard(_resolve2);
	
	var _depends2 = __webpack_require__(10);
	
	var _depends3 = _interopRequireDefault(_depends2);
	
	var _provides2 = __webpack_require__(11);
	
	var _provides3 = _interopRequireDefault(_provides2);
	
	var _compose = __webpack_require__(14);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _implement2 = __webpack_require__(13);
	
	var _implement3 = _interopRequireDefault(_implement2);
	
	var _implementable2 = __webpack_require__(15);
	
	var _implementable3 = _interopRequireDefault(_implementable2);
	
	var _typedMap2 = __webpack_require__(16);
	
	var _typedMap3 = _interopRequireDefault(_typedMap2);
	
	var _utils2 = __webpack_require__(7);
	
	var _utils = _interopRequireWildcard(_utils2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _strictduck2.default;
	exports.resolve = _resolve;
	exports.depends = _depends3.default;
	exports.provides = _provides3.default;
	exports.Composit = _compose2.default;
	exports.implement = _implement3.default;
	exports.implementable = _implementable3.default;
	exports.typedMap = _typedMap3.default;
	exports.utils = _utils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Main = undefined;
	exports.shouldImplement = shouldImplement;
	exports.extend = extend;
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	var _duckface = __webpack_require__(6);
	
	var _duckface2 = _interopRequireDefault(_duckface);
	
	var _utils = __webpack_require__(7);
	
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
	
	    var hack = typeof instance == 'function' ? function () {} : new Object();
	    Object.setPrototypeOf(hack, Object.getPrototypeOf(this));
	    _utils.completeAssignToThis.bind(hack)(instance);
	
	    for (var _len = arguments.length, interfaces = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        interfaces[_key - 1] = arguments[_key];
	    }
	
	    interfaces.forEach(function (i) {
	        return typeof i == 'function' ? i(hack) : shouldImplement(i)(hack);
	    });
	    return (0, _utils.nameObj)({
	        name: firstToLowerCase(Object.getPrototypeOf(this).constructor.name),
	        object: hack
	    });
	};
	
	exports.default = StrictDuck;
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("get-prototype-chain");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("Duckface/src/duckface");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.completeAssignToThis = completeAssignToThis;
	exports.nameObj = nameObj;
	exports.nameClass = nameClass;
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	var _protoExtend = __webpack_require__(8);
	
	var _protoExtend2 = _interopRequireDefault(_protoExtend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	function nameObj(_ref) {
	    var name = _ref.name;
	    var object = _ref.object;
	
	    var dict = {};
	    dict[name] = object;
	    Object.defineProperty(dict[name], 'name', {
	        configurable: true, value: name
	    });
	    return dict[name];
	}
	
	function nameClass(_ref2) {
	    var name = _ref2.name;
	    var Class = _ref2.Class;
	
	    return nameObj({ name: name, object: Class });
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("proto-extend");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.satisfies = satisfies;
	exports.findSatisfier = findSatisfier;
	exports.default = resolve;
	exports.objectContainsOnly = objectContainsOnly;
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function satisfies(_ref) {
	    var provider = _ref.provider;
	    var dependency = _ref.dependency;
	
	    return (0, _getPrototypeChain2.default)(provider).filter(function (p) {
	        return p == dependency || p instanceof dependency || p.constructor.name == dependency;
	    }).length > 0;
	}
	
	function findSatisfier(_ref2) {
	    var container = _ref2.container;
	    var dependency = _ref2.dependency;
	
	    var satisfierArr = Object.keys(container.providers).filter(function (key) {
	        return satisfies({ provider: container.providers[key], dependency: dependency });
	    });
	    var satisfier = satisfierArr.length && satisfierArr[0];
	    return satisfier ? container[satisfier] : Error(dependency.name + ' is unsatsified!');
	}
	
	function resolve(_ref3) {
	    var container = _ref3.container;
	    var dependencies = _ref3.dependencies;
	
	    return dependencies.reduce(function (resolved, dependency) {
	        resolved[dependency.name || dependency.constructor.name] = findSatisfier({
	            container: container,
	            dependency: dependency
	        });
	        return resolved;
	    }, {});
	}
	
	function objectContainsOnly(_ref4) {
	    var strictduck = _ref4.strictduck;
	    var object = _ref4.object;
	
	    return Object.keys(object).filter(function (k) {
	        return !satisfies({ provider: object[k], dependency: strictduck });
	    }).length == 0;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = depends;
	
	var _resolve = __webpack_require__(9);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	var _strictduck = __webpack_require__(4);
	
	var _strictduck2 = _interopRequireDefault(_strictduck);
	
	var _utils = __webpack_require__(7);
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function depends(_ref) {
	    var name = _ref.name;
	    var _ref$parent = _ref.parent;
	    var parent = _ref$parent === undefined ? _strictduck2.default : _ref$parent;
	    var _ref$dependencies = _ref.dependencies;
	    var dependencies = _ref$dependencies === undefined ? [] : _ref$dependencies;
	    var _ref$constructor = _ref.constructor;
	    var c = _ref$constructor === undefined ? function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return args;
	    } : _ref$constructor;
	
	    return (0, _utils.nameClass)({
	        name: name || parent.name,
	        Class: function (_parent) {
	            _inherits(Class, _parent);
	
	            function Class(_ref2) {
	                var _Object$getPrototypeO;
	
	                var container = _ref2.container;
	
	                var rest = _objectWithoutProperties(_ref2, ['container']);
	
	                _classCallCheck(this, Class);
	
	                return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Class)).call.apply(_Object$getPrototypeO, [this].concat(_toConsumableArray(c(_extends({}, (0, _resolve2.default)({ container: container, dependencies: dependencies }), rest))))));
	            }
	
	            return Class;
	        }(parent)
	    });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Provider = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = provides;
	
	var _bottlejs = __webpack_require__(12);
	
	var _bottlejs2 = _interopRequireDefault(_bottlejs);
	
	var _strictduck = __webpack_require__(4);
	
	var _strictduck2 = _interopRequireDefault(_strictduck);
	
	var _implement = __webpack_require__(13);
	
	var _implement2 = _interopRequireDefault(_implement);
	
	var _resolve = __webpack_require__(9);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	var _utils = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Provider = exports.Provider = (0, _strictduck.extend)({ name: 'Provider', methods: ['provide'] });
	
	function provides(_ref) {
	    var name = _ref.name;
	    var provider = _ref.provider;
	    var _ref$parent = _ref.parent;
	    var parent = _ref$parent === undefined ? _strictduck2.default : _ref$parent;
	    var _ref$dependencies = _ref.dependencies;
	    var dependencies = _ref$dependencies === undefined ? [] : _ref$dependencies;
	
	    return (0, _utils.nameClass)({
	        name: name || parent.name,
	        Class: function (_parent) {
	            _inherits(Class, _parent);
	
	            function Class() {
	                var _Object$getPrototypeO;
	
	                _classCallCheck(this, Class);
	
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }
	
	                var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Class)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
	                _this.provide = function provide() {
	                    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { container: {} } : arguments[0];
	
	                    var container = _ref2.container;
	
	                    var kwargs = _objectWithoutProperties(_ref2, ['container']);
	
	                    for (var _len2 = arguments.length, pargs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                        pargs[_key2 - 1] = arguments[_key2];
	                    }
	
	                    return provider.bind(this).apply(undefined, [_extends({}, (0, _resolve2.default)({ container: container, dependencies: dependencies }), kwargs)].concat(pargs));
	                }.bind(_this);
	                return _this;
	            }
	
	            return Class;
	        }(parent)
	    });
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("bottlejs");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = implement;
	
	var _strictduck2 = __webpack_require__(4);
	
	var _strictduck3 = _interopRequireDefault(_strictduck2);
	
	var _utils = __webpack_require__(7);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	var _bottlejs = __webpack_require__(12);
	
	var _bottlejs2 = _interopRequireDefault(_bottlejs);
	
	var _depends = __webpack_require__(10);
	
	var _depends2 = _interopRequireDefault(_depends);
	
	var _resolve = __webpack_require__(9);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	var _implement = __webpack_require__(13);
	
	var _implement2 = _interopRequireDefault(_implement);
	
	var _strictduck = __webpack_require__(4);
	
	var _strictduck2 = _interopRequireDefault(_strictduck);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function materializer(service) {
	    return function (container) {
	        return new service({ container: container });
	    };
	}
	
	var Composit = function (_StrictDuck) {
	    _inherits(Composit, _StrictDuck);
	
	    function Composit(_ref) {
	        var _ref$main = _ref.main;
	        var _ref$main$Class = _ref$main.Class;
	        var mainClass = _ref$main$Class === undefined ? _strictduck.Main : _ref$main$Class;
	        var _ref$main$method = _ref$main.method;
	        var mainMethod = _ref$main$method === undefined ? 'main' : _ref$main$method;
	
	        _classCallCheck(this, Composit);
	
	        var providerMap = {};
	
	        for (var _len = arguments.length, services = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            services[_key - 1] = arguments[_key];
	        }
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Composit).call(this, services.reduce(function (context, _ref2) {
	            var dependency = _ref2.dependency;
	            var provider = _ref2.provider;
	
	            var name = provider.name || provider.constructor.name;
	            providerMap[name] = provider;
	            if (provider instanceof dependency) {
	                context.value(name, provider);
	            } else {
	                context.factory(name, materializer(provider));
	            }
	            return context;
	        }, new _bottlejs2.default())));
	
	        _this.value('providers', providerMap);
	        var mainSatisfier = (0, _resolve.findSatisfier)({ container: _this.container, dependency: mainClass });
	        _this.main = function (kwargs) {
	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }
	
	            return mainSatisfier[mainMethod].apply(mainSatisfier, [_extends({ container: _this.container }, kwargs)].concat(args));
	        };
	        return _this;
	    }
	
	    return Composit;
	}(_strictduck2.default);
	
	exports.default = (0, _implement2.default)({ strictduck: _strictduck.Main, withClass: Composit });

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = typedMap;
	
	var _strictduck = __webpack_require__(4);
	
	var _resolve = __webpack_require__(9);
	
	var _utils = __webpack_require__(7);
	
	var _getPrototypeChain = __webpack_require__(5);
	
	var _getPrototypeChain2 = _interopRequireDefault(_getPrototypeChain);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function typedMap(_ref) {
	    var name = _ref.name;
	    var _ref$strictduck = _ref.strictduck;
	    var strictduck = _ref$strictduck === undefined ? StrictDuck : _ref$strictduck;
	
	    return (0, _utils.nameClass)({
	        name: name || strictduck.name + 'Map',
	        Class: function (_extend) {
	            _inherits(Class, _extend);
	
	            function Class(object) {
	                _classCallCheck(this, Class);
	
	                (0, _resolve.objectContainsOnly)({ strictduck: strictduck, object: object });
	                return _possibleConstructorReturn(this, Object.getPrototypeOf(Class).call(this, object));
	            }
	
	            return Class;
	        }((0, _strictduck.extend)({ name: 'Map' }))
	    });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map