import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './front1.css';

const App = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/news');
        setNews(response.data); // Assuming response.data is an array of news items
        console.log('News fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <button onClick={() => navigate(`/ipl`)}>IPL Points Table</button>
        <button onClick={() => navigate(`/worldcup`)}>World Cups Points Table</button>
        <button onClick={() => navigate(`/front/${localStorage.getItem('username')}`)}>Chat with AI</button>
        <button onClick={() => navigate(`/stats`)}>Stats</button>
        <button onClick={() => navigate(`/front1/${localStorage.getItem('username')}`)}>Go to MAIN PAGE</button>
      </header>
      <main className="main-content">
        <h1>Latest News</h1>
        <div className="news-container">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div key={index} className="news-item">
                <img src={item.image_source} alt={item.title} className="news-image" />
                <div className="news-content">
                  <h2><a href={item.link}>{item.title}</a></h2>
                  <p className="news-date">{item.date}</p>
                  <p className="news-summary">{item.summary}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
