import { ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  isLoading: boolean;
  onSearchTermChange: (value: string) => void;
  onSearch: () => Promise<void>;
  onReset: () => Promise<void>;
}

export function SearchBar({ 
  searchTerm, 
  isLoading, 
  onSearchTermChange, 
  onSearch, 
  onReset 
}: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <div>
      <p className="text-lg font-medium text-[#1d4238]">Search</p>
      <p className="mt-2">
        Searching for: <span className="font-medium text-[#1d4238]">{searchTerm}</span>
      </p>
      <div className="flex items-center gap-2 mt-2">
        <input 
          className="border border-gray-300 rounded px-3 py-2 min-w-[300px] focus:outline-none focus:ring-2 focus:ring-[#1d4238] disabled:bg-gray-100"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchTerm}
          placeholder="Search by name, city, or degree"
          disabled={isLoading}
        />
        <button 
          onClick={onSearch}
          className="px-4 py-2 bg-[#1d4238] text-white rounded hover:bg-[#1d4238]/90 disabled:bg-[#1d4238]/50 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 text-[#1d4238] rounded hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          Reset
        </button>
      </div>
    </div>
  );
} 