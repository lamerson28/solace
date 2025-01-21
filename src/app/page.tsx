"use client";

import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "./features/advocates/components/SearchBar";
import { AdvocatesTable } from "./features/advocates/components/AdvocatesTable";
import { useAdvocates } from "./features/advocates/hooks/useAdvocates";

export default function Home() {
  const { advocates, isLoading, error, pagination, fetchAdvocates } = useAdvocates();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdvocates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = useCallback(async () => {
    await fetchAdvocates(searchTerm, 1);
  }, [fetchAdvocates, searchTerm]);

  const onReset = useCallback(async () => {
    setSearchTerm("");
    await fetchAdvocates();
  }, [fetchAdvocates]);

  const onPageChange = useCallback((page: number) => {
    fetchAdvocates(searchTerm, page);
  }, [fetchAdvocates, searchTerm]);

  return (
    <main className="p-6 bg-gradient-to-b from-[#1d4238]/5 to-transparent min-h-screen">
      <h1 className="text-3xl font-bold text-[#1d4238]">Solace Advocates</h1>
      <div className="mt-8">
        <SearchBar
          searchTerm={searchTerm}
          isLoading={isLoading}
          onSearchTermChange={setSearchTerm}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>
      <div className="mt-8">
        {error ? (
          <div className="text-center py-8 text-red-600">
            Error: {error}
          </div>
        ) : isLoading ? (
          <div className="text-center py-8 text-gray-600">Loading...</div>
        ) : (
          <>
            <AdvocatesTable advocates={advocates} />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {advocates.length} of {pagination.total} advocates
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1 || isLoading}
                  className="px-3 py-1 bg-[#1d4238] text-white rounded hover:bg-[#1d4238]/90 disabled:bg-[#1d4238]/50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages || isLoading}
                  className="px-3 py-1 bg-[#1d4238] text-white rounded hover:bg-[#1d4238]/90 disabled:bg-[#1d4238]/50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
