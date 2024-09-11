'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Status({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const userId = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value === 'true'; // Convert string to boolean
    setStatus(newStatus);

    const data = {
      status: newStatus,
      emailVerified: true,
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/farmers/${userId}`, {
        cache: 'no-store',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setStatus(updatedData.status); // Update the status based on the API response
        toast.success(`Farmer Status Updated Successfully`);
        //window.location.reload();
      } else {
        toast.error('Something Went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while updating the status');
    } finally {
      setLoading(false);
    }
  }

  const selectBorderStyle = {
    borderColor: status ? 'green' : 'red',
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
          <option value="true" selected={status === true}>
            APPROVED
          </option>
          <option value="false" selected={status === false}>
            PENDING
          </option>
        </select>
      )}
    </>
  );
}
