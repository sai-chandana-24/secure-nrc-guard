import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Shield, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Activity,
  Heart,
  Award,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Zap,
  Database,
  Lock,
  Smartphone,
  BarChart,
  CheckCircle,
  Star
} from 'lucide-react';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';
import indiaEmblem from '@/assets/india-emblem.png';
import digitalIndiaLogo from '@/assets/digital-india-logo.png';

interface LanguageContextType {
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "Chhattisgarh Nutritional Rehabilitation Centers",
    subtitle: "Government of Chhattisgarh - Digital Finance Management System",
    description: "Empowering nutrition rehabilitation through transparent, secure, and efficient fund management with blockchain technology.",
    loginBtn: "Login to Dashboard",
    welcomeHeading: "Digital Transformation of Child Nutrition Management",
    welcomeDesc: "Advancing child welfare through cutting-edge technology, transparent governance, and evidence-based interventions across Chhattisgarh state.",
    quickStats: "Live Dashboard Statistics",
    totalChildren: "Children Under Monitoring",
    activeCenters: "Active NRC Centers",
    fundsAllocated: "Total Funds (Crores)",
    successRate: "Recovery Success Rate",
    keyFeatures: "Platform Capabilities",
    blockchain: "Blockchain Security",
    blockchainDesc: "Immutable transaction ledger with full audit trail",
    realtime: "Real-time Analytics",
    realtimeDesc: "Live health monitoring and fund utilization tracking",
    multilevel: "Multi-stakeholder Portal",
    multilevelDesc: "Integrated dashboards for all government levels",
    reports: "AI-Powered Insights",
    reportsDesc: "Machine learning analytics for predictive healthcare",
    announcements: "Latest Updates & Announcements",
    contact: "24/7 Support & Contact",
    helpdesk: "Emergency Helpdesk",
    email: "Technical Support",
    address: "Regional Office",
    govtServices: "Government Services",
    transparency: "Transparency & Accountability",
    innovation: "Digital Innovation",
    achievements: "Key Achievements",
    testimonials: "Success Stories"
  },
  hi: {
    title: "छत्तीसगढ़ पोषणीय पुनर्वास केंद्र",
    subtitle: "छत्तीसगढ़ सरकार - डिजिटल वित्त प्रबंधन प्रणाली",
    description: "ब्लॉकचेन तकनीक के साथ पारदर्शी, सुरक्षित और कुशल फंड प्रबंधन के माध्यम से पोषण पुनर्वास को सशक्त बनाना।",
    loginBtn: "डैशबोर्ड में लॉगिन करें",
    welcomeHeading: "बाल पोषण प्रबंधन का डिजिटल परिवर्तन",
    welcomeDesc: "छत्तीसगढ़ राज्य में अत्याधुनिक तकनीक, पारदर्शी शासन और साक्ष्य-आधारित हस्तक्षेप के माध्यम से बाल कल्याण को आगे बढ़ाना।",
    quickStats: "लाइव डैशबोर्ड आंकड़े",
    totalChildren: "निगरानी में बच्चे",
    activeCenters: "सक्रिय एनआरसी केंद्र",
    fundsAllocated: "कुल फंड (करोड़)",
    successRate: "रिकवरी सफलता दर",
    keyFeatures: "प्लेटफॉर्म क्षमताएं",
    blockchain: "ब्लॉकचेन सुरक्षा",
    blockchainDesc: "पूर्ण ऑडिट ट्रेल के साथ अपरिवर्तनीय लेनदेन खाता-बही",
    realtime: "रियल-टाइम एनालिटिक्स",
    realtimeDesc: "लाइव स्वास्थ्य निगरानी और फंड उपयोग ट्रैकिंग",
    multilevel: "बहु-हितधारक पोर्टल",
    multilevelDesc: "सभी सरकारी स्तरों के लिए एकीकृत डैशबोर्ड",
    reports: "एआई-संचालित अंतर्दृष्टि",
    reportsDesc: "भविष्यसूचक स्वास्थ्य सेवा के लिए मशीन लर्निंग एनालिटिक्स",
    announcements: "नवीनतम अपडेट और घोषणाएं",
    contact: "24/7 सहायता और संपर्क",
    helpdesk: "आपातकालीन हेल्पडेस्क",
    email: "तकनीकी सहायता",
    address: "क्षेत्रीय कार्यालय",
    govtServices: "सरकारी सेवाएं",
    transparency: "पारदर्शिता और जवाबदेही",
    innovation: "डिजिटल नवाचार",
    achievements: "मुख्य उपलब्धियां",
    testimonials: "सफलता की कहानियां"
  }
};

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'hi' | 'en'>('en');
  
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };
  
  const value = { language, setLanguage, t };
  
  return (
    <div>
      {React.Children.map(children, (child) => 
        React.isValidElement(child) ? React.cloneElement(child, { ...value }) : child
      )}
    </div>
  );
}

