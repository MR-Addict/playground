---
title: "HTTP Status Code Cheatsheet"
date: "2023-04-13T07:50:00.000Z"
tags: ["status-code", "http", "web", "cheatsheet"]
intro: "Use correct http status code for your API"
---

## 1. Preview

If you write backend API, **using correct http status code** is important. Correct https status code give more information instead of general 200 code. You should avoid that.

But you may always need to look up some http status code. So do I. So I spend some time taking some notes and make a summary below.

## 2. Cheatsheet

| Status Code | Description           | Most Used Methods   |
| :---------- | :-------------------- | :------------------ |
| 200         | OK                    | GET,POST,PUT,DELET  |
| 201         | Created               | POST                |
| 204         | No Content            | DELETE              |
| 304         | Not Modified          | GET                 |
| 400         | Bad Request           | GET,POST,PUT,DELETE |
| 401         | Unauthorized          | GET,POST,PUT,DELETE |
| 403         | Forbidden             | GET,POST,PUT,DELETE |
| 404         | Not Found             | GET                 |
| 500         | Interval Server Error | GET,POST,PUT,DELETE |

## 3. Use Links

- [Http status code cheatsheet](https://www.restapitutorial.com/httpstatuscodes.html)
- [Youtube https status code explained video](https://www.youtube.com/watch?v=wJa5CTIFj7U)
