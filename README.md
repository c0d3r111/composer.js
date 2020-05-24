# composer.js
Front-end development tool

# Example

```html

<section id="section-main">
  <div class="main-menu">
    <img id="logo" src="https://...">
    <ul>
      <li>Home</li>
      <li>Blog</li>
      <li>Shop</li>
      <li>Contact</li>
    </ul>
  </div>
</section>

```

Composer translation

```javascript

const create  = window._COMPOSER.export();
const body    = create(document.body); // create accepts HTML tag name or HTML element
const section = create('section').id('section-main');
const menu    = create().names('main-menu'); // div is the default node

void menu.add([
  create('img').id('logo').link('https://...'),
  create('ul').add(['Home', 'Blog', 'Shop', 'Contact']
              .map(name => create('li').text(name))
]);

void body.add(section.add(menu));

```

