import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import StatsCard from "@/components/cards/StatsCard";
import { 
  GraduationCap, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Briefcase,
  LogOut,
  Menu,
  X,
  Bot
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const quickQuestions = [
  "What's my timetable for today?",
  "When is my next exam?",
  "What's my current attendance?",
  "Any new placement drives?",
];

const botResponses: Record<string, string> = {
  timetable: "📅 **Today's Schedule:**\n\n• 9:00 AM - Data Structures (Room 301)\n• 11:00 AM - Database Management (Lab 2)\n• 2:00 PM - Software Engineering (Room 405)\n• 4:00 PM - Tutorial Session",
  exam: "📝 **Upcoming Exams:**\n\n• Feb 15 - Data Structures (10:00 AM)\n• Feb 18 - Database Management (2:00 PM)\n• Feb 22 - Software Engineering (10:00 AM)\n\nDon't forget to collect your hall ticket!",
  attendance: "✅ **Your Attendance Summary:**\n\n• Data Structures: 85%\n• Database Management: 92%\n• Software Engineering: 78%\n• Overall: 85%\n\nYou're doing great! Keep it up!",
  placement: "💼 **Active Placement Drives:**\n\n1. **TechCorp Inc.** - Software Developer\n   • Package: ₹12 LPA\n   • Deadline: Feb 10\n\n2. **DataSoft Solutions** - Data Analyst\n   • Package: ₹8 LPA\n   • Deadline: Feb 15\n\nRegister through the placement portal!",
  default: "I'm here to help! You can ask me about:\n\n• 📅 Timetable\n• 📝 Exams\n• ✅ Attendance\n• 💼 Placements\n\nWhat would you like to know?",
};

const StudentDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm your SmartCollege Assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("timetable") || lowerMessage.includes("schedule") || lowerMessage.includes("today")) {
      return botResponses.timetable;
    } else if (lowerMessage.includes("exam") || lowerMessage.includes("test")) {
      return botResponses.exam;
    } else if (lowerMessage.includes("attendance") || lowerMessage.includes("present")) {
      return botResponses.attendance;
    } else if (lowerMessage.includes("placement") || lowerMessage.includes("job") || lowerMessage.includes("drive")) {
      return botResponses.placement;
    }
    return botResponses.default;
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getResponse(text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-card shadow-elevated transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                SmartCollege
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                JS
              </div>
              <div>
                <p className="font-semibold text-foreground">John Student</p>
                <p className="text-sm text-muted-foreground">CS - 3rd Year</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 space-y-4 flex-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Today's Classes</p>
                  <p className="text-xs text-muted-foreground">4 lectures</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Attendance</p>
                  <p className="text-xs text-muted-foreground">85% Overall</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Next Exam</p>
                  <p className="text-xs text-muted-foreground">Feb 15, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Active Drives</p>
                  <p className="text-xs text-muted-foreground">2 companies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-6 border-t">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h1 className="font-display text-lg font-semibold text-foreground">
                College Assistant
              </h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : null}
          </Button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="bg-card shadow-card rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-4 lg:px-6 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap rounded-full"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 lg:p-6 border-t bg-card">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
