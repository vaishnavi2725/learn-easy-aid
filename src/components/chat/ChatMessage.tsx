import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          isBot ? "gradient-primary" : "bg-secondary"
        )}
      >
        {isBot ? (
          <Bot className="h-5 w-5 text-primary-foreground" />
        ) : (
          <User className="h-5 w-5 text-secondary-foreground" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isBot
            ? "bg-card shadow-card rounded-tl-sm"
            : "gradient-primary text-primary-foreground rounded-tr-sm"
        )}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        {timestamp && (
          <p className={cn(
            "mt-1 text-xs",
            isBot ? "text-muted-foreground" : "text-primary-foreground/70"
          )}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
