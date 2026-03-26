export type Role = "patient" | "doctor" | "clinic_admin";

export type Session = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role: Role;
  user_id: string;
  full_name?: string | null;
  phone?: string | null;
  specialty?: DoctorSpecialty | null;
  username?: string | null;
};

export type DoctorSpecialty =
  | "stomatolog-terapevt"
  | "stomatolog-ortoped"
  | "stomatolog-hirurg"
  | "stomatolog-ortodont"
  | "chelyustno-litsevoy-hirurg";

export type DoctorRegistrationPayload = {
  full_name: string;
  specialty: DoctorSpecialty;
  phone: string;
  username: string;
  password: string;
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
