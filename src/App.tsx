import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Programs from "./pages/Programs/Programs";
import NotFound from "./pages/not/NotFound";
import Navbar from "./components/shared/Navbar/Navbar";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/workout/Dashboard";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
