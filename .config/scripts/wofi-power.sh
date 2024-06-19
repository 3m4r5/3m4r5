#!/bin/bash
# credits:
# https://github.com/luispabon/sway-dotfiles/blob/master/scripts/wofi-power.sh
# https://gist.github.com/mxdevmanuel/a2229d427b39a9e40f2198979caa40c1 
entries="  Logout\n⏾  Suspend\n  Lock\n⭮  Reboot\n⏻  Shutdown"
selected=$(echo -e $entries|wofi --width 250 --height 220 --columns 2 --dmenu --cache-file /dev/null | awk '{print tolower($2)}')
case $selected in
	logout) hyprctl dispatch exit;;
	suspend) systemctl suspend;;
	reboot) systemctl reboot;;
	shutdown) systemctl poweroff -i;;
esac
