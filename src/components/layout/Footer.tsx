import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-[#020509] text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-white.png"
                alt="Whales Visual Logo"
                className="h-10 object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm mt-4">
              We Capture Moments That Last Forever. Premium photography at your services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 font-bold text-white">Quick Links</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors">Booking</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-6 font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>Lagos, Nigeria</li>
              <li><a href="tel:+2348107572373" className="hover:text-white transition-colors">+234 810 757 2373</a></li>
              <li><a href="mailto:abimbolaolawale014@gmail.com" className="hover:text-white transition-colors">abimbolaolawale014@gmail.com</a></li>
            </ul>
          </div>

          {/* CTA & Socials */}
          <div>
            <h4 className="font-serif text-lg mb-6 font-bold text-white">Connect With Us</h4>
            <div className="flex space-x-4 mb-8">
              <a href="https://www.instagram.com/4rael_photo?igsh=MXUzZng3ZWdmM3F0cA%3D%3D&utm_source=qr" className="text-white/70 hover:text-white transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white/70 hover:text-white transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="text-white/70 hover:text-white transition-colors"><FaXTwitter size={20} /></a>
            </div>
            <Link to="/booking" className="inline-block border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-primary transition-colors duration-300">
              Book a Shoot
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-white/50 text-xs">
          <p>&copy; {new Date().getFullYear()} Whales Visual. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
