import Hero from "@/components/home/hero";
import Problems from "@/components/home/problems";
import Process from "@/components/home/process";
import Services from "@/components/home/services";
import Why from "@/components/home/why";
import Work from "@/components/home/work";
import Results from "@/components/home/results";
import Founder from "@/components/home/founder";
import Resources from "@/components/home/resources";
import ContactBand from "@/components/layout/contact-band";
import { getAgents, getCases, getPosts } from "@/lib/content";

// Homepage: 10 sections. "The real problem" sits inside Problems, client reviews inside Work,
// the fit checklist inside the contact band; Toolbook, Clarity Score, Blog and Agents share one Resources row.
export default async function Home() {
  const [cases, posts, agents] = await Promise.all([getCases(), getPosts(), getAgents()]);
  return (
    <>
      <Hero />
      <Results />
      <Problems />
      <Process />
      <Services />
      <Why />
      <Work cases={cases} />
      <Founder />
      <Resources latest={posts[0]} agents={agents} />
      <ContactBand fit />
    </>
  );
}
