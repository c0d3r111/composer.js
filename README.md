# composer.js
Front-end development tool

# Example

```html

<section id="section-nav">
  <nav class="menu">
    <img id="logo" src="https://...">
    <ul>
      <li>Home</li>
      <li>Blog</li>
      <li>Shop</li>
      <li>Contact</li>
    </ul>
  </nav>
</section>

```
```javascript

document.getElementById('section-nav').onclick = function(e) {
    // do something
};

```

Composer.js translation

```javascript
const sectionClick = function(e) {
    // do something
};

create.section.id('section-nav')
    .click(sectionClick)
    .add(create.nav.names('menu')
        .add([
            create.img.id('logo').link("https://..."),
            create.ul.add(['Home', 'Blog', 'Shop', 'Contact']
                .map(name => create.li.text(name)))
        ]));

```

