'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function OrderStatus({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const id = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);
  async function handleChange(e) {
    const newStatus = e.target.value; // Convert string to boolean
    setStatus(newStatus);
    const data = {
      orderStatus: newStatus,
    };
    // Make API request here to update status in the database
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders/${id}`, {
        cache: 'no-store',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // console.log(response);
        setLoading(false);
        toast.success(`Order Status Updated Successfully`);
        //window.location.reload();
      } else {
        setLoading(false);
        toast.error('Something Went wrong');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const statusColors = {
    PENDING: 'orange',
    PROCESSING: 'blue',
    SHIPPED: 'purple',
    DELIVERED: 'green',
    CANCELED: 'red',
  };

  const selectBorderStyle = {
    borderColor: statusColors[status] || 'gray',
  };
  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={selectBorderStyle}
          value={status.toString()} // Set the value of the select element to the current status
          onChange={handleChange} // Call handleChange when the select value changes
        >
          <option value="PENDING" selected={status === 'PENDING'}>
            PENDING
          </option>
          <option value="PROCESSING" selected={status === 'PROCESSING'}>
            PROCESSING
          </option>
          <option value="SHIPPED" selected={status === 'SHIPPED'}>
            SHIPPED
          </option>
          <option value="DELIVERED" selected={status === 'DELIVERED'}>
            DELIVERED
          </option>
          <option value="CANCELED" selected={status === 'CANCELED'}>
            CANCELED
          </option>
        </select>
      )}
    </>
  );
}
