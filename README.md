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
const linkNames = ['Home', 'Blog', 'Shop', 'Contact'];
const linkLogo  = 'https://example.com/logo.jpg';

create.section
    .id  ('section-nav')
    .add (create.nav
        .names ('menu')
        .add   (create.img
            .id   ('logo')
            .link (linkLogo))
        .add(create.ul
            .add(linkNames.map(name => create.li.text(name))))

```

