'use client';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SearchForm() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  function handleSearch(data) {
    const { searchTerm } = data;
    reset();
    router.push(`/search?search=${searchTerm}`);
  }
  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex items-center">
      <label className="sr-only " htmlFor="voice-search">
        Search
      </label>

      <div className="relative w-full">
        <input
          {...register('searchTerm')}
          type="text"
          id="voice-search"
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-l-lg focus:ring-lime-500 focus:border-lime-500 block w-full  p-3 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          placeholder="Search By Products titles..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex gap-2 items-center py-3 px-3 text-sm font-medium text-white bg-lime-500 rounded-r-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 transition-all duration-500"
      >
        <Search className="w-4 h-4 " />
        <span className="">Search</span>
      </button>
    </form>
  );
}
