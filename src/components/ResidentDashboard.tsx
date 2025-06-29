import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  User, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Home,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ResidentDashboardProps {
  userData: any;
  onLogout: () => void;
}

export const ResidentDashboard = ({ userData, onLogout }: ResidentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [supportMessage, setSupportMessage] = useState('');

  // Mock data for demonstration
  const apartmentUpdates = [
    {
      id: 1,
      date: '2024-12-15',
      title: 'Elevator Maintenance Completed',
      description: 'All elevators have been serviced and are operating normally.',
      type: 'maintenance',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-12-10',
      title: 'New Gym Equipment Installed',
      description: 'State-of-the-art fitness equipment has been added to the rooftop gym.',
      type: 'amenity',
      status: 'new'
    },
    {
      id: 3,
      date: '2024-12-05',
      title: 'Security System Upgrade',
      description: 'Enhanced facial recognition system installed at main entrance.',
      type: 'security',
      status: 'completed'
    }
  ];

  const announcements = [
    {
      id: 1,
      date: '2024-12-18',
      title: 'Holiday Building Hours',
      content: 'Please note that concierge services will have modified hours during the holiday season.',
      priority: 'high'
    },
    {
      id: 2,
      date: '2024-12-12',
      title: 'Rooftop Garden Opening',
      content: 'The new rooftop garden is now open for all residents to enjoy. Access via elevator to floor 60.',
      priority: 'medium'
    },
    {
      id: 3,
      date: '2024-12-08',
      title: 'Parking Garage Cleaning',
      content: 'Monthly deep cleaning of parking garage scheduled for this weekend.',
      priority: 'low'
    }
  ];

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

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support request submitted successfully! We will get back to you within 24 hours.');
    setSupportMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resident Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userData.name}</p>
              </div>
            </div>
            <Button 
              onClick={onLogout}
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
                  <User className="h-5 w-5" />
                  <span>Navigation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === 'overview' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('overview')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === 'updates' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('updates')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Updates
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
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('support')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Support
                </Button>
              </CardContent>
            </Card>

            {/* Apartment Info */}
            <Card className="bg-white dark:bg-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Apartment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Unit:</span>
                  <span className="font-semibold">{userData.apartmentNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Floor:</span>
                  <span className="font-semibold">{userData.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{userData.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Since:</span>
                  <span className="font-semibold">{userData.purchaseDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Welcome to Your Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Stay connected with your luxury residence. Here you can view the latest updates, 
                      read important announcements, and contact our support team whenever you need assistance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <Bell className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold">Latest Updates</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">3 new updates available</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <Calendar className="h-8 w-8 text-green-600 mb-2" />
                        <h3 className="font-semibold">Announcements</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">2 important notices</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
                        <h3 className="font-semibold">Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">24/7 assistance available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Apartment Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apartmentUpdates.map((update) => (
                        <div key={update.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                {getStatusIcon(update.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{update.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{update.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{update.date}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={update.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                              {update.status}
                            </Badge>
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
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Building Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.content}</p>
                              <div className="flex items-center space-x-2 mt-3">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{announcement.date}</span>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority} priority
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Quick Contact</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">24/7 Concierge: +1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">support@chermitibuilding.com</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm">Emergency: +1 (555) 911-HELP</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">Support Hours</h3>
                        <div className="text-sm space-y-1">
                          <p>Concierge: 24/7</p>
                          <p>Maintenance: Mon-Fri 8AM-6PM</p>
                          <p>Management: Mon-Fri 9AM-5PM</p>
                          <p>Emergency: 24/7</p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your request"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={supportMessage}
                          onChange={(e) => setSupportMessage(e.target.value)}
                          placeholder="Please describe your request or issue in detail..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Submit Support Request
                      </Button>
                    </form>
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