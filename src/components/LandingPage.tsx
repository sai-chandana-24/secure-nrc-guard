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
  MapPin
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
    welcomeHeading: "Welcome to NRC E-Finance Portal",
    welcomeDesc: "Transforming child nutrition management through digital governance and transparent fund allocation across Chhattisgarh state.",
    quickStats: "Quick Statistics",
    totalChildren: "Total Children Monitored",
    activeCenters: "Active NRC Centers",
    fundsAllocated: "Funds Allocated (Crores)",
    successRate: "Recovery Success Rate",
    keyFeatures: "Key Features",
    blockchain: "Blockchain Security",
    blockchainDesc: "Transparent and immutable transaction records",
    realtime: "Real-time Monitoring",
    realtimeDesc: "Live tracking of child health and fund utilization",
    multilevel: "Multi-level Access",
    multilevelDesc: "Role-based dashboards for all stakeholders",
    reports: "Automated Reports",
    reportsDesc: "AI-powered analytics and trend analysis",
    announcements: "Latest Announcements",
    contact: "Contact Information",
    helpdesk: "Helpdesk",
    email: "Email Support",
    address: "Address"
  },
  hi: {
    title: "छत्तीसगढ़ पोषणीय पुनर्वास केंद्र",
    subtitle: "छत्तीसगढ़ सरकार - डिजिटल वित्त प्रबंधन प्रणाली",
    description: "ब्लॉकचेन तकनीक के साथ पारदर्शी, सुरक्षित और कुशल फंड प्रबंधन के माध्यम से पोषण पुनर्वास को सशक्त बनाना।",
    loginBtn: "डैशबोर्ड में लॉगिन करें",
    welcomeHeading: "एनआरसी ई-फाइनेंस पोर्टल में आपका स्वागत है",
    welcomeDesc: "छत्तीसगढ़ राज्य में डिजिटल गवर्नेंस और पारदर्शी फंड आवंटन के माध्यम से बाल पोषण प्रबंधन को बदलना।",
    quickStats: "त्वरित आंकड़े",
    totalChildren: "कुल निगरानी में बच्चे",
    activeCenters: "सक्रिय एनआरसी केंद्र",
    fundsAllocated: "आवंटित फंड (करोड़)",
    successRate: "रिकवरी सफलता दर",
    keyFeatures: "मुख्य विशेषताएं",
    blockchain: "ब्लॉकचेन सुरक्षा",
    blockchainDesc: "पारदर्शी और अपरिवर्तनीय लेनदेन रिकॉर्ड",
    realtime: "रियल-टाइम निगरानी",
    realtimeDesc: "बाल स्वास्थ्य और फंड उपयोग की लाइव ट्रैकिंग",
    multilevel: "बहु-स्तरीय पहुंच",
    multilevelDesc: "सभी हितधारकों के लिए भूमिका-आधारित डैशबोर्ड",
    reports: "स्वचालित रिपोर्ट",
    reportsDesc: "एआई-संचालित एनालिटिक्स और ट्रेंड विश्लेषण",
    announcements: "नवीनतम घोषणाएं",
    contact: "संपर्क जानकारी",
    helpdesk: "हेल्पडेस्क",
    email: "ईमेल सहायता",
    address: "पता"
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
  { label: 'totalChildren', value: '2,45,678', icon: Users, color: 'text-blue-600' },
  { label: 'activeCenters', value: '156', icon: Heart, color: 'text-green-600' },
  { label: 'fundsAllocated', value: '₹45.2', icon: TrendingUp, color: 'text-purple-600' },
  { label: 'successRate', value: '89.5%', icon: Award, color: 'text-orange-600' }
];

const features = [
  { key: 'blockchain', icon: Shield },
  { key: 'realtime', icon: Activity },
  { key: 'multilevel', icon: Users },
  { key: 'reports', icon: BookOpen }
];

const announcements = [
  {
    en: "New NRC centers operational in Bilaspur district",
    hi: "बिलासपुर जिले में नए एनआरसी केंद्र परिचालित",
    date: "15 Dec 2024"
  },
  {
    en: "Digital fund allocation process now live",
    hi: "डिजिटल फंड आवंटन प्रक्रिया अब लाइव",
    date: "10 Dec 2024"
  },
  {
    en: "Training program for Anganwadi teachers scheduled",
    hi: "आंगनवाड़ी शिक्षकों के लिए प्रशिक्षण कार्यक्रम निर्धारित",
    date: "8 Dec 2024"
  }
];

function LandingPageContent({ language, setLanguage, t }: LanguageContextType) {
  const { login } = useAuth();

  const handleLogin = () => {
    // For demo purposes, redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <img src={indiaEmblem} alt="Government of India" className="h-16" />
              <img src={chhattishgarhLogo} alt="Chhattisgarh Government" className="h-16" />
              <div className="border-l-2 border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-blue-900">{t('title')}</h1>
                <p className="text-sm text-gray-600">{t('subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="text-xs"
                >
                  English
                </Button>
                <Button
                  variant={language === 'hi' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('hi')}
                  className="text-xs"
                >
                  हिन्दी
                </Button>
              </div>
              
              <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
                {t('loginBtn')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">{t('welcomeHeading')}</h1>
            <p className="text-xl mb-8 text-blue-100">{t('welcomeDesc')}</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src={digitalIndiaLogo} alt="Digital India" className="h-12 opacity-80" />
              <Badge className="bg-white/20 text-white border-white/30">
                <Shield className="w-4 h-4 mr-2" />
                Blockchain Secured
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Globe className="w-4 h-4 mr-2" />
                Real-time Monitoring
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('quickStats')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{t(stat.label)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('keyFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{t(feature.key)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t(`${feature.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements and Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Announcements */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('announcements')}</h2>
              <div className="space-y-6">
                {announcements.map((announcement, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {language === 'hi' ? announcement.hi : announcement.en}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('contact')}</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{t('helpdesk')}</p>
                        <p className="text-gray-600">1800-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{t('email')}</p>
                        <p className="text-gray-600">nrc-support@chhattisgarh.gov.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">{t('address')}</p>
                        <p className="text-gray-600">
                          {language === 'hi' 
                            ? "महानदी भवन, रायपुर, छत्तीसगढ़ - 492001"
                            : "Mahanadi Bhawan, Raipur, Chhattisgarh - 492001"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src={indiaEmblem} alt="Government of India" className="h-12 opacity-80" />
              <img src={digitalIndiaLogo} alt="Digital India" className="h-12 opacity-80" />
            </div>
            <p className="text-gray-300">
              {language === 'hi' 
                ? "© 2024 छत्तीसगढ़ सरकार। सभी अधिकार सुरक्षित।"
                : "© 2024 Government of Chhattisgarh. All rights reserved."
              }
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {language === 'hi'
                ? "डिजिटल इंडिया पहल के तहत विकसित"
                : "Developed under Digital India Initiative"
              }
            </p>
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