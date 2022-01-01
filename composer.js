/* composer.js - https://github.com/c0d3r111/composer.js
 * Released under the MIT license
 */

!function() {
    class Composer {
        constructor(tag) {
            this.element     = document.createElement(tag || 'div');
            this._isComposer = true;
        }

        add        (nodes) {
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
                            : null;
                }

                void this.element.appendChild(fragment);
            }
            else if (nodes instanceof Object) {
                Boolean(nodes.element)
                    ? void this.element.appendChild(nodes.element)
                    : null;
            }

            return this;
        }
        attr       (attributes) {
            if (attributes instanceof Object) {
                void Object.keys(attributes).forEach(attr => {
                    return !attributes[attr]
                        ? void this.element.removeAttribute(attr)
                        : void this.element.setAttribute(attr, attributes[attr]);
                });
            }

            return this;
        }
        clear      () {
            while (this.element.firstChild) {
                void this.element.removeChild(this.element.firstChild);
            }

            return this;
        }
        click      (method) {
            void this.on('click', method);

            return this;
        }
        declass    (name) {
            void (Boolean(name)
                ? name.split(' ').forEach(item => void this.element.classList.remove(item))
                : null);

            return this;
        }
        flash      (message, time) {
            const currentText = this.element.value || this.element.innerText;

            this.element.value     = message;
            this.element.innerText = message;

            void this.state('disabled');
            void setTimeout(() => {
                this.element.value     = currentText;
                this.element.innerText = currentText;

                void this.state('disabled', true);
            }, time || 2500);

            return this;
        }
        hasChild   (name) {
            let id = this.store[name];

            if (!id) return false;

            for (const child of this.element.childNodes) {
                if (child.id === id) {
                    return true;
                }
            }

            return false;
        }
        hasClass   (name) {
            return this.element.classList.contains(name);
        }
        hide       (conditional) {
            if (!conditional) {
                this.element.style.display = 'none';
            }

            return this;
        }
        html       (data) {
            if (typeof data === 'string') {
                this.element.innerHTML = data;
            }

            return this;
        }
        id         (name) {
            if (name) {
                this.element.id  = name;
            }

            return this;
        }
        insert     (node) {
            void this.element.insertBefore(node.element || node, this.element.firstChild);

            return this;
        }
        link       (url) {
            const tag = this.element.tagName;

            void (tag === 'A' || tag === 'LINK'
                ? this.element.setAttribute('href', url)
                : this.element.setAttribute('src', url));

            return this;
        }
        names      (names) {
            void this.element.setAttribute(
                'class',
                Array.isArray(names) ? names.join(' ') : names || ''
            );

            return this;
        }
        navigate   (url, blank) {
            if (url) {
                this.element.onclick = function () {
                    return void (blank
                        ? window.open(url, '_blank')
                        : (window.location.href = url));
                };
            }

            return this;
        }
        on         (event, method) {
            if (method instanceof Function) {
                this.element["on" + event] = method;
            }

            return this;
        }
        reclass    (name) {
            void (Boolean(name)
                ? name.split(' ').forEach(item => void this.element.classList.add(item))
                : null);

            return this;
        }
        remove     (delay) {
            void (Boolean(delay)
                ? setTimeout(() => this.element.remove(), delay)
                : this.element.remove());

            return this;
        }
        show       (type, delay) {
            void (Boolean(delay)
                ? setTimeout(() => this.element.style.display = type || 'block', delay)
                : (this.element.style.display = type || 'block'));

            return this;
        }
        state      (name, clear) {
            void (clear
                ? this.element.removeAttribute(name)
                : this.element.setAttribute(name, true));

            return this;
        }
        style      (style, delay) {
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
        }
        text       (text, append) {
            if (typeof text === 'string') {
                this.element.innerText = (append ? this.element.innerText : '') + text;
            }

            return this;
        }
        toggle     (name) {
            if (typeof name === 'string') {
                void this.element.classList.toggle(name);
            }

            return this;
        }
        value      (value) {
            this.element.value = String(value == 0 ? value : Boolean(value) ? value : '');

            return this;
        }
    }

    window.create    = new Proxy({}, { get: (obj, prop) => new Composer(prop) });
    window.createRaw = function(subject) {
        const node     = new Composer();
        const isObject = typeof subject === 'object';
        const isString = typeof subject === 'string';

        if (isObject) {
            node.element = subject.nodeName
                ? subject
                : node.element
        }
        if (isString) {
            if (subject[0] === '<') {
                const temp = document.createElement('div');

                temp.innerHTML = subject;
                node.element   = temp.firstChild || node.element;
            }
        }

        return node;
    };
    window.select    = function(id, isClass) {
        const node = isClass
            ? Array.from(document.querySelectorAll('.' + id))
            : document.getElementById(id);

        return !node
            ? void console.error('No elements named:', id, ' on page.')
            : Array.isArray(node)
                ? node.length > 1
                    ? node.map(element => createRaw(element))
                    : createRaw(node[0])
                : createRaw(node);
    };
})();
