import React, { useState } from "react";
import './front.css';

function Front() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/t20`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year: input }) // Send input as year
            });
            if (!response.ok) {
                throw new Error('Unable to fetch T20 points table, try again');
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching T20 points table:', error);
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
                        <p>Group: {team[0]}</p>
                        <p>Rank: {team[1]}</p>
                        <p>Team Name: {team[2]}</p>
                        <p>Points: {team[3]}</p>
                        <p>Matches Played: {team[4]}</p>
                        <p>Matches Won: {team[5]}</p>
                        <p>Matches Lost: {team[6]}</p>
                        <p>Matches Tied: {team[7]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Front;
