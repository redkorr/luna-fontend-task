import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:3001';

export const useApi = <T>(
  url: string,
  options: AxiosRequestConfig = { method: 'GET' },
  shouldFetchOnMount = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await axios(
        `${BASE_URL}${url}`,
        options
      );
      setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!shouldFetchOnMount) {
      return;
    }
    fetchData();
  }, []);

  return { data, isLoading, error, fetchData };
};
