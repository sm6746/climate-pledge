import { useEffect, useState } from "react";
import { Users, Briefcase, GraduationCap, Target, TrendingUp } from "lucide-react";

interface KPIData {
  target: number;
  achieved: number;
  students: number;
  professionals: number;
  workshops: number;
}

const KPISection = ({ pledges }: { pledges: any[] }) => {
  const [stats, setStats] = useState<KPIData>({
    target: 1000000,
    achieved: 0,
    students: 0,
    professionals: 0,
    workshops: 0,
  });

  useEffect(() => {
    const achieved = pledges.length;
    const students = pledges.filter(p => p.profileType === "Student").length;
    const professionals = pledges.filter(p => p.profileType === "Working Professional").length;
    const workshops = pledges.filter(p => p.profileType === "Other").length;

    setStats({
      target: 1000000,
      achieved,
      students,
      professionals,
      workshops,
    });
  }, [pledges]);

  const KPICard = ({ icon: Icon, label, value, color, gradient }: any) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" 
           style={{ background: gradient }}></div>
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
        <div className="flex flex-col gap-3">
          <div className={`p-3 rounded-xl ${color} w-fit group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-semibold mb-1">{label}</p>
            <p className="text-4xl font-bold text-foreground animate-counter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {value.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const progress = Math.min(100, (stats.achieved / stats.target) * 100);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-sky-50/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Live Statistics</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Growing Global Movement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real people taking real action. Join thousands making a difference.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-foreground">Progress to 1M Target</span>
              <span className="text-sm font-bold text-primary">{progress.toFixed(2)}%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${Math.max(progress, 2)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <KPICard 
            icon={Target}
            label="Target Pledges"
            value={stats.target}
            color="bg-gradient-to-br from-primary to-primary/70"
            gradient="linear-gradient(135deg, hsl(142 76% 36%), hsl(142 76% 50%))"
          />
          <KPICard 
            icon={Users}
            label="Pledges Made"
            value={stats.achieved}
            color="bg-gradient-to-br from-secondary to-secondary/70"
            gradient="linear-gradient(135deg, hsl(199 89% 48%), hsl(199 89% 60%))"
          />
          <KPICard 
            icon={GraduationCap}
            label="Students"
            value={stats.students}
            color="bg-gradient-to-br from-accent to-accent/70"
            gradient="linear-gradient(135deg, hsl(24 95% 53%), hsl(24 95% 65%))"
          />
          <KPICard 
            icon={Briefcase}
            label="Professionals"
            value={stats.professionals}
            color="bg-gradient-to-br from-primary to-primary/70"
            gradient="linear-gradient(135deg, hsl(142 76% 36%), hsl(142 76% 50%))"
          />
          <KPICard 
            icon={Users}
            label="Workshops"
            value={stats.workshops}
            color="bg-gradient-to-br from-secondary to-secondary/70"
            gradient="linear-gradient(135deg, hsl(199 89% 48%), hsl(199 89% 60%))"
          />
        </div>
      </div>
    </section>
  );
};

export default KPISection;
