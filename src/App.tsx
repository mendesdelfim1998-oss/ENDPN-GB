import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Requirements } from './pages/Requirements';
import { Process } from './pages/Process';
import { DelayJustification } from './pages/DelayJustification';
import { Downloads } from './pages/Downloads';
import { FAQ } from './pages/FAQ';
import { News } from './pages/News';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { StartProcess } from './pages/StartProcess';
import { AppointmentPage } from './pages/AppointmentPage';
import { AdminPage } from './pages/AdminPage';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/requisitos" element={<Requirements />} />
              <Route path="/processo" element={<Process />} />
              <Route path="/processo/justificativa" element={<DelayJustification />} />
              <Route path="/justificativa-prazos" element={<DelayJustification />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/contactos" element={<Contact />} />
              <Route path="/agendamento" element={<AppointmentPage />} />
              <Route path="/iniciar-pedido" element={<StartProcess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </Router>
    </ToastProvider>
  </LanguageProvider>
  );
}

export default App;
