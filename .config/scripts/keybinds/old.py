#!/usr/bin/env python3

import json, subprocess
from Xlib import display
from Xlib.keysymdef import *


def mod(n):
    s = f'{f"{n:b}":0>7}'[::-1]
    o = ''
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
binds = subprocess.check_output('hyprctl binds', shell=True, text=True)
binds = binds.split('bind')
binds.pop(0)

for i in range(len(binds)):
    binds[i] = binds[i].split('\n')

for bind in binds:
    bind.pop()
    for n, line in enumerate(bind):
        if len(line) < 1 or line[0] != '\t':
            bind.pop(n)

a = []
for i, bind in enumerate(binds):
    b = [bind[k][v:] for k, v in {0:10,1:9,2:6,3:10,4:11,5:13,6:6}.items()]
    a += f'\n{i + 1}: {mod(int(b[0]))}{b[2] if b[3] == '0' else keycode_to_keyname(int(b[3]))}: {b[5]} {b[6]}'

for i, v in enumerate(a):
    data['tooltip'] += v
data['tooltip'] = data['tooltip'].replace('&', '&amp;')
print(json.dumps(data))
