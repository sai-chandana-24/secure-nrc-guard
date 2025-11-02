import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Eye, EyeOff, Lock, Mail, Globe, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';
import indiaEmblem from '@/assets/india-emblem.png';
import digitalIndiaLogo from '@/assets/digital-india-logo.png';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess('Account created successfully! You can now login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center govt-bg-gradient p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-accent/30 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-tertiary/30 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 border-2 border-primary/30 rounded-full"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Government Branding */}
        <div className="hidden lg:block space-y-8">
          {/* Main Government Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-6">
              <img 
                src={indiaEmblem} 
                alt="Government of India Emblem" 
                className="h-20 w-auto"
              />
              <img 
                src={chhattishgarhLogo} 
                alt="Chhattisgarh Government" 
                className="h-20 w-auto"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-accent mb-2">
                Join Our Platform
              </h1>
              <h2 className="text-2xl font-semibold text-primary">
                NRC E-Finance Management
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Government of Chhattisgarh | Digital India Initiative
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm border-l-4 border-accent">
              <div className="p-2 bg-accent/10 rounded-full">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-accent">Instant Access</h3>
                <p className="text-sm text-muted-foreground">Create account in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm border-l-4 border-tertiary">
              <div className="p-2 bg-tertiary/10 rounded-full">
                <Lock className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <h3 className="font-semibold text-tertiary">Secure Registration</h3>
                <p className="text-sm text-muted-foreground">Bank-grade encryption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm border-l-4 border-primary">
              <div className="p-2 bg-primary/10 rounded-full">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Verified Platform</h3>
                <p className="text-sm text-muted-foreground">Government certified system</p>
              </div>
            </div>
          </div>

          {/* Digital India Initiative */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
            <img 
              src={digitalIndiaLogo} 
              alt="Digital India" 
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Digital India Initiative
            </span>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden text-center space-y-4">
            <div className="flex justify-center items-center gap-4">
              <img 
                src={indiaEmblem} 
                alt="Government of India" 
                className="h-16 w-auto"
              />
              <img 
                src={chhattishgarhLogo} 
                alt="Chhattisgarh Government" 
                className="h-16 w-auto"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-accent">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Government of Chhattisgarh
              </p>
            </div>
          </div>

          {/* Signup Card */}
          <Card className="govt-shadow-lg border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <UserPlus className="w-8 h-8 text-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-accent">
                Registration Portal
              </CardTitle>
              <CardDescription className="text-base">
                Create your account to access the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-success/10 text-success border-success">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@chhattisgarh.gov.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 govt-transition focus:govt-shadow-glow border-2"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-12 h-12 govt-transition focus:govt-shadow-glow border-2"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-12 h-12 govt-transition focus:govt-shadow-glow border-2"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground govt-transition"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-gradient-to-r from-accent-600 to-accent-800 hover:opacity-90 text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => navigate('/login')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </form>

              {/* Security Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Secure Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Email Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Data Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">GDPR Compliant</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2025 Government of Chhattisgarh | All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground">
              Developed under Digital India Initiative | Secure Government Portal
            </p>
            <div className="flex justify-center items-center gap-2 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              System Status: Operational | Security Level: Maximum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
