import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import TopPage from "./pages/TopPage";
import PlanningPage from "./pages/PlanningPage";
import ProcessPage from "./pages/ProcessPage";
import ClientPage from "./pages/ClientPage";
import ServerPage from "./pages/ServerPage";
import ArtPage from "./pages/ArtPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/server" element={<ServerPage />} />
        <Route path="/art" element={<ArtPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
