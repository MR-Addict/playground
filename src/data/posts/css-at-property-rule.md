---
title: "CSS New @property Rule"
date: "2023-01-31 18:46"
tags: ["css", "@property", "animation"]
intro: "CSS new @property rule makes it more powerfull"
---

## 1. What's @property

The **@property** is really really awwsome, with @property you can so many things easier without any javascript.

Literally, you can define a css propert with type, value, and inherit. You may think it's just like normal css variable. Yes but no. Normal css variable is more like a constant in js, However the property is more like variable, which you can change its value.

## 2. How to Use

Below is @property syntax, you need to define a property and then use it:

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

The **syntax** just like variable's type, you can specify with `color`, `length`, `percentage` or any type using `*`;

The **inherits** control whether its value should be inheritable.

And finally, you can specific a **initial value** for this property.

You can change property like this:

```css:property.css
.container:hover {
  cursor: pointer;
  --color: #5bc0f8;
}
```

The result looke like this:

<Codepen id="eYjPvvy" height="300px"/>

## 3. More Demos

You can create an awesome button animation like this:

<Codepen id="ZEjqKQm" height="300px"/>

Or even more, you can create an animated gradient border:

<Codepen id="NWBOqKw" height="600px"/>
