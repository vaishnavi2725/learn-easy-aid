import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import FeatureCard from "@/components/cards/FeatureCard";
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Briefcase,
  MessageCircle,
  Shield
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            AI-Powered College Assistant
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Your Smart{" "}
            <span className="bg-clip-text text-transparent gradient-primary">
              College Assistant
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Get instant answers about your timetable, exams, attendance, and placement opportunities. 
            Everything you need, in one place.
          </p>
          
          {/* Role Selection */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/login">
              <Button variant="student" size="xl" className="w-full sm:w-auto">
                <GraduationCap className="h-5 w-5" />
                I'm a Student
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="admin" size="xl" className="w-full sm:w-auto">
                <Shield className="h-5 w-5" />
                I'm an Admin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            What Can You Ask?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our AI assistant is trained to help you with all your college-related queries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Calendar}
            title="Timetable"
            description="Check your daily, weekly schedule and upcoming lectures"
          />
          <FeatureCard
            icon={FileText}
            title="Exams"
            description="Get exam schedules, syllabus info, and preparation tips"
          />
          <FeatureCard
            icon={CheckCircle}
            title="Attendance"
            description="Track your attendance and get alerts when it's low"
          />
          <FeatureCard
            icon={Briefcase}
            title="Placements"
            description="Discover job opportunities and placement drives"
          />
        </div>
      </section>

      {/* Role Info Section */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-card shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary mb-6">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              For Students
            </h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                Chat with AI assistant 24/7
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                View timetable and exam schedules
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                Track attendance records
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                Explore placement opportunities
              </li>
            </ul>
            <Link to="/student/login">
              <Button variant="student">Access Student Portal</Button>
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-card shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-admin mb-6">
              <Users className="h-7 w-7 text-admin-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              For Administrators
            </h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-admin" />
                Manage student records
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-admin" />
                Update timetables and exams
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-admin" />
                Track attendance data
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-admin" />
                Post placement opportunities
              </li>
            </ul>
            <Link to="/admin/login">
              <Button variant="admin">Access Admin Portal</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 SmartCollege Assistant. Built with ❤️ for students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
