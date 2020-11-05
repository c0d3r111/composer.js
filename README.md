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

Composer node translation

```javascript

// convert document body into composer object
const body = create.raw(document.body);

// create nav node 
const nav  = function(links) {
  const section = create.section.id('section-nav');
  const nav     = create.nav.names('menu');
  const menu    = create.ul.add(links.map(name => create.li.text(name)));
  
  void nav.add(create.img.id('logo').link('https://...'));
  void nav.add(menu);
  
  return section.add(nav);
};

void body.add(nav(['Home', 'Blog', 'Shop', 'Contact']));

```