const stats = [
  { label: 'totalChildren', value: '2,45,678', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'activeCenters', value: '156', icon: Heart, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'fundsAllocated', value: '₹45.2', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'successRate', value: '89.5%', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' }
];

const features = [
  { key: 'blockchain', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { key: 'realtime', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
  { key: 'multilevel', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'reports', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' }
];

const techFeatures = [
  { icon: Database, title: "Advanced Analytics", desc: "ML-powered insights for policy decisions" },
  { icon: Lock, title: "Enterprise Security", desc: "Bank-grade encryption and compliance" },
  { icon: Smartphone, title: "Mobile-First Design", desc: "Optimized for field workers and officials" },
  { icon: Zap, title: "Real-time Updates", desc: "Instant notifications and live data sync" }
];

const achievements = [
  { metric: "15%", label: "Reduction in Malnutrition", icon: TrendingUp },
  { metric: "98%", label: "Fund Transparency Score", icon: Shield },
  { metric: "45,000+", label: "Children Recovered", icon: Heart },
  { metric: "24/7", label: "System Uptime", icon: Activity }
];

const announcements = [
  {
    en: "New AI-powered early warning system for severe malnutrition launched across all districts",
    hi: "सभी जिलों में गंभीर कुपोषण के लिए नया एआई-संचालित प्रारंभिक चेतावनी प्रणाली शुरू",
    date: "15 Dec 2024",
    priority: "high"
  },
  {
    en: "Blockchain-based fund allocation system successfully processes ₹50 crore in transparent transactions",
    hi: "ब्लॉकचेन-आधारित फंड आवंटन प्रणाली सफलतापूर्वक ₹50 करोड़ के पारदर्शी लेनदेन को संसाधित करती है",
    date: "12 Dec 2024",
    priority: "medium"
  },
  {
    en: "Mobile app for Anganwadi workers reaches 10,000+ downloads with 4.8-star rating",
    hi: "आंगनवाड़ी कार्यकर्ताओं के लिए मोबाइल ऐप 4.8-स्टार रेटिंग के साथ 10,000+ डाउनलोड तक पहुंच गया",
    date: "10 Dec 2024",
    priority: "low"
  }
];

function LandingPageContent({ language, setLanguage, t }: LanguageContextType) {
  const { login } = useAuth();

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-gradient-to-r from-orange-500 to-green-500 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={indiaEmblem} alt="Government of India" className="h-16 drop-shadow-md" />
                <img src={chhattishgarhLogo} alt="Chhattisgarh Government" className="h-16 drop-shadow-md" />
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-blue-900 leading-tight">{t('title')}</h1>
                <p className="text-sm text-gray-600 leading-tight">{t('subtitle')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 text-xs">Digital India</Badge>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Blockchain Secured</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Enhanced Language Selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="text-xs h-8 px-3"
                >
                  English
                </Button>
                <Button
                  variant={language === 'hi' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('hi')}
                  className="text-xs h-8 px-3"
                >
                  हिन्दी
                </Button>
              </div>
              
              <Button onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                {t('loginBtn')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Award-Winning Digital Platform
            </Badge>
            <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('welcomeHeading')}
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('welcomeDesc')}
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <img src={digitalIndiaLogo} alt="Digital India" className="h-16 opacity-90 drop-shadow-lg" />
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                ISO 27001 Certified
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                99.9% Uptime
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                <Activity className="w-4 h-4 mr-2" />
                Real-time Processing
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('quickStats')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
                <CardContent className="pt-8 pb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{t(stat.label)}</p>
                  <div className="mt-3 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500 text-sm font-medium">+12% this month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('keyFeatures')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology stack powering transparent governance and efficient healthcare delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group hover:scale-105">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{t(feature.key)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{t(`${feature.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <tech.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{tech.title}</h3>
                <p className="text-gray-600 text-sm">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('achievements')}</h2>
            <p className="text-xl text-green-100">Measurable impact through digital transformation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <achievement.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-3xl font-bold mb-2">{achievement.metric}</h3>
                <p className="text-green-100">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Announcements and Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Announcements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">{t('announcements')}</h2>
              </div>
              <div className="space-y-6">
                {announcements.map((announcement, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-3 flex-shrink-0 ${
                          announcement.priority === 'high' ? 'bg-red-500' :
                          announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 leading-relaxed mb-2">
                            {language === 'hi' ? announcement.hi : announcement.en}
                          </p>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {announcement.date}
                            </Badge>
                            <Badge className={`text-xs ${
                              announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                              announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {announcement.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Phone className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">{t('contact')}</h2>
              </div>
              <Card className="shadow-lg">
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                      <Phone className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <p className="font-bold text-red-900">{t('helpdesk')}</p>
                        <p className="text-red-700 text-lg font-semibold">1800-123-4567</p>
                        <p className="text-red-600 text-sm">Available 24/7 for emergencies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <p className="font-bold text-blue-900">{t('email')}</p>
                        <p className="text-blue-700 font-semibold">nrc-support@chhattisgarh.gov.in</p>
                        <p className="text-blue-600 text-sm">Response within 2 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <p className="font-bold text-green-900">{t('address')}</p>
                        <p className="text-green-700 leading-relaxed">
                          {language === 'hi' 
                            ? "महानदी भवन, 2nd फ्लोर, सेक्टर-19, नया रायपुर, छत्तीसगढ़ - 492001"
                            : "Mahanadi Bhawan, 2nd Floor, Sector-19, Naya Raipur, Chhattisgarh - 492001"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        User Manual
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Policy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={indiaEmblem} alt="Government of India" className="h-12 opacity-80" />
                <div>
                  <h3 className="font-bold text-lg">Chhattisgarh</h3>
                  <p className="text-gray-400 text-sm">Government Portal</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering digital governance through innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('govtServices')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fund Allocation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Monitoring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Generation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('transparency')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Public Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Audit Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fund Utilization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RTI Portal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('innovation')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blockchain Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img src={digitalIndiaLogo} alt="Digital India" className="h-10 opacity-80" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-400 text-sm">Certified Secure Platform</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm mb-1">
                  {language === 'hi' 
                    ? "© 2024 छत्तीसगढ़ सरकार। सभी अधिकार सुरक्षित।"
                    : "© 2024 Government of Chhattisgarh. All rights reserved."
                  }
                </p>
                <p className="text-gray-500 text-xs">
                  {language === 'hi'
                    ? "डिजिटल इंडिया पहल के तहत विकसित | संस्करण 2.1.0"
                    : "Developed under Digital India Initiative | Version 2.1.0"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LandingPage() {
  return (
    <LanguageProvider>
      <LandingPageContent language="en" setLanguage={() => {}} t={() => ""} />
    </LanguageProvider>
  );
}