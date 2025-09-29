import { AppConfig } from "../config";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

async function handleResponseError(res: Response, isJson: boolean) {
  let message = res.statusText || "Request failed";
  let details: unknown = undefined;

  if (isJson) {
    try {
      const body = await res.json();
      message = (body && (body.message || body.detail)) || message;
      details = body;
    } catch (err) {
      console.warn("Error converting response to json in !res.ok block: ", err);
    }
  } else {
    try {
      const text = await res.text();
      if (text) message = text;
    } catch (err) {
      console.warn("Error converting response to text in !res.ok block: ", err);
    }
  }

  throw { status: res.status, message, details } as ApiError;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    await handleResponseError(res, isJson);
  }

  if (isJson) {
    const payload = await res.json();
    console.log(payload);
    return payload as T;
  }

  const blob = await res.blob();
  return blob as T;
}

export class ApiClient {
  // TODO: add session based info and user data to instance of ApiClient
  // TODO: add interceptors

  private _url(path: string) {
    return AppConfig.getUrl(path);
  }

  async uploadPhoto(params: {
    uri: string;
    metadata?: Record<string, unknown>;
  }) {
    const form = new FormData();
    const photo = await fetch(params.uri);
    const photoBlob = await photo.blob();

    form.append("photos", photoBlob, "photo.jpg");
    form.append("photos", photoBlob, "photo.jpg");

    const url = new URL(this._url("/process-artwork"));
    url.searchParams.append;

    if (params.metadata) {
      url.searchParams.append("metadata", JSON.stringify(params.metadata));
    }

    const res = await fetch(url.toString(), {
      method: "POST",
      body: form,
    });

    return handleResponse<{
      object_id: string;
      recognition_confidence: number;
    }>(res);
  }

  async generateNarrative(params: {
    object_id: string;
    user_session_id: string;
  }) {
    const res = await fetch(this._url("/generate-narrative"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    return handleResponse<{ text: string }>(res);
  }

  async generateAudio(params: { text: string }) {
    const res = await fetch(this._url("/generate-audio"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    return handleResponse<{ audio_url: string }>(res);
  }

  async listMuseumObjects(museum_id: string) {
    const res = await fetch(
      this._url(`/museum-objects/${encodeURIComponent(museum_id)}`)
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
  }

  async recommendations(params: {
    user_session_id: string;
    current_museum_id?: string;
  }) {
    const searchParams = new URLSearchParams();

    searchParams.append("user_session_id", params.user_session_id);

    if (params.current_museum_id) {
      searchParams.append("current_museum_id", params.current_museum_id);
    }

    const res = await fetch(
      this._url(`/recommendations?${searchParams.toString()}`)
    );

    return handleResponse<Array<{ object_id: string; score?: number }>>(res);
  }
}
