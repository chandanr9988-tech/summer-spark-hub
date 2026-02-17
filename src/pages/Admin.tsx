import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Users, ClipboardList, Loader2, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";

interface Registration {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  child_name: string;
  child_age: number;
  selected_camp: string;
  payment_status: string;
  created_at: string;
  medical_notes: string | null;
  emergency_contact: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!adminLoading && !isAdmin && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchRegistrations = async () => {
      const { data } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      setRegistrations(data || []);
      setFetching(false);
    };
    fetchRegistrations();
  }, [isAdmin]);

  const togglePaymentStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "confirmed" ? "pending" : "confirmed";
    setUpdating(id);
    const { error } = await supabase
      .from("registrations")
      .update({ payment_status: newStatus })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, payment_status: newStatus } : r))
      );
      toast({ title: "Updated", description: `Payment marked as ${newStatus}` });
    }
    setUpdating(null);
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>

          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-3 mb-10">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <ClipboardList className="h-5 w-5 text-secondary" />
                <span className="text-sm font-semibold text-muted-foreground">Total Registrations</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{registrations.length}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-muted-foreground">Pending Payments</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">
                {registrations.filter((r) => r.payment_status === "pending").length}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">Confirmed</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">
                {registrations.filter((r) => r.payment_status === "confirmed").length}
              </p>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="glass-card rounded-2xl p-6 overflow-x-auto">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">All Registrations</h2>
            {fetching ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : registrations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No registrations yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-semibold">Child</th>
                    <th className="pb-3 pr-4 font-semibold">Age</th>
                    <th className="pb-3 pr-4 font-semibold">Camp</th>
                    <th className="pb-3 pr-4 font-semibold">Parent</th>
                    <th className="pb-3 pr-4 font-semibold">Email</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4 font-medium text-foreground">{r.child_name}</td>
                      <td className="py-3 pr-4">{r.child_age}</td>
                      <td className="py-3 pr-4 capitalize">{r.selected_camp.replace(/-/g, " ")}</td>
                      <td className="py-3 pr-4">{r.parent_name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{r.parent_email}</td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => togglePaymentStatus(r.id, r.payment_status)}
                          disabled={updating === r.id}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                            r.payment_status === "confirmed"
                              ? "bg-accent/10 text-accent hover:bg-accent/20"
                              : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          }`}
                        >
                          {updating === r.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : r.payment_status === "confirmed" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {r.payment_status}
                        </button>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
