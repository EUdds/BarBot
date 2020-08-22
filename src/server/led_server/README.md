# BarBot UI Python Flask Server
*Author: Eric Udlis*

This is a seperate driver to run neopixels on the raspberry pi. Instead of elevating the entire BarBot process, this webserver runs with sudo access to drive the neopixels.

To start the server run `sudo FLASK_APP=/path/to/project/BarBot/src/server/led_server/app.py flask run`