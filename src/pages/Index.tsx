import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Heart, Star, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-camp.jpg";
import { camps } from "@/data/camps";
import CampCard from "@/components/CampCard";

const features = [
  { icon: Shield, title: "Safe & Supervised", description: "Certified staff, first-aid on site, and low camper-to-staff ratios." },
  { icon: Heart, title: "Inclusive Community", description: "Every child is welcomed, valued, and encouraged to grow." },
  { icon: Star, title: "Expert Instructors", description: "Passionate educators with years of camp experience." },
  { icon: Sparkles, title: "Unforgettable Fun", description: "Curated activities that create lifelong summer memories." },
];

const Index = () => {
  const featured = camps.filter((c) => c.featured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Summer camp" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-secondary backdrop-blur-sm border border-secondary/30 mb-6">
              ☀️ Summer 2025 Registration Open
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-background leading-tight mb-6">
              The Best Summer
              <br />
              <span className="text-secondary">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-background/80 mb-8 max-w-lg leading-relaxed">
              Adventure, creativity, and friendships that last a lifetime. Give your child the summer they deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/camps"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                Explore Camps <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/30 px-8 py-4 text-base font-bold text-background transition-all hover:bg-background/20"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 summer-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We create a safe, fun, and enriching environment where every child can thrive.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Camps */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">
                Featured Camps
              </h2>
              <p className="text-muted-foreground text-lg">Our most popular programs this summer.</p>
            </div>
            <Link
              to="/camps"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View all camps <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((camp, i) => (
              <CampCard key={camp.id} camp={camp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-20 text-center text-primary-foreground shadow-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Ready for the Best Summer Ever?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Spots are filling fast. Secure your child's place today and give them a summer full of adventure.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-background px-10 py-4 text-base font-bold text-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              Register Now <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
