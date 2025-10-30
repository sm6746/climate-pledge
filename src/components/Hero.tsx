import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Leaf } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("pledge-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-emerald-50 to-blue-50">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-40"></div>
      
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glass card effect */}
          <div className="glass-effect rounded-3xl p-8 md:p-16 shadow-2xl animate-fade-in-up backdrop-blur-2xl">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 text-primary font-medium text-sm animate-pulse-glow">
                <Sparkles className="w-4 h-4" />
                <span>Join 1M+ Climate Champions</span>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift leading-tight">
                Cool Enough to Care!
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
                Join millions taking action for our planet. Every commitment counts, 
                every voice matters. Together, we're building a sustainable future.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-foreground/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Instant Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>Public Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>Real Impact</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-10 py-7 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Leaf className="mr-2 h-5 w-5" />
                  Take the Pledge Now
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Trust indicators */}
              <p className="text-sm text-foreground/60 pt-4">
                ✓ 100% Free • ✓ Privacy Protected • ✓ Instant Certificate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--background))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#wave-gradient)" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
