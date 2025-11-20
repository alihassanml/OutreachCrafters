import React, { useState, useEffect } from 'react';
import { Menu, X, Target, Zap, TrendingUp, CheckCircle, ArrowRight, Mail, Users, Award, Sparkles, Rocket, BarChart3, MessageSquare, Send, Calendar } from 'lucide-react';

const OutreachCraftersWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Load Calendly widget
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/craftyautomation-j2d9/30min',
          text: 'Schedule time with me',
          color: '#c02ed6',
          textColor: '#ffffff',
          branding: true
        });
      }
    };
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      company: "iCanvas",
      role: "Founder & CEO, Leo Oks",
      text: "Within the first few weeks, we were booking 10–20 qualified calls per month with art buyers and retailers who perfectly matched our ICP. The conversion rate was remarkable — nearly 33%, and we consistently signed three large deals every month, averaging $110K+ per client.",
      revenue: "$34M Annual Revenue",
      results: ["10-20 calls/month", "33% conversion", "$110K+ per deal"],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      company: "Amdels.ai",
      role: "Founder & CEO, David Golub",
      text: "We went from struggling to get replies to booking consistent, high-quality calls every week. In less than two months, we scaled to over 12,000 outbound emails a month, hitting 5%+ reply rates and tripling our conversion rate.",
      revenue: "$1.2M Annual Revenue",
      results: ["12K emails/month", "5%+ reply rate", "3× conversion"],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      company: "SmoothOperations.ai",
      role: "Founder & CEO, Jarrett Lau",
      text: "Within six weeks, we started seeing 3× more conversions and 10-20 qualified calls per month, with a 20% close rate from those. It wasn't just about sending more emails; it was about sending the right ones to the right people at the right time.",
      revenue: "$300K Annual Revenue",
      results: ["3× conversions", "10-20 calls/month", "20% close rate"],
      gradient: "from-pink-500 to-rose-500",
      hasVideo: true,
      videoUrl: "https://www.loom.com/embed/965cb2a1063f4e6c9819b475cc40c2f2"
    },
    {
      company: "Flag",
      role: "Founder & CEO, Richie Commins",
      text: "In less than 10 weeks, we were booking 8–10 qualified calls per month, consistently hitting 33% conversion rates from those calls. The leads weren't random — they were high-intent prospects from the exact industries we serve, like airports, security, and infrastructure analytics.",
      revenue: "$1.25M Annual Revenue",
      results: ["8-10 calls/month", "33% conversion", "20% close rate"],
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const clients = [
    {
      name: "Amdel.ai",
      description: "Leading Agentic AI systems that automate entire business workflows",
      revenue: "$1.2M Annual Revenue",
      results: ["8-Figure Enterprise Partnerships", "3× Increase in AI Agent Deployments"],
      icon: Sparkles,
      color: "from-violet-600 to-indigo-600"
    },
    {
      name: "RoboGrowthPartners.ai",
      description: "Helping local businesses dominate their markets using marketing systems + AI",
      revenue: "$500K Annual Revenue",
      results: ["3× Increase in Local Market Penetration", "17+ Booked Calls/Month"],
      icon: TrendingUp,
      color: "from-emerald-600 to-teal-600"
    },
    {
      name: "SmoothOperations.ai",
      description: "Custom AI automations for SMBs",
      revenue: "$300K Annual Revenue",
      results: ["42% Conversion Increase", "10–15 Qualified Calls/Month"],
      icon: Zap,
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "PatientStudio",
      description: "All-in-one EMR for Physical Therapy practices",
      revenue: "$5.4M Annual Revenue",
      results: ["28% Increase in Demo-to-Close Rate", "400+ Clinics Using Platform"],
      icon: Users,
      color: "from-pink-600 to-rose-600"
    },
    {
      name: "iCanvas",
      description: "Global art brand creating premium wall art",
      revenue: "$34M Annual Revenue",
      results: ["7+ New B2B Partnerships", "AI-Powered Corporate Outreach"],
      icon: Award,
      color: "from-orange-600 to-amber-600"
    },
    {
      name: "Flag",
      description: "AI initiatives revolutionizing video and data analytics",
      revenue: "$1.25M Annual Revenue",
      results: ["3× Increase in Conversions", "20% Close Rate"],
      icon: BarChart3,
      color: "from-red-600 to-pink-600"
    }
  ];

  const process = [
    {
      title: "ICP & Signal Analysis",
      description: "We identify your Ideal Customer Profiles using verified leads from private data sources, enriched with funding stage, industry, and hiring signals.",
      icon: Target,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Infrastructure Setup",
      description: "We deploy a multi-domain sending architecture, warming domains for 14–21 days to ensure top-tier deliverability.",
      icon: Zap,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Campaign Development",
      description: "Our team creates multiple campaign variations to find the message that resonates best with your audience.",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Performance Optimization",
      description: "We continuously test subject lines, copy angles, and targeting signals to refine engagement and improve conversion rates.",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Scaled ICP Outreach",
      description: "When the winning message-market fit is achieved, we roll it out to similar verified profiles at scale.",
      icon: Rocket,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c102d] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c102d]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#c02ed6]/10 via-[#0c102d] to-[#1769dc]/10"></div>
        <div 
          className="absolute w-96 h-96 bg-[#c02ed6]/15 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1769dc]/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c02ed6]/8 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0c102d]/90 backdrop-blur-xl shadow-2xl border-b border-[#c02ed6]/20' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c02ed6] via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-[#c02ed6]/50 group-hover:shadow-[#c02ed6]/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-[#c02ed6] via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Outreach Crafters
                  </span>
                  <div className="text-xs text-purple-300 font-medium">AI-Powered Outreach</div>
                </div>
              </div>
              
              <div className="hidden md:flex space-x-8">
                <a href="#services" className="text-gray-300 hover:text-[#c02ed6] transition-all duration-300 font-medium hover:scale-110">Services</a>
                <a href="#clients" className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium hover:scale-110">Clients</a>
                <a href="#process" className="text-gray-300 hover:text-pink-400 transition-all duration-300 font-medium hover:scale-110">Process</a>
                <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium hover:scale-110">Testimonials</a>
                <a href="#contact" className="text-gray-300 hover:text-emerald-400 transition-all duration-300 font-medium hover:scale-110">Contact</a>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white bg-[#c02ed6]/20 p-2 rounded-lg">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-[#0c102d]/95 backdrop-blur-xl border-t border-[#c02ed6]/20 animate-slide-down">
              <div className="px-4 pt-4 pb-6 space-y-4">
                <a href="#services" className="block text-gray-300 hover:text-[#c02ed6] transition py-2 font-medium">Services</a>
                <a href="#clients" className="block text-gray-300 hover:text-blue-400 transition py-2 font-medium">Clients</a>
                <a href="#process" className="block text-gray-300 hover:text-pink-400 transition py-2 font-medium">Process</a>
                <a href="#testimonials" className="block text-gray-300 hover:text-purple-400 transition py-2 font-medium">Testimonials</a>
                <a href="#contact" className="block text-gray-300 hover:text-emerald-400 transition py-2 font-medium">Contact</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6">
                <span className="px-6 py-2 bg-gradient-to-r from-[#c02ed6]/20 to-blue-600/20 border border-[#c02ed6]/30 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-xl animate-pulse-glow">
                  🚀 Performance-Based Results
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                We help{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#c02ed6] via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    B2B Businesses
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#c02ed6] to-blue-600 blur-2xl opacity-30 animate-pulse"></span>
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#c02ed6] animate-gradient-x">
                  in unlocking 3x revenue
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light">
                with <span className="text-[#c02ed6] font-semibold">AI Powered Cold Email Outreach</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <a href="#contact">
                  <button className="group relative w-full sm:w-auto bg-gradient-to-r from-[#c02ed6] via-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#c02ed6]/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#c02ed6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>
                <a href="#clients">
                  <button className="w-full sm:w-auto border-2 border-blue-400 text-blue-400 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50">
                    View Success Stories
                  </button>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c02ed6] to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300 animate-pulse"></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-8 border border-[#c02ed6]/30 hover:border-[#c02ed6] transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <div className="text-6xl font-black bg-gradient-to-r from-[#c02ed6] to-purple-400 bg-clip-text text-transparent mb-3 animate-count">$42M+</div>
                    <div className="text-gray-300 font-medium">Total Annual Revenue Across Clients</div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300 animate-pulse-delayed"></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <div className="text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 animate-count">10-20</div>
                    <div className="text-gray-300 font-medium">Qualified Meetings Per Client Monthly</div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300 animate-pulse"></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/30 hover:border-pink-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <div className="text-6xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-3 animate-count">7-Figure</div>
                    <div className="text-gray-300 font-medium">ROI from AI Outreach Systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#c02ed6] to-blue-400 bg-clip-text text-transparent">
                  Complete ICP Coverage?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Stop leaving qualified opportunities on the table. Our unlimited outreach system ensures every ideal customer knows who you are.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c02ed6] to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="relative bg-[#0c102d]/80 backdrop-blur-xl rounded-3xl p-8 border border-[#c02ed6]/30 hover:border-[#c02ed6] transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#c02ed6] to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#c02ed6]/50 group-hover:shadow-[#c02ed6]/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#c02ed6] transition-colors">
                    100% ICP Coverage
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    We identify and contact every decision-maker in your Ideal Customer Profile — reaching them with one personalized touch every 60 days to stay top-of-mind without list fatigue.
                  </p>
                </div>
              </div>

              <div className="group relative animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="relative bg-[#0c102d]/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    Targeted Campaigns
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our campaigns are signal-driven, engaging only when intent or activity is detected. That means outreach that feels relevant — not cold — resulting in more replies and higher-quality conversations.
                  </p>
                </div>
              </div>

              <div className="group relative animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                <div className="relative bg-[#0c102d]/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-500/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                    300% More Calls/month
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our pricing combines results-based incentives with a stable retainer, ensuring both sides stay aligned on growth. You win — we win.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Trusted By{' '}
                <span className="bg-gradient-to-r from-blue-400 to-[#c02ed6] bg-clip-text text-transparent">
                  Industry Leaders
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We've helped AI, Staffing & B2B SAAS Companies scale their outreach to new heights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients.map((client, index) => (
                <div key={index} className="group relative animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${client.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#c02ed6]/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${client.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <client.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c02ed6] transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{client.description}</p>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${client.color} bg-clip-text text-transparent mb-4`}>
                      {client.revenue}
                    </div>
                    <div className="space-y-3">
                      {client.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 animate-pulse" />
                          <span className="text-sm text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                How We Achieve{' '}
                <span className="bg-gradient-to-r from-[#c02ed6] via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Complete ICP Coverage
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our proven 5-step framework ensures your outreach reaches the right people at the right time
              </p>
            </div>

            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="group relative animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-[#c02ed6]/50 transition-all duration-500 hover:scale-102">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`text-5xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            {index + 1}
                          </span>
                          <h3 className="text-3xl font-bold text-white group-hover:text-[#c02ed6] transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                What Our{' '}
                <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
            </div>

            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[activeTestimonial].gradient} rounded-3xl blur-2xl opacity-20 animate-pulse`}></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/20">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${testimonials[activeTestimonial].gradient} rounded-2xl flex items-center justify-center shadow-lg animate-pulse`}>
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{testimonials[activeTestimonial].company}</h3>
                      <p className={`text-lg bg-gradient-to-r ${testimonials[activeTestimonial].gradient} bg-clip-text text-transparent font-semibold`}>
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </div>

                {testimonials[activeTestimonial].hasVideo && (
                  <div className="mb-8">
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe 
                        src={testimonials[activeTestimonial].videoUrl}
                        frameBorder="0" 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true" 
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '1rem' }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-xl text-gray-300 mb-10 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="mb-8">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${testimonials[activeTestimonial].gradient} bg-clip-text text-transparent mb-6`}>
                    {testimonials[activeTestimonial].revenue}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {testimonials[activeTestimonial].results.map((result, idx) => (
                      <span key={idx} className="bg-white/10 px-5 py-3 rounded-full text-sm text-gray-300 border border-white/20 hover:border-[#c02ed6]/50 transition-all duration-300 hover:scale-105">
                        ✓ {result}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-3 rounded-full transition-all duration-500 ${
                        activeTestimonial === idx 
                          ? `bg-gradient-to-r ${testimonials[idx].gradient} w-12 shadow-lg` 
                          : 'bg-gray-600 w-3 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c02ed6] via-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-[#c02ed6]/30">
                <div className="text-center mb-12">
                  <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                    Ready to{' '}
                    <span className="bg-gradient-to-r from-[#c02ed6] to-blue-400 bg-clip-text text-transparent">
                      Scale Your Outreach?
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Join the companies generating consistent, high-quality calls every month with AI-powered outreach
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <a href="mailto:noman@outreachcrafters.com" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c02ed6] to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-8 border border-[#c02ed6]/30 hover:border-[#c02ed6] transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#c02ed6] to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Mail className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 font-medium">CEO Email</div>
                            <div className="text-white font-semibold">Noman</div>
                          </div>
                        </div>
                        <div className="text-[#c02ed6] font-medium text-lg break-all">
                          noman@outreachcrafters.com
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="https://calendly.com/craftyautomation-j2d9/30min" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 font-medium">Book a Call</div>
                            <div className="text-white font-semibold">Schedule Meeting</div>
                          </div>
                        </div>
                        <div className="text-blue-400 font-medium text-lg">
                          30 Min Strategy Call
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <a href="https://calendly.com/craftyautomation-j2d9/30min" target="_blank" rel="noopener noreferrer">
                    <button className="group relative bg-gradient-to-r from-[#c02ed6] via-purple-600 to-blue-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-[#c02ed6]/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Schedule Your Strategy Call
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#c02ed6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0c102d]/50 border-t border-[#c02ed6]/20 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c02ed6] via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-[#c02ed6]/50">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-[#c02ed6] via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Outreach Crafters
                  </span>
                  <div className="text-xs text-purple-300 font-medium">Unlocking 3x revenue through AI powered cold outreach</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-6">
                  <a href="#services" className="text-gray-400 hover:text-[#c02ed6] transition-all duration-300 font-medium">Services</a>
                  <a href="#clients" className="text-gray-400 hover:text-blue-400 transition-all duration-300 font-medium">Clients</a>
                  <a href="#process" className="text-gray-400 hover:text-pink-400 transition-all duration-300 font-medium">Process</a>
                  <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-all duration-300 font-medium">Contact</a>
                </div>
                <p className="text-gray-500 text-sm text-center">
                  © 2025 Outreach Crafters. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(192, 46, 214, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(192, 46, 214, 0.6);
            transform: scale(1.02);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes count {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-count {
          animation: count 1s ease-out;
        }

        .animate-pulse-delayed {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1s;
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default OutreachCraftersWebsite;