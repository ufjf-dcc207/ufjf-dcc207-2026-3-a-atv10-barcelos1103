import { useState } from 'react';
import type { TubeData } from './types/index'; 
import { Tube } from './components/tube';
import './App.css';

// 3 cores (emojis), 4 de cada = 12 emojis. Capacidade do tubo = 4.
const INITIAL_STATE: TubeData[] = [
  ['🍎', '🍌', '🍇', '🍎'],
  ['🍌', '🍇', '🍎', '🍌'],
  ['🍇', '🍎', '🍌', '🍇'],
  [] // Tubo vazio para iniciar os movimentos
];

function App() {
  const [tubes, setTubes] = useState<TubeData[]>(
    JSON.parse(JSON.stringify(INITIAL_STATE))
  );
  const [selectedTube, setSelectedTube] = useState<number | null>(null);

  const handleTubeClick = (index: number) => {
    // 1. Se nenhum tubo está selecionado, seleciona o clicado
    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
      return;
    }

    // 2. Se clicar no mesmo tubo que já estava selecionado, cancela a seleção
    if (selectedTube === index) {
      setSelectedTube(null);
      return;
    }

    const sourceIndex = selectedTube; 
    const sourceTube = tubes[sourceIndex];
    const targetTube = tubes[index];
    const topEmojiToMove = sourceTube[sourceTube.length - 1];
    const targetTopEmoji = targetTube[targetTube.length - 1];

    // 3. Regras: O destino deve ter espaço (< 4) E (estar vazio OU ter o mesmo emoji no topo)
    if (
      targetTube.length < 4 &&
      (targetTube.length === 0 || targetTopEmoji === topEmojiToMove)
    ) {
      const newTubes = [...tubes];
      
      newTubes[sourceIndex] = [...sourceTube];
      newTubes[index] = [...targetTube];

      const emoji = newTubes[sourceIndex].pop(); 
      if (emoji !== undefined) {
        newTubes[index].push(emoji);
      }

      setTubes(newTubes);
    }
    
    setSelectedTube(null);
  };

  const checkWin = () => {
    return tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length < 4) return false;
      const firstEmoji = tube[0];
      return tube.every(emoji => emoji === firstEmoji);
    });
  };

  const resetGame = () => {
    setTubes(JSON.parse(JSON.stringify(INITIAL_STATE)));
    setSelectedTube(null);
  };

  const isWon = checkWin();

  return (
    <div className="game-board">
      <h1>Magic Emoji Sort</h1>
      
      {isWon && (
        <div className="victory-message">
          <h2>🎉 Você Venceu! 🎉</h2>
        </div>
      )}

      <div className="tubes-container">
        {tubes.map((tubeData, index) => (
          <Tube
            key={index}
            emojis={tubeData}
            isSelected={selectedTube === index}
            onClick={() => handleTubeClick(index)}
          />
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reiniciar Jogo
      </button>
    </div>
  );
}

export default App;