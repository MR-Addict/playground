---
title: "CSS New @property Rule"
date: "2023-01-31 18:46"
tags: ["css", "@property", "animation"]
intro: "CSS new @property rule makes it more powerful"
---

## 1. What's @property

The **@property** is awesome, with @property you can do so many things easier without any javascript.

Literally, you can define a css property with type, value, and inherit. You may think it's just like a normal css variable. Yes but no. Normal css variable is more like a constant in js. However, the property is more like a variable, which you can change its value.

## 2. How to Use

Below is the @property syntax. You need to define a property and then use it:

```css:property.css
@property --color {
  inherits: false;
  syntax: "<color>";
  initial-value: #c780fa;
}

.container{
  font-size: 2rem;
  transition: 300ms;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background: var(--color);
  box-shadow: 0 0 20px var(--color);
}
```

The **syntax** is just like the variable's type, you can specify with `color`, `length`, `percentage`, or any type using `*`;

The **inherits** controls whether its value should be inheritable.

And finally, you can specify a **initial value** for this property.

You can change this property vlaue like this:

```css:property.css
.container:hover {
  cursor: pointer;
  --color: #5bc0f8;
}
```

The result looks like this:

<Codepen id="eYjPvvy" height="300px"/>

## 3. More Demos

You can create an awesome button animation like this:

<Codepen id="ZEjqKQm" height="300px"/>

If you add keyframes to it, you got a bouncing smile:

<Codepen id="zYLmdPa" height="400px"/>

Or a swinging smile:

<Codepen id="WNKaZWY" height="400px"/>

Even more, you can create a very cool animated gradient border card:

<Codepen id="NWBOqKw" height="600px"/>
