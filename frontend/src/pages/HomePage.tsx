import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { SocialSection } from '../sections/SocialSection';
import { ContactSection } from '../sections/ContactSection';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onAdminClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAdminClick }) => {
  return (
    <div className="relative bg-gray-950 text-white min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <SocialSection />
      <ContactSection />
      <Footer onAdminClick={onAdminClick} />
    </div>
  );
};
