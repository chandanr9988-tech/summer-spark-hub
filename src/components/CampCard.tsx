import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Clock } from "lucide-react";
import type { Camp } from "@/data/camps";

interface CampCardProps {
  camp: Camp;
  index?: number;
}

const CampCard = ({ camp, index = 0 }: CampCardProps) => {
  const seatsPercent = ((camp.totalSeats - camp.availableSeats) / camp.totalSeats) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/camps/${camp.id}`} className="block group">
        <div className="glass-card rounded-2xl overflow-hidden hover-lift">
          <div className="relative h-52 overflow-hidden">
            <img
              src={camp.image}
              alt={camp.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-secondary to-sunshine px-3 py-1 text-xs font-bold text-secondary-foreground shadow-lg">
              ₹{camp.fees.toLocaleString("en-IN")}
            </div>
            {camp.availableSeats <= 10 && (
              <div className="absolute top-4 left-4 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">
                {camp.availableSeats} spots left!
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {camp.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {camp.description}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-primary" />
                {camp.ageGroup}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-secondary" />
                {camp.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {camp.schedule.split(",")[0]}
              </span>
            </div>

            {/* Seats bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{camp.availableSeats} seats available</span>
                <span>{Math.round(seatsPercent)}% filled</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                  style={{ width: `${seatsPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CampCard;
