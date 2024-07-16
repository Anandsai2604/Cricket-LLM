import requests
from bs4 import BeautifulSoup
import sys
import json

with open("player_profiles1.json", "r") as f:
    player_urls = json.load(f)

def scrape_player_stats(player_name):
    player_name_lower = player_name.lower()
    if player_name_lower not in player_urls:
        print('Invalid player name. Please provide one of the following:', ', '.join(player_urls.keys()))
        return

    # Get the URL for the player
    url = player_urls[player_name_lower]

    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = []
            soup = BeautifulSoup(response.content, 'html.parser')
            image_src = None
            image_tag = soup.find("img", alt=player_name)
            if image_tag and "src" in image_tag.attrs:
                image_src = image_tag["src"]
            if image_src:
                data.append({"Image": image_src})
            else:
                data.append({"Image": "https://static.vecteezy.com/system/resources/previews/002/387/693/large_2x/user-profile-icon-free-vector.jpg"})

            player_full = soup.find_all("span", class_="ds-text-title-s ds-font-bold ds-text-typo")
            player_tags = soup.find_all("p", class_="ds-text-tight-m ds-font-regular ds-uppercase ds-text-typo-mid3")
            details = {}
            my_list = []
            for i in player_tags:
                my_list.append(i.text.strip())
            for j in player_full:
                details[my_list[0]] = j.text.strip()
                my_list.pop(0)
            para_divs = soup.find_all("p", class_="ds-text-title-subtle-s ds-font-medium ds-py-2 ds-ml-4 ds-text-typo ds-capitalize")
            table_divs = soup.find_all("table", class_="ds-w-full ds-table ds-table-md ds-table-bordered ds-border-collapse ds-border ds-border-line ds-table-auto ds-overflow-scroll")
            data.append(details)
            if para_divs and table_divs:
                for para_div, table_div in zip(para_divs, table_divs):
                    data.append({"paragraph": para_div.text.strip()})
                    table_data = []
                    rows = table_div.find_all("tr")
                    for row in rows:
                        columns = row.find_all(["th", "td"])
                        column_texts = [col.text.strip() for col in columns]
                        table_data.append(column_texts)
                    data.append({"table": table_data})
                print(json.dumps(data, indent=4))
        else:
            print("Failed to fetch the page. Status code:", response.status_code)
    except Exception as e:
        print(f"An error occurred: {e}")
        print(f"No data available for player: {player_name}")

if len(sys.argv) < 2:
    print('Please provide the name of the player as an argument.')
    sys.exit(1)

player_name = ' '.join(sys.argv[1:])

scrape_player_stats(player_name)
