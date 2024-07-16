import React, { useState } from "react";
import "./worldcup.css"; // Import your CSS file for styling

export default function PointsTableDropdown() {
    const [tournament, setTournament] = useState('');
    const [year, setYear] = useState('');
    const [pointsTable, setPointsTable] = useState([]);

    const yearOptions = {
        t20: ["2007", "2009", "2010", "2012", "2013", "2015", "2021", "2022", "2024"],
        odi: ["1975", "1979", "1983", "1987", "1992", "1996", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    };

    const fetchPointsTable = async (tournament, year) => {
        let endpoint = '';

        if (tournament === 't20') endpoint = 'T20';
        else if (tournament === 'odi') endpoint = 'Worldcup';

        try {
            const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ year })
            });

            if (!response.ok) {
                throw new Error('Unable to fetch points table');
            }

            const data = await response.json();
            setPointsTable(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching points table:', error);
        }
    };

    const handleTournamentChange = (e) => {
        setTournament(e.target.value);
        setYear('');
        setPointsTable([]);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleFetch = () => {
        if (tournament && year) {
            fetchPointsTable(tournament, year);
        }
    };

    const renderTableHeader = () => (
        <thead>
            <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Matches Played</th>
                <th>Wins</th>
                <th>Losses</th>
            </tr>
        </thead>
    );

    const renderTableBody = (teams) => (
        <tbody>
            {teams.map((team, index) => (
                <tr key={index}>
                    <td>{team.rank}</td>
                    <td>{team.team_name}</td>
                    <td>{team.matches}</td>
                    <td>{team.win}</td>
                    <td>{team.lose}</td>
                </tr>
            ))}
        </tbody>
    );

    const renderTable = () => {
        if (pointsTable.length === 0) return null;

        if (tournament === 't20') {
            return (
                <div className="table-container">
                    <h3>T20 World Cup {year} Points Table</h3>
                    {Object.keys(pointsTable).map((teamGroup, index) => (
                        <div key={index}>
                            <h4>{teamGroup}</h4>
                            <div className="table-scrollable">
                                <table className="Table">
                                    {renderTableHeader()}
                                    {renderTableBody(pointsTable[teamGroup])}
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (tournament === 'odi') {
            if (Array.isArray(pointsTable)) {
                return (
                    <div className="table-container">
                        <h3>ODI World Cup {year} Points Table</h3>
                        <div className="table-scrollable">
                            <table className="Table">
                                {renderTableHeader()}
                                {renderTableBody(pointsTable)}
                            </table>
                        </div>
                    </div>
                );
            } else if (typeof pointsTable === 'object' && pointsTable !== null) {
                return (
                    <div className="table-container">
                        <h3>ODI World Cup {year} Points Table</h3>
                        {Object.keys(pointsTable).map((teamGroup, index) => (
                            <div key={index}>
                                <h4>{teamGroup}</h4>
                                <div className="table-scrollable">
                                    <table className="Table">
                                        {renderTableHeader()}
                                        {renderTableBody(pointsTable[teamGroup])}
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
    };

    return (
        <div className="worldcup-container">
            <h2>Points Table</h2>
            <div className="selection-container">
                <select onChange={handleTournamentChange} value={tournament}>
                    <option value="">Select Tournament</option>
                    <option value="t20">T20 World Cup</option>
                    <option value="odi">ODI World Cup</option>
                </select>
                <select onChange={handleYearChange} value={year} disabled={!tournament}>
                    <option value="">Select Year</option>
                    {tournament && yearOptions[tournament.toLowerCase()].map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>
                <button onClick={handleFetch} disabled={!tournament || !year}>Fetch Points Table</button>
            </div>
            {renderTable()}
        </div>
    );
}
