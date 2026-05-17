import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";

// Lazy-load pages — each page becomes its own JS chunk,
// only downloaded when the user navigates to that route.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
