import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Darshan from "./pages/Darshan";
import NotFound from "./pages/NotFound";

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ContactMessages from "./admin/ContactMessages";
import EventsManager from "./admin/EventsManager";
import FAQManager from "./admin/FAQManager";
import AnnouncementManager from "./admin/AnnouncementManager";
import GalleryManager from "./admin/GalleryManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="timings" element={<Darshan />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/messages" element={<ContactMessages />} />
        <Route path="/admin/events" element={<EventsManager />} />
        <Route path="/admin/faqs" element={<FAQManager />} />
        <Route path="/admin/announcements" element={<AnnouncementManager />} />
        <Route path="/admin/gallery" element={<GalleryManager />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;