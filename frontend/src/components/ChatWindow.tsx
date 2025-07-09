import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Lock, 
  Shield, 
  MoreVertical, 
  Phone, 
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  isEncrypted: boolean;
  isDelivered: boolean;
  isRead: boolean;
  txHash?: string;
}

interface ChatWindowProps {
  chatId?: string;
  recipientName?: string;
  recipientAddress?: string;
  recipientAvatar?: string;
  isOnline?: boolean;
  currentUserAddress: string;
}

export function ChatWindow({ 
  chatId, 
  recipientName = "Alice", 
  recipientAddress = "0x123...456",
  recipientAvatar,
  isOnline = true,
  currentUserAddress 
}: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! I've been working on the new smart contract for our decentralized chat. The message encryption is working perfectly with IPFS storage.",
      sender: recipientAddress,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
      isEncrypted: true,
      isDelivered: true,
      isRead: true,
      txHash: "0xabc123..."
    },
    {
      id: "2", 
      content: "That sounds amazing! I love how we can have truly private conversations without any central server. The Web3 future is here! 🚀",
      sender: currentUserAddress,
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true,
      isEncrypted: true,
      isDelivered: true,
      isRead: true,
      txHash: "0xdef456..."
    },
    {
      id: "3",
      content: "Exactly! And with the token-based spam protection, we can keep the platform clean while maintaining decentralization. Want to test the group chat feature next?",
      sender: recipientAddress,
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false,
      isEncrypted: true,
      isDelivered: true,
      isRead: true,
      txHash: "0x789abc..."
    },
    {
      id: "4",
      content: "Absolutely! Let me create a test group and invite some other developers. This is going to revolutionize how we communicate.",
      sender: currentUserAddress,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      isOwn: true,
      isEncrypted: true,
      isDelivered: true,
      isRead: false,
      txHash: "0x456def..."
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: currentUserAddress,
      timestamp: new Date(),
      isOwn: true,
      isEncrypted: true,
      isDelivered: false,
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, isDelivered: true } : msg
      ));
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
            <Lock className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome to EtherChat</h2>
          <p className="text-muted-foreground max-w-md">
            Select a conversation to start secure, decentralized messaging with end-to-end encryption.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="text-xs">
              🔒 Zero-knowledge
            </Badge>
            <Badge variant="secondary" className="text-xs">
              🌐 IPFS Storage
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={recipientAvatar} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {recipientName[0]}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                isOnline ? "bg-online" : "bg-muted"
              }`} />
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground">{recipientName}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatAddress(recipientAddress)}</span>
                {isOnline && <span className="text-online">● Online</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-encrypted text-encrypted">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.isOwn
                      ? "bg-chat-sent text-primary-foreground ml-auto"
                      : "bg-chat-received text-secondary-foreground"
                  } shadow-sm`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                    <div className="flex items-center gap-1 text-xs opacity-70">
                      {msg.isEncrypted && <Lock className="w-3 h-3" />}
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                    
                    {msg.isOwn && (
                      <div className="flex items-center">
                        {msg.isDelivered ? (
                          msg.isRead ? (
                            <CheckCheck className="w-4 h-4 text-online" />
                          ) : (
                            <CheckCheck className="w-4 h-4" />
                          )
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {msg.txHash && (
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    Tx: {msg.txHash}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a secure message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-10 bg-background border-border"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="h-9 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-2">
          <Badge variant="outline" className="text-xs border-primary/20">
            <Shield className="w-3 h-3 mr-1" />
            Messages are encrypted and stored on IPFS
          </Badge>
        </div>
      </div>
    </div>
  );
}