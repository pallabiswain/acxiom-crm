import React, { useState } from 'react';
import './Auth.css';

export default function Register({ switchToLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('SalesExecutive');

    const handleRegister = (e) => {
        e.preventDefault();
        
        // Get existing users from localStorage or start with an empty list
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Check if username already exists
        const userExists = existingUsers.some(user => user.username === username);
        if (userExists) {
            alert('Username already exists! Please choose another one or login.');
            return;
        }

        // Save new user
        const newUser = { username, email, password, role };
        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        alert('Registration successful! You can now log in.');
        switchToLogin();
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">AcxiomCRM Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="SalesExecutive">Sales Executive</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                </form>
                <div className="auth-switch">
                    Already have an account? <span onClick={switchToLogin}>Login here</span>
                </div>
            </div>
        </div>
    );
}