import axios, { AxiosError } from "axios";

export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
});

export const loadingPlaceholder = (length: number) => Array.from({ length }, (_) => null);
