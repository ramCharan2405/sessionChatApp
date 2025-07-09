import { useState, useEffect } from "react";
import { Loader, Shield, Zap, Lock } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
}

export function LoadingScreen({ 
  message = "Connecting to Web3...", 
  subMessage = "Initializing secure connection" 
}: LoadingScreenProps) {
  const [dots, setDots] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Shield, text: "Verifying wallet connection", color: "text-primary" },
    { icon: Lock, text: "Generating encryption keys", color: "text-encrypted" },
    { icon: Zap, text: "Connecting to IPFS network", color: "text-online" },
    { icon: Shield, text: "Initializing secure chat", color: "text-accent" }
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Main Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow animate-pulse">
            <Loader className="w-10 h-10 text-primary-foreground animate-spin" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-2 border-primary/30 rounded-full animate-ping mx-auto"></div>
        </div>

        {/* Main Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-crypto bg-clip-text text-transparent">
            {message}{dots}
          </h2>
          <p className="text-muted-foreground">
            {subMessage}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                  isActive 
                    ? "bg-primary/10 border border-primary/20 scale-105" 
                    : isCompleted
                    ? "bg-primary/5 border border-primary/10"
                    : "bg-muted/20 border border-muted/10"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isActive || isCompleted ? step.color : "text-muted-foreground"
                }`}>
                  <StepIcon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                </div>
                <span className={`text-sm transition-colors ${
                  isActive 
                    ? "text-foreground font-medium" 
                    : isCompleted 
                    ? "text-foreground/80"
                    : "text-muted-foreground"
                }`}>
                  {step.text}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <Loader className="w-4 h-4 animate-spin text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>🔒 Your connection is secure and encrypted</p>
          <p>🌐 Powered by Ethereum & IPFS</p>
        </div>
      </div>
    </div>
  );
}