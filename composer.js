/**
 *
 * composer.js - https://github.com/c0d3r111/composer.js
 * Released under the MIT license
 *
**/
class Creator {
    constructor() {
        const tags = [
            "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"
        ];

        void tags.forEach(tag => {
            void Object.defineProperty(this, tag, {
                get: this.node.bind(Object.create(null, { tag: { value: tag } }))
            });
        });
    }
    node() {
        if (!this.tag) return;

        const obj   = Object.create(composer);

        obj.element = document.createElement(this.tag);
        obj.data    = Object.create(null);

        return obj;
    };
    raw(subject) {
        if (!subject) return create.div;

        const node = Object.create(composer);

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
    media(sheet, obj, name, id) {
        void sheet.push(name + '{');
        void Object.keys(obj).forEach(prop => void this.rule(sheet, obj[prop], prop, id));
        void sheet.push('}');
    }
    inner(sheet, obj, name, id) {
        void sheet.push(name + '{');
        void this.rule(sheet, obj, id);
        void sheet.push('}');
    }
    rule(sheet, obj, prop, id) {
        const keys   = Object.keys(obj);
        const nested = [];
        const paper  = [];
        const props  = prop
            .split(',')
            .map(item => ((id || '') + ' ' + item).trim())
            .join(',');

        void keys.forEach((item, index) => {
            typeof obj[item] === 'object'
                ? void nested.push(index)
                : void paper.push(item.replaceAll('_', '-') + ':' + obj[item] + ';');
        });

        if (paper.length) {
            void sheet.push(props + '{');
            void sheet.push(paper);
            void sheet.push('}');
        }

        void nested.forEach(index => {
            const focus    = keys[index];
            const newprops = props
                .split(',')
                .map(item => (item + ' ' + focus).trim())
                .join(',');

            focus[0] === '@'
                ? void this.inner(sheet, obj[focus], focus, newprops.replaceAll(focus, ''))
                : void this.rule(sheet, obj[focus], newprops);
        });
    }
    sheet(style, id) {
        if (!style || typeof style !== 'object') return '';

        const sheet = [];

        void Object.keys(style).forEach(selector => {
            selector[0] === '@'
                ? void this.media(sheet, style[selector], selector, id)
                : void this.rule(sheet, style[selector], selector, id);
        });

        return sheet.join('');
    }
}
class Composer {
    constructor() {
        this.store = Object.create(null);
    }
    add(nodes) {
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
    }
    alt(text) {
        void this.element.setAttribute('alt', String(text));

        return this;
    }
    append(text) {
        this.element.innerText = this.element.innerText + (text || "");

        return this;
    }
    attr(attributes) {
        if (attributes instanceof Object) {
            for (const attr of Object.keys(attributes)) {
                if (!attr) continue;

                !attributes[attr]
                    ? void this.element.removeAttribute(attr)
                    : void this.element.setAttribute(attr, attributes[attr]);
            }
        }

        return this;
    }
    clear() {
        while (this.element.firstChild) {
            void this.element.removeChild(this.element.firstChild);
        }

        return this;
    }
    click(method) {
        if (method instanceof Function) {
            this.element.onclick = method;
        }

        return this;
    }
    copy() {
        let obj = Object.create(this);
        obj.element = this.element.cloneNode(true);

        obj.element.onclick = this.element.onclick;

        return obj;
    }
    event(name, method) {
        if (name && method) {
            void this.element.addEventListener(name, method);
        }

        return this;
    }
    fadein(unit) {
        this.element.style.transition = 'all 0.5s';

        void this.style({ left: unit }, 10);

        return this;
    }
    hide(delay) {
        void setTimeout(() => {
            this.element.style.display = 'none';
        }, delay || 0);

        return this;
    }
    html(data) {
        if (typeof data === 'string') {
            this.element.innerHTML = data;
        }

        return this;
    }
    id(name) {
        if (name) {
            this.store[name] = this.element.id || this.store[name] || this.rid();
            this.element.id = this.store[name];
        }
        else {
            this.element.id = this.rid();
        }

        return this;
    }
    link(url) {
        const tag = this.element.tagName;

        if (tag === 'A' || tag === 'LINK') {
            void this.element.setAttribute('href', url);
        }
        else {
            void this.element.setAttribute('src', url);
        }

        return this;
    }
    names(names) {
        if (names) {
            void this.element.setAttribute('class', names);
        }

        return this;
    }
    navigate(url) {
        if (url) {
            this.element.onclick = function () {
                window.location.href = this.url;
            }.bind({
                url: String(url)
            });
        }

        return this;
    }
    on(event, method) {
        if (method instanceof Function) {
            this.element["on" + event] = method;
        }

        return this;
    }
    remove(delay) {
        void setTimeout(() => this.element.remove(), delay || 0);

        return this;
    }
    rid() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            + Math.random().toString(16).slice(2)
            + String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    show(type) {
        this.element.style.display = type || 'block';

        return this;
    }
    style(style, delay) {
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
    }
    submit(method) {
        if (method instanceof Function) {
            this.element.onsubmit = method;
        }

        return this;
    }
    text(text) {
        this.element.innerText = String(text);

        return this;
    }
    toggle(name) {
        if (name) {
            void this.element.classList.toggle(String(name));
        }

        return this;
    }
    value(value) {
        if (value || value === '0' || value === 0) {
            this.element.value = value;
        }

        return this;
    }
}

void function() {
    window.create   = new Creator();
    window.composer = new Composer();
    window.Node     = function (style) {
        const parent = create.div.id();

        return parent
            .add(create.style
                .text(create
                    .sheet(style, '#' + parent.element.id)));
    };
}();
