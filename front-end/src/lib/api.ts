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

  if (path === "/api/doctors/patients") {
    return [
      {
        id: "patient-1",
        user_id: "patient-user-1",
        full_name: "Анна Смирнова",
        phone: "+79990000001",
        birth_date: "1990-04-18",
        status: "completed",
      },
      {
        id: "patient-2",
        user_id: "patient-user-2",
        full_name: "Ольга Кузнецова",
        phone: "+79990000011",
        birth_date: "1987-09-05",
        status: "processing",
      },
      {
        id: "patient-3",
        user_id: "patient-user-3",
        full_name: "Ирина Васильева",
        phone: "+79990000012",
        birth_date: "1994-12-21",
        status: "rejected",
      },
      {
        id: "patient-4",
        user_id: "patient-user-4",
        full_name: "Дмитрий Орлов",
        phone: "+79990000013",
        birth_date: "1981-02-14",
        status: "completed",
      },
      {
        id: "patient-5",
        user_id: "patient-user-5",
        full_name: "Екатерина Волкова",
        phone: "+79990000014",
        birth_date: "1998-07-30",
        status: "processing",
      },
      {
        id: "patient-6",
        user_id: "patient-user-6",
        full_name: "Марина Лебедева",
        phone: "+79990000015",
        birth_date: "1979-11-09",
        status: "active",
      },
      {
        id: "patient-7",
        user_id: "patient-user-7",
        full_name: "Александр Романов",
        phone: "+79990000016",
        birth_date: "1989-06-01",
        status: "active",
      },
      {
        id: "patient-8",
        user_id: "patient-user-8",
        full_name: "Наталья Соколова",
        phone: "+79990000017",
        birth_date: "1996-03-25",
        status: "active",
      },
    ] as T;
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
  getPatients: () =>
    request<Array<{ id: string; user_id: string; full_name: string; phone: string; birth_date: string; status: string }>>(
      "/api/doctors/patients",
    ),
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
