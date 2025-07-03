import type { FC } from 'react';
import { Menu, X } from 'lucide-react';

type LayerMenuButtonProps = {
  isOpen: boolean,
  onMenuToggle: () => void
}

const LayerMenuButton: FC<LayerMenuButtonProps> = ({ isOpen, onMenuToggle }) => {
  const menuButtonStyle = "w-5 h-5 text-gray-700"

  return (
    <button onClick={onMenuToggle} className="fixed top-4 right-4 z-50 shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200 h-15 w-15 flex items-center bg-gray-100 justify-center" 
      aria-label="Layers menu">
      {isOpen ? (
        <X className={menuButtonStyle} />
      ) : (
        <Menu className={menuButtonStyle} />
      )}
    </button>
  )
}

export default LayerMenuButton 