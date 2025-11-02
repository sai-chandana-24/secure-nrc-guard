import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Building2,
  MapPin,
  Users,
  Heart,
  Hospital,
  ChevronRight,
  Globe,
  TrendingUp,
  Activity,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import chhattishgarhLogo from "@/assets/chhattisgarh-logo.png";
import indiaEmblem from "@/assets/india-emblem.png";
import digitalIndiaLogo from "@/assets/digital-india-logo.png";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDashboardClick = (email: string) => {
    if (isAuthenticated) {
      logout();
    }
    navigate(`/login?email=${encodeURIComponent(email)}&redirect=/`);
  };

  const dashboards = [
    {
      title: language === "hi" ? "राज्य प्रशासक" : "State Administrator",
      description:
        language === "hi"
          ? "राज्य स्तरीय NRC कार्यक्रम प्रबंधन और निगरानी"
          : "State-level NRC program management and oversight",
      icon: Shield,
      email: "admin@chhattisgarh.gov.in",
      role: "admin",
      bgGradient: "from-blue-600 to-blue-800",
      stats: { centers: "100+", districts: "28", staff: "5000+" },
    },
    {
      title: language === "hi" ? "जिला अधिकारी" : "District Officer",
      description:
        language === "hi" ? "जिला स्तरीय NRC संचालन और समन्वय" : "District-level NRC operations and coordination",
      icon: Building2,
      email: "district@chhattisgarh.gov.in",
      role: "district",
      bgGradient: "from-green-600 to-green-800",
      stats: { blocks: "15+", centers: "200+", staff: "500+" },
    },
    {
      title: language === "hi" ? "ब्लॉक अधिकारी" : "Block Officer",
      description:
        language === "hi"
          ? "ब्लॉक स्तरीय कार्यान्वयन और डेटा संग्रह"
          : "Block-level implementation and data collection",
      icon: MapPin,
      email: "block@chhattisgarh.gov.in",
      role: "block",
      bgGradient: "from-purple-600 to-purple-800",
      stats: { centers: "50+", children: "1000+", workers: "100+" },
    },
    {
      title: language === "hi" ? "पर्यवेक्षक" : "Supervisor",
      description:
        language === "hi" ? "क्षेत्र पर्यवेक्षण और गुणवत्ता आश्वासन" : "Field supervision and quality assurance",
      icon: Users,
      email: "supervisor@chhattisgarh.gov.in",
      role: "supervisor",
      bgGradient: "from-orange-600 to-orange-800",
      stats: { centers: "20+", visits: "100+", reports: "500+" },
    },
    {
      title: language === "hi" ? "आंगनवाड़ी शिक्षक" : "Anganwadi Teacher",
      description:
        language === "hi" ? "बाल देखभाल डेटा प्रविष्टि और रिपोर्टिंग" : "Child care data entry and reporting",
      icon: Heart,
      email: "teacher@chhattisgarh.gov.in",
      role: "teacher",
      bgGradient: "from-pink-600 to-pink-800",
      stats: { children: "50+", records: "200+", updates: "Daily" },
    },
    {
      title: language === "hi" ? "NRC चिकित्सा अधिकारी" : "NRC Medical Officer",
      description: language === "hi" ? "पोषण पुनर्वास केंद्र प्रबंधन" : "Nutrition Rehabilitation Center management",
      icon: Hospital,
      email: "nrc@chhattisgarh.gov.in",
      role: "nrc",
      bgGradient: "from-red-600 to-red-800",
      stats: { admissions: "100+", recovery: "95%", beds: "50+" },
    },
  ];

  const stats = [
    { label: language === "hi" ? "कुल बच्चे" : "Total Children", value: "2,45,678", trend: "+12%", icon: Users },
    { label: language === "hi" ? "सक्रिय केंद्र" : "Active Centers", value: "156", trend: "+8%", icon: Heart },
    { label: language === "hi" ? "आवंटित फंड" : "Funds Allocated", value: "₹45.2Cr", trend: "+15%", icon: TrendingUp },
    { label: language === "hi" ? "सफलता दर" : "Success Rate", value: "89.5%", trend: "+3%", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Government Header */}
      <header className="bg-card border-b-4 border-primary sticky top-0 z-50 govt-shadow-md">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-border text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hidden md:inline">Last Updated: {new Date().toLocaleDateString("en-IN")}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Screen Reader Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="text-xs h-7 px-2"
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("hi")}
                className="text-xs h-7 px-2"
              >
                हिन्दी
              </Button>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={indiaEmblem} alt="Government of India" className="h-14 md:h-16" />
                <img src={chhattishgarhLogo} alt="Chhattisgarh Government" className="h-14 md:h-16" />
              </div>
              <div className="border-l-2 border-border pl-4">
                <h1 className="text-base md:text-xl font-bold text-primary leading-tight">
                  {language === "hi"
                    ? "छत्तीसगढ़ पोषणीय पुनर्वास केंद्र"
                    : "Chhattisgarh Nutrition Rehabilitation Centers"}
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                  {language === "hi"
                    ? "छत्तीसगढ़ सरकार - डिजिटल प्रबंधन प्रणाली"
                    : "Government of Chhattisgarh - Digital Management System"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-success text-success-foreground text-xs">Digital India</Badge>
                  <Badge className="bg-accent-light text-accent text-xs hidden md:inline-flex">
                    Blockchain Secured
                  </Badge>
                </div>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="default"
                //    onClick={() => navigate('/login')}
                className="hidden md:flex items-center gap-2 border-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Link>
                  <Shield className="w-4 h-4" />
                  {language === "hi" ? "लॉगिन" : "Login"}
                </Link>
              </Button>
              <Button
                size="default"
                asChild
                //   onClick={() => navigate('/signup')}
                className="hidden md:flex items-center gap-2 govt-gradient text-white"
              >
                <Link>
                  {language === "hi" ? "साइन अप" : "Sign Up"}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border space-y-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 border-2"
              >
                <Shield className="w-4 h-4" />
                {language === "hi" ? "लॉगिन" : "Login"}
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 govt-gradient text-white"
              >
                {language === "hi" ? "साइन अप" : "Sign Up"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 govt-hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMy4zMTQtMi42ODYgNi02IDZzLTYtMi42ODYtNi02IDIuNjg2LTYgNi02IDYgMi42ODYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-card/20 text-primary-foreground border-primary-foreground/30 mb-4 md:mb-6 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2">
              <Star className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              {language === "hi" ? "पुरस्कार विजेता डिजिटल प्लेटफॉर्म" : "Award-Winning Digital Platform"}
            </Badge>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              {language === "hi"
                ? "बाल पोषण प्रबंधन का डिजिटल परिवर्तन"
                : "Digital Transformation of Child Nutrition Management"}
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              {language === "hi"
                ? "छत्तीसगढ़ राज्य में अत्याधुनिक तकनीक, पारदर्शी शासन और साक्ष्य-आधारित हस्तक्षेप के माध्यम से बाल कल्याण को आगे बढ़ाना"
                : "Advancing child welfare through cutting-edge technology, transparent governance, and evidence-based interventions across Chhattisgarh"}
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mb-6 md:mb-8">
              <img src={digitalIndiaLogo} alt="Digital India" className="h-12 md:h-16 opacity-90" />
              <Badge className="bg-card/20 text-primary-foreground border-primary-foreground/30 text-xs px-2 md:px-4 py-1 md:py-2">
                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                ISO 27001
              </Badge>
              <Badge className="bg-card/20 text-primary-foreground border-primary-foreground/30 text-xs px-2 md:px-4 py-1 md:py-2">
                <Globe className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                99.9% Uptime
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-12 md:py-16 bg-card govt-shadow-lg -mt-8 md:-mt-12 mx-4 md:mx-8 rounded-xl relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {language === "hi" ? "लाइव डैशबोर्ड आंकड़े" : "Live Dashboard Statistics"}
            </h2>
            <div className="w-20 h-1 govt-gradient mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl govt-transition border-0 govt-shadow-md">
                  <CardContent className="pt-6 pb-6">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-primary" />
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">{stat.label}</p>
                    <span className="text-success text-xs font-semibold flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role Statistics Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 govt-gradient bg-clip-text text-transparent">
              {language === "hi" ? "विभाग सांख्यिकी" : "Department Statistics"}
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "hi"
                ? "विभिन्न भूमिकाओं और उनके प्रदर्शन संकेतकों का अवलोकन"
                : "Overview of different roles and their performance indicators"}
            </p>
            <div className="w-24 h-1 govt-gradient mx-auto rounded mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboards.map((dashboard, index) => {
              const Icon = dashboard.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 border-border hover:border-primary govt-transition hover:shadow-2xl animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${dashboard.bgGradient} opacity-5 group-hover:opacity-10 govt-transition`}
                  />

                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${dashboard.bgGradient} flex items-center justify-center group-hover:scale-110 govt-transition govt-shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary govt-transition">
                          {dashboard.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">{dashboard.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(dashboard.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground uppercase font-medium">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        {dashboard.role}
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Demo Credentials Info */}
          <Card className="mt-12 bg-accent-light border-2 border-accent">
            <CardContent className="p-6 md:p-8">
              <div className="text-center">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {language === "hi" ? "डेमो एक्सेस जानकारी" : "Demo Access Information"}
                </h3>
                <p className="text-sm md:text-base text-foreground mb-4">
                  {language === "hi"
                    ? "सभी डेमो खातों के लिए पासवर्ड का उपयोग करें: "
                    : "Use password for all demo accounts: "}
                  <span className="font-mono bg-accent text-accent-foreground px-3 py-1 rounded font-bold">
                    admin123
                  </span>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  {language === "hi"
                    ? "किसी भी डैशबोर्ड कार्ड पर क्लिक करें और ऊपर दिए गए ईमेल और पासवर्ड के साथ लॉगिन करें"
                    : "Click on any dashboard card and login with the email shown and password above"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === "hi" ? "प्रमुख विशेषताएं" : "Key Features"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {language === "hi"
                ? "उन्नत तकनीकों के साथ बाल पोषण प्रबंधन"
                : "Advanced child nutrition management with cutting-edge technology"}
            </p>
            <div className="w-24 h-1 govt-gradient mx-auto rounded mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: language === "hi" ? "सुरक्षित डेटा" : "Secure Data",
                description: language === "hi" ? "ब्लॉकचेन-आधारित डेटा सुरक्षा" : "Blockchain-based data security",
              },
              {
                icon: Activity,
                title: language === "hi" ? "रीयल-टाइम ट्रैकिंग" : "Real-time Tracking",
                description: language === "hi" ? "लाइव डैशबोर्ड और अलर्ट" : "Live dashboards and alerts",
              },
              {
                icon: Globe,
                title: language === "hi" ? "क्लाउड-आधारित" : "Cloud-based",
                description: language === "hi" ? "कहीं से भी पहुंच" : "Access from anywhere",
              },
              {
                icon: CheckCircle,
                title: language === "hi" ? "पारदर्शिता" : "Transparency",
                description: language === "hi" ? "पूर्ण ऑडिट ट्रेल" : "Complete audit trail",
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-xl govt-transition border-0 govt-shadow-md animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full govt-gradient flex items-center justify-center">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Government Initiatives Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-success text-success-foreground mb-4">
                {language === "hi" ? "सरकारी पहल" : "Government Initiative"}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {language === "hi" ? "राष्ट्रीय पोषण मिशन" : "National Nutrition Mission"}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                {language === "hi"
                  ? "छत्तीसगढ़ सरकार बच्चों के स्वास्थ्य और पोषण की स्थिति में सुधार के लिए प्रतिबद्ध है। यह डिजिटल प्लेटफॉर्म राज्य भर में पोषण पुनर्वास केंद्रों की निगरानी और प्रबंधन को सक्षम बनाता है।"
                  : "The Government of Chhattisgarh is committed to improving child health and nutrition status. This digital platform enables monitoring and management of Nutrition Rehabilitation Centers across the state."}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  language === "hi" ? "डेटा-संचालित निर्णय लेना" : "Data-driven decision making",
                  language === "hi" ? "बेहतर समन्वय और संचार" : "Better coordination and communication",
                  language === "hi" ? "पारदर्शी फंड आवंटन" : "Transparent fund allocation",
                  language === "hi" ? "बढ़ी हुई जवाबदेही" : "Enhanced accountability",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden govt-shadow-lg border-4 border-primary/20">
                <div className="w-full h-full govt-gradient flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Hospital className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">
                      {language === "hi" ? "156+ सक्रिय केंद्र" : "156+ Active Centers"}
                    </h3>
                    <p className="text-white/90">{language === "hi" ? "पूरे छत्तीसगढ़ में" : "Across Chhattisgarh"}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 govt-accent-gradient rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 govt-gradient rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Notice */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {language === "hi" ? "तत्काल सहायता की आवश्यकता है?" : "Need Immediate Assistance?"}
          </h3>
          <p className="text-base md:text-lg mb-6 opacity-90">
            {language === "hi"
              ? "हमारी टीम 24/7 आपकी सहायता के लिए उपलब्ध है"
              : "Our support team is available 24/7 to assist you"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:18001234567"
              className="flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-lg hover:shadow-lg govt-transition font-semibold"
            >
              <Phone className="w-5 h-5" />
              1800-123-4567
            </a>
            <a
              href="mailto:support@chhattisgarh.gov.in"
              className="flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-lg hover:shadow-lg govt-transition font-semibold"
            >
              <Mail className="w-5 h-5" />
              {language === "hi" ? "ईमेल सहायता" : "Email Support"}
            </a>
          </div>
        </div>
      </section>

      {/* Professional Government Footer */}
      <footer className="bg-foreground text-background py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={indiaEmblem} alt="Government of India" className="h-10 md:h-12 opacity-80" />
                <div>
                  <h3 className="font-bold text-base md:text-lg">{language === "hi" ? "छत्तीसगढ़" : "Chhattisgarh"}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {language === "hi" ? "सरकारी पोर्टल" : "Government Portal"}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {language === "hi"
                  ? "नवीन प्रौद्योगिकी समाधानों के माध्यम से डिजिटल शासन को सशक्त बनाना"
                  : "Empowering digital governance through innovative technology solutions"}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">
                {language === "hi" ? "सरकारी सेवाएं" : "Government Services"}
              </h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-background govt-transition">
                    {language === "hi" ? "फंड आवंटन" : "Fund Allocation"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background govt-transition">
                    {language === "hi" ? "स्वास्थ्य निगरानी" : "Health Monitoring"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background govt-transition">
                    {language === "hi" ? "प्रगति ट्रैकिंग" : "Progress Tracking"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background govt-transition">
                    {language === "hi" ? "रिपोर्ट जनरेशन" : "Report Generation"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">
                {language === "hi" ? "संपर्क जानकारी" : "Contact Information"}
              </h4>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                  1800-123-4567
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4" />
                  support@chhattisgarh.gov.in
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  {language === "hi" ? "रायपुर, छत्तीसगढ़" : "Raipur, Chhattisgarh"}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={digitalIndiaLogo} alt="Digital India" className="h-8 md:h-10 opacity-80" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success" />
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {language === "hi" ? "प्रमाणित सुरक्षित मंच" : "Certified Secure Platform"}
                  </span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-muted-foreground text-xs md:text-sm mb-1">
                  {language === "hi"
                    ? "© 2025 छत्तीसगढ़ सरकार। सभी अधिकार सुरक्षित।"
                    : "© 2025 Government of Chhattisgarh. All rights reserved."}
                </p>
                <p className="text-muted-foreground/70 text-[10px] md:text-xs">
                  {language === "hi"
                    ? "डिजिटल इंडिया पहल के तहत विकसित | संस्करण 2.1.0"
                    : "Developed under Digital India Initiative | Version 2.1.0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
