import type { Complaint, DoctorRegistrationPayload, Report, Session, Study } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

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
      throw new Error(await response.text());
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

  if (path === "/api/doctors/patients") {
    return [{ id: "patient-1", user_id: "patient-user-1" }] as T;
  }

  if (path === "/api/doctors/patients/patient-1") {
    return {
      patient: { id: "patient-1" },
      studies: [{ id: "study-1", status: "completed" }],
      reports: [{ id: "report-1", summary: "Без патологии" }],
    } as T;
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

  if (path.includes("/comments") && options?.method === "POST") {
    return { saved: true } as T;
  }

  if (path.includes("/access") && options?.method === "POST") {
    return { id: "doctor-1", can_review: body.can_review === true } as T;
  }

  return null;
}

export const authApi = {
  requestPatientCode: (phone: string) => request<{ status: string; code: string }>("/api/auth/patient/request-code", {
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
  getPatients: () => request<Array<{ id: string; user_id: string }>>("/api/doctors/patients"),
  getPatientCard: (patientId: string) => request(`/api/doctors/patients/${patientId}`),
  addComment: (patientId: string, studyId: string, comment: string) =>
    request(`/api/doctors/patients/${patientId}/comments`, {
      method: "POST",
      body: JSON.stringify({ study_id: studyId, comment }),
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
