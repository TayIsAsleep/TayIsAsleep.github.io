import re
import random
import os
import time

def hashMe(fn):
    with open(fn,"r") as f:

        in_ = f.read()

        out = re.sub(
            '(\?random=[0-9]{10}")',
            f'?random={"".join(str(random.randint(0,9)) for x in range(10))}"',
            in_
        )

    if in_ != out:
        with open(fn,"w") as f:
            f.write(out)
        

for path, subdirs, files in os.walk(os.getcwd()):
    if "\\.git\\" in path: continue
    for name in files:
        # if name == "index.html":
        try:
            this_file = os.path.join(path, name)
            print(this_file)
            hashMe(this_file)
        except: pass
           

# os.system('git add . && git commit -m "Updated" && git push')

print("Closing this window in 3 secounds...")
time.sleep(3)
