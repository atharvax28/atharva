import dynamic from 'next/dynamic';

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TextType from "@/components/TextType";

// Lazy load heavy GSAP sections that appear below the fold
const ManifestoSection = dynamic(() => import('@/components/ManifestoSection'));
const TechStackSection = dynamic(() => import('@/components/TechStackSection'));
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'));
const ConnectSection = dynamic(() => import('@/components/ConnectSection'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main id="home" className="relative left-0 top-0 min-h-screen w-full bg-paper">
      <HeroSection />

      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      
      {/* Heavy sections lazy-loaded */}
      <ManifestoSection />
      <TechStackSection />
      <ExperienceSection />
      <ConnectSection />

      <section className="relative z-10 flex w-full items-center justify-center bg-paper py-16 md:py-24">
        <TextType
          text={["LET'S BUILD SOMETHING", "THAT RUNS ITSELF"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
          deletingSpeed={50}
          cursorBlinkDuration={0.5}
          className="px-4 text-center font-display text-4xl font-semibold uppercase text-zinc-900 md:text-6xl lg:text-8xl"
        />
      </section>

      <Footer />
    </main>
  );
}
