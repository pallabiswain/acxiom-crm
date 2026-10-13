import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get('/audit-logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>System Audit Logs</h2>
      <p>Tracks all critical actions performed across the CRM.</p>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th>ID</th><th>User</th><th>Action</th><th>Entity</th><th>Details</th><th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.username}</td>
              <td>{log.action}</td>
              <td>{log.entityName}</td>
              <td>{log.details}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}