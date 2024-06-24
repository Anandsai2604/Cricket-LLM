import requests
from bs4 import BeautifulSoup
import json
import sys

def get_player_lists(format):
    url = "https://www.cricbuzz.com/cricket-stats/icc-rankings/men/batting"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    rows = soup.find_all(class_='cb-col cb-col-100 cb-font-14 cb-lst-itm text-center')

    players = []

    for i in rows:
        position = i.find(class_='cb-col cb-col-16 cb-rank-tbl cb-font-16').text.strip()
        name = i.find(class_='cb-col cb-col-67 cb-rank-plyr').a.text.strip()
        nationality = i.find(class_='cb-font-12 text-gray').text.strip()
        rating = i.find(class_='cb-col cb-col-17 cb-rank-tbl pull-right').text.strip()

        player = {
            "Position": position,
            "Name": name,
            "Nationality": nationality,
            "Rating": rating
        }
        players.append(player)

    test_players = players[:92]  
    odi_players = players[92:189]  
    t20_players = players[189:282]  

    if format == 'test':
        return ["test"] + test_players
    elif format == 'odi':
        return ["odi"] + odi_players
    elif format == 't20':
        return ["t20"] + t20_players
    else:
        return ["invalid"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script_name.py [test|t20|odi]")
        sys.exit(1)

    format = sys.argv[1].lower()

    players = get_player_lists(format)
    
    json_data = json.dumps(players, indent=4)

    print(json_data)
