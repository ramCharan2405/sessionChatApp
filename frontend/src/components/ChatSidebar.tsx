import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Settings, 
  LogOut, 
  Shield, 
  Wifi,
  WifiOff,
  Lock
} from "lucide-react";

interface ChatSidebarProps {
  currentUser: {
    address: string;
    avatar?: string;
    name?: string;
  };
  onDisconnect: () => void;
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

export function ChatSidebar({ currentUser, onDisconnect, onSelectChat, selectedChatId }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // Mock chat data - in real app this would come from blockchain/IPFS
  const chats = [
    {
      id: "1",
      name: "Alice",
      address: "0x123...456",
      lastMessage: "Hey, let's discuss the smart contract updates",
      timestamp: "2m ago",
      unread: 2,
      isOnline: true,
      isEncrypted: true,
      avatar: null
    },
    {
      id: "2", 
      name: "Bob",
      address: "0x789...abc",
      lastMessage: "The IPFS integration is working great!",
      timestamp: "1h ago",
      unread: 0,
      isOnline: false,
      isEncrypted: true,
      avatar: null
    },
    {
      id: "3",
      name: "Charlie",
      address: "0xdef...123",
      lastMessage: "Can you review my pull request?",
      timestamp: "3h ago", 
      unread: 1,
      isOnline: true,
      isEncrypted: true,
      avatar: null
    }
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-crypto bg-clip-text text-transparent">
            EtherChat
          </h1>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-online" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {currentUser.name?.[0] || formatAddress(currentUser.address)[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-sidebar-foreground">
              {currentUser.name || "Anonymous"}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {formatAddress(currentUser.address)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDisconnect}
            className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/40" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                selectedChatId === chat.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {chat.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-sidebar ${
                    chat.isOnline ? "bg-online" : "bg-muted"
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{chat.name}</span>
                      {chat.isEncrypted && (
                        <Lock className="w-3 h-3 text-encrypted" />
                      )}
                    </div>
                    <span className="text-xs opacity-60">{chat.timestamp}</span>
                  </div>
                  
                  <p className="text-xs opacity-80 truncate mb-1">
                    {chat.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-60">
                      {formatAddress(chat.address)}
                    </span>
                    {chat.unread > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 text-xs bg-primary">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-3 p-2 bg-primary/10 rounded-lg">
          <Shield className="w-4 h-4 text-encrypted" />
          <span className="text-xs text-sidebar-foreground/80">
            All messages are end-to-end encrypted
          </span>
        </div>
      </div>
    </div>
  );
}