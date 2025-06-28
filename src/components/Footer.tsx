
import { Building2, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="h-12 w-12 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold">Skyline Tower</h3>
                <p className="text-blue-300">Luxury Redefined</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience unparalleled luxury living in the heart of the metropolitan district. 
              Skyline Tower represents the pinnacle of modern architectural design and premium amenities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">123 Skyline Avenue<br />Metropolitan District</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@skylinetower.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
            <div className="space-y-2">
              <a href="#hero" className="block text-gray-300 hover:text-blue-400 transition-colors">Home</a>
              <a href="#entrance-view" className="block text-gray-300 hover:text-blue-400 transition-colors">Entrance</a>
              <a href="#residential-floors" className="block text-gray-300 hover:text-blue-400 transition-colors">Residences</a>
              <a href="#penthouse-clouds" className="block text-gray-300 hover:text-blue-400 transition-colors">Penthouse</a>
              <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Skyline Tower. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
