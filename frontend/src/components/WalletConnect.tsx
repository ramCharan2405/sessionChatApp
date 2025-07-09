import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Zap } from "lucide-react";

interface WalletConnectProps {
  onConnect: (address: string) => void;
  isConnecting?: boolean;
}

export function WalletConnect({ onConnect, isConnecting = false }: WalletConnectProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  const handleConnect = async (walletType: string) => {
    setSelectedWallet(walletType);
    
    if (walletType === "metamask" && typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          onConnect(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      // Mock connection for demo
      setTimeout(() => {
        onConnect("0x742d35Cc6634C0532925a3b8D847C3De972d8d3C");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary p-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-glass border-muted shadow-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-crypto bg-clip-text text-transparent">
            EtherChat
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connect your wallet to start secure, decentralized messaging
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleConnect("metamask")}
              disabled={isConnecting}
              className="h-14 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">MetaMask</div>
                  <div className="text-xs text-muted-foreground">Most popular wallet</div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleConnect("walletconnect")}
              disabled={isConnecting}
              className="h-14 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">WalletConnect</div>
                  <div className="text-xs text-muted-foreground">Mobile & desktop wallets</div>
                </div>
              </div>
            </Button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <Shield className="w-4 h-4 text-encrypted" />
            <div className="text-xs text-muted-foreground">
              <span className="text-encrypted font-medium">End-to-end encrypted</span> messaging with decentralized storage
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="text-xs">
              🔒 Zero-knowledge
            </Badge>
            <Badge variant="secondary" className="text-xs">
              🌐 IPFS Storage
            </Badge>
            <Badge variant="secondary" className="text-xs">
              ⚡ Web3 Native
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}