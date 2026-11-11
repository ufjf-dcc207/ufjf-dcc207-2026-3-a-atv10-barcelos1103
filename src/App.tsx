import { useState } from 'react';
import { TubeData } from './types';
import { Tube } from './components/Tube';
import './App.css';

const INITIAL_STATE: TubeData[] = [
  ['🍎', '🍌', '🍇', '🍎'],
  ['🍌', '🍇', '🍎', '🍌'],
  ['🍇', '🍎', '🍌', '🍇'],
  []
];

function App() {
  const [tubes, setTubes] = useState<TubeData[]>(INITIAL_STATE);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);

  const handleTubeClick = (index: number) => {
    // Se nenhum tubo está selecionado, seleciona o clicado (se não estiver vazio)
    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
      return;
    }

    // Se clicar no mesmo, deseleciona
    if (selectedTube === index) {
      setSelectedTube(null);
      return;
    }

    // Tentar mover
    const sourceTube = tubes[selectedTube];
    const targetTube = tubes[index];
    const topEmojiToMove = sourceTube[sourceTube.length - 1];
    const targetTopEmoji = targetTube[targetTube.length - 1];

    // Regras do jogo:
    // 1. O tubo de destino não pode estar cheio (max 4)
    // 2. O tubo de destino deve estar vazio OU o emoji do topo deve ser igual ao que está sendo movido
    if (
      targetTube.length < 4 &&
      (targetTube.length === 0 || targetTopEmoji === topEmojiToMove)
    ) {
      const newTubes = [...tubes];
      
      // Remove do original
      const emoji = newTubes[selectedTube].pop(); 
      // Adiciona no destino
      if (emoji) newTubes[index].push(emoji);     

      setTubes(newTubes);
    }
    
    // Sempre deseleciona após tentar um movimento
    setSelectedTube(null);
  };

  return (
    <div className="game-board">
      <h1>Magic Emoji Sort</h1>
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
    </div>
  );
}

export default App;