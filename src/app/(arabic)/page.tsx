import { Academies } from "@/components/sections/Academies";
import { Clients } from "@/components/sections/Clients";
import { CtaChallenge } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/sections/Navbar";
import { Partners } from "@/components/sections/Partners";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Works } from "@/components/sections/Works";
import { HomeOpening } from "@/components/ui/HomeOpening";
import { HomeSection, HomeTransitions } from "@/components/ui/HomeTransitions";
import styles from "./page.module.css";

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
