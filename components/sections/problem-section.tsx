'use client';

import Card from '../ui/card';

const ProblemSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-10">Prepoznajete li se?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          'Manual processes are slowing down your business and causing errors.',
          'You struggle to leverage data for smarter decisions and automation.',
          'Scaling operations is difficult without modern AI-driven solutions.'
        ].map((text, i) => {
          const { useInView } = require('../ui/use-in-view');
          const [ref, inView] = useInView();
          return (
            <Card
              key={i}
              ref={ref}
              style={{
                opacity: inView ? 1 : 0,
                transform: `translateY(${inView ? 0 : 20}px)`,
                transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)'
              }}
            >
              <p className="font-sans text-main-white/60">{text}</p>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProblemSection; 