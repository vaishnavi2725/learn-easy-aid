import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatsCard from "@/components/cards/StatsCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Users, 
  Calendar, 
  FileText, 
  Briefcase,
  LogOut,
  Menu,
  Search,
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: string;
  attendance: number;
}

const initialStudents: Student[] = [
  { id: "1", name: "John Smith", email: "john@college.edu", course: "Computer Science", year: "3rd", attendance: 85 },
  { id: "2", name: "Sarah Johnson", email: "sarah@college.edu", course: "Information Technology", year: "2nd", attendance: 92 },
  { id: "3", name: "Mike Wilson", email: "mike@college.edu", course: "Computer Science", year: "4th", attendance: 78 },
  { id: "4", name: "Emily Brown", email: "emily@college.edu", course: "Data Science", year: "3rd", attendance: 88 },
  { id: "5", name: "Chris Davis", email: "chris@college.edu", course: "Computer Science", year: "1st", attendance: 95 },
];

const AdminDashboard = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "", year: "" });
  const { toast } = useToast();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.course && newStudent.year) {
      const student: Student = {
        id: Date.now().toString(),
        ...newStudent,
        attendance: 100,
      };
      setStudents([...students, student]);
      setNewStudent({ name: "", email: "", course: "", year: "" });
      setIsAddDialogOpen(false);
      toast({
        title: "Student Added",
        description: `${newStudent.name} has been added successfully.`,
      });
    }
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents(students.filter((s) => s.id !== id));
    toast({
      title: "Student Removed",
      description: `${student?.name} has been removed.`,
      variant: "destructive",
    });
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-admin">
                <Shield className="h-6 w-6 text-admin-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-admin flex items-center justify-center text-admin-foreground font-bold">
                AD
              </div>
              <div>
                <p className="font-semibold text-foreground">Admin User</p>
                <p className="text-sm text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-6 space-y-2 flex-1">
            <Button variant="secondary" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Students
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Timetable
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Exams
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <CheckCircle className="h-4 w-4 mr-2" />
              Attendance
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-2" />
              Placements
            </Button>
          </nav>

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
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-display text-lg font-semibold text-foreground">
              Dashboard
            </h1>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={Users}
              label="Total Students"
              value={students.length}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              icon={GraduationCap}
              label="Avg. Attendance"
              value="86%"
              trend={{ value: 3, isPositive: true }}
            />
            <StatsCard
              icon={FileText}
              label="Upcoming Exams"
              value={3}
            />
            <StatsCard
              icon={Briefcase}
              label="Active Drives"
              value={2}
              trend={{ value: 1, isPositive: true }}
            />
          </div>

          {/* Students Table */}
          <div className="bg-card rounded-2xl shadow-card">
            <div className="p-6 border-b">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Student Management
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    View and manage all student records
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="admin">
                        <Plus className="h-4 w-4" />
                        Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                          Enter the student details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            placeholder="john@college.edu"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <Input
                            id="course"
                            value={newStudent.course}
                            onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Input
                            id="year"
                            value={newStudent.year}
                            onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                            placeholder="3rd"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="admin" onClick={handleAddStudent}>
                          Add Student
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.attendance >= 85 
                            ? "bg-primary/10 text-primary" 
                            : student.attendance >= 75 
                            ? "bg-accent/10 text-accent" 
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {student.attendance}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredStudents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No students found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
