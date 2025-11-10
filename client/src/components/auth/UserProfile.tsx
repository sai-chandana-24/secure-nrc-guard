import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Edit3,
  LogOut,
  Clock,
  CheckCircle,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import adminProfilePhoto from '@/assets/admin-profile.jpg';
import avatarMale from '@/assets/avatar-male.png';
import avatarFemale from '@/assets/avatar-female.png';

export function UserProfile() {
  // Added updateProfile to destructuring. 
  // Ensure your AuthContext provides this, or see the note below.
  const { user, logout, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phone: '',
    department: ''
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        designation: user.designation || '',
        phone: user.phone || '',
        department: user.department || ''
      });
    }
  }, [user]);

  if (!user) return null;

  const isFemale = /^(mrs|ms)\.?(\s|$)/i.test(user.name || '') || /Mrs\.|Ms\./i.test(user.name || '');
  const profileSrc = isFemale ? avatarFemale : avatarMale;

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

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (updateProfile) {
        // If your AuthContext has an update function, use it:
        // await updateProfile(formData);
        
        // For now, we'll just log it. 
        // UNCOMMENT the line above once you add updateProfile to your AuthContext.
        console.log("Updating profile with:", formData);
        
        // TEMPORARY: If you don't have updateProfile yet, this forces a local visual update 
        // just to show it works in the UI (it will revert on refresh if not saved to backend).
        if (user) {
             Object.assign(user, formData);
        }
    } else {
        // Fallback if AuthContext is missing the function
        console.warn("updateProfile function missing from AuthContext. Performing local update only.");
        if (user) {
            Object.assign(user, formData);
       }
    }

    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        designation: user.designation || '',
        phone: user.phone || '',
        department: user.department || ''
      });
    }
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setIsEditing(false); // Reset edit mode when closing dialog
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-auto p-2 hover:bg-primary/10">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              src={profileSrc}
              alt={user.name || 'User profile'}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = adminProfilePhoto; }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-foreground">{(user.name || 'User').split(' ')[0]}</p>
            <p className="text-xs text-muted-foreground">{user.designation || 'Welcome'}</p>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md govt-shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            {isEditing ? 'Edit Profile' : 'User Profile'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your personal information' : 'Government official profile and account details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-primary/20 govt-shadow-md relative group">
              <img 
                src={profileSrc}
                alt={user.name || 'User profile'}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = adminProfilePhoto; }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isEditing && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <Edit3 className="w-6 h-6 text-white" />
                 </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              {isEditing ? (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                   <Input 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="h-9 text-lg font-semibold"
                     placeholder="Full Name"
                   />
                   <Input 
                     value={formData.designation}
                     onChange={(e) => setFormData({...formData, designation: e.target.value})}
                     className="h-8 text-sm"
                     placeholder="Designation"
                   />
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                  <h3 className="font-semibold text-lg text-foreground">{user.name || 'User Name'}</h3>
                  <p className="text-sm text-muted-foreground">{user.designation || 'Role Not Set'}</p>
                </div>
              )}
              <div className="mt-1.5">
                {getRoleBadge(user.role)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
              Contact Information
            </h4>
            <div className="space-y-3">
              {/* Email is typically read-only */}
              <div className="grid gap-1">
                {isEditing && <Label htmlFor="email" className="text-xs">Email Address (Read-only)</Label>}
                <div className="flex items-center gap-3 text-sm h-9 px-2 rounded-md bg-muted/30 border border-transparent">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{user.email}</span>
                  <LockIcon className="w-3 h-3 text-muted-foreground/50 ml-auto" />
                </div>
              </div>

              {/* Editable Phone */}
              <div className="grid gap-1">
                 {isEditing && <Label htmlFor="phone" className="text-xs">Phone Number</Label>}
                 <div className={`flex items-center gap-3 text-sm px-2 rounded-md ${!isEditing && 'h-9 hover:bg-muted/50 transition-colors'}`}>
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    {isEditing ? (
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-9"
                        placeholder="+91 99999 99999"
                      />
                    ) : (
                      <span>{user.phone || 'No phone provided'}</span>
                    )}
                  </div>
              </div>

              {/* Editable Department */}
              <div className="grid gap-1">
                 {isEditing && <Label htmlFor="department" className="text-xs">Department / Location</Label>}
                 <div className={`flex items-center gap-3 text-sm px-2 rounded-md ${!isEditing && 'h-9 hover:bg-muted/50 transition-colors'}`}>
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    {isEditing ? (
                      <Input 
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="h-9"
                        placeholder="Department Name"
                      />
                    ) : (
                      <span>{user.department || 'No department provided'}</span>
                    )}
                  </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status - Only visible in view mode or readonly in edit mode */}
          {!isEditing && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-3">
                <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                  Account Status
                </h4>
                <div className="space-y-2 bg-muted/30 p-3 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Status</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Active
                    </Badge>
                  </div>
                  <Separator className="my-2 opacity-50"/>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Last Login
                    </span>
                    <span className="text-xs font-medium">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" /> Security
                    </span>
                    <span className="text-xs font-medium text-primary">High Level</span>
                  </div>
                </div>
              </div>
              <Separator className="mt-6" />
            </div>
          )}

          {/* Permissions - Only visible in view mode */}
          {!isEditing && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                Access Permissions
              </h4>
              <div className="flex flex-wrap gap-2">
                {(user.permissions || []).length > 0 ? (
                    (user.permissions || []).map((permission, index) => (
                    <Badge key={index} variant="secondary" className="text-[10px] px-2 py-0.5">
                        {permission.replace('_', ' ')}
                    </Badge>
                    ))
                ) : (
                    <span className="text-xs text-muted-foreground italic">Standard access only</span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel} className="flex-1 gap-2" disabled={isSaving}>
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                 <Button onClick={handleSave} className="flex-1 gap-2 bg-primary hover:bg-primary/90" disabled={isSaving}>
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)} className="flex-1 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button variant="destructive" onClick={logout} className="gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 shadow-none">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Small helper component for the read-only email field
function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}