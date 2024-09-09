#!/usr/bin/env python3

import json, subprocess
from Xlib import display
from Xlib.keysymdef import *


def mod(n):
    s, o = f'{f"{n:b}":0>7}'[::-1], ''
    for k, v in {0:'Shift',1:'Caps',2:'Ctrl',3:'Alt',6:'Super'}.items():
        if s[k] == '1': o += v + ' + '
    return o


def keycode_to_keyname(keycode):
    try:
        d = display.Display()
        keysym = d.keycode_to_keysym(keycode, 0)
        if keysym == 0: return None
        for module in [latin1, latin2, latin3, latin4, miscellany, special, technical, apl, arabic, katakana, korean, xf86, xk3270, xkb, cyrillic, greek, hebrew, publishing, thai]:
            for name in dir(module):
                if getattr(module, name) == keysym: return name[3:]
    finally: d.close()


data = {}
data['tooltip'] = '<b>Keybinds:</b>'
binds = json.loads(subprocess.check_output('hyprctl binds -j', shell=True, text=True))

for i, v in enumerate(binds):
    data['tooltip'] += f'\n{i}: {mod(v['modmask'])}{keycode_to_keyname(v['keycode']) if v['keycode'] else v['key']}: {v['dispatcher']} {v['arg']}'.replace('&', '&amp;')

data['tooltip'] = data['tooltip'].replace('&', '&amp;')
print(json.dumps(data))
