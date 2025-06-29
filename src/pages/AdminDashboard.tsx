import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Home,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  BarChart3,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Mock data for admin dashboard
  const [residents, setResidents] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      apartmentNumber: 'A-2501',
      floor: 25,
      status: 'Owner',
      purchaseDate: '2024-01-15',
      paymentStatus: 'Current'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      apartmentNumber: 'B-1203',
      floor: 12,
      status: 'Owner',
      purchaseDate: '2024-03-20',
      paymentStatus: 'Current'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      apartmentNumber: 'C-3401',
      floor: 34,
      status: 'Renter',
      purchaseDate: '2024-06-10',
      paymentStatus: 'Overdue'
    }
  ]);

  const [updates, setUpdates] = useState([
    {
      id: 1,
      date: '2024-12-15',
      title: 'Elevator Maintenance Completed',
      description: 'All elevators have been serviced and are operating normally.',
      type: 'maintenance',
      status: 'published'
    },
    {
      id: 2,
      date: '2024-12-10',
      title: 'New Gym Equipment Installed',
      description: 'State-of-the-art fitness equipment has been added to the rooftop gym.',
      type: 'amenity',
      status: 'published'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      date: '2024-12-18',
      title: 'Holiday Building Hours',
      content: 'Please note that concierge services will have modified hours during the holiday season.',
      priority: 'high',
      status: 'active'
    },
    {
      id: 2,
      date: '2024-12-12',
      title: 'Rooftop Garden Opening',
      content: 'The new rooftop garden is now open for all residents to enjoy.',
      priority: 'medium',
      status: 'active'
    }
  ]);

  const [newUpdate, setNewUpdate] = useState({
    title: '',
    description: '',
    type: 'maintenance'
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== 'admin') {
        navigate('/login');
        return;
      }
      setUserData(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const update = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newUpdate.title,
      description: newUpdate.description,
      type: newUpdate.type,
      status: 'published'
    };
    setUpdates([update, ...updates]);
    setNewUpdate({ title: '', description: '', type: 'maintenance' });
    alert('Update published successfully!');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const announcement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      priority: newAnnouncement.priority,
      status: 'active'
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', priority: 'medium' });
    alert('Announcement published successfully!');
  };

  const deleteUpdate = (id: number) => {
    setUpdates(updates.filter(update => update.id !== id));
    alert('Update deleted successfully!');
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    alert('Announcement deleted successfully!');
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'amenity': return <Home className="h-4 w-4" />;
      case 'security': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userData.name}</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Admin Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === 'overview' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === 'residents' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('residents')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Residents
                </Button>
                <Button
                  variant={activeTab === 'updates' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('updates')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Updates
                </Button>
                <Button
                  variant={activeTab === 'announcements' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('announcements')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Announcements
                </Button>
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('analytics')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Residents</p>
                          <p className="text-2xl font-bold">{residents.length}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Active Updates</p>
                          <p className="text-2xl font-bold">{updates.length}</p>
                        </div>
                        <Bell className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Announcements</p>
                          <p className="text-2xl font-bold">{announcements.length}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                          <p className="text-2xl font-bold">$2.4M</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <span className="text-sm">New update published: Elevator Maintenance</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-sm">New resident registered: Sarah Johnson</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-sm">Holiday announcement published</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'residents' && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Resident Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Apartment</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Payment</th>
                            <th className="text-left p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {residents.map((resident) => (
                            <tr key={resident.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-3">{resident.name}</td>
                              <td className="p-3">{resident.email}</td>
                              <td className="p-3">{resident.apartmentNumber}</td>
                              <td className="p-3">
                                <Badge className={resident.status === 'Owner' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                  {resident.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge className={resident.paymentStatus === 'Current' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {resident.paymentStatus}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-6">
                {/* Add New Update */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Publish New Update</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="updateTitle">Title</Label>
                        <Input
                          id="updateTitle"
                          value={newUpdate.title}
                          onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
                          placeholder="Update title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="updateDescription">Description</Label>
                        <Textarea
                          id="updateDescription"
                          value={newUpdate.description}
                          onChange={(e) => setNewUpdate({...newUpdate, description: e.target.value})}
                          placeholder="Update description"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="updateType">Type</Label>
                        <select
                          id="updateType"
                          value={newUpdate.type}
                          onChange={(e) => setNewUpdate({...newUpdate, type: e.target.value})}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        >
                          <option value="maintenance">Maintenance</option>
                          <option value="amenity">Amenity</option>
                          <option value="security">Security</option>
                        </select>
                      </div>
                      <Button type="submit" className="w-full">
                        Publish Update
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Existing Updates */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Published Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {updates.map((update) => (
                        <div key={update.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                {getStatusIcon(update.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{update.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{update.description}</p>
                                <span className="text-xs text-gray-500">{update.date}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => deleteUpdate(update.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-6">
                {/* Add New Announcement */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5" />
                      <span>Create New Announcement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddAnnouncement} className="space-y-4">
                      <div>
                        <Label htmlFor="announcementTitle">Title</Label>
                        <Input
                          id="announcementTitle"
                          value={newAnnouncement.title}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                          placeholder="Announcement title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="announcementContent">Content</Label>
                        <Textarea
                          id="announcementContent"
                          value={newAnnouncement.content}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                          placeholder="Announcement content"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="announcementPriority">Priority</Label>
                        <select
                          id="announcementPriority"
                          value={newAnnouncement.priority}
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>
                      <Button type="submit" className="w-full">
                        Publish Announcement
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Existing Announcements */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Active Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.content}</p>
                              <span className="text-xs text-gray-500">{announcement.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(announcement.priority)}>
                                {announcement.priority}
                              </Badge>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => deleteAnnouncement(announcement.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Building Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Occupancy Rate</h3>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">95%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">180 of 189 units occupied</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">Monthly Revenue</h3>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">$2.4M</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">+12% from last month</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">Maintenance Requests</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">23</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">5 pending, 18 completed</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">Satisfaction Score</h3>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Based on 156 reviews</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;