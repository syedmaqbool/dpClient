// export const BASE_URL = `http://192.168.100.247:6060` as const;
export const BASE_URL = `http://localhost:6060` as const;

export const API_PATS = {
  USER_LOGIN: `/user/login`,
  GET_AREAS: `/areas`,
  GET_AREA_SLOTS: (areaId: string | number) => `/area/${areaId}`,
  BOOK_SLOT: `/slot/book`,
  GET_ALL_BOOKINGS: (userId: string | number) => `/bookings/${userId}`,
} as const;

export const COMBINED = (API_PATH: string) => {
  return `${BASE_URL}${API_PATH}`;
};
