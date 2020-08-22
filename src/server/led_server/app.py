import board
import neopixel
from flask import Flask

PORT = 7432
app = Flask(__name__)

@app.route("/")
def index():
    pixels.fill((127,60,0))
    return 200

@app.route("/red")
def red():
    fillRed()
    return 200

@app.route("/blue")
def blue():
    fillBlue()
    return 200

@app.route("/green")
def green():
    fillGreen()
    return 200

@app.route("/yellow")
def yellow():
    fillYellow()
    return 200

@app.route("/reset")
def reset():
    fillColor(0,0,0)
    return 200

# for i in range(len(sys.argv)):
#     if (i == 0):
#         continue
#     color[i-1] = int(sys.argv[i])


def fillColor(r, g, b):
    pixels.fill((r,g,b))

def fillRed():
    fillColor(255, 0, 0)

def fillGreen():
    fillColor(0,255,0)

def fillBlue():
    fillColor(0,0,255)

def fillYellow():
    fillColor(255,255,0)


pixels= neopixel.NeoPixel(board.D21, 12)
fillColor(0,0,0)