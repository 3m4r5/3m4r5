#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from time import sleep
options = Options()
options.add_argument('-headless')

try:
    driver = webdriver.Firefox(options=options)
    driver.get("https://awqaf.gov.jo/EN/Pages/Vision_and_Mission")
    sleep(1)
    driver.find_element(By.CLASS_NAME, 'Custom-BTN').click()
    sleep(1)
    prayer_times = []
    for i in range(6):
        element = driver.find_element(By.ID, f'ctl00_ctl00_paryertimes_ctrl{i}_Label2')
        prayer_times.append(element.text.strip())
finally:
    driver.quit()

for prayer, time in zip(['Fajr', 'Shorouk', 'Duhr', 'Asr', 'Maghreb', 'Esha'], prayer_times):
    print(f'{prayer}: {time}')

# todo: display in waybar according to time
# todo: cache day/month and validate it
