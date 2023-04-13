---
title: "Improve Your Website Accessibility"
date: "2023-01-29T05:08:00.000Z"
tags: ["ADA", "WCAG", "accessibility"]
intro: "Keep your website accessibility in mind."
---

## 1. Introduction

Most web developers, especially `React Developers`, use `div`tags 90% of the time. They rarely touch other tags like`li`, `main`, `section`, `p`, and many others tags.

The main reason could be that React is extremely flexible. Developers can easily use `onClick`, `onSubmit`, and many other events.

They may write a button like this:

```js:Button.jsx
export default function Button() {
  const handleClick = () => console.log("Button Clicked");

  return (
    <div onClick={handleClick} className='py-2 px-3 rounded-md bg-indigo-600 text-white'>
      Click Me
    </div>
  );
}
```

Technically it's working. But you have sacrificed your web accessibility, web browser and screen reader are unable to tell it's a button and cannot offer introductions for the disabled.

## 2. What are ADA and WCAG

`ADA`(The Americans with Disabilities Act) is included in applicable laws in America. And
`WCAG`(Web Content Accessibility Guidelines) are guidelines developed by the Worldwide Web Consortium (W3C).

These acts and guidelines are helping the disabled(blindness, deafness, learning disabilities .etc) use the internet more easily.

You can find more information about ADA and WCAG at [webamin.org](https://webamin.org/).

## 3. How to Improve Web Accessibility

There are three key methods you need to keep in mind as a web developer.

### 3.1. Use Correct Tags

This method is easy, you shouldn't be too lazy to use the correct html tags.

We can update the above Button component like this:

```js:Button.jsx
export default function Button() {
  const handleClick = () => console.log("Button Clicked");

  return (
    <button type="button" onClick={handleClick} className='py-2 px-3 rounded-md bg-indigo-600 text-white'>
      Click Me
    </button>
  );
}
```

That's easy!

Besides, you should also use the `nav` tag if your component is a navbar, the same as `footer`, `header`, `section`, `article`, `hr`, `h1`, `p`, etc.

- **nav** (navbar)
- **footer** (footer)
- **header** (introductory content, usually a title)
- **section** (generic standalone section of a document)
- **article** (literally like a blog or a post)
- **hr** (thematic break between elements)
- **h1** (just use correctly when it is a heading, so as **h2**, **h3** , **etc**)
- **p** (just use correctly when it is a paragraph)

### 3.2. Add Labels

This is important especially got an unclear context. Usually, people forget the `alt` attribute for the `img` tag and forget the label for the input element.

Maybe like this:

```html:image.html
<img src='https://unsplash.com/photos/2qcAafaVaSs' />
```

```html:form.html
<form method='POST' action='/feedback'>
  <input required type='text' name='feedback' placeholder='Thanks for your feedback' />
  <button type='submit'>Submit</button>
</form>
```

Correct version:

```html:image.html
<img src='https://unsplash.com/photos/2qcAafaVaSs' alt="beautiful landscape" />
```

```html:form.html
<form method='POST' action='/feedback'>
  <label for='feedback'>Feedback</label>
  <input required type='text' id='feedback' name='feedback' placeholder='Thanks for your feedback' />
  <button type='submit'>Submit</button>
</form>
```

So that **screen reader software** can correctly read out your content.

## 3.3. Aria Label

Furthermore, if your interactive element is unclear for purpose, you should put an aria-label inside it.

Such as a link only with a logo or icon inside it, it would be difficult for the blind to tell what this is the icon for. So you need to put an **aria-label** inside it like this:

```html:aria-label.html
<a aria-label='github link' href='https://github.com/'>
  <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='githb icon' />
</a>
```

And sometimes, you can put an aria-label inside your section or main element making it more readable.

```js:Home.jsx
import { Welcome, Projects, Feedback } from "./components";

export default function Home() {
  return (
    <main aria-label='home page'>
      <section aria-label='welcome part'>
        <Welcome />
      </section>
      <section aria-label='projects part'>
        <Projects />
      </section>
      <section aria-label='feedback part'>
        <Feedback />
      </section>
    </main>
  );
}
```

## 4. Web Accessibility Checker

There are many free web accessibility checkers tools, such as lighthouse. Now you can even use lighthouse directly in your web browser like `Chrome` and `Microsoft Edge`. You can find lighthouse if you open your browser **Inspect** mode.

Other free online tools:

- [webpagetest](https://www.webpagetest.org/lighthouse)
- [accessibilitychecker](https://www.accessibilitychecker.org/)
