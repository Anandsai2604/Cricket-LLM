import React, { useState } from "react";
import './front.css';

function Front() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/worldcup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year: input })
            });
            if (!response.ok) {
                throw new Error('Unable to fetch World Cup points table, try again');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching World Cup points table:', error);
        }
    };

    return (
        <div className="chat-container">
            <button className="clear-button" onClick={() => setMessages([])}>Clear Chat</button>

            <input
                type="text"
                placeholder="Enter year"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={fetchData}>Fetch Points Table</button>

            <div className="message-container">
                {messages.map((team, index) => (
                    <div key={index} className="team-details">
                        <p>Team Name: {team.name}</p>
                        <p>Matches Played: {team.matchesPlayed}</p>
                        <p>Matches Won: {team.matchesLost}</p>
                        <p>Matches Lost: {team.matchesWon}</p>
                        <p>Matches Tied: {team.matchesTied}</p>
                        <p>Points: {team.points}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Front;
