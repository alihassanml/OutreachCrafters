import { useState, useEffect, useRef } from 'react';
import { Menu, X, Target, Zap, TrendingUp, CheckCircle, ArrowRight, Mail, Users, Award, Sparkles, Rocket, BarChart3, MessageSquare, Calendar, Linkedin, Instagram, Star, Play } from 'lucide-react';

import flagLogo from '../assets/Flag.svg';
import icanvasLogo from '../assets/iCanvas.svg';
import patientstudioLogo from '../assets/Patient Studio.svg';
import robogrowthpartnersLogo from '../assets/robogrowthpartners.svg';
// CEO images
import icanvasCEO from '../assets/icanvasCEO.svg';
import flagCEO from '../assets/FlagCEO.svg';
import smoothOperationsCEO from '../assets/SmoothOprationsAiCEO.svg';
import amdelAICEO from '../assets/AmdelAiCEO.svg';

declare global {
  interface Window {
    Calendly?: any;
  }
}

type Testimonial = {
  company: string;
  highlight: string;
  accentColor: string;
  fullText: string;
  avatarImg: string;
  name: string;
  title: string;
};

const OutreachCraftersWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTestimonial, setModalTestimonial] = useState<Testimonial | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoModalRef = useRef<HTMLDivElement | null>(null);
  const testimonialIntervalRef = useRef<number | null>(null);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Checking window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll testimonials every 3-4 seconds
  useEffect(() => {
    if (testimonials.length > 0) {
      testimonialIntervalRef.current = setInterval(() => {
        setCurrentCardIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % testimonials.length;
          scrollToCard(nextIndex);
          return nextIndex;
        });
      }, 3500); // 3.5 seconds

      return () => {
        if (testimonialIntervalRef.current) {
          clearInterval(testimonialIntervalRef.current);
        }
      };
    }
  }, []);

  // Smooth modal animations
  useEffect(() => {
    if (isVideoModalOpen && videoModalRef.current) {
      videoModalRef.current.style.opacity = '0';
      videoModalRef.current.style.transform = 'scale(0.95) translateY(20px)';
      
      setTimeout(() => {
        if (videoModalRef.current) {
          videoModalRef.current.style.transition = 'all 0.3s ease-out';
          videoModalRef.current.style.opacity = '1';
          videoModalRef.current.style.transform = 'scale(1) translateY(0)';
        }
      }, 10);
    }
  }, [isVideoModalOpen]);

  // Modal functions
  const openModal = (testimonial: Testimonial) => {
    setModalTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }, 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTestimonial(null);
    document.body.style.overflow = 'auto';
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (videoModalRef.current) {
      videoModalRef.current.style.transition = 'all 0.3s ease-out';
      videoModalRef.current.style.opacity = '0';
      videoModalRef.current.style.transform = 'scale(0.95) translateY(20px)';
    }
    
    setTimeout(() => {
      setIsVideoModalOpen(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Calendly widget
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
          url: 'https://calendly.com/outreachcrafters/30min',
          text: 'Schedule Call',
          color: '#1769dc',
          textColor: '#ffffff',
          branding: true
        });
      }
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
    };
  }, []);

  const scrollToCard = (index: number) => {
    setCurrentCardIndex(index);
    if (scrollRef.current) {
      const cards = scrollRef.current.children;
      if (cards.length > 0 && index < cards.length) {
        const card = cards[index] as HTMLElement;
        const container = scrollRef.current;
        const cardLeft = card.offsetLeft;
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;

        const scrollTo = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        scrollRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  };

  const getCardWidth = () => {
    if (windowWidth < 768) {
      return 'w-[calc(100vw-3rem)]'; // Mobile
    } else {
      return 'w-[500px]'; // Desktop
    }
  };

  const getSectionPadding = () => {
    if (windowWidth < 768) {
      return 'px-4'; // Mobile
    } else if (windowWidth < 1024) {
      return 'px-8'; // Tablet
    } else {
      return 'px-12'; // Desktop
    }
  };

  const clientLogos = [
    {
      name: "iCanvas",
      logo: icanvasLogo,
      url: "https://icanvas.com",
    },
    {
      name: "Patient Studio",
      logo: patientstudioLogo,
      url: "https://patientstudio.com",
    },
    {
      name: "Flag",
      logo: flagLogo,

    },
    {
      name: "RoboGrowthPartners",
      logo: robogrowthpartnersLogo,
      url: "https://robogrowthpartners.ai",
    },
    {
      name: "iCanvas",
      logo: icanvasLogo,
      url: "https://icanvas.com",
    },
    {
      name: "Patient Studio",
      logo: patientstudioLogo,
      url: "https://patientstudio.com",
      showText: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      accentColor: "#1769dc",
      rating: 5,
      text: "We'd been scaling steadily through referrals and inbound, but outbound was the missing piece  until we met Noman and the OutreachCrafters team. They completely transformed how we connect with high-value clients. Within the first few weeks, we were booking 10–20 qualified calls per month with art buyers and retailers who perfectly matched our ICP. The conversion rate was remarkable nearly 33%, and we signed two large deals in sixty days, averaging $110K per client.The secret? Their approach didn't feel robotic.",
      highlight: "10–20 Qualified Calls/Month",
      name: "Leon Oks",
      title: "Founder & CEO of iCanvas",
      avatarImg: icanvasCEO,
      company: "iCanvas",
      fullText: `"We'd been scaling steadily through referrals and inbound, but outbound was the missing piece  until we met Noman and the OutreachCrafters team.
They completely transformed how we connect with high-value clients. Within the first few weeks, we were booking 10–20 qualified calls per month with art buyers and retailers who perfectly matched our ICP. The conversion rate was remarkable nearly 33%, and we signed two large deals in sixty days, averaging $110K per client.
The secret? Their approach didn't feel robotic. Every campaign was thoughtful, well-timed, and data-driven. OutreachCrafters tested multiple message styles, tracked response behavior, and found the perfect tone that resonated with our audience.
I've worked with outreach specialists before, but none who took this much ownership of outcomes. Noman treated our campaigns as if they were his own, analyzing, iterating, and pushing for better results every single week.
If you're looking for a partner who combines the science of outbound with genuine creative intelligence, look no further than OutreachCrafters."`
    },
    {
      id: 2,
      accentColor: "#c42dd7",
      rating: 5,
      text: "Before working with Noman and the team at OutreachCrafters, we'd tried just about everything to get consistent outbound results — new domains, different tools, agencies that promised miracles. We could book a few meetings here and there, but it was never predictable or scalable. Within weeks of partnering with Noman, everything changed. He completely rebuilt our system from the ground up — refining our ICP, enriching our data, and creating outreach campaigns that actually felt human. We went from struggling to get replies to booking consistent, high-quality calls every week. In less than two months, we scaled to over 12,000 outbound emails a month, hitting 5%+ reply rates and tripling our conversion rate. Even better, we closed multiple enterprise clients — one deal alone covered our investment several times over. What really stood out was how hands-on Noman was throughout the process.",
      highlight: "3× Increase in AI Agent Deployments",
      name: "David Golub",
      title: "Founder & CEO of Amdel.ai",
      avatarImg: amdelAICEO,
      company: "Amdel.ai",
      fullText: `"Before working with Noman and the team at OutreachCrafters, we'd tried just about everything to get consistent outbound results — new domains, different tools, agencies that promised miracles. We could book a few meetings here and there, but it was never predictable or scalable.
Within weeks of partnering with Noman, everything changed. He completely rebuilt our system from the ground up — refining our ICP, enriching our data, and creating outreach campaigns that actually felt human. We went from struggling to get replies to booking consistent, high-quality calls every week.
In less than two months, we scaled to over 12,000 outbound emails a month, hitting 5%+ reply rates and tripling our conversion rate. Even better, we closed multiple enterprise clients — one deal alone covered our investment several times over.
What really stood out was how hands-on Noman was throughout the process. He didn't just build a system; he acted like an extension of our team — reviewing copy, optimizing domain performance, and even suggesting creative testing angles.
If you're serious about scaling outbound and want a partner who treats your success like his own, I'd recommend Noman and OutreachCrafters without hesitation."`
    },
    {
      id: 3,
      accentColor: "#1769dc",
      rating: 5,
      text: "Before connecting with Noman and OutreachCrafters, we'd tried a handful of outreach tools and even brought on a freelancer team to help us scale our outbound. But the results were scattered — open rates were inconsistent, and quality meetings were rare. Noman and his team approached things completely differently. They built a system that actually understood our industry. Every campaign was timed around real-world signals — funding rounds, hiring trends, and product launches — which meant our emails landed when prospects were actively looking for solutions. In less than 10 weeks, we were booking 8–10 qualified calls per month, consistently hitting 33% conversion rates from those calls.",
      highlight: "8–10 Qualified Calls/Month",
      name: "Richie Commins",
      title: "Founder & CEO of Flag",
      avatarImg: flagCEO,
      company: "Flag",
      fullText: `"Before connecting with Noman and OutreachCrafters, we'd tried a handful of outreach tools and even brought on a freelancer team to help us scale our outbound. But the results were scattered — open rates were inconsistent, and quality meetings were rare.
Noman and his team approached things completely differently. They built a system that actually understood our industry. Every campaign was timed around real-world signals — funding rounds, hiring trends, and product launches — which meant our emails landed when prospects were actively looking for solutions.
In less than 10 weeks, we were booking 8–10 qualified calls per month, consistently hitting 33% conversion rates from those calls. The leads weren't random — they were high-intent prospects from the exact industries we serve, like airports, security, and infrastructure analytics.
What impressed me most was Noman's responsiveness and adaptability. Anytime we needed to tweak messaging or adjust targeting, he was already one step ahead. He treated our campaigns like a living system — always testing, refining, and improving.
I've worked with several outbound partners before, but OutreachCrafters has been by far the most strategic and transparent team we've collaborated with. They didn't just deliver meetings — they built a sustainable, predictable pipeline."`
    },
  ];

  const clients = [
    {
      name: "Amdel.ai",
      description: "Leading Agentic AI systems that automate entire business workflows",
      revenue: "$1.2M Annual Revenue",
      results: ["8-Figure Enterprise Partnerships", "3× Increase in AI Agent Deployments"],
      icon: Sparkles,
      color: "from-[#c42dd7] to-[#1769dc]"
    },
    {
      name: "RoboGrowthPartners.ai",
      description: "Helping local businesses dominate their markets using marketing systems + AI",
      revenue: "$500K Annual Revenue",
      results: ["3× Increase in Local Market Penetration", "17+ Booked Calls/Month"],
      icon: TrendingUp,
      color: "from-[#1769dc] to-[#c42dd7]"
    },
    {
      name: "SmoothOperations.ai",
      description: "Custom AI automations for SMBs",
      revenue: "$300K Annual Revenue",
      results: ["42% Conversion Increase", "10–15 Qualified Calls/Month"],
      icon: Zap,
      color: "from-[#c42dd7] to-[#1769dc]"
    },
    {
      name: "PatientStudio",
      description: "All-in-one EMR for Physical Therapy practices",
      revenue: "$5.4M Annual Revenue",
      results: ["28% Increase in Demo-to-Close Rate", "400+ Clinics Using Platform"],
      icon: Users,
      color: "from-[#1769dc] to-[#c42dd7]"
    },
    {
      name: "iCanvas",
      description: "Global art brand creating premium wall art",
      revenue: "$34M Annual Revenue",
      results: ["7+ New B2B Partnerships", "AI-Powered Corporate Outreach"],
      icon: Award,
      color: "from-[#c42dd7] to-[#1769dc]"
    },
    {
      name: "Flag",
      description: "AI initiatives revolutionizing video and data analytics",
      revenue: "$1.25M Annual Revenue",
      results: ["3× Increase in Conversions", "20% Close Rate"],
      icon: BarChart3,
      color: "from-[#1769dc] to-[#c42dd7]"
    }
  ];

  const process = [
    {
      title: "ICP & Signal Analysis",
      description: "We identify your Ideal Customer Profiles using verified leads from private data sources, enriched with funding stage, industry, and hiring signals.",
      icon: Target,
      color: "from-[#c42dd7] to-[#1769dc]"
    },
    {
      title: "Infrastructure Setup",
      description: "We deploy a multi-domain sending architecture, warming domains for 14–21 days to ensure top-tier deliverability.",
      icon: Zap,
      color: "from-[#1769dc] to-[#c42dd7]"
    },
    {
      title: "Campaign Development",
      description: "Our team creates multiple campaign variations to find the message that resonates best with your audience.",
      icon: MessageSquare,
      color: "from-[#c42dd7] to-[#1769dc]"
    },
    {
      title: "Performance Optimization",
      description: "We continuously test subject lines, copy angles, and targeting signals to refine engagement and improve conversion rates.",
      icon: TrendingUp,
      color: "from-[#1769dc] to-[#c42dd7]"
    },
    {
      title: "Scaled ICP Outreach",
      description: "When the winning message-market fit is achieved, we roll it out to similar verified profiles at scale.",
      icon: Rocket,
      color: "from-[#c42dd7] to-[#1769dc]"
    }
  ];

  const features = [
    {
      title: "100% ICP Coverage",
      color: "#c42dd7"
    },
    {
      title: "Pain Driven Campaigns",
      color: "#1769dc"
    },
    {
      title: "300% More Calls/month",
      color: "#c42dd7"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c102d] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c102d]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7]/10 via-[#0c102d] to-[#1769dc]/10"></div>
        <div
          className="absolute w-96 h-96 bg-[#c42dd7]/15 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1769dc]/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c42dd7]/8 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0c102d]/90 backdrop-blur-xl shadow-2xl border-b border-[#c42dd7]/20' : 'bg-transparent'} px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-[#c42dd7]/50 group-hover:shadow-[#c42dd7]/80 transition-all duration-300 group-hover:scale-110">
                  <img
                    src="/src/assets/logo.jpg"
                    alt="Outreach Crafters"
                    className="w-full h-full object-cover transform scale-125"
                  />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                    Outreach Crafters
                  </span>
                  <div className="text-xs text-purple-300 font-medium">Hands Off Growth System</div>
                </div>
              </div>

              <div className="hidden md:flex space-x-8 items-center">
                <a href="#complete-icp" className="text-gray-300 hover:text-[#c42dd7] transition-all duration-300 font-medium hover:scale-110">Complete ICP</a>
                <a href="#clients" className="text-gray-300 hover:text-[#1769dc] transition-all duration-300 font-medium hover:scale-110">Clients</a>
                <a href="#process" className="text-gray-300 hover:text-[#c42dd7] transition-all duration-300 font-medium hover:scale-110">Process</a>
                <a href="#testimonials" className="text-gray-300 hover:text-[#1769dc] transition-all duration-300 font-medium hover:scale-110">Testimonials</a>
                <a href="#contact" className="text-gray-300 hover:text-[#c42dd7] transition-all duration-300 font-medium hover:scale-110">Contact</a>
              </div>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white bg-[#c42dd7]/20 p-2 rounded-lg">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-[#0c102d]/95 backdrop-blur-xl border-t border-[#c42dd7]/20 animate-slide-down px-4">
              <div className="px-4 pt-4 pb-6 space-y-4">
                <a href="#complete-icp" className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Complete ICP</a>
                <a href="#clients" className="block text-gray-300 hover:text-[#1769dc] transition py-2 font-medium">Clients</a>
                <a href="#process" className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Process</a>
                <a href="#testimonials" className="block text-gray-300 hover:text-[#1769dc] transition py-2 font-medium">Testimonials</a>
                <a href="#contact" className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Contact</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className={`pt-32 pb-20 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center animate-fade-in-up">
              <div className="text-center lg:text-left">
                <div className="inline-block mb-6">
                  <span className="px-6 py-2 bg-gradient-to-r from-[#c42dd7]/20 to-[#1769dc]/20 border border-[#c42dd7]/30 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-xl animate-pulse-glow">
                    🚀 Performance-Based Results
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  We help{' '}
                  <span className="relative inline-block font-black">
                    <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent animate-gradient-x">
                      B2B Businesses
                    </span>
                    <span className="absolute -inset-1 bg-gradient-to-r from-[#c42dd7] to-[#1769dc] blur-2xl opacity-30 animate-pulse"></span>
                  </span>
                  {' '}in unlocking
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769dc] to-[#c42dd7] animate-gradient-x font-black">
                    3x revenue growth
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-300 mb-8 font-normal max-w-xl lg:max-w-none mx-auto lg:mx-0">
                  with <span className="text-[#c42dd7] font-semibold">AI Powered Cold Email Outreach</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                  <a href="#contact">
                    <button className="group relative w-full sm:w-auto bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] text-white px-8 py-4 rounded-2xl font-semibold text-base hover:shadow-2xl hover:shadow-[#c42dd7]/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </a>
                  <a href="#clients">
                    <button className="w-full sm:w-auto border-2 border-[#1769dc] text-[#1769dc] px-8 py-4 rounded-2xl font-semibold text-base hover:bg-[#1769dc] hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#1769dc]/50">
                      View Success Stories
                    </button>
                  </a>
                </div>
              </div>

              <div className="relative mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-[#0c102d]/80 backdrop-blur-xl rounded-3xl p-6 border border-[#c42dd7]/30 h-[300px] flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-2xl flex items-center justify-center mb-4 shadow-xl mt-[-20px]">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="w-full h-44 bg-black/30 rounded-2xl border-2 border-dashed border-[#c42dd7]/30 flex items-center justify-center">
                      <p className="text-gray-500 text-base font-medium">Video placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-16">
              {features.map((feature) => (
                <div key={feature.title} className="relative group">
                  <div
                    className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:opacity-30"
                    style={{
                      backgroundColor: feature.color,
                      opacity: '0.1'
                    }}
                  ></div>

                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#c42dd7]/30 transition-all duration-300 shadow-lg shadow-[#c42dd7]/10"></div>

                  <div className="relative bg-[#0c102d]/80 backdrop-blur-xl rounded-xl p-6 border-2 border-[#c42dd7]/30 hover:border-[#1769dc]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c42dd7]/20 h-24 flex items-center justify-center">
                    <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-center transition-all duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Floating Logos Slider section */}
        <section className={`py-12 overflow-hidden ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="relative">
              <div className="flex overflow-hidden group">
                <div className="flex animate-scroll-smooth gap-12 md:gap-20 px-4 py-4">
                  {clientLogos.map((client, index) => (
                    <a
                      key={`first-${index}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/logo block"
                    >
                      <div className="px-5 py-4 transition-all duration-300 hover:scale-110 min-w-[160px] md:min-w-[180px]">
                        <div className="flex flex-col items-center justify-center">
                          <div className="relative">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="relative h-14 md:h-16 w-auto filter brightness-0 invert opacity-70 group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100 transition-all duration-300 z-10"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}

                  {clientLogos.map((client, index) => (
                    <a
                      key={`second-${index}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/logo block"
                    >
                      <div className="px-5 py-4 transition-all duration-300 hover:scale-110 min-w-[160px] md:min-w-[180px]">
                        <div className="flex flex-col items-center justify-center">
                          <div className="relative">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="relative h-14 md:h-16 w-auto filter brightness-0 invert opacity-70 group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100 transition-all duration-300 z-10"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
          </div>
        </section>

        {/* Complete ICP Section  */}
        <section id="complete-icp" className={`py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                  Complete ICP Coverage?
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Stop leaving qualified opportunities on the table. Our unlimited outreach system ensures every ideal customer knows who you are.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="group relative animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c42dd7] transition-colors">
                    100% ICP Coverage
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We identify and contact every decision-maker in your Ideal Customer Profile — reaching them with one personalized touch every 60 days to stay top-of-mind without list fatigue.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#1769dc]/20 hover:border-[#1769dc]/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1769dc] transition-colors">
                    Targeted Campaigns
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our campaigns are signal-driven, engaging only when intent or activity is detected. That means outreach that feels relevant — not cold — resulting in more replies and higher-quality conversations.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#c42dd7]/30 hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#c42dd7] transition-colors">
                    300% More Calls/month
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our pricing combines results-based incentives with a stable retainer, ensuring both sides stay aligned on growth. You win — we win.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className={`py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Trusted By{' '}
                <span className="bg-gradient-to-r from-[#1769dc] to-[#c42dd7] bg-clip-text text-transparent">
                  Industry Leaders
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                We've helped AI, Staffing & B2B SAAS Companies scale their outreach to new heights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div key={index} className="group relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${client.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300`}></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${client.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <client.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c42dd7] transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-gray-400 mb-3 text-sm leading-relaxed">{client.description}</p>
                    <div className={`text-xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent mb-3`}>
                      {client.revenue}
                    </div>
                    <div className="space-y-2">
                      {client.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#c42dd7] mt-0.5 flex-shrink-0 animate-pulse" />
                          <span className="text-xs text-gray-300">{result}</span>
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
        <section id="process" className={`py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                How We Achieve{' '}
                <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                  Complete ICP Coverage
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Our proven 5-step framework ensures your outreach reaches the right people at the right time
              </p>
            </div>

            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="group relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300`}></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-102">
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-3xl font-black bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent`}>
                            {index + 1}
                          </span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-[#c42dd7] transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={`py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                What Our{' '}
                <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
            </div>

            {/* Regular Testimonial Cards */}
            <div className="mb-12">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  scrollBehavior: 'smooth'
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`
                      ${getCardWidth()}
                      bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl border-2 border-[#c42dd7]/20 
                      hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-[1.02] 
                      hover:shadow-2xl hover:shadow-[#c42dd7]/20 cursor-pointer flex-shrink-0 
                      group snap-center mx-2
                    `}
                    onClick={() => openModal(testimonial)}
                  >
                    <div className="p-6 md:p-8 h-full flex flex-col">
                      {/* Top Section */}
                      <div className="mb-4 md:mb-6">
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-base md:text-lg font-semibold text-white mb-1 break-words">
                              {testimonial.highlight}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400">
                              {testimonial.company}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-3 md:w-4 h-3 md:h-4" fill="#FFD700" color="#FFD700" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Text with Side Line */}
                      <div className="flex-1 flex gap-4 md:gap-6 mb-4 md:mb-6 min-h-[200px] md:min-h-[220px]">
                        <div
                          className="w-1 rounded-full flex-shrink-0 h-full self-stretch"
                          style={{ backgroundColor: testimonial.accentColor }}
                        />

                        <div className="text-gray-300 text-sm md:text-base leading-relaxed overflow-hidden flex-1">
                          <div className="line-clamp-9 md:line-clamp-8 whitespace-normal break-words">
                            {testimonial.text}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="pt-4 md:pt-6 border-t border-[#c42dd7]/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            {/* CEO Image */}
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#c42dd7]/30 flex-shrink-0">
                              <img
                                src={testimonial.avatarImg}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-white font-bold text-sm md:text-base truncate">
                                {testimonial.name}
                              </div>
                              <div className="text-gray-400 text-xs md:text-sm truncate">
                                {testimonial.title}
                              </div>
                            </div>
                          </div>
                          <div className="text-[#c42dd7] text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-2">
                            Read full →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots  */}
              <div className="flex justify-center gap-3 mt-6 md:mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentCardIndex === index
                      ? 'w-8'
                      : 'w-2 hover:w-4'
                      }`}
                    style={{
                      backgroundColor: currentCardIndex === index
                        ? testimonials[index].accentColor
                        : '#c42dd7',
                      opacity: currentCardIndex === index ? 1 : 0.5
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Video Testimonial Card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl border-2 border-[#c42dd7]/30 hover:border-[#c42dd7] transition-all duration-300 hover:scale-[1.01]">
                <div className="p-6 md:p-8">
                  {/* Top Section */}
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <div className="text-xl md:text-2xl font-bold text-white mb-2">
                        10–15 Qualified Calls/Month
                      </div>
                      <div className="text-base md:text-lg text-gray-400">
                        SmoothOperations.ai
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mb-6">
                    <div className="flex gap-4 md:gap-6">
                      <div
                        className="w-1 rounded-full flex-shrink-0 self-stretch"
                        style={{ backgroundColor: "#c42dd7" }}
                      />

                      <div className="text-gray-300 text-base leading-relaxed whitespace-normal break-words">
                        "OutreachCrafters truly mastered the balance of volume, personalization, and precision — something most agencies never get right. They've set a new standard for us."
                      </div>
                    </div>
                  </div>

                  {/* Watch Video Button */}
                  <div className="mb-6 flex justify-center">
                    <button
                      onClick={openVideoModal}
                      className="group relative bg-gradient-to-r from-[#c42dd7]/20 to-[#1769dc]/20 border-2 border-[#c42dd7]/40 hover:border-[#c42dd7]/70 rounded-xl py-3 px-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#c42dd7]/20 inline-flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-[#c42dd7] to-[#1769dc] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white" fill="white" />
                      </div>
                      <span className="text-white font-semibold text-base">Watch Video Testimonial</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/5 to-[#1769dc]/5 rounded-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* Bottom Section */}
                  <div className="pt-6 border-t border-[#c42dd7]/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        {/* CEO Image */}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#c42dd7]/30">
                          <img
                            src={smoothOperationsCEO}
                            alt="Jarrett Lau"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white font-bold text-base md:text-lg">
                            Jarrett Lau
                          </div>
                          <div className="text-gray-400 text-sm md:text-base">
                            Founder & CEO of SmoothOperations.ai
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 border-2 border-[#c42dd7]/30">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Ready to{' '}
                    <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                      Scale Your Outreach?
                    </span>
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Join the companies generating consistent, high-quality calls every month with AI-powered outreach
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <a href="mailto:noman@outreachcrafters.com" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7] to-[#1769dc] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#c42dd7]/30 hover:border-[#c42dd7] transition-all duration-300 hover:scale-102">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl flex items-center justify-center shadow-lg">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">Contact us:</div>
                          </div>
                        </div>
                        <div className="text-[#c42dd7] font-medium text-base break-all group-hover:text-[#1769dc] transition-colors">
                          noman@outreachcrafters.com
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="https://calendly.com/outreachcrafters/30min" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-[#1769dc]/30 hover:border-[#1769dc] transition-all duration-300 hover:scale-102">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">30 min Strategy Call</div>
                          </div>
                        </div>
                        <div className="text-[#1769dc] font-medium text-base group-hover:text-[#c42dd7] transition-colors">
                          Book a free consultation call
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <a href="https://calendly.com/outreachcrafters/30min" target="_blank" rel="noopener noreferrer">
                    <button className="group relative bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-[#c42dd7]/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Schedule Your Strategy Call
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal for Full Testimonial */}
        {isModalOpen && modalTestimonial && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
              onClick={closeModal}
            >
              {/* Modal Container */}
              <div
                className="relative bg-[#0c102d] rounded-2xl border-2 border-[#c42dd7]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0c102d]/80 backdrop-blur-xl border border-[#c42dd7]/30 flex items-center justify-center text-white hover:bg-[#c42dd7] hover:border-[#c42dd7] transition-all duration-300 hover:scale-110 z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div
                  ref={modalRef}
                  className="h-full overflow-y-auto modal-scrollbar"
                  style={{ maxHeight: 'calc(90vh - 2rem)' }}
                >
                  <div className="p-6 md:p-8">
                    {/* Top Section */}
                    <div className="mb-6">
                      <div className="text-lg font-semibold text-white mb-1">
                        {modalTestimonial.company}
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                        {modalTestimonial.highlight}
                      </h3>
                    </div>

                    <div className="mb-8">
                      <div className="flex gap-6">
                        <div
                          className="w-1 rounded-full flex-shrink-0 self-stretch"
                          style={{ backgroundColor: modalTestimonial.accentColor }}
                        />

                        <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line break-words">
                          {modalTestimonial.fullText}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t border-[#c42dd7]/20">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c42dd7]/30">
                          <img
                            src={modalTestimonial.avatarImg}
                            alt={modalTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">
                            {modalTestimonial.name}
                          </div>
                          <div className="text-gray-400">
                            {modalTestimonial.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Video Modal  */}
        {isVideoModalOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
              onClick={closeVideoModal}
            >
              {/* Modal Container */}
              <div
                ref={videoModalRef}
                className="relative bg-[#0c102d] rounded-2xl border-2 border-[#c42dd7]/30 w-full max-w-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{
                  opacity: 0,
                  transform: 'scale(0.95) translateY(20px)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0c102d]/90 backdrop-blur-xl border border-[#c42dd7]/30 flex items-center justify-center text-white hover:bg-[#c42dd7] hover:border-[#c42dd7] transition-all duration-300 hover:scale-110 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Video Content */}
                <div className="p-4">
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                      {/* YouTube embed */}
                      <iframe
                        src="https://www.youtube.com/embed/J0d3WBIi32M?autoplay=1&rel=0&modestbranding=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                        title="SmoothOperations.ai Testimonial"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="px-2 pb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      SmoothOperations.ai Testimonial
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Jarrett Lau, Founder & CEO of SmoothOperations.ai, shares his experience working with Outreach Crafters.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#c42dd7]/30">
                        <img
                          src={smoothOperationsCEO}
                          alt="Jarrett Lau"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">Jarrett Lau</div>
                        <div className="text-gray-400 text-xs">Founder & CEO of SmoothOperations.ai</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className={`bg-[#0c102d] border-t border-[#c42dd7]/20 py-6 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center md:text-left">
                <div className="space-y-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent block">
                    Outreach Crafters
                  </span>
                  <p className="text-xs text-gray-400 px-4 md:px-0">
                    Unlocking 3x revenue through AI powered cold Email outreach.
                  </p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#complete-icp" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-xs inline-block">Complete ICP</a></li>
                  <li><a href="#clients" className="text-gray-400 hover:text-[#1769dc] transition-colors text-xs inline-block">Clients</a></li>
                  <li><a href="#process" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-xs inline-block">Process</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-[#1769dc] transition-colors text-xs inline-block">Testimonials</a></li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Contact Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:noman@outreachcrafters.com" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-xs inline-block break-all">
                      noman@outreachcrafters.com
                    </a>
                  </li>
                  <li>
                    <a href="https://calendly.com/outreachcrafters/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1769dc] transition-colors text-xs inline-block">
                      Book a Strategy Call
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Connect</h3>
                <div className="flex justify-center md:justify-start gap-3">
                  <a href="https://www.linkedin.com/in/nomanishfaq/" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 hover:border-[#1769dc] transition-all duration-300 group-hover:scale-110">
                      <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-[#1769dc]" />
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 hover:border-[#c42dd7] transition-all duration-300 group-hover:scale-110">
                      <Instagram className="w-4 h-4 text-gray-400 group-hover:text-[#c42dd7]" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 text-center">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Outreach Crafters. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
  @keyframes scroll-smooth {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll-smooth {
    animation: scroll-smooth 20s linear infinite;
    will-change: transform;
    animation-timing-function: linear;
  }

  .group:hover .animate-scroll-smooth {
    animation-play-state: paused;
  }

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
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(30px, -30px) scale(1.1);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-30px, 30px) scale(1.1);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(196, 45, 215, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 40px rgba(196, 45, 215, 0.6);
      transform: scale(1.02);
    }
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

  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }

  .line-clamp-9 {
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }

  .line-clamp-8 {
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }

  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }

  /* Custom Modal Scrollbar - NOW WORKING */
  .modal-scrollbar {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(196, 45, 215, 0.5) transparent;
  }

  .modal-scrollbar::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  .modal-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
    margin: 4px;
  }

  .modal-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(196, 45, 215, 0.5);
    border-radius: 4px;
    min-height: 40px;
  }

  .modal-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(196, 45, 215, 0.7);
  }

  /* Snap scrolling for cards */
  .snap-x {
    scroll-snap-type: x mandatory;
  }

  .snap-center {
    scroll-snap-align: center;
  }

  .snap-mandatory {
    scroll-snap-stop: always;
  }

  /* Break words properly */
  .break-words {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }

  .whitespace-normal {
    white-space: normal;
  }
`}</style>
    </div>
  );
};

export default OutreachCraftersWebsite;