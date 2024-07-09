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

  const callApi = async () => {
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

  // const patchData = async (data: ModuleForm) => {
  //   try {
  //     await axios.patch(`${BASE_URL}${url}`, data);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     setError(error);
  //   }
  // };

  useEffect(() => {
    if (!shouldFetchOnMount) {
      return;
    }
    callApi();
  }, []);

  return { data, isLoading, error, callApi };
};
