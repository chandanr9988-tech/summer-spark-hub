import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { camps } from "@/data/camps";
import CampCard from "@/components/CampCard";

const Camps = () => {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");

  const filtered = camps.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchAge = ageFilter === "all" || c.ageGroup.includes(ageFilter);
    return matchSearch && matchAge;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Our Camps
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect camp for your child. From adventure to arts, we have something for everyone.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search camps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="rounded-full border border-border bg-card px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Ages</option>
            <option value="6">6+ years</option>
            <option value="8">8+ years</option>
            <option value="10">10+ years</option>
          </select>
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((camp, i) => (
              <CampCard key={camp.id} camp={camp} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No camps found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camps;
