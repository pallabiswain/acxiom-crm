import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export default function FollowUps() {
  const [followUps, setFollowUps] = useState([]);
  const [form, setForm] = useState({ customerId: '', notes: '', followUpDate: '' });

  useEffect(() => {
    API.get('/follow-ups')
      .then(res => setFollowUps(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/follow-ups', form);
      setFollowUps([...followUps, res.data]);
      setForm({ customerId: '', notes: '', followUpDate: '' });
      alert('Follow-up scheduled!');
    } catch (err) {
      alert(err.response?.data || 'Error scheduling follow-up');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Follow-Up Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '6px' }}>
        <h3>Schedule Follow-Up</h3>
        <input type="number" placeholder="Customer ID" value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})} required style={{ marginRight: '10px', padding: '6px' }} />
        <input type="date" value={form.followUpDate} onChange={e => setForm({...form, followUpDate: e.target.value})} required style={{ marginRight: '10px', padding: '6px' }} />
        <input placeholder="Notes / Discussion" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} required style={{ marginRight: '10px', padding: '6px', width: '300px' }} />
        <button type="submit" style={{ padding: '7px 15px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>Save</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th>ID</th><th>Customer ID</th><th>Follow-Up Date</th><th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td><td>{f.customerId}</td><td>{f.followUpDate}</td><td>{f.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}