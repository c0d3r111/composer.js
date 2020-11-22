/**
 *
 * composer.js - https://github.com/c0d3r111/composer.js
 * Released under the MIT license
 *
**/

!function() {
  window.composer   = window.composer || Object.create(null);  
  window.create     = window.create   || Object.create(null);
  
  create.node       = function()                      {
    if (!this.tag) return;
    
    const obj    = Object.create(composer);
    
    obj.element  = document.createElement(this.tag);
    obj.data     = Object.create(null);
  
    return obj;
  };
  create.raw        = function(subject)               {
    const node = Object.create(composer);
    
    if (!subject) {
      return create.div;
    }
    
    if (typeof subject === 'string') {
      if (subject[0] === '<') {
        const temp     = document.createElement('div');
        
        temp.innerHTML = subject;
        node.element   = temp.firstChild || document.createElement('div');
      }
      else {
        node.element = document.createElement('div');
      }
    }
    else {
      node.element = subject instanceof HTMLElement
        || subject instanceof SVGElement
        ?  subject
        :  document.createElement('div');
    }
    
    return node;
  };
  create.cssmedia   = function(sheet, obj, name, id)  {
    void sheet.push(name + '{');
    
    for (let prop of Object.keys(obj)) {
      void create.cssrule(sheet, obj[prop], prop, id)
    }
    
    void sheet.push('}');
  };
  create.cssrule    = function(sheet, obj, prop, id)  {
    void sheet.push(prop.split(',').map(item => id + ' ' + item).join(',') + '{');
    
    const reg = /_/g;
      
    for (let prop of Object.keys(obj)) {
      void sheet.push(prop.replace(reg, '-') + ':' + obj[prop] + ';');
    }
      
    void sheet.push('}');
  };
  create.csssheet   = function(style, id)             {
    if (!style || typeof style !== 'object') {
      return '';
    }
    
    const sheet = [];
    
    for (let selector of Object.keys(style)) {
      selector[0] === '@'
        ? void create.cssmedia (sheet, style[selector], selector, id)
        : void create.cssrule  (sheet, style[selector], selector, id);
    }
    
    return sheet.join('');
  };
  
  composer.add      = function(nodes)                 {
    if (nodes) {
      if (!(nodes instanceof Array)) {
        nodes.element
          ? void this.element.appendChild(nodes.element)
          : void 0;
      }
      else {
        const fragment = document.createDocumentFragment();
        
        for (const node of nodes) {
          node
            ? node instanceof Array
                ? void this.add(node)
                : node.element
                    ? void fragment.appendChild(node.element)
                    : void this.element.appendChild(node)
            : void 0;
        }
    
        void this.element.appendChild(fragment);
      }
    }
    
    return this;
  };
  composer.alt      = function(text)                  {
    void this.element.setAttribute('alt', String(text));
    
    return this;
  };
  composer.append   = function(text)                  {
    this.element.innerText = this.element.innerText + (text || "");
  
    return this;
  };
  composer.attr     = function(attributes)            {
    if (attributes instanceof Object) {
      for (const attr of Object.keys(attributes)) {
        if (!attr) continue;
        
        !attributes[attr]
          ? void this.element.removeAttribute(attr)
          : void this.element.setAttribute(attr, attributes[attr]);
      }
    }
    
    return this;
  };
  composer.clear    = function()                      {
    while (this.element.firstChild) {
      void this.element.removeChild(this.element.firstChild);
    }
  
    return this;
  };
  composer.click    = function(method)                {
    if (method instanceof Function) {
      this.element.onclick = method;
    }
    
    return this;
  };
  composer.copy     = function()                      {
    let obj         = Object.create(this);
        obj.element = this.element.cloneNode(true);
    
    obj.element.onclick = this.element.onclick;
    
    return obj;
  };
  composer.event    = function(name, method)          {
    if (name && method) {
      void this.element.addEventListener(name, method);
    }
  
    return this;
  };
  composer.fadein   = function(unit)                  {
    this.element.style.transition = 'all 0.5s';
    
    void this.style({left: unit}, 10);
    
    return this;
  };
  composer.hide     = function(delay)                 {
    void setTimeout(() => {
      this.element.style.display = 'none';
    }, delay || 0);
  
    return this;
  };
  composer.html     = function(data)                  {
    if (typeof data === 'string') {
      this.element.innerHTML = data;
    }
    
    return this;
  };
  composer.id       = function(name)                  {
    if (name) {
      this.store[name] = this.element.id || this.store[name] || this.rid();
      this.element.id  = this.store[name];
    }
    else {
      this.element.id  = this.rid();
    }
    
    return this;
  };
  composer.link     = function(url)                   {
    const tag = this.element.tagName;
    
    if (tag === 'A' || tag === 'LINK') {
      void this.element.setAttribute('href', url);
    }
    else {
      void this.element.setAttribute('src', url);
    }
    
    return this;
  };
  composer.names    = function(names)                 {
    if (names) {
      void this.element.setAttribute('class', names);
    }
    
    return this;
  };
  composer.navigate = function(url)                   {
    if (url) {
      this.element.onclick = function() {
        window.location.href = this.url;
      }.bind({
        url: String(url)
      });
    }
    
    return this;
  };
  composer.on       = function(event, method)         {
    if (method instanceof Function) {
      this.element["on" + event] = method;
    }
    
    return this;
  };
  composer.remove   = function(delay)                 {
    void setTimeout(() => this.element.remove(), delay || 0);
    
    return this;
  };
  composer.rid      = function()                      {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        +  Math.random().toString(16).slice(2)
        +  String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };
  composer.show     = function(type)                  {
    this.element.style.display = type || 'block';
  
    return this;
  };
  composer.style    = function(style, delay)          {
    if (!delay) {
      for (const property of Object.keys(style)) {
        if (property) this.element.style[property] = style[property];
      }
    }
    else {
      void setTimeout(() => {
        for (const property of Object.keys(style)) {
          if (property) this.element.style[property] = style[property];
        }
      }, delay);
    }
    
    return this;
  };
  composer.submit   = function(method)                {
    if (method instanceof Function) {
      this.element.onsubmit = method;
    }
    
    return this;
  };
  composer.text     = function(text)                  {
    this.element.innerText = String(text);
    
    return this;
  };
  composer.toggle   = function(name)                  {
    if (name) {
      void this.element.classList.toggle(String(name));
    }
  
    return this;
  };
  composer.value    = function(value)                 {
    if (value || value === '0' || value === 0) {
      this.element.value = value;
    }
    
    return this;
  };
  composer.store    = Object.create(null);
  
  const tags = [
    "a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"
  ];
  
  for (let tag of tags) {
    void Object.defineProperty(create, tag, {
      get: create.node.bind(Object.create(null, {tag: {value: tag}}))
    });
  }
  
  void Object .freeze(composer);
  void Object .freeze(create);
  
  window.Node = function(style) {
    const parent = create.div.id();
    
    return parent
      .add(create.style
        .text(create.csssheet(style, '#' + parent.element.id)));
  };
}();

