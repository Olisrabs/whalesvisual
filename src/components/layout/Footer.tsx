import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-primary/30 pb-12">
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
              <a href="https://www.instagram.com/4rael_photo?igsh=MXUzZng3ZWdmM3F0cA%3D%3D&utm_source=qr" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaInstagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaFacebookF size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#b5952f] hover:text-[#111111] hover:border-transparent transition-all"><FaXTwitter size={18} /></a>
            </div>
            <Link to="/booking" className="btn-outline inline-block mt-2">
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
