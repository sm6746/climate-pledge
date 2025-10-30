import { Button } from "@/components/ui/button";
import { Download, Heart, X } from "lucide-react";
import { useRef } from "react";

interface CertificateProps {
  name: string;
  commitmentCount: number;
  onClose: () => void;
}

const Certificate = ({ name, commitmentCount, onClose }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    // In a real implementation, you would use html2canvas or similar library
    // For now, we'll just show a toast
    import("sonner").then(({ toast }) => {
      toast.success("Certificate download started! (Demo mode)");
    });
  };

  const hearts = Math.min(5, Math.ceil(commitmentCount / 2));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-12 relative animate-scale-in shadow-2xl">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>

        <div ref={certificateRef} className="space-y-6">
          {/* Certificate Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-full">
                <Heart className="h-12 w-12 text-white fill-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Certificate of Commitment
            </h2>
          </div>

          {/* Certificate Body */}
          <div className="border-t-2 border-b-2 border-primary/20 py-8 space-y-6">
            <p className="text-center text-lg text-muted-foreground">
              This certifies that
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-foreground">
              {name}
            </h3>
            <p className="text-center text-lg text-muted-foreground max-w-md mx-auto">
              has pledged to take meaningful climate action and is officially
            </p>
            <p className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Cool Enough to Care!
            </p>
          </div>

          {/* Love Rating */}
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Love for Planet Rating</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-8 w-8 ${
                    i < hearts 
                      ? "text-red-500 fill-red-500" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {commitmentCount} commitment{commitmentCount !== 1 ? "s" : ""} made
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <p>Together, we're building a sustainable future</p>
            <p className="mt-2">Climate Action Pledge • {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={downloadCertificate}
            className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Certificate
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
