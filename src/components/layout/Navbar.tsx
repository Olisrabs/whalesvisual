import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch (e) { }
    } else {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch (e) { }
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 inset-x-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-5xl z-50 transition-all duration-300 rounded-full border border-white/40 dark:border-white/10",
          isScrolled ? "bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg shadow-lg py-3" : "bg-white/40 dark:bg-[#111111]/40 backdrop-blur-md py-4 shadow-sm"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
              alt="Whales Visual Logo"
              className="h-8 md:h-10 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "nav-link",
                  location.pathname === link.path && "active"
                )}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
              className="text-black dark:text-white hover:text-primary dark:hover:text-gray-300 transition-colors focus:outline-none"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/booking" className="btn-primary rounded-full py-2.5 px-6">
              Book a Shoot
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
              className="text-black dark:text-white mr-4 focus:outline-none"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              className="text-black dark:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#111111] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 dark:border-white/10">
              <img
                src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
                alt="Whales Visual Logo"
                className="h-8 object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black dark:text-white focus:outline-none"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col px-6 py-8 space-y-6 flex-grow">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-2xl font-serif text-black dark:text-white",
                    location.pathname === link.path && "text-primary dark:text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" className="btn-primary w-full text-center mt-4">
                Book a Shoot
              </Link>
            </div>

            <div className="px-6 py-8 border-t border-gray-100 dark:border-white/10 flex justify-center space-x-6">
              <a href="#" className="text-muted-text dark:text-gray-400 hover:text-black dark:hover:text-white"><FaInstagram size={24} /></a>
              <a href="#" className="text-muted-text dark:text-gray-400 hover:text-black dark:hover:text-white"><FaFacebookF size={24} /></a>
              <a href="#" className="text-muted-text dark:text-gray-400 hover:text-black dark:hover:text-white"><FaTwitter size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
