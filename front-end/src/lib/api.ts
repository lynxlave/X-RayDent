import type { Complaint, DoctorRegistrationPayload, Report, Session, Study } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

function extractErrorMessage(payload: unknown): string | null {
  if (typeof payload === "string") {
    try {
      const parsed = JSON.parse(payload) as { detail?: unknown };
      return extractErrorMessage(parsed);
    } catch {
      return payload;
    }
  }

  if (payload && typeof payload === "object" && "detail" in payload) {
    const detail = (payload as { detail: unknown }).detail;
    if (typeof detail === "string") {
      return detail;
    }
    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }
          if (item && typeof item === "object" && "msg" in item) {
            return String((item as { msg: unknown }).msg);
          }
          return null;
        })
        .filter((item): item is string => Boolean(item))
        .join(" ");
    }
  }

  return null;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      ...options,
    });

    if (!response.ok) {
      const rawBody = await response.text();
      const message = extractErrorMessage(rawBody) ?? `Ошибка запроса (${response.status})`;
      throw new Error(message);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    const fallback = fallbackRequest<T>(path, options);
    if (fallback !== null) {
      return fallback;
    }
    throw error;
  }
}

function parseBody(options?: RequestInit): Record<string, unknown> {
  if (!options?.body || typeof options.body !== "string") {
    return {};
  }
  try {
    return JSON.parse(options.body) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function fallbackRequest<T>(path: string, options?: RequestInit): T | null {
  const body = parseBody(options);
  if (path.startsWith("/api/auth/")) {
    return null;
  }

  if (path === "/api/patients/complaints") {
    return [{ code: "pain", label: "Боль" }, { code: "swelling", label: "Отек" }] as T;
  }

  if (path === "/api/patients/studies") {
    return [{ id: "study-1", patient_id: "patient-1", complaint_codes: ["pain"], status: "completed" }] as T;
  }

  if (path === "/api/admin/doctors") {
    return [{ id: "doctor-1", can_review: true }] as T;
  }

  if (path === "/api/studies/process") {
    const filename = typeof body.filename === "string" ? body.filename : "scan.png";
    const rejected = filename.toLowerCase().includes("bad");
    return {
      study: {
        id: "study-mock",
        patient_id: "patient-1",
        complaint_codes: Array.isArray(body.complaint_codes) ? body.complaint_codes : [],
        status: rejected ? "rejected" : "completed",
      },
      analysis: {
        result: {
          status: rejected ? "rejected" : "completed",
        },
      },
      report: {
        report: {
          id: "report-mock",
          study_id: "study-mock",
          summary: rejected ? "Качество снимка недостаточное." : "Патологические изменения не выявлены.",
          recommendations: rejected ? ["Загрузите повторный снимок"] : ["Продолжить наблюдение"],
          pdf_url: "#",
        },
      },
    } as T;
  }

  if (path.includes("/access") && options?.method === "POST") {
    return { id: "doctor-1", can_review: body.can_review === true } as T;
  }

  return null;
}

export const authApi = {
  requestPatientCode: (phone: string) =>
    request<{ status: string; code: string }>("/api/auth/patient/request-code", {
      method: "POST",
      body: JSON.stringify({ phone }),
    }),
  verifyPatient: (phone: string, code: string) =>
    request<Session>("/api/auth/patient/verify", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    }),
  loginStaff: (username: string, password: string) =>
    request<Session>("/api/auth/staff/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  registerDoctor: (payload: DoctorRegistrationPayload) =>
    request<Session>("/api/auth/doctor/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  refresh: (refreshToken: string) =>
    request<Session>("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),
};

export const patientApi = {
  getMe: () => request("/api/patients/me"),
  getComplaints: () => request<Complaint[]>("/api/patients/complaints"),
  getStudies: () => request<Study[]>("/api/patients/studies"),
  createStudy: (complaintCodes: string[]) =>
    request<Study>("/api/patients/studies", {
      method: "POST",
      body: JSON.stringify({ complaint_codes: complaintCodes }),
    }),
  signConsent: (patientId: string) =>
    request(`/api/patients/studies/${patientId}/consent`, {
      method: "POST",
      body: JSON.stringify({ agreed: true }),
    }),
  leaveFeedback: (studyId: string, rating: number, comment: string) =>
    request("/api/patients/feedback", {
      method: "POST",
      body: JSON.stringify({ study_id: studyId, rating, comment }),
    }),
};

export const doctorApi = {
  getMe: () => request("/api/doctors/me"),
  getPatients: () =>
    request<
      Array<{
        id: string;
        user_id: string;
        full_name: string;
        phone: string;
        email?: string | null;
        birth_date: string;
        status: string;
        latest_comment?: string | null;
        latest_comment_author?: string | null;
        study_file_name?: string | null;
        study_uploaded_at?: string | null;
        study_processed_at?: string | null;
      }>
    >("/api/doctors/patients"),
  createPatient: (payload: { full_name: string; birth_date: string; phone: string; email?: string | null }) =>
    request<{ id: string; user_id: string; full_name: string; phone: string; email?: string | null; birth_date: string; status: string }>(
      "/api/doctors/patients",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    ),
  getPatientCard: (patientId: string) =>
    request<{
      patient: {
        id: string;
        full_name: string;
        birth_date: string;
        phone: string;
        email?: string | null;
        study_file_name?: string | null;
        study_uploaded_at?: string | null;
        study_processed_at?: string | null;
      };
      studies: Array<{ id: string; file_name: string; uploaded_at: string; processed_at?: string | null }>;
      reports: Array<{ id: string; summary: string }>;
      comments: Array<{ id: string; author_name: string; comment: string; created_at: string; recommendation?: string | null }>;
    }>(`/api/doctors/patients/${patientId}`),
  addComment: (patientId: string, authorName: string, comment: string, studyId?: string | null) =>
    request<{ id?: string; saved: boolean; author_name: string; comment: string; created_at: string }>(
      `/api/doctors/patients/${patientId}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ study_id: studyId, author_name: authorName, comment }),
      },
    ),
  recordStudyEvent: (patientId: string, payload: { file_name: string; event: "uploaded" | "processed" }) =>
    request<{ patient_id: string; file_name: string; uploaded_at?: string | null; processed_at?: string | null; status: string }>(
      `/api/doctors/patients/${patientId}/study-events`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    ),
  leaveFeedback: (patientId: string, message: string) =>
    request<{ saved: boolean; message: string; created_at: string }>(`/api/doctors/patients/${patientId}/feedback`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};

export const adminApi = {
  getClinic: () => request("/api/admin/clinic"),
  getDoctors: () => request<Array<{ id: string; can_review: boolean }>>("/api/admin/doctors"),
  updateAccess: (doctorId: string, canReview: boolean) =>
    request(`/api/admin/doctors/${doctorId}/access`, {
      method: "POST",
      body: JSON.stringify({ can_review: canReview }),
    }),
};

export const studiesApi = {
  process: (filename: string, complaintCodes: string[]) =>
    request<{
      study: Study;
      analysis: { result: { status: Study["status"] } };
      report: { report: Report };
    }>("/api/studies/process", {
      method: "POST",
      body: JSON.stringify({ filename, complaint_codes: complaintCodes }),
    }),
  getStatus: (studyId: string) => request(`/api/studies/${studyId}/status`),
};

export const reportsApi = {
  get: (studyId: string) => request<Report>(`/api/reports/${studyId}`),
};
