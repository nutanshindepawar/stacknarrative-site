import Hero from "@/components/home/hero";
import Problems from "@/components/home/problems";
import Gap from "@/components/home/gap";
import Outcomes from "@/components/home/outcomes";
import Process from "@/components/home/process";
import Services from "@/components/home/services";
import Why from "@/components/home/why";
import Work from "@/components/home/work";
import ToolbookBand from "@/components/home/toolbook-band";
import Fit from "@/components/home/fit";
import Teasers from "@/components/home/teasers";
import ContactBand from "@/components/layout/contact-band";
import { getAgents, getCases, getLatestToolbook, getPhases, getPosts } from "@/lib/content";

export default async function Home() {
  const [cases, phases, entries, posts, agents] = await Promise.all([getCases(), getPhases(), getLatestToolbook(4), getPosts(), getAgents()]);
  return (
    <>
      <Hero />
      <Problems />
      <Gap />
      <Outcomes />
      <Process />
      <Services />
      <Why />
      <Work cases={cases} />
      <ToolbookBand phases={phases} entries={entries} />
      <Fit />
      <Teasers latest={posts[0]} agents={agents} />
      <ContactBand />
    </>
  );
}
