import { motion } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Testomonials from "./Testomonials";
import CTA from "./CTA";

function F_Home() {
  return (
    <motion.div
      className="bg-[#0a0a0a] text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Hero />
      <About />
      <Features />
      <Testomonials />
      <CTA />
    </motion.div>
  );
}

export default F_Home;