import { getApiUrl } from "../config";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    let details: unknown = undefined;
    if (isJson) {
      try {
        const body = await res.json();
        message = (body && (body.message || body.detail)) || message;
        details = body;
      } catch {}
    } else {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {}
    }
    const err: ApiError = { status: res.status, message, details };
    throw err;
  }
  if (isJson) {
    return (await res.json()) as T;
  }
  return (await res.blob()) as T;
}

export const ApiClient = {
  async uploadPhoto(params: {
    uri: string;
    metadata?: Record<string, unknown>;
  }) {
    const form = new FormData();
    form.append("photo", {
      uri: params.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    if (params.metadata) {
      form.append("metadata", JSON.stringify(params.metadata));
    }
    const res = await fetch(getApiUrl("/upload-photo"), {
      method: "POST",
      headers: {
        // RN sets correct multipart boundary automatically
      },
      body: form,
    });
    return handleResponse<{
      object_id: string;
      recognition_confidence: number;
    }>(res);
  },

  async generateNarrative(params: {
    object_id: string;
    user_session_id: string;
  }) {
    const res = await fetch(getApiUrl("/generate-narrative"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return handleResponse<{ narrative_text: string }>(res);
  },

  async generateAudio(params: { narrative_text: string }) {
    const res = await fetch(getApiUrl("/generate-audio"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return handleResponse<{ audio_url: string }>(res);
  },

  async listMuseumObjects(museum_id: string) {
    const res = await fetch(
      getApiUrl(`/museum-objects/${encodeURIComponent(museum_id)}`)
    );
    return handleResponse<
      Array<{
        id: string;
        name: string;
        artist?: string;
        date?: string;
        image_url?: string;
        generated_text?: string;
        generated_audio?: string;
        metadata?: Record<string, unknown>;
      }>
    >(res);
  },

  async recommendations(params: {
    user_session_id: string;
    current_museum_id?: string;
  }) {
    const url = new URL(getApiUrl("/recommendations"));
    url.searchParams.set("user_session_id", params.user_session_id);
    if (params.current_museum_id)
      url.searchParams.set("current_museum_id", params.current_museum_id);
    const res = await fetch(url.toString());
    return handleResponse<Array<{ object_id: string; score?: number }>>(res);
  },
};
