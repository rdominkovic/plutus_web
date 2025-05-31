import Button from '../ui/button';

const HeroSection = () => (
  <section className="relative flex min-h-[80vh] flex-col justify-end bg-main-black pb-16 pt-24 md:pt-32">
    <div className="container mx-auto flex flex-col items-start gap-8 px-4 md:px-8">
      <h1 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-tight text-main-white mb-4">
        Plutus: AI Optimization for Modern Business
      </h1>
      <p className="font-sans text-lg md:text-2xl text-main-white/80 max-w-xl mb-8">
        We help you unlock efficiency and growth with cutting-edge AI automation and process optimization.
      </p>
      <Button aria-label="Contact Plutus">Get in touch</Button>
    </div>
    <div className="absolute right-8 bottom-8 w-32 h-32 bg-palatinate-blue/30 rounded-full blur-2xl opacity-60 pointer-events-none" aria-hidden="true" />
  </section>
);

export default HeroSection; 