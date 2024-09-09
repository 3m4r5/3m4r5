#!/usr/bin/env bash

alias ishealthy='cat /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
alias healthy1='echo 1 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
alias healthy0='echo 0 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode'
