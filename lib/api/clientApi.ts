


import { User } from "@/types/user";
import nextServer from "./api";
import { Note, NoteTag } from "@/types/note";

/* ================= Notes ================= */

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
  perPage: number = 12
): Promise<NoteHttpResponse> {
  const response = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage,
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

/* ================= Create / Delete Note ================= */

export interface CreateNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(payload: CreateNotePost): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<void> {
  await nextServer.delete(`/notes/${id}`);
}

/* ================= Auth ================= */

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

/* ================= Session ================= */

interface CheckSessionResponse {
  success: boolean;
}

export async function checkSession(): Promise<boolean> {
  try {
    const res = await nextServer.get<CheckSessionResponse>("/auth/session");
    return res.data.success;
  } catch {
    return false;
  }
}

/* ================= User ================= */

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
}

export interface UpdateUserRequest {
  username: string;
}

export async function updateUserProfile(
  payload: UpdateUserRequest
): Promise<User> {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
}
