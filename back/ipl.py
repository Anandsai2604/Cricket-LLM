import requests
from bs4 import BeautifulSoup
import json
import sys

# URLs for different IPL seasons
ipl_urls = {
    '2023': "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/points-table-standings",
    '2024': "https://www.espncricinfo.com/series/indian-premier-league-2024-1410320/points-table-standings",
    '2022': "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/points-table-standings",
    '2021': "https://www.espncricinfo.com/series/ipl-2021-1249214/points-table-standings",
    '2020': "https://www.espncricinfo.com/series/ipl-2020-21-1210595/points-table-standings",
    '2019': "https://www.espncricinfo.com/series/ipl-2019-1165643/points-table-standings",
    '2018': "https://www.espncricinfo.com/series/ipl-2018-1131611/points-table-standings",
    '2017': "https://www.espncricinfo.com/series/ipl-2017-1078425/points-table-standings",
    '2016': "https://www.espncricinfo.com/series/ipl-2016-968923/points-table-standings",
    '2015': "https://www.espncricinfo.com/series/pepsi-indian-premier-league-2015-791129/points-table-standings",
    '2014': "https://www.espncricinfo.com/series/pepsi-indian-premier-league-2014-695871/points-table-standings",
    '2013': "https://www.espncricinfo.com/series/indian-premier-league-2013-586733/points-table-standings",
    '2012': "https://www.espncricinfo.com/series/indian-premier-league-2012-520932/points-table-standings",
    '2011': "https://www.espncricinfo.com/series/indian-premier-league-2011-466304/points-table-standings",
    '2010': "https://www.espncricinfo.com/series/indian-premier-league-2009-10-418064/points-table-standings",
    '2009': "https://www.espncricinfo.com/series/indian-premier-league-2009-374163/points-table-standings",
    '2008': "https://www.espncricinfo.com/series/indian-premier-league-2007-08-313494/points-table-standings"
}

# Winners of different IPL seasons
ipl_winners = {
    '2008': "Rajasthan Royals", '2009': "Deccan Chargers", '2010': "Chennai Super Kings",
    '2011': "Chennai Super Kings", '2012': "Kolkata Knight Riders", '2013': "Mumbai Indians",
    '2014': "Kolkata Knight Riders", '2015': "Mumbai Indians", '2016': "Sunrisers Hyderabad",
    '2017': "Mumbai Indians", '2018': "Chennai Super Kings", '2019': "Mumbai Indians",
    '2020': "Mumbai Indians", "2021": "Chennai Super Kings", '2022': "Gujarat Titans", '2023': "Chennai Super Kings",
    '2024': "Royal Challengers Bengaluru"
}

# Check if the year is provided as an argument
if len(sys.argv) < 2 or sys.argv[1] not in ipl_urls:
    print("Invalid or missing year argument.")
    sys.exit(1)

year = sys.argv[1]
url = ipl_urls[year]

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    rows = soup.find_all('tr', class_='ds-text-tight-s ds-text-typo-mid2')

    points_table = []
    for row in rows:
        rank = row.find('span', class_='ds-text-tight-xs ds-font-bold ds-w-[14px]').text.strip()
        team_name = row.find('span', class_='ds-text-tight-s ds-font-bold ds-uppercase ds-text-left ds-text-typo').text.strip()
        points = row.find('td', class_='ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-font-bold ds-text-typo').text.strip()
        win = row.find('td', class_='ds-w-0 ds-whitespace-nowrap ds-min-w-max').text.strip()
        td_elements = row.find_all('td', class_='ds-w-0 ds-whitespace-nowrap ds-min-w-max')
        m = td_elements[0].text.strip()
        l = td_elements[1].text.strip()
        w = td_elements[2].text.strip()
        t = td_elements[3].text.strip()
        points_table.append({
            "rank": rank,
            "team_name": team_name,
            "points": points,
            "matches": m,
            "win": w,
            "lose": l,
            "tie": t,
            "winner": ipl_winners[year]  
        })
    

    try:
        print(json.dumps(points_table))
    except Exception as e:
        print("Error creating JSON:", str(e))

else:
    print("Failed to retrieve data from the URL.")
