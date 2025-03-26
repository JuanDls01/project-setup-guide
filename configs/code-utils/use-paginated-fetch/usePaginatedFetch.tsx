import {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

type UseFetchResponse<T> = {
  data: T;
  isFetching: boolean;
  error: string | null;
  setPage: Dispatch<SetStateAction<number>>;
};

export function usePaginatedFetch<T>(url: string): UseFetchResponse<T> {
  const [data, setData] = useState<{ [key: number]: T }>({});
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
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
