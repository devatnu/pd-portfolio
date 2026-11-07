import { Hero } from "@/components/sections/hero";
import { WhatIDo } from "@/components/sections/what-i-do";
import { SelectedWork } from "@/components/sections/selected-work";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { siteUrl } from "@/config/site";

export const metadata = {
  alternates: { canonical: `${siteUrl}/` },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <SelectedWork />
      <About />
      <Experience />
      <Expertise />
      <Faq />
      <Contact />
    </>
  );
}
