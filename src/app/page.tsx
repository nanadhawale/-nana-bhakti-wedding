"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCeremony, setActiveCeremony] = useState<number | null>(null);
  const [hoveredCeremony, setHoveredCeremony] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [curtainRemoved, setCurtainRemoved] = useState(false);

  const handleOpenInvitation = () => {
    setIsCurtainOpen(true);
    
    // Play music seamlessly when opened
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    
    // Grand Celebration Confetti
    setTimeout(() => {
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#800000', '#ffe088', '#ffffff'],
          zIndex: 105
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#800000', '#ffe088', '#ffffff'],
          zIndex: 105
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 800); // 800ms delay perfectly times it with the curtains sliding apart

    // Remove from DOM to prevent interaction blocking
    setTimeout(() => {
      setCurtainRemoved(true);
    }, 3000);
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const slides = [
    "/slides/1.jpg",
    "/slides/2.jpg",
    "/slides/3.jpg",
    "/slides/4.jpg",
    "/slides/5.jpg"
  ];

  const heroSlides = [
    "/hero-background.jpg",
    "/haldi-bg.jpg",
    "/sangeet-bg.jpg"
  ];

  // Hero Slide Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Slide Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ceremonies = [
    {
      title: "Mehandi",
      icon: "spa",
      date: "JUNE 09, 2026",
      time: "05:00 PM",
      desc: "Mehandi brings the color of love; a beautiful beginning to our forever.",
      address: "26, Shantiban harinam Nagar, Above classic hair salon, Beed By Pass, Beside Nandini Hotel, Chhatrapati Sambhajinagar, Maharashtra, 431001",
      link: "https://maps.google.com/?q=V924%2BFM4+Chhatrapati+Sambhajinagar,+Maharashtra"
    },
    {
      title: "Haldi & Sangeet",
      icon: "celebration",
      date: "JULY 10, 2026",
      time: "06:00 PM",
      desc: "Haldi ceremony followed by a vibrant Sangeet starting at 8:00 PM.",
      address: "Surya Lawns, Gut no.103, Beed Bypass Rd, Near Dutta Mandir, Deolai, Chhatrapati Sambhajinagar",
      link: "https://maps.google.com/?q=Surya+Lawns,+Gut+no.103,+Beed+Bypass+Rd,+Deolai,+Chhatrapati+Sambhajinagar"
    },
    {
      title: "Muhurat",
      icon: "flare",
      date: "JULY 11, 2026",
      time: "07:10 PM",
      desc: "The auspicious moment where we exchange our vows and start our new life together.",
      address: "Surya Lawns, Gut no.103, Beed Bypass Rd, Near Dutta Mandir, Deolai, Chhatrapati Sambhajinagar",
      link: "https://maps.google.com/?q=Surya+Lawns,+Gut+no.103,+Beed+Bypass+Rd,+Deolai,+Chhatrapati+Sambhajinagar"
    },
    {
      title: "Dinner",
      icon: "restaurant",
      date: "JULY 11, 2026",
      time: "06:00 PM - 09:00 PM",
      desc: "Join us for a grand wedding feast and making memories under the starlit sky.",
      address: "Surya Lawns, Gut no.103, Beed Bypass Rd, Near Dutta Mandir, Deolai, Chhatrapati Sambhajinagar",
      link: "https://maps.google.com/?q=Surya+Lawns,+Gut+no.103,+Beed+Bypass+Rd,+Deolai,+Chhatrapati+Sambhajinagar"
    }
  ];

  // Countdown Logic
  useEffect(() => {
    const targetDate = new Date('July 11, 2026 12:20:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'));
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  // Music Toggle Logic
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log("Audio playback blocked by browser. User interaction required.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Enhanced Scroll Reveal Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Smooth Scroll with Offset
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Grand Curtain Reveal */}
      {!curtainRemoved && (
        <div className={`fixed inset-0 z-[100] flex transition-opacity duration-[2000ms] ${isCurtainOpen ? 'opacity-0 pointer-events-none delay-[1000ms]' : 'opacity-100'}`}>
          {/* Left Curtain */}
          <div className={`w-1/2 h-full bg-[#570000] border-r-[12px] border-[#d4af37] shadow-[30px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-[2500ms] ease-in-out ${isCurtainOpen ? '-translate-x-full' : 'translate-x-0'} relative overflow-hidden flex justify-end items-center`}>
             <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay pointer-events-none"></div>
             {/* Dynamic Velvet Folds */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.3)_20%,transparent_40%,rgba(0,0,0,0.2)_60%,transparent_80%,rgba(0,0,0,0.4))] w-full h-full"></div>
             <div className="w-4 h-full bg-gradient-to-r from-[#d4af37] to-[#ffe088] absolute right-0 shadow-[0_0_20px_#d4af37]"></div>
          </div>
          
          {/* Right Curtain */}
          <div className={`w-1/2 h-full bg-[#570000] border-l-[12px] border-[#d4af37] shadow-[-30px_0_60px_rgba(0,0,0,0.8)] transition-transform duration-[2500ms] ease-in-out ${isCurtainOpen ? 'translate-x-full' : 'translate-x-0'} relative overflow-hidden flex justify-start items-center`}>
             <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay pointer-events-none"></div>
             {/* Dynamic Velvet Folds */}
             <div className="absolute inset-0 bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.3)_20%,transparent_40%,rgba(0,0,0,0.2)_60%,transparent_80%,rgba(0,0,0,0.4))] w-full h-full"></div>
             <div className="w-4 h-full bg-gradient-to-l from-[#d4af37] to-[#ffe088] absolute left-0 shadow-[0_0_20px_#d4af37]"></div>
          </div>

          {/* Center Button */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[1500ms] ${isCurtainOpen ? 'opacity-0 scale-150 blur-md' : 'opacity-100 scale-100 delay-500'}`}>
            <button 
              onClick={handleOpenInvitation}
              className="bg-gradient-to-r from-[#d4af37] to-[#ffe088] text-[#570000] px-12 py-8 rounded-full font-display-lg text-4xl uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-[1.05] hover:shadow-[0_0_100px_rgba(212,175,55,1)] hover:brightness-110 transition-all flex flex-col items-center group border-4 border-white/20"
            >
              <span className="drop-shadow-sm font-bold">Open Invitation</span>
              <span className="material-symbols-outlined mt-4 text-6xl group-hover:translate-y-2 transition-transform duration-500 drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Optimized Navigation */}
      <header className="sticky top-0 w-full z-50 bg-[#f5ece7] shadow-sm">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 md:py-5">
          <a className="font-display-lg text-xl md:text-2xl text-primary tracking-[0.2em] uppercase" href="#" onClick={(e) => handleScroll(e, '#')}>Bhakti &amp; Nana</a>
          <nav className="flex gap-3 sm:gap-6 md:gap-12 items-center">
            <a className="text-primary font-bold font-label-caps text-[10px] sm:text-xs md:text-sm tracking-widest relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary hidden sm:block" href="#" onClick={(e) => handleScroll(e, '#')}>Home</a>
            <a className="text-on-surface-variant/80 hover:text-primary transition-colors duration-300 font-label-caps text-[10px] sm:text-xs md:text-sm tracking-widest hidden sm:block" href="#about" onClick={(e) => handleScroll(e, '#about')}>Our Story</a>
            <a className="text-on-surface-variant/80 hover:text-primary transition-colors duration-300 font-label-caps text-[10px] sm:text-xs md:text-sm tracking-widest hidden sm:block" href="#schedule" onClick={(e) => handleScroll(e, '#schedule')}>Ceremonies</a>
            <button onClick={toggleMusic} className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/50 text-primary hover:bg-primary-fixed-dim transition-all group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">{isPlaying ? 'music_off' : 'music_note'}</span>
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* High-Impact Hero Section */}
        <section className="min-h-[calc(100vh-90px)] flex flex-col items-center justify-center text-center px-margin-mobile relative overflow-hidden bg-[#570000]">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentHeroSlide === index ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `linear-gradient(rgba(87, 0, 0, 0.4), rgba(87, 0, 0, 0.4)), url('${slide}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/40 pointer-events-none z-[1]"></div>
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-12">
            <div className="scroll-reveal active">
              <span className="font-marathi-body text-2xl text-secondary-fixed tracking-[0.3em] drop-shadow-lg">|| श्री गणेशाय नम: ||</span>
            </div>
            <div className="scroll-reveal active delay-200 flex flex-col items-center">
              <span className="font-label-caps text-sm md:text-base tracking-[0.4em] text-white/90 uppercase drop-shadow-md mb-6">WEDDING INVITATION</span>
              <h1 className="font-display-lg text-6xl sm:text-7xl md:text-[120px] leading-none gold-shimmer tracking-tighter mb-0">
                Bhakti <span className="text-white/80 font-normal serif italic">&amp;</span> Nana
              </h1>
              <div className="h-px w-48 bg-secondary-fixed mx-auto mt-4 mb-2 opacity-60"></div>
            </div>
            <div className="flex items-center gap-6 py-0 scroll-reveal active delay-300">
              <div className="h-px w-16 bg-secondary-fixed/50"></div>
              <span className="font-display-lg font-bold text-3xl md:text-5xl tracking-[0.2em] text-secondary-fixed uppercase animate-pulse drop-shadow-lg">JULY 11, 2026</span>
              <div className="h-px w-16 bg-secondary-fixed/50"></div>
            </div>

            {/* Prominent Countdown Timer */}
            <div className="grid grid-cols-4 gap-3 sm:gap-8 md:gap-16 bg-[#570000]/40 backdrop-blur-md p-4 sm:p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl scroll-reveal active delay-500 mt-2">
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-display-lg text-3xl sm:text-5xl md:text-8xl text-[#ffe088] drop-shadow-md">{days}</span>
                <span className="font-label-caps text-[9px] sm:text-xs md:text-sm tracking-widest text-white/90">DAYS</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-display-lg text-3xl sm:text-5xl md:text-8xl text-[#ffe088] drop-shadow-md">{hours}</span>
                <span className="font-label-caps text-[9px] sm:text-xs md:text-sm tracking-widest text-white/90">HOURS</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-display-lg text-3xl sm:text-5xl md:text-8xl text-[#ffe088] drop-shadow-md">{minutes}</span>
                <span className="font-label-caps text-[9px] sm:text-xs md:text-sm tracking-widest text-white/90">MINUTES</span>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <span className="font-display-lg text-3xl sm:text-5xl md:text-8xl text-[#ffe088] drop-shadow-md">{seconds}</span>
                <span className="font-label-caps text-[9px] sm:text-xs md:text-sm tracking-widest text-white/90">SECONDS</span>
              </div>
            </div>

            <a className="scroll-reveal active delay-700 flex flex-col items-center gap-4 group" href="#about" onClick={(e) => handleScroll(e, '#about')}>
              <span className="font-label-caps text-sm tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">EXPLORE OUR STORY</span>
              <span className="material-symbols-outlined animate-bounce text-secondary-fixed text-4xl">expand_more</span>
            </a>
          </div>
        </section>

        {/* Wide Story Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto scroll-reveal" id="about">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
            <h2 className="font-display-lg text-4xl sm:text-5xl md:text-6xl text-primary mb-6">Us Together</h2>
            <div className="w-32 h-1.5 bg-secondary rounded-full"></div>
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {/* Left: Large Cinematic Image */}
            <div className="col-span-12 lg:col-span-7 relative h-[400px] md:h-[700px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 w-full h-full bg-black">
                <iframe 
                  src="https://drive.google.com/file/d/1mZqAzI5N1NbYIkS3myPHyzbEC570t7vv/preview" 
                  className="w-full h-full border-0"
                  allow="autoplay"
                ></iframe>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-16 pointer-events-none">
                <p className="font-label-caps text-secondary-fixed text-sm md:text-lg mb-2 md:mb-4 tracking-[0.2em] drop-shadow-md">THE FIRST MEETING</p>
                <h3 className="font-display-lg text-3xl md:text-5xl text-white drop-shadow-md">Where our forever began</h3>
              </div>
            </div>
            {/* Right: Grid of Detail & Quote */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-10">
              <div className="relative h-[330px] rounded-3xl overflow-hidden shadow-xl border border-outline-variant group">
                {slides.map((slide, index) => (
                  <img 
                    key={index}
                    alt={`Beautiful Moments ${index + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
                    src={slide}
                  />
                ))}
              </div>
              <div className="flex-grow bg-primary p-8 md:p-12 rounded-2xl md:rounded-3xl text-center flex flex-col justify-center items-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-5 text-white mandala-texture"></div>
                <span className="material-symbols-outlined text-6xl mb-8 text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                <p className="font-display-lg text-3xl md:text-4xl text-secondary-fixed italic leading-relaxed">
                  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Ceremonies Grid */}
        <section className="py-section-gap bg-surface-container relative overflow-hidden" id="schedule">
          <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-24">
              <h2 className="font-display-lg text-5xl md:text-6xl text-primary">The Celebration</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mt-6">Join us as we celebrate our love across three beautiful ceremonies.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ceremonies.map((ceremony, index) => {
                const isActive = activeCeremony === index || hoveredCeremony === index;
                return (
                  <div 
                    key={index} 
                    onClick={() => setActiveCeremony(index)}
                    onMouseEnter={() => setHoveredCeremony(index)}
                    onMouseLeave={() => setHoveredCeremony(null)}
                    className={`cursor-pointer ${isActive ? 'relative group bg-primary text-white p-8 rounded-3xl border-4 border-secondary-fixed text-center flex flex-col items-center gap-4 shadow-[0_30px_60px_rgba(87,0,0,0.3)] transition-all duration-500 z-10 scale-105' : 'group bg-white p-8 rounded-3xl border border-outline-variant/30 text-center flex flex-col items-center gap-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-4'}`}
                  >
                    {isActive && <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${isActive ? 'bg-secondary-fixed' : 'bg-secondary-container'}`}>
                      <span className={`material-symbols-outlined text-3xl ${isActive ? 'text-primary' : 'text-primary'}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{ceremony.icon}</span>
                    </div>
                    <h3 className={`font-display-lg ${isActive ? 'text-3xl text-secondary-fixed' : 'text-2xl text-primary'}`}>{ceremony.title}</h3>
                    <div className={`flex flex-col font-label-caps text-sm tracking-[0.2em] ${isActive ? 'text-secondary-fixed/90' : 'text-primary opacity-70'}`}>
                      <span>{ceremony.date}</span>
                      <span>{ceremony.time}</span>
                    </div>
                    <p className={`font-body-md leading-relaxed ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>{ceremony.desc}</p>
                    <div className="mt-auto pt-4 flex flex-col gap-3 w-full">
                      <p className={`text-xs ${isActive ? 'text-white/70' : 'text-on-surface-variant/80'}`}>{ceremony.address}</p>
                      <a href={ceremony.link} target="_blank" rel="noopener noreferrer" className={`px-6 ${isActive ? 'py-3 bg-secondary-fixed text-primary font-bold shadow-lg hover:bg-white' : 'py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white'} font-label-caps text-xs tracking-widest transition-all rounded-full uppercase`}>Get Directions</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-primary text-secondary-fixed py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none mandala-texture bg-white"></div>
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center gap-12 relative z-10">
          <h2 className="font-display-lg text-6xl text-secondary-fixed tracking-[0.2em]">B &amp; N</h2>
          <div className="flex flex-wrap justify-center gap-16 font-label-caps text-sm tracking-[0.2em]">
            <a className="text-white/60 hover:text-secondary-fixed transition-all uppercase" href="#" onClick={(e) => handleScroll(e, '#')}>Home</a>
            <a className="text-white/60 hover:text-secondary-fixed transition-all uppercase" href="#about" onClick={(e) => handleScroll(e, '#about')}>Our Story</a>
            <a className="text-white/60 hover:text-secondary-fixed transition-all uppercase" href="#schedule" onClick={(e) => handleScroll(e, '#schedule')}>Ceremonies</a>
          </div>
          <div className="w-64 h-px bg-white/20"></div>
          <div className="space-y-4">
            <p className="font-label-caps text-lg tracking-[0.3em] opacity-80 uppercase">With Love, Bhakti &amp; Nana</p>
            <p className="text-xs tracking-widest opacity-40 uppercase">© 2026 Crafted for our most special day</p>
          </div>
        </div>
      </footer>

      {/* Audio Element */}
      <audio ref={audioRef} id="bgMusic" loop>
        <source src="/tu_havishi.webm" type="audio/webm"/>
      </audio>
    </>
  );
}
