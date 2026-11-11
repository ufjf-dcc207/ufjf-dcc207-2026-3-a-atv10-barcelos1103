import './App.css';

function App() {
  return (
    <div className="game-board">
      <h1>Magic Emoji Sort</h1>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { TubeData } from './types';
import './App.css';

// 3 cores (emojis), 4 de cada = 12 emojis. Capacidade do tubo = 4.
const INITIAL_STATE: TubeData[] = [
  ['🍎', '🍌', '🍇', '🍎'],
  ['🍌', '🍇', '🍎', '🍌'],
  ['🍇', '🍎', '🍌', '🍇'],
  [] // Tubo vazio
];

function App() {
  const [tubes, setTubes] = useState<TubeData[]>(INITIAL_STATE);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);

  return (
    <div className="game-board">
      <h1>Magic Emoji Sort</h1>
      {/* O tabuleiro virá no próximo commit */}
    </div>
  );
}

export default App;