import React, { useState, useEffect } from 'react';
/* import { jsPDF } from "jspdf"; */

function Court({ gameConfig }) {
  const { gameType, team1Players, team2Players, maxSetPoint } = gameConfig;
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const [serveSide, setServeSide] = useState('team1');
  const [server, setServer] = useState({ team1: 0, team2: 0 });
  const [receiver, setReceiver] = useState({ team1: 1, team2: 1 });
  
  const addPoint = (team) => {
    setScore((prevScore) => {
      const newScore = { ...prevScore, [team]: prevScore[team] + 1 };

      // Update server and receiver based on the team who won the point
      if (team === 'team1') {
        setServer((prev) => ({ ...prev, team1: (prev.team1 + 1) % (gameType === 'singles' ? 1 : 2) }));
        setReceiver((prev) => ({ ...prev, team2: (prev.team2 + 1) % (gameType === 'singles' ? 1 : 2) }));
      } else {
        setServer((prev) => ({ ...prev, team2: (prev.team2 + 1) % (gameType === 'singles' ? 1 : 2) }));
        setReceiver((prev) => ({ ...prev, team1: (prev.team1 + 1) % (gameType === 'singles' ? 1 : 2) }));
      }
      
      setServeSide(team === 'team1' ? 'team2' : 'team1');
      return newScore;
    });
  };

  const printScoreSheet = () => {
    /* const doc = new jsPDF();
    doc.text("Badminton Score Sheet", 20, 20);
    doc.text(`Team 1: ${score.team1}`, 20, 30);
    doc.text(`Team 2: ${score.team2}`, 20, 40);
    doc.save("score-sheet.pdf"); */
  };

  return (
    <div>
      <h1>Badminton Court</h1>
      <div style={{ position: 'relative', width: '600px', height: '300px', border: '1px solid black', margin: 'auto' }}>
        {/* Court layout */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div>Team 1: {score.team1}</div>
          <div>Team 2: {score.team2}</div>
        </div>
        {/* Serve arrow */}
        {serveSide === 'team1' && <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>↑</div>}
        {serveSide === 'team2' && <div style={{ position: 'absolute', bottom: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>↑</div>}
        {/* Player positions */}
        <div style={{ position: 'absolute', top: '20%', left: '30%', transform: 'translate(-50%, -50%)' }}>{team1Players[server.team1]}</div>
        {gameType === 'doubles' && <div style={{ position: 'absolute', top: '20%', right: '30%', transform: 'translate(-50%, -50%)' }}>{team1Players[1 - server.team1]}</div>}
        <div style={{ position: 'absolute', bottom: '20%', left: '30%', transform: 'translate(-50%, -50%)' }}>{team2Players[server.team2]}</div>
        {gameType === 'doubles' && <div style={{ position: 'absolute', bottom: '20%', right: '30%', transform: 'translate(-50%, -50%)' }}>{team2Players[1 - server.team2]}</div>}
      </div>
      <button onClick={() => addPoint('team1')} style={{ position: 'absolute', left: '10px', top: '50%' }}>Add Point Team 1</button>
      <button onClick={() => addPoint('team2')} style={{ position: 'absolute', right: '10px', top: '50%' }}>Add Point Team 2</button>
      <button onClick={printScoreSheet} style={{ position: 'absolute', top: '10px', right: '10px' }}>Print Score Sheet</button>
    </div>
  );
}

export default Court;
