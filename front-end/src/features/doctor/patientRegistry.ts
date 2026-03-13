export type DoctorPatientRecord = {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  status: string;
  studyFileName?: string | null;
  comments?: string[];
};

const STORAGE_KEY = "xraydent.doctorPatients";

export function loadDoctorPatients(): DoctorPatientRecord[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DoctorPatientRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveDoctorPatients(patients: DoctorPatientRecord[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

export function updateDoctorPatient(patientId: string, updater: (patient: DoctorPatientRecord) => DoctorPatientRecord) {
  const patients = loadDoctorPatients();
  const nextPatients = patients.map((patient) => (patient.id === patientId ? updater(patient) : patient));
  saveDoctorPatients(nextPatients);
  return nextPatients;
}
