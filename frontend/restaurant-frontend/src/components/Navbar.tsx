import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-light bg-white shadow-sm px-3">
            <span className="navbar-brand mb-0 h1">Restaurant Management</span>
            <div>
                <button className="btn btn-outline-secondary btn-sm">Profile</button>
            </div>
        </nav>
    );
};

export default Navbar;
