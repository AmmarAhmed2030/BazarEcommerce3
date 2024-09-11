'use client';
import React from 'react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
export default function ArrayItemsInput({
  setItems,
  items,

  itemsTitle,
}) {
  const [item, setItem] = useState('');
  const [showItemForm, setShowItemForm] = useState(false);
  function addItem(item) {
    if (item) {
      setItems((prevItems) => [...prevItems, item]);
      setItem('');
    }
  }
  function removeItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }
  return (
    <div className="sm:col-span-2">
      {showItemForm ? (
        <div className="flex items-center max-w-lg mx-auto">
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => setItem(e.target.value)}
              value={item}
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder={`Create ${itemsTitle} ...`}
            />
          </div>
          <button
            onClick={() => addItem(item)}
            type="button"
            className="shrink-0 inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add
          </button>
          <button
            onClick={() => setShowItemForm(false)}
            type="button"
            className="ml-3 w-8 h-8 py-2 px-2 bg-red-500 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowItemForm(true)}
          type="button"
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4 text-center"
        >
          <Plus />
          <span>Add {itemsTitle}</span>
        </button>
      )}
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-4 mt-4 border-[0.5px] border-slate-50  rounded-lg bg-transparent p-5">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="dark:text-slate-300 text-slate-800 flex space-x-2 items-center bg-slate-300 dark:bg-slate-600 px-4 py-2 rounded-full cursor-pointer"
              >
                <p>{item}</p>
                <X className="w-4 h-4" onClick={() => removeItem(index)} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
