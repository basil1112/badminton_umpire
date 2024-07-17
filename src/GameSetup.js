import React, { useState } from 'react';

function GameSetup({ setGameConfig }) {
  const [gameType, setGameType] = useState('doubles');
  const [rounds, setRounds] = useState(1);
  const [maxSetPoint, setMaxSetPoint] = useState(21);
  const [_team1Players, setTeam1Players] = useState(['basil', 'jibin']);
  const [_team2Players, setTeam2Players] = useState(['sachin', 'godwin']);

  const startGame = () => {
    setGameConfig({ gameType, rounds, maxSetPoint, _team1Players, _team2Players });
  };

  return (
    <div>
      <h1>Set Up Game</h1>
      <form>
        <div>
          <label>Game Type:</label>
          <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
            <option value="singles">Singles</option>
            <option value="doubles">Doubles</option>
          </select>
        </div>
        <div>
          <label>Rounds:</label>
          <input type="number" value={rounds} onChange={(e) => setRounds(e.target.value)} />
        </div>
        <div>
          <label>Max Set Point:</label>
          <input type="number" value={maxSetPoint} onChange={(e) => setMaxSetPoint(e.target.value)} />
        </div>
        <div>
          <label>Team 1 Players:</label>
          <input
            type="text"
            placeholder="Player 1"
            value={_team1Players[0]}
            onChange={(e) => setTeam1Players([e.target.value, _team1Players[1]])}
          />
          {gameType === 'doubles' && (
            <input
              type="text"
              placeholder="Player 2"
              value={_team1Players[1]}
              onChange={(e) => setTeam1Players([_team1Players[0], e.target.value])}
            />
          )}
        </div>
        <div>
          <label>Team 2 Players:</label>
          <input
            type="text"
            placeholder="Player 1"
            value={_team2Players[0]}
            onChange={(e) => setTeam2Players([e.target.value, _team2Players[1]])}
          />
          {gameType === 'doubles' && (
            <input
              type="text"
              placeholder="Player 2"
              value={_team2Players[1]}
              onChange={(e) => setTeam2Players([_team2Players[0], e.target.value])}
            />
          )}
        </div>
        <button type="button" onClick={startGame}>Start Game</button>
      </form>
    </div>
  );
}

export default GameSetup;
