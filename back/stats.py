import json
import requests
from bs4 import BeautifulSoup
import sys
from io import BytesIO
from PIL import Image
def scrape_player_stats(player_name):
    player_urls = {
        "VIRAT KOHLI": "https://www.espncricinfo.com/cricketers/virat-kohli-253802/bowling-batting-stats",
        "ROHIT SHARMA": "https://www.espncricinfo.com/cricketers/rohit-sharma-34102/bowling-batting-stats",
        "SACHIN TENDULKAR": "https://www.espncricinfo.com/cricketers/sachin-tendulkar-35320/bowling-batting-stats",
        "SHIKHAR DHAWAN": "https://www.espncricinfo.com/cricketers/shikhar-dhawan-28235/bowling-batting-stats",
        "MS DHONI": "https://www.espncricinfo.com/cricketers/ms-dhoni-28081/bowling-batting-stats",
        "JASPRIT BUMRA": "https://www.espncricinfo.com/cricketers/jasprit-bumrah-625383/bowling-batting-stats",
        "RAVICHANDRAN ASHVIN":"https://www.espncricinfo.com/cricketers/ravichandran-ashwin-26421/bowling-batting-stats"
    }
    # i_url ={
    #     "SACHIN TENDULAR": "https://en.wikipedia.org/wiki/File:Sachin-Tendulkar_(cropped).jpg",
    #     "ROHIT SHARMA":'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Rohit_Gurunath_Sharma.jpg/330px-Rohit_Gurunath_Sharma.jpg',
    #     "VIRAT KOHLI": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg/330px-Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"
    # }
    
    if player_name.upper() not in player_urls:
        return {"error": f"Invalid player name. Please provide one of the following: {', '.join(player_urls.keys())}"}

    url = player_urls[player_name.upper()]

    try:
        response = requests.get(url)
    
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            para_divs = soup.find_all("p", class_="ds-text-title-subtle-s ds-font-medium ds-py-2 ds-ml-4 ds-text-typo ds-capitalize")
            table_divs = soup.find_all("table", class_="ds-w-full ds-table ds-table-md ds-table-bordered ds-border-collapse ds-border ds-border-line ds-table-auto ds-overflow-scroll")

            data = []
            
            if para_divs and table_divs:
                for para_div, table_div in zip(para_divs, table_divs):
                    paragraph = para_div.text.strip()
                    table_data = []

                    rows = table_div.find_all("tr")
                    for row in rows:
                        columns = row.find_all(["th", "td"])
                        column_texts = [col.text.strip() for col in columns]
                        table_data.append(column_texts)
                    data.append({"name": player_name.upper()})
                    data.append({"paragraph": paragraph, "table": table_data})

                return data
            else:
                return {"error": "Failed to parse player stats."}
        else:
            return {"error": f"Failed to fetch player stats. Status code: {response.status_code}"}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No player name provided."}))
        sys.exit(1)

    player_name = ' '.join(sys.argv[1:])
    stats_data = scrape_player_stats(player_name)
    print(json.dumps(stats_data))
