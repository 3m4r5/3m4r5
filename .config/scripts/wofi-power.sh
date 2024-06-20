#!/bin/bash
# credits:
# https://github.com/luispabon/sway-dotfiles/blob/master/scripts/wofi-power.sh
# https://gist.github.com/mxdevmanuel/a2229d427b39a9e40f2198979caa40c1 
entries="  Logout\n⏾  Suspend\n  Lock\n⭮  Reboot\n⏻  Shutdown"
selected=$(echo -e $entries|wofi -b --width 810 --height 80 --columns 5 --dmenu --cache-file /dev/null -s .config/scripts/wofi-power.css -D hide_search=true | awk '{print tolower($2)}')
case $selected in
	logout) hyprctl dispatch exit;;
	suspend) systemctl suspend;;
	reboot) systemctl reboot;;
	shutdown) systemctl poweroff -i;;
esac