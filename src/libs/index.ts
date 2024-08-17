import axios, { AxiosError } from "axios";
import { apiClient } from "./utils/api-client";

// export const fetcher = async (url: string) => {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//     }
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch');
//   }

//   return response.json();
// };

export const fetcher = (url: any) => {
  console.log("test",url)
  if (url.includes("undefined")) return undefined;
  return apiClient.get(url).then((res) => res.data);
};

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
});

export const loadingPlaceholder = (length: number) => Array.from({ length }, (_) => null);
