"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, Scale, ShieldAlert, FileCheck, Landmark, Gavel, 
  MenuSquare, Star, Quote, Clock, MessageSquare, ExternalLink
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface LawFirmTemplateProps {
  data?: {
    basicInfo?: { name?: string; tagline?: string; email?: string; hotline?: string; address?: string; };
    heroSection?: { badge?: string; headingBold?: string; headingGold?: string; description?: string; bgImage?: string; };
    services?: { departmentDataString?: string; };
    counsel?: { attorneyDataString?: string; };
    testimonials?: { testimonialDataString?: string; };
    timings?: { monFri?: string; saturday?: string; sunday?: string; };
    socials?: { facebook?: string; instagram?: string; twitter?: string; linkedin?: string; whatsappNumber?: string; };
  };
}

export default function LawFirmTemplate({ data }: LawFirmTemplateProps) {
  const basic = data?.basicInfo || {};
  const hero = data?.heroSection || {};
  const timings = data?.timings || {};
  const social = data?.socials || {};

  const firmName = basic.name || "Aurelia Law";
  const firmEmail = basic.email || "intake@aurelialaw.com";
  const firmTagline = basic.tagline || "Elite corporate litigation and legal advisory services powered by courtroom success.";
  const firmHotline = basic.hotline || "+91 00000 00000";
  const firmAddress = basic.address || "Suite 4800, Legal District Tower, Financial Avenue.";
  const monFriTime = timings.monFri || "Mon - Sat: 9:00 AM - 6:00 PM";
  const satTime = timings.saturday || "";
  const sunTime = timings.sunday || "";
  
  const whatsappIntakeNumber = social.whatsappNumber || "8237024546";

  const fbLink = social.facebook || "https://facebook.com";
  const igLink = social.instagram || "https://instagram.com";
  const twLink = social.twitter || "https://twitter.com";
  const liLink = social.linkedin || "https://linkedin.com";

  // Safe robust extraction scans looking for data directly inside object scopes or properties
  const rawServices = data?.services?.departmentDataString || (data?.services as any) || "";
  const rawCounsel = data?.counsel?.attorneyDataString || (data?.counsel as any) || "";
  const rawTestimonials = data?.testimonials?.testimonialDataString || (data?.testimonials as any) || "";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-amber-500 selection:text-neutral-950 font-serif leading-relaxed">
      
      <NavbarComponent firmName={firmName} firmHotline={firmHotline} monFriTime={monFriTime} satTime={satTime} sunTime={sunTime} />
      
      <div className="pt-24 md:pt-40">
        
        {/* HERO HEADER */}
        <HeroComponent hero={hero} />

        {/* PRACTICE AREAS DYNAMIC MATRIX */}
        <AsymmetricPracticeAreas practiceAreas={rawServices} />

        {/* PARTNERS SHOWCASE HUB */}
        <CounselShowcase counselData={rawCounsel} />

        {/* SECURE INTAKE GATEWAY */}
        <SecureIntakeHub 
          whatsappIntakeNumber={whatsappIntakeNumber} 
          firmEmail={firmEmail} 
          firmHotline={firmHotline}
          fbLink={fbLink}
          igLink={igLink}
          twLink={twLink}
          liLink={liLink}
        />

        {/* SUCCESS LOG PROFILES */}
        <CaseReviewsComponent logs={rawTestimonials} />

        {/* INSTITUTIONAL FOOTER */}
        <FooterComponent firmName={firmName} firmTagline={firmTagline} firmHotline={firmHotline} firmEmail={firmEmail} firmAddress={firmAddress} timings={timings} />
      </div>

      <WhatsAppStickyComponent whatsappIntakeNumber={whatsappIntakeNumber} />
    </div>
  );
}

