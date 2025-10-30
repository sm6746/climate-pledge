import { Leaf, Globe, Heart, Sparkles } from "lucide-react";

const WhyClimateAction = () => {
  const reasons = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "Individual actions multiply into collective change. Your commitment inspires others and creates ripples across communities.",
      color: "from-primary to-primary/70"
    },
    {
      icon: Heart,
      title: "For Future Generations",
      description: "The choices we make today define the world we leave behind. Be part of the solution, not the problem.",
      color: "from-secondary to-secondary/70"
    },
    {
      icon: Leaf,
      title: "Sustainable Living",
      description: "Small daily habits lead to significant environmental benefits. Every pledge is a step toward a healthier planet.",
      color: "from-accent to-accent/70"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-emerald-50/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>The Science is Clear</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Why Take Climate Action?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Climate change is the defining challenge of our time, but we hold the power to make a difference. 
            Individual responsibility meets global movement when we commit to sustainable habits together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${reason.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-2xl`}></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 h-full">
                <div className={`bg-gradient-to-br ${reason.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                  <reason.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-1 rounded-2xl">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">97%</div>
                  <div className="text-sm text-muted-foreground">Scientists Agree</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">2030</div>
                  <div className="text-sm text-muted-foreground">Critical Deadline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">NOW</div>
                  <div className="text-sm text-muted-foreground">Time to Act</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClimateAction;
