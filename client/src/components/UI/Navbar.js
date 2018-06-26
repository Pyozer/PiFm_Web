import React from 'react';

const Navbar = () => (
    <header>
        <div className="navbar navbar-dark bg-dark box-shadow">
            <div className="container d-flex justify-content-between">
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <i className="fas fa-broadcast-tower mr-2" style={{marginTop: -7}}></i>
                    <strong>PiFM</strong>
                </a>
            </div>
        </div>
    </header>
);

export default Navbar;