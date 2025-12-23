
import { cookies } from "next/headers";
import nextServer from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotesServer(
  query: string,
  page: number,
  tag?: string
): Promise<NoteHttpResponse> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      page,
      tag: tag && tag !== "all" ? tag : undefined,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function checkServerSession(): Promise<boolean> {
  const cookieStore = await cookies();

  try {
    await nextServer.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return true;
  } catch {
    return false;
  }
}
