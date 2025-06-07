const approach = [
  {
    icon: '🤖',
    title: 'Expert AI Team',
    desc: 'Our specialists design solutions tailored to your business.'
  },
  {
    icon: '⚡',
    title: 'Rapid Delivery',
    desc: 'We implement and iterate quickly for fast results.'
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    desc: 'Your data and operations are protected at every step.'
  },
];

const ApproachSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-10">Naš pristup</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {approach.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center p-6">
            <div className="text-4xl mb-4" aria-hidden="true">{item.icon}</div>
            <h3 className="font-mono text-lg uppercase text-main-white mb-2">{item.title}</h3>
            <p className="font-sans text-main-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ApproachSection; 