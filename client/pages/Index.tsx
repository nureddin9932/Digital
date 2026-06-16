import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Star, Play } from 'lucide-react';

type EasingType = 'easeOut' | 'easeIn' | 'easeInOut' | 'linear';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLanguageArabic, setIsLanguageArabic] = useState(false);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP animations for scroll trigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((element) => {
        const finalValue = parseInt(element.getAttribute('data-value') || '0');
        let counter = { value: 0 };

        gsap.to(counter, {
          value: finalValue,
          duration: 2,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          snap: { value: 1 },
          onUpdate: function () {
            element.textContent = Math.floor(counter.value).toString();
          },
        });
      });

      // Service cards animation
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
          },
        }
      );

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 80%',
          },
        }
      );

      // Testimonial cards animation
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.8 },
    }),
  } as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const content = {
    en: {
      nav: { home: 'Home', services: 'Services', work: 'Work', why: 'Why Us', contact: 'Contact' },
      hero: {
        title: 'We Create Exceptional Digital Experiences',
        subtitle: 'That Drive Your Business Into The Future',
        description: 'Combining technical luxury with modern creative identity for brands that demand excellence',
        cta1: 'Start Your Project',
        cta2: 'Explore Our Work',
        scroll: 'Scroll to explore',
      },
      stats: [
        { number: 500, label: 'Projects Completed' },
        { number: 100, label: 'Happy Clients' },
        { number: 10, label: 'Countries' },
        { number: 5, label: 'Years Expertise' },
      ],
      services: {
        title: 'Our Services',
        items: [
          { title: 'Web Development', description: 'Modern, fast, and scalable web applications' },
          { title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions' },
          { title: 'UI/UX Design', description: 'Beautiful and intuitive user experiences' },
          { title: 'Branding', description: 'Complete brand identity and strategy' },
          { title: 'Digital Marketing', description: 'Data-driven marketing campaigns' },
          { title: 'Video Production', description: 'Professional video content creation' },
        ],
      },
      work: {
        title: 'Featured Works',
        subtitle: 'Showcasing our most impactful projects',
        projects: [
          { name: 'Tech Startup', category: 'Web Development', image: '1' },
          { name: 'Luxury Brand', category: 'Branding', image: '2' },
          { name: 'Creative Agency', category: 'Full Stack', image: '3' },
        ],
      },
      why: {
        title: 'Why Choose Us',
        timeline: [
          'Discovery',
          'Strategy',
          'Design',
          'Development',
          'Launch',
        ],
      },
      testimonials: {
        title: 'Client Testimonials',
        items: [
          {
            name: 'Ahmed Hassan',
            role: 'CEO, Tech Company',
            text: 'Exceptional work and attention to detail',
            rating: 5,
          },
          {
            name: 'Fatima Al-Mansouri',
            role: 'Founder, Creative Studio',
            text: 'Transformed our vision into reality',
            rating: 5,
          },
          {
            name: 'Mohammed Al-Rashid',
            role: 'Director, Luxury Brand',
            text: 'Premium quality at every step',
            rating: 5,
          },
        ],
      },
      cta: {
        title: 'Ready to Transform Your Ideas?',
        description: 'Let\'s create something extraordinary together',
        button: 'Get Started',
      },
      footer: {
        company: 'Creative Digital',
        links: ['Home', 'Services', 'Portfolio', 'Contact'],
        social: ['Twitter', 'LinkedIn', 'Instagram'],
        copyright: '© 2024 Creative Digital. All rights reserved.',
      },
    },
    ar: {
      nav: { home: 'الرئيسية', services: 'الخدمات', work: 'أعمالنا', why: 'لماذا نحن', contact: 'تواصل' },
      hero: {
        title: 'نصنع تجارب رقمية استثنائية',
        subtitle: 'تقود أعمالك إلى المستقبل',
        description: 'دمج الفخامة التقنية مع الهوية الإبداعية الحديثة للعلامات التي تطلب التميز',
        cta1: 'ابدأ مشروعك',
        cta2: 'استعرض أعمالنا',
        scroll: 'اسحب للاستكشاف',
      },
      stats: [
        { number: 500, label: 'مشروع مكتمل' },
        { number: 100, label: 'عميل سعيد' },
        { number: 10, label: 'دول' },
        { number: 5, label: 'سنوات خبرة' },
      ],
      services: {
        title: 'خدماتنا',
        items: [
          { title: 'تطوير الويب', description: 'تطبيقات ويب حديثة وسريعة وقابلة للتوسع' },
          { title: 'تطبيقات الهاتف', description: 'حلول تطبيقات محمولة أصلية ومتعددة المنصات' },
          { title: 'تصميم UI/UX', description: 'تجارب مستخدم جميلة وسهلة الاستخدام' },
          { title: 'العلامة التجارية', description: 'هوية العلامة التجارية الكاملة والاستراتيجية' },
          { title: 'التسويق الرقمي', description: 'حملات تسويقية قائمة على البيانات' },
          { title: 'إنتاج الفيديو', description: 'إنشاء محتوى فيديو احترافي' },
        ],
      },
      work: {
        title: 'أعمالنا المتميزة',
        subtitle: 'عرض أكثر مشاريعنا تأثيراً',
        projects: [
          { name: 'شركة تقنية', category: 'تطوير ويب', image: '1' },
          { name: 'علامة فاخرة', category: 'علامة تجارية', image: '2' },
          { name: 'وكالة إبداعية', category: 'حل متكامل', image: '3' },
        ],
      },
      why: {
        title: 'لماذا تختارنا',
        timeline: [
          'الاستكشاف',
          'الاستراتيجية',
          'التصميم',
          'التطوير',
          'الإطلاق',
        ],
      },
      testimonials: {
        title: 'آراء العملاء',
        items: [
          {
            name: 'أحمد حسن',
            role: 'الرئيس التنفيذي، شركة تقنية',
            text: 'عمل استثنائي والاهتمام بالتفاصيل',
            rating: 5,
          },
          {
            name: 'فاطمة المنصوري',
            role: 'المؤسسة، استوديو إبداعي',
            text: 'حول رؤيتنا إلى واقع',
            rating: 5,
          },
          {
            name: 'محمد الراشد',
            role: 'المدير، العلامة الفاخرة',
            text: 'جودة متميزة في كل خطوة',
            rating: 5,
          },
        ],
      },
      cta: {
        title: 'هل أنت مستعد لتحويل أفكارك؟',
        description: 'دعنا نبتكر شيئاً استثنائياً معاً',
        button: 'ابدأ الآن',
      },
      footer: {
        company: 'الإبداع الرقمي',
        links: ['الرئيسية', 'الخدمات', 'المحفظة', 'تواصل'],
        social: ['تويتر', 'لينكدإن', 'إنستاجرام'],
        copyright: '© 2024 الإبداع الرقمي. جميع الحقوق محفوظة.',
      },
    },
  };

  const t = isLanguageArabic ? content.ar : content.en;
  const isRTL = isLanguageArabic;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-luxury-black text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Digital</div>
          <div className="hidden md:flex gap-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm font-medium hover:text-luxury-gold transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setIsLanguageArabic(!isLanguageArabic)}
            className="px-4 py-2 rounded-full border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
          >
            {isLanguageArabic ? 'EN' : 'AR'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold opacity-5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-blue opacity-5 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={heroVariants}
              custom={0}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.08] tracking-tight"
              style={{ fontWeight: 900 }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              variants={heroVariants}
              custom={1}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-bold"
              style={{ fontWeight: 700 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              variants={heroVariants}
              custom={2}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto font-medium"
              style={{ fontWeight: 500 }}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              variants={heroVariants}
              custom={3}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <button className="luxury-button flex items-center gap-2">
                {t.hero.cta1}
                <ArrowRight size={20} />
              </button>
              <button className="luxury-button-outline flex items-center gap-2">
                {t.hero.cta2}
                <Play size={16} />
              </button>
            </motion.div>

            <motion.div
              variants={heroVariants}
              custom={4}
              className="flex flex-col items-center gap-4 animate-bounce"
            >
              <p className="text-sm text-gray-400">{t.hero.scroll}</p>
              <ChevronDown className="w-6 h-6 text-luxury-gold" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-luxury-black to-luxury-muted relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="stat-number" data-value={stat.number}>
                    0
                  </span>
                  {stat.label.includes('Projects') || stat.label.includes('Clients') || stat.label.includes('مشروع') || stat.label.includes('عميل') ? '+' : ''}
                </div>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-4">{t.services.title}</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-luxury-gold to-luxury-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <motion.div
                key={index}
                className="service-card group glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-luxury-gold to-yellow-400 flex items-center justify-center">
                    <div className="w-6 h-6 bg-luxury-black rounded-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-4">{t.work.title}</h2>
            <p className="text-gray-400 text-lg">{t.work.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.work.projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card group relative overflow-hidden rounded-2xl h-80"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/30 to-luxury-blue/30" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                  <p className="text-sm text-luxury-gold mb-2">{project.category}</p>
                  <h3 className="text-3xl font-bold">{project.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-4">{t.why.title}</h2>
          </motion.div>

          <div className="flex overflow-x-auto gap-4 pb-8 justify-center flex-wrap">
            {t.why.timeline.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <motion.div
                  className="timeline-item glass-effect px-8 py-4 rounded-full font-semibold text-center min-w-max hover:bg-luxury-gold/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {step}
                </motion.div>
                {index < t.why.timeline.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-luxury-gold hidden sm:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-4">{t.testimonials.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card glass-effect p-8 rounded-2xl hover:bg-white/15 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 via-luxury-blue/10 to-luxury-gold/10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-300 mb-12">{t.cta.description}</p>
            <button className="luxury-button text-xl px-12 py-6">
              {t.cta.button}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-luxury-muted py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">{t.footer.company}</h3>
              <p className="text-gray-400">Creating exceptional digital experiences</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {t.footer.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-gray-400">
                {t.footer.social.map((social, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-luxury-gold transition-colors duration-300">
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">hello@creative.digital</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
