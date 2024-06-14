import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
// import ReactPlayer from 'react-player';
import './front.css';
import axios from 'axios';
import viratKohliImage from './virat.jpeg';
import RohitImage from './rohit.jpeg'
import SachinImage from './sachin.jpeg'
import Shikarimage from './shikar.jpeg'
import MSDImage from './msd.jpeg';
import BumraImage from './bumra.jpeg';
import AshvinImage from './ashvin.jpeg';
// // import { Player } from 'video-react';
// import 'video-react/dist/video-react.css';
// import Plyr from 'plyr';
import 'plyr/dist/plyr.css';


function Front() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const fetchIPLData = async (year) => {
        try {
            const response = await axios.post('http://localhost:5000/api/scrapeIPLScorecard', { year });
    
            if (!response.data) {
                throw new Error('Unable to fetch IPL scorecard, try again');
            }
    
            const scorecardData = response.data;
            console.log(scorecardData);
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

    const fetchT20WorldData = async (year) => {
        try {
            const response = await axios.post('http://localhost:5000/api/t20', { year });
    
            if (!response.data) {
                throw new Error('Unable to fetch T20 World Cup details, try again');
            }
    
            const scorecardData = response.data;
            console.log(scorecardData);
            return scorecardData;
        } catch (error) {
            console.error('Error fetching T20 World Cup details:', error);
            throw error;
        }
    };

    const fetchStats = async (playerName) => {
        try {
            const response = await axios.post('http://localhost:5000/api/stats', {
                name: playerName
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching player stats:', error.message);
            throw new Error('Failed to fetch player stats');
        }
    };

    const fetchRag = async (query) => {
        try {
            const response = await axios.post('http://localhost:5000/api/rag', {
                question: query
                
            });
            console.log(query);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching scorecard:', error);
            throw new Error('Failed to fetch scorecard');
        }
    };

    const fetchCrick = async (format) => {
        try {
            const response = await axios.post('http://localhost:5000/api/crick', {
                format: format // Ensure the key matches what the backend expects
            });
            console.log('Format sent:', format);
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching positions:', error);
            throw new Error("failed");
        }
    };
    
    const fetchVideo = async (name) => {
        try {
            const response = await axios.post('http://localhost:5000/api/video', {
                name: name
            });
            console.log('Format sent:', name);
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching positions:', error);
            throw new Error("failed");
        }
    };
    // const VideoPlayer = ({ url }) => {
    //     const playerRef = React.useRef(null);
    
    //     React.useEffect(() => {
    //         const player = new Plyr(playerRef.current);
    //         return () => {
    //             player.destroy();
    //         };
    //     }, []);
    
    //     return (
    //         <div>
    //             <video ref={playerRef} playsInline controls>
    //                 <source src={url} type="video/mp4" />
    //             </video>
    //         </div>
    //     );
    // };
    // const VideoPlayer = ({ url }) => {
    //     const playerRef = React.useRef(null);
    
    //     React.useEffect(() => {
    //         const player = new Plyr(playerRef.current);
    //         return () => {
    //             player.destroy();
    //         };
    //     }, []);
    
    //     return (
    //         <div>
    //             <video ref={playerRef} playsInline controls>
    //                 <source src={url} type="video/mp4" />
    //             </video>
    //         </div>
    //     );
    // };
    

    const sendMessage = async () => {
        // console.log('sendMessage function is being called...');
        try {
            const firstWord = input.split(' ')[0].toLowerCase();
            console.log(firstWord);
            console.log('sendMessage function is being called...');
            if (firstWord === 'ipl') {
                const regexIPL = /ipl(?:\s+points\s+table|.+)?\s+(\d{4})/i;
                const matchIPL = input.match(regexIPL);
                if (matchIPL) {
                    const year = matchIPL[1];
                    // console.log('sendMessage function is being called...');
                    const scorecardData = await fetchIPLData(year);
                    renderScorecard(scorecardData);
                }
            } else if (firstWord === 'world') {
                const regexWorldCup = /(?:world\s?cup|50\s?overs|odi\s?worldcup)(?:\s+points\s+table|.+)?\s+(\d{4})/i;
    
                const matchWorldCup = input.match(regexWorldCup);
                if (matchWorldCup) {
                    const year = matchWorldCup[1];
                    const scorecardData = await fetchWorldCupData(year);
                    renderScorecard(scorecardData);
                }
    
            } else if (firstWord === 't20') {
                const regext20Cup = /(?:t20\s?world\s?cup|20\s?overs|t20\s?worldcup)(?:\s+points\s+table|.+)?\s+(\d{4})/i;
                const matcht20 = input.match(regext20Cup);
                if (matcht20) {
                    const year = matcht20[1];
                    const scorecardData = await fetchT20WorldData(year);
                    renderScorecard(scorecardData);
                }
            } else if (firstWord === "stats") {
                try {
                    const playerName = input.slice(9).trim(); 
    
                    if (playerName) {
                        console.log('Sending request to backend for:', playerName);
    
                        try {
                            const statsData = await fetchStats(playerName.toLowerCase());
                            console.log('Response from backend:', statsData);
    
                            if (statsData) {
                                renderScorecard(statsData);
                            } else {
                                throw new Error('No stats data returned from backend.');
                            }
                        } catch (fetchError) {
                            console.error('Error during fetch operation:', fetchError);
                            setMessages(prevMessages => [
                                ...prevMessages,
                                { sender: 'Combined', text: `Error fetching scorecard: ${fetchError.message}` }
                            ]);
                        }
                    }
                } catch (error) {
                    console.error('Error sending message:', error);
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'Combined', text: `Error sending message: ${error.message}` }
                    ]);
                }
            }else if (firstWord === "ratings") {
            try {
                const format = input.slice(11).trim();
                console.log(format); 
                if (format) {
                    console.log("Sending format:", format);
                    const statsData = await fetchCrick(format);
                    console.log('Response from backend:', statsData);

                    if (statsData) {
                        renderScorecard(statsData);
                    } else {
                        throw new Error('No stats data returned from backend.');
                    }
                }
            } catch (error) {
                console.error('Error processing request:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'Combined', text: `Error processing request: ${error.message}` }
                ]);
            }
        }
        else if (firstWord === "video") {
            const format = input.slice(8).trim();
            console.log('Video query:', format);  // Log the query
            if (format) {
                try {
                    const videoData = await fetchVideo(format);
                    console.log('Video data:', videoData);  // Log the data received
                    if (videoData) {
                        renderScorecard(videoData);
                    } else {
                        throw new Error("No video found.");
                    }
                } catch (error) {
                    console.error('Error processing request:', error);
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'Combined', text: `Error processing request: ${error.message}` }
                    ]);
                }
            }
        }
             else {
                
                try {
                    const response = await fetchRag(input);
                    console.log(response);
                    if (response && response.result) {
                        renderScorecard(response);
                    } else {
                        // If response doesn't contain a result, handle accordingly
                        console.log('No result found for the query:', input);
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { sender: 'Combined', text: `No result found for the query: ${input}` }
                        ]);
                    }
                } catch (error) {
                    console.error('Error fetching response:', error);
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { sender: 'Combined', text: `Error fetching response: ${error.message}` }
                    ]);
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'Combined', text: `Error sending message: ${error.message}` }
            ]);
        }
    };


    const renderScorecard = (data) => {
        let formattedData;
        if (data.url) {  
            
            // const videoId = data.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            // const thumbnailUrl = `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;

            // // const videoUrl = `https://www.youtube.com/watch?v=${videoId[1]}`;
            // formattedData = (
                
            //     <div className="video-thumbnail-container">
            //         <a href={data.url} target="_blank" rel="noopener noreferrer">
            //         <img src={thumbnailUrl} alt="Video Thumbnail" />
            //         </a>
            //         <a className="video-url" href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
            //     </div>
                
            // );
            const videoIdMatch = data.url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                const videoUrl = `https://www.youtube.com/embed/${videoId}`;
                formattedData = (
                    <div>
                        <iframe
                            width="800"
                            height="500"
                            src={videoUrl}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video"
                        ></iframe>
                    </div>
                );
            }
        }
        else if (Array.isArray(data) && data.length && data[0].team_name !== undefined) {
            formattedData = (
                <div className="table-container">
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Matches Played</th>
                                <th>Matches Won</th>
                                <th>Matches Lost</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.team_name}</td>
                                    <td>{team.matches}</td>
                                    <td>{team.win}</td>
                                    <td>{team.lose}</td>
                                    <td>{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="winner">Winner: {data.length > 0 ? data[0].winner : 'Unknown'}</div>
                </div>
            );
        } else if (Array.isArray(data) && data.length) {
            
                console.log(data[0]);
                if (data[0] === "test" || data[0] === "odi" || data[0] === "t20") {
                    formattedData = (
                        <div className="table-container">
                            <h1>{data[0]}</h1>
                            <table>
                                <thead> 
                                    <tr>
                                        <th>Position</th>
                                        <th>Name</th>
                                        <th>Nationality</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.slice(1).map((player, index) => (
                                        <tr key={index}>
                                            <td>{player.Position}</td>
                                            <td>{player.Name}</td>
                                            <td>{player.Nationality}</td>
                                            <td>{player.Rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                } else {
                    formattedData = (
                        
                        <div className="player-stats-container">
                        {data[0].name.toLowerCase() === "virat kohli" && (
                            <img src={viratKohliImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "rohit sharma" && (
                            <img src={RohitImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "sachin tendulkar" && (
                            <img src={SachinImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "shikhar dhawan" && (
                            <img src={Shikarimage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "ms dhoni" && (
                            <img src={MSDImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "jasprit bumra" && (
                            <img src={BumraImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}
                        {data[0].name.toLowerCase() === "ravichandran ashivin" && (
                            <img src={AshvinImage} alt="Player" style={{ width: '400px', height: '400px' }} />
                        )}

                        {data.map((section, index) => (
                            <div key={index} className="section">
                                {section.paragraph && <h2>{section.paragraph}</h2>}
                                {section.table && (
                                    <table>
                                        <thead>
                                            <tr>
                                                {section.table[0].map((header, idx) => (
                                                    <th key={idx}>{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.table.slice(1).map((row, idx) => (
                                                <tr key={idx}>
                                                    {row.map((cell, cIdx) => (
                                                        <td key={cIdx}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                    </div>
                        
                    )
                }
        } else {
            formattedData = (
                <div className="answer">
                    {data && data.result && data.result}
                </div>
            );
        }
    
        const tableString = ReactDOMServer.renderToString(formattedData);
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
        console.log("hi");
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
            <br/>
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
