export const NOTE_TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export type NoteTag = (typeof NOTE_TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type Notes = Note[];

export interface NotesQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export type CreateNotePayload = Omit<Note, "id" | "createdAt" | "updatedAt">;

export interface NotesResponse {
  notes: Notes;
  totalPages: number;
}
