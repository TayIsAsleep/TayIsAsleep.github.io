import re
import random
import os
import time

def hashMe(fn, filetypes_to_include=("css","js","json","html","png")):
    search_regex = f'(?:")(((?:\.|\w|\/)*\.(?:{"|".join(filetypes_to_include)}))(?:\?.*)?)(?:")'
    changes = 0
    with open(fn,"r") as f:
        in_ = f.read()
        out_ = in_

        for match in re.findall(search_regex, in_):
            old_url = match[0]

            re_uri = re.findall('(?:\?)(.*=.*)', old_url)

            if re_uri == []:
                re_uri = ""
            else:
                re_uri = re_uri[0].split("&")
                re_uri = "&".join(x for x in re_uri if not x.startswith("random="))

            random_uri = f'random={"".join(str(random.randint(0,9)) for x in range(10))}'

            if re_uri == "":
                re_uri = f"?{random_uri}"
            else:
                re_uri = f"?{re_uri}&{random_uri}"

            new_url = match[1] + re_uri
            
            out_ = out_.replace(old_url, new_url)
            changes += 1

    if in_ != out_:
        with open(fn,"w") as f:
            f.write(out_)
    return changes
        

for path, subdirs, files in os.walk(os.getcwd()):
    if "\\.git\\" in path: continue
    for name in files:
        if not name in ("upload.py","apps.json"):
            try:
                this_file = os.path.join(path, name)
                print(f"{hashMe(this_file)} url's hashed in file \"{this_file}\"")
                
            except UnicodeDecodeError: 
                pass
           

# os.system('git add . && git commit -m "Updated" && git push')

# print("Closing this window in 3 secounds...")
# time.sleep(3)
