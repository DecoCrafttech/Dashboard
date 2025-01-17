import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Dashboard() {
    const [style, setStyle] = useState("navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion toggled");
        } else {
            setStyle("navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion");
        }
    };

    const changeStyle1 = () => {
        if (style === "navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion toggled1");
        } else {
            setStyle("navbar-nav bg-gradient-sidebar sidebar sidebar-dark accordion");
        }
    };

    return (
        <div>
            <body id="page-top">
                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <ul className={style} id="accordionSidebar">
                        {/* Sidebar Brand */}
                        <a className="sidebar-brand mt-3 d-flex align-items-center justify-content-between" href="#">
                            <div className="sidebar-brand-text me-2">GCC Connect</div>
                            <div className="text-center d-none d-md-inline">
                                <button
                                    className="rounded border-0"
                                    id="sidebarToggle"
                                    onClick={changeStyle}
                                ></button>
                            </div>
                        </a>

                        {/* Divider */}
                        <hr className="sidebar-divider my-0 mb-5" />

                        {/* Nav Items */}
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Blog Dashboard</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a className="nav-link" href="/login">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Login</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a className="nav-link" href="/jobs">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Jobs Dashboard</span>
                            </a>
                        </li>

                        {/* Divider */}
                        <hr className="sidebar-divider" />

                        {/* Logout */}
                        <div className="fixed-bottom">
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    <i className="fas fa-fw fa-table"></i>
                                    <span className="collapse-item">Logout</span>
                                </a>
                            </li>
                        </div>
                    </ul>

                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                <button
                                    id="sidebarToggleTop"
                                    className="btn btn-link d-md-none rounded-circle mr-3"
                                    onClick={changeStyle1}
                                >
                                    <i className="fa fa-bars"></i>
                                </button>
                            </nav>

                            {/* Page Content */}
                            <div className="container-fluid">
                                <Outlet />
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; GCC CONNECT 2025</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Dashboard;
