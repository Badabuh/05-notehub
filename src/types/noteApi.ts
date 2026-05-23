import type { Notes } from "./note";

export interface NotesQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface NotesResponse {
  notes: Notes;
  totalPages: number;
}
