'use client';

import Card from '../ui/card';

const services = [
  {
    title: 'AI Automation',
    desc: 'Automate repetitive tasks and workflows with custom AI solutions.'
  },
  {
    title: 'Process Optimization',
    desc: 'Streamline your business processes for maximum efficiency.'
  },
  {
    title: 'Data Insights',
    desc: 'Unlock actionable insights from your data using advanced analytics.'
  },
  {
    title: 'Custom Integrations',
    desc: 'Seamlessly connect your tools and platforms for unified operations.'
  },
];

const ServicesSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-10">Naše usluge</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {services.map((service, i) => {
          const { useInView } = require('../ui/use-in-view');
          const [ref, inView] = useInView();
          return (
            <Card
              key={service.title}
              gradient
              ref={ref}
              style={{
                opacity: inView ? 1 : 0,
                transform: `translateY(${inView ? 0 : 20}px)`,
                transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)'
              }}
            >
              <h3 className="font-mono text-lg uppercase text-main-white mb-2">{service.title}</h3>
              <p className="font-sans text-main-white/60">{service.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection; 