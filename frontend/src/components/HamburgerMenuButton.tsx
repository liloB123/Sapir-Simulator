import React from "react"
import { Menu, X } from 'lucide-react';

interface HamburgerMenuButtonProps {
    isOpen: boolean,
    onLayerToggle: () => void
}

const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({isOpen, onLayerToggle}) => {
    return(
        <button onClick={onLayerToggle} className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
        aria-label="Layers menu">
        {isOpen ? (
        <X className="w-6 h-6 text-gray-700" />
      ) : (
        <Menu className="w-6 h-6 text-gray-700" />
      )}
    </button>
    )
}

export default HamburgerMenuButton