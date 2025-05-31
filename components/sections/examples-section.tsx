import Card from '../ui/card';

const examples = [
  {
    title: 'Retail AI Automation',
    desc: 'Reduced manual work by 60% for a retail client using custom AI bots.',
    img: 'https://via.placeholder.com/400x200/222244/ffffff?text=Retail+AI',
  },
  {
    title: 'Healthcare Data Insights',
    desc: 'Enabled predictive analytics for patient care improvements.',
    img: 'https://via.placeholder.com/400x200/224422/ffffff?text=Healthcare+AI',
  },
  {
    title: 'Finance Process Optimization',
    desc: 'Streamlined reporting and compliance for a finance company.',
    img: 'https://via.placeholder.com/400x200/442222/ffffff?text=Finance+AI',
  },
];

const ExamplesSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-10">Primjeri primjene AI</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {examples.map((ex) => (
          <Card key={ex.title} gradient className="flex flex-col">
            <img src={ex.img} alt={ex.title} className="rounded-xl mb-4 w-full h-40 object-cover" />
            <h3 className="font-mono text-lg uppercase text-main-white mb-2">{ex.title}</h3>
            <p className="font-sans text-main-white/90">{ex.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ExamplesSection; 