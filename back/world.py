import requests
from bs4 import BeautifulSoup
import json
import sys

# Dictionary of URLs for different years
d = {
    '1975': "https://www.espncricinfo.com/series/prudential-world-cup-1975-60793/points-table-standings",
    '1979': "https://www.espncricinfo.com/series/prudential-world-cup-1979-60806/points-table-standings",
    '1983': "https://www.espncricinfo.com/series/prudential-world-cup-1983-60832/points-table-standings",
    '1987': "https://www.espncricinfo.com/series/reliance-world-cup-1987-88-60876/points-table-standings",
    '1992': "https://www.espncricinfo.com/series/benson-hedges-world-cup-1991-92-60924/points-table-standings",
    '1996': "https://www.espncricinfo.com/series/wills-world-cup-1995-96-60981/points-table-standings",
    '1999': "https://www.espncricinfo.com/series/icc-world-cup-1999-61046/points-table-standings",
    '2003': "https://www.espncricinfo.com/series/icc-world-cup-2002-03-61124/points-table-standings",
    '2007': "https://www.espncricinfo.com/series/icc-world-cup-2006-07-125929/points-table-standings",
    '2011': "https://www.espncricinfo.com/series/icc-cricket-world-cup-2010-11-381449/points-table-standings",
    '2015': "https://www.espncricinfo.com/series/icc-cricket-world-cup-2014-15-509587/points-table-standings",
    '2019': "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/points-table-standings",
    '2023': "https://www.espncricinfo.com/series/icc-cricket-world-cup-2023-24-1367856/points-table-standings"
}

# Dictionary of winners for each year
winners = {
    1975: "West Indies",
    1979: "West Indies",
    1983: "India",
    1987: "Australia",
    1992: "Pakistan",
    1996: "Sri Lanka",
    1999: "Australia",
    2003: "Australia",
    2007: "Australia",
    2011: "India",
    2015: "Australia",
    2019: "England",
    2023: "Australia"
}

# Check if the year argument is provided and valid
if len(sys.argv) < 2 or sys.argv[1] not in d:
    print("Invalid or missing year argument.")
    sys.exit(1)

year = sys.argv[1]
url = d[year]

# Fetch the webpage content
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
