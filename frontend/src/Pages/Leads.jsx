import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ leadName: '', email: '', phone: '', source: 'Website' });

  useEffect(() => {
    API.get('/leads')
      .then(res => setLeads(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/leads', form);
      setLeads([...leads, res.data]);
      setForm({ leadName: '', email: '', phone: '', source: 'Website' });
      alert('Lead added successfully!');
    } catch (err) {
      alert(err.response?.data || 'Error adding lead');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Lead Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '6px' }}>
        <h3>Add New Lead</h3>
        <input placeholder="Lead Name" value={form.leadName} onChange={e => setForm({...form, leadName: e.target.value})} required style={{ marginRight: '10px', padding: '6px' }} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ marginRight: '10px', padding: '6px' }} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required style={{ marginRight: '10px', padding: '6px' }} />
        <input placeholder="Source" value={form.source} onChange={e => setForm({...form, source: e.target.value})} style={{ marginRight: '10px', padding: '6px' }} />
        <button type="submit" style={{ padding: '7px 15px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Add Lead</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td><td>{l.leadName}</td><td>{l.email}</td><td>{l.phone}</td><td>{l.source}</td><td>{l.status || 'New'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}