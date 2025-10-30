import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Leaf } from "lucide-react";
import { toast } from "sonner";
import { createPledge } from "@/lib/pledgeService";

interface PledgeFormProps {
  onSubmit: (data: any) => void;
}

const commitmentThemes = {
  "Energy & Water Conservation": [
    "Switch to LED bulbs and energy-efficient appliances",
    "Reduce water usage through mindful consumption",
    "Use renewable energy sources where possible"
  ],
  "Sustainable Transportation": [
    "Use public transport, carpool, or bike regularly",
    "Walk for short distances instead of driving",
    "Consider electric or hybrid vehicles for future purchases"
  ],
  "Waste Reduction & Recycling": [
    "Practice reduce, reuse, recycle in daily life",
    "Avoid single-use plastics and carry reusable items",
    "Compost organic waste and support zero-waste initiatives"
  ]
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const PledgeForm = ({ onSubmit }: PledgeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    profileType: "",
    commitments: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.profileType) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.commitments.length === 0) {
      toast.error("Please select at least one commitment");
      return;
    }

    try {
      const pledge = await createPledge({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        state: formData.state,
        profileType: formData.profileType as 'Student' | 'Working Professional' | 'Other',
        commitments: formData.commitments
      });

      toast.success("Thank you for your pledge!");
      onSubmit(pledge);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        state: "",
        profileType: "",
        commitments: [],
      });
    } catch (error) {
      console.error('Error submitting pledge:', error);
      toast.error("Failed to submit pledge. Please try again.");
    }
  };

  const toggleCommitment = (commitment: string) => {
    setFormData(prev => ({
      ...prev,
      commitments: prev.commitments.includes(commitment)
        ? prev.commitments.filter(c => c !== commitment)
        : [...prev.commitments, commitment]
    }));
  };

  return (
    <section id="pledge-form" className="py-24 bg-gradient-to-b from-blue-50/50 via-background to-emerald-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              <Leaf className="w-4 h-4" />
              <span>Make Your Commitment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Take Your Climate Pledge
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your commitments and join the movement
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mobile" className="text-foreground font-medium">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-foreground font-medium">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="profileType" className="text-foreground font-medium">Profile Type *</Label>
                <Select value={formData.profileType} onValueChange={(value) => setFormData({ ...formData, profileType: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Working Professional">Working Professional</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Commitments */}
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-bold text-foreground">Choose Your Commitments</h3>
                {Object.entries(commitmentThemes).map(([theme, commitments]) => (
                  <div key={theme} className="space-y-3">
                    <h4 className="font-semibold text-primary text-lg">{theme}</h4>
                    {commitments.map((commitment) => (
                      <div key={commitment} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={commitment}
                          checked={formData.commitments.includes(commitment)}
                          onCheckedChange={() => toggleCommitment(commitment)}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={commitment}
                          className="text-sm font-normal cursor-pointer leading-relaxed text-foreground"
                        >
                          {commitment}
                        </Label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Privacy Note */}
              <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3 border border-border">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Privacy Assurance:</strong> Your mobile number and email are required for validation purposes only. 
                  They will never be displayed publicly or shared with third parties. We use this information solely for verification and engagement.
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all duration-300 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
              >
                Submit My Pledge
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PledgeForm;
