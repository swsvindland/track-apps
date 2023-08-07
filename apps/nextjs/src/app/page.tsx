import type { NextPage } from "next";
import { Hero } from "../components/marketing/hero";
import { Features } from "../components/marketing/features";
import { Pricing } from "../components/marketing/pricing";

const Home: NextPage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
};

export default Home;
