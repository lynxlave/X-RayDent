export type DoctorPatientRecord = {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  email?: string | null;
  status: string;
  latestComment?: string | null;
  latestCommentAuthor?: string | null;
  studyFileName?: string | null;
  studyUploadedAt?: string | null;
  studyProcessedAt?: string | null;
};
