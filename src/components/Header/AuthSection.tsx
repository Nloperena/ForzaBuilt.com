import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthSectionProps {
  onSignOut: () => void;
  className?: string;
}

const AuthSection: React.FC<AuthSectionProps> = ({ onSignOut, className = '' }) => {
  const { user } = useAuth();

  return (
    <div className={`flex items-center ${className}`}>
      {user ? (
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm hidden lg:inline">{user.email}</span>
          <Button 
            onClick={onSignOut} 
            size="lg" 
            className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full flex items-center space-x-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Button>
        </div>
      ) : (
        <Button 
          asChild 
          size="lg" 
          className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl border border-[#F2611D]"
        >
          <Link to="/auth">
            Sign In
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthSection; 