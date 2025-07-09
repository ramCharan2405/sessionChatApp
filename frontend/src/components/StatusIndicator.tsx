import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  WifiOff, 
  Shield, 
  Lock, 
  Zap,
  AlertTriangle 
} from "lucide-react";

interface StatusIndicatorProps {
  isOnline: boolean;
  isEncrypted: boolean;
  networkStatus: "connected" | "connecting" | "disconnected";
  className?: string;
}

export function StatusIndicator({ 
  isOnline, 
  isEncrypted, 
  networkStatus,
  className = ""
}: StatusIndicatorProps) {
  const getNetworkIcon = () => {
    switch (networkStatus) {
      case "connected":
        return <Wifi className="w-3 h-3" />;
      case "connecting":
        return <Zap className="w-3 h-3 animate-pulse" />;
      default:
        return <WifiOff className="w-3 h-3" />;
    }
  };

  const getNetworkColor = () => {
    switch (networkStatus) {
      case "connected":
        return "text-online";
      case "connecting":
        return "text-accent";
      default:
        return "text-destructive";
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Network Status */}
      <Badge 
        variant="outline" 
        className={`text-xs border-current/20 ${getNetworkColor()}`}
      >
        {getNetworkIcon()}
        <span className="ml-1 capitalize">{networkStatus}</span>
      </Badge>

      {/* Encryption Status */}
      {isEncrypted && (
        <Badge 
          variant="outline" 
          className="text-xs border-encrypted/20 text-encrypted"
        >
          <Lock className="w-3 h-3 mr-1" />
          Encrypted
        </Badge>
      )}

      {/* Online Status */}
      <Badge 
        variant="outline" 
        className={`text-xs border-current/20 ${
          isOnline ? "text-online" : "text-muted-foreground"
        }`}
      >
        <div className={`w-2 h-2 rounded-full mr-1 ${
          isOnline ? "bg-online" : "bg-muted-foreground"
        }`} />
        {isOnline ? "Online" : "Offline"}
      </Badge>

      {/* Security Indicator */}
      <Badge 
        variant="outline" 
        className="text-xs border-primary/20 text-primary"
      >
        <Shield className="w-3 h-3 mr-1" />
        Secured
      </Badge>
    </div>
  );
}