import React, { useEffect, useState } from 'react';
import api from '../api';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchRecords();
    // eslint-disable-next-line
  }, [userId]);

  const fetchRecords = async () => {
    try {
      const res = await api.get(`/records/${userId}`);
      setRecords(res.data);
    } catch (err) {
      alert('Failed to fetch records');
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await api.delete(`/record/${id}`);
      fetchRecords();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editing) {
        await api.put(`/record/${editing.id}`, { ...editing, ...data, userId });
      } else {
        await api.post('/record', { ...data, userId });
      }
      setShowForm(false);
      setEditing(null);
      fetchRecords();
    } catch (err) {
      alert('Failed to save record');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="dashboard-bg">
      <header className="dashboard-header">
        <div className="dashboard-title">BuisinessLog Dashboard</div>
        <div className="dashboard-actions">
          <button className="dashboard-btn dashboard-btn-secondary" onClick={handleLogout}>Logout</button>
          <button className="dashboard-btn dashboard-btn-primary" onClick={handleAdd}>Add Record</button>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-card">
          {showForm && (
            <RecordForm
              initialData={editing}
              onSubmit={handleFormSubmit}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          )}
          <RecordList
            records={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
      <footer className="dashboard-footer">
        © 2025 BuisinessLog. Helping small businesses go digital.
      </footer>
    </div>
  );
} 