import Link from "next/link";
import { LineChart, Compass, Lightbulb, TrendingUp } from "lucide-react";

const workItems = [
  { icon: LineChart, title: "Market intelligence", body: "Industry trends, founder narratives, competitor research, customer pain points." },
  { icon: Compass, title: "Positioning", body: "Sharper messaging so companies know what conversations to own." },
  { icon: Lightbulb, title: "Thought leadership", body: "Reports, blogs, founder content, newsletters, AI content systems." },
  { icon: TrendingUp, title: "Business outcomes", body: "Trust before sales conversations, shorter cycles, lasting relationships." },
];

const services = ["Market & Founder Intelligence", "Positioning & Brand Messaging", "Thought Leadership Strategy", "AI Content Operations", "Strategic Content Consulting"];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.7A1.7 1.7 0 118.2 7a1.7 1.7 0 01-1.7 1.7zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.3h.04c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.7z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-[#111111]">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-6">
        <span className="font-bold text-sm tracking-wide">STACK NARRATIVE</span>
        <div className="flex gap-6 text-sm text-[#6B7280]">
          <a href="#how-we-work">How we work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug">Helping Hospitality Technology companies build industry authority</h1>
        <p className="mt-4 text-sm font-bold tracking-wide text-[#93C572]">MARKET INTELLIGENCE &rarr; POSITIONING &rarr; THOUGHT LEADERSHIP &rarr; BUSINESS OUTCOMES</p>
        <p className="mt-4 text-[#6B7280] max-w-xl mx-auto leading-relaxed">By combining founder intelligence, industry research, and AI-powered content operations, we help hospitality technology brands become trusted voices in their markets, build long-term credibility, and create stronger business outcomes.</p>
        <div className="mt-7 flex gap-3 justify-center">
          <a href="mailto:nutan@stacknarrative.com" className="bg-[#93C572] text-[#111111] font-bold text-sm px-5 h-10 rounded-md flex items-center">Book a discovery call</a>
          <Link href="/blog" className="border border-[#D1D1CB] text-[#111111] font-medium text-sm px-5 h-10 rounded-md flex items-center">Explore insights</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="bg-[#F5F5F3] rounded-xl px-6 py-5">
          <p className="text-[11px] tracking-widest text-[#6B7280] text-center mb-3">TRUSTED BY</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-bold text-[#2B2B2B]">
            <span>HBX Group</span>
            <span>Dharma Hospitality Solutions</span>
            <span>Welcome Pickups</span>
            <span>Technogym</span>
            <span>Redbull</span>
          </div>
        </div>
      </section>

      <section id="how-we-work" className="max-w-5xl mx-auto px-6 mb-16 scroll-mt-24">
        <p className="text-[11px] tracking-widest text-[#6B7280] text-center mb-6">HOW WE WORK</p>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {workItems.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="w-10 h-10 rounded-full bg-[#EAF3E0] mx-auto mb-3 flex items-center justify-center"><Icon size={18} color="#5B8F3C" /></div>
              <p className="font-bold text-sm mb-1">{title}</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="max-w-5xl mx-auto px-6 mb-16 scroll-mt-24">
        <p className="text-[11px] tracking-widest text-[#6B7280] text-center mb-6">SERVICES</p>
        <div className="grid md:grid-cols-3 gap-3">
          {services.map((s) => (<div key={s} className="bg-[#F5F5F3] rounded-lg p-4 text-sm font-medium">{s}</div>))}
        </div>
      </section>

      <section id="about" className="max-w-2xl mx-auto px-6 mb-16 text-center scroll-mt-24">
        <p className="text-[11px] tracking-widest text-[#6B7280] mb-4">ABOUT</p>
        <p className="text-[#2B2B2B] leading-relaxed">Stack Narrative is born from a simple purpose: helping others, helping businesses grow. We work with hospitality and B2B technology companies looking for long-term strategic growth and seeking a strategic thinking partner rather than another execution resource.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-14">
        <div className="bg-[#111111] rounded-2xl px-8 py-10 text-center">
          <p className="text-white text-xl font-bold mb-3">Looking to build long-term industry authority?</p>
          <p className="text-[#A8A8A3] text-sm max-w-md mx-auto mb-6 leading-relaxed">Let us explore how market intelligence, positioning, and thought leadership can help your company become a trusted voice in hospitality technology.</p>
          <a href="mailto:nutan@stacknarrative.com" className="inline-flex items-center bg-[#93C572] text-[#111111] font-bold text-sm px-6 h-10 rounded-md">Book a discovery call</a>
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between border-t border-[#E5E5E1]">
        <a href="https://www.linkedin.com/in/nutanstrategist/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#D1D1CB] flex items-center justify-center hover:border-[#93C572]"><LinkedInIcon /></a>
        <p className="text-xs text-[#6B7280]">&copy; 2026 StackNarrative</p>
      </footer>
    </main>
  );
}