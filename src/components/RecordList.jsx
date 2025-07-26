import React from 'react';

export default function RecordList({ records, onEdit, onDelete }) {
  if (!records.length) return <p className="dashboard-empty">No records found.</p>;

  return (
    <div className="dashboard-table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => (
            <tr key={record.id} className={idx % 2 === 0 ? 'dashboard-row-even' : 'dashboard-row-odd'}>
              <td>{record.customerName}</td>
              <td>{record.product}</td>
              <td>{record.quantity}</td>
              <td>{record.payment}</td>
              <td>{record.date?.replace('T', ' ').slice(0, 16)}</td>
              <td>
                <button className="dashboard-action-btn dashboard-edit-btn" onClick={() => onEdit(record)}>Edit</button>
                <button className="dashboard-action-btn dashboard-delete-btn" onClick={() => onDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 