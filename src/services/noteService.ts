import axios from "axios";
import type { CreateNotePayload, Note } from "../types/note";
import type { NotesQueryParams, NotesResponse } from "../types/noteApi";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

async function fetchNotes(
  searchParams: NotesQueryParams,
): Promise<NotesResponse> {
  const response = await apiClient.get<NotesResponse>("/notes", {
    params: searchParams,
  });
  return response.data;
}

async function createNote(note: CreateNotePayload): Promise<Note> {
  const response = await apiClient.post<Note>("/notes", note);
  return response.data;
}

async function deleteNote(id: string): Promise<Note> {
  const response = await apiClient.delete<Note>(`/notes/${id}`);
  return response.data;
}

export function useNotes(value: NotesQueryParams) {
  return useQuery({
    queryKey: ["notes", value],
    queryFn: () => fetchNotes(value),
    placeholderData: keepPreviousData,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createNote"],
    mutationFn: (note: CreateNotePayload) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
