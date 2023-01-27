---
title: "Write Beautiful Emails With React"
date: "2023-01-27 01:27"
tags: ["react", "email", "beautiful"]
intro: "Write a beautiful email using react like a professional."
---

## 1. Introduction

Recently I found a new company called [resend](https://resend.com/). They are a startup focused on business about email.

They has a project called [react-email](https://react.email/), which let you write email using react. Which I think is cool. You can find more information about react emial on their [awesome website](https://react.email/).

## 2. Components

There're only 11 prebuilt component for writing email when I wrote this post. They are:

- HTML
- Head
- Preview
- Container
- Section
- Column
- Hr
- Button
- Image
- Link
- Text

Though there're only 11 of them, I think it's enough for writing email. You can find the documention on their website.

## 3. Style

First thing first, I think style component is not that easy.

We can only use pure css to sytle components. And some css style just not working, such as `fontWeight`. Maybe there still bugs while built the html for email.

## 4. Usage

They got a web UI with live preview after you start your project. You can directly send email at preview page.

You may wonder how to send built email yourself. Below is the python code I wrote that sends my example profile email.

```python:sendEmail.py
import smtplib
from email.mime.text import MIMEText

email_to = "XXXXXXXX"
email_from = "XXXXXXXX"
email_pass = "XXXXXXXX"


def send_email():
    with open("out/profile.html", "r") as file:
        content = file.read()
    try:
        msg = MIMEText(content, 'html', 'utf-8')
        msg['Subject'] = "MR.Addict's Profile"
        msg['From'] = email_from
        msg['To'] = email_to

        service = smtplib.SMTP_SSL("smtp.qq.com", 465)
        service.login(msg['From'], email_pass)
        service.sendmail(msg['From'], msg['To'], msg.as_string())
        service.quit()
        return True, "Sending email successed!"
    except Exception:
        return False, "Sending email failed!"


if __name__ == "__main__":
    success, message = send_email()
    print(message)
```

## 5. Result

Here is the comparison about preview and actual received email. I think the result is promising.

|                                  Preview Email                                   |                                 Received Email                                 |
| :------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| ![Preview](https://github.com/MR-Addict/react-email/raw/main/images/preview.png) | ![Actual](https://github.com/MR-Addict/react-email/raw/main/images/actual.png) |

You can find source code on my github:

- https://github.com/MR-Addict/react-email

## 6. Have a Try

Input your email below and I will send you above example email.

<SendProfileEmail />

## 7. Youtube Video

Below is a good youtube video about react email.

<Youtube id="MdO1AKVTkLI" />
