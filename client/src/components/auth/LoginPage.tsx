import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Kept for consistency, but FormLabel is used in the form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock, Mail, Globe, Award, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';
import indiaEmblem from '@/assets/india-emblem.png';
import digitalIndiaLogo from '@/assets/digital-india-logo.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// 1. Define the Zod validation schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// 2. Infer the type from the schema for type safety
type LoginFormValues = z.infer<typeof loginSchema>;

const getDashboardPathForRole = (role: string) => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'district':
      return '/district';
    case 'block':
      return '/block';
    case 'supervisor':
      return '/supervisor';
    case 'teacher':
      return '/teacher';
    case 'nrc':
      return '/nrc';
    case 'public':
      return '/'; // Public users go to the main page
    default:
      return '/'; // Default fallback
  }
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Keep for server/API errors
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 3. Setup React Hook Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 5. Create the onSubmit handler for React Hook Form
  const onSubmit = async (data: LoginFormValues) => {
    setError(''); // Clear previous API errors

    const loginSuccess = await login(data.email, data.password);
    if (loginSuccess) {
      navigate("/", { replace: true });
      return;
    }
    setError('Invalid credentials. Please check your email and password.');
  };

  // Get isSubmitting state from RHF
  const { isSubmitting } = form.formState;

  return (
    <div className="min-h-screen flex items-center justify-center govt-bg-gradient p-4 relative overflow-hidden">
      {/* Background Pattern (unchanged) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent/20 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 border border-tertiary/20 rounded-full"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Government Branding (unchanged) */}
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
              <h1 className="text-4xl font-bold text-primary mb-2">
                Nutritional Rehabilitation Centers
              </h1>
              <h2 className="text-2xl font-semibold text-accent">
                E-Finance Management System
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Government of Chhattisgarh | Digital India Initiative
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Blockchain Security</h3>
                <p className="text-sm text-muted-foreground">End-to-end encrypted transactions</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm">
              <div className="p-2 bg-accent/10 rounded-full">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-accent">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">Live fund tracking across districts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm">
              <div className="p-2 bg-tertiary/10 rounded-full">
                <Award className="w-5 h-5 text-tertiary" />
              </div>
              <div>
                <h3 className="font-semibold text-tertiary">Transparent Governance</h3>
                <p className="text-sm text-muted-foreground">Auditable fund allocation system</p>
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

        {/* Right Side - Login Form */}
        <div className="space-y-6">
          {/* Mobile Header (unchanged) */}
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
              <h1 className="text-2xl font-bold text-primary">
                NRC E-Finance Portal
              </h1>
              <p className="text-muted-foreground">
                Government of Chhattisgarh
              </p>
            </div>
          </div>

          {/* Login/Signup Card */}
          <Card className="govt-shadow-lg border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                Secure Portal Access
              </CardTitle>
              <CardDescription className="text-base">
                Enter your official credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                  {/* API Error Alert (unchanged) */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Email Input */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="email" className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@chhattisgarh.gov.in"
                              className="pl-10 h-12 govt-transition focus:govt-shadow-glow border-2"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Input */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="password" className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter password"
                              className="pl-10 pr-12 h-12 govt-transition focus:govt-shadow-glow border-2"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground govt-transition"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base govt-gradient hover:opacity-90 text-white"
                    size="lg"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Login
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Security Features (unchanged) */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Blockchain Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Audit Trail</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Multi-factor Auth</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer (unchanged) */}
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