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
  timetable: "📅 **Today's Schedule (Monday, Feb 3, 2026):**\n\n| Time | Subject | Faculty | Room |\n|------|---------|---------|------|\n| 9:00 AM | Data Structures | Dr. Sharma | Room 301 |\n| 11:00 AM | Database Management | Prof. Gupta | Lab 2 |\n| 2:00 PM | Software Engineering | Dr. Patel | Room 405 |\n| 4:00 PM | Tutorial Session | TA Rahul | Room 102 |\n\n**Tomorrow:** Operating Systems, Computer Networks, Mini Project Lab",
  exam: "📝 **Upcoming Examinations:**\n\n**Internal Assessments (IA-2):**\n| Date | Subject | Time | Venue |\n|------|---------|------|-------|\n| Feb 15 | Data Structures | 10:00 AM | Hall A |\n| Feb 17 | Database Management | 2:00 PM | Hall B |\n| Feb 19 | Software Engineering | 10:00 AM | Hall A |\n| Feb 21 | Operating Systems | 2:00 PM | Hall C |\n\n**Semester End Exams:** April 15 - May 5, 2026\n\n📌 **Note:** Hall tickets available from Feb 10. Collect from Exam Cell (Block A, Room 105)",
  attendance: "✅ **Your Attendance Summary (as of Feb 3, 2026):**\n\n| Subject | Present | Total | Percentage | Status |\n|---------|---------|-------|------------|--------|\n| Data Structures | 34 | 40 | 85% | ✅ Safe |\n| Database Management | 37 | 40 | 92% | ✅ Safe |\n| Software Engineering | 31 | 40 | 78% | ⚠️ Warning |\n| Operating Systems | 36 | 40 | 90% | ✅ Safe |\n| Computer Networks | 33 | 40 | 82% | ✅ Safe |\n\n**Overall Attendance:** 85.4%\n**Minimum Required:** 75%\n\n⚠️ **Alert:** Attend next 3 Software Engineering classes to reach safe zone!",
  placement: "💼 **Active Placement Drives (Feb 2026):**\n\n**1. Google India** 🌟\n   • Role: Software Engineer (L3)\n   • Package: ₹32 LPA + Stocks\n   • Eligibility: CGPA ≥ 8.0, No backlogs\n   • Last Date: Feb 8, 2026\n\n**2. Microsoft** 🌟\n   • Role: SDE-1\n   • Package: ₹28 LPA\n   • Eligibility: CGPA ≥ 7.5\n   • Last Date: Feb 12, 2026\n\n**3. Infosys** \n   • Role: Systems Engineer\n   • Package: ₹6.5 LPA\n   • Eligibility: CGPA ≥ 6.0\n   • Last Date: Feb 15, 2026\n\n**4. TCS Digital**\n   • Role: Digital Engineer\n   • Package: ₹9 LPA\n   • Eligibility: CGPA ≥ 7.0\n   • Last Date: Feb 18, 2026\n\n**5. Amazon**\n   • Role: SDE Intern (6 months + PPO)\n   • Stipend: ₹60,000/month\n   • Eligibility: 3rd Year, CGPA ≥ 7.5\n   • Last Date: Feb 20, 2026\n\n📍 **Upcoming Campus Visits:** Wipro (Feb 25), Accenture (Mar 2), Deloitte (Mar 8)\n\n👉 Register via Placement Portal: placement.smartcollege.edu",
  default: "👋 Hello! I'm your **SmartCollege AI Assistant**.\n\nI can help you with:\n\n• 📅 **Timetable** - Today's classes, weekly schedule, room changes\n• 📝 **Exams** - Dates, syllabus, hall tickets, results\n• ✅ **Attendance** - Subject-wise %, shortage alerts\n• 💼 **Placements** - Active drives, company details, eligibility\n• 📚 **Library** - Book availability, due dates\n• 💰 **Fees** - Payment status, receipts, deadlines\n\nJust type your question or tap a quick option below!",
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
                  <p className="text-xs text-muted-foreground">4 lectures • Dr. Sharma first</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Attendance</p>
                  <p className="text-xs text-muted-foreground">85.4% Overall ✅</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Next Exam</p>
                  <p className="text-xs text-muted-foreground">Feb 15 • Data Structures</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Active Drives</p>
                  <p className="text-xs text-muted-foreground">5 companies • Google, Microsoft...</p>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-foreground">
                  Student Portal
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">SmartCollege Institute of Technology</p>
              </div>
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
