import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import './front.css';

function Front() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchIPLData = async (year) => {
        try {
            const response = await fetch('http://localhost:5000/api/scrapeIPLScorecard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year })
            });

            if (!response.ok) {
                throw new Error('Unable to fetch IPL scorecard, try again');
            }

            const scorecardData = await response.json();
            return scorecardData;
        } catch (error) {
            console.error('Error fetching IPL scorecard:', error);
            throw error;
        }
    };

    const fetchWorldCupData = async (year) => {
        try {
            const response = await fetch('http://localhost:5000/api/worldcup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year })
            });

            if (!response.ok) {
                throw new Error('Unable to fetch World Cup scorecard, try again');
            }

            const scorecardData = await response.json();
            return scorecardData;
        } catch (error) {
            console.error('Error fetching World Cup scorecard:', error);
            throw error;
        }
    };

    const fetcht20World =async (year) => {
        try{
            const response = await fetch('http://localhost:5000/api/t20',{
                method : 'POST',
                headers:{
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({year})
            });

            if(!response.ok){
                throw new Error('Unable to fetch t20 world cup detailes, try again');
            }
            const scorecardData = await response.json();
            return scorecardData;
        }catch(error)
        {
            console.error('Error fetching details: ',error);
            throw error;
        }
    };
    

    const sendMessage = async () => {
        try {
            const firstWord = input.split(' ')[0].toLowerCase();
            
            if (firstWord === 'ipl') {
                const regexIPL = /ipl(?:\s+points\s+table|.+)?\s+(\d{4})/i;

                const matchIPL = input.match(regexIPL);
                if (matchIPL) {
                    const year = matchIPL[1];
                    const scorecardData = await fetchIPLData(year);
                    renderScorecard(scorecardData);
                }
            } else if(firstWord === 'world') {
                const regexWorldCup = /(?:world\s?cup|50\s?overs|odi\s?worldcup)(?:\s+points\s+table|.+)?\s+(\d{4})/i;

                const matchWorldCup = input.match(regexWorldCup);
                if (matchWorldCup) {
                    const year = matchWorldCup[1];
                    const scorecardData = await fetchWorldCupData(year);
                    renderScorecard(scorecardData);
                }
            }
            else{
                const regext20Cup = /(?:t20\s?world\s?cup|20\s?overs|t20\s?worldcup)(?:\s+points\s+table|.+)?\s+(\d{4})/i;
                
                const matcht20 = input.match(regext20Cup);
                if (matcht20) {
                    const year = matcht20[1];
                    const scorecardData = await fetcht20World(year);
                    renderScorecard(scorecardData);
                    console.log(scorecardData);
                }
            }
        }
        catch (error) {
            console.error('Error fetching scorecard:', error);
            setMessages(prevMessages => [...prevMessages, { sender: 'Combined', text: `Error fetching scorecard: ${error.message}` }]);
        }
    };
    

    const renderScorecard = (scorecardData) => {
        const formattedTable = (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Matches Played</th>
                            <th>Matches Won</th>
                            <th>Matches Lost</th>
                            {scorecardData[0].hasOwnProperty('Group') && <th>Group</th>}
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorecardData.map((team, index) => (
                            <tr key={index}>
                                <td>{team.team_name}</td>
                                <td>{team.matches}</td>
                                <td>{team.win}</td>
                                <td>{team.lose}</td>
                                {team.hasOwnProperty('Group') && <td>{team.Group}</td>}
                                <td>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    
        const tableString = ReactDOMServer.renderToString(formattedTable);
        const finalMessage = `You: ${input} <br /><br />CricketGPT: ${tableString}`;
    
        setMessages(prevMessages => [...prevMessages, { sender: 'Combined', text: finalMessage }]);
    };
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="chat-container">
            <button className="clear-button" onClick={clearChat}>Clear Chat</button>

            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'You' ? 'user-message' : 'gpt-message'}`}>
                        {message.text && <div dangerouslySetInnerHTML={{ __html: message.text }}></div>}
                    </div>
                ))}
            </div>

            <div className="typing-container">
                <div className="typing-content">
                    <div className="typing-textarea">
                        <textarea
                            id="chat-input"
                            spellCheck="false"
                            placeholder="Enter your query...."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <button id="send-btn" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Front;
