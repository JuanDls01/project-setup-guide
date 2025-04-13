import {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  setPage: Dispatch<SetStateAction<number>>;
};

export const useFetch = <T,>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const res = await fetch(url, {signal});
    
        if (!res.ok) throw new Error("Failed to fetch data");

        const jsonData: T = await res.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err as Error)
        };
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export function usePaginatedFetch<T>(url: string): UseFetchResponse<T> {
  const [data, setData] = useState<{ [key: number]: T }>({});
  const [page, setPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (pageNumber: number) => {
      if (data[pageNumber]) return;

      try {
        setIsFetching(true);
        const res = await fetch(`${url}?page=${pageNumber}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setData((prev) => ({ ...prev, [pageNumber]: json }));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData(page);

    return () => controller.abort();
  }, [page]);

  return {
    data: data[page],
    isFetching,
    error,
    setPage,
  };
}
