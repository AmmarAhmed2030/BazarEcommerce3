import React from 'react';

export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = false,
  type = 'text',
  className = 'sm:col-span-2',
  defaultValue = '',
  disabled = false,
}) {
  const handleNumericInput = (event) => {
    const value = event.target.value;
    // Allow only numbers and prevent any non-numeric characters
    if ((type === 'tel' || type === 'number') && !/^\d*$/.test(value)) {
      event.preventDefault();
    }
  };
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register}
          type={type}
          name={name}
          id={name}
          required={isRequired}
          defaultValue={defaultValue}
          autoComplete={name}
          onInput={handleNumericInput} // Attach the handler
          className="dark:bg-transparent dark:text-gray-50 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          placeholder={`Type the ${label.toLowerCase()}`}
          disabled={disabled}
        />
        {errors?.[name] && (
          <span className="text-sm text-red-600">
            {errors[name].message || `${label} is required`}
          </span>
        )}
      </div>
    </div>
  );
}
