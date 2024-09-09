#!/usr/bin/env python3
import json, subprocess
data = {}
data['tooltip'] = '<b>Keybinds:</b>' + ''.join([f'\n{i + 1}: {(lambda s: ''.join([v + ' + ' if s[k] == '1' else '' for k, v in {0:'Shift',1:'Caps',2:'Ctrl',3:'Alt',6:'Super'}.items()]))(f'{f"{v['modmask']:b}":0>7}'[::-1])}{v['key']}: {v['dispatcher']} {v['arg']}'.replace('&', '&amp;') for i, v in enumerate(json.loads(subprocess.check_output('hyprctl binds -j', shell=True, text=True)))])
print(json.dumps(data))