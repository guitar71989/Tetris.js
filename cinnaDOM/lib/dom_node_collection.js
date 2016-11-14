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
      return (this.array.length === 0) ? "false" :
      this.array[0].getAttribute(arguments[0]);
    }
  }

  addClass(){
    this.each(
      (el) => el.classList.add(...arguments)
    );
    return this;
  }

  removeClass(){
    this.each(
      (el) => el.classList.remove(...arguments)
    );
    return this;
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

  hide(){
    this.each( (el) => {
      el.style.display = "none";
    });
  }

  show(){
    this.each( (el) => {
      el.style.display = "block";
    });
  }
}


module.exports = DOMNodeCollection;
