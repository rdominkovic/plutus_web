import Card from '../ui/card';

const ProblemSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-10">Prepoznajete li se?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <p className="font-sans text-main-white/90">Manual processes are slowing down your business and causing errors.</p>
        </Card>
        <Card>
          <p className="font-sans text-main-white/90">You struggle to leverage data for smarter decisions and automation.</p>
        </Card>
        <Card>
          <p className="font-sans text-main-white/90">Scaling operations is difficult without modern AI-driven solutions.</p>
        </Card>
      </div>
    </div>
  </section>
);

export default ProblemSection; 