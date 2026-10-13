import React, { useState, useEffect } from 'react';
import './Customers.css';

export default function Customers() {
    const [customers, setCustomers] = useState([
        { id: 1, customerName: 'Acme Corp', email: 'contact@acme.com', phone: '9876543210', status: 'Active' },
        { id: 2, customerName: 'Globex Inc', email: 'info@globex.com', phone: '9123456780', status: 'Active' }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        // Client-side validation checks
        if (!name || !email || !phone) {
            alert('All fields are required.');
            return;
        }
        const newCust = { id: Date.now(), customerName: name, email, phone, status: 'Active' };
        setCustomers([...customers, newCust]);
        setName(''); setEmail(''); setPhone('');
        setShowForm(false);
    };

    return (
        <div className="module-container">
            <div className="module-header">
                <h2>Customer Management</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Customer'}
                </button>
            </div>

            {showForm && (
                <div className="form-card">
                    <h3>Create Customer</h3>
                    <form onSubmit={handleCreate}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Customer Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Email (e.g., user@example.com)</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Phone (10 digits)</label>
                                <input type="tel" pattern="[0-9]{10}" value={phone} onChange={e => setPhone(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">Save Customer</button>
                    </form>
                </div>
            )}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td>{c.customerName}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}