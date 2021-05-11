import requests

with open("static/css/style.scss", "r", encoding="utf-8") as in_file:
    with open("static/css/style.css", "w", encoding="utf-8") as out_file:
        out_file.write(
            requests.post(
                url='https://jsonformatter.org/service/scssTocss',
                data={'css':in_file.read()}
            ).text
        )