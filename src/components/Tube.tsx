import type { TubeData } from '../types/index';

interface TubeProps {
  emojis: TubeData;
  isSelected: boolean;
  onClick: () => void;
}

export function Tube({ emojis, isSelected, onClick }: TubeProps) {
  const capacity = 4;
  
  return (
    <div 
      className={`tube ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {Array.from({ length: capacity }).map((_, index) => {
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