import { Link } from "react-router-dom";
import { Sun, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container mx-auto px-6 py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sun className="h-6 w-6 text-secondary" />
            <span className="text-lg font-display font-bold text-background">Summer Camp</span>
          </div>
          <p className="text-sm leading-relaxed text-background/60">
            Creating unforgettable summer memories for kids through adventure, creativity, and fun.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-background mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm hover:text-secondary transition-colors">Home</Link>
            <Link to="/camps" className="text-sm hover:text-secondary transition-colors">Camps</Link>
            <Link to="/register" className="text-sm hover:text-secondary transition-colors">Register</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-background mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" /> hello@summercamp.com</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> (555) 123-4567</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> 123 Sunshine Lane</span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-background mb-4">Hours</h4>
          <div className="text-sm space-y-1 text-background/60">
            <p>Mon – Fri: 7:00 AM – 6:00 PM</p>
            <p>Sat: 8:00 AM – 2:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/40">
        © {new Date().getFullYear()} Summer Camp. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
