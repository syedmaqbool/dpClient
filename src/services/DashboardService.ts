import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Nullable } from "../interfaces/CommonInterface";
import {
  BookSlotDTO,
  BookSlotResponse,
  GetAllBookingsResponse,
  GetAreaSlotsResponse,
  GetAreasResponse,
} from "../interfaces/DashboardInterface";
import { promiseHandler } from "../utilities/PromiseHandler";
import { API_PATS as API_PATHS, BASE_URL, COMBINED } from "./API_PATHS";

// export async function getAreas(): Promise<Nullable<GetAreasResponse>> {
//   const promise = axios.get(API_PATS.GET_AREAS);
//   const [result, error] = await promiseHandler(promise);
//   if (result) {
//     return result.data;
//   }
//   console.error("error", error);
//   return null;
// }
// export async function getAreaSlots(
//   areaId: string | number
// ): Promise<Nullable<GetAreaSlotsResponse>> {
//   const promise = axios.get(API_PATS.GET_AREA_SLOTS(areaId));
//   const [result, error] = await promiseHandler(promise);
//   if (result) {
//     return result.data;
//   }
//   console.error("error", error);
//   return null;
// }

export async function bookSlot(
  bookSlotDTO: BookSlotDTO
): Promise<Nullable<BookSlotResponse>> {
  const promise = axios.post(COMBINED(API_PATHS.BOOK_SLOT), bookSlotDTO);
  const [result, error] = await promiseHandler(promise);
  if (result) {
    return result.data;
  }
  console.error("error", error);
  return null;
}

export const areasApi = createApi({
  reducerPath: "areasApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAreas: builder.query<GetAreasResponse, void>({
      query: () => API_PATHS.GET_AREAS,
    }),
    getAreaSlots: builder.query<GetAreaSlotsResponse, number>({
      query: (areaId: number) => API_PATHS.GET_AREA_SLOTS(areaId),
    }),
    getAllBookings: builder.query<GetAllBookingsResponse, number>({
      query: (userId) => API_PATHS.GET_ALL_BOOKINGS(userId),
    }),
  }),
});

export const {
  useGetAreasQuery,
  useLazyGetAreaSlotsQuery,
  useLazyGetAllBookingsQuery,
} = areasApi;
