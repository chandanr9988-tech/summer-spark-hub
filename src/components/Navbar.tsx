import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, LogIn, LogOut, User, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Camps", to: "/camps" },
  { label: "Register", to: "/register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Sun className="h-8 w-8 text-secondary" />
          <span className="text-xl font-display font-bold text-foreground">
            Summer Camp
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4" /> Admin
                </Link>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-base font-semibold ${
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 text-base font-semibold text-primary"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { handleSignOut(); setOpen(false); }}
                    className="mt-2 rounded-full border border-border px-6 py-3 text-center text-sm font-bold text-muted-foreground"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
