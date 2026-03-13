import "@testing-library/jest-dom";

const payloads: Record<string, unknown> = {
  "/api/patients/complaints": [{ code: "pain", label: "Боль" }],
  "/api/patients/studies": [{ id: "study-1", patient_id: "patient-1", complaint_codes: ["pain"], status: "completed" }],
  "/api/doctors/patients": [{ id: "patient-1", user_id: "patient-user-1" }],
  "/api/doctors/patients/patient-1": {
    patient: { id: "patient-1" },
    studies: [{ id: "study-1", status: "completed" }],
    reports: [{ id: "report-1", summary: "Без патологии" }],
  },
  "/api/admin/doctors": [{ id: "doctor-1", can_review: true }],
};

global.fetch = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input.toString();
  const path = url.replace("http://localhost:8000", "");
  return new Response(JSON.stringify(payloads[path] ?? {}), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}) as typeof fetch;
