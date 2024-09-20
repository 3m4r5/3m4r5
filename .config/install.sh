#!/usr/bin/env bash

# fix timezone:
sudo timedatectl set-timezone Asia/Amman

# rpm fusion (for ffmpegthumbnailer):
sudo dnf -y install \
  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm

sudo dnf -y install \
  https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

sudo dnf -y copr enable solopasha/hyprland

# list installed packages: dnf repoquery --userinstalled
#                 for vscode  V                 for junction and Zen V            for yazi V             V for btop
sudo dnf install -y hyprland git micro btop polkit-gnome rofimoji flatpak flameshot ffmpegthumbnailer rocm-smi waybar kitty network-manager-applet blueman rofi-wayland

mkdir ~/.config
mkdir ~/.local/bin

# yazi:
cd ~
curl -LO https://github.com/sxyazi/yazi/releases/latest/download/yazi-x86_64-unknown-linux-gnu.zip
unzip yazi-x86_64-unknown-linux-gnu.zip
rm -f yazi-x86_64-unknown-linux-gnu.zip yazi-x86_64-unknown-linux-gnu/README.md yazi-x86_64-unknown-linux-gnu/LICENSE
mv yazi-x86_64-unknown-linux-gnu/* ~/.local/bin/
rm -rf yazi-x86_64-unknown-linux-gnu

# cliphist:
curl -L https://github.com/sentriz/cliphist/releases/latest/download/v0.5.0-linux-amd64 -o ~/.local/bin/cliphist
chmod +x ~/.local/bin/cliphist

# config:
cd ~
git clone https://github.com/3m4r5/3m4r5.git
cp -r ~/3m4r5/.config/* ~/.config/
rm -rf 3m4r5
chmod +x ~/.config/scripts/*

# flathub:
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak -y install flathub io.github.zen_browser.zen
flatpak -y install flathub re.sonny.Junction
xdg-settings set default-web-browser re.sonny.Junction.desktop
xdg-mime default re.sonny.Junction.desktop x-scheme-handler/file
xdg-mime default re.sonny.Junction.desktop inode/directory

# nerd fonts: (WIP)
mkdir ~/.local/share/fonts/
cd ~/.local/share/fonts/
curl -LO https://github.com/ryanoasis/nerd-fonts/releases/latest/download/NerdFontsSymbolsOnly.zip
unzip NerdFontsSymbolsOnly.zip
rm -f NerdFontsSymbolsOnly.zip LICENSE README.md

# Apple Color Emoji: https://gist.github.com/win0err/9d8c7f0feabdfe8a4c9787b02c79ac51
curl -LO https://github.com/samuelngs/apple-emoji-linux/releases/latest/download/AppleColorEmoji.ttf
sudo sed -i -e 's/Noto Color/Apple Color Emoji<\/family><family>Noto Color/g' /etc/fonts/conf.d/60-generic.conf # TODO 45
mkdir ~/.config/fontconfig/
tee ~/.config/fontconfig/fonts.conf << FONTS
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>serif</family>
    <prefer>
      <family>Symbols Nerd Font</family>
      <family>Apple Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Symbols Nerd Font</family>
      <family>Apple Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Symbols Nerd Font Mono</family>
      <family>Apple Color Emoji</family>
    </prefer>
  </alias>
  <match target="pattern">
    <test qual="any" name="family"><string>Noto Color Emoji</string></test>
    <edit name="family" mode="assign" binding="same"><string>Apple Color Emoji</string></edit>
  </match>
</fontconfig>
FONTS

rm -rf ~/.cache/fontconfig
sudo fc-cache -r -v
fc-cache -f -v

cd ~
echo "
if [ -f ~/.config/.bash_aliases ]; then
. ~/.config/.bash_aliases
fi
" >> .bashrc

: '
todo:
yazi:
- cli
- sudo mode
- icons
- md/html rendering
- relative line numbers
- gif/apng/heic preview and scroll
- remote file manegment (google drive / waydroid)
- external drives (flash)

hyprland:
- color picker/zoom/workspaces plugin
- keybinds script

waybr: sensors module
bar: display window icons in workspace module

other:
- hyprland, bar, bash, zsh, yazi, zellij, kitty, rofimoji config
- notification management
- media controls
- wifi & bluetooth rofi menu
- fix linear brightness
- support hibernate
- volume/mic app mixer
- volume & brightness notifications
- external monitor brightness & volume
- keycast: wlkeys/showmethekeys
- on-screen keyboard
- safe charging/prayer times/layout translator script(espanso?)
- add features from ubuntu sway
- pywall theme switcher
- dynamic wallpaper per workspace
- manage with gnu stow / dotter & upload to github
- install script
'
