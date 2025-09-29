import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center govt-bg-gradient p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={chhattishgarhLogo} 
              alt="Chhattisgarh Government" 
              className="h-20 w-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              NRC E-Finance Portal
            </h1>
            <p className="text-muted-foreground">
              Government of Chhattisgarh
            </p>
            <p className="text-sm text-muted-foreground">
              Nutritional Rehabilitation Centers - Secure Access
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="govt-shadow-lg border-0">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold">Secure Login</CardTitle>
            <CardDescription>
              Enter your government credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Official Email ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@chhattisgarh.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 govt-transition focus:govt-shadow-glow"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 govt-transition focus:govt-shadow-glow"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground govt-transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="govt"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Secure Login'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Demo Credentials:</h4>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><span className="font-medium">Email:</span> admin@chhattisgarh.gov.in</p>
                <p><span className="font-medium">Password:</span> admin123</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                🔒 This is a secure government portal protected by encryption and blockchain technology
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Government of Chhattisgarh | All Rights Reserved</p>
          <p>Developed under Digital India Initiative</p>
        </div>
      </div>
    </div>
  );
}