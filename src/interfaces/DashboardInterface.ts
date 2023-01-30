export interface GetAreasResponse {
  status: number;
  msg: string;
  data: Area[];
}

export interface Area {
  id: number;
  name: string;
  area_location: string;
  floor_id: number;
  status: number;
}

export interface GetAreaSlotsResponse {
  status: number;
  msg: string;
  data: Slot[];
}

export interface Slot {
  id: number;
  name: string;
  slot_location: string;
  status: number;
  parkingarea_id: number;
}

export interface BookSlotDTO {
  lot_id: number;
  slot_id: number;
  user_id: number;
  timeIn: string;
  timeOut: string;
  bookingDate: string;
}

export interface BookSlotResponse {
  status: number;
  msg: string;
  data: BookedSlot;
}

export interface BookedSlot {
  user_id: number;
  slot_id: number;
  p_id: number;
  bookingDate: string;
  timeIn: string;
  timeOut: string;
  status: number;
  id: number;
}

export interface GetAllBookingsResponse {
  status: number;
  msg: string;
  data: Booking[];
}

export interface Booking {
  id: number;
  user_id: number;
  slot_id: number;
  p_id: number;
  bookingDate: string;
  timeIn: string;
  timeOut: string;
  status: number;
  createdOn: string;
}
