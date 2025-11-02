import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { UserPlus, Eye, EyeOff, Lock, Mail, Globe, Award, CheckCircle, ArrowLeft } from 'lucide-react'; // Removed 'User'
import { useAuth } from '@/contexts/AuthContext';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';
import indiaEmblem from '@/assets/india-emblem.png';
import digitalIndiaLogo from '@/assets/digital-india-logo.png';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client'; // No longer needed

// 1. Define the Zod validation schema
const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Attach the error to the confirmPassword field
});

// 2. Infer the type from the schema
type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupPage() {
  // 3. Remove form field state
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  
  // Keep state for UI toggles and server responses
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  
  // 4. Use the Auth context
  const { signup, isLoading } = useAuth(); // Get signup function and loading state

  // 5. Setup React Hook Form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 6. Create the RHF-compatible submit handler
  const onSubmit = async (data: SignupFormValues) => {
    setError('');
    setSuccess('');

    // Call the signup function from AuthContext
    const { success: signupSuccess, error: signupError } = await signup(
      data.email,
      data.password
    );

    if (signupSuccess) {
      setSuccess('Account created successfully! You can now login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(signupError || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center govt-bg-gradient p-4 relative overflow-hidden">
      {/* Background Pattern (unchanged) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-accent/30 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-tertiary/30 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 border-2 border-primary/30 rounded-full"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Government Branding (unchanged) */}
        <div className="hidden lg:block space-y-8">
          {/* ... (all branding code remains the same) ... */}
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
   _  </div>
    <div>
    <h3 className="font-semibold text-accent">Instant Access</h3>
    <p className="text-sm text-muted-foreground">Create account in seconds</p>
    </div>
   </div>
   
   _ <div className="flex items-center gap-3 p-4 bg-card rounded-lg govt-shadow-sm border-l-4 border-tertiary">
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
          {/* Mobile Header (unchanged) */}
          <div className="lg:hidden text-center space-y-4">
            {/* ... (all mobile header code remains the same) ... */}
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
  _  <h1 className="text-2xl font-bold text-accent">
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
              {/* ... (header code remains the same) ... */}
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
              {/* 7. Refactor form to use shadcn/ui <Form> */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* 8. REMOVED Full Name Field */}

                  {/* 9. REFACTOR Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="email" className="text-sm font-medium">Email Address</FormLabel>
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

                  {/* 10. REFACTOR Password Field */}
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
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
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
                  
                  {/* 11. REFACTOR Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Re-enter your password"
                              className="pl-10 pr-12 h-12 govt-transition focus:govt-shadow-glow border-2"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/A2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground govt-transition"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-gradient-to-r from-accent-600 to-accent-800 hover:opacity-90 text-white"
                    size="lg"
                    disabled={isLoading} // 12. Use loading state from useAuth
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
              </Form>

              {/* Security Features (unchanged) */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                {/* ... (all security features code remains the same) ... */}
                <div className="flex items-center gap-2">
     <CheckCircle className="w-4 h-4 text-success" />
     <span className="text-xs text-muted-foreground">Secure Registration</span>
    </div>
    <div className="flex items-center gap-2">
     <CheckCircle className="w-4 h-4 text-success" />
     <span className="text-xs text-muted-foreground">Email Verification</span>
    </div>
    <div className="flex items-center gap-2">
A     <CheckCircle className="w-4 h-4 text-success" />
     <span className="text-xs text-muted-foreground">Data Protection</span>
    </div>
    <div className="flex items-center gap-2">
D     <CheckCircle className="w-4 h-4 text-success" />
     <span className="text-xs text-muted-foreground">GDPR Compliant</span>
    </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer (unchanged) */}
          <div className="text-center space-y-2">
            {/* ... (all footer code remains the same) ... */}
            <p className="text-sm text-muted-foreground">
    © 2025 Government of Chhattisgarh | All Rights Reserved
   </p>
   <p className="text-xs text-muted-foreground">
Always    Developed under Digital India Initiative | Secure Government Portal
   </p>
   <div className="flex justify-center items-center gap-2 text-xs text-success">
Click     <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
  S   System Status: Operational | Security Level: Maximum
 Read   </div>
          </div>
        </div>
      </div>
    </div>
  );
}

