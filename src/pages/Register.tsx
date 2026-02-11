import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { camps } from "@/data/camps";
import { z } from "zod";

const schema = z.object({
  parentName: z.string().trim().min(1, "Parent name is required").max(100),
  parentEmail: z.string().trim().email("Valid email is required").max(255),
  parentPhone: z.string().trim().min(7, "Valid phone is required").max(20),
  childName: z.string().trim().min(1, "Child name is required").max(100),
  childAge: z.coerce.number().min(4, "Age must be at least 4").max(18, "Age must be under 18"),
  selectedCamp: z.string().min(1, "Please select a camp"),
  medicalNotes: z.string().max(1000).optional(),
  emergencyContact: z.string().trim().min(1, "Emergency contact is required").max(100),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("camp") || "";

  const [form, setForm] = useState<Partial<FormData>>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childAge: undefined,
    selectedCamp: preselected,
    medicalNotes: "",
    emergencyContact: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-12 text-center max-w-md mx-6"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Registration Complete!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for registering. We'll send a confirmation email shortly with next steps.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-xl border ${errors[field] ? "border-destructive" : "border-border"} bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <Link to="/camps" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to camps
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">Register Your Child</h1>
          <p className="text-muted-foreground mb-10">Fill in the details below to secure a spot for your child.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card rounded-2xl p-8 space-y-5">
              <h2 className="font-display text-lg font-bold text-foreground">Parent Information</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input name="parentName" value={form.parentName} onChange={handleChange} className={inputClass("parentName")} placeholder="Jane Doe" />
                {errors.parentName && <p className="text-xs text-destructive mt-1">{errors.parentName}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} className={inputClass("parentEmail")} placeholder="jane@email.com" />
                  {errors.parentEmail && <p className="text-xs text-destructive mt-1">{errors.parentEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone</label>
                  <input name="parentPhone" value={form.parentPhone} onChange={handleChange} className={inputClass("parentPhone")} placeholder="(555) 123-4567" />
                  {errors.parentPhone && <p className="text-xs text-destructive mt-1">{errors.parentPhone}</p>}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-5">
              <h2 className="font-display text-lg font-bold text-foreground">Child Information</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Child's Name</label>
                  <input name="childName" value={form.childName} onChange={handleChange} className={inputClass("childName")} placeholder="Alex Doe" />
                  {errors.childName && <p className="text-xs text-destructive mt-1">{errors.childName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Child's Age</label>
                  <input name="childAge" type="number" value={form.childAge ?? ""} onChange={handleChange} className={inputClass("childAge")} placeholder="8" min={4} max={18} />
                  {errors.childAge && <p className="text-xs text-destructive mt-1">{errors.childAge}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Select Camp</label>
                <select name="selectedCamp" value={form.selectedCamp} onChange={handleChange} className={inputClass("selectedCamp")}>
                  <option value="">Choose a camp...</option>
                  {camps.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} — ${c.fees}</option>
                  ))}
                </select>
                {errors.selectedCamp && <p className="text-xs text-destructive mt-1">{errors.selectedCamp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Medical Notes <span className="text-muted-foreground">(optional)</span></label>
                <textarea name="medicalNotes" value={form.medicalNotes} onChange={handleChange} className={inputClass("medicalNotes") + " min-h-[80px]"} placeholder="Allergies, medications, conditions..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Emergency Contact</label>
                <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className={inputClass("emergencyContact")} placeholder="Name & phone number" />
                {errors.emergencyContact && <p className="text-xs text-destructive mt-1">{errors.emergencyContact}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-secondary py-4 text-base font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all hover:shadow-2xl hover:-translate-y-0.5"
            >
              Complete Registration
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
