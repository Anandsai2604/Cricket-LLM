import requests
from bs4 import BeautifulSoup
import json
import sys

d = {
    "2024": "https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2024-1411166/points-table-standings",
    "2022": "https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2022-23-1298134/points-table-standings",
    "2021": "https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2021-22-1267897/points-table-standings",
    "2015": "https://www.espncricinfo.com/series/world-t20-2015-16-901359/points-table-standings",
    "2013": "https://www.espncricinfo.com/series/world-t20-2013-14-628368/points-table-standings",
    "2012": "https://www.espncricinfo.com/series/icc-world-twenty20-2012-13-531597/points-table-standings",
    "2010": "https://www.espncricinfo.com/series/icc-world-twenty20-2010-412671/points-table-standings",
    "2009": "https://www.espncricinfo.com/series/icc-world-twenty20-2009-335113/points-table-standings",
    "2007": "https://www.espncricinfo.com/series/icc-world-twenty20-2007-08-286109/points-table-standings",
}

winners = {
    2007: 'India',
    2009: 'Pakistan',
    2010: 'England',
    2012: 'West Indies',
    2014: 'Sri Lanka',
    2016: 'West Indies',
    2021: 'Australia',
    2022: 'England'
}

if len(sys.argv) < 2 or sys.argv[1] not in d:
    print("Invalid or missing year argument.")
    sys.exit(1)

year = sys.argv[1]
url = d[year]

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    rows = soup.find_all('tr', class_='ds-text-tight-s ds-text-typo-mid2')

    points_table = []
    for row in rows:
        rank = row.find('span', class_='ds-text-tight-xs ds-font-bold ds-w-[14px]').text.strip()
        team_name = row.find('span', class_='ds-text-tight-s ds-font-bold ds-uppercase ds-text-left ds-text-typo').text.strip()
        points = row.find('td', class_='ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-font-bold ds-text-typo').text.strip()
        td_elements = row.find_all('td', class_='ds-w-0 ds-whitespace-nowrap ds-min-w-max')
        m = td_elements[0].text.strip()
        w = td_elements[1].text.strip()
        l = td_elements[2].text.strip()
        t = td_elements[3].text.strip()
        
        points_table.append({
            "rank": rank,
            "team_name": team_name,
            "points": points,
            "matches": m,
            "win": w,
            "lose": l,
            "tie": t,
            "winner": winners[int(year)]  
        })
    

    try:
        print(json.dumps(points_table))
    except Exception as e:
        print("Error creating JSON:", str(e))

else:
    print("Failed to retrieve data from the URL.")
