alias bios='sudo systemctl reboot --firmware-setup'
alias mv='mv -n'
alias lsa='ls -a'

alias dnfs='dnf search'
alias dnfi='sudo dnf install'
alias dnfu='sudo dnf upgrade'
alias dnfr='sudo dnf remove'
alias dnfl='dnf list'
alias dnfli='dnf list installed'

alias ishealthy='cat /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
alias healthy1='echo 1 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
alias healthy0='echo 0 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
