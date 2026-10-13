import React from 'react';
import './Navbar.css';

export default function Navbar({ setActiveTab, onLogout }) {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    return (
        <nav className="navbar">
            <h2>AcxiomCRM</h2>
            <ul className="nav-links">
                <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                <li onClick={() => setActiveTab('customers')}>Customers</li>
                <li onClick={() => setActiveTab('leads')}>Leads</li>
                <li onClick={() => setActiveTab('opportunities')}>Opportunities</li>
                <li onClick={() => setActiveTab('followups')}>Follow-Ups</li>
                {user.role === 'Admin' && <li onClick={() => setActiveTab('audit')}>Audit Log</li>}
            </ul>
            <button onClick={onLogout} className="logout-btn">Logout</button>
        </nav>
    );
}