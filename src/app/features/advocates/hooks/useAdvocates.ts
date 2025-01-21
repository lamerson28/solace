import { useState } from 'react';
import { Advocate } from '@/db/types';

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const fetchAdvocates = async (search?: string, page: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", page.toString());
      params.set("limit", pagination.limit.toString());

      const response = await fetch(`/api/advocates?${params.toString()}`);
      const json = await response.json();
      
      if (!response.ok) throw new Error(json.message || 'Failed to fetch advocates');
      
      setAdvocates(json.data);
      setPagination(json.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { advocates, isLoading, error, pagination, fetchAdvocates };
} 