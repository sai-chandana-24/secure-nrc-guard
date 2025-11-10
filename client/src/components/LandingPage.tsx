import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
} from "lucide-react";
import {
  Shield,
  Building2,
  MapPin,
  Users,
  Heart,
  Hospital,
  Globe,
  TrendingUp,
  Activity,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Menu,
  X,
  Zap,
  Database,
  Target,
  PieChart as PieChartIcon,
  ShieldCheck,
  Server,
  FileCheck,
  LayoutGrid,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import chhattishgarhLogo from "@/assets/chhattisgarh-logo.png";
import digitalIndiaLogo from "@/assets/digital-india-logo.png";

// --- Official Remote Image URLs ---
const CG_LOGO_URL = "https://cgstate.gov.in/user-assets/images/logo-cg.png";
const GOVERNOR_IMAGE_URL = "https://cgstate.gov.in/file-profile-image/L2RhdGFfY2dzdGF0ZS9jZ3N0YXRlMjAyNV91cGxvYWRzL2dvdmVybm9yLXByb2ZpbGUvR1ZfSW1hZ2UucG5n";
const CM_IMAGE_URL = "https://cgstate.gov.in/file-profile-image/L2RhdGFfY2dzdGF0ZS9jZ3N0YXRlMjAyNV91cGxvYWRzL2NtLXByb2ZpbGUvQ01fSW1hZ2UucG5n";
// New Logo added here
const POSHAN_LOGO_URL = "https://tse3.mm.bing.net/th/id/OIP.Y0H2rW6xhp1sxQYHVS_9PwHaJc?pid=Api&P=0&h=180";

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

  // --- Dummy Data for Charts ---
  const treatmentData = [
    { name: "May", treated: 1890, admitted: 2200 },
    { name: "Jun", treated: 2390, admitted: 2500 },
    { name: "Jul", treated: 2900, admitted: 3100 },
    { name: "Aug", treated: 3500, admitted: 3800 },
    { name: "Sep", treated: 3800, admitted: 4200 },
    { name: "Oct", treated: 3600, admitted: 3900 },
  ];

  const admissionData = [
    { name: "Jan", admissions: 4500 },
    { name: "Feb", admissions: 3500 },
    { name: "Mar", admissions: 5200 },
    { name: "Apr", admissions: 3000 },
    { name: "May", admissions: 2200 },
    { name: "Jun", admissions: 2500 },
    { name: "Jul", admissions: 3100 },
    { name: "Aug", admissions: 3800 },
    { name: "Sep", admissions: 4200 },
    { name: "Oct", admissions: 3900 },
  ];

  const recoveryRateData = [
    { name: "Week 1", rate: 82 },
    { name: "Week 2", rate: 85 },
    { name: "Week 3", rate: 89 },
    { name: "Week 4", rate: 92 },
    { name: "Week 5", rate: 94 },
    { name: "Week 6", rate: 95 },
  ];

  const centerStatusData = [
    { name: language === "hi" ? "सक्रिय" : "Active", value: 145, color: "#22c55e" },
    { name: language === "hi" ? "रखरखाव" : "Maintenance", value: 8, color: "#eab308" },
    { name: language === "hi" ? "निष्क्रिय" : "Inactive", value: 3, color: "#ef4444" },
  ];
  // -----------------------------

  // --- Translation Helper for Arrays (Moved inside component to access 'language' state) ---
  const keyFeaturesList = [
    {
      icon: ShieldCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "group-hover:border-blue-500/50",
      accentColor: "bg-blue-500",
      title: language === "hi" ? "सुरक्षित डेटा" : "Secure Data",
      description: language === "hi" ? "सैन्य-स्तर का एन्क्रिप्शन और एक्सेस कंट्रोल।" : "Military-grade encryption & access controls.",
    },
    {
      icon: Zap,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      borderColor: "group-hover:border-amber-500/50",
      accentColor: "bg-amber-500",
      title: language === "hi" ? "रीयल-टाइम" : "Real-Time",
      description: language === "hi" ? "तत्काल निर्णय लेने के लिए शून्य विलंबता अपडेट।" : "Zero-latency updates for instant decision making.",
    },
    {
      icon: LayoutGrid,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      borderColor: "group-hover:border-indigo-500/50",
      accentColor: "bg-indigo-500",
      title: language === "hi" ? "स्केलेबल" : "Scalable",
      description: language === "hi" ? "राज्य की बदलती जरूरतों के साथ बढ़ने के लिए निर्मित।" : "Built to grow with the state's evolving needs.",
    },
    {
      icon: FileCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      borderColor: "group-hover:border-emerald-500/50",
      accentColor: "bg-emerald-500",
      title: language === "hi" ? "ऑडिट योग्य" : "Auditable",
      description: language === "hi" ? "100% पारदर्शिता के लिए पूर्ण अपरिवर्तनीय ट्रेल्स।" : "Complete immutable trails for 100% transparency.",
    },
  ];

  const missionGridList = [
    {
      icon: Database,
      title: language === "hi" ? "केंद्रीकृत डेटा" : "Centralized Data",
      desc: language === "hi" ? "सभी 33 जिलों के लिए एकीकृत रिकॉर्ड।" : "Unified records for all 33 districts.",
    },
    {
      icon: Target,
      title: language === "hi" ? "लक्षित हस्तक्षेप" : "Targeted Care",
      desc: language === "hi" ? "उच्च जोखिम वाले क्षेत्रों की AI-संचालित पहचान।" : "AI-driven identification of high-risk areas.",
    },
    {
      icon: TrendingUp,
      title: language === "hi" ? "वास्तविक समय निगरानी" : "Real-time Monitoring",
      desc: language === "hi" ? "ब्लॉक से राज्य स्तर तक लाइव ट्रैकिंग।" : "Live tracking from block to state level.",
    },
    {
      icon: ShieldCheck,
      title: language === "hi" ? "शून्य भ्रष्टाचार" : "Zero Corruption",
      desc: language === "hi" ? "ब्लॉकचेन-सत्यापित फंड उपयोग।" : "Blockchain-verified fund utilization.",
    },
  ];

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
      stats: { centers: "100+", districts: "33", staff: "5000+" },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Government Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            {/* Left Side: Logos and Main Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={chhattishgarhLogo} alt="Government of India" className="h-12 md:h-16 w-auto" />
                <img src={CG_LOGO_URL} alt="Chhattisgarh Government" className="h-12 md:h-16 w-auto" />
              </div>
              <div className="hidden sm:block pl-3">
                <h1 className="text-2xl md:text-3xl font-bold text-black leading-none tracking-tight">
                  {language === "hi" ? "राज्य पोर्टल" : "STATE PORTAL"}
                </h1>
                <h2 className="text-sm md:text-base font-bold text-[#d91b5c] leading-tight mt-1">
                  {language === "hi" ? "छत्तीसगढ़ शासन" : "GOVERNMENT OF CHHATTISGARH"}
                </h2>
              </div>
            </div>

            {/* Middle: Dignitaries (Translated) */}
            <div className="hidden xl:flex items-center gap-6 mx-6">
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-sm font-bold text-black leading-tight">
                    {language === "hi" ? "श्री रमेन डेका" : "Shri Ramen Deka"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "hi" ? "माननीय राज्यपाल" : "Hon'ble Governor"}
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#2e7d32]/30 p-0.5">
                  <img src={GOVERNOR_IMAGE_URL} alt="Hon'ble Governor" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-sm font-bold text-black leading-tight">
                    {language === "hi" ? "श्री विष्णु देव साय" : "Shri Vishnu Deo Sai"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {language === "hi" ? "माननीय मुख्यमंत्री" : "Hon'ble Chief Minister"}
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#2e7d32]/30 p-0.5">
                  <img src={CM_IMAGE_URL} alt="Hon'ble CM" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Side: Auth & Lang */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Language Tools */}
              <div className="hidden md:flex items-center gap-3 text-sm font-medium text-slate-700 mr-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 ${language === 'en' ? 'bg-slate-800 text-white' : 'bg-white hover:bg-slate-100'}`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-3 py-1.5 ${language === 'hi' ? 'bg-slate-800 text-white' : 'bg-white hover:bg-slate-100'}`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6"
                  onClick={() => navigate("/login")}
                >
                  {language === "hi" ? "लॉगिन" : "Login"}
                </Button>
                <Button
                  className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6"
                  onClick={() => navigate("/signup")}
                >
                  {language === "hi" ? "पंजीकरण" : "Register"}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border space-y-3 mt-4 bg-slate-50 px-4 rounded-b-lg">
              <div className="flex items-center justify-center gap-4 pb-4 border-b">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${language === 'en' ? 'bg-slate-800 text-white' : 'bg-white border'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${language === 'hi' ? 'bg-slate-800 text-white' : 'bg-white border'}`}
                >
                  हिन्दी
                </button>
              </div>
              <Button
                className="w-full bg-slate-800 hover:bg-slate-900 text-white"
                size="lg"
                onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
              >
                {language === "hi" ? "लॉगिन" : "Login"}
              </Button>
              <Button
                className="w-full bg-slate-800 hover:bg-slate-900 text-white"
                size="lg"
                onClick={() => { navigate("/signup"); setMobileMenuOpen(false); }}
              >
                {language === "hi" ? "पंजीकरण" : "Register"}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 govt-hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMy4zMTQtMi42ODYgNi02IDZzLTYtMi42ODYtNi02IDIuNjg2LTYgNi02IDYgMi42ODYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* <Badge className="bg-card/20 text-primary-foreground border-primary-foreground/30 mb-4 md:mb-6 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2">
              <Star className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              {language === "hi" ? "पुरस्कार विजेता डिजिटल प्लेटफॉर्म" : "Award-Winning Digital Platform"}
            </Badge> */}

            {/* NEW: H2 with Aligned Logo to the left */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
              <img
                src={POSHAN_LOGO_URL}
                alt="Poshan Abhiyaan"
                className="h-20 md:h-32 w-auto object-contain drop-shadow-lg p-2 rounded-xl bg-background/10 backdrop-blur-sm" // Increased size and added subtle background for better visibility against gradient
              />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-left md:text-center">
                {language === "hi"
                  ? "बाल पोषण प्रबंधन का डिजिटल परिवर्तन"
                  : "Ensuring every child is nourished"}
              </h2>
            </div>
            {/* End of Change */}

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
                {language === "hi" ? "99.9% अपटाइम" : "99.9% Uptime"}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Live Dashboard Statistics */}
      <section className="py-12 md:py-16 bg-muted/30 -mt-8 md:-mt-12 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {language === "hi" ? "लाइव डैशबोर्ड आंकड़े" : "Live Dashboard Analytics"}
              </h2>
              <div className="w-20 h-1 govt-gradient mx-auto rounded"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Chart 1: Children Treated vs Admitted Trend (Area Chart) */}
              <Card className="border-2 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    {language === "hi" ? "उपचार के रुझान (पिछले 6 महीने)" : "Treatment Trends (Last 6 Months)"}
                  </CardTitle>
                  <CardDescription>
                    {language === "hi" ? "भर्ती बनाम सफलतापूर्वक इलाज किए गए बच्चे" : "Children admitted vs. successfully treated"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={treatmentData}>
                      <defs>
                        <linearGradient id="colorTreated" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Area
                        type="monotone"
                        dataKey="admitted"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorAdmitted)"
                        name={language === "hi" ? "भर्ती" : "Admitted"}
                      />
                      <Area
                        type="monotone"
                        dataKey="treated"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorTreated)"
                        name={language === "hi" ? "उपचारित" : "Treated"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Chart 2: Monthly Admissions (Bar Chart) */}
              <Card className="border-2 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    {language === "hi" ? "मासिक प्रवेश (वर्तमान वर्ष)" : "Monthly Admissions (Current Year)"}
                  </CardTitle>
                  <CardDescription>
                    {language === "hi" ? "प्रति माह कुल नए बाल प्रवेश" : "Total new child admissions per month"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={admissionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      />
                      <Bar
                        dataKey="admissions"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        name={language === "hi" ? "प्रवेश" : "Admissions"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Chart 3: Recovery Rate Improvement (Line Chart) */}
              <Card className="border-2 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    {language === "hi" ? "सुधार दर में वृद्धि" : "Recovery Rate Improvement"}
                  </CardTitle>
                  <CardDescription>
                    {language === "hi" ? "सफल रिकवरी प्रतिशत की साप्ताहिक ट्रैकिंग" : "Weekly tracking of successful recovery percentages"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recoveryRateData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={[60, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        formatter={(value) => [`${value}%`, language === "hi" ? "सुधार दर" : "Recovery Rate"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Chart 4: Center Status (Pie Chart) */}
              <Card className="border-2 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" />
                    {language === "hi" ? "केंद्र की स्थिति" : "NRC Center Status"}
                  </CardTitle>
                  <CardDescription>
                    {language === "hi" ? "सभी 156 केंद्रों की परिचालन स्थिति" : "Operational status of all 156 centers"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-4 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={centerStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {centerStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                      />
                      <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Role Statistics Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              {language === "hi" ? "प्रशासनिक प्रदर्शन मेट्रिक्स" : "Administrative Performance Metrics"}
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "hi"
                ? "शासन के सभी स्तरों पर प्रमुख संकेतक"
                : "Key indicators across all levels of governance."}
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
                  onClick={() => handleDashboardClick(dashboard.email)}
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
        </div>
      </section>

      {/* NEW CLEAN & ENGAGING Key Features Section */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 rounded-full">
              {language === "hi" ? "हमारा लाभ" : "Our Advantages"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {language === "hi" ? "डिजिटल एक्सीलेंस के स्तंभ" : "Pillars of Digital Excellence"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {language === "hi"
                ? "पारदर्शिता, सुरक्षा और दक्षता सुनिश्चित करने के लिए डिज़ाइन की गई प्रमुख विशेषताएं।"
                : "Core features designed to ensure transparency, security, and operational efficiency across the state."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeaturesList.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-card rounded-xl p-6 border-2 border-transparent ${feature.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden`}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  {/* Subtle Bottom Accent Bar on Hover */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 ${feature.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        {/* Abstract Background Patterns */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content Side */}
            <div className="space-y-8">
              <div>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary mb-4 px-4 py-1 text-sm font-semibold uppercase tracking-wider bg-primary/5"
                >
                  {language === "hi" ? "हमारा मिशन" : "Our Mission"}
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-foreground">
                  {language === "hi" ? "राष्ट्रीय पोषण मिशन" : "National Nutrition Mission"}
                  <span className="text-primary">.</span>
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "hi"
                  ? "छत्तीसगढ़ सरकार एक स्वस्थ भविष्य के निर्माण के लिए प्रतिबद्ध है। हमारा एकीकृत डिजिटल प्लेटफॉर्म यह सुनिश्चित करता है कि हर बच्चे को सही समय पर सही देखभाल मिले।"
                  : "Dedicated to eradicating malnutrition through technology. Our platform provides a unified, real-time view of every Nutrition Rehabilitation Center across Chhattisgarh, ensuring no child is left behind."}
              </p>

              {/* Engaging Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {missionGridList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-colors group"
                  >
                    <div className="mr-4 mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Trust Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-border/40">
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  {language === "hi" ? "सिस्टम स्थिति:" : "System Status:"}
                </span>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                >
                  <Server className="w-3.5 h-3.5" />
                  {language === "hi" ? "ऑनलाइन" : "All Systems Operational"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {language === "hi" ? "सत्यापित" : "Gov.in Verified"}
                </Badge>
              </div>
            </div>

            {/* Visual Side - Layered Mission Control Card */}
            <div className="relative lg:ml-12">
              {/* Main "Mission Control" Card */}
              <div className="relative bg-background rounded-3xl govt-shadow-2xl border border-border/50 overflow-hidden z-20">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      {language === "hi" ? "लाइव मिशन स्थिति" : "Live Mission Status"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    v2.1.0-stable
                  </Badge>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-6">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">33</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        {language === "hi" ? "सक्रिय जिले" : "Districts Active"}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        {language === "hi" ? "अपटाइम" : "Uptime"}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">15k+</div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                        {language === "hi" ? "दैनिक अपडेट" : "Daily Updates"}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">
                          {language === "hi" ? "बाल रिकवरी लक्ष्य" : "Child Recovery Targets"}
                        </span>
                        <span className="font-bold text-primary">85%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">
                          {language === "hi" ? "फंड उपयोग" : "Fund Utilization"}
                        </span>
                        <span className="font-bold text-success">92%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success w-[92%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center text-[10px] font-bold text-muted-foreground"
                        >
                          U{i}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        +5k
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {language === "hi" ? "सक्रिय फील्ड स्टाफ" : "Active Field Staff"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -right-6 z-30 animate-pulse">
                <Badge className="px-4 py-2 bg-success text-success-foreground border-2 border-background shadow-lg flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4" /> 99.9% {language === "hi" ? "सटीकता" : "Accuracy"}
                </Badge>
              </div>
              <div className="absolute -bottom-5 -left-5 z-30 animate-pulse delay-150">
                <Badge className="px-4 py-2 bg-primary text-primary-foreground border-2 border-background shadow-lg flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 24/7 {language === "hi" ? "निगरानी" : "Monitoring"}
                </Badge>
              </div>

              {/* Background Accent for Depth */}
              <div className="absolute top-5 left-5 right-5 bottom-5 bg-primary/20 rounded-3xl blur-2xl -z-10 transform rotate-3"></div>
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
                <img src={chhattishgarhLogo} alt="Government of India" className="h-10 md:h-12 opacity-80" />
                <div>
                  <h3 className="font-bold text-base md:text-lg">
                    {language === "hi" ? "छत्तीसगढ़" : "Chhattisgarh"}
                  </h3>
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