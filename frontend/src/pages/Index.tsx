import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const handleWalletConnect = (address: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedWallet(address);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectedWallet("");
    setSelectedChatId(undefined);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  // Show loading screen while connecting
  if (isConnecting) {
    return (
      <LoadingScreen 
        message="Connecting to EtherChat"
        subMessage="Setting up your secure decentralized chat"
      />
    );
  }

  // Show wallet connection if not connected
  if (!connectedWallet) {
    return (
      <WalletConnect 
        onConnect={handleWalletConnect}
        isConnecting={isConnecting}
      />
    );
  }

  // Show main chat interface
  return (
    <div className="h-screen flex bg-background">
      <ChatSidebar
        currentUser={{
          address: connectedWallet,
          name: "You",
        }}
        onDisconnect={handleDisconnect}
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChatId}
      />
      <ChatWindow
        chatId={selectedChatId}
        recipientName={selectedChatId === "1" ? "Alice" : selectedChatId === "2" ? "Bob" : "Charlie"}
        recipientAddress={selectedChatId === "1" ? "0x123...456" : selectedChatId === "2" ? "0x789...abc" : "0xdef...123"}
        isOnline={selectedChatId !== "2"}
        currentUserAddress={connectedWallet}
      />
    </div>
  );
};

export default Index;
