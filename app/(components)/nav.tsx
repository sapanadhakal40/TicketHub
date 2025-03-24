"use client";
import { faHome, faUser, faTicket, faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { useState } from "react";

const Nav = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname === path;
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-nav p-4 shadow-md border-b border-border-color">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link href="/" className={`flex items-center space-x-2 ${isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-text-color hover:text-blue-600 dark:hover:text-blue-400'} transition-colors duration-200`}>
                        <FontAwesomeIcon icon={faHome} className="icon" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/ticket-page/new" className={`flex items-center space-x-2 ${isActive("/TicketPage/new") ? "text-blue-600 dark:text-blue-400" : 'text-text-color hover:text-blue-600 dark:hover:text-blue-400'} transition-colors duration-200`}>
                        <FontAwesomeIcon icon={faTicket} className="icon" />
                        <span className="font-medium">Tickets</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 rounded-full hover:bg-card-hover-bg transition-colors"
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                        <FontAwesomeIcon
                            icon={theme === "light" ? faMoon : faSun}
                            className={`icon ${theme === "light" ? "" : "text-yellow-500"}`}
                        />
                    </button>
                    <div className="flex items-center bg-card-bg px-3 py-2 rounded-full">
                        <FontAwesomeIcon icon={faUser} className="text-text-color mr-2" />
                        <p className="text-text-color">sapna@gmail.com</p>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 text-text-color">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                    <span className="font-medium">Dashboard</span>
                </Link>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 rounded-full hover:bg-card-hover-bg transition-colors"
                        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    >
                        <FontAwesomeIcon
                            icon={theme === "light" ? faMoon : faSun}
                            className={`icon ${theme === "light" ? "" : "text-yellow-500"}`}
                        />
                    </button>
                    <button 
                        onClick={toggleMenu}
                        className="p-2 rounded-md hover:bg-card-hover-bg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon 
                            icon={menuOpen ? faTimes : faBars} 
                            className="icon" 
                        />
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col space-y-4 py-4 border-t border-border-color">
                    <Link 
                        href="/ticket-page/new" 
                        className={`flex items-center space-x-2 py-2 ${isActive("/TicketPage/new") ? "text-blue-600 dark:text-blue-400" : 'text-text-color'}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTicket} className="mr-2 icon" />
                        <span>Tickets</span>
                    </Link>
                    <div className="flex items-center py-2">
                        <FontAwesomeIcon icon={faUser} className="text-text-color mr-2" />
                        <p className="text-text-color">sapna@gmail.com</p>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;