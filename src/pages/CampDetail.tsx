import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Users, IndianRupee, Shield, CheckCircle2 } from "lucide-react";
import { camps } from "@/data/camps";

const CampDetail = () => {
  const { id } = useParams();
  const camp = camps.find((c) => c.id === id);

  if (!camp) return <Navigate to="/camps" replace />;

  const seatsPercent = ((camp.totalSeats - camp.availableSeats) / camp.totalSeats) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link
          to="/camps"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to camps
        </Link>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={camp.image} alt={camp.name} className="w-full h-72 md:h-96 object-cover" />
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl p-8 sticky top-28">
              <h1 className="text-3xl font-display font-bold text-foreground mb-3">{camp.name}</h1>
              <p className="text-muted-foreground mb-6">{camp.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm"><strong>Age Group:</strong> {camp.ageGroup}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="text-sm"><strong>Schedule:</strong> {camp.schedule}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm"><strong>Duration:</strong> {camp.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IndianRupee className="h-5 w-5 text-sunshine" />
                  <span className="text-sm"><strong>Fee:</strong> ₹{camp.fees.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Seats */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>{camp.availableSeats} seats left</span>
                  <span>{Math.round(seatsPercent)}% filled</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${seatsPercent}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/register?camp=${camp.id}`}
                className="block w-full text-center rounded-full bg-secondary py-4 text-base font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all hover:shadow-2xl hover:-translate-y-0.5"
              >
                Register Now — ₹{camp.fees.toLocaleString("en-IN")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Details sections */}
        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Activities
            </h2>
            <div className="flex flex-wrap gap-2">
              {camp.activities.map((a) => (
                <span key={a} className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" /> Safety Guidelines
            </h2>
            <ul className="space-y-2">
              {camp.safetyGuidelines.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampDetail;
