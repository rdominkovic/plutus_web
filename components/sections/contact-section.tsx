import Button from '../ui/button';

const ContactSection = () => (
  <section className="py-20 bg-main-black">
    <div className="container mx-auto px-4 md:px-8 max-w-xl">
      <h2 className="font-mono text-2xl md:text-3xl uppercase text-main-white mb-8">Kontaktirajte nas</h2>
      <form className="flex flex-col gap-6" aria-label="Contact form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="rounded-pill bg-main-white/10 border border-main-white/20 px-5 py-3 text-main-white placeholder:text-main-white/50 focus:outline-none focus:ring-2 focus:ring-palatinate-blue"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="rounded-pill bg-main-white/10 border border-main-white/20 px-5 py-3 text-main-white placeholder:text-main-white/50 focus:outline-none focus:ring-2 focus:ring-palatinate-blue"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          className="rounded-2xl bg-main-white/10 border border-main-white/20 px-5 py-3 text-main-white placeholder:text-main-white/50 focus:outline-none focus:ring-2 focus:ring-palatinate-blue resize-none"
          required
        />
        <Button type="submit" aria-label="Send message">Send Message</Button>
      </form>
    </div>
  </section>
);

export default ContactSection; 