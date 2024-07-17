import React, { useState } from 'react';
import GameSetup from './GameSetup';
import Court from './Court';
import DoubleCourt from './DoubleCourts';


function App() {
  const [gameConfig, setGameConfig] = useState(null);

  return (
    <div className="App">
      {!gameConfig ? (
        <GameSetup setGameConfig={setGameConfig} />
      ) : (
        <DoubleCourt gameConfig={gameConfig} />
      )}
    </div>
  );
}

export default App;
