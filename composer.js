/**
 *
 * composer.js - https://github.com/c0d3r111/composer.js
 * Released under the MIT license
 *
**/

void function() {
    window.Create   = {
        node : function() {
            if (!(this instanceof String)) return;

            const obj   = Object.create(window.Composer);

            obj.element = document.createElement(this);

            return obj;
        },
        raw  : function(subject) {
            if (!subject) return this.div;

            const node = Object.create(window.Composer);

            if (typeof subject === 'string') {
                if (subject[0] === '<') {
                    const temp = document.createElement('div');

                    temp.innerHTML = subject;
                    node.element   = temp.firstChild || document.createElement('div');
                }
                else {
                    node.element = document.createElement('div');
                }
            }
            else {
                node.element = subject instanceof HTMLElement || subject instanceof SVGElement
                    ? subject
                    : document.createElement('div');
            }

            return node;
        }
    };
    window.Composer = {
        get isVisible() {
            return Boolean(this.element)
                ? this.element.style.display !== 'none'
                : false;
        },

        add        : function(nodes) {
            if (nodes instanceof Array) {
                const fragment = document.createDocumentFragment();

                for (const node of nodes) {
                    if (!Boolean(node)) continue;

                    node instanceof Array
                        ? void this.add(node)
                        : node instanceof Object
                            ? Boolean(node.element)
                                ? void fragment.appendChild(node.element)
                                : void fragment.appendChild(node)
                            : void 0;
                }

                void this.element.appendChild(fragment);

                return this;
            }

            if (nodes instanceof Object) {
                Boolean(nodes.element)
                    ? void this.element.appendChild(nodes.element)
                    : void 0;
            }

            return this;
        },
        append     : function(text) {
            this.element.innerText = this.element.innerText + (text || "");

            return this;
        },
        attr       : function(attributes) {
            if (attributes instanceof Object) {
                void Object.keys(attributes).forEach(attr => {
                    return !attributes[attr]
                        ? void this.element.removeAttribute(attr)
                        : void this.element.setAttribute(attr, attributes[attr]);
                });
            }

            return this;
        },
        clear      : function() {
            while (this.element.firstChild) {
                void this.element.removeChild(this.element.firstChild);
            }

            return this;
        },
        click      : function(method) {
            if (method instanceof Function) {
                this.element.onclick = method;
            }

            return this;
        },
        copy       : function() {
            const obj = Object.create(this);

            obj.element         = this.element.cloneNode(true);
            obj.element.onclick = this.element.onclick;

            return obj;
        },
        declass    : function(name) {
            Boolean(name)
                ? void name.split(' ').forEach(item => void this.element.classList.remove(item))
                : void 0;

            return this;
        },
        edit       : function() {
            void this.element.setAttribute('contentEditable', true);

            return this;
        },
        emit       : function(name) {
            if (name) {
                void window.dispatchEvent(new Event(name));
            }

            return this;
        },
        event      : function(name, method) {
            if (name && method) {
                void this.element.addEventListener(name, method);
            }

            return this;
        },
        flash      : function(message) {
            const currentText = this.element.value || this.element.innerText;

            this.element.value     = message;
            this.element.innerText = message;

            void setTimeout(() => {
                this.element.value     = currentText;
                this.element.innerText = currentText;
            }, 2500);

            return this;
        },
        hasChild   : function(name) {
            let id = this.store[name]; 

            if (!id) return false;

            for (const child of this.element.childNodes) {
                if (child.id === id) {
                    return true;
                }
            }

            return false;
        },
        hasClass   : function(name) {
            return this.element.classList.contains(name);
        },
        hide       : function(conditional) {
            if (!conditional) {
                this.element.style.display = 'none';
            }

            return this;
        },
        html       : function(data) {
            if (typeof data === 'string') {
                this.element.innerHTML = data;
            }

            return this;
        },
        id         : function(name) {
            if (name) {
                this.store[name] = this.element.id || this.store[name] || this.uid();
                this.element.id  = this.store[name];
            } else {
                this.element.id  = this.uid();
            }

            return this;
        },
        insert     : function(node) {
            void this.element.insertBefore(node.element || node, this.element.firstChild);

            return this;
        },
        link       : function(url) {
            const tag = this.element.tagName;

            tag === 'A' || tag === 'LINK'
                ? void this.element.setAttribute('href', url)
                : void this.element.setAttribute('src', url);

            return this;
        },
        names      : function(names) {
            void this.element.setAttribute('class', names || '');

            return this;
        },
        navigate   : function(url, blank) {
            if (url) {
                this.element.onclick = function () {
                    return this.blank
                        ? void window.open(this.url, '_blank')
                        : void (window.location.href = this.url);
                }.bind({
                    url   : String(url),
                    blank : Boolean(blank)
                });
            }

            return this;
        },
        on         : function(event, method) {
            if (method instanceof Function) {
                this.element["on" + event] = method;
            }

            return this;
        },
        reclass    : function(name) {
            Boolean(name)
                ? void name.split(' ').forEach(item => void this.element.classList.add(item))
                : void 0;

            return this;
        },
        remove     : function(delay) {
            Boolean(delay)
                ? void setTimeout(() => this.element.remove(), delay)
                : void this.element.remove();

            return this;
        },
        show       : function(type, delay) {
            Boolean(delay)
                ? void setTimeout(() => this.element.style.display = type || 'block', delay)
                : void (this.element.style.display = type || 'block');

            return this;
        },
        state      : function(name, clear) {
            void (
                clear
                    ? this.element.removeAttribute(name)
                    : this.element.setAttribute(name, true)
            );

            return this;
        },
        style      : function(style, delay) {
            if (style instanceof Object) {
                if (!delay) {
                    void Object.keys(style).forEach(property => {
                        if (property) this.element.style[property] = style[property];
                    });

                    return this;

                }

                void setTimeout(() => void this.style(style), delay);
            }

            return this;
        },
        submit     : function(method) {
            if (method instanceof Function) {
                this.element.onsubmit = method;
            }

            return this;
        },
        text       : function(text) {
            this.element.innerText = String(text);

            return this;
        },
        toggle     : function(name) {
            if (name) {
                void this.element.classList.toggle(String(name));
            }

            return this;
        },
        transition : function(prop, value, duration, timing) {
            !Boolean(duration)
                ? void 0
                : void this.style({
                    transition : `${prop || 'all'} ${duration || '0.5'}s ${timing || 'ease-in-out'}`,
                    [prop]     : value || 0,
                });

            return this;
        },
        uid        : function() {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
                + Math.random().toString(16).slice(2)
                + String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        },
        value      : function(value) {
            this.element.value = String(value == 0 ? value : Boolean(value) ? value : '');

            return this;
        },
    };

    window.create         = window.Create;
    window.composer       = window.Composer;
    window.Composer.store = Object.create(null);

    const tags = [
        "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"
    ];

    void tags.forEach(tag => {
        void Object.defineProperty(window.Create, tag, {
            get: window.Create.node.bind(String(tag))
        });
    });
}();
