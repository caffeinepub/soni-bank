import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  PiggyBank,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { login, identity, isLoggingIn } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (identity) {
      void navigate({ to: "/dashboard" });
    }
  }, [identity, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      icon: PiggyBank,
      title: "Savings Account",
      description:
        "Grow your wealth with competitive interest rates and zero monthly fees on our premium savings accounts.",
    },
    {
      icon: Banknote,
      title: "Personal Loans",
      description:
        "Flexible loan solutions tailored to your needs with transparent terms and competitive rates.",
    },
    {
      icon: CreditCard,
      title: "Credit Cards",
      description:
        "Earn rewards on every purchase with our exclusive credit cards offering cashback and travel perks.",
    },
    {
      icon: TrendingUp,
      title: "Investments",
      description:
        "Diversify your portfolio with expert-guided investment strategies for long-term financial growth.",
    },
  ];

  const stats = [
    { value: "1M+", label: "Happy Customers" },
    { value: "$50B", label: "Assets Managed" },
    { value: "200+", label: "Branches Nationwide" },
    { value: "24/7", label: "Customer Support" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      quote:
        "Soni Bank transformed how I manage my business finances. Their personal loans made expansion possible at just the right time.",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Software Engineer",
      quote:
        "The investment advisory services helped me build a solid portfolio. I've seen 18% returns in just two years.",
      rating: 5,
    },
    {
      name: "Anjali Patel",
      role: "Healthcare Professional",
      quote:
        "Outstanding customer service and seamless digital banking. Soni Bank genuinely cares about their customers.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-navy"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2"
          >
            <img
              src="/assets/generated/soni-bank-logo-transparent.dim_200x200.png"
              alt="Soni Bank"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl font-bold text-white">
              Soni <span className="text-gold">Bank</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-white/80 hover:text-gold transition-colors duration-200 font-medium text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <Button
              data-ocid="nav.login_button"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-gold hover:shadow-lg"
            >
              {isLoggingIn ? "Connecting..." : "Login"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy border-t border-gold/20"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid={`nav.link.${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-white/80 hover:text-gold transition-colors font-medium py-1"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  data-ocid="nav.login_button"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold rounded-full w-full"
                >
                  {isLoggingIn ? "Connecting..." : "Login"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/soni-bank-hero.dim_1400x700.jpg')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy/80 to-navy/60" />
        {/* Gold shimmer top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-gold font-sans-bank text-sm font-semibold tracking-widest uppercase mb-4 border border-gold/40 rounded-full px-4 py-1.5">
                Trusted Since 1994
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Welcome to{" "}
              <span className="text-gold relative">
                Soni Bank
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold/40 rounded" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto font-sans-bank leading-relaxed"
            >
              Your trusted financial partner. Secure, smart, and seamless
              banking designed to grow with you.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button
                data-ocid="hero.primary_button"
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="bg-gold hover:bg-gold-dark text-navy-dark font-semibold px-8 py-3 rounded-full text-base shadow-gold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Open an Account
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                size="lg"
                onClick={() => handleNavClick("#services")}
                className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-semibold px-8 py-3 rounded-full text-base transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-6 pt-8"
            >
              {[
                { icon: Shield, text: "FDIC Insured" },
                { icon: CheckCircle, text: "256-bit SSL" },
                { icon: Globe, text: "Global Access" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-white/60 text-sm"
                >
                  <Icon className="w-4 h-4 text-gold" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-gold font-sans-bank text-sm font-semibold tracking-widest uppercase"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3"
            >
              Banking Solutions for Every Need
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto"
            >
              From savings to investments, we provide comprehensive financial
              services built for modern life.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-gold/50 hover:shadow-[0_8px_32px_oklch(0.18_0.055_240/0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.span
                variants={fadeUp}
                className="text-gold font-sans-bank text-sm font-semibold tracking-widest uppercase"
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight"
              >
                30+ Years of Building Financial Trust
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base leading-relaxed"
              >
                Since 1994, Soni Bank has been at the forefront of personal and
                commercial banking, providing millions of customers with
                reliable, innovative financial solutions. Our mission is simple:
                empower every individual to achieve financial freedom.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base leading-relaxed"
              >
                We combine cutting-edge technology with personalized service to
                deliver a banking experience that is secure, intuitive, and
                rewarding. Whether you're saving for tomorrow or investing for
                the future, Soni Bank is your partner every step of the way.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 pt-2"
              >
                {[
                  "FDIC Insured",
                  "Award-Winning Service",
                  "ISO 27001 Certified",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="border border-gold/40 text-gold text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Stats grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="bg-navy-light/40 border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/50 hover:bg-navy-light/60 transition-all duration-300"
                >
                  <div className="font-display text-4xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-gold font-sans-bank text-sm font-semibold tracking-widest uppercase"
            >
              Customer Stories
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-5xl font-bold text-foreground mt-3"
            >
              Trusted by Millions
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }, (_, i) => i).map((i) => (
                    <Star
                      key={`star-${i}`}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-display font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-gold font-sans-bank text-sm font-semibold tracking-widest uppercase"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-5xl font-bold text-white mt-3"
            >
              We're Here to Help
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: MapPin,
                  title: "Our Address",
                  detail: "123 Financial District, Mumbai 400001, India",
                },
                {
                  icon: Phone,
                  title: "Phone Number",
                  detail: "+91 1800-SONI-BANK (1800-7664-2265)",
                },
                {
                  icon: Mail,
                  title: "Email Address",
                  detail: "support@sonibank.com",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  detail: "Mon–Fri: 9AM–6PM | Digital Banking: 24/7",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-white/60 text-sm">{item.detail}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-navy-light/40 border border-gold/20 rounded-2xl p-8 space-y-5"
            >
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-white/80 text-sm">
                  Full Name
                </Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  placeholder="Your full name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="bg-navy/60 border-white/20 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-gold/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-email"
                  className="text-white/80 text-sm"
                >
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  data-ocid="contact.input"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="bg-navy/60 border-white/20 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-gold/30"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="contact-message"
                  className="text-white/80 text-sm"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="How can we help you?"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="bg-navy/60 border-white/20 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-gold/30 resize-none"
                />
              </div>
              <Button
                data-ocid="contact.submit_button"
                onClick={() => {
                  setContactForm({ name: "", email: "", message: "" });
                }}
                className="w-full bg-gold hover:bg-gold-dark text-navy-dark font-semibold rounded-full py-2.5 transition-all duration-300 shadow-gold hover:shadow-lg"
              >
                Send Message
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-gold/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/soni-bank-logo-transparent.dim_200x200.png"
                  alt="Soni Bank"
                  className="h-9 w-9 object-contain"
                />
                <span className="font-display text-lg font-bold text-white">
                  Soni <span className="text-gold">Bank</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Your trusted financial partner since 1994. Building wealth and
                securing futures across India.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, name: "Facebook" },
                  { Icon: Twitter, name: "Twitter" },
                  { Icon: Linkedin, name: "LinkedIn" },
                  { Icon: Instagram, name: "Instagram" },
                ].map(({ Icon, name }) => (
                  <button
                    type="button"
                    key={name}
                    aria-label={name}
                    className="w-8 h-8 bg-navy-light/50 border border-white/10 rounded-lg flex items-center justify-center hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 text-white/60 hover:text-gold" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Services", href: "#services" },
                  { label: "About Us", href: "#about" },
                  { label: "Contact", href: "#contact" },
                  { label: "Online Banking", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className="text-white/50 hover:text-gold text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Savings Account",
                  "Personal Loans",
                  "Credit Cards",
                  "Investments",
                  "Business Banking",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-white/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Soni Bank. All rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/50 text-xs transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
