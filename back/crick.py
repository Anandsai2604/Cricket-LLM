# import requests
# from bs4 import BeautifulSoup
# import sys

# def get_player_lists():
#     url = "https://www.cricbuzz.com/cricket-stats/icc-rankings/men/batting"
#     r = requests.get(url)
#     soup = BeautifulSoup(r.content, 'html.parser')
#     rows = soup.find_all(class_='cb-col cb-col-100 cb-font-14 cb-lst-itm text-center')

#     # Dictionaries to store players for each category
#     test_players = {}
#     t20_players = {}
#     odi_players = {}
#     s = []

#     for i in rows:
#         # Extracting player details
#         p = str(i.find(class_='cb-col cb-col-16 cb-rank-tbl cb-font-16').text.strip())
#         n = i.find(class_='cb-col cb-col-67 cb-rank-plyr').a.text.strip()
#         x = i.find(class_='cb-font-12 text-gray').text.strip()
#         r = i.find(class_='cb-col cb-col-17 cb-rank-tbl pull-right').text.strip()

#         s.append((p, n, x, r))

#     for i in range(92):
#         test_players[s[i][0]] = {"Name": s[i][1], "Nationality": s[i][2], "Rating": s[i][3]}
#     for i in range(92, 189):
#         odi_players[s[i][0]] = {"Name": s[i][1], "Nationality": s[i][2], "Rating": s[i][3]}
#     for i in range(189, 282):
#         t20_players[s[i][0]] = {"Name": s[i][1], "Nationality": s[i][2], "Rating": s[i][3]}
    
#     return test_players, t20_players, odi_players

# if __name__ == "__main__":
#     test_players, t20_players, odi_players = get_player_lists()

#     if len(sys.argv) < 2:
#         print("Usage: python script_name.py [test|t20|odi]")
#         sys.exit(1)

#     choice = sys.argv[1].lower()

#     if choice == 'test':
#         sorted_test_players = dict(sorted(test_players.items()))
#         print(sorted_test_players)
#     elif choice == 't20':
#         sorted_t20_players = dict(sorted(t20_players.items()))
#         print(sorted_t20_players)
#     elif choice == 'odi':
#         sorted_odi_players = dict(sorted(odi_players.items()))
#         print(sorted_odi_players)
#     else:
#         print("Invalid input. Please enter 'test', 't20', or 'odi'.")
# import requests
# from bs4 import BeautifulSoup
# import json
# import sys

# def get_player_lists(format):
#     url = "https://www.cricbuzz.com/cricket-stats/icc-rankings/men/batting"
#     r = requests.get(url)
#     soup = BeautifulSoup(r.content, 'html.parser')
#     rows = soup.find_all(class_='cb-col cb-col-100 cb-font-14 cb-lst-itm text-center')

#     # Lists to store player details
#     players = []

#     for i in rows:
#         # Extracting player details
#         position = i.find(class_='cb-col cb-col-16 cb-rank-tbl cb-font-16').text.strip()
#         name = i.find(class_='cb-col cb-col-67 cb-rank-plyr').a.text.strip()
#         nationality = i.find(class_='cb-font-12 text-gray').text.strip()
#         rating = i.find(class_='cb-col cb-col-17 cb-rank-tbl pull-right').text.strip()

#         # Creating a dictionary for each player
#         player = {
#             "Position": position,
#             "Name": name,
#             "Nationality": nationality,
#             "Rating": rating
#         }
        
#         players.append(player)

#     if format == 'test':
#         return [player for player in players[:92]]
#     elif format == 'odi':
#         return [player for player in players[92:189]]
#     elif format == 't20':
#         return [player for player in players[189:282]]
#     else:
#         print("Invalid input. Please enter 'test', 't20', or 'odi'.")
#         sys.exit(1)

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print("Usage: python script_name.py [test|t20|odi]")
#         sys.exit(1)

#     format = sys.argv[1].lower()

#     players = get_player_lists(format)
    
#     # Convert the list of dictionaries to JSON
#     json_data = json.dumps(players)

#     # Print the JSON data
#     print(json_data)
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