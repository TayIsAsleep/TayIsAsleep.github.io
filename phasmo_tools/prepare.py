##############################################################################
import re
import random
from requests import post
from time import sleep

def hashme():
    with open("index.html", "r+", encoding="utf-8") as f:
        print("Reading index.html")
        d = f.read()

        print("Updating file hash")
        d2 = re.sub("(?<=HASHSTART_)(.*)(?=_HASHSTOP)",str(random.randint(100000,999999)),d)

        print("Updating textfile")
        f.seek(0)
        f.write(d2)
    return 0
def scss():
    with open("./static/css/style.scss", "r", encoding="utf-8") as in_file, \
         open("./static/css/style.css", "w", encoding="utf-8") as out_file:
        
        print("Reading from .scss file...")
        scss_data = in_file.read()

        print("Converting scss to css...")
        css_data = post(
            url='https://jsonformatter.org/service/scssTocss',
            data={'css':scss_data}
        ).text
        
        print("Minimizing css...")
        minimized_css_data = post(
            url='https://cssminifier.com/raw',
            data={'input':css_data}
        ).text
        
        print("Writing to output file...")
        out_file.write(minimized_css_data)
    return 0

hashme()
scss()

print("\nDone. Quiting in 3 secounds.")
sleep(3)
exit()