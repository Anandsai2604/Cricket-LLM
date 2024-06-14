import React, { useState } from "react";
import './front.css';

function Front() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/iplPointsTable/${input}`);
            if (!response.ok) {
                throw new Error('Unable to fetch IPL points table, try again');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching IPL points table:', error);
        }
    };

    return (
        <div>
        <div className="chat-container">
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
                        <p>Matches Won: {team.matchesWon}</p>
                        <p>Matches Lost: {team.matchesLost}</p>
                        <p>Matches Tied: {team.matchesTied}</p>
                        <p>Points: {team.points}</p>
                    </div>
                ))}
            </div>
        </div>
        
    </div>
    );
}

export default Front;
