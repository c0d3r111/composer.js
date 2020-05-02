window._COMPOSER = Object.freeze({
  add    : function(nodes) {
    const fragment = document.createDocumentFragment();
    
    if (!Array.isArray(nodes)) nodes = [nodes];

    for (let node of nodes) {
      if (node) {
        if (Array.isArray(node)) {
          void this.add(node);
        }
        else {
          // void this.element.appendChild(node.element);
          void fragment.appendChild(node.element);
        }
      }
    }

    void this.element.appendChild(fragment);
    
    return this;
  },
  append : function(text) {
    if (Array.isArray(text)) {
      const current = this.element.innerText;
  
      this.element.innerText = current + (text.join(''));
    }
    else {
      const current = this.element.innerText;
    
      this.element.innerText = current + text;
    }
    
    return this;
  },
  after  : function(method) {
    if (typeof method === 'function') void method();
    
    return this;
  },
  attr   : function(attributes) {
    for (let attr of Object.keys(attributes)) {
      if (!attr) continue;
      if (!attributes[attr]) {
        void this.element.removeAttribute(attr);
      }
      
      void this.element.setAttribute(attr, attributes[attr]);
    }
    
    return this;
  },
  clear  : function() {
    while (this.element.firstChild) {
      void this.element.removeChild(this.element.firstChild);
    }

    return this;
  },
  click  : function(method) {
    if (method) void this.element.addEventListener('click', method);
    
    return this;
  },
  danger : function(data) {
    if (data) this.element.innerHTML = data;
    
    return this;
  },
  export : function() {
    return this.node.bind(this);
  },
  event  : function(name, method) {
    void window.addEventListener(name, method);
    
    return this;
  },
  hide   : function(event) {
    if (!event) this.element.style.display = 'none';

    return this;
  },
  id     : function(id) {
    if (id) this.element.id = id;
    
    return this;
  },
  link   : function(url) {
    this.element.href = url || 'javascript:void(0)';
    
    return this;
  },
  names  : function(names) {
    if (names) {
      for (let name of names.split(' ')) {
        if (name) {
          this.element.classList.add(name);
        }
      }
    }
    
    return this;
  },
  node   : function(type) {
    const node = Object.create(this);
    
    if (typeof type === 'object') {
      node.element = type;
    }
    else {
      node.element = document.createElement(type || 'div');
    }
        
    return node;
  },
  on     : function(event, method) {
    if (method) this.element["on" + event] = method;
    
    return this;
  },
  play   : function() {
    this.element.style.animationPlayState = 'running';
    this.element.style.animationDuration  = '2s';

    return this;
  },
  pause  : function() {
    this.element.style.animationPlayState = 'paused';
    this.element.style.animationDuration  = '0s';

    return this;
  },
  save   : function() {
    return function() { return this; }.bind(this);
  },
  show   : function(flex, inline) {
    this.element.style.display = flex ? 'flex' : inline ? 'inline-block' : 'block';

    return this;
  },
  size   : function(size, units) {
    if (size) this.element.style.fontSize = size + (units || 'px');
    
    return this;
  },
  src    : function(location) {
    if (location) this.element.src = location;
    
    return this;
  },
  style  : function(style) {
    for (let property of Object.keys(style)) {
      if (property) this.element.style[property] = style[property];
    }
    
    return this;
  },
  string : function() {
    return `<${this.element.tagName.toLowerCase()}>${this.element.innerHTML}</${this.element.tagName.toLowerCase()}>`;
  },
  text   : function(text) {
    if (text || text === '0' || text === 0) {
      this.element.innerText = text;
    }
    
    return this;
  },
  toggle : function(name) {
    if (name) {
      this.element.classList.toggle(name);
    }

    return this;
  }, 
  value  : function(value) {
     if (value || value === '0' || value === 0) {
			 this.element.value = value;
		 }
    
    return this;
  },
});