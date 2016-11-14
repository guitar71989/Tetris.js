/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$cinnaDOM = $cinnaDOM;

	const _docReadyCallbacks = [];
	let _docReady = false;

	document.addEventListener("DOMContentLoaded", function(event) {
	  _docReady = true;
	  _docReadyCallbacks.forEach( (callback) => callback() );
	});



	const registerDocReadyCallback = (func) => {
	  _docReady ? func() : _docReadyCallbacks.push(func);
	};

	const $cinnaDOM  = function(arg){
	  switch(typeof(arg)){
	    case "function":
	      return registerDocReadyCallback(arg);
	    case "string":
	      return getNodesFromDom(arg);
	    case "object":
	      return new DOMNodeCollection([arg]);
	  }
	};

	$cinnaDOM.extend = (base, ...otherObjs) => {
	  otherObjs.forEach ( (obj) => {
	    for (let prop in obj) {
	      base[prop] = obj[prop];
	    }
	  });
	  return base;
	};


	$cinnaDOM.ajax = (options) => {
	  const request = new XMLHttpRequest();

	  const ajaxDefaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: 'GET',
	    url: "",
	    succeess: () => {},
	    error: () => {},
	    data: {},
	  };
	  options = $cinnaDOM.extend(ajaxDefaults, options);

	  if (options.methd === "GET"){
	    options.url += "?" + toQueryString(options.data);
	  }

	  request.open(options.method, options.url, true);

	  request.onload = function(e) {
	    if (request.status === 200){
	      options.success(request.response);
	    } else {
	      options.error(request.resposne);
	    }
	  };

	  request.send(JSON.stringify(options.data));
	};

	const toQueryString = function(obj) {
	  let result = "";

	  for (let prop in obj) {
	    if (obj.hasOwnProperty(prop)){
	      result += `${prop}=${obj[prop]}&`;
	    }
	  }
	  return result.substring(0, result.length - 1);
	};



	const getNodesFromDom = (arg) => {
	  let arrayify = [];
	  const allSelectors = document.querySelectorAll(arg);
	  arrayify = arrayify.concat(Array.from(allSelectors));

	  return new DOMNodeCollection(arrayify);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(array) {
	    this.array = array;
	  }


	  each(callback){
	    this.array.forEach( (el) => callback(el) );
	  }

	  html(){
	    if(arguments.length === 1){
	      this.each( (element) => {
	        element.innerHTML = arguments[0];
	      });
	    } else {
	      return this.array[0].innerHTML;
	    }
	  }

	  empty(){
	    this.html("");
	  }

	  append(arg){
	    if (arg instanceof DOMNodeCollection) {
	      for (let i = 0; i < this.array.length; i++){
	        for (let j = 0; j < arg.array.length; j++){
	          this.array[i].innerHTML += arg.array[j].outerHTML;
	        }
	      }
	    } else if (arg instanceof HTMLElement) {
	      for ( let i = 0; i < this.array.length; i++){
	        this.array[i].innerHTML += arg.outerHTML;
	      }
	    } else if (typeof arg === 'string') {
	      for ( let i = 0; i < this.array.length; i++){
	        this.array[i].innerHTML += arg;
	      }
	    }
	  }


	  attr(){
	    if (arguments.length === 2) {
	      this.each(
	        (el) => el.setAttribute(arguments[0], arguments[1])
	    );
	    } else if (arguments.length === 1) {
	      return this.array[0].getAttribute(arguments[0]);
	    }
	  }

	  addClass(){
	    this.each(
	      (el) => el.classList.add(...arguments)
	    );
	  }

	  removeClass(){
	    this.each(
	      (el) => el.classList.remove(...arguments)
	    );
	  }


	  children(){
	    let childNodes = [];
	    this.each ( (el) => {
	      const childNodeList = el.children;
	      childNodes = childNodes.concat(Array.from(childNodeList));
	    });
	    return new DOMNodeCollection(childNodes);
	  }

	  find(selector){
	    let foundNodes = [];
	    this.each ( (el) => {
	      const nodeList = el.querySelectorAll(selector);
	      foundNodes = foundNodes.concat(Array.from(nodeList));
	    });
	  }


	  parent(){
	    const parentNodes = [];
	    this.each ( (el) => parentNodes.push(el.parentNode));
	    return new DOMNodeCollection(parentNodes);
	  }

	  remove(){
	    for ( var i = 0; i < this.array.length; i++){
	      this.array[i].outerHTML = "";
	    }
	  }

	  on(type, callback){
	    this.each( (el) => {
	      el.addEventListener(type, callback);
	    });
	  }

	  off(type, callback){
	    this.each( (el) => {
	      el.removeEventListener(type, callback);
	    });
	  }
	}


	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
