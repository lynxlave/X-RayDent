import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AuthPage } from "../features/auth/AuthPage";
import { AdminDashboard } from "../features/admin/AdminDashboard";
import { DoctorDashboard } from "../features/doctor/DoctorDashboard";
import { DoctorPatientPage } from "../features/doctor/DoctorPatientPage";
import { PatientDashboard } from "../features/patient/PatientDashboard";
import { HomePage } from "../features/common/HomePage";
import { useSessionStore } from "../lib/store";

function RoleRoute() {
  const role = useSessionStore((state) => state.session?.role);

  if (role === "patient") {
    return <PatientDashboard />;
  }
  if (role === "doctor") {
    return <DoctorDashboard />;
  }
  if (role === "clinic_admin") {
    return <AdminDashboard />;
  }
  return <Navigate to="/login" replace />;
}

function RootRoute() {
  const session = useSessionStore((state) => state.session);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <RoleRoute />;
}

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<RootRoute />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/login/:role" element={<AuthPage />} />
        <Route path="/doctor/patients/:patientId" element={<DoctorPatientPage />} />
        <Route path="/app" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
