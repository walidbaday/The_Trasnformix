import { Academies } from "@/english/components/sections/Academies";
import { Clients } from "@/english/components/sections/Clients";
import { CtaChallenge } from "@/english/components/sections/CtaBanner";
import { Faq } from "@/english/components/sections/Faq";
import { Footer } from "@/english/components/sections/Footer";
import { Hero } from "@/english/components/sections/Hero";
import { Intro } from "@/english/components/sections/Intro";
import { Navbar } from "@/english/components/sections/Navbar";
import { Partners } from "@/english/components/sections/Partners";
import { Process } from "@/english/components/sections/Process";
import { Products } from "@/english/components/sections/Products";
import { ServicesGrid } from "@/english/components/sections/ServicesGrid";
import { Testimonials } from "@/english/components/sections/Testimonials";
import { Works } from "@/english/components/sections/Works";
import { HomeOpening } from "@/english/components/ui/HomeOpening";
import { HomeSection, HomeTransitions } from "@/english/components/ui/HomeTransitions";
import styles from "@/app/(english)/en/page.module.css";

export default function Home() {
  return (
    <HomeOpening version="v1">
      <Navbar />
      <HomeTransitions className={styles.home}>
        <HomeSection effect="scene">
          <Hero />
          <Clients />
        </HomeSection>
        <HomeSection>
          <Intro />
        </HomeSection>
        <HomeSection>
          <ServicesGrid />
        </HomeSection>
        <HomeSection tone="ice">
          <Products />
        </HomeSection>
        <HomeSection>
          <Process />
        </HomeSection>
        <HomeSection tone="ice">
          <Academies />
        </HomeSection>
        <HomeSection>
          <Works />
          <Partners />
        </HomeSection>
        <HomeSection>
          <CtaChallenge />
          <Faq />
          <Testimonials />
        </HomeSection>
      </HomeTransitions>
      <Footer />
    </HomeOpening>
  );
}
