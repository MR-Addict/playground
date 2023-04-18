---
title: "Live Stream on Raspberry Pi"
date: "2023-04-18T11:39:37.527Z"
tags: ["Raspberry-Pi", "Stream", "Webcam", "Telegram"]
intro: "Easily live streaming on your raspberry pi with webcam"
---

## 1. Preview

If you got a raspberry pi, you may want to use the webcam on your raspberry pi as a WiFi webcam. Here is the full process about how to set up yourself.

I'm using MJPG-Streamer as a live-stream service. After much research, though this is a very old project and may have been archived, it's still working very well.

After installing MJPG-Streamer, I also set up a telegramBot on raspberry pi. And I also implement it on my [home assistant](https://home-assistant.io), but that's much easier than a telegram bot.

After all, you can do as many things with MJPT-Stramer as you like.

## 2. Install and Setup MJPG-Streamer

Install dependencies on your raspberry pi for building:

```sh:install-dependencies.sh
sudo apt-get install cmake libjpeg9-dev
```

Download archived package:

```sh:download-package.sh
wget https://github.com/jacksonliam/mjpg-streamer/archive/master.zip
```

Build and install MJPG-Streamer:

```sh:build-and-install.sh
unzip master.zip && cd mjpg-streamer-master/mjpg-streamer-experimental
make && sudo make install
```

After this, your raspberry pi has successfully installed MJPG-Streamer, you can use the below command for testing:

```sh:test-command.sh
/usr/local/bin/mjpg_streamer -i "/usr/local/lib/mjpg-streamer/input_uvc.so -n -f 10 -r 1280x720" -o "/usr/local/lib/mjpg-streamer/output_http.so -p 8084 -w /usr/local/share/mjpg-streamer/www
```

After that, you can visit [http://localhost:8084](http://localhost:8084) on your raspberry pi local network.

But you may want to set up a service that auto starts your service when your raspberry pi reboot. You can add an mjpg-streamer script on your local bin directory like this:

```sh:~/.local/bin/mjpg-streamer
#!/bin/bash

# adjust these
INPUT_PLUGIN="/usr/local/lib/mjpg-streamer/input_uvc.so";
DEVICE="/dev/video0";
FRAMES="10";
RESOLUTION="1280x720";

OUTPUT_PLUGIN="/usr/local/lib/mjpg-streamer/output_http.so";
PORT="8084";

# the following are defaults and should not need to be changed
EXEC="/usr/local/bin/mjpg_streamer"
WEB_DIR="/usr/local/share/mjpg-streamer/www";

# mjgp_streamer often does not start on first try. Why ?
start_streamer(){
    for i in {1..5}    # try up to 5 times
    do
        ${EXEC} -b -i "${INPUT_PLUGIN} -n -d ${DEVICE} -f ${FRAMES} -r ${RESOLUTION}" -o "${OUTPUT_PLUGIN} -p ${PORT} -w ${WEB_DIR}"  > /dev/null 2>&1
        sleep $((1+i)) # waiting progressively longer
        if pgrep mjpg_streamer > /dev/null
        then
          echo "mjpg_streamer started"
          return
        fi
    done
    echo "could not start mjpg_streamer"
}

# Carry out specific functions when asked to by the system
case "$1" in
        start)
                if pgrep mjpg_streamer > /dev/null
                then
                    echo "mjpg_streamer already running"
                else
                    start_streamer
                fi
                ;;
        stop)
                if pgrep mjpg_streamer > /dev/null
                then
                    killall mjpg_streamer
                    echo "mjpg_streamer stopped"
                else
                    echo "mjpg_streamer is not running"
                fi
                ;;
        restart)
                if pgrep mjpg_streamer > /dev/null
                then
                    killall mjpg_streamer
                    echo "mjpg_streamer stopped"
                else
                    echo "mjpg_streamer is not running"
                fi
                start_streamer
                ;;
        status)
                pid=`ps -A | grep mjpg_streamer | grep -v "grep" | grep -v mjpg_streamer. | awk '{print $1}' | head -n 1`
                if [ -n "$pid" ];
                then
                        echo "mjpg_streamer is running with pid ${pid}"
                        echo "mjpg_streamer was started with the following command line"
                        cat /proc/${pid}/cmdline ; echo ""
                else
                        echo "mjpg_streamer is not running"
                fi
                ;;
        *)
                echo "Usage: $0 {start|stop|restart|status}"
                exit 1
                ;;
esac
exit 0
```

Then grant permission for this script:

```sh:grant-permission.sh
chmod u+x ~/.local/bin/mjpg-streamer
```

Add script to your crontab:

```sh:crontab.sh
@reboot /home/pi/.local/bin/mjpg-streamer start && sleep 5 && /home/pi/.local/bin/mjpg-streamer restart
```

Reboot and visit [http://localhost:8084](http://localhost:8084) again for testing.

## 2. Build and Set up Telegram bot

You can clone my github repository if you want to set up a telegram bot on your raspberry pi:

```sh:clone-repository.sh
git clone https://github.com/510Lab/510lab-webcam.git
```

After cloning, you may want to change `your_telegram_bot_token` with your own bot token:

```py:telegramBot.py
#! /usr/bin/python

import telebot
import requests
from PIL import Image
from io import BytesIO

bot = telebot.TeleBot("your_telegram_bot_token")


def take_photo():
    response = requests.get('http://localhost:8084/?action=snapshot')
    return Image.open(BytesIO(response.content))


@bot.message_handler(commands=['snapshot'])
def send_photo(message):
    print('[INFO] Sending snapshot...')
    try:
        bot.send_photo(message.chat.id, take_photo())
        print('[INFO] Snapshot sended!')
    except:
        print('[ERROR] Failed to send snapshot!')


print('[INFO] Telegram bot listening...')
bot.polling()
```

Install needed requirements:

```sh:install-requirements.sh
pip install -r requirements.txt
```

Build executable binary:

```sh:build-binary.sh
pyinstaller --onefile --distpath . telegramBot.py
```

Create a service on your raspbery pi `/etc/systemd/system/telegramBot`:

```text:/etc/systemd/system/telegramBot
[Unit]
Description=Telegram snapshot bot
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=vista
ExecStart=/home/vista/Projects/webcam/telegramBot

[Install]
WantedBy=multi-user.target
```

Enable service:

```sh:enable-service.sh
sudo systemctl enable telegramBot
```

Start service:

```sh:start-service.sh
sudo systemctl start telegramBot
```

## 4. Useful links

- [Pyinstaller usage](https://pyinstaller.org/en/stable/usage.html)
- [Telegram send_photo API](https://docs.python-telegram-bot.org/en/stable/telegram.bot.html#telegram.Bot.sendPhoto)
- [MJPG-Streamer setup example](https://www.sigmdel.ca/michel/ha/rpi/streaming_en.html)
- [Raspberr pi using usb webcam tutorial](https://raspberrypi-guide.github.io/electronics/using-usb-webcams)
