import React, { useState } from 'react';
import './Auth.css';

export default function Login({ onLoginSuccess, switchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Get registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Find user matching username and password
        const matchedUser = registeredUsers.find(
            user => user.username === username && user.password === password
        );

        if (matchedUser) {
            // Success: save login token and user info
            localStorage.setItem('token', 'secure-jwt-token-123');
            localStorage.setItem('currentUser', JSON.stringify(matchedUser));
            onLoginSuccess(matchedUser);
        } else {
            // Failure: user not registered or wrong password
            alert('Access Denied: Invalid credentials or user not registered. Please register first!');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">AcxiomCRM Login</h2>
                <form onSubmit={handleLogin}>
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
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <div className="auth-switch">
                    Don't have an account? <span onClick={switchToRegister}>Register here</span>
                </div>
            </div>
        </div>
    );
}