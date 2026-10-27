import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import TechStack from "@/components/sections/TechStack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SelectedWork />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
