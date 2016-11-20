const DOMNodeCollection = require('./dom_node_collection.js');

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
  if (arg === window){
    return new DOMNodeCollection(
      [window]
    );
  }

  switch(typeof(arg)){
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      if (arg[0] === "<") {
        const tag = arg.slice(1, -1);
        return new DOMNodeCollection([document.createElement(tag)]);
      } else {
        return getNodesFromDom(arg);
      }
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

module.exports = $cinnaDOM;
