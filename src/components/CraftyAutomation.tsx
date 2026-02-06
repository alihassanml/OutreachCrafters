import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Target, Zap, TrendingUp, CheckCircle, ArrowRight, Mail, Users, Award, Sparkles, Rocket, BarChart3, MessageSquare, Calendar, Linkedin, Instagram, Star, Play, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    Calendly?: any;
  }
}

type Testimonial = {
  id: number;
  company: string;
  highlight: string;
  accentColor: string;
  fullText: string;
  avatarImg: string;
  name: string;
  title: string;
  rating: number;
  text: string;
};

const OutreachCraftersWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTestimonial, setModalTestimonial] = useState<Testimonial | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoModalRef = useRef<HTMLDivElement | null>(null);
  const testimonialIntervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };

    handleResize();

    // Set loaded state after initial render
    setIsLoaded(true);

    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      testimonialIntervalRef.current = setInterval(() => {
        setCurrentCardIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % testimonials.length;
          scrollToCard(nextIndex);
          return nextIndex;
        });
      }, 3500);

      return () => {
        if (testimonialIntervalRef.current) {
          clearInterval(testimonialIntervalRef.current);
        }
      };
    }
  }, []);

  // Optimized modal animations
  useEffect(() => {
    if (isVideoModalOpen && videoModalRef.current) {
      requestAnimationFrame(() => {
        if (videoModalRef.current) {
          videoModalRef.current.style.transition = 'all 0.3s ease-out';
          videoModalRef.current.style.opacity = '1';
          videoModalRef.current.style.transform = 'scale(1) translateY(0)';
        }
      });
    }
  }, [isVideoModalOpen]);

  // Modal functions with optimization
  const openModal = useCallback((testimonial: Testimonial) => {
    setModalTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalTestimonial(null);
    document.body.style.overflow = 'auto';
  }, []);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeVideoModal = useCallback(() => {
    if (videoModalRef.current) {
      videoModalRef.current.style.transition = 'all 0.3s ease-out';
      videoModalRef.current.style.opacity = '0';
      videoModalRef.current.style.transform = 'scale(0.95) translateY(20px)';
    }

    setTimeout(() => {
      setIsVideoModalOpen(false);
      document.body.style.overflow = 'auto';
    }, 300);
  }, []);

  // Calendly Integration - Updated with badge widget
  useEffect(() => {
    // Load Calendly
    const loadCalendly = () => {
      // Check if already loaded
      if (document.querySelector('link[href*="calendly.com"]') ||
        document.querySelector('script[src*="calendly.com"]')) {
        return;
      }

      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);

      script.onload = () => {
        if (window.Calendly) {
          // Initialize badge widget
          window.Calendly.initBadgeWidget({
            url: 'https://calendly.com/outreachcrafters/30min',
            text: 'Schedule time with me',
            color: '#0069ff',
            textColor: '#ffffff',
            branding: true
          });
        }
      };

      return () => {
        if (link.parentNode) link.parentNode.removeChild(link);
        if (script.parentNode) script.parentNode.removeChild(script);
      };
    };

    // Load after initial render
    const timer = setTimeout(loadCalendly, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Function to open Calendly
  const openCalendly = useCallback(() => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/outreachcrafters/30min'
      });
    } else {
      // Fallback in case Calendly isn't loaded yet
      window.open('https://calendly.com/outreachcrafters/30min', '_blank');
    }
  }, []);

  const scrollToCard = useCallback((index: number) => {
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
  }, []);

  const getCardWidth = useCallback(() => {
    if (windowWidth < 768) {
      return 'w-[calc(100vw-2rem)]';
    } else {
      return 'w-[500px]';
    }
  }, [windowWidth]);

  const getSectionPadding = useCallback(() => {
    if (windowWidth < 768) {
      return 'px-4';
    } else if (windowWidth < 1024) {
      return 'px-6';
    } else {
      return 'px-12';
    }
  }, [windowWidth]);

  // FIXED: Client logos - All logos same size
  const clientLogos = [
    {
      name: "iCanvas",
      logo: "/LOGOS/iCanvas.svg",
      url: "https://icanvas.com",
    },
    {
      name: "Patient Studio",
      logo: "/LOGOS/patientstudio.svg",
      url: "https://patientstudio.com",
    },
    {
      name: "Flag",
      logo: "/LOGOS/Flag.svg",
      url: "https://flag.ai",
    },
    {
      name: "RoboGrowthPartners",
      logo: "/LOGOS/robogrowthpartners.svg",
      url: "https://robogrowthpartners.ai",
    },
    {
      name: "Patient Studio",
      logo: "/LOGOS/patientstudio.svg",
      url: "https://patientstudio.com",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      accentColor: "#1769dc",
      rating: 5,
      text: "We'd been scaling steadily through referrals and inbound, but outbound was the missing piece until we met Noman and the OutreachCrafters team. They completely transformed how we connect with high-value clients. Within the first few weeks, we were booking 10–20 qualified calls per month with art buyers and retailers who perfectly matched our ICP. The conversion rate was remarkable nearly 33%, and we signed two large deals in sixty days, averaging $110K per client.",
      highlight: "10–20 Qualified Calls/Month",
      name: "Leon Oks",
      title: "Founder & CEO of iCanvas",
      avatarImg: "/LOGOS/icanvasCEO.svg",
      company: "iCanvas",
      fullText: `"We'd been scaling steadily through referrals and inbound, but outbound was the missing piece until we met Noman and the OutreachCrafters team.
They completely transformed how we connect with high-value clients. Within the first few weeks, we were booking 10–20 qualified calls per month with art buyers and retailers who perfectly matched our ICP. The conversion rate was remarkable nearly 33%, and we signed two large deals in sixty days, averaging $110K per client.
The secret? Their approach didn't feel robotic. Every campaign was thoughtful, well-timed, and data-driven. OutreachCrafters tested multiple message styles, tracked response behavior, and found the perfect tone that resonated with our audience.
I've worked with outreach specialists before, but none who took this much ownership of outcomes. Noman treated our campaigns as if they were his own, analyzing, iterating, and pushing for better results every single week.
If you're looking for a partner who combines the science of outbound with genuine creative intelligence, look no further than OutreachCrafters."`
    },
    {
      id: 2,
      accentColor: "#c42dd7",
      rating: 5,
      text: "Before working with Noman and the team at OutreachCrafters, we'd tried just about everything to get consistent outbound results — new domains, different tools, agencies that promised miracles. We could book a few meetings here and there, but it was never predictable or scalable. Within weeks of partnering with Noman, everything changed. He completely rebuilt our system from the ground up — refining our ICP, enriching our data, and creating outreach campaigns that actually felt human.",
      highlight: "3× Increase in AI Agent Deployments",
      name: "David Golub",
      title: "Founder & CEO of Amdel.ai",
      avatarImg: "/LOGOS/AmdelAiCEO.svg",
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
      text: "Before connecting with Noman and OutreachCrafters, we'd tried a handful of outreach tools and even brought on a freelancer team to help us scale our outbound. But the results were scattered — open rates were inconsistent, and quality meetings were rare. Noman and his team approached things completely differently. They built a system that actually understood our industry. Every campaign was timed around real-world signals — funding rounds, hiring trends, and product launches.",
      highlight: "8–10 Qualified Calls/Month",
      name: "Richie Commins",
      title: "Founder & CEO of Flag",
      avatarImg: "/LOGOS/FlagCEO.svg",
      company: "Flag",
      fullText: `"Before connecting with Noman and OutreachCrafters, we'd tried a handful of outreach tools and even brought on a freelancer team to help us scale our outbound. But the results were scattered — open rates were inconsistent, and quality meetings were rare.
Noman and his team approached things completely differently. They built a system that actually understood our industry. Every campaign was timed around real-world signals — funding rounds, hiring trends, and product launches — which meant our emails landed when prospects were actively looking for solutions.
In less than 10 weeks, we were booking 8–10 qualified calls per month, consistently hitting 33% conversion rates from those calls. The leads weren't random — they were high-intent prospects from the exact industries we serve, like airports, security, and infrastructure analytics.
What impressed me most was Noman's responsiveness and adaptability. Anytime we needed to tweak messaging or adjust targeting, he was already one step ahead. He treated our campaigns like a living system — always testing, refining, and improving.
I've worked with several outbound partners before, but OutreachCrafters has been by far the most strategic and transparent team we've collaborated with. They didn't just deliver meetings — they built a sustainable, predictable pipeline."`
    },
  ];

  // Features data
  const features = [
    {
      title: "Buyers Detected, Not Scrape",
      color: "#c42dd7"
    },
    {
      title: "Signal-First Outreach",
      color: "#1769dc"
    },
    {
      title: "300% More Calls/month",
      color: "#c42dd7"
    }
  ];

  // Clients data
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

  // Process data
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

  // New Sections Content
  const sections = [
    {
      id: "section1",
      title: "Why Most Lead Gen Agencies Suck",
      subtitle: "Why most lead gen agencies fail (and why founders get burned)",
      content: `Most lead gen agencies don't fail because outbound is dead.
They fail because they take shortcuts.
Here's what usually happens:
• They buy recycled lists
• They target broad personas instead of real buying signals
• They automate everything with AI
• They measure success by emails sent, not meetings booked

The result?
Your prospects receive generic messages at the wrong time, from agencies that don't understand your market, and your brand pays the price.

Cold email isn't broken.
Bad strategy is.`
    },
    {
      id: "section2",
      title: "The Old Way (Traditional Lead Gen)",
      subtitle: "The old way: volume-first, context-last",
      content: `Typical agency thinking:
"Let's target all Founders / CMOs / Heads of Sales at companies with 10–200 employees."

What this leads to:
• Persona-based targeting
  Job titles ≠ buying intent
• Generic messaging
  Same copy sent to hundreds of companies with different problems
• Fully AI-written campaigns
  Easy to spot. Easy to ignore.
• Activity over outcomes
  Reports full of opens, clicks, and sends but few real conversations
• No accountability
  You pay the retainer whether meetings happen or not

This approach creates inbox noise, not pipeline.`
    },
    {
      id: "section3",
      title: "The Outreach Crafters Way",
      subtitle: "The Outreach Crafters way: signal-first, human-led outreach",
      content: `We don't send more emails.
We send better-timed emails to the right people for the right reason.
Here's how we do it differently 👇

Pain-based, signal-driven campaigns
We actively look for real-world buying signals, such as:
• Hiring activity
• Funding announcements
• Product launches
• Market expansion
• Tooling changes

Outreach only happens when context exists, making messages feel relevant, not cold.

Human-reviewed campaigns (AI where it actually helps)
We don't let AI write full messages.
AI is great for:
• Research assistance
• Signal enrichment
• Variable personalization

Humans handle:
• Strategy
• Messaging frameworks
• Final copy review

Every campaign is overseen by a real strategist, not pushed live blindly.

Performance-aligned guarantees
We don't believe in getting paid just for "sending emails."
That's why our model includes:
• Performance-based incentives
• Clear benchmarks
• Ongoing optimization until results are hit

If meetings don't happen, we don't hide behind reports — we fix the system.`
    },
    {
      id: "section4",
      title: "Comparison Section",
      subtitle: "Outreach Crafters vs Traditional Lead Gen",
      comparison: [
        {
          category: "Targeting",
          traditional: "Persona-based",
          outreach: "Pain + signal-based"
        },
        {
          category: "Messaging",
          traditional: "Fully automated AI",
          outreach: "Human-led, AI-assisted"
        },
        {
          category: "Timing",
          traditional: "Random",
          outreach: "Triggered by intent"
        },
        {
          category: "Success Metric",
          traditional: "Emails sent",
          outreach: "Qualified calls booked"
        },
        {
          category: "Pricing",
          traditional: "Fixed retainer",
          outreach: "Performance-aligned"
        },
        {
          category: "Accountability",
          traditional: "Low",
          outreach: "High"
        }
      ]
    }
  ];

  // Better image preloading
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      const preloadImages = [
        '/logo.svg',
        '/LOGOS/iCanvas.svg',
        '/LOGOS/patientstudio.svg',
        '/LOGOS/Flag.svg',
        '/LOGOS/robogrowthpartners.svg',
        '/LOGOS/AmdelAi.svg',
      ];

      preloadImages.forEach((src, index) => {
        setTimeout(() => {
          const img = new Image();
          img.src = src;
        }, index * 100);
      });
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-[#0c102d] relative overflow-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0c102d]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7]/10 via-[#0c102d] to-[#1769dc]/10"></div>

        {/* Light animations only */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#1769dc]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#c42dd7]/5 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10">

        {/* Floating Button for Schedule Call */}
        <div className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50">
          <button
            onClick={openCalendly}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#c42dd7] to-[#1769dc] flex items-center justify-center group overflow-hidden shadow-2xl shadow-[#c42dd7]/30 hover:shadow-[#c42dd7]/50 transition-all duration-500 hover:scale-110"
            aria-label="Schedule a call"
            style={{
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            {/* Animated pulse effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c42dd7]/30 to-[#1769dc]/30 animate-ping"></div>

            {/* Main button content */}
            <div className="relative z-10 flex items-center justify-center">
              <Calendar className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>

            {/* Sparkle effects */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animation: 'sparkle 2s infinite' }}></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animation: 'sparkle 2s infinite 0.5s' }}></div>

            {/* Tooltip for desktop */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-[#0c102d]/95 backdrop-blur-sm border border-[#c42dd7]/30 rounded-lg text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:block">
              Schedule a Call
              <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-[#c42dd7]/30"></div>
            </div>
          </button>
        </div>

        {/* Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0c102d]/95 backdrop-blur-sm shadow-lg border-b border-[#c42dd7]/20' : 'bg-transparent'}`}>
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-14 h-14 md:w-14 md:h-14 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-[#c42dd7]/50">
                  <img
                    src="/logo.svg"
                    alt="Outreach Crafters"
                    className="w-full h-full object-cover transform scale-125"
                    loading="eager"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <span className="text-2xl md:text-2xl font-black bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                    Outreach Crafters
                  </span>
                  <div className="text-xs text-purple-300 font-medium hidden md:block">Hands Off Growth System</div>
                </div>
              </div>

              <div className="hidden md:flex space-x-6 items-center">
                <a href="#section3" className="text-gray-300 hover:text-[#c42dd7] transition-colors duration-300 font-medium text-sm">Outreach Crafters Way</a>
                <a href="#process" className="text-gray-300 hover:text-[#c42dd7] transition-colors duration-300 font-medium text-sm">Process</a>
                <a href="#testimonials" className="text-gray-300 hover:text-[#1769dc] transition-colors duration-300 font-medium text-sm">Testimonials</a>
                <a href="#contact" className="text-gray-300 hover:text-[#c42dd7] transition-colors duration-300 font-medium text-sm">Contact</a>

                {/* UPDATED: Book a Call Button with gradient design */}
                <button
                  onClick={openCalendly}
                  className="relative group bg-gradient-to-r from-[#c42dd7] to-[#1769dc] text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-[#c42dd7]/30 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book a Call
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white bg-[#c42dd7]/20 p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-[#0c102d]/95 backdrop-blur-sm border-t border-[#c42dd7]/20">
              <div className="px-4 py-3 space-y-2">
                <a href="#section3" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Outreach Crafters Way</a>
                <a href="#process" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Process</a>
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-[#1769dc] transition py-2 font-medium">Testimonials</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-[#c42dd7] transition py-2 font-medium">Contact</a>

                {/* UPDATED: Mobile Book a Call Button */}
                <button
                  onClick={() => {
                    openCalendly();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center bg-gradient-to-r from-[#c42dd7] to-[#1769dc] text-white px-4 py-3 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-[#c42dd7]/30 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book a Call
                  </span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className={`pt-20 md:pt-32 pb-12 md:pb-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block mb-4 md:mb-6">
                  <span className="px-4 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-[#c42dd7]/20 to-[#1769dc]/20 border border-[#c42dd7]/30 rounded-full text-purple-300 font-semibold text-sm md:text-base backdrop-blur-sm">
                    🚀 Performance-Based Results
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  We help{' '}
                  <span className="font-black bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                    B2B AI SAAS, Staffing and Wealth Management Firms
                  </span>
                  {' '}in unlocking
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1769dc] to-[#c42dd7] font-black mt-2 md:mt-3">
                    3x revenue growth
                  </span>
                </h1>

                <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8 font-normal max-w-xl lg:max-w-none mx-auto lg:mx-0">
                  with <span className="text-[#c42dd7] font-semibold">Hands off Growth Systems</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 justify-center lg:justify-start">
                  <a href="#contact" className="w-full sm:w-auto">
                    <button className="group relative w-full bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] text-white px-6 py-3 md:px-7 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg transition-transform duration-200 active:scale-95">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </span>
                    </button>
                  </a>
                </div>
              </div>

              {/* YouTube Video Section */}
              <div className="relative mt-6 md:mt-0">
                <div className="relative bg-[#0c102d]/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 border border-[#c42dd7]/30 h-[220px] sm:h-[280px] md:h-[400px] overflow-hidden">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/uKXVChzmFrs?autoplay=1&mute=1&loop=1&playlist=uKXVChzmFrs&controls=1&modestbranding=1&rel=0"
                        title="Outreach Crafters Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="relative bg-[#0c102d]/80 backdrop-blur-sm rounded-xl p-4 border border-[#c42dd7]/30 h-16 md:h-20 flex items-center justify-center">
                    <h3 className="text-base md:text-lg font-bold text-transparent bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-center">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Logos */}
            <div className={`py-8 md:py-12 overflow-hidden ${getSectionPadding()}`}>
              <div className="max-w-[1400px] mx-auto">
                <div className="relative">
                  <div className="flex overflow-hidden">
                    <div className="flex animate-scroll-smooth gap-12 md:gap-16 px-2 py-4">
                      {[...clientLogos, ...clientLogos].map((client, index) => (
                        <div
                          key={`logo-${index}`}
                          className="group/logo block"
                        >
                          <div className="px-3 py-2 transition-transform duration-200 active:scale-95 min-w-[120px] md:min-w-[160px]">
                            <div className="flex flex-col items-center justify-center">
                              <div className="h-14 md:h-16 w-full flex items-center justify-center">
                                <img
                                  src={client.logo}
                                  alt={client.name}
                                  className="h-10 md:h-14 w-auto max-w-full object-contain filter brightness-0 invert opacity-70 group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100 transition-all duration-200"
                                  loading="lazy"
                                />
                              </div>
                              <div className="mt-2 text-xs text-gray-400 text-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200">
                                {client.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Why Most Lead Gen Agencies Suck */}
        <section id="section1" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                  {sections[0].title}
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                {sections[0].subtitle}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/10 via-purple-600/10 to-[#1769dc]/10 rounded-xl md:rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#c42dd7]/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Left Column - Problems */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#c42dd7] transition-colors">
                        The Reality
                      </h3>
                      <div className="text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base space-y-4">
                        <div>
                          <p className="font-semibold text-base mb-2">Most agencies don't fail because outbound is dead.</p>
                          <p className="text-gray-400">They fail because they take shortcuts.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-base text-[#c42dd7] mb-2">Here's what usually happens:</p>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <span className="text-[#c42dd7] mt-1">•</span>
                              <span>They buy recycled lists</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#c42dd7] mt-1">•</span>
                              <span>They target broad personas instead of real buying signals</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#c42dd7] mt-1">•</span>
                              <span>They automate everything with AI</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#c42dd7] mt-1">•</span>
                              <span>They measure success by emails sent, not meetings booked</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Consequences */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1769dc]/20 hover:border-[#1769dc]/50 transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#1769dc] transition-colors">
                        The Result
                      </h3>
                      <div className="text-gray-300 whitespace-pre-line leading-relaxed text-sm md:text-base space-y-4">
                        <div>
                          <p className="text-gray-400 italic mb-3">What this leads to:</p>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                              <span>Your prospects receive generic messages at the wrong time</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                              <span>Agencies that don't understand your market</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                              <span>Your brand pays the price</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                              <span>Inbox noise, not pipeline</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[#c42dd7]/30">
                  <div className="text-center">
                    <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6">
                      <span className="font-bold">Cold email isn't broken.</span>
                    </p>
                    <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent mb-4 md:mb-6">
                      Bad strategy is.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Old Way (Traditional Lead Gen) */}
        <section id="section2" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-[#1769dc] to-[#c42dd7] bg-clip-text text-transparent">
                  {sections[1].title}
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                {sections[1].subtitle}
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc]/10 via-purple-600/10 to-[#c42dd7]/10 rounded-xl md:rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1769dc]/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Left Column - Agency Thinking */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1769dc]/20 hover:border-[#1769dc]/50 transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#1769dc] transition-colors">
                        Typical Agency Thinking
                      </h3>
                      <p className="text-gray-300 italic text-base md:text-lg font-semibold mb-6 leading-relaxed">
                        "Let's target all Founders / CMOs / Heads of Sales at companies with 10–200 employees."
                      </p>
                      <div className="pt-4 md:pt-6 border-t border-[#1769dc]/30">
                        <p className="text-sm text-gray-400 italic">The persona-based approach: assume job title = buying intent</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Consequences */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-[#c42dd7] transition-colors">
                        What This Leads To
                      </h3>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">Persona-based targeting (Job titles ≠ buying intent)</span>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">Generic messaging (Same copy sent to hundreds of companies)</span>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">Fully AI-written campaigns (Easy to spot. Easy to ignore.)</span>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">Activity over outcomes (Reports full of opens, clicks, but few conversations)</span>
                        </div>
                        <div className="flex items-start gap-3 md:gap-4">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">No accountability (You pay whether meetings happen or not)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Message */}
                <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[#1769dc]/30">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#1769dc] via-purple-400 to-[#c42dd7] bg-clip-text text-transparent">
                      This approach creates <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c42dd7] to-[#1769dc]">inbox noise</span>, not pipeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Outreach Crafters Way */}
        <section id="section3" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                  {sections[2].title}
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8">
                {sections[2].subtitle}
              </p>
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                We don't send more emails.<br />
                We send better-timed emails to the right people for the right reason.
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/10 via-purple-600/10 to-[#1769dc]/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#c42dd7]/30">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Pain-based Campaigns */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl p-6 border border-[#c42dd7]/20 hover:border-[#c42dd7] transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl flex items-center justify-center mb-4 shadow-lg mx-auto">
                        <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Pain-based, signal-driven campaigns</h3>
                      <p className="text-gray-400 mb-4 text-center">We actively look for real-world buying signals:</p>
                      <div className="space-y-2">
                        {['Hiring activity', 'Funding announcements', 'Product launches', 'Market expansion', 'Tooling changes'].map((signal, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1769dc] flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{signal}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#c42dd7]/20 text-center">
                        <p className="text-sm text-gray-400 italic">
                          Outreach only happens when context exists, making messages feel relevant, not cold.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Human-reviewed Campaigns */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl p-6 border border-[#1769dc]/20 hover:border-[#1769dc] transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl flex items-center justify-center mb-4 shadow-lg mx-auto">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Human-reviewed campaigns</h3>
                      <p className="text-gray-400 mb-4 text-center">(AI where it actually helps)</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[#c42dd7] mb-2">AI is great for:</h4>
                        <div className="space-y-1 mb-3">
                          {['Research assistance', 'Signal enrichment', 'Variable personalization'].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#1769dc] rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[#1769dc] mb-2">Humans handle:</h4>
                        <div className="space-y-1">
                          {['Strategy', 'Messaging frameworks', 'Final copy review'].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#c42dd7] rounded-full"></div>
                              <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#1769dc]/20 text-center">
                        <p className="text-sm text-gray-400 italic">
                          Every campaign is overseen by a real strategist, not pushed live blindly.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Performance-aligned Guarantees */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                    <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl p-6 border border-[#c42dd7]/30 hover:border-[#c42dd7] transition-all duration-300 h-full">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-xl flex items-center justify-center mb-4 shadow-lg mx-auto">
                        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Performance-aligned guarantees</h3>
                      <p className="text-gray-400 mb-4 text-center">
                        We don't believe in getting paid just for "sending emails."
                      </p>

                      <div className="space-y-3">
                        {['Performance-based incentives', 'Clear benchmarks', 'Ongoing optimization until results are hit'].map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#c42dd7] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#c42dd7]/30 text-center">
                        <p className="text-sm text-gray-400 italic">
                          If meetings don't happen, we don't hide behind reports — we fix the system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modified Schedule a Call Button Section */}
                <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-[#c42dd7]/30">
                  <div className="text-center">
                    <button
                      onClick={openCalendly}
                      className="group relative bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-bold hover:shadow-xl hover:shadow-[#c42dd7]/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                        Schedule a Call
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] via-purple-600 to-[#c42dd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                How we introduce to your{' '}
                <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                  Ideal clients
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                Our proven 5-step framework ensures your outreach reaches the right people at the right time
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {process.map((step, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300`}></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#c42dd7]/20 hover:border-[#c42dd7]/50 transition-all duration-300 hover:scale-102">
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                      <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${step.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                          <span className={`text-2xl md:text-3xl font-black bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent`}>
                            {index + 1}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#c42dd7] transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Works Section - MOVED BEFORE TESTIMONIALS */}
        <section className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/15 via-purple-600/15 to-[#1769dc]/15 rounded-xl md:rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-10 border border-[#c42dd7]/30">
                <div className="text-center mb-8 md:mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6">
                    <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                      Why this works even in crowded inboxes
                    </span>
                  </h3>
                  <p className="text-base md:text-lg text-gray-300 mb-4">
                    Buyers don't hate cold email.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-300 mb-8 md:mb-10">
                    They hate <span className="text-[#c42dd7]">irrelevant</span> cold email.
                  </p>
                </div>

                <div className="mb-8 md:mb-10">
                  <p className="text-center text-gray-400 text-base md:text-lg mb-6 md:mb-8">When outreach is:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Timed to real signals */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#c42dd7]/30 hover:border-[#c42dd7]/60 transition-all duration-300 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-[#c42dd7]">Timed to Real Signals</h4>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">Outreach happens when context exists, making messages feel relevant and timely</p>
                      </div>
                    </div>

                    {/* Written by humans */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1769dc]/30 hover:border-[#1769dc]/60 transition-all duration-300 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-[#1769dc]">Written by Humans</h4>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">Authentic messaging that sounds genuine and human, not AI-generated</p>
                      </div>
                    </div>

                    {/* Focused on actual pain */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-xl md:rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#c42dd7]/30 hover:border-[#c42dd7]/60 transition-all duration-300 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-[#c42dd7]">Focused on Actual Pain</h4>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">Messages address real problems your prospects are facing right now</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Message */}
                <div className="pt-6 md:pt-8 border-t border-[#c42dd7]/30 text-center">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                    It stops feeling like outreach<br />and starts real conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                What Our{' '}
                <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
            </div>

            {/* Testimonial Cards */}
            <div className="mb-8 md:mb-12">
              <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`
                      ${getCardWidth()}
                      bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-[#c42dd7]/20 
                      hover:border-[#c42dd7]/50 transition-all duration-300 cursor-pointer flex-shrink-0 
                      snap-center mx-2 md:mx-4
                    `}
                    onClick={() => openModal(testimonial)}
                  >
                    <div className="p-4 md:p-6 h-full flex flex-col">
                      {/* Top Section */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex justify-between items-start mb-2 md:mb-3">
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
                              <Star key={i} className="w-3 h-3 md:w-4 md:h-4" fill="#FFD700" color="#FFD700" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Text with Side Line */}
                      <div className="flex gap-3 md:gap-4 mb-3 md:mb-4 flex-1 min-h-[150px] md:min-h-[200px]">
                        <div
                          className="w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: testimonial.accentColor }}
                        />

                        <div className="text-gray-300 text-xs md:text-sm leading-relaxed overflow-hidden flex-1">
                          <div className="line-clamp-8 md:line-clamp-10 whitespace-normal break-words">
                            {testimonial.text}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="pt-3 md:pt-4 border-t border-[#c42dd7]/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                            {/* CEO Image */}
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border border-[#c42dd7]/30 flex-shrink-0">
                              <img
                                src={testimonial.avatarImg}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
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

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-4 md:mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentCardIndex === index ? 'w-4 md:w-6' : 'w-2 hover:w-3 md:hover:w-4'}`}
                    style={{
                      backgroundColor: currentCardIndex === index ? testimonials[index].accentColor : '#c42dd7',
                      opacity: currentCardIndex === index ? 1 : 0.5
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Video Testimonial Card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-[#c42dd7]/30 hover:border-[#c42dd7] transition-all duration-300">
                <div className="p-4 md:p-6">
                  {/* Top Section */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-center mb-3 md:mb-4">
                      <div className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                        10–15 Qualified Calls/Month
                      </div>
                      <div className="text-base md:text-lg text-gray-400">
                        SmoothOperations.ai
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mb-4 md:mb-6">
                    <div className="flex gap-3 md:gap-4">
                      <div
                        className="w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#c42dd7" }}
                      />

                      <div className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-normal break-words">
                        "OutreachCrafters truly mastered the balance of volume, personalization, and precision — something most agencies never get right. They've set a new standard for us."
                      </div>
                    </div>
                  </div>

                  {/* Watch Video Button */}
                  <div className="mb-4 md:mb-6 flex justify-center">
                    <button
                      onClick={openVideoModal}
                      className="group relative bg-gradient-to-r from-[#c42dd7]/20 to-[#1769dc]/20 border border-[#c42dd7]/40 hover:border-[#c42dd7]/70 rounded-lg md:rounded-xl py-2 px-4 md:py-3 md:px-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#c42dd7]/20 inline-flex items-center gap-2 md:gap-3"
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#c42dd7] to-[#1769dc] rounded flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-3 h-3 md:w-4 md:h-4 text-white" fill="white" />
                      </div>
                      <span className="text-white font-semibold text-sm md:text-base">Watch Video Testimonial</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/5 to-[#1769dc]/5 rounded-lg md:rounded-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* Bottom Section */}
                  <div className="pt-4 md:pt-6 border-t border-[#c42dd7]/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        {/* CEO Image */}
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-[#c42dd7]/30">
                          <img
                            src="/LOGOS/SmoothOperationsAiCEO.svg"
                            alt="Jarrett Lau"
                            className="w-full h-full object-cover"
                            loading="lazy"
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

            {/* SECTION 4: Comparison Section */}
            <div className="py-12 md:py-16">
              <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                    <span className="bg-gradient-to-r from-[#c42dd7] via-purple-400 to-[#1769dc] bg-clip-text text-transparent">
                      {sections[3].title}
                    </span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
                    {sections[3].subtitle}
                  </p>
                </div>

                {/* Premium Comparison Table */}
                <div className="relative mb-8 md:mb-12 max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7]/10 via-purple-600/10 to-[#1769dc]/10 rounded-xl md:rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-[#c42dd7]/30 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#c42dd7]/10 to-[#1769dc]/10 border-b border-[#c42dd7]/30">
                            <th className="px-4 py-4 md:px-8 md:py-6 text-left text-sm md:text-base font-bold text-gray-300 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-4 py-4 md:px-8 md:py-6 text-left text-sm md:text-base font-bold text-gray-300 uppercase tracking-wider">
                              Traditional Agencies
                            </th>
                            <th className="px-4 py-4 md:px-8 md:py-6 text-left text-sm md:text-base font-bold bg-gradient-to-r from-[#c42dd7]/20 to-[#1769dc]/20 text-[#c42dd7]">
                              Outreach Crafters
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/30">
                          {sections[3]?.comparison?.map((item, index) => (
                            <tr key={index} className="hover:bg-[#0c102d]/50 transition-all duration-300">
                              <td className="px-4 py-4 md:px-8 md:py-6 text-sm md:text-base font-semibold text-gray-200">
                                {item.category}
                              </td>
                              <td className="px-4 py-4 md:px-8 md:py-6 text-sm md:text-base text-gray-400">
                                <span className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                  {item.traditional}
                                </span>
                              </td>
                              <td className="px-4 py-4 md:px-8 md:py-6 text-sm md:text-base font-semibold text-[#c42dd7]">
                                <span className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                                  {item.outreach}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Ready to Scale */}
        <section id="contact" className={`py-12 md:py-16 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] rounded-xl md:rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#c42dd7]/30">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                    Ready to{' '}
                    <span className="bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                      Scale Your Outreach?
                    </span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                    Join the companies generating consistent, high-quality calls every month with AI-powered outreach
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  <a href="mailto:noman@outreachcrafters.com" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#c42dd7] to-[#1769dc] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#c42dd7]/30 hover:border-[#c42dd7] transition-all duration-300 hover:scale-102">
                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c42dd7] to-[#1769dc] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                            <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-base md:text-lg">Contact us:</div>
                          </div>
                        </div>
                        <div className="text-[#c42dd7] font-medium text-sm md:text-base break-all group-hover:text-[#1769dc] transition-colors">
                          noman@outreachcrafters.com
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="https://calendly.com/outreachcrafters/30min" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
                      <div className="relative bg-[#0c102d]/90 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-[#1769dc]/30 hover:border-[#1769dc] transition-all duration-300 hover:scale-102">
                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1769dc] to-[#c42dd7] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-base md:text-lg">30 min Strategy Call</div>
                          </div>
                        </div>
                        <div className="text-[#1769dc] font-medium text-sm md:text-base group-hover:text-[#c42dd7] transition-colors">
                          Book a free consultation call
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <button
                    onClick={openCalendly}
                    className="group relative bg-gradient-to-r from-[#c42dd7] via-purple-600 to-[#1769dc] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-bold hover:shadow-xl hover:shadow-[#c42dd7]/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                      Schedule a Call
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1769dc] to-[#c42dd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`bg-[#0c102d] border-t border-[#c42dd7]/20 py-6 md:py-8 ${getSectionPadding()}`}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center md:text-left">
                <div className="space-y-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                    Outreach Crafters
                  </span>
                  <p className="text-sm text-gray-400 px-4 md:px-0">
                    Unlocking 3x revenue through AI powered cold Email outreach.
                  </p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-base font-semibold text-gray-300 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#section3" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-sm inline-block">Outreach Crafters Way</a></li>
                  <li><a href="#process" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-sm inline-block">Process</a></li>
                  <li><a href="#testimonials" className="text-gray-400 hover:text-[#1769dc] transition-colors text-sm inline-block">Testimonials</a></li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-base font-semibold text-gray-300 mb-3">Contact Us</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:noman@outreachcrafters.com" className="text-gray-400 hover:text-[#c42dd7] transition-colors text-sm inline-block break-all">
                      noman@outreachcrafters.com
                    </a>
                  </li>
                  <li>
                    <a href="https://calendly.com/outreachcrafters/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1769dc] transition-colors text-sm inline-block">
                      Book a Strategy Call
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-base font-semibold text-gray-300 mb-3">Connect</h3>
                <div className="flex justify-center md:justify-start gap-4">
                  <a href="https://www.linkedin.com/in/nomanishfaq/" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 hover:border-[#1769dc] transition-all duration-300 group-hover:scale-110">
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#1769dc]" />
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 hover:border-[#c42dd7] transition-all duration-300 group-hover:scale-110">
                      <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[#c42dd7]" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Outreach Crafters. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal for Full Testimonial */}
      {isModalOpen && modalTestimonial && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="relative bg-[#0c102d] rounded-xl md:rounded-2xl border border-[#c42dd7]/30 w-full max-w-2xl md:max-w-4xl max-h-[80vh] md:max-h-[90vh] overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0c102d]/80 backdrop-blur-xl border border-[#c42dd7]/30 flex items-center justify-center text-white hover:bg-[#c42dd7] hover:border-[#c42dd7] transition-all duration-300 hover:scale-110 z-10"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div
              ref={modalRef}
              className="h-full overflow-y-auto"
              style={{ maxHeight: 'calc(80vh - 2rem)' }}
            >
              <div className="p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <div className="text-sm md:text-lg text-gray-400 mb-1">{modalTestimonial.company}</div>
                  <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#c42dd7] to-[#1769dc] bg-clip-text text-transparent">
                    {modalTestimonial.highlight}
                  </h3>
                </div>

                <div className="mb-4 md:mb-6">
                  <div className="flex gap-3 md:gap-6">
                    <div
                      className="w-1 md:w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: modalTestimonial.accentColor }}
                    />

                    <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3 md:space-y-4 whitespace-pre-line break-words">
                      {modalTestimonial.fullText}
                    </div>
                  </div>
                </div>

                <div className="pt-4 md:pt-6 border-t border-[#c42dd7]/20">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-[#c42dd7]/30">
                      <img
                        src={modalTestimonial.avatarImg}
                        alt={modalTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base md:text-xl">
                        {modalTestimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm md:text-lg">
                        {modalTestimonial.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div
            ref={videoModalRef}
            className="relative bg-[#0c102d] rounded-xl md:rounded-2xl border border-[#c42dd7]/30 w-full max-w-2xl md:max-w-3xl overflow-hidden"
            style={{
              opacity: 0,
              transform: 'scale(0.95) translateY(20px)',
              transition: 'all 0.3s ease-out'
            }}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 rounded-full bg-[#0c102d]/90 backdrop-blur-xl border border-[#c42dd7]/30 flex items-center justify-center text-white hover:bg-[#c42dd7] hover:border-[#c42dd7] transition-all duration-300 hover:scale-110 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-3 md:p-4">
              <div className="relative rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
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

              <div className="px-1 pb-1 md:px-2 md:pb-2">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  SmoothOperations.ai Testimonial
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-3">
                  Jarrett Lau, Founder & CEO of SmoothOperations.ai, shares his experience working with Outreach Crafters.
                </p>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-[#c42dd7]/30">
                    <img
                      src="/LOGOS/SmoothOperationsAiCEO.svg"
                      alt="Jarrett Lau"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs md:text-sm">Jarrett Lau</div>
                    <div className="text-gray-400 text-xs">Founder & CEO of SmoothOperations.ai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Better logo animation */
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 25s linear infinite !important;
          will-change: transform;
          animation-play-state: running;
        }

        /* Floating Button Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        /* Line clamp utilities */
        .line-clamp-8 {
          display: -webkit-box;
          -webkit-line-clamp: 8;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-10 {
          display: -webkit-box;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Prevent content flash */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Better touch handling */
        @media (hover: none) {
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .group:hover .animate-scroll-smooth {
            animation-play-state: running;
          }
        }

        /* Prevent scroll jank */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Image loading improvements */
        img {
          content-visibility: auto;
          -webkit-user-drag: none;
          user-select: none;
        }

        /* Button tap feedback */
        button, a {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animations */
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }

        /* Reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .animate-scroll-smooth {
            animation: none !important;
          }
          
          html {
            scroll-behavior: auto;
          }
          
          button {
            animation: none !important;
          }
        }

        /* Responsive adjustments for floating button */
        @media (max-width: 768px) {
          .floating-calendly-btn span {
            display: none;
          }
          
          .floating-calendly-btn .btn-icon {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OutreachCraftersWebsite;