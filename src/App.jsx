
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeRework from "./pages/HomeRework";
import Join from "./pages/Join";
import HowItWorks from "./pages/HowItWorks";
import Membership from "./pages/Membership";
import About from "./pages/About";
import Placeholder from "./pages/Placeholder";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeRework />} />
          <Route path="/join" element={<Join />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/venues" element={<Placeholder title="Venues" />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/corporate" element={<Placeholder title="Corporate" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="/privacy" element={<Placeholder title="Privacy" />} />
          <Route path="/terms" element={<Placeholder title="Terms" />} />
          <Route path="/download" element={<Placeholder title="Download" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

