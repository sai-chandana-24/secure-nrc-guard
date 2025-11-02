import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Download,
  Upload,
  Key,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Volume2,
  Mail,
  Phone,
  Save,
  RefreshCw
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function SettingsPage() {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    alerts: true
  });
  const [language, setLanguage] = useState('en');

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be available for download shortly.",
    });
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Settings & Preferences</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and system preferences
            </p>
          </div>
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue={user.designation} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={user.phone} />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={user.department} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={user.location || user.district} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone logs into your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <Button variant="outline" className="gap-2">
                  <Key className="w-4 h-4" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">SMS Alerts</h4>
                      <p className="text-sm text-muted-foreground">Urgent notifications via SMS</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">System Alerts</h4>
                      <p className="text-sm text-muted-foreground">Critical system notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, alerts: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Current User */}
            <Card>
              <CardHeader>
                <CardTitle>Current User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.designation}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className="bg-blue-600 text-white">{user.role.toUpperCase()}</Badge>
                  <div className="text-sm text-muted-foreground">
                    <p>Last Login: {new Date(user.lastLogin).toLocaleDateString('en-IN')}</p>
                    <p>Location: {user.location || user.district}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Display & Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Theme</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      variant={!isDarkMode ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setIsDarkMode(false)}
                      className="gap-2"
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </Button>
                    <Button 
                      variant={isDarkMode ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setIsDarkMode(true)}
                      className="gap-2"
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium">Language</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      variant={language === 'en' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </Button>
                    <Button 
                      variant={language === 'hi' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLanguage('hi')}
                    >
                      हिन्दी
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full gap-2" onClick={handleExportData}>
                  <Download className="w-4 h-4" />
                  Export My Data
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="w-4 h-4" />
                  Import Settings
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Access Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;