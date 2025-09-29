import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit3,
  LogOut,
  Clock,
  CheckCircle 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import adminProfilePhoto from '@/assets/admin-profile.jpg';

export function UserProfile() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-600 text-white">State Administrator</Badge>;
      case 'district':
        return <Badge className="bg-blue-600 text-white">District Officer</Badge>;
      case 'block':
        return <Badge className="bg-green-600 text-white">Block Officer</Badge>;
      case 'supervisor':
        return <Badge className="bg-purple-600 text-white">Supervisor</Badge>;
      case 'teacher':
        return <Badge className="bg-orange-600 text-white">Anganwadi Teacher</Badge>;
      case 'nrc':
        return <Badge className="bg-teal-600 text-white">NRC Medical Officer</Badge>;
      case 'public':
        return <Badge className="bg-gray-600 text-white">Public Access</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-auto p-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              src={adminProfilePhoto} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium">{user.name.split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">{user.designation}</p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md govt-shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            User Profile
          </DialogTitle>
          <DialogDescription>
            Government official profile and account details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-primary/20 govt-shadow-md">
              <img 
                src={adminProfilePhoto} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-primary">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.designation}</p>
              <div className="mt-1">
                {getRoleBadge(user.role)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{user.department}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Account Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Login</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(user.lastLogin).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Level</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">High</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Permissions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Access Permissions
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.permissions.map((permission, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {permission.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
            <Button variant="destructive" onClick={logout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}