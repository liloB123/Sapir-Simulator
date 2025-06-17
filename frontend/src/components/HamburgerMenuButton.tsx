import React from "react"
import { Menu, X } from 'lucide-react';

interface HamburgerMenuButtonProps {
  isOpen: boolean,
  onLayerToggle: () => void
}

const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({ isOpen, onLayerToggle }) => {
  return (
    <button onClick={onLayerToggle} className="fixed top-4 right-4 z-50 shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200 h-15 w-15 flex items-center" style={{borderRadius: '50%'}}
      aria-label="Layers menu">
      {isOpen ? (
        <X className="w-5 h-5 text-gray-700" />
      ) : (
        <Menu className="w-5 h-5 text-gray-700" />
      )}
    </button>
  )
}

export default HamburgerMenuButton