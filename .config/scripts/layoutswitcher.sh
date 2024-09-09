#!/usr/bin/env bash
# credit: https://github.com/Spelis/dotfiles/blob/master/.config/hypr/switchkb.sh
for kb in $(echo "$(hyprctl devices)" | awk '/Keyboard at/ {getline; print}'); do
	hyprctl switchxkblayout $kb next
done