// ==========================================
// 1. NAVBAR SUB-COMPONENT
// ==========================================
function NavbarComponent({ firmName, firmHotline, monFriTime, satTime , sunTime }: { firmName: string; firmHotline: string; monFriTime: string; satTime: string; sunTime: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="hidden md:flex w-full bg-neutral-950 text-neutral-400 text-base font-sans uppercase tracking-widest py-4 px-8 lg:px-16 justify-between items-center border-b border-neutral-900 font-bold">
        <div className="flex items-center gap-10">
          <span className="flex items-center gap-3"><Clock size={18} className="text-amber-500" /> Chambers: {monFriTime}</span>
          <span className="flex items-center gap-3">{satTime}</span>
          <span className="flex items-center gap-3">{sunTime}</span>
          <span className="flex items-center gap-3"><Scale size={18} className="text-amber-500" /> Executive Intake Grid</span>
        </div>
        <div className="tracking-widest text-base">Urgent Advisory: <span className="text-amber-500 font-bold text-lg whitespace-nowrap">{firmHotline}</span></div>
      </div>

      <nav className={`w-full transition-all duration-300 border-b ${isScrolled ? 'bg-neutral-950/95 backdrop-blur-md shadow-lg border-neutral-900 py-6' : 'bg-neutral-950/20 py-9 border-neutral-900/40'} px-8 lg:px-16 flex justify-between items-center`}>
        <Link href="#" className="flex items-center gap-3 text-white font-bold text-2xl lg:text-3xl tracking-wider uppercase font-sans">
          <Landmark size={28} className="text-amber-500" />
          <span>{firmName}<span className="text-amber-500">.</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-12 text-base font-sans uppercase tracking-widest font-bold text-neutral-400">
          <a href="#" className="hover:text-amber-500 transition-colors">Overview</a>
          <a href="#practices" className="hover:text-amber-500 transition-colors">Practice Fields</a>
          <a href="#counsel" className="hover:text-amber-500 transition-colors">Our Counsel</a>
          <a href="#connect" className="hover:text-amber-500 transition-colors">Connect Desk</a>
          <a href="#records" className="hover:text-amber-500 transition-colors">Success Logs</a>
        </div>

        <div className="hidden md:block">
          <a href="#connect" className="border-b-2 border-amber-500 text-amber-500 hover:text-white font-sans uppercase tracking-widest text-base font-bold py-2 transition-all duration-300">
            Secure Intake Channels →
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neutral-400 hover:text-amber-500 p-2">
          {isOpen ? <X size={32} /> : <MenuSquare size={32} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden w-full bg-neutral-950 border-b border-neutral-900 px-8 py-8 flex flex-col space-y-6 font-sans uppercase tracking-widest text-lg font-bold">
          <a href="#" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500 py-1">Overview</a>
          <a href="#practices" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500 py-1">Practice Fields</a>
          <a href="#counsel" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500 py-1">Our Counsel</a>
          <a href="#connect" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500 py-1">Connect Desk</a>
          <a href="#records" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-amber-500 py-1">Success Logs</a>
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. HERO SUB-COMPONENT
// ==========================================
function HeroComponent({ hero }: { hero: any }) {
  const badgeText = hero?.badge || "Trusted Corporate Counsel // Est. 1998";
  const headingBold = hero?.headingBold || "Defending Your Rights,";
  const headingGold = hero?.headingGold || "Securing Your Legacy.";
  const description = hero?.description || "We provide uncompromising legal defense, high-stakes commercial representation, and meticulous multi-jurisdictional advisory for corporate entities and private estates.";
  
  const bgImg = typeof hero === 'string' 
    ? hero 
    : hero?.bgImage || hero?.backgroundImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center px-8 lg:px-16 overflow-hidden bg-neutral-950 py-24">
      <div className="absolute inset-0 w-full h-full">
        <img src={bgImg} alt="Chambers Office Grid" className="w-full h-full object-cover opacity-50 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 relative py-16">
        <div className="lg:col-span-8 space-y-10">
          <span className="text-sm font-sans uppercase tracking-widest text-amber-500 font-extrabold border-l-2 border-amber-500 pl-4">{badgeText}</span>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-tight">
            {headingBold} 
            <span className="block text-amber-500 italic font-normal pt-2">{headingGold}</span>
          </h1>
          
          <p className="text-neutral-200 font-sans text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-normal">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-10 pt-4 font-sans text-sm lg:text-base tracking-widest uppercase text-neutral-300 font-bold">
            <span className="flex items-center gap-3.5"><Gavel size={22} className="text-amber-500" /> Appellate Advocacy</span>
            <span className="flex items-center gap-3.5"><ShieldAlert size={22} className="text-amber-500" /> Asset Shell Protection</span>
            <span className="flex items-center gap-3.5"><FileCheck size={22} className="text-amber-500" /> Regulatory Alignment</span>
          </div>
        </div>
        
        <div className="hidden lg:block lg:col-span-4 border-2 border-neutral-900 p-10 bg-neutral-900/10 backdrop-blur-sm space-y-8 py-12">
          <h3 className="text-lg font-sans uppercase tracking-widest text-white border-b-2 border-neutral-800 pb-4 font-extrabold">Chambers Entry</h3>
          <p className="text-base text-neutral-300 font-sans leading-relaxed font-normal">Counsel consultation gates are accessible via automated deep link frameworks routing instantly into counsel platforms.</p>
          <a href="#connect" className="block text-center bg-amber-500 hover:bg-amber-600 text-neutral-950 text-sm font-sans font-black uppercase tracking-widest py-5 transition-colors shadow-2xl">Access Connect Desk</a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. PRACTICE AREAS DYNAMIC MATRIX
// ==========================================
function AsymmetricPracticeAreas({ practiceAreas }: { practiceAreas: string }) {
  const rawString = typeof practiceAreas === 'string' ? practiceAreas : "";

  let processedList = rawString.split(',').map((block: string) => {
    const tokens = block.split('|');
    const title = tokens[0]?.trim() || "";
    const image = tokens[1]?.trim() || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200";
    const subListRaw = tokens[2]?.trim() || "Advocacy Matrix; Litigation Shield";
    
    const pointsArray = subListRaw.split(';').map((p: string) => ({ point: p.trim() })).filter(p => p.point !== "");
    return { title, image, points: pointsArray, description: "High-stakes elite commercial representation, asset recovery blueprints, and rigorous multi-jurisdictional defense operations." };
  }).filter(item => item.title !== "");

  if (processedList.length === 0) {
    processedList = [
      { title: "Corporate Litigation", description: "High-stakes commercial representation, asset recovery operations, breach of contract management, and rigorous corporate defense parameters.", points: [{ point: "M&A Dispute Advocacy" }, { point: "Antitrust & Competition Defense" }], image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop" },
      { title: "Financial & Banking Law", description: "Strategic counsel navigating multi-jurisdictional regulatory systems, complex corporate restructuring workflows, and institutional transaction audits.", points: [{ point: "Regulatory Compliance Checks" }, { point: "Cross-Border Securities Tracking" }], image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop" }
    ];
  }

  return (
    <section id="practices" className="w-full py-28 md:py-40 px-8 lg:px-16 bg-neutral-950 border-t-2 border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight">Our Framework Matrix</h2>
          </div>
          <p className="text-neutral-400 font-sans text-base md:text-lg lg:text-xl max-w-xl leading-relaxed font-normal">Rigorous advocacy protocols engineered to manage high-stakes disputes and cross-border commercial litigation channels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {processedList.map((item, idx) => (
            <div key={idx} className="border-2 border-neutral-900 bg-neutral-900/10 hover:bg-neutral-900/30 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-300 overflow-hidden min-h-[580px]">
              
              <div className="w-full h-64 border-b-2 border-neutral-900 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60" />
              </div>

              <div className="p-10 lg:p-12 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b-2 border-neutral-900/60 pb-5">
                    <h3 className="text-3xl lg:text-4xl text-white font-normal group-hover:text-amber-500 transition-colors">{item.title}</h3>
                    <span className="text-base font-black text-neutral-600 font-sans">0{idx + 1}</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-base lg:text-lg leading-relaxed font-normal">{item.description}</p>
                </div>
                
                <div className="pt-8 border-t border-neutral-900/40 mt-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm lg:text-base text-neutral-200 font-bold">
                    {item.points?.map((p: any, i: number) => (
                      <li key={i} className="flex items-center gap-3 opacity-95">
                        <span className="w-2 h-2 bg-amber-500 rounded-none shrink-0" />
                        <span>{p.point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. COUNSEL SHOWCASE HUB
// ==========================================
function CounselShowcase({ counselData }: { counselData: string }) {
  const rawString = typeof counselData === 'string' ? counselData : "";

  let parsedAttorneys = rawString.split(',').map((block: string) => {
    const tokens = block.split('|');
    const fullName = tokens[0]?.trim() || "";
    const specialty = tokens[1]?.trim() || "Associate Counsel";
    return { fullName, specialty };
  }).filter(item => item.fullName !== "");

  if (parsedAttorneys.length === 0) {
    parsedAttorneys = [
      { fullName: "Charles W. Attorna, Esq.", specialty: "Senior Managing Partner" },
      { fullName: "Hon. Victoria Vance", specialty: "Senior Counsel, Appellate Chair" }
    ];
  }

  return (
    <section id="counsel" className="w-full py-28 md:py-40 px-8 lg:px-16 bg-neutral-950 border-t-2 border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">Legal Minds & Master Strategists</h2>
          <p className="text-neutral-400 font-sans text-base md:text-lg max-w-xl mx-auto">Elite trial veterans and regulatory experts steering sophisticated corporate defense actions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {parsedAttorneys.map((lawyer, index) => (
            <div key={index} className="border-2 border-neutral-900 bg-neutral-900/40 p-10 flex flex-col justify-between min-h-[220px] hover:border-amber-500/40 transition-all duration-300">
              <div className="space-y-4">
                <div className="w-10 h-1 border-t-2 border-amber-500" />
                <h3 className="text-2xl lg:text-3xl text-white font-normal tracking-wide">{lawyer.fullName}</h3>
              </div>
              <p className="text-neutral-400 font-sans text-sm lg:text-base font-bold uppercase tracking-widest pt-6 border-t border-neutral-900 mt-6">
                {lawyer.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. SECURE INTAKE HUB
// ==========================================
function SecureIntakeHub({ whatsappIntakeNumber, firmEmail, firmHotline, fbLink, igLink, twLink, liLink }: any) {
  const whatsappUrl = `https://wa.me/${whatsappIntakeNumber}?text=${encodeURIComponent("Aurelia Law Advisory Request // Initial conflict clearance inquiry.")}`;

  return (
    <section id="connect" className="w-full py-28 md:py-40 px-8 lg:px-16 bg-neutral-900/20 border-t-2 border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">Connect with Us On Social Platforms & WhatsApp</h2>
            <p className="text-neutral-300 font-sans text-lg lg:text-xl leading-relaxed font-normal">
              Chambers are optimized for instant legal data routing. To maintain elite confidentiality and prioritize immediate intake verification metrics, we have removed traditional static tracking forms. 
            </p>
            <p className="text-neutral-400 font-sans text-base lg:text-lg leading-relaxed italic font-normal">
              Please initialize conflict clear evaluation cycles instantly by connecting through our official verified communication channels.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 font-sans">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-neutral-900/60 border-2 border-neutral-800 p-10 lg:p-12 hover:border-[#128C7E] transition-all duration-300 flex flex-col justify-between min-h-[300px] shadow-2xl">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-[#128C7E]/10 text-[#25D366] flex items-center justify-center border-2 border-[#128C7E]/20">
                  <FaWhatsapp size={28} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-wider text-white">WhatsApp Intake Desk</h4>
                <p className="text-neutral-300 text-base normal-case tracking-normal leading-relaxed font-normal">Instant file encryption routing. Launch legal brief statements directly to counsel handlers.</p>
              </div>
              <span className="text-amber-500 text-sm lg:text-base uppercase tracking-widest font-black inline-flex items-center gap-2.5 pt-8 border-t border-neutral-900">Initialize Chat <ExternalLink size={16} /></span>
            </a>

            <div className="bg-neutral-900/60 border-2 border-neutral-800 p-10 lg:p-12 flex flex-col justify-between min-h-[300px] shadow-2xl">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-500 flex items-center justify-center border-2 border-amber-500/20">
                  <MessageSquare size={26} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-wider text-white">Corporate Networks</h4>
                <p className="text-neutral-300 text-base normal-case tracking-normal leading-relaxed font-normal">Contact us on social media platforms for institutional updates, event dockets, and corporate mail tracking logs.</p>
              </div>
              
              <div className="flex items-center gap-5 pt-8 border-t border-neutral-900">
                <a href={fbLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors text-neutral-300" title="Facebook"><FaFacebookF size={18} /></a>
                <a href={igLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors text-neutral-300" title="Instagram"><FaInstagram size={18} /></a>
                <a href={twLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors text-neutral-300" title="Twitter"><FaTwitter size={18} /></a>
                <a href={liLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center hover:border-amber-500 hover:text-white transition-colors text-neutral-300" title="LinkedIn"><FaLinkedinIn size={18} /></a>
              </div>
            </div>

            <div className="sm:col-span-2 border-t-2 border-neutral-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-8 text-base text-neutral-400 uppercase tracking-widest font-bold">
              <div>Desk Phone: <span className="text-white font-black text-lg lg:text-xl ml-2 whitespace-nowrap">{firmHotline}</span></div>
              <div>Secure Mail: <span className="text-white font-black text-lg lg:text-xl ml-2 lowercase whitespace-nowrap">{firmEmail}</span></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. CASE SUCCESS LOG PROFILES
// ==========================================
function CaseReviewsComponent({ logs }: { logs: string }) {
  const rawString = typeof logs === 'string' ? logs : "";

  let processedReviews = rawString.split(',').map((block: string) => {
    const tokens = block.split('|');
    const name = tokens[0]?.trim() || "";
    const role = tokens[1]?.trim() || "Corporate Entity";
    const text = tokens[2]?.trim() || "Uncompromising legal strategic advice and elite commercial counsel parameters.";
    const rawRating = parseInt(tokens[3]?.trim() || "5", 10);
    const rating = isNaN(rawRating) ? 5 : rawRating;
    const image = tokens[4]?.trim() || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150";

    return { name, role, text, rating, image };
  }).filter(item => item.name !== "");

  if (processedReviews.length === 0) {
    processedReviews = [
      { name: "Marcus Vance", role: "CEO, Vanguard Logistics", text: "Their aggressive courtroom litigation defense parameters secured a complete dismissal of our international patent dispute.", rating: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop" },
      { name: "Helena Rostova", role: "General Counsel, Orbit Tech", text: "Attorna provides exceptional cross-border advisory. Their multi-jurisdictional framework is second to none.", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" }
    ];
  }

  return (
    <section id="records" className="w-full py-28 md:py-40 px-8 lg:px-16 bg-neutral-950 border-t-2 border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <p className="text-4xl md:text-6xl font-light text-white tracking-tight">Institutional Trust Profiles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {processedReviews.map((item, index) => (
            <div key={index} className="bg-neutral-900/20 border-2 border-neutral-900 p-10 lg:p-12 flex flex-col justify-between relative hover:border-neutral-800 transition-all rounded-none shadow-2xl">
              <Quote className="absolute top-10 right-10 text-neutral-900 h-16 w-20 pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-neutral-200 text-base lg:text-xl leading-relaxed italic font-light">"{item.text}"</p>
              </div>
              <div className="flex items-center gap-5 pt-8 mt-10 border-t-2 border-neutral-900 font-sans relative z-10">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border-2 border-neutral-800 grayscale rounded-none" />
                <div>
                  <h4 className="text-base font-black text-white tracking-wide uppercase">{item.name}</h4>
                  <p className="text-xs lg:text-sm text-neutral-500 uppercase tracking-wider font-bold pt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. FOOTER SUB-COMPONENT (QUICK LINKS FIX)
// ==========================================
function FooterComponent({ firmName, firmTagline, firmHotline, firmEmail, firmAddress, timings }: any) {
  const monFriTime = timings.monFri || "Mon - Fri: 9:00 AM - 6:00 PM";
  const satTime = timings.saturday || "Saturday: By Consultation Only";
  const sunTime = timings.sunday || "Sunday: 24/7 Litigation Emergency Line";

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 pt-28 pb-16 px-8 lg:px-16 border-t-2 border-neutral-900 font-sans text-base lg:text-lg font-medium leading-relaxed">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b-2 border-neutral-900">
          
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center gap-3 text-white font-bold text-2xl lg:text-3xl tracking-wider uppercase">
              <Landmark size={26} className="text-amber-500" />
              <span>{firmName}<span className="text-amber-500">.</span></span>
            </div>
            <p className="leading-relaxed text-neutral-500 text-base font-normal">{firmTagline}</p>
          </div>

          {/* Quick links fully comprehensive matrix directory mapping all sections */}
          <div className="md:col-span-3 space-y-6 uppercase tracking-widest text-xs lg:text-sm">
            <h4 className="font-extrabold text-white tracking-widest border-b-2 border-neutral-900 pb-3 text-sm lg:text-base">Quick Links</h4>
            <ul className="space-y-4 text-neutral-500 font-semibold lowercase tracking-normal first-letter:uppercase text-base">
              <li><a href="#" className="hover:text-amber-500 transition-colors block py-0.5">Overview / Top</a></li>
              <li><a href="#practices" className="hover:text-amber-500 transition-colors block py-0.5">Practice Matrix</a></li>
              <li><a href="#counsel" className="hover:text-amber-500 transition-colors block py-0.5">Advisory Counsel</a></li>
              <li><a href="#connect" className="hover:text-amber-500 transition-colors block py-0.5">Connect Intake Desk</a></li>
              <li><a href="#records" className="hover:text-amber-500 transition-colors block py-0.5">Success Records</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-6 uppercase tracking-widest text-xs lg:text-sm">
            <h4 className="font-extrabold text-white tracking-widest border-b-2 border-neutral-900 pb-3 text-sm lg:text-base">Chambers Timeline</h4>
            <ul className="space-y-4 text-neutral-500 normal-case tracking-normal font-medium text-base">
              <li className="flex flex-col gap-1.5"><span className="text-neutral-400 uppercase text-xs tracking-wider font-extrabold">Business Standard</span> {monFriTime}</li>
              <li className="flex flex-col gap-1.5"><span className="text-neutral-400 uppercase text-xs tracking-wider font-extrabold">Weekend Deck</span> {satTime}</li>
              <li className="flex flex-col gap-1.5"><span className="text-amber-500/90 uppercase text-xs tracking-wider font-extrabold font-bold">Emergency Docket</span> <span className="text-neutral-300 font-semibold">{sunTime}</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-6 uppercase tracking-widest text-xs lg:text-sm">
            <h4 className="font-extrabold text-white tracking-widest border-b-2 border-neutral-900 pb-3 text-sm lg:text-base">Primary Registry</h4>
            <div className="space-y-2 normal-case tracking-normal">
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-extrabold">Direct Desk Hotline</p>
              <p className="text-xl lg:text-2xl font-black text-amber-500 tracking-tight whitespace-nowrap">{firmHotline}</p>
            </div>
            <div className="space-y-2 normal-case tracking-normal text-base font-semibold">
              <p className="leading-snug text-neutral-300 font-bold">{firmEmail}</p>
              <p className="leading-relaxed text-neutral-500 text-sm font-sans font-medium">{firmAddress}</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 7. GLOBAL WHATSAPP FLOATING INTAKE GATEWAY
// ==========================================
function WhatsAppStickyComponent({ whatsappIntakeNumber }: { whatsappIntakeNumber: string }) {
  const secureUrl = `https://wa.me/${whatsappIntakeNumber}?text=${encodeURIComponent("Aurelia Law Registry Desk // Requesting conflict-check evaluation forms.")}`;

  return (
    <a href={secureUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 bg-[#128C7E] hover:bg-[#075E54] border border-emerald-600/20 text-white p-5 rounded-none shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center font-sans uppercase tracking-widest text-sm font-black" aria-label="Secure Intake Gateway">
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:pr-5 ease-in-out">Secure Intake Desk</span>
      <FaWhatsapp size={24} className="drop-shadow-md" />
    </a>
  );
}