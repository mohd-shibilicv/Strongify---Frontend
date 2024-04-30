import "./App.css";
import Navbar from "./layouts/Navbar";
import PasswordGenerationPage from "./pages/PasswordGenerationPage";
import PasswordListPage from "./pages/PasswordListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Error404Page from "./layouts/Error404Page";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<PasswordGenerationPage />} />
        <Route
          path="/passwords"
          element={
            <ProtectedRoute>
              <PasswordListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticatedRoute>
              <LoginPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthenticatedRoute>
              <SignupPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
}

export default App;
