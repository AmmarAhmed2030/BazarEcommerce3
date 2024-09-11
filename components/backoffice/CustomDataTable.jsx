'use client';
import React, { useState } from 'react';
import data from '../../data.json';

export default function CustomDataTable() {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentlyDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const itemStartIndex = startIndex + 1;
  const itemsEndStartIndex = endIndex;

  return (
    <div className="bg-white shadow-xl text-slate-800 dark:text-slate-50 dark:bg-slate-700 p-4 md:p-8 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-8 bg-gray-200 dark:bg-gray-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                First_Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last_Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentlyDisplayedData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.first_name}
                  </th>
                  <td className="px-6 py-4">{item.last_name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex flex-col md:flex-row items-center justify-between p-4"
          aria-label="Table navigation"
        >
          <span className="text-md font-normal mb-4 md:mb-0">
            Showing{' '}
            <span className="font-semibold">
              {itemStartIndex}-{itemsEndStartIndex}
            </span>{' '}
            of <span className="font-semibold">{data.length}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center justify-center px-3 h-10 leading-tight bg-white dark:bg-gray-800 border rounded-s-lg border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-900 dark:hover:text-white"
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={
                      currentPage === index + 1
                        ? 'flex items-center justify-center px-4 h-10 leading-tight text-white bg-blue-600 border border-blue-300 hover:bg-blue-800 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-900'
                        : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-800 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900'
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}

            <li>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex items-center justify-center px-3 h-10 leading-tight bg-white dark:bg-gray-800 border rounded-e-lg border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-900"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
