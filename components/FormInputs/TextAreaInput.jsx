'use client';
export default function TextareaInput({
  label,
  name,
  register,
  errors,
  isRequired = false,

  className = 'sm:col-span-2',
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 mb-2 "
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...register}
          name={name}
          id={name}
          rows={3}
          className="dark:text-gray-50 focus:ring-green-500 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 bg-transparent"
          defaultValue={''}
          placeholder={`Type the ${label.toLowerCase()}`}
          required={isRequired}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">
            {errors[name].message || ''}
          </span>
        )}
      </div>
    </div>
  );
}
