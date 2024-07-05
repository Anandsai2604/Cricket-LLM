import React, { useState } from "react";
import './front.css';

function Ipl() {
    const [data, setData] = useState([]); 
    const [input, setInput] = useState(''); 
    const years = Array.from({ length: 18 }, (_, index) => 2007 + index);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/scrapeIPLScorecard`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ year: input }),
            });

            if (!response.ok) {
                throw new Error('Unable to fetch IPL points table, try again');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching IPL points table:', error);
        }
    };

    const handleYearChange = (e) => {
        setInput(e.target.value); 
    };

    let formattedData = null;
    if (data.length > 0) {
        formattedData = (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Team Name</th>
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
                <div className="winner">Winner: {data[0].winner}</div>
            </div>
        );
    } else {
        formattedData = <p>No data available</p>;
    }

    return (
        <div className="chat-container">
            <div className="year-selection">
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={input} onChange={handleYearChange}>
                    <option value="">Select...</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button onClick={fetchData}>Fetch Points Table</button>
            </div>

            <div className="message-container">
                {formattedData}
            </div>
        </div>
    );
}

export default Ipl;
