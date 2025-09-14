import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import '../Dashboard.css'; // Custom CSS for unique styles
import { CgClose } from 'react-icons/cg';

function SmartDashboard() {
    const [isSmartNavCollapsed, setSmartNavCollapsed] = useState(false);
    const location = useLocation(); // Get current route

    const toggleSmartNav = () => {
        setSmartNavCollapsed(!isSmartNavCollapsed);
    };

    return (
        <div id="smart-dashboard" className="d-flex">
            {/* Smart Navigation (Sidebar) */}
            {/* Sidebar Navigation */}
            <nav className={`smart-nav d-flex flex-column h-100 ${isSmartNavCollapsed ? 'collapsed' : ''}`} id="smartNav">
                <div className="smart-nav-header d-flex justify-content-between align-items-center">
                    <h4 className="text-light">GCC Connect</h4>
                    <button className="btn btn-sm btn-light smart-nav-toggle-btn" onClick={toggleSmartNav}>
                        <CgClose />
                    </button>
                </div>

                {/* Navigation Links */}
                <ul className="nav flex-column py-4 flex-grow-1 overflow-auto">
                    <li className="nav-item">
                        <Link onClick={toggleSmartNav} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                            <i className="fas fa-chart-line"></i> Blog Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={toggleSmartNav} className={`nav-link ${location.pathname === '/teams' ? 'active' : ''}`} to="/teams">
                            <i className="fas fa-user"></i> Teams Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={toggleSmartNav} className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`} to="/jobs">
                            <i className="fas fa-briefcase"></i> Jobs Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={toggleSmartNav} className={`nav-link ${location.pathname === '/global-settings' ? 'active' : ''}`} to="/global-settings">
                            <i className="fa fa-cogs"></i> Global Dashboard
                        </Link>
                    </li>
                </ul>
                {/* Logout Button Stays at Bottom */}
                <div className="nav-item mt-auto">
                    <Link onClick={toggleSmartNav} className="nav-link" to="/logout">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                </div>

            </nav>


            {/* Main Content */}
            <div id="smart-main-content" className="flex-grow-1 d-flex flex-column">
                {/* Top Bar */}
                <nav className="navbar navbar navbarbggcc shadow py-3 fixed-top">
                    <span className="navbar-brand col-1">GCC Connect</span>
                    <button
                        className="btn btn-link d-lg-none smart-nav-toggle-btn"
                        onClick={toggleSmartNav}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </nav>

                {/* Scrollable Outlet */}
                <div className="content-wrapper bgcontentoutlet flex-grow-1 overflow-auto mt-5">
                    <div className="container-fluid pt-4">
                        <Outlet />
                    </div>
                </div>

                {/* Footer */}
                <footer className="smart-footer text-center py-3 bg-light shadow">
                    <span>&copy; GCC Connect 2025</span>
                </footer>
            </div>
        </div>
    );
}

export default SmartDashboard;
