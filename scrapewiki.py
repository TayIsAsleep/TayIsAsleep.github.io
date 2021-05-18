# Import required modules
from lxml import html
import requests
import re




def get_fact():
    while 1:
        response = requests.get('https://en.wikipedia.org/wiki/Special:Random')
        tree = html.fromstring(response.content)

        main_text = tree.xpath(f'//*[@id="mw-content-text"]/div[1]/p[not(@id) and not(@class)][1]')[0]
        complete_text = main_text.text if main_text.text != None else ""
        complete_text += ''.join(
            [
                str(html.tostring(child), "utf-8") 
                for child in 
                main_text.iterchildren() if child != None
            ]
        )
        complete_text = re.split(r'(?<=.\. [A-Z])(?!.*</b>)', complete_text)[0].strip("\n")[:-3] + "." # Grabs only the first sentence

        complete_text = re.sub('\<.*?\>', '', complete_text) # Removes HTML tags
        complete_text = re.sub('\&\#.*?\;', '', complete_text) # Removes HTML escape codes
        complete_text = re.sub('\[.*?\]', '', complete_text) # Removes quotes
        complete_text = re.sub('\(.*?\)', '', complete_text) # Removes Bracketed things
        complete_text = complete_text.replace("  ", " ") # Removes any double spacings and makes them into normal spaces

        

        # Special Case for:
        # https://en.wikipedia.org/wiki/Camponotus_sericeiventris
        # Camponotus sericeiventris, the shimmering golden sugar ant, is a species of camponotine ant in the family Formicidae..
        if complete_text.endswith(".."):
            complete_text = complete_text[:-1]

        # Special Case for:
        # https://en.wikipedia.org/wiki/Quinquagesima
        # Quinquagesima , in the Western Christian Churches, is the last Sunday of Shrovetide, being the Sunday before Ash Wednesday.
        complete_text = complete_text.replace(" , ", ", ")

        # Special Case for:
        # https://en.wikipedia.org/wiki/2006%E2%80%9307_Danish_Cup
        # The 200607 Danish Cup was the 53rd version of the Danish Cup.
        complete_text = complete_text.replace("–", "-")

        if len(complete_text) < 10:
            continue
        return {
            'url':response.url,
            'fact':complete_text
        }

while 1:
    fact = get_fact()
    print(f"\n{fact['url']}\n{fact['fact']}")
