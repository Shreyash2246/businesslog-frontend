import React, { useState, useEffect } from 'react';

export default function RecordForm({ onSubmit, initialData, onCancel }) {
  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [payment, setPayment] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setCustomerName(initialData.customerName || '');
      setProduct(initialData.product || '');
      setQuantity(initialData.quantity || '');
      setPayment(initialData.payment || '');
      setDate(initialData.date ? initialData.date.slice(0, 16) : '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      customerName,
      product,
      quantity: Number(quantity),
      payment: Number(payment),
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        required
      /><br/>
      <input
        type="text"
        placeholder="Product"
        value={product}
        onChange={e => setProduct(e.target.value)}
        required
      /><br/>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
      /><br/>
      <input
        type="number"
        placeholder="Payment"
        value={payment}
        onChange={e => setPayment(e.target.value)}
        required
      /><br/>
      <input
        type="datetime-local"
        placeholder="Date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      /><br/>
      <button type="submit">Save</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
} 