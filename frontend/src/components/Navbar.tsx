import type { FC } from "react";
import { NavLink } from "react-router-dom";

const tabs = [
    { name: "Home", path: "/" },
    { name: "Simulations", path: "/simulations" },
];

const Navbar: FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800/60 backdrop-blur border-b border-slate-600 shadow-md">
            <div className="flex items-center justify-start px-4 py-2 gap-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        className={({ isActive }) =>
                            "px-4 py-1.5 text-sm font-semibold rounded-xl transition-all duration-200 " +
                            (isActive
                                ? "bg-white shadow-inner text-cyan-400!"
                                : "bg-slate-700 text-gray-400! hover:bg-slate-600 hover:text-white")
                        }
                    >
                        {tab.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;