import { AxiosRequestConfig } from "axios";
import axios from "./axios-instance";
import { METHOD } from "./types";

export const fetcher = async <T>(
  url: string,
  method : METHOD,
  config?: AxiosRequestConfig,
  
): Promise<T> => {
  const response = await axios[method](url, config);

  if (!response.status) {
    throw new Error("Failed to fetch data");
  }

  return response.data;
};

// export const deleteOrder = async <T>(
//   url: string,
// ): Promise<T> => {
//   const response = await axios.delete(url);

//   if (!response.status) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.data;
// };
// export const createOrder = async <T>(
//   url: string,
// ): Promise<T> => {
//   const response = await axios["get"](url);

//   if (!response.status) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.data;
// };
// export const fetcherOrderDetail = async <T>(url: string): Promise<T> => {
//   const response = await axios.get(url);

//   if (!response.status) {
//     throw new Error("Failed to fetch data");
//   }

//   return response.data.products;
// };
