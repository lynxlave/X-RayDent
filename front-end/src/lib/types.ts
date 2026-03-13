export type Role = "patient" | "doctor" | "clinic_admin";

export type Session = {
  access_token: string;
  role: Role;
  user_id: string;
};

export type Complaint = {
  code: string;
  label: string;
};

export type Study = {
  id: string;
  patient_id: string;
  complaint_codes: string[];
  status: "pending" | "processing" | "rejected" | "completed";
  upload_name?: string | null;
};

export type Report = {
  id: string;
  study_id: string;
  summary: string;
  recommendations: string[];
  pdf_url: string;
};
