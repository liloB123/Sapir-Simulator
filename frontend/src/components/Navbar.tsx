import type { FC } from "react";
import { NavLink } from "react-router-dom";

const tabs = [
    { name: "Home", path: "/" },
    { name: "Simulations", path: "/simulations" },
];

const Navbar: FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-200">
            <div className="flex items-end justify-start px-4 pb-0 min-h-[38px]">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }: { isActive: boolean }) =>
                            "relative px-6 py-1 mx-1 text-sm font-medium transition-all duration-200 rounded-t-lg border-t border-l border-r " +
                            (isActive
                                ? "bg-white text-gray-900 border-gray-300 shadow-md -mb-px z-10"
                                : "bg-gray-300 text-pink-600 border-gray-300")
                        }
                    >
                        <span className="relative z-10">{tab.name}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;