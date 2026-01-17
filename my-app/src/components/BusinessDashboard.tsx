import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Activity,
  Calendar,
  UserCheck,
  AlertTriangle,
  Sparkles,
  Mail,
  UserPlus,
  X,
  Send,
  Copy,
  Check,
  Trash2,
  Crown,
  Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

type BusinessView = 'overview' | 'projects' | 'employees' | 'tasks' | 'team';

interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  teamSize: number;
  budget: number;
  spent: number;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  energyLevel: number;
  stressLevel: number;
  taskCount: number;
  performance: number;
  status: 'healthy' | 'warning' | 'critical';
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  project: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

interface PendingInvitation {
  id: string;
  email: string;
  role: 'manager' | 'member';
  invitedBy: string;
  sentDate: string;
  status: 'pending' | 'expired';
}

interface BusinessPlan {
  name: string;
  maxMembers: number;
  currentMembers: number;
  features: string[];
}

export default function BusinessDashboard() {
  const [currentView, setCurrentView] = useState<BusinessView>('overview');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'manager' | 'member'>('member');
  const [copiedLink, setCopiedLink] = useState(false);

  // Business Plan
  const businessPlan: BusinessPlan = {
    name: 'Business Pro',
    maxMembers: 20,
    currentMembers: 8,
    features: ['Unlimited projects', 'Team analytics', 'Priority support', 'Custom integrations']
  };

  // Team Members
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@company.com',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A',
      joinedDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@company.com',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B',
      joinedDate: '2024-03-20',
      status: 'active'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@company.com',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C',
      joinedDate: '2024-05-10',
      status: 'active'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      email: 'phamthid@company.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D',
      joinedDate: '2024-06-15',
      status: 'active'
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      email: 'hoangvane@company.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=E',
      joinedDate: '2024-07-20',
      status: 'active'
    },
    {
      id: '6',
      name: 'Đỗ Thị F',
      email: 'dothif@company.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=F',
      joinedDate: '2024-08-05',
      status: 'active'
    },
    {
      id: '7',
      name: 'Vũ Văn G',
      email: 'vuvang@company.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=G',
      joinedDate: '2024-09-12',
      status: 'active'
    },
    {
      id: '8',
      name: 'Bùi Thị H',
      email: 'buithih@company.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=H',
      joinedDate: '2024-10-01',
      status: 'inactive'
    }
  ];

  // Pending Invitations
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([
    {
      id: '1',
      email: 'newmember1@company.com',
      role: 'member',
      invitedBy: 'Nguyễn Văn A',
      sentDate: '2025-01-10',
      status: 'pending'
    },
    {
      id: '2',
      email: 'newmanager@company.com',
      role: 'manager',
      invitedBy: 'Nguyễn Văn A',
      sentDate: '2025-01-12',
      status: 'pending'
    },
    {
      id: '3',
      email: 'expired@company.com',
      role: 'member',
      invitedBy: 'Trần Thị B',
      sentDate: '2024-12-20',
      status: 'expired'
    }
  ]);

  // Mock data
  const projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      progress: 75,
      status: 'on-track',
      dueDate: '2025-01-15',
      teamSize: 5,
      budget: 50000,
      spent: 35000
    },
    {
      id: '2',
      name: 'Mobile App Development',
      progress: 45,
      status: 'at-risk',
      dueDate: '2025-02-28',
      teamSize: 8,
      budget: 120000,
      spent: 65000
    },
    {
      id: '3',
      name: 'Marketing Campaign Q1',
      progress: 30,
      status: 'delayed',
      dueDate: '2025-01-31',
      teamSize: 3,
      budget: 30000,
      spent: 22000
    },
    {
      id: '4',
      name: 'CRM Integration',
      progress: 90,
      status: 'on-track',
      dueDate: '2025-01-10',
      teamSize: 4,
      budget: 40000,
      spent: 38000
    }
  ];

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      role: 'Senior Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A',
      energyLevel: 85,
      stressLevel: 35,
      taskCount: 5,
      performance: 92,
      status: 'healthy'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      role: 'UI/UX Designer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B',
      energyLevel: 65,
      stressLevel: 55,
      taskCount: 8,
      performance: 88,
      status: 'warning'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      role: 'Project Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C',
      energyLevel: 45,
      stressLevel: 75,
      taskCount: 12,
      performance: 78,
      status: 'critical'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      role: 'Marketing Specialist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D',
      energyLevel: 90,
      stressLevel: 25,
      taskCount: 4,
      performance: 95,
      status: 'healthy'
    },
    {
      id: '5',
      name: 'Hoàng Văn E',
      role: 'Backend Developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=E',
      energyLevel: 70,
      stressLevel: 50,
      taskCount: 6,
      performance: 85,
      status: 'warning'
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete API documentation',
      assignedTo: 'Nguyễn Văn A',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-01-02',
      project: 'CRM Integration'
    },
    {
      id: '2',
      title: 'Design homepage mockup',
      assignedTo: 'Trần Thị B',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-01-03',
      project: 'Website Redesign'
    },
    {
      id: '3',
      title: 'Review sprint backlog',
      assignedTo: 'Lê Văn C',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-01-05',
      project: 'Mobile App Development'
    },
    {
      id: '4',
      title: 'Create social media content',
      assignedTo: 'Phạm Thị D',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-12-30',
      project: 'Marketing Campaign Q1'
    },
    {
      id: '5',
      title: 'Optimize database queries',
      assignedTo: 'Hoàng Văn E',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-01-04',
      project: 'CRM Integration'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
      case 'healthy':
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'at-risk':
      case 'warning':
      case 'in-progress':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'delayed':
      case 'critical':
      case 'pending':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'manager':
        return <Shield className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'manager':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleSendInvite = () => {
    if (!inviteEmail) {
      toast.error('Vui lòng nhập email');
      return;
    }

    if (businessPlan.currentMembers >= businessPlan.maxMembers) {
      toast.error('Đã đạt giới hạn số lượng thành viên. Vui lòng nâng cấp gói!');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      toast.error('Email không hợp lệ');
      return;
    }

    // Check if email already exists
    if (teamMembers.some(m => m.email === inviteEmail) || 
        pendingInvitations.some(i => i.email === inviteEmail && i.status === 'pending')) {
      toast.error('Email này đã được mời hoặc đang là thành viên');
      return;
    }

    const newInvitation: PendingInvitation = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedBy: 'Nguyễn Văn A',
      sentDate: new Date().toISOString(),
      status: 'pending'
    };

    setPendingInvitations([...pendingInvitations, newInvitation]);
    toast.success(`Đã gửi lời mời đến ${inviteEmail}`, {
      description: `Vai trò: ${inviteRole === 'manager' ? 'Quản lý' : 'Thành viên'}`
    });
    
    setInviteEmail('');
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `https://dailyboost.com/invite/company123?role=${inviteRole}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    toast.success('Đã sao chép link mời!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCancelInvitation = (invitationId: string) => {
    setPendingInvitations(pendingInvitations.filter(inv => inv.id !== invitationId));
    toast.success('Đã hủy lời mời');
  };

  const handleResendInvitation = (email: string) => {
    toast.success(`Đã gửi lại lời mời đến ${email}`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Tổng Dự Án</p>
          <h3>{projects.length}</h3>
          <p className="text-xs text-green-500 mt-2">+2 so với tháng trước</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#7F7FD5] to-[#FF8A00] rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Nhân Viên</p>
          <h3>{employees.length}</h3>
          <p className="text-xs text-blue-500 mt-2">87% năng suất TB</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Nhiệm Vụ Hoàn Thành</p>
          <h3>{tasks.filter(t => t.status === 'completed').length}/{tasks.length}</h3>
          <p className="text-xs text-green-500 mt-2">20% tăng hiệu suất</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Cảnh Báo</p>
          <h3>{projects.filter(p => p.status !== 'on-track').length}</h3>
          <p className="text-xs text-orange-500 mt-2">Cần xử lý ngay</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => setCurrentView('projects')}
          className="h-auto py-6 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col items-center gap-2">
            <Briefcase className="w-8 h-8" />
            <span>Quản Lý Dự Án</span>
          </div>
        </Button>

        <Button
          onClick={() => setCurrentView('employees')}
          className="h-auto py-6 bg-gradient-to-r from-[#7F7FD5] to-[#FF8A00] hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8" />
            <span>Sức Khỏe Nhân Viên</span>
          </div>
        </Button>

        <Button
          onClick={() => setCurrentView('tasks')}
          className="h-auto py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-8 h-8" />
            <span>Giao Nhiệm Vụ</span>
          </div>
        </Button>
      </div>

      {/* Recent Activities */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h4>Hoạt Động Gần Đây</h4>
          <Button variant="ghost" size="sm">Xem tất cả</Button>
        </div>
        <div className="space-y-4">
          {tasks.slice(0, 5).map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 hover:bg-white/50 dark:hover:bg-black/20 rounded-xl transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(task.status)}`}>
                {task.status === 'completed' && <CheckCircle className="w-5 h-5" />}
                {task.status === 'in-progress' && <Clock className="w-5 h-5" />}
                {task.status === 'pending' && <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p>{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.assignedTo} • {task.project}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Quản Lý Dự Án</h3>
        <Button className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]">
          + Tạo Dự Án Mới
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h5>{project.name}</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Hạn: {new Date(project.dueDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(project.status)}`}>
                {project.status === 'on-track' && 'Đúng tiến độ'}
                {project.status === 'at-risk' && 'Có rủi ro'}
                {project.status === 'delayed' && 'Trễ hạn'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Tiến độ</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Ngân sách</span>
                <span>{((project.spent / project.budget) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(project.spent / project.budget) * 100}%` }}
                  className={`h-full ${
                    (project.spent / project.budget) > 0.9 
                      ? 'bg-red-500' 
                      : (project.spent / project.budget) > 0.7 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
              </p>
            </div>

            {/* Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{project.teamSize} thành viên</span>
              </div>
              <Button variant="ghost" size="sm">Chi tiết →</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Sức Khỏe Nhân Viên</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {employees.filter(e => e.status === 'critical').length} cần chú ý
          </span>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Báo cáo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative">
                <img 
                  src={employee.avatar} 
                  alt={employee.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                  employee.status === 'healthy' ? 'bg-green-500' :
                  employee.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5>{employee.name}</h5>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      employee.status === 'healthy' ? 'text-green-500 bg-green-50 dark:bg-green-900/20' :
                      employee.status === 'warning' ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                      'text-red-500 bg-red-50 dark:bg-red-900/20'
                    }`}>
                      {employee.status === 'healthy' && <UserCheck className="w-3 h-3 inline mr-1" />}
                      {employee.status === 'warning' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                      {employee.status === 'critical' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                      {employee.status === 'healthy' ? 'Tốt' : employee.status === 'warning' ? 'Cảnh báo' : 'Cần chú ý'}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Energy Level */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Năng lượng</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${employee.energyLevel}%` }}
                          className={`h-full ${
                            employee.energyLevel > 70 ? 'bg-green-500' :
                            employee.energyLevel > 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        />
                      </div>
                      <span className="text-sm">{employee.energyLevel}%</span>
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Stress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${employee.stressLevel}%` }}
                          className={`h-full ${
                            employee.stressLevel < 40 ? 'bg-green-500' :
                            employee.stressLevel < 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        />
                      </div>
                      <span className="text-sm">{employee.stressLevel}%</span>
                    </div>
                  </div>

                  {/* Task Count */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Nhiệm vụ</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{employee.taskCount} tasks</span>
                    </div>
                  </div>

                  {/* Performance */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Hiệu suất</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{employee.performance}%</span>
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                {employee.status !== 'healthy' && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      <strong>AI Gợi ý:</strong> {
                        employee.status === 'critical' 
                          ? `${employee.name} đang quá tải với ${employee.taskCount} nhiệm vụ. Nên giảm tải hoặc cho nghỉ ngơi.`
                          : `Theo dõi stress level của ${employee.name}. Cân nhắc điều chỉnh công việc.`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Giao Nhiệm Vụ</h3>
        <Button className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]">
          + Tạo Nhiệm Vụ Mới
        </Button>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending */}
        <div className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-gray-700 dark:text-gray-300">Chờ xử lý</h5>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
              {tasks.filter(t => t.status === 'pending').length}
            </span>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'pending').map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm">{task.title}</p>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{task.assignedTo}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-blue-700 dark:text-blue-300">Đang thực hiện</h5>
            <span className="px-2 py-1 bg-blue-200 dark:bg-blue-700 rounded-full text-xs">
              {tasks.filter(t => t.status === 'in-progress').length}
            </span>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'in-progress').map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow cursor-move"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm">{task.title}</p>
                  <span className={`px-2 py-1 rounded text-xs capitalize ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{task.assignedTo}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-green-700 dark:text-green-300">Hoàn thành</h5>
            <span className="px-2 py-1 bg-green-200 dark:bg-green-700 rounded-full text-xs">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === 'completed').map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow cursor-move opacity-75"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm line-through">{task.title}</p>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{task.assignedTo}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Plan Overview */}
      {/* <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-purple-500" />
              <h4>{businessPlan.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Bạn đang sử dụng {businessPlan.currentMembers} / {businessPlan.maxMembers} thành viên
            </p>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
              <div 
                style={{ width: `${(businessPlan.currentMembers / businessPlan.maxMembers) * 100}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {businessPlan.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs">
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>
          <Button variant="outline" className="ml-4">
            Nâng cấp gói
          </Button>
        </div>
      </div> */}

      {/* Invite Section */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h4 className="mb-4">Mời Thành Viên Mới</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Email Invite */}
          <div className="space-y-3">
            <div>
              <label className="text-sm mb-2 block">Email nhân viên</label>
              <input
                type="email"
                placeholder="example@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5B6CFF]"
              />
            </div>
            
            <div>
              <label className="text-sm mb-2 block">Vai trò</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as 'manager' | 'member')}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5B6CFF]"
              >
                <option value="member">Thành viên</option>
                <option value="manager">Quản lý</option>
              </select>
            </div>

            <Button
              onClick={handleSendInvite}
              className="w-full bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]"
            >
              <Send className="w-4 h-4 mr-2" />
              Gửi lời mời qua Email
            </Button>
          </div>

          {/* Invite Link */}
          <div className="space-y-3">
            <div>
              <label className="text-sm mb-2 block">Link mời</label>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-muted-foreground break-all">
                  https://dailyboost.com/invite/company123?role={inviteRole}
                </p>
              </div>
            </div>

            <Button
              onClick={handleCopyInviteLink}
              variant="outline"
              className="w-full"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Đã sao chép!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Sao chép link mời
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              <Mail className="w-3 h-3 inline mr-1" />
              Chia sẻ link này để mời thành viên mới vào team
            </p>
          </div>
        </div>

        {/* Role Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Quản lý (Manager)</p>
              <p className="text-xs text-muted-foreground">Quản lý dự án, giao việc, xem báo cáo</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Thành viên (Member)</p>
              <p className="text-xs text-muted-foreground">Xem và hoàn thành nhiệm vụ được giao</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Team Members */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h4>Thành Viên Team ({teamMembers.length})</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {teamMembers.filter(m => m.status === 'active').length} đang hoạt động
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 hover:bg-white/50 dark:hover:bg-black/20 rounded-xl transition-colors"
            >
              {/* Avatar */}
              <div className="relative">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700"
                />
                {member.status === 'active' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p>{member.name}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getRoleColor(member.role)}`}>
                    {getRoleIcon(member.role)}
                    {member.role === 'admin' ? 'Admin' : member.role === 'manager' ? 'Quản lý' : 'Thành viên'}
                  </span>
                  {member.status === 'inactive' && (
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full text-xs">
                      Không hoạt động
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tham gia {new Date(member.joinedDate).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Actions */}
              {member.role !== 'admin' && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Chỉnh sửa
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pending Invitations */}
      {pendingInvitations.length > 0 && (
        <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h4 className="mb-4">Lời Mời Đang Chờ ({pendingInvitations.filter(i => i.status === 'pending').length})</h4>
          
          <div className="space-y-3">
            {pendingInvitations.map((invitation, index) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  invitation.status === 'pending' 
                    ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10'
                    : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/10 opacity-60'
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  invitation.status === 'pending'
                    ? 'bg-yellow-200 dark:bg-yellow-800'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {invitation.status === 'pending' ? (
                    <Clock className="w-6 h-6 text-yellow-700 dark:text-yellow-300" />
                  ) : (
                    <X className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p>{invitation.email}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getRoleColor(invitation.role)}`}>
                      {getRoleIcon(invitation.role)}
                      {invitation.role === 'manager' ? 'Quản lý' : 'Thành viên'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      invitation.status === 'pending'
                        ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {invitation.status === 'pending' ? 'Đang chờ' : 'Đã hết hạn'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Được mời bởi {invitation.invitedBy} • {new Date(invitation.sentDate).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {invitation.status === 'pending' ? (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleResendInvitation(invitation.email)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Gửi lại
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleCancelInvitation(invitation.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCancelInvitation(invitation.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h5 className="mb-2">💡 Mẹo quản lý team hiệu quả</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Gán vai trò phù hợp để quản lý quyền hạn hiệu quả</li>
              <li>• Theo dõi năng lượng và stress của team qua tab "Nhân viên"</li>
              <li>• Sử dụng AI gợi ý để tối ưu hóa công việc</li>
              <li>• Nâng cấp gói để thêm nhiều thành viên hơn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* View Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
          { id: 'projects', label: 'Dự án', icon: Briefcase },
          { id: 'employees', label: 'Nhân viên', icon: Users },
          { id: 'tasks', label: 'Nhiệm vụ', icon: CheckCircle },
          { id: 'team', label: 'Quản lý Team', icon: UserPlus }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <Button
              key={view.id}
              variant={currentView === view.id ? 'default' : 'outline'}
              onClick={() => setCurrentView(view.id as BusinessView)}
              className={currentView === view.id ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]' : ''}
            >
              <Icon className="w-4 h-4 mr-2" />
              {view.label}
            </Button>
          );
        })}
      </div>

      {/* Render Current View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'overview' && renderOverview()}
          {currentView === 'projects' && renderProjects()}
          {currentView === 'employees' && renderEmployees()}
          {currentView === 'tasks' && renderTasks()}
          {currentView === 'team' && renderTeam()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}