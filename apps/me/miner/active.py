import pyautogui
import random
import time 

def waitForInactive():
    while 1:
        x, y = pyautogui.position()
        for i in range(10, 0, -1):
            print(i)
            time.sleep(1)
        if pyautogui.position() == (x, y):
            print("Continuing idle thing")
            return


screen_w, screen_h = pyautogui.size()
while 1:
    x,y = random.randint(1, screen_w-1), random.randint(1,screen_h-1)

    pyautogui.moveTo(x,y)
    pyautogui.press(random.choice(list("abcdefghijklmnopqrstuvwxyz")))
    print(x,y)

    time.sleep(3)

    if pyautogui.position() != (x,y):
        print("Movement detected")
        waitForInactive()