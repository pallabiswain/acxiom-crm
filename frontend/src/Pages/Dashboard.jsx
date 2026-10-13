import React, { useState, useEffect } from 'react';
import './Dashboard.css';

export default function Dashboard({ onLogout }) {
    const [user, setUser] = useState({ username: 'User', role: 'SalesExecutive' });
    const [kpis, setKpis] = useState({
        customers: 12,
        opportunities: 5,
        pipelineValue: 45000
    });

    useEffect(() => {
        // Load logged-in user details from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">AcxiomCRM Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, <b>{user.username}</b> ({user.role})</span>
                    <button onClick={onLogout} className="logout-button">Logout</button>
                </div>
            </div>

            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-title">Total Customers</div>
                    <div className="kpi-value">{kpis.customers}</div>
                </div>
                <div className="kpi-card green">
                    <div className="kpi-title">Open Opportunities</div>
                    <div className="kpi-value">{kpis.opportunities}</div>
                </div>
                <div className="kpi-card purple">
                    <div className="kpi-title">Pipeline Value</div>
                    <div className="kpi-value">${kpis.pipelineValue.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}