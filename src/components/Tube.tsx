import { TubeData } from '../types';

interface TubeProps {
  emojis: TubeData;
  isSelected: boolean;
  onClick: () => void;
}

export function Tube({ emojis, isSelected, onClick }: TubeProps) {
  // O tubo sempre tem espaço para 4 emojis
  const capacity = 4;
  
  return (
    <div 
      className={`tube ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {/* Preenchemos os espaços vazios para o tubo manter o tamanho */}
      {[...Array(capacity)].map((_, index) => {
        // Renderizamos de baixo para cima (column-reverse no CSS)
        const emoji = emojis[index];
        return (
          <div key={index} className="emoji-slot">
            {emoji || ''}
          </div>
        );
      })}
    </div>
  );
}