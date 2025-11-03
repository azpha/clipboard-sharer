import socketio
import pyperclip
import sys
from time import sleep

sio = socketio.Client()
HOST_IP = sys.argv[1] if len(sys.argv) > 1 else ""

@sio.event
def connect():
  print('connected')

@sio.event
def copy(data):
  print('message received ', data)

@sio.event
def disconnect():
  print('disconnected')

sio.connect(HOST_IP)

while True:
  last_clipboard = pyperclip.paste()
  while True:
    current_clipboard = pyperclip.paste()
    if current_clipboard != last_clipboard:
      last_clipboard = current_clipboard

      sio.emit("copy", current_clipboard)

    sleep(0.5)