import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginDialogProps {
  children: React.ReactNode;
  onLoginSuccess: (userData: any) => void;
}

export const LoginDialog = ({ children, onLoginSuccess }: LoginDialogProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data for demonstration
      const userData = {
        id: '1',
        name: 'John Smith',
        email: formData.email,
        apartmentNumber: 'A-2501',
        floor: 25,
        purchaseDate: '2024-01-15',
        status: 'Owner'
      };

      onLoginSuccess(userData);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-black/95 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span>Resident Login</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access your apartment dashboard and stay updated with the latest information
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => alert('Password reset functionality coming soon!')}
            >
              Forgot your password?
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Don't have an account? Contact our sales team to purchase an apartment.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};