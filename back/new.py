import requests
from bs4 import BeautifulSoup
import json

def extract_news():
    url = 'https://indianexpress.com/section/sports/cricket/'
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    news = []

    div = soup.find_all('div',class_ = 'articles')
    news = []
    news.append("Latest News")
    for article in div:
        link_tag = article.find('a')
        link = link_tag['href']
        
        img_tag = article.find('img')
        img_src = img_tag['data-src']
        
        title_tag = article.find('h2', class_='title').find('a')
        title = title_tag['title']
        
        date_tag = article.find('div', class_='date')
        date = date_tag.text
        
        summary_tag = article.find('p')
        summary = summary_tag.text
        
        news.append({
            "title": title,
            "link": link,
            "image_source": img_src,
            "date": date,
            "summary": summary
        })
    
    return news

if __name__ == "__main__":
    extracted_news = extract_news()
    try:
        print(json.dumps(extracted_news))
    except Exception as e:
        print("Error creating JSON:", str(e))
