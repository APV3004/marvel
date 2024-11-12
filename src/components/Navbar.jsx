import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-links">
                    <NavLink to="/comics" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        Cómics
                    </NavLink>
                    <span className="nav-separator">|</span>
                    <NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        Favoritos
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
