import type { Complaint, Report, Session, Study } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
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
