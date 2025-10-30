import { useState } from "react";
import Hero from "@/components/Hero";
import KPISection from "@/components/KPISection";
import WhyClimateAction from "@/components/WhyClimateAction";
import PledgeForm from "@/components/PledgeForm";
import Certificate from "@/components/Certificate";
import PledgeWall from "@/components/PledgeWall";
import { toast } from "sonner";

interface Pledge {
  id: string;
  name: string;
  email: string;
  mobile: string;
  date: string;
  state: string;
  profileType: string;
  commitments: string[];
  commitmentCount: number;
}

const Index = () => {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentPledge, setCurrentPledge] = useState<Pledge | null>(null);

  const handlePledgeSubmit = (formData: any) => {
    const newPledge: Pledge = {
      id: String(pledges.length + 1).padStart(4, "0"),
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      state: formData.state,
      profileType: formData.profileType,
      commitments: formData.commitments,
      commitmentCount: formData.commitments.length,
    };

    setPledges([newPledge, ...pledges]);
    setCurrentPledge(newPledge);
    setShowCertificate(true);
    
    toast.success("Pledge submitted successfully! 🌍", {
      description: "Thank you for joining the climate action movement!"
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <KPISection pledges={pledges} />
      <WhyClimateAction />
      <PledgeForm onSubmit={handlePledgeSubmit} />
      <PledgeWall pledges={pledges} />

      {showCertificate && currentPledge && (
        <Certificate
          name={currentPledge.name}
          commitmentCount={currentPledge.commitmentCount}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default Index;
