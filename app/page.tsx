import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Works />
      <About />
      <Contact />
    </main>
  );
}
