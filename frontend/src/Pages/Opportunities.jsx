import React, { useState } from 'react';
import './Customers.css';

export default function Opportunities() {
    const [opps, setOpps] = useState([
        { id: 1, name: 'Enterprise License', amount: 15000, probability: 80, stage: 'Proposal', closeDate: '2026-06-30' }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [probability, setProbability] = useState('');
    const [closeDate, setCloseDate] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        
        // Business Rule validations
        if (Number(amount) <= 0) {
            alert('Opportunity Amount must be greater than 0.');
            return;
        }
        if (Number(probability) < 0 || Number(probability) > 100) {
            alert('Probability must be between 0 and 100.');
            return;
        }
        if (new Date(closeDate) < new Date().setHours(0,0,0,0)) {
            alert('Expected Close Date cannot be in the past.');
            return;
        }

        const newOpp = { id: Date.now(), name, amount: Number(amount), probability: Number(probability), stage: 'Qualification', closeDate };
        setOpps([...opps, newOpp]);
        setName(''); setAmount(''); setProbability(''); setCloseDate('');
        setShowForm(false);
    };

    return (
        <div className="module-container">
            <div className="module-header">
                <h2>Opportunity Pipeline Management</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Opportunity'}
                </button>
            </div>

            {showForm && (
                <div className="form-card">
                    <h3>Create Opportunity</h3>
                    <form onSubmit={handleCreate}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Opportunity Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Amount (Must be {'>'} 0)</label>
                                <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Probability (0 - 100)</label>
                                <input type="number" min="0" max="100" value={probability} onChange={e => setProbability(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Expected Close Date (Cannot be past)</label>
                                <input type="date" value={closeDate} onChange={e => setCloseDate(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">Save Opportunity</button>
                    </form>
                </div>
            )}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Opportunity Name</th>
                        <th>Amount ($)</th>
                        <th>Probability (%)</th>
                        <th>Stage</th>
                        <th>Expected Close Date</th>
                    </tr>
                </thead>
                <tbody>
                    {opps.map(o => (
                        <tr key={o.id}>
                            <td>{o.name}</td>
                            <td>${o.amount.toLocaleString()}</td>
                            <td>{o.probability}%</td>
                            <td>{o.stage}</td>
                            <td>{o.closeDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}