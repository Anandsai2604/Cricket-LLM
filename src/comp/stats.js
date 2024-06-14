import React, { useState } from "react";

function Stats() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchStats = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: input }) // Send input as player name
            });
            if (!response.ok) {
                throw new Error('Unable to fetch player stats, try again');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching player stats:', error);
        }
    };

    return (
        <div className="chat-container">
            <button className="clear-button" onClick={() => setMessages([])}>Clear Chat</button>

            <input
                type="text"
                placeholder="Enter player name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={fetchStats}>Fetch Player Stats</button>

            <div className="message-container">
                {messages.map((stat, index) => (
                    <div key={index} className="player-stats">
                        <p>Player Name: {stat.player_name}</p>
                        <p>Stat Type: {stat.stat_type}</p>
                        <p>Year: {stat.year}</p>
                        {/* Add more player stat details here as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stats;
